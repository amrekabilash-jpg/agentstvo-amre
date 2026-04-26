import { Hero } from "@/components/sections/Hero";
import { QuoteBlocks } from "@/components/sections/QuoteBlocks";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Cases } from "@/components/sections/Cases";
import { WhyUs } from "@/components/sections/WhyUs";
import { RecentPosts } from "@/components/sections/RecentPosts";
import { CTA } from "@/components/sections/CTA";
import { FloatingContact } from "@/components/ui/FloatingContact";

export default function Home(): React.ReactElement {
  return (
    <>
      <Hero />
      <QuoteBlocks />
      <Clients />
      <Services />
      <Stats />
      <Cases />
      <WhyUs />
      <RecentPosts />
      <CTA />
      <FloatingContact />
    </>
  );
}
