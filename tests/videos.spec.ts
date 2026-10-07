import { expect, test, locale } from "./helpers";

test("each video card links to its recording", async ({ page }) => {
  await page.goto("/");

  for (const video of locale("es").videos.videos) {
    await expect(page.getByRole("link").filter({ hasText: video.title })).toHaveAttribute(
      "href",
      `https://www.youtube.com/watch?v=${video.id}`,
    );
  }
});
