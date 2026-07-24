import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { glossaryTerms } from "@/lib/glossary-data";

const BASE_URL = "https://www.geoaeo.pro";

export const metadata: Metadata = {
  title: "Словарь терминов GEO, AEO и SEO",
  description:
    "Простыми словами: что такое GEO, AEO, LLM, RAG, Schema.org, white label и другие термины AI-поиска и SEO-продвижения. Словарь от GeoAEO.",
  alternates: { canonical: `${BASE_URL}/glossary` },
};

function definedTermSetSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Словарь терминов GEO, AEO и SEO — GeoAEO",
    url: `${BASE_URL}/glossary`,
    hasDefinedTerm: glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/glossary#${t.slug}`,
      name: t.term,
      description: t.fullDefinition,
      inDefinedTermSet: `${BASE_URL}/glossary`,
    })),
  };
}

export default function GlossaryPage(): React.ReactElement {
  return (
    <div className="bg-white">
      <JsonLd data={definedTermSetSchema()} />

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-lavender">
        <div className="container-atlantis max-w-3xl">
          <span className="text-label text-[#5B5FEF] block mb-4">Справочник</span>
          <h1 className="display-hero mb-4">Словарь терминов GEO, AEO и SEO</h1>
          <p className="text-body text-[var(--foreground-secondary)] max-w-xl">
            Простыми словами объясняем термины, которые встречаются в GEO/AEO-продвижении
            и оптимизации под AI-поисковики. Если чего-то не хватает — напишите нам.
          </p>
        </div>
      </section>

      <section className="section-atlantis bg-white">
        <div className="container-atlantis max-w-3xl">
          <div className="space-y-4">
            {glossaryTerms.map((t) => (
              <div
                key={t.slug}
                id={t.slug}
                className="rounded-2xl border border-[var(--border)] p-6 scroll-mt-24"
              >
                <h2 className="text-h4 font-bold mb-2">{t.term}</h2>
                <p className="text-body-sm text-[var(--foreground-secondary)] leading-relaxed mb-2">
                  {t.fullDefinition}
                </p>
                {t.relatedServiceSlug && (
                  <Link
                    href={`/services/${t.relatedServiceSlug}`}
                    className="text-sm font-semibold text-[var(--accent-blue)] hover:underline"
                  >
                    Подробнее об услуге →
                  </Link>
                )}
                {t.relatedBlogSlug && (
                  <Link
                    href={`/blog/${t.relatedBlogSlug}`}
                    className="text-sm font-semibold text-[var(--accent-blue)] hover:underline"
                  >
                    Читать статью →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-lavender">
        <div className="container-atlantis max-w-xl text-center">
          <h2 className="text-h3 font-bold mb-3">Нужна GEO/AEO-стратегия под ваш бизнес?</h2>
          <p className="text-body-sm text-[var(--foreground-secondary)] mb-6">
            Первая консультация бесплатно — разберём, где вас сейчас не видит AI-поиск
          </p>
          <Link href="/contacts" className="btn-primary inline-flex">
            Написать нам
          </Link>
        </div>
      </section>
    </div>
  );
}
