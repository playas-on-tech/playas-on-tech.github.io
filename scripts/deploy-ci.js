#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const DEPLOY_WORKFLOW = "deploy.yml";
const PAGES_WORKFLOW = "pages-build-deployment";
const USER_AGENT = "playas-on-tech-deploy";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function runGit(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
}

function commandExists(cmd) {
  try {
    execSync(`where ${cmd}`, { stdio: "ignore" });
    return true;
  } catch {
    try {
      execSync(`which ${cmd}`, { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  }
}

const branch = runGit("git rev-parse --abbrev-ref HEAD") || "main";
const headSha = runGit("git rev-parse HEAD");
const remoteUrl = runGit("git remote get-url origin");

if (!headSha || !remoteUrl) {
  console.error("❌ Error: Must be run inside a valid Git repository with an 'origin' remote.");
  process.exit(1);
}

// Handles both HTTPS and SSH URLs, and removes the .git suffix.
const [owner, repo] = (remoteUrl.split("github.com")[1] ?? "").replace(/^[:/]/, "").split("/");
if (!owner || !repo) {
  console.error(`❌ Error: Could not parse GitHub owner and repository name from remote URL: ${remoteUrl}`);
  process.exit(1);
}

console.log(`🚀 Starting CI/CD Deployment Process for ${owner}/${repo}`);
console.log(`📍 Current Branch: ${branch}`);
console.log(`🔢 Target Commit SHA: ${headSha.substring(0, 7)}`);

console.log("\n🔍 Checking for unpushed commits...");
if (runGit(`git cherry -v origin/${branch}`)) {
  console.log("⚠️  Found local commits that are not on the remote repository.");
  console.log("Pumping commits to origin so GitHub Actions can see the latest changes...");
  try {
    execSync(`git push origin ${branch}`, { stdio: "inherit" });
    console.log("✅ Successfully pushed commits to GitHub.");
  } catch {
    console.error("❌ Error: Failed to push commits to remote. Please push manually or check your connection.");
    process.exit(1);
  }
} else {
  console.log("✅ Remote is fully up to date with local commits.");
}

function ghAuthenticated() {
  try {
    execSync("gh auth status", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

const useGhCli = commandExists("gh") && ghAuthenticated();
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (!useGhCli && !token) {
  console.error("\n❌ Error: Authentication required to trigger GitHub Actions.");
  console.error("Please do one of the following:");
  console.error("  1. Log in via the GitHub CLI: run 'gh auth login'");
  console.error("  2. Or set a GITHUB_TOKEN or GH_TOKEN environment variable.");
  process.exit(1);
}

console.log(useGhCli ? "🔑 Authenticated via GitHub CLI." : "🔑 Authenticated via GITHUB_TOKEN.");

// Workflow runs for a given workflow + branch, through the gh CLI when it is authenticated.
async function fetchRuns(workflow, ref) {
  if (useGhCli) {
    try {
      const output = execSync(
        `gh run list --workflow=${workflow} --branch=${ref} --limit=5 --json databaseId,status,conclusion,headSha,url`,
        { stdio: ["ignore", "pipe", "ignore"] },
      ).toString();
      return JSON.parse(output).map((run) => ({
        id: run.databaseId,
        status: run.status,
        conclusion: run.conclusion,
        headSha: run.headSha,
        url: run.url,
      }));
    } catch {
      return [];
    }
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/runs?workflow_id=${workflow}&branch=${ref}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": USER_AGENT,
      },
    });
    if (!response.ok) return [];

    const data = await response.json();
    return (data.workflow_runs || []).map((run) => ({
      id: run.id,
      status: run.status,
      conclusion: run.conclusion,
      headSha: run.head_sha,
      url: run.html_url,
    }));
  } catch {
    return [];
  }
}

async function triggerWorkflow() {
  console.log("\n⚡ Triggering GitHub Actions deploy workflow...");

  if (useGhCli) {
    execSync(`gh workflow run ${DEPLOY_WORKFLOW} --ref ${branch}`);
    return;
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${DEPLOY_WORKFLOW}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify({ ref: branch }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned status ${response.status}: ${await response.text()}`);
  }
}

// Waits for a run that was not already there before the trigger.
async function findRun(runs, { exclude, matchSha, timeout, interval }) {
  const start = Date.now();

  while (Date.now() - start <= timeout) {
    await sleep(interval);
    process.stdout.write(".");

    const run = (await runs()).find((r) => !exclude.has(r.id) && (!matchSha || r.headSha === matchSha));
    if (run) return run;
  }

  return null;
}

async function monitor(runs, id, interval, prefix, label) {
  while (true) {
    await sleep(interval);

    const run = (await runs()).find((r) => r.id === id);
    if (!run) {
      console.log(`⚠️  Could not retrieve ${label} status. Retrying...`);
      continue;
    }

    console.log(`   [${new Date().toLocaleTimeString()}] ${prefix}Status: ${run.status} | Conclusion: ${run.conclusion || "pending"}`);

    if (run.status === "completed") return run.conclusion;
  }
}

async function main() {
  try {
    const deployRuns = () => fetchRuns(DEPLOY_WORKFLOW, branch);
    const pagesRuns = () => fetchRuns(PAGES_WORKFLOW, "gh-pages");

    // Record the runs already there so an older completed run is not mistaken for this one.
    const knownDeployIds = new Set((await deployRuns()).map((r) => r.id));
    const knownPagesIds = new Set((await pagesRuns()).map((r) => r.id));

    await triggerWorkflow();
    console.log("✅ Trigger request successful. Waiting for workflow run to initialize on GitHub...");

    const deployRun = await findRun(deployRuns, { exclude: knownDeployIds, matchSha: headSha, timeout: 60000, interval: 5000 });
    if (!deployRun) {
      throw new Error("Timeout waiting for GitHub Actions workflow run to appear.");
    }

    console.log(`\n\n📌 Found Active Run: ${deployRun.url}`);
    console.log("⏳ Monitoring build & deploy progress...");

    const buildConclusion = await monitor(deployRuns, deployRun.id, 10000, "", "build");
    if (buildConclusion !== "success") {
      throw new Error(`GitHub Actions workflow run failed with conclusion: ${buildConclusion}`);
    }
    console.log("\n🎉 GitHub Actions CI Build and Deploy Succeeded!");

    console.log("\n⚡ Monitoring secondary GitHub Pages deployment (github-pages env)...");

    const pagesRun = await findRun(pagesRuns, { exclude: knownPagesIds, timeout: 60000, interval: 3000 });

    if (pagesRun) {
      console.log(`\n📌 Found Active Pages Deployment Run: ${pagesRun.url}`);
      console.log("⏳ Monitoring pages build & deploy progress...");

      const pagesConclusion = await monitor(pagesRuns, pagesRun.id, 5000, "Pages ", "pages build");
      if (pagesConclusion !== "success") {
        throw new Error(`GitHub Pages deployment failed with conclusion: ${pagesConclusion}`);
      }
      console.log("\n🎉 GitHub Pages Deployment Succeeded!");
    } else {
      console.log("⚠️  Timeout waiting for pages-build-deployment to initialize. Skipping active monitoring.");
    }

    console.log("\n🌐 Verifying live site deployment...");

    const cnamePath = path.join(__dirname, "../public/CNAME");
    const targetUrl = `https://${fs.existsSync(cnamePath) ? fs.readFileSync(cnamePath, "utf8").trim() || "playasontech.com" : "playasontech.com"}/`;

    console.log(`Pinging live URL: ${targetUrl}`);
    console.log("Waiting 5 seconds for CDN propagation...");
    await sleep(5000);

    try {
      const response = await fetch(targetUrl, { headers: { "User-Agent": `${USER_AGENT}-verifier` } });
      if (response.ok) {
        console.log(`\n✨ SUCCESS! Website is ONLINE at ${targetUrl} (HTTP status: ${response.status})`);
      } else {
        console.log(`\n⚠️  Warning: Pinned site responded with HTTP ${response.status}. It might still be propagating. Please check it manually.`);
      }
    } catch {
      console.log(`\n⚠️  Warning: Failed to reach ${targetUrl}. It might still be propagating or experiencing a cold start. Please verify manually.`);
    }
  } catch (error) {
    console.error(`\n❌ Deployment Failed: ${error.message}`);
    process.exit(1);
  }
}

main();
