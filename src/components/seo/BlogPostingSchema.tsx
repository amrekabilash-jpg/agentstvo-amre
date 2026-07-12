interface BlogPostingSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  authorUrl?: string;
  articleBody?: string;
}

export function BlogPostingSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName = "Агентство",
  authorUrl = "https://www.geoaeo.pro",
  articleBody,
}: BlogPostingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    },
    datePublished: new Date(datePublished).toISOString(),
    dateModified: new Date(dateModified).toISOString(),
    author: {
      "@type": "Organization",
      name: authorName,
      url: authorUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${authorUrl}/blog`,
    },
    ...(articleBody && { articleBody }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
