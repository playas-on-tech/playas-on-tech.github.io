import { expect, test, locale } from "./helpers";

const copy = () => locale("es");

test("the gated anniversary link is hidden while the flag is off", async ({ page, net }) => {
  await page.goto("/");

  // The flag has to have resolved to off, not merely never arrived.
  await expect.poll(() => net.answered.length).toBeGreaterThan(0);

  const links = copy().footer.columns.flatMap((column: { links: { href: string; label: string }[] }) => column.links);
  const gated = links.find((link) => link.href === "/aniversario");
  const ungated = links.find((link) => link.href === "/codigo-conducta");

  await expect(page.getByRole("link", { name: gated?.label })).toHaveCount(0);
  await expect(page.getByRole("link", { name: ungated?.label, exact: true })).toBeVisible();
});

test("social links open in a new tab", async ({ page }) => {
  await page.goto("/");

  const instagram = page.getByRole("link", { name: "Instagram" });
  await expect(instagram).toHaveAttribute("target", "_blank");
  await expect(instagram).toHaveAttribute("rel", "noopener noreferrer");
});
