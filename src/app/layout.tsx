import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  founderSchema,
  webSiteSchema,
  faqSchema,
} from "@/components/seo/JsonLd";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const BASE_URL = "https://www.geoaeo.pro";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "GeoAEO — GEO и AEO оптимизация под ChatGPT, Perplexity, Gemini | Алматы",
    template: "%s | GeoAEO — GEO и AEO агентство",
  },
  description:
    "GeoAEO — агентство GEO и AEO оптимизации в Алматы. Выводим бизнес в ответы ChatGPT, Perplexity, Google AI Overview и Gemini. Плюс SEO, креатив и AI-автоматизация. Первая консультация бесплатно.",
  keywords: [
    "GEO оптимизация",
    "AEO оптимизация",
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "продвижение в ChatGPT",
    "продвижение в Perplexity",
    "попасть в ответы AI",
    "GEO AEO агентство Казахстан",
    "цифровое агентство Алматы",
    "SEO оптимизация Казахстан",
    "AI автоматизация бизнеса",
    "креативное агентство",
    "разработка сайтов Алматы",
    "маркетинговое агентство",
    "продвижение бизнеса",
    "digital агентство",
    "автоматизация процессов",
    "Агентство",
  ],
  authors: [{ name: "Агентство", url: BASE_URL }],
  creator: "Агентство",
  publisher: "Агентство",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "GeoAEO — GEO и AEO оптимизация под ChatGPT, Perplexity, Gemini",
    description:
      "Выводим бизнес в ответы AI-поисковиков: ChatGPT, Perplexity, Google AI Overview. Плюс SEO, креатив и AI-автоматизация.",
    url: BASE_URL,
    siteName: "GeoAEO",
    type: "website",
    locale: "ru_KZ",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Агентство — Цифровое агентство нового поколения",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoAEO — GEO и AEO оптимизация в Алматы",
    description:
      "Выводим бизнес в ответы ChatGPT, Perplexity и Google AI Overview. Первая консультация бесплатно.",
    images: [`${BASE_URL}/opengraph-image`],
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
  verification: {
    google: "2pfAB5nj5WdZkHWUfmlClBFVXteLTAFGl5k-IdWV_ic",
  },
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
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={founderSchema} />
        <JsonLd data={webSiteSchema} />
        <JsonLd data={faqSchema} />
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
      {process.env.NEXT_PUBLIC_GA_ID ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      ) : null}
    </html>
  );
}
