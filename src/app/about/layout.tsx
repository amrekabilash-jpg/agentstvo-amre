import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "О нас — Команда, миссия и ценности агентства",
  description:
    "Цифровое агентство Агентсво в Алматы. Команда инженеров и стратегов, объединившая маркетинг, дизайн и код. Возвращаем вам 6 часов каждый день.",
  keywords: [
    "о нас Агентсво",
    "команда digital агентства",
    "миссия агентства",
    "цифровое агентство Алматы",
    "AI команда Казахстан",
    "маркетинг дизайн код",
  ],
  alternates: {
    canonical: "https://agentsvo.com/about",
  },
  openGraph: {
    title: "О нас — Команда Агентсво",
    description: "Команда инженеров и стратегов. Маркетинг, дизайн и код в единой системе.",
    url: "https://agentsvo.com/about",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "https://agentsvo.com" },
          { name: "О нас", url: "https://agentsvo.com/about" },
        ])}
      />
      {children}
    </>
  );
}
