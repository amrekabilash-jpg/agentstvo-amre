import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги: GEO/AEO, SEO, сайты и AI-автоматизация",
  description:
    "Услуги GeoAEO в Алматы: GEO/AEO-оптимизация, SEO, разработка сайтов, UI/UX, брендинг, видео и AI-автоматизация. Состав работ и этапы по каждой.",
  keywords: [
    "SEO оптимизация Алматы",
    "GEO продвижение",
    "креативный дизайн",
    "AI автоматизация",
    "digital маркетинг Казахстан",
    "продвижение сайтов",
    "контент маркетинг",
    "разработка бренда",
  ],
  alternates: {
    canonical: "https://www.geoaeo.pro/services",
  },
  openGraph: {
    title: "Услуги GeoAEO: GEO/AEO, SEO, сайты и AI",
    description: "Комплексные digital-решения для роста бизнеса. SEO, креатив и AI-автоматизация.",
    url: "https://www.geoaeo.pro/services",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  // JSON-LD lives in page.tsx so it is not duplicated on /services/[slug].
  return <>{children}</>;
}
