import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const BASE_URL = "https://geoaeo.pro";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seo.title || post.title,
    description: post.seo.description || post.excerpt,
    alternates: { canonical: post.seo.canonical },
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.seo.title || post.title,
      description: post.seo.description || post.excerpt,
      url: post.seo.canonical,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author.name],
      tags: post.tags,
      images: post.featuredImage.src
        ? [{ url: `${BASE_URL}${post.featuredImage.src}`, alt: post.featuredImage.alt }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title || post.title,
      description: post.seo.description || post.excerpt,
    },
  };
}

function articleSchema(post: Awaited<ReturnType<typeof getPostBySlug>> & object) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.updated).toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      worksFor: {
        "@type": "Organization",
        name: "Агентство",
        url: BASE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Агентство",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": post.seo.canonical },
    image: post.featuredImage.src
      ? `${BASE_URL}${post.featuredImage.src}`
      : `${BASE_URL}/opengraph-image`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "ru",
    url: post.seo.canonical,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Params): Promise<React.ReactElement> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: "Главная", url: BASE_URL },
    { name: "Блог", url: `${BASE_URL}/blog` },
    { name: post.title, url: post.seo.canonical },
  ]);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumb} />

      <main>
        {/* Hero */}
        <section className="section-atlantis bg-lavender relative overflow-hidden">
          <div className="blob blob-md absolute -top-10 -right-10 opacity-40" aria-hidden="true" />
          <div className="container-atlantis relative max-w-4xl">
            <Breadcrumb
              items={[
                { name: "Главная", href: "/" },
                { name: "Блог", href: "/blog" },
                { name: post.title },
              ]}
            />

            {/* Category + reading time */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-[#5B5FEF]">
                {post.category}
              </span>
              <span className="text-xs text-[var(--foreground-muted)]">
                {post.readingTime} мин чтения
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-secondary)]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="display-hero mb-6">{post.title}</h1>

            {/* Author + date */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-blue)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {post.author.name}
                </p>
                <p className="text-xs text-[var(--foreground-muted)]">
                  {post.author.role} · Опубликовано {formatDate(post.date)}
                  {post.updated !== post.date && (
                    <span> · Обновлено {formatDate(post.updated)}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <section className="py-16 lg:py-24">
          <div className="container-atlantis max-w-4xl">
            <article
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-[var(--foreground)] prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-7 prose-h3:mb-3
                prose-p:text-[var(--foreground-secondary)] prose-p:leading-relaxed prose-p:mb-5
                prose-a:text-[var(--accent-blue)] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[var(--foreground)] prose-strong:font-semibold
                prose-ul:my-4 prose-li:text-[var(--foreground-secondary)] prose-li:mb-1
                prose-ol:my-4
                prose-blockquote:border-l-4 prose-blockquote:border-[var(--accent-blue)] prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-[var(--foreground-secondary)]
                prose-table:w-full prose-th:text-left prose-th:font-semibold prose-th:py-3 prose-th:px-4 prose-th:border-b-2 prose-th:border-[var(--border)] prose-th:text-[var(--foreground)]
                prose-td:py-3 prose-td:px-4 prose-td:border-b prose-td:border-[var(--border-light)] prose-td:text-[var(--foreground-secondary)]
                prose-code:text-[var(--accent-blue)] prose-code:bg-[var(--surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-[var(--surface)] prose-pre:border prose-pre:border-[var(--border)] prose-pre:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-16 p-8 rounded-2xl bg-lavender border border-[var(--border)] text-center">
              <h2 className="text-h3 mb-3">
                Готовы внедрить это для вашего бизнеса?
              </h2>
              <p className="text-body-sm mb-6 max-w-md mx-auto">
                Первая консультация бесплатно — разберём ваш конкретный случай
                и составим план действий.
              </p>
              <Link href="/contacts" className="btn-primary inline-flex">
                Бесплатная консультация
              </Link>
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link
                href="/blog"
                className="text-sm font-semibold text-[var(--accent-blue)] hover:underline underline-offset-2 flex items-center gap-1"
              >
                ← Все статьи
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
