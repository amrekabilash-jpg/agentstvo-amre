import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

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
  });
}

export function RecentPosts(): React.ReactElement {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return <></>;

  return (
    <section className="section-atlantis bg-[var(--surface)] relative overflow-hidden">
      <div className="container-atlantis">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-label text-[#5B5FEF] block mb-2">Блог</span>
            <h2 className="display-section">Последние статьи</h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-blue)] hover:underline underline-offset-2 pb-1"
          >
            Все статьи →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="card-atlantis group flex flex-col h-full"
            >
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

              <h3 className="text-h3 mb-3 group-hover:text-[var(--accent-blue)] transition-colors flex-1">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline underline-offset-2"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="text-body-sm mb-5 line-clamp-2">{post.excerpt}</p>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--foreground-muted)]">
                  {formatDate(post.date)}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-[#5B5FEF] hover:underline underline-offset-2"
                  aria-label={`Читать: ${post.title}`}
                >
                  Читать →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "all posts" link */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="btn-secondary inline-flex">
            Все статьи
          </Link>
        </div>
      </div>
    </section>
  );
}
