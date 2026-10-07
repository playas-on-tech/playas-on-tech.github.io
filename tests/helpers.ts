import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test as base } from "@playwright/test";
import type { Route } from "@playwright/test";

const BASE = `http://localhost:${Number(process.env.PORT ?? 4173)}`;

// PostHog is mocked: every request it makes is answered locally, so the real service is
// never reached and the anniversary flag can be turned on for the gated components.
function mockResponse(url: string, flags: Record<string, boolean>) {
  if (url.includes("/flags/") || url.includes("/config")) {
    const details = Object.fromEntries(
      Object.entries(flags).map(([key, enabled]) => [key, { key, enabled, variant: null, metadata: {} }]),
    );

    return { config: {}, flags: details, errorsLoading: false };
  }

  return { status: 1 };
}

type Network = {
  answered: string[];
  enable: (flag: string) => void;
  mock: (url: string, handler: (route: Route) => void) => void;
};

export const test = base.extend<{ net: Network }>({
  net: async ({ page }, run) => {
    const flags: Record<string, boolean> = {};
    const answered: string[] = [];
    const mocks = new Map<string, (route: Route) => void>();

    await page.route("**", (route) => {
      const url = new URL(route.request().url());

      for (const [pattern, handler] of mocks) {
        if (url.href.includes(pattern)) return handler(route);
      }

      if (url.origin === BASE) return route.fallback();

      if (url.hostname.endsWith("posthog.com")) {
        answered.push(url.pathname);
        return route.fulfill({ json: mockResponse(url.pathname, flags) });
      }

      // Nothing else may leave the machine during a test.
      return route.abort();
    });

    await run({
      answered,
      enable: (flag) => {
        flags[flag] = true;
      },
      mock: (pattern, handler) => {
        mocks.set(pattern, handler);
      },
    });
  },
});

export { expect };

export function locale(lang: string) {
  return readJson(path.join("src", "i18n", "locales", `${lang}.json`));
}

export function data(name: string) {
  return readJson(path.join("src", "data", `${name}.json`));
}

function readJson(relative: string) {
  return JSON.parse(readFileSync(path.join(process.cwd(), relative), "utf8"));
}
