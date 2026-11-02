#!/usr/bin/env node
/**
 * SEO / GEO / AEO technical audit — zero dependencies (Node 18+).
 *
 * Crawls every URL from /sitemap.xml (plus internal links found on those pages)
 * and checks the server-rendered HTML for: HTTP status, title, meta description,
 * H1, canonical, lang, hreflang, meta robots / X-Robots-Tag, JSON-LD validity,
 * duplicate metadata, broken internal links and sitemap consistency.
 *
 * Usage:
 *   node scripts/seo-audit.mjs [baseUrl] [--json out.json] [--md out.md] [--strict]
 *   baseUrl defaults to http://localhost:3000 (run `npm run build && npm start` first).
 *
 * Canonical URLs in the HTML point to the production origin; the script maps them
 * back to baseUrl when it follows them.
 *
 * --strict exits with code 1 when any P0/P1 issue is found (for CI).
 */

const args = process.argv.slice(2);
const base = (args.find((a) => /^https?:\/\//.test(a)) || "http://localhost:3000").replace(/\/$/, "");
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const jsonOut = flag("--json");
const mdOut = flag("--md");
const strict = args.includes("--strict");

const PROD = "https://www.geoaeo.pro";
const TITLE_MAX = 60;
const TITLE_HARD_MAX = 70;
const DESC_MIN = 70;
const DESC_MAX = 160;

const toLocal = (u) => u.replace(PROD, base);

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const strip = (s) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const len = (s) => [...(s || "")].length;

function metaContent(html, attr, value) {
  const re = new RegExp(`<meta[^>]*${attr}="${value}"[^>]*>`, "gi");
  return [...html.matchAll(re)].map((m) => {
    const c = m[0].match(/content="([^"]*)"/i);
    return c ? decode(c[1]) : "";
  });
}

function collectTypes(node, out) {
  if (Array.isArray(node)) return node.forEach((n) => collectTypes(n, out));
  if (node && typeof node === "object") {
    if (node["@graph"]) collectTypes(node["@graph"], out);
    if (node["@type"]) out.push({ type: [].concat(node["@type"]).join("/"), id: node["@id"], node });
  }
  return out;
}

async function get(url, ua) {
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      redirect: "manual",
      headers: ua ? { "user-agent": ua } : {},
    });
    const body = res.headers.get("content-type")?.includes("text") || res.headers.get("content-type")?.includes("xml")
      ? await res.text()
      : "";
    return { status: res.status, headers: res.headers, body, ms: Date.now() - t0 };
  } catch (e) {
    return { status: 0, headers: new Headers(), body: "", error: String(e), ms: Date.now() - t0 };
  }
}

function auditPage(url, res) {
  const html = res.body;
  const issues = [];
  const add = (p, msg) => issues.push({ p, msg });

  const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => strip(m[1]));
  const title = titles[0] || "";
  const descs = metaContent(html, "name", "description");
  const desc = descs[0] || "";
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1]));
  const canonicals = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*>/gi)].map(
    (m) => (m[0].match(/href="([^"]*)"/) || [])[1] || ""
  );
  const lang = (html.match(/<html[^>]*\slang="([^"]*)"/i) || [])[1] || "";
  const hreflang = [...html.matchAll(/<link[^>]*hrefLang="([^"]*)"[^>]*href="([^"]*)"/gi)].map((m) => `${m[1]}→${m[2]}`);
  const robots = metaContent(html, "name", "robots").join(" | ");
  const xRobots = res.headers.get("x-robots-tag") || "";
  const ogTitle = metaContent(html, "property", "og:title")[0] || "";
  const ogDesc = metaContent(html, "property", "og:description")[0] || "";

  // JSON-LD
  const ldBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const ld = [];
  let ldErrors = 0;
  for (const b of ldBlocks) {
    try {
      collectTypes(JSON.parse(b[1]), ld);
    } catch {
      ldErrors++;
    }
  }
  const ldTypes = ld.map((x) => x.type);

  // Visible dates (datetime attr or "Опубликовано"/"Обновлено")
  const hasTimeTag = /<time[^>]*datetime=/i.test(html);
  const hasDateWords = /Опубликовано|Обновлено|Updated|Published/i.test(strip(html.replace(/<script[\s\S]*?<\/script>/gi, "")));

  // Internal links
  const links = [...html.matchAll(/<a[^>]*href="([^"#]*)(#[^"]*)?"/gi)]
    .map((m) => m[1])
    .filter((h) => h.startsWith("/") && !h.startsWith("//"));
  const imgs = [...html.matchAll(/<img[^>]*src="([^"]*)"/gi)].map((m) => m[1]).filter((s) => s.startsWith("/"));

  // ── Checks ──
  if (res.status !== 200) add("P0", `HTTP ${res.status}`);
  if (/noindex/i.test(robots) || /noindex/i.test(xRobots)) add("P0", `noindex (${robots || xRobots})`);
  if (!title) add("P1", "Нет <title>");
  if (titles.length > 1) add("P1", `Несколько <title> (${titles.length})`);
  if (len(title) > TITLE_HARD_MAX) add("P1", `Title ${len(title)} симв. (> ${TITLE_HARD_MAX})`);
  else if (len(title) > TITLE_MAX) add("P2", `Title ${len(title)} симв. (> ${TITLE_MAX})`);
  if (/GeoAEO.*GeoAEO|\|.*\|.*\|/i.test(title)) add("P1", "Бренд/разделитель дублируется в Title");
  if (!desc) add("P1", "Нет meta description");
  if (descs.length > 1) add("P1", `Несколько meta description (${descs.length})`);
  if (desc && len(desc) > DESC_MAX) add("P1", `Description ${len(desc)} симв. (> ${DESC_MAX})`);
  if (desc && len(desc) < DESC_MIN) add("P2", `Description ${len(desc)} симв. (< ${DESC_MIN})`);
  if (h1s.length === 0) add("P1", "Нет H1");
  if (h1s.length > 1) add("P1", `Несколько H1 (${h1s.length})`);
  if (canonicals.length === 0) add("P1", "Нет canonical");
  if (canonicals.length > 1) add("P1", `Несколько canonical (${canonicals.length})`);
  const expectedCanonical = PROD + (url.replace(base, "") === "/" ? "" : url.replace(base, ""));
  if (canonicals[0] && canonicals[0].replace(/\/$/, "") !== expectedCanonical.replace(/\/$/, ""))
    add("P0", `Canonical указывает на другой URL: ${canonicals[0]}`);
  if (!lang) add("P1", "Нет lang у <html>");
  if (ldErrors) add("P1", `JSON-LD: ${ldErrors} блок(ов) с синтаксической ошибкой`);
  const typeCount = ldTypes.reduce((a, t) => ((a[t] = (a[t] || 0) + 1), a), {});
  for (const [t, n] of Object.entries(typeCount)) {
    if (n > 1 && ["FAQPage", "BreadcrumbList", "Organization", "WebSite", "Article", "BlogPosting"].includes(t))
      add("P1", `JSON-LD: ${t} встречается ${n} раз(а)`);
  }
  // FAQPage must match visible content
  for (const x of ld.filter((x) => x.type === "FAQPage")) {
    const qs = (x.node.mainEntity || []).map((q) => q.name);
    const text = strip(html.replace(/<script[\s\S]*?<\/script>/gi, ""));
    const missing = qs.filter((q) => !text.includes(q));
    if (missing.length) add("P1", `FAQPage: ${missing.length}/${qs.length} вопросов не видны на странице`);
  }
  for (const x of ld.filter((x) => x.type === "WebSite")) {
    if (x.node.potentialAction) add("P2", "WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную)");
  }
  for (const x of ld.filter((x) => /Article|BlogPosting/.test(x.type))) {
    for (const k of ["headline", "datePublished", "dateModified", "author", "publisher", "mainEntityOfPage"])
      if (!x.node[k]) add("P2", `${x.type}: нет поля ${k}`);
    const mep = x.node.mainEntityOfPage?.["@id"] || x.node.mainEntityOfPage;
    if (mep && typeof mep === "string" && mep.replace(/\/$/, "") !== expectedCanonical.replace(/\/$/, ""))
      add("P1", `${x.type}.mainEntityOfPage указывает на ${mep}`);
  }
  for (const x of ld) {
    if (x.node.aggregateRating) add("P1", `${x.type}: aggregateRating без видимых отзывов (проверьте)`);
  }

  return {
    url: url.replace(base, "") || "/",
    status: res.status,
    ms: res.ms,
    title,
    titleLen: len(title),
    desc,
    descLen: len(desc),
    h1: h1s,
    canonical: canonicals.join(" , "),
    lang,
    hreflang,
    robots,
    xRobots,
    ogTitle,
    ogDesc,
    ldTypes,
    ldErrors,
    hasDates: hasTimeTag || hasDateWords,
    links,
    imgs,
    issues,
  };
}

async function main() {
  const report = { base, generatedAt: new Date().toISOString(), pages: [], site: [] };
  const siteIssue = (p, msg) => report.site.push({ p, msg });

  // robots.txt
  const robots = await get(`${base}/robots.txt`);
  report.robotsStatus = robots.status;
  report.robotsTxt = robots.body;
  if (robots.status !== 200) siteIssue("P0", `robots.txt HTTP ${robots.status}`);
  if (/Disallow:\s*\/_next\/\s*$/m.test(robots.body))
    siteIssue("P1", "robots.txt запрещает /_next/ — краулеры не могут загрузить CSS/JS для рендеринга");
  const groups = robots.body.split(/\n(?=User-Agent:)/i);
  const botRules = {};
  for (const bot of ["*", "Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "GPTBot", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User"]) {
    const g = groups.find((g) => new RegExp(`^User-Agent:\\s*${bot.replace("*", "\\*")}\\s*$`, "im").test(g));
    botRules[bot] = g ? (/Disallow:\s*\/\s*$/m.test(g) ? "BLOCKED" : "allowed (own group)") : "falls back to *";
  }
  report.botRules = botRules;

  // sitemap
  const sm = await get(`${base}/sitemap.xml`);
  report.sitemapStatus = sm.status;
  const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const lastmods = [...sm.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  report.sitemapCount = locs.length;
  if (sm.status !== 200) siteIssue("P0", `sitemap.xml HTTP ${sm.status}`);
  const dupLocs = locs.filter((l, i) => locs.indexOf(l) !== i);
  if (dupLocs.length) siteIssue("P1", `Дубли в sitemap: ${dupLocs.join(", ")}`);
  const nowish = lastmods.filter((d) => Math.abs(Date.now() - Date.parse(d)) < 60 * 60 * 1000).length;
  if (nowish > locs.length / 2)
    siteIssue("P2", `sitemap: ${nowish}/${locs.length} lastmod = время сборки/запроса (не отражают реальные изменения)`);

  // crawl
  const queue = locs.map(toLocal);
  const seen = new Set();
  const linkSources = new Map();
  while (queue.length) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    const res = await get(url);
    if (res.status >= 300 && res.status < 400) {
      report.pages.push({ url: url.replace(base, ""), status: res.status, location: res.headers.get("location"), issues: [{ p: locs.map(toLocal).includes(url) ? "P1" : "P2", msg: `Редирект → ${res.headers.get("location")}` }], ldTypes: [], h1: [], hreflang: [], links: [], imgs: [] });
      continue;
    }
    if (!(res.headers.get("content-type") || "").includes("html")) continue;
    const page = auditPage(url, res);
    page.inSitemap = locs.map(toLocal).includes(url);
    report.pages.push(page);
    for (const l of page.links) {
      const abs = base + l.replace(/\/$/, "");
      if (!linkSources.has(abs)) linkSources.set(abs, new Set());
      linkSources.get(abs).add(page.url);
      if (!seen.has(abs) && !/\.(pdf|png|jpe?g|svg|webp|txt|xml)$/i.test(l)) queue.push(abs);
    }
  }

  // assets referenced (images) — check existence
  const assets = new Map();
  for (const p of report.pages) for (const i of p.imgs || []) {
    if (!assets.has(i)) assets.set(i, new Set());
    assets.get(i).add(p.url);
  }
  for (const [a, from] of assets) {
    const r = await fetch(base + a, { method: "HEAD" }).catch(() => ({ status: 0 }));
    if (r.status !== 200) siteIssue("P1", `Изображение ${a} → HTTP ${r.status} (на ${[...from].slice(0, 3).join(", ")}${from.size > 3 ? ` +${from.size - 3}` : ""})`);
  }

  // broken internal links
  for (const p of report.pages) {
    if (p.status >= 400) {
      const from = [...(linkSources.get(base + p.url) || [])];
      siteIssue("P1", `Битая внутренняя ссылка ${p.url} (HTTP ${p.status}) ← ${from.slice(0, 5).join(", ")}`);
    }
    if (p.status === 200 && !p.inSitemap && p.url !== "/") siteIssue("P2", `Страница ${p.url} (200) не в sitemap`);
  }

  // duplicate metadata across pages
  const by = (k) => {
    const m = new Map();
    for (const p of report.pages.filter((p) => p.status === 200)) {
      if (!p[k]) continue;
      m.set(p[k], [...(m.get(p[k]) || []), p.url]);
    }
    return [...m].filter(([, v]) => v.length > 1);
  };
  for (const [t, urls] of by("title")) siteIssue("P1", `Одинаковый Title на ${urls.length} стр.: «${t}» — ${urls.join(", ")}`);
  for (const [d, urls] of by("desc")) siteIssue("P1", `Одинаковый Description на ${urls.length} стр.: ${urls.join(", ")}`);

  // AI crawler access (UA spoof against local server — shows app-level behaviour only)
  const uas = {
    Googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "OAI-SearchBot": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot",
    "ChatGPT-User": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
    ClaudeBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
    PerplexityBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  };
  report.uaChecks = {};
  for (const [name, ua] of Object.entries(uas)) {
    const r = await get(`${base}/`, ua);
    const h1 = (r.body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1];
    report.uaChecks[name] = { status: r.status, bytes: r.body.length, h1InHtml: Boolean(h1) };
    if (r.status !== 200) siteIssue("P0", `${name}: главная отдаёт HTTP ${r.status}`);
  }

  // llms.txt
  const llms = await get(`${base}/llms.txt`);
  report.llms = { status: llms.status, hasH1: /^# /m.test(llms.body), links: (llms.body.match(/https?:\/\/[^\s)]+/g) || []).length, bytes: llms.body.length };
  const llmsLinks = [...new Set((llms.body.match(/https:\/\/www\.geoaeo\.pro[^\s)>\]]*/g) || []))];
  report.llms.brokenLinks = [];
  for (const l of llmsLinks) {
    const r = await get(toLocal(l.replace(/[.,;]$/, "")));
    if (r.status !== 200) report.llms.brokenLinks.push(`${l} → ${r.status}`);
  }
  if (report.llms.brokenLinks.length) siteIssue("P2", `llms.txt: ${report.llms.brokenLinks.length} ссылок не отдают 200`);

  // summary
  const all = [...report.site, ...report.pages.flatMap((p) => p.issues.map((i) => ({ ...i, url: p.url })))];
  report.summary = ["P0", "P1", "P2"].reduce((a, p) => ((a[p] = all.filter((i) => i.p === p).length), a), {});

  if (jsonOut) (await import("fs")).writeFileSync(jsonOut, JSON.stringify(report, null, 2));
  if (mdOut) (await import("fs")).writeFileSync(mdOut, toMarkdown(report));

  console.log(`Audited ${report.pages.length} URLs on ${base}`);
  console.log(`Sitemap URLs: ${report.sitemapCount}`);
  console.log(`Issues: P0=${report.summary.P0} P1=${report.summary.P1} P2=${report.summary.P2}`);
  for (const i of report.site) console.log(`  [${i.p}] ${i.msg}`);
  for (const p of report.pages) for (const i of p.issues) console.log(`  [${i.p}] ${p.url}: ${i.msg}`);

  if (strict && (report.summary.P0 || report.summary.P1)) process.exit(1);
}

function esc(s) {
  return String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function toMarkdown(r) {
  const L = [];
  L.push(`Base: \`${r.base}\` · ${r.generatedAt}`, "");
  L.push(`Итого: **P0=${r.summary.P0} · P1=${r.summary.P1} · P2=${r.summary.P2}** · страниц: ${r.pages.length} · в sitemap: ${r.sitemapCount}`, "");
  L.push("| URL | HTTP | Title | Дл. | Description | Дл. | H1 | Canonical | lang | robots | JSON-LD | Даты |");
  L.push("|---|---|---|---|---|---|---|---|---|---|---|---|");
  for (const p of r.pages) {
    L.push(
      `| ${esc(p.url)} | ${p.status} | ${esc(p.title)} | ${p.titleLen ?? ""} | ${esc(p.desc)} | ${p.descLen ?? ""} | ${esc((p.h1 || []).join(" ‖ "))}${p.h1?.length > 1 ? ` (**${p.h1.length}×**)` : ""} | ${esc((p.canonical || "").replace(PROD, "") || "—")} | ${p.lang ?? ""} | ${esc(p.robots || "—")} | ${esc((p.ldTypes || []).join(", "))} | ${p.hasDates ? "да" : "нет"} |`
    );
  }
  L.push("", "### Проблемы по страницам", "");
  L.push("| Приоритет | URL | Проблема |", "|---|---|---|");
  for (const pr of ["P0", "P1", "P2"]) {
    for (const i of r.site.filter((i) => i.p === pr)) L.push(`| ${pr} | (сайт) | ${esc(i.msg)} |`);
    for (const p of r.pages) for (const i of p.issues.filter((i) => i.p === pr)) L.push(`| ${pr} | ${esc(p.url)} | ${esc(i.msg)} |`);
  }
  return L.join("\n") + "\n";
}

main();
