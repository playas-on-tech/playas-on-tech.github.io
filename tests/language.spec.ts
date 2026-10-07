import { expect, test, locale } from "./helpers";

const es = () => locale("es");
const en = () => locale("en");

test("shows Spanish by default and switches to English with the toggle", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toContainText(es().hero.h1a);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");

  await page.getByRole("button", { name: "Switch to English" }).click();

  await expect(page.locator("h1")).toContainText(en().hero.h1a);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("the toggle also switches the other pages", async ({ page }) => {
  await page.goto("/merch");

  await expect(page.getByRole("heading", { name: es().merch.section.title })).toBeVisible();

  await page.getByRole("button", { name: "Switch to English" }).click();

  await expect(page.getByRole("heading", { name: en().merch.section.title })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("remembers the chosen language on the next visit", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("h1")).toContainText(en().hero.h1a);

  await page.reload();

  await expect(page.locator("h1")).toContainText(en().hero.h1a);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
