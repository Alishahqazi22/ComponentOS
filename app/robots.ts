import { MetadataRoute } from "next";

const BASE_URL = "https://componentos.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all major search engine crawlers to index everything
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",          // Admin panel — private
          "/dashboard/",      // User dashboard — private
          "/api/",            // API endpoints — not for indexing
          "/_next/",          // Next.js internals
          "/404",             // Error pages
        ],
      },
      {
        // Block AI training bots completely
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Google-Extended",
          "FacebookBot",
          "Applebot-Extended",
          "Bytespider",
          "omgili",
          "Diffbot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
