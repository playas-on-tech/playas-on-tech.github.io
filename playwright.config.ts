import { defineConfig } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 4173);

export default defineConfig({
  testDir: "./tests",
  // The HTML report is what CI uploads when a spec fails.
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    // Behaviour tests run against the static export, the same output GitHub Pages serves.
    baseURL: `http://localhost:${PORT}`,
  },
  webServer: {
    command: "node scripts/serve.js",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
