import type { MetadataRoute } from "next";

/*
 * robots.txt
 * - Public pages are open to search engines and AI crawlers/fetchers.
 * - /api/ (form endpoint) is closed. /_next/ is NOT blocked: crawlers need CSS/JS/fonts to render pages.
 * - Explicit groups document intent; a bot without its own group falls back to "*" (allowed).
 * robots.txt sets access rules for compliant bots only — it does not guarantee indexing or citation.
 */
const DISALLOW = ["/api/"];

const BOTS = [
  // Search engines
  "Googlebot",
  "Bingbot",
  "YandexBot",
  // OpenAI: search index, user-initiated fetch, model training
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic: training, search index, user-initiated fetch
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity: search index, user-initiated fetch
  "PerplexityBot",
  "Perplexity-User",
  // Google AI training/grounding control token (Gemini); does not affect Google Search
  "Google-Extended",
  // Apple Intelligence training control token
  "Applebot-Extended",
  // Others
  "CCBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW })),
    ],
    sitemap: "https://www.geoaeo.pro/sitemap.xml",
    host: "https://www.geoaeo.pro",
  };
}
