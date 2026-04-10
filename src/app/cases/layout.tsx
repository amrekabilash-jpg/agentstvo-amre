import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Кейсы и портфолио — Результаты работ агентства",
  description:
    "Реальные кейсы digital-агентства Агентство. SEO-продвижение, креативные проекты и AI-автоматизация для бизнеса в Казахстане. Rentai, Baurzan & CO, Asil Partners, Renkie.ai.",
  keywords: [
    "кейсы digital агентства",
    "портфолио SEO",
    "результаты продвижения",
    "примеры работ",
    "кейсы автоматизация",
    "Rentai",
    "Baurzan",
    "Asil Partners",
    "Renkie.ai",
  ],
  alternates: {
    canonical: "https://agentsvo.com/cases",
  },
  openGraph: {
    title: "Кейсы и портфолио | Агентство",
    description: "Реальные результаты наших клиентов. SEO, креатив, AI-автоматизация.",
    url: "https://agentsvo.com/cases",
    type: "website",
  },
};

export default function CasesLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "https://agentsvo.com" },
          { name: "Кейсы", url: "https://agentsvo.com/cases" },
        ])}
      />
      {children}
    </>
  );
}
