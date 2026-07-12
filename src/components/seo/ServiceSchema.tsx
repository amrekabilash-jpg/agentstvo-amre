interface ServiceSchemaProps {
  name: string;
  description: string;
  image: string;
  url: string;
  serviceType?: string;
  areaServed?: string[];
  priceRange?: string;
  rating?: number;
  ratingCount?: number;
  availability?: "https://schema.org/InStock";
}

export function ServiceSchema({
  name,
  description,
  image,
  url,
  serviceType = "Service",
  areaServed = ["Алматы", "Казахстан"],
  priceRange,
  rating,
  ratingCount,
  availability,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    image: {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    },
    url: url,
    provider: {
      "@type": "LocalBusiness",
      name: "Агентство",
      url: "https://www.geoaeo.pro",
      telephone: "+7 (727) 310-93-99",
      email: "hello@geoaeo.pro",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Алматы",
        addressCountry: "KZ",
      },
    },
    serviceType: serviceType,
    areaServed: areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    ...(priceRange && { priceRange: priceRange }),
    ...(rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating,
        ratingCount: ratingCount || 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(availability && { availability }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
