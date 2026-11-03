import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "О нас: команда и подход к GEO/AEO",
  description:
    "GeoAEO — агентство GEO/AEO-оптимизации из Алматы. Кто мы, как работаем и почему соединяем маркетинг, дизайн, код и AI-автоматизацию в одной команде.",
  keywords: [
    "о нас Агентство",
    "команда digital агентства",
    "миссия агентства",
    "цифровое агентство Алматы",
    "AI команда Казахстан",
    "маркетинг дизайн код",
  ],
  alternates: {
    canonical: "https://www.geoaeo.pro/about",
  },
  openGraph: {
    title: "О нас: команда и подход к GEO/AEO",
    description: "Команда инженеров и стратегов. Маркетинг, дизайн и код в единой системе.",
    url: "https://www.geoaeo.pro/about",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "https://www.geoaeo.pro" },
          { name: "О нас", url: "https://www.geoaeo.pro/about" },
        ])}
      />
      {children}
    </>
  );
}
