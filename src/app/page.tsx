import { Hero } from "@/components/sections/Hero";
import { QuoteBlocks } from "@/components/sections/QuoteBlocks";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Cases } from "@/components/sections/Cases";
import { WhyUs } from "@/components/sections/WhyUs";
import { RecentPosts } from "@/components/sections/RecentPosts";
import { HomeFaq } from "@/components/sections/HomeFaq";
import { CTA } from "@/components/sections/CTA";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { JsonLd, faqPageSchema, SITE_URL } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/lib/home-faq";

export default function Home(): React.ReactElement {
  return (
    <>
      <JsonLd data={faqPageSchema(homeFaqs, SITE_URL)} />
      <Hero />
      <QuoteBlocks />
      <Clients />
      <Services />
      <Stats />
      <Cases />
      <WhyUs />
      <RecentPosts />
      <HomeFaq />
      <CTA />
      <FloatingContact />
    </>
  );
}
