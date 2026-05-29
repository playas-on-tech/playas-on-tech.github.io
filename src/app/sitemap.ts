import type { MetadataRoute } from "next";

// Required when `output: 'export'` is set in next.config — see
// https://nextjs.org/docs/advanced-features/static-html-export
export const dynamic = "force-static";

const BASE_URL = "https://playasontech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified, priority: 1.0 },
    { url: `${BASE_URL}/aniversario`, lastModified, priority: 1.0 },
    { url: `${BASE_URL}/aniversario/patrocinadores`, lastModified, priority: 0.6 },
    { url: `${BASE_URL}/patrocinadores`, lastModified, priority: 0.6 },
    { url: `${BASE_URL}/codigo-conducta`, lastModified, priority: 0.6 },
    { url: `${BASE_URL}/terminos`, lastModified, priority: 0.6 },
  ];
}
