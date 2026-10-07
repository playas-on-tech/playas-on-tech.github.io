// Builds the export with a mock PostHog key, then runs the specs against it.
// Every PostHog request is answered by the mock in tests/helpers.ts, so the real
// service is never reached and the anniversary flag can be turned on.
const path = require("node:path");
const { execSync } = require("node:child_process");

const root = path.join(__dirname, "..");

process.env.NEXT_PUBLIC_POSTHOG_KEY = "phc_mock";
process.env.PATH = [path.join(root, "node_modules", ".bin"), process.env.PATH].join(path.delimiter);

const run = (command) => execSync(command, { cwd: root, stdio: "inherit" });

run("next build");
run("playwright test");
