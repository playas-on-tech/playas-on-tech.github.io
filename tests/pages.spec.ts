import { expect, test, locale } from "./helpers";

test("the terms page links to the licenses it mentions", async ({ page }) => {
  await page.goto("/terminos");

  const es = locale("es").terminos;
  await expect(page.getByRole("link", { name: es.ccLink })).toHaveAttribute(
    "href",
    "https://creativecommons.org/licenses/by/4.0/",
  );
  await expect(page.getByRole("link", { name: es.mitLink })).toHaveAttribute(
    "href",
    "https://github.com/playas-on-tech/playas-on-tech.github.io/blob/main/LICENSE",
  );
  await expect(page.getByRole("link", { name: es.conductaLink })).toHaveAttribute("href", "/codigo-conducta/");
});

test("the code of conduct lists what is expected and what is not, and links to the contact email", async ({ page }) => {
  await page.goto("/codigo-conducta");

  const es = locale("es").codigoConducta;
  await expect(page.locator("main").getByRole("listitem")).toHaveCount(es.esperado.length + es.inaceptable.length);
  await expect(page.getByRole("link", { name: es.reportarEmail })).toHaveAttribute("href", `mailto:${es.reportarEmail}`);
});
