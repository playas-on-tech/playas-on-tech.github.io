import { expect, test, locale } from "./helpers";
import { MEETUP } from "../src/lib/event";

const es = locale("es");
const DAY = 86_400_000;

test("the card badge says upcoming while the meetup is in the future", async ({ page }) => {
  await page.clock.install({ time: new Date(new Date(MEETUP.dateISO).getTime() - DAY) });
  await page.goto("/");
  await expect(page.locator("#eventos")).toContainText(es.eventos.soonTag);
  await expect(page.getByRole("link", { name: es.eventos.cta })).toBeVisible();
});

test("the card badge flips to the recent-event tag once the meetup has passed", async ({ page }) => {
  await page.clock.install({ time: new Date(new Date(MEETUP.dateISO).getTime() + DAY) });
  await page.goto("/");
  await expect(page.locator("#eventos")).toContainText(es.eventos.pastTag);
  await expect(page.getByRole("link", { name: es.eventos.cta })).toHaveCount(0);
});
