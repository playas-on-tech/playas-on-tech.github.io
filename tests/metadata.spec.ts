import { expect, test, locale } from "./helpers";

test("pages that set their own path publish their own canonical URL", async ({ page }) => {
  await page.goto("/aniversario");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://playasontech.com/aniversario/");
});

test("pages without a path inherit the root layout's canonical and hreflang links", async ({ page }) => {
  await page.goto("/terminos");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://playasontech.com/");
  await expect(page.locator('link[rel="alternate"]')).toHaveCount(3);
});

test("the home page publishes the FAQ structured data for both locales", async ({ page }) => {
  await page.goto("/");

  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent ?? "")));

  const faq = schemas.filter((schema) => schema["@type"] === "FAQPage");
  expect(faq).toHaveLength(2);
  expect(faq[0].mainEntity[0].name).toBe(locale("es").faq.items[0].q);
  expect(faq[1].mainEntity[0].name).toBe(locale("en").faq.items[0].q);
});
