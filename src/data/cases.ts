export interface CaseItem {
  id: string;
  title: string;
  client: string;
  url: string;
  category: string;
  description: string;
  services: string[];
  tags: string[];
  gradient: string;
  accentColor: string;
  results: { label: string; value: string }[];
}

export const cases: CaseItem[] = [
  {
    id: "ainuralzhan",
    title: "Личный бренд и лидогенерация",
    client: "Ainur Alzhan",
    url: "ainuralzhan.com",
    category: "Разработка + SEO/GEO/AEO",
    description:
      "Разработка персонального сайта-портфолио с полным циклом продвижения: SEO, GEO и AEO оптимизация для видимости в AI-поиске, настройка воронки лидогенерации и дальнейшее сопровождение.",
    services: ["Веб-разработка", "SEO / GEO / AEO", "Лидогенерация", "Сопровождение"],
    tags: ["Next.js", "SEO", "GEO", "AEO", "Личный бренд"],
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    accentColor: "#7C3AED",
    results: [
      { label: "Услуг", value: "4 в 1" },
      { label: "Формат", value: "Full-cycle" },
      { label: "Поддержка", value: "Ongoing" },
    ],
  },
  {
    id: "caspianesp",
    title: "Корпоративный сайт энергетической компании",
    client: "Caspian ESP",
    url: "caspianesp.com",
    category: "Корпоративная разработка",
    description:
      "Корпоративный сайт для крупного поставщика энергетических ресурсов из Гонконга. Компания занимается поставкой аккумуляторов, солнечных батарей и комплектующих для спецтехники на международный рынок.",
    services: ["Веб-разработка", "UI/UX Дизайн", "Корпоративный сайт", "Мультиязычность"],
    tags: ["Next.js", "Корпоративный", "UI/UX", "Гонконг", "B2B"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    accentColor: "#059669",
    results: [
      { label: "Рынок", value: "Международный" },
      { label: "Язык", value: "EN / RU" },
      { label: "Сектор", value: "Энергетика" },
    ],
  },
  {
    id: "autoparts",
    title: "Бизнес-сайт производителя автозапчастей",
    client: "AutoParts LLC",
    url: "autoparts.llc",
    category: "Веб-разработка + Каталог",
    description:
      "Сайт для официального представителя китайского производителя масляных, салонных и воздушных фильтров, а также патрубков для спецтехники и автомобилей. Каталог продукции с фильтрацией по маркам и моделям.",
    services: ["Веб-разработка", "Каталог продукции", "UI/UX Дизайн", "SEO"],
    tags: ["Next.js", "Каталог", "B2B", "Автозапчасти", "Китай"],
    gradient: "from-orange-500 via-red-500 to-rose-600",
    accentColor: "#EA580C",
    results: [
      { label: "Продукция", value: "Каталог" },
      { label: "Сектор", value: "Авто / Спецтехника" },
      { label: "Рынок", value: "КЗ / РФ / УЗ" },
    ],
  },
  {
    id: "autoparts-saas",
    title: "SaaS платформа финансового учёта",
    client: "AutoParts LLC — внутренний продукт",
    url: "autoparts.llc",
    category: "SaaS разработка",
    description:
      "Внутренняя SaaS-платформа для финансового учёта компании AutoParts LLC. Автоматизация учёта поставок, расходов, прибыли и отчётности. Замена ручных таблиц на полноценную систему управления финансами.",
    services: ["SaaS разработка", "Финансовый учёт", "Дашборд", "Автоматизация"],
    tags: ["Next.js", "SaaS", "Финтех", "Дашборд", "AI автоматизация"],
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    accentColor: "#4F46E5",
    results: [
      { label: "Тип", value: "SaaS / B2B" },
      { label: "Модуль", value: "Финансы" },
      { label: "Формат", value: "Дашборд" },
    ],
  },
];
