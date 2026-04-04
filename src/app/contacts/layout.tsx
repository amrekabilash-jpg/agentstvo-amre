import type { Metadata } from "next";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Контакты — Связаться с агентством в Алматы",
  description:
    "Свяжитесь с цифровым агентством Агентсво. Алматы, Казахстан. Телефон: +7 701 728 22 36, email: hello@agentsvo.com. WhatsApp, форма обратной связи. Первая консультация бесплатно.",
  keywords: [
    "контакты Агентсво",
    "digital агентство Алматы контакты",
    "заказать SEO Алматы",
    "консультация маркетинг",
    "связаться с агентством",
    "WhatsApp агентство",
  ],
  alternates: {
    canonical: "https://agentsvo.com/contacts",
  },
  openGraph: {
    title: "Контакты | Агентсво — Цифровое агентство",
    description: "Свяжитесь с нами: +7 701 728 22 36, hello@agentsvo.com. Первая консультация бесплатно.",
    url: "https://agentsvo.com/contacts",
    type: "website",
  },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "https://agentsvo.com" },
          { name: "Контакты", url: "https://agentsvo.com/contacts" },
        ])}
      />
      {children}
    </>
  );
}
