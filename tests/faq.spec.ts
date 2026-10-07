import { expect, test } from "./helpers";

test("FAQ answers open on click", async ({ page }) => {
  await page.goto("/");

  const answer = page.getByText("meetups gratuitos que se realizan cada dos meses, frente al mar");
  await expect(answer).not.toBeVisible();

  await page.getByText("¿Qué es PlayasOnTech?").click();
  await expect(answer).toBeVisible();
});
