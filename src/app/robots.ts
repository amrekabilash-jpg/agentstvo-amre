import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Все обычные боты и люди
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // ChatGPT (обучение)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // ChatGPT Search (поиск в реальном времени — критично для цитирования)
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // ChatGPT при переходе по ссылкам пользователя
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Claude (Anthropic)
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Perplexity-User",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Common Crawl — датасет, на котором обучаются почти все LLM
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Apple Intelligence / Siri
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Amazon Alexa / Rufus
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Meta AI (Llama)
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // DuckDuckGo AI (DuckAssist)
      {
        userAgent: "DuckAssistBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Mistral AI
      {
        userAgent: "MistralAI-User",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // xAI Grok
      {
        userAgent: "GrokBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Cohere
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Google Gemini / AI Overview
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Meta AI
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Bing / Copilot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://www.geoaeo.pro/sitemap.xml",
    host: "https://www.geoaeo.pro",
  };
}
