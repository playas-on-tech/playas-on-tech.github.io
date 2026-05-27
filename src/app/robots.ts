import type { MetadataRoute } from "next";

// Required when `output: 'export'` is set in next.config — see
// https://nextjs.org/docs/advanced-features/static-html-export
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://playasontech.com/sitemap.xml",
  };
}
