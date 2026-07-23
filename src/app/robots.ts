import type { MetadataRoute } from "next";

// Required when `output: 'export'` is set in next.config — see
// https://nextjs.org/docs/advanced-features/static-html-export
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search engines — full access
      { userAgent: "*", allow: "/" },

      // AI crawlers — explicitly allow so PlayasOnTech can be cited by
      // ChatGPT, Perplexity, Claude, Gemini and similar answer engines.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: "https://playasontech.com/sitemap.xml",
    host: "https://playasontech.com",
  };
}
