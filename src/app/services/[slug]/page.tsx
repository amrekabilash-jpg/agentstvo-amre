import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import {
  getServiceBySlug,
  getAllServiceSlugs,
  type ServiceData,
} from "@/lib/services-data";

const BASE = "https://geoaeo.pro";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `${BASE}/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${BASE}/services/${slug}`,
      type: "website",
    },
  };
}

function faqSchema(service: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

function serviceSchema(service: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.headline,
    description: service.description,
    url: `${BASE}/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Агентство",
      url: BASE,
      telephone: "+77017282236",
      email: "hello@geoaeo.pro",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Алматы",
        addressCountry: "KZ",
      },
    },
    areaServed: [
      { "@type": "City", name: "Алматы" },
      { "@type": "Country", name: "Казахстан" },
    ],
  };
}

const badgeColors: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-700",
  emerald: "bg-emerald-50 text-emerald-700",
  pink: "bg-pink-50 text-pink-700",
  amber: "bg-amber-50 text-amber-700",
  violet: "bg-violet-50 text-violet-700",
  orange: "bg-orange-50 text-orange-700",
};

export default async function ServicePage({ params }: Params): Promise<React.ReactElement> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const badgeClass = badgeColors[service.color] ?? badgeColors.indigo;

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: BASE },
          { name: "Услуги", url: `${BASE}/services` },
          { name: service.title, url: `${BASE}/services/${slug}` },
        ])}
      />

      <main>
        {/* Hero — коммерческий H1 + CTA */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-lavender relative overflow-hidden">
          <div className="blob blob-md absolute -top-10 -right-10 opacity-40" aria-hidden="true" />
          <div className="container-atlantis relative max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
              <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Главная</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[var(--foreground)] transition-colors">Услуги</Link>
              <span>/</span>
              <span className="text-[var(--foreground)]">{service.title}</span>
            </nav>

            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 ${badgeClass}`}>
              {service.badge}
            </span>

            <h1 className="display-hero mb-5">{service.headline}</h1>

            <p className="text-body text-[var(--foreground-secondary)] mb-8 max-w-xl">
              {service.description}
            </p>

            <Link href="/contacts" className="btn-primary inline-flex">
              Бесплатная консультация
            </Link>
          </div>
        </section>

        {/* FAQ — главная SEO-ценность */}
        <section className="section-atlantis bg-white">
          <div className="container-atlantis max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)] mb-4">
              Частые вопросы
            </p>
            <h2 className="display-section mb-10">Отвечаем на главное</h2>

            <div className="space-y-3">
              {service.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-[var(--border)] overflow-hidden"
                  open={i === 0}
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors text-sm leading-snug">
                    {faq.q}
                    <span className="text-[var(--foreground-muted)] group-open:rotate-45 transition-transform text-xl flex-shrink-0 ml-2">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 pt-3 text-[var(--foreground-secondary)] leading-relaxed text-sm border-t border-[var(--border)]">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-lavender">
          <div className="container-atlantis max-w-xl text-center">
            <h2 className="text-h3 font-bold mb-3">Готовы начать?</h2>
            <p className="text-body-sm text-[var(--foreground-secondary)] mb-6">
              Первая консультация бесплатно — обсудим вашу задачу
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contacts" className="btn-primary inline-flex">
                Написать нам
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-7 py-4 border border-[var(--border)] rounded-xl text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent-blue)] transition-colors"
              >
                Все услуги
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
