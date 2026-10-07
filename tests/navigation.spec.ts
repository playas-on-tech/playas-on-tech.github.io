import { expect, test } from "./helpers";

test("every in-page nav link points at a section that exists", async ({ page }) => {
  await page.goto("/");

  const links = await page.locator('nav a[href^="#"]').evaluateAll((els) => els.map((el) => el.getAttribute("href")));
  expect(links.length).toBeGreaterThan(0);

  for (const href of links) {
    await expect(page.locator(`[id="${href.slice(1)}"]`)).toHaveCount(1);
  }
});

test("shows the thank-you page while the anniversary flag is off", async ({ page }) => {
  await page.goto("/aniversario");

  await expect(page.getByRole("heading", { name: "¡Gracias por celebrar con nosotros!" })).toBeVisible();
  // The gated CTA stays hidden until the flag resolves.
  await expect(page.getByRole("link", { name: "Reservar", exact: true })).toHaveCount(0);
});
