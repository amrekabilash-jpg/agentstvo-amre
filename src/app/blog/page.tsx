import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

const BASE_URL = "https://geoaeo.pro";

export const metadata: Metadata = {
  title: "Блог — SEO, GEO, AI-автоматизация для бизнеса",
  description:
    "Экспертные статьи о SEO, GEO-оптимизации, AI-автоматизации и цифровом маркетинге для бизнеса в Казахстане. Практические руководства от команды Агентства.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Блог Агентства — SEO, GEO & AI для бизнеса",
    description:
      "Практические статьи о GEO, SEO и AI-автоматизации. Реальные кейсы и руководства от цифрового агентства в Алматы.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "GEO & SEO": "bg-indigo-50 text-[#5B5FEF]",
  "AI автоматизация": "bg-emerald-50 text-emerald-700",
  "Дизайн": "bg-pink-50 text-[#E84393]",
  "Кейсы": "bg-orange-50 text-orange-600",
};

function categoryColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-600";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage(): React.ReactElement {
  const posts = getAllPosts();

  const breadcrumb = breadcrumbSchema([
    { name: "Главная", url: BASE_URL },
    { name: "Блог", url: `${BASE_URL}/blog` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      <main>
        {/* Hero */}
        <section className="section-atlantis bg-lavender relative overflow-hidden">
          <div className="blob blob-lg absolute -top-20 -right-20" aria-hidden="true" />
          <div className="container-atlantis relative">
            <nav aria-label="Хлебные крошки" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                <li>
                  <Link href="/" className="hover:text-[var(--accent-blue)] transition-colors">
                    Главная
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[var(--foreground)]" aria-current="page">
                  Блог
                </li>
              </ol>
            </nav>

            <span className="text-label text-[#5B5FEF] block mb-3">Блог</span>
            <h1 className="display-hero mb-4 max-w-2xl">
              SEO, GEO & AI — <br />
              <span className="text-[#5B5FEF]">разбираем без воды</span>
            </h1>
            <p className="text-body max-w-xl">
              Практические руководства, кейсы и инсайты о цифровом маркетинге
              и AI-автоматизации для бизнеса в Казахстане.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="section-atlantis bg-[var(--surface)]">
          <div className="container-atlantis">
            {posts.length === 0 ? (
              <p className="text-body text-center py-20">Статьи скоро появятся.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="card-atlantis group flex flex-col h-full"
                  >
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor(post.category)}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-[var(--foreground-muted)]">
                        {post.readingTime} мин
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-h3 mb-3 group-hover:text-[var(--accent-blue)] transition-colors flex-1">
                      <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-2">
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-body-sm mb-5 line-clamp-3">{post.excerpt}</p>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border)]">
                      <div className="text-xs text-[var(--foreground-muted)]">
                        <span className="font-medium text-[var(--foreground-secondary)]">
                          {post.author.name}
                        </span>
                        <span className="mx-1.5">·</span>
                        {formatDate(post.date)}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-semibold text-[#5B5FEF] hover:underline underline-offset-2 flex items-center gap-1"
                        aria-label={`Читать статью: ${post.title}`}
                      >
                        Читать →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
