import { expect, test } from "./helpers";

test("gallery lightbox walks through the photos and wraps around", async ({ page }) => {
  await page.goto("/aniversario");

  const dialog = page.getByRole("dialog");
  await page.getByRole("button", { name: "Ampliar foto 1", exact: true }).click();

  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("1 de 10");

  await page.getByRole("button", { name: "Foto siguiente" }).click();
  await expect(dialog).toContainText("2 de 10");

  await page.getByRole("button", { name: "Foto anterior" }).click();
  await expect(dialog).toContainText("1 de 10");

  await page.getByRole("button", { name: "Foto anterior" }).click();
  await expect(dialog).toContainText("10 de 10");

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("clicking the backdrop closes the lightbox", async ({ page }) => {
  await page.goto("/aniversario");

  const dialog = page.getByRole("dialog");
  await page.getByRole("button", { name: "Ampliar foto 3" }).click();
  await expect(dialog).toBeVisible();

  await page.mouse.click(20, 700);
  await expect(dialog).toHaveCount(0);
});

test("the event flyer opens its own lightbox", async ({ page }) => {
  await page.goto("/");

  const dialog = page.getByRole("dialog");
  await page.getByRole("button", { name: "Ver el flyer del evento en tamaño completo" }).click();
  await expect(dialog).toBeVisible();

  await page.getByRole("button", { name: "Cerrar" }).click();
  await expect(dialog).toHaveCount(0);
});
