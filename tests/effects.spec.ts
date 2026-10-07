import { editionCount } from "../src/lib/editions";
import { expect, test, locale } from "./helpers";

const copy = () => locale("es");

test("content fades in as it scrolls into view", async ({ page }) => {
  await page.goto("/");

  const faq = page.locator(".reveal").filter({ hasText: copy().faq.h2 });
  await expect(faq).toHaveCSS("opacity", "0");

  await faq.scrollIntoViewIfNeeded();
  await expect(faq).toHaveCSS("opacity", "1", { timeout: 5000 });
});

// The number is derived from the calendar (the formula itself is tested in lib.spec), so the
// build bakes today's value into the export; the page must show the same number.
test("the stats strip counts up to the derived edition count when it scrolls into view", async ({ page }) => {
  await page.goto("/");

  const stat = page.locator("div").filter({ hasText: copy().statsStrip.stats[0].label }).first();
  await expect(stat).toContainText("0");

  await stat.scrollIntoViewIfNeeded();
  await expect(stat).toContainText(String(editionCount()), { timeout: 5000 });
});

test("the other stats keep their prefix while counting", async ({ page }) => {
  await page.goto("/");

  const stat = page.locator("div").filter({ hasText: copy().statsStrip.stats[1].label }).first();

  await stat.scrollIntoViewIfNeeded();
  await expect(stat).toContainText("+200", { timeout: 5000 });
});
