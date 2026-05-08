import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated: string;
  author: { name: string; role: string };
  category: string;
  tags: string[];
  featuredImage: { src: string; alt: string };
  draft: boolean;
  seo: { title: string; description: string; canonical: string };
  content: string;
  readingTime: number;
}

export interface BlogPostMeta extends Omit<BlogPost, "content"> {}

function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = matter(raw);

      if (data.draft === true) return null;

      return {
        slug: data.slug || filename.replace(/\.mdx?$/, ""),
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        date: data.date ?? "",
        updated: data.updated ?? data.date ?? "",
        author: data.author ?? { name: "Агентство", role: "" },
        category: data.category ?? "",
        tags: data.tags ?? [],
        featuredImage: data.featuredImage ?? { src: "", alt: "" },
        draft: false,
        seo: data.seo ?? {
          title: data.title ?? "",
          description: data.excerpt ?? "",
          canonical: `https://geoaeo.pro/blog/${data.slug}`,
        },
        readingTime: calcReadingTime(content),
      } satisfies BlogPostMeta;
    })
    .filter(Boolean) as BlogPostMeta[];

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    const fileSlug = data.slug || filename.replace(/\.mdx?$/, "");
    if (fileSlug !== slug) continue;
    if (data.draft === true) return null;

    const htmlContent = marked(content) as string;

    return {
      slug: fileSlug,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      date: data.date ?? "",
      updated: data.updated ?? data.date ?? "",
      author: data.author ?? { name: "Агентство", role: "" },
      category: data.category ?? "",
      tags: data.tags ?? [],
      featuredImage: data.featuredImage ?? { src: "", alt: "" },
      draft: false,
      seo: data.seo ?? {
        title: data.title ?? "",
        description: data.excerpt ?? "",
        canonical: `https://geoaeo.pro/blog/${fileSlug}`,
      },
      content: htmlContent,
      readingTime: calcReadingTime(content),
    };
  }

  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === currentSlug);
  if (!current) return all.filter((p) => p.slug !== currentSlug).slice(0, count);

  // Score by shared tags + same category
  const scored = all
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
      const sameCategory = p.category === current.category ? 2 : 0;
      return { post: p, score: sharedTags + sameCategory };
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime());

  return scored.slice(0, count).map((s) => s.post);
}
