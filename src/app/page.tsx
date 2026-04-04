import { Hero } from "@/components/sections/Hero";
import { QuoteBlocks } from "@/components/sections/QuoteBlocks";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Cases } from "@/components/sections/Cases";
import { WhyUs } from "@/components/sections/WhyUs";
import { CTA } from "@/components/sections/CTA";
import { FloatingContact } from "@/components/ui/FloatingContact";

/* Atlantis exact page flow:
   Hero → QuoteBlocks (storytelling) → Clients (tech/values) →
   Services (checklist) → Stats (projects) → Cases (dedicated) →
   WhyUs (culture) → CTA (love the work)
*/

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
      <CTA />
      <FloatingContact />
    </>
  );
}
