import { data, expect, locale, test } from "./helpers";

const es = () => locale("es").aniversario;

test("the anniversary page shows the event when the flag is on", async ({ page, net }) => {
  net.enable("Aniversario");
  await page.goto("/aniversario");

  const hero = es().hero;
  await expect(page.getByRole("heading", { name: hero.h1a })).toBeVisible();
  await expect(page.getByRole("heading", { name: es().thankYou.heroTitle })).toHaveCount(0);

  await expect(page.getByRole("link", { name: hero.ctaReserve }).first()).toHaveAttribute("href", "#registro");
});

test("the countdown shows the time left until the event", async ({ page, net }) => {
  net.enable("Aniversario");
  await page.clock.setFixedTime(new Date(Date.UTC(2026, 5, 1, 12, 0, 0)));

  await page.goto("/aniversario");

  const strip = page.locator("div").filter({ hasText: es().hero.countdownLabel }).first();
  await expect(strip).toContainText("47");
  await expect(strip).toContainText("04");
  await expect(strip).toContainText("00");
});

test("the countdown says the day has arrived once the date has passed", async ({ page, net }) => {
  net.enable("Aniversario");
  await page.clock.setFixedTime(new Date(Date.UTC(2026, 6, 18, 16, 0, 1)));

  await page.goto("/aniversario");

  await expect(page.getByText(es().countdown.today)).toBeVisible();
});

test("the program lists every session with its time", async ({ page, net }) => {
  net.enable("Aniversario");
  await page.goto("/aniversario");

  const program = page.locator("section").filter({ hasText: es().agenda.h2 }).first();

  for (const item of data("agenda")) {
    await expect(program.getByText(item.label, { exact: true })).toBeVisible();
    await expect(program.getByText(item.time, { exact: true })).toBeVisible();
  }
});

test("the speakers section lists each speaker under its group", async ({ page, net }) => {
  net.enable("Aniversario");
  await page.goto("/aniversario");

  const copy = es().ponentes;
  const section = page.locator("section").filter({ hasText: copy.h2 }).first();
  const groupLabels = { keynotes: "keynotesLabel", talks: "talksLabel", panels: "panelLabel" } as const;

  for (const [group, speakers] of Object.entries(data("speakers"))) {
    await expect(section.getByRole("heading", { name: copy[groupLabels[group]] })).toBeVisible();

    for (const speaker of speakers) {
      await expect(section.getByText(speaker.name, { exact: true })).toBeVisible();
    }
  }
});

// The form only reads ?category=, so the package travels in the URL for the recipient, not as a prefilled field.
test("each sponsor package link points at the contact form with its package", async ({ page, net }) => {
  net.enable("Aniversario");
  await page.goto("/patrocinadores");

  for (const pack of ["Silver", "Gold", "Platinum", "Diamond"]) {
    await expect(page.getByRole("link", { name: pack })).toHaveAttribute(
      "href",
      `/?category=Sponsor&package=${pack}#contacto`,
    );
  }
});

test("the venue address links to its Google Maps share URL", async ({ page, net }) => {
  net.enable("Aniversario");
  await page.goto("/aniversario");

  await expect(page.getByRole("link", { name: es().ubicacion.cta })).toHaveAttribute(
    "href",
    "https://www.google.com/maps/search/?api=1&query=Hotel%20Marbella%20Manzanillo%20Colima",
  );
});
