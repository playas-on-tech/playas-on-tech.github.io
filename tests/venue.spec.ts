import { expect, test, locale } from "./helpers";

test("the venue section lists every feature from the dictionary", async ({ page }) => {
  await page.goto("/");

  const copy = locale("es").venue;
  const items = page.locator("section").filter({ hasText: copy.h2 }).first().getByRole("listitem");

  for (const feature of copy.features) {
    await expect(items.filter({ hasText: feature })).toBeVisible();
  }
});
