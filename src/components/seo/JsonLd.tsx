/* JSON-LD Structured Data for SEO/GEO/AEO */

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── Organization + LocalBusiness (GEO) ── */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://geoaeo.pro/#organization",
  name: "Агентство",
  alternateName: "Agentsvo",
  url: "https://geoaeo.pro",
  logo: {
    "@type": "ImageObject",
    url: "https://geoaeo.pro/images/logo.svg",
    width: 52,
    height: 52,
  },
  description:
    "Цифровое агентство нового поколения в Алматы, Казахстан. SEO-оптимизация, GEO, креативные услуги и автоматизация бизнеса с помощью AI.",
  foundingDate: "2024",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
  },
  email: "hello@geoaeo.pro",
  sameAs: ["https://geoaeo.pro"],
  telephone: "+77017282236",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Алматы",
    addressRegion: "Алматы",
    addressCountry: "KZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+77017282236",
    contactType: "customer service",
    availableLanguage: ["Russian", "English", "Kazakh"],
    areaServed: ["KZ", "RU", "BY", "UZ", "KG"],
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://geoaeo.pro/#local-business",
  name: "Агентство — Цифровое агентство",
  image: "https://geoaeo.pro/images/logo.svg",
  url: "https://geoaeo.pro",
  telephone: "+77017282236",
  email: "hello@geoaeo.pro",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Алматы",
    addressRegion: "Алматы",
    addressCountry: "KZ",
    addressRegionCode: "ALA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.238949,
    longitude: 76.945465,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 43.238949,
      longitude: 76.945465,
    },
    geoRadius: "5000km",
  },
  knowsLanguage: ["ru", "en", "kk"],
  areaServed: [
    { "@type": "Country", name: "Казахстан" },
    { "@type": "Country", name: "Россия" },
    { "@type": "Country", name: "Узбекистан" },
    { "@type": "Country", name: "Кыргызстан" },
  ],
};

/* ── WebSite (AEO — Search Actions) ── */
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Агентство",
  url: "https://geoaeo.pro",
  inLanguage: "ru",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://geoaeo.pro/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

/* ── FAQ Schema (AEO) for /contacts ── */
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Сколько стоят ваши услуги?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость зависит от объёма задач. Первая консультация бесплатно — обсудим бюджет и предложим оптимальный формат.",
      },
    },
    {
      "@type": "Question",
      name: "Как быстро вы начинаете работу?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Обычно запускаем проект в течение 3-5 рабочих дней после согласования деталей и подписания договора.",
      },
    },
    {
      "@type": "Question",
      name: "Работаете ли вы с компаниями из других стран?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да! Мы работаем удалённо с клиентами из Казахстана, России, Узбекистана и других стран СНГ.",
      },
    },
  ],
};

/* ── Services Schema (AEO) ── */
export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "Organization",
    name: "Агентство",
    url: "https://geoaeo.pro",
  },
  serviceType: "Digital Marketing Agency",
  areaServed: {
    "@type": "Country",
    name: "Казахстан",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Услуги цифрового агентства",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO-оптимизация и GEO",
          description:
            "Комплексное продвижение сайтов в поисковых системах. Техническое SEO, контент-стратегия, линкбилдинг, локальная оптимизация.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Креатив и дизайн",
          description:
            "Разработка бренд-айдентики, дизайн сайтов, создание контента и визуальных материалов.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI-автоматизация",
          description:
            "Внедрение AI-решений для автоматизации бизнес-процессов, чат-боты, аналитика данных.",
        },
      },
    ],
  },
};

/* ── Breadcrumb helpers (AEO) ── */
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
