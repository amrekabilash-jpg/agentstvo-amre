import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NavFooter } from "@/components/layout/NavFooter";
import { PageTransition } from "@/components/ui/page-transition";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { LangProvider } from "@/lib/lang-context";
import {
  JsonLd,
  organizationSchema,
  localBusinessSchema,
  webSiteSchema,
} from "@/components/seo/JsonLd";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const BASE_URL = "https://agentsvo.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Агентсво — Цифровое агентство в Алматы | SEO, Креатив, AI",
    template: "%s | Агентсво — Цифровое агентство",
  },
  description:
    "Цифровое агентство в Алматы. SEO-оптимизация, GEO, креативные услуги и AI-автоматизация для бизнеса. Возвращаем вам 6 часов каждый день. Первая консультация бесплатно.",
  keywords: [
    "цифровое агентство Алматы",
    "SEO оптимизация Казахстан",
    "GEO оптимизация",
    "AI автоматизация бизнеса",
    "креативное агентство",
    "разработка сайтов Алматы",
    "маркетинговое агентство",
    "продвижение бизнеса",
    "digital агентство",
    "автоматизация процессов",
    "Агентсво",
  ],
  authors: [{ name: "Агентсво", url: BASE_URL }],
  creator: "Агентсво",
  publisher: "Агентсво",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "ru-KZ": BASE_URL,
      "ru-RU": BASE_URL,
    },
  },
  openGraph: {
    title: "Агентсво — Цифровое агентство в Алматы | SEO, Креатив, AI",
    description:
      "SEO-оптимизация, GEO, креативные услуги и AI-автоматизация. Помогаем бизнесу расти быстрее и умнее.",
    url: BASE_URL,
    siteName: "Агентсво",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Агентсво — Цифровое агентство нового поколения",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Агентсво — Цифровое агентство в Алматы",
    description:
      "SEO, GEO, креатив и AI-автоматизация для вашего бизнеса. Первая консультация бесплатно.",
    images: [`${BASE_URL}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // TODO: замени на реальный код из Google Search Console → Настройки → Подтверждение права собственности → HTML-тег
  // verification: {
  //   google: "ВАШ_КОД_ЗДЕСЬ",
  // },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="ru" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="ru-KZ" href={BASE_URL} />
        <link rel="alternate" hrefLang="ru-RU" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <LangProvider>
          <ScrollProgress />
          <CursorGlow />
          <Header />
          <main className="pt-20">
            <PageTransition>{children}</PageTransition>
          </main>
          <NavFooter />
          <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
