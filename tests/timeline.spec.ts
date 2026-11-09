import { expect, test, locale } from "./helpers";

test("the timeline lists every edition and links to its recording", async ({ page }) => {
  await page.goto("/");

  const editions = locale("es").editionsTimeline.editions;

  for (const edition of editions) {
    await expect(page.getByText(edition.title, { exact: true }).first()).toBeVisible();
  }

  const recorded = editions.filter((edition) => edition.video);
  const links = page.getByRole("link", { name: "Ver sesión" });
  await expect(links).toHaveCount(recorded.length);

  for (const [index, edition] of recorded.entries()) {
    await expect(links.nth(index)).toHaveAttribute("href", `https://www.youtube.com/watch?v=${edition.video}`);
  }

  // The upcoming meetup links to its Eventbrite registration.
  const reserve = page.getByRole("link", { name: "Reservar lugar" });
  await expect(reserve).toHaveCount(1);
  await expect(reserve).toHaveAttribute("href", "https://www.eventbrite.com.mx/e/sesion-noviembre-2026-playasontech-tickets-2004596114942?aff=playasontech");
});

test("the timeline scrolls when it is dragged", async ({ page }) => {
  await page.goto("/");

  const slider = page.getByRole("list").filter({ hasText: "El primer encuentro" }).locator("..");
  await slider.evaluate((el: HTMLElement) => el.scrollTo({ left: 0 }));

  const box = await slider.boundingBox();
  if (!box) throw new Error("the timeline is not visible");

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + 20, box.y + box.height / 2, { steps: 5 });
  await page.mouse.up();

  await expect.poll(() => slider.evaluate((el: HTMLElement) => el.scrollLeft)).toBeGreaterThan(0);
});
