import { expect, test, locale } from "./helpers";

const copy = () => locale("es").contacto;

test("preselects the category from the query string and shows the speaker callout", async ({ page }) => {
  await page.goto("/?category=Speaker");

  await expect(page.getByLabel(copy().categoryLabel)).toHaveValue("Speaker");
  await expect(page.getByText(copy().speakerCalloutH4)).toBeVisible();
});

test("sends the message with the category as the subject prefix", async ({ page, net }) => {
  let subject = "";
  net.mock("api.web3forms.com/submit", (route) => {
    subject = JSON.parse(route.request().postData() ?? "{}").subject;
    route.fulfill({ json: { success: true } });
  });

  await page.goto("/?category=Speaker");

  await page.getByLabel(copy().nameLabel).fill("Ada");
  await page.getByLabel(copy().emailLabel).fill("ada@example.com");
  await page.getByLabel(copy().subjectLabel).fill("Hola");
  await page.getByLabel(copy().messageLabel).fill("Hola");
  await page.getByRole("button", { name: copy().submit }).click();

  await expect(page.getByRole("heading", { name: copy().successH3 })).toBeVisible();
  expect(subject).toBe("[Playas on Tech - Speaker] Hola");
});

// Native validation is what stops an empty field, so this is the behaviour a visitor sees.
test("blocks submission while a required field is empty", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel(copy().nameLabel).fill("Ada");
  await page.getByLabel(copy().emailLabel).fill("ada@example.com");
  await page.getByRole("button", { name: copy().submit }).click();

  await expect(page.getByRole("heading", { name: copy().successH3 })).toHaveCount(0);
  await expect(page.getByLabel(copy().messageLabel)).toBeVisible();
});

test("shows the error state when the API rejects the message", async ({ page, net }) => {
  net.mock("api.web3forms.com/submit", (route) => route.fulfill({ json: { success: false } }));

  await page.goto("/");

  await page.getByLabel(copy().nameLabel).fill("Ada");
  await page.getByLabel(copy().emailLabel).fill("ada@example.com");
  await page.getByLabel(copy().messageLabel).fill("Hola");
  await page.getByRole("button", { name: copy().submit }).click();

  await expect(page.getByText(copy().errorApi)).toBeVisible();
});
