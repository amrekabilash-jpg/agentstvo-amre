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
  founder: {
    "@type": "Person",
    "@id": "https://geoaeo.pro/#founder",
    name: "Амре Кабылаш",
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "18:00",
    },
  ],
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

/* ── Founder Schema (Person) for E-E-A-T ── */
export const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://geoaeo.pro/#founder",
  name: "Амре Кабылаш",
  image: "https://geoaeo.pro/images/amre-profile.svg",
  jobTitle: "Основатель и Стратег",
  email: "hello@geoaeo.pro",
  telephone: "+77017282236",
  url: "https://geoaeo.pro/about",
  sameAs: [
    "https://geoaeo.pro/about"
  ],
  knowsAbout: [
    "SEO Optimization",
    "GEO (Generative Engine Optimization)",
    "AEO (Answer Engine Optimization)",
    "AI Automation",
    "Digital Marketing",
    "Schema.org",
    "Content Strategy",
    "Link Building",
    "Technical SEO",
  ],
  workLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
  },
  affiliation: {
    "@type": "Organization",
    name: "Агентство",
    url: "https://geoaeo.pro",
  },
  description:
    "Основатель агентства, эксперт в SEO, GEO и AI-автоматизации. 6+ лет опыта, помог 50+ компаниям увеличить органический трафик на 150-500%. Google Analytics Certified, HubSpot Certified, Schema.org Specialist.",
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


/* ── HowTo Schema (AEO) for Blog Posts ── */

/* HowTo: n8n Automation Setup (5 steps) */
export function howToN8nAutomationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Как настроить n8n для автоматизации бизнес-процессов",
    description: "Пошаговое руководство по внедрению n8n для автоматизации повторяющихся задач в вашем бизнесе.",
    image: "https://geoaeo.pro/images/blog/n8n-setup.svg",
    estimatedCost: {
      "@type": "PriceSpecification",
      currency: "KZT",
      price: "0"
    },
    totalTime: "PT2H",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Настройка автоматизации обработки лидов",
        text: "Создайте workflow в n8n который автоматически получает новые заявки из форм вашего сайта и отправляет их в CRM. Цель: сократить время обработки лида с 30 минут до 1 минуты."
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Генерация еженедельных отчётов",
        text: "Настройте автоматическое формирование отчётов каждый понедельник. n8n сможет собрать данные из разных источников и отправить единый отчёт."
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Создание напоминаний и уведомлений",
        text: "Настройте систему напоминаний для важных дат. Отправляйте уведомления в WhatsApp, Telegram или Email."
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Мониторинг и алерты системы",
        text: "Создайте workflow который проверяет критические метрики и отправляет алерты при проблемах."
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Синхронизация данных между системами",
        text: "Настройте двухстороннюю синхронизацию данных между вашей CRM, счётной системой и маркетинговой платформой."
      }
    ]
  };
}

/* HowTo: Google AI Overview Optimization (7 steps) */
export function howToGoogleAIOverviewSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Как попасть в Google AI Overview: пошаговое руководство",
    description: "7 шагов для оптимизации контента под Google AI Overview и появления в AI-сводках поиска.",
    image: "https://geoaeo.pro/images/blog/google-ai-overview.svg",
    estimatedCost: {
      "@type": "PriceSpecification",
      currency: "KZT",
      price: "0"
    },
    totalTime: "PT4W",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Исследование вопросов целевой аудитории",
        text: "Используйте AnswerThePublic, Google People Also Ask и Яндекс.Вордстат для сбора 30-50 конкретных вопросов вашей аудитории."
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Создание ответо-центричного контента",
        text: "Структурируйте контент так, чтобы каждый раздел был вопросом + конкретный ответ в первых 2-3 предложениях."
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Добавление FAQPage Schema разметки",
        text: "Внедрите FAQPage Schema с вашими основными вопросами и ответами."
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Использование HowTo Schema для инструкций",
        text: "Пошаговые руководства с HowTo Schema попадают в AI Overview значительно чаще."
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Оптимизация структуры страницы",
        text: "Используйте иерархию заголовков (H1 → H2 → H3), таблицы для сравнений, маркированные списки."
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Улучшение Core Web Vitals",
        text: "Оптимизируйте скорость загрузки сайта до LCP < 2.5 сек, FID < 100 мс, CLS < 0.1."
      },
      {
        "@type": "HowToStep",
        position: 7,
        name: "Наращивание E-E-A-T сигналов",
        text: "Добавьте биографию автора с достижениями, опубликуйте кейсы с конкретными цифрами."
      }
    ]
  };
}

/* HowTo: Local SEO for Almaty (4 steps) */
export function howToLocalSEOSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Как улучшить локальный SEO для бизнеса в Алматы",
    description: "4-недельный план локальной SEO оптимизации для казахстанского бизнеса.",
    image: "https://geoaeo.pro/images/blog/local-seo-almaty.svg",
    estimatedCost: {
      "@type": "PriceSpecification",
      currency: "KZT",
      price: "0"
    },
    totalTime: "P4W",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Исследование локальных ключевых слов",
        text: "Найдите 20-30 локальных ключевых слов с добавлением 'Алматы', 'в Алматы', 'Алматы 2026'."
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Оптимизация Google My Business профиля",
        text: "Заполните все поля в Google My Business: полное описание, фото, часы работы (все 7 дней)."
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Создание локальных цитаций в казахстанских директориях",
        text: "Подайте информацию о вашей компании в 10+ казахстанских директориев: Yell.kz, 2GIS, Avvo.kz, Bir.agency."
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Мониторинг локальных рейтингов и отзывов",
        text: "Еженедельно проверяйте позиции в Google Maps. Поощряйте клиентов оставлять отзывы."
      }
    ]
  };
}

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
