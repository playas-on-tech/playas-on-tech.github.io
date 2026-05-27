import type { MetadataRoute } from "next";

const BASE_URL = "https://playasontech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified, priority: 1.0 },
    { url: `${BASE_URL}/aniversario`, lastModified, priority: 1.0 },
    { url: `${BASE_URL}/aniversario/patrocinadores`, lastModified, priority: 0.6 },
    { url: `${BASE_URL}/codigo-conducta`, lastModified, priority: 0.6 },
    { url: `${BASE_URL}/terminos`, lastModified, priority: 0.6 },
  ];
}
