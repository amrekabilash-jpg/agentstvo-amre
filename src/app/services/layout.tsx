import type { Metadata } from "next";
import { JsonLd, servicesSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Услуги SEO, Креатив и AI-автоматизация в Алматы",
  description:
    "SEO-оптимизация и GEO продвижение, креативный дизайн, AI-автоматизация бизнес-процессов. Комплексные digital-решения для роста вашего бизнеса в Казахстане.",
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
    canonical: "https://agentsvo.com/services",
  },
  openGraph: {
    title: "Услуги — SEO, Креатив, AI | Агентство",
    description: "Комплексные digital-решения для роста бизнеса. SEO, креатив и AI-автоматизация.",
    url: "https://agentsvo.com/services",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <JsonLd data={servicesSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "https://agentsvo.com" },
          { name: "Услуги", url: "https://agentsvo.com/services" },
        ])}
      />
      {children}
    </>
  );
}
