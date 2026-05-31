import { execSync } from "child_process";
import type { MetadataRoute } from "next";

// Required when `output: 'export'` is set in next.config — see
// https://nextjs.org/docs/advanced-features/static-html-export
export const dynamic = "force-static";

const BASE_URL = "https://playasontech.com";

/**
 * Last‑modified date derived from the most recent git commit so the sitemap
 * updates automatically when new content lands but stays stable across
 * re‑builds of the same commit.
 */
const BUILD_DATE = new Date(
  execSync("git log -1 --format=%cI", { stdio: ["ignore", "pipe", "ignore"] })
    .toString()
    .trim(),
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/aniversario`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/patrocinadores`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/codigo-conducta`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/terminos`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
