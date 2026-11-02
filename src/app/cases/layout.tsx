import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Кейсы и портфолио: сайты, SEO и автоматизация",
  description:
    "Проекты GeoAEO: корпоративные сайты, каталог, SaaS-платформа и личный бренд с SEO/GEO/AEO. Задачи, решения и использованные технологии.",
  keywords: [
    "кейсы digital агентства",
    "портфолио SEO",
    "результаты продвижения",
    "примеры работ",
    "кейсы автоматизация",
  ],
  alternates: {
    canonical: "https://www.geoaeo.pro/cases",
  },
  openGraph: {
    title: "Кейсы и портфолио | GeoAEO",
    description: "Реальные результаты наших клиентов. SEO, креатив, AI-автоматизация.",
    url: "https://www.geoaeo.pro/cases",
    type: "website",
  },
};

export default function CasesLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "https://www.geoaeo.pro" },
          { name: "Кейсы", url: "https://www.geoaeo.pro/cases" },
        ])}
      />
      {children}
    </>
  );
}
