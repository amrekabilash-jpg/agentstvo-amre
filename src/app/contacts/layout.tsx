import type { Metadata } from "next";
import { JsonLd, faqPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { translations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Контакты GEO/AEO-агентства в Алматы",
  description:
    "Свяжитесь с GeoAEO: +7 701 728 22 36, hello@geoaeo.pro, WhatsApp и Telegram. Алматы, работаем онлайн по СНГ. Первая консультация бесплатно.",
  keywords: [
    "контакты Агентство",
    "digital агентство Алматы контакты",
    "заказать SEO Алматы",
    "консультация маркетинг",
    "связаться с агентством",
    "WhatsApp агентство",
  ],
  alternates: {
    canonical: "https://www.geoaeo.pro/contacts",
  },
  openGraph: {
    title: "Контакты GEO/AEO-агентства GeoAEO в Алматы",
    description: "Свяжитесь с нами: +7 701 728 22 36, hello@geoaeo.pro. Первая консультация бесплатно.",
    url: "https://www.geoaeo.pro/contacts",
    type: "website",
  },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      {/* Same questions as the visible FAQ block (server-rendered in Russian). */}
      <JsonLd data={faqPageSchema(translations.ru.contacts.faqItems, "https://www.geoaeo.pro/contacts")} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "https://www.geoaeo.pro" },
          { name: "Контакты", url: "https://www.geoaeo.pro/contacts" },
        ])}
      />
      {children}
    </>
  );
}
