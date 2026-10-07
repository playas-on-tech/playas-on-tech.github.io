import { expect, test } from "./helpers";

test("PostHog is mocked during tests, so the real service is never reached", async ({ page, net }) => {
  const flags = page.waitForResponse((response) => response.url().includes("/flags/"));

  await page.goto("/");

  const response = await flags;

  // The mock's payload, not the real project's flags.
  expect(await response.json()).toEqual({ config: {}, flags: {}, errorsLoading: false });

  // PostHog also fetched its config through the mock, so it really ran against the mock, not the service.
  await expect.poll(() => net.answered.filter((url) => url.includes("/config")).length).toBeGreaterThan(0);
});
