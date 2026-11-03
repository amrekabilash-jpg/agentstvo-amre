import { JsonLd, breadcrumbSchema, ORG_ID, SITE_URL } from "@/components/seo/JsonLd";
import { servicesData } from "@/lib/services-data";
import { ServicesPageClient } from "./ServicesPageClient";

/* Server wrapper: JSON-LD for the /services hub only (not inherited by /services/[slug]). */
const servicesListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/services#list`,
  name: "Услуги GeoAEO",
  itemListElement: servicesData.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      "@id": `${SITE_URL}/services/${s.slug}#service`,
      name: s.title,
      url: `${SITE_URL}/services/${s.slug}`,
      provider: { "@id": ORG_ID },
    },
  })),
};

export default function ServicesPage(): React.ReactElement {
  return (
    <>
      <JsonLd data={servicesListSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: SITE_URL },
          { name: "Услуги", url: `${SITE_URL}/services` },
        ])}
      />
      <ServicesPageClient />
    </>
  );
}
