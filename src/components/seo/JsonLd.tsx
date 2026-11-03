/* JSON-LD structured data.
 *
 * Rules (see GEOAEO_AUDIT_BEFORE.md):
 *  - One entity per real thing, linked by stable @id (no duplicated / conflicting Organization nodes).
 *  - Only facts that are visible on the site or confirmed by the owner. No ratings, no unverifiable claims.
 *  - FAQPage only on pages where the same questions are visible to users.
 */

export const SITE_URL = "https://www.geoaeo.pro";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/* ── Site-wide graph: Organization + WebSite + founder ── */
export const organizationNode = {
  // ProfessionalService is a subtype of Organization/LocalBusiness: a single node, not two competing ones.
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: "GeoAEO",
  alternateName: ["geoaeo.pro", "GeoAEO Agency"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logo.svg`,
  },
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Агентство GEO и AEO-оптимизации из Алматы: помогает бизнесу быть понятным для AI-поиска (ChatGPT, Perplexity, Google AI Overview, Gemini). Также SEO, разработка сайтов, дизайн и AI-автоматизация.",
  slogan: "Делаем бизнес понятным для AI-поиска",
  foundingDate: "2024",
  founder: { "@id": FOUNDER_ID },
  email: "hello@geoaeo.pro",
  telephone: "+77017282236",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Алматы",
    addressCountry: "KZ",
  },
  areaServed: [
    { "@type": "Country", name: "Казахстан" },
    { "@type": "Country", name: "Россия" },
    { "@type": "Country", name: "Узбекистан" },
    { "@type": "Country", name: "Кыргызстан" },
  ],
  knowsLanguage: ["ru", "kk", "en"],
  knowsAbout: [
    "Generative Engine Optimization (GEO)",
    "Answer Engine Optimization (AEO)",
    "SEO",
    "Schema.org",
    "AI-автоматизация бизнес-процессов",
    "Разработка сайтов",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+77017282236",
    email: "hello@geoaeo.pro",
    contactType: "customer service",
    availableLanguage: ["Russian", "Kazakh", "English"],
  },
  // Official profiles only (chat deep links like wa.me are contact methods, not profiles).
  sameAs: ["https://t.me/agentsvo"],
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "GeoAEO",
  url: SITE_URL,
  inLanguage: "ru",
  publisher: { "@id": ORG_ID },
  // No SearchAction: the site has no internal search.
};

export const founderNode = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: "Амре Кабылаш",
  jobTitle: "Основатель GeoAEO",
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/images/amre-profile.svg`,
  worksFor: { "@id": ORG_ID },
  knowsAbout: ["GEO", "AEO", "SEO", "AI-автоматизация"],
};

export const siteGraphSchema = {
  "@context": "https://schema.org",
  "@graph": [organizationNode, websiteNode, founderNode],
};

/* ── FAQPage built from the questions actually rendered on a page ── */
export function faqPageSchema(
  items: readonly { q: string; a: string }[],
  pageUrl: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/* ── Breadcrumbs ── */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
