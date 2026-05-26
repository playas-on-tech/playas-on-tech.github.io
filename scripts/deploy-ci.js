#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const WORKFLOW_NAME = "deploy.yml";

// Helper to run git commands and get trimmed output
function runGit(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch (error) {
    return "";
  }
}

// Check if a command exists in the shell environment
function commandExists(cmd) {
  try {
    execSync(`where ${cmd}`, { stdio: "ignore" });
    return true;
  } catch (e) {
    try {
      execSync(`which ${cmd}`, { stdio: "ignore" });
      return true;
    } catch (err) {
      return false;
    }
  }
}

// 1. Get repository context
const branch = runGit("git rev-parse --abbrev-ref HEAD") || "main";
const headSha = runGit("git rev-parse HEAD");
const remoteUrl = runGit("git remote get-url origin");

if (!headSha || !remoteUrl) {
  console.error("❌ Error: Must be run inside a valid Git repository with an 'origin' remote.");
  process.exit(1);
}

// Parse owner and repo from remote URL
// Handles both HTTPS and SSH URLs, and removes .git suffix
try {
  const pathPart = remoteUrl.split("github.com")[1].replace(/^[:/]/, "");
  const parts = pathPart.split("/");
  const owner = parts[0];
  const repo = parts[1].replace(/\.git$/, "");
  
  if (!owner || !repo) {
    throw new Error();
  }
  
  global.owner = owner;
  global.repo = repo;
} catch (error) {
  console.error(`❌ Error: Could not parse GitHub owner and repository name from remote URL: ${remoteUrl}`);
  process.exit(1);
}

const owner = global.owner;
const repo = global.repo;

console.log(`🚀 Starting CI/CD Deployment Process for ${owner}/${repo}`);
console.log(`📍 Current Branch: ${branch}`);
console.log(`🔢 Target Commit SHA: ${headSha.substring(0, 7)}`);

// 2. Sync local changes with remote
console.log("\n🔍 Checking for unpushed commits...");
const unpushed = runGit(`git cherry -v origin/${branch}`);
if (unpushed) {
  console.log("⚠️  Found local commits that are not on the remote repository.");
  console.log("Pumping commits to origin so GitHub Actions can see the latest changes...");
  try {
    execSync(`git push origin ${branch}`, { stdio: "inherit" });
    console.log("✅ Successfully pushed commits to GitHub.");
  } catch (error) {
    console.error("❌ Error: Failed to push commits to remote. Please push manually or check your connection.");
    process.exit(1);
  }
} else {
  console.log("✅ Remote is fully up to date with local commits.");
}

// 3. Determine Auth Strategy and check credentials
let useGhCli = false;
let apiToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (commandExists("gh")) {
  try {
    execSync("gh auth status", { stdio: "ignore" });
    useGhCli = true;
  } catch (e) {
    // gh is installed but not authenticated
  }
}

if (!useGhCli && !apiToken) {
  console.error("\n❌ Error: Authentication required to trigger GitHub Actions.");
  console.error("Please do one of the following:");
  console.error("  1. Log in via the GitHub CLI: run 'gh auth login'");
  console.error("  2. Or set a GITHUB_TOKEN or GH_TOKEN environment variable.");
  process.exit(1);
}

console.log(useGhCli ? "🔑 Authenticated via GitHub CLI." : "🔑 Authenticated via GITHUB_TOKEN.");

// Helper to poll workflow runs via GH CLI or API
async function fetchWorkflowRuns() {
  if (useGhCli) {
    try {
      const output = execSync(
        `gh run list --workflow=${WORKFLOW_NAME} --branch=${branch} --limit=5 --json databaseId,status,conclusion,headSha,url`,
        { stdio: ["ignore", "pipe", "ignore"] }
      ).toString();
      return JSON.parse(output).map(run => ({
        id: run.databaseId,
        status: run.status,
        conclusion: run.conclusion,
        headSha: run.headSha,
        url: run.url
      }));
    } catch (e) {
      return [];
    }
  } else {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/actions/runs?workflow_id=${WORKFLOW_NAME}&branch=${branch}`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "playas-on-tech-deploy"
          }
        }
      );
      if (!response.ok) return [];
      const data = await response.json();
      return (data.workflow_runs || []).map(run => ({
        id: run.id,
        status: run.status,
        conclusion: run.conclusion,
        headSha: run.head_sha,
        url: run.html_url
      }));
    } catch (e) {
      return [];
    }
  }
}

// Helper to trigger the workflow run
async function triggerWorkflow() {
  console.log("\n⚡ Triggering GitHub Actions deploy workflow...");
  if (useGhCli) {
    execSync(`gh workflow run ${WORKFLOW_NAME} --ref ${branch}`);
  } else {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${WORKFLOW_NAME}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
          "User-Agent": "playas-on-tech-deploy"
        },
        body: JSON.stringify({ ref: branch })
      }
    );
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`GitHub API returned status ${response.status}: ${errText}`);
    }
  }
}

async function main() {
  try {
    // Record current runs before triggering so we don't accidentally pick up an older completed run
    const preTriggerRuns = await fetchWorkflowRuns();
    const preTriggerIds = new Set(preTriggerRuns.map(r => r.id));

    // Trigger workflow
    await triggerWorkflow();
    console.log("✅ Trigger request successful. Waiting for workflow run to initialize on GitHub...");

    // 4. Polling for the run to start and complete
    let runId = null;
    let runUrl = "";
    const startTime = Date.now();
    const timeout = 60000; // 1 minute timeout to find the run

    while (!runId) {
      if (Date.now() - startTime > timeout) {
        throw new Error("Timeout waiting for GitHub Actions workflow run to appear.");
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
      process.stdout.write(".");

      const activeRuns = await fetchWorkflowRuns();
      // Look for a run that wasn't in the pre-trigger list and matches our target commit SHA
      const newRun = activeRuns.find(run => !preTriggerIds.has(run.id) && run.headSha === headSha);
      if (newRun) {
        runId = newRun.id;
        runUrl = newRun.url;
        console.log(`\n\n📌 Found Active Run: ${runUrl}`);
      }
    }

    // Now monitor the active run until completion
    console.log("⏳ Monitoring build & deploy progress...");
    let buildCompleted = false;
    let pollInterval = 10000; // poll every 10s

    while (!buildCompleted) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      
      const runs = await fetchWorkflowRuns();
      const currentRun = runs.find(r => r.id === runId);

      if (!currentRun) {
        console.log("⚠️  Could not retrieve build status. Retrying...");
        continue;
      }

      const status = currentRun.status;
      const conclusion = currentRun.conclusion;

      console.log(`   [${new Date().toLocaleTimeString()}] Status: ${status} | Conclusion: ${conclusion || "pending"}`);

      if (status === "completed") {
        buildCompleted = true;
        if (conclusion === "success") {
          console.log("\n🎉 GitHub Actions CI Build and Deploy Succeeded!");
        } else {
          throw new Error(`GitHub Actions workflow run failed with conclusion: ${conclusion}`);
        }
      }
    }

    // 5. Confirm the app is online afterwards
    console.log("\n🌐 Verifying live site deployment...");
    let domain = "playasontech.com";
    const cnamePath = path.join(__dirname, "../public/CNAME");
    
    if (fs.existsSync(cnamePath)) {
      const cnameContent = fs.readFileSync(cnamePath, "utf8").trim();
      if (cnameContent) {
        domain = cnameContent;
      }
    }

    const targetUrl = `https://${domain}/`;
    console.log(`Pinging live URL: ${targetUrl}`);

    // Wait a couple of seconds for GitHub Pages DNS/files CDN cache invalidation
    console.log("Waiting 5 seconds for CDN propagation...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
      const res = await fetch(targetUrl, {
        headers: { "User-Agent": "playas-on-tech-deploy-verifier" }
      });
      if (res.ok) {
        console.log(`\n✨ SUCCESS! Website is ONLINE at ${targetUrl} (HTTP status: ${res.status})`);
      } else {
        console.log(`\n⚠️  Warning: Pinned site responded with HTTP ${res.status}. It might still be propagating. Please check it manually.`);
      }
    } catch (e) {
      console.log(`\n⚠️  Warning: Failed to reach ${targetUrl}. It might still be propagating or experiencing a cold start. Please verify manually.`);
    }

  } catch (error) {
    console.error(`\n❌ Deployment Failed: ${error.message}`);
    process.exit(1);
  }
}

main();
