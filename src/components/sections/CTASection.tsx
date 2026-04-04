"use client";

import { motion } from "framer-motion";
import { LeadForm } from "@/components/ui/LeadForm";
import { EASE } from "@/lib/constants";

interface CTASectionProps {
  heading: string;
  subtext: string;
  buttonText: string;
  source: string;
}

export function CTASection({ heading, subtext, buttonText, source }: CTASectionProps): React.ReactElement {
  return (
    <section className="py-[clamp(56px,12vw,80px)] bg-white">
      <div className="container-atlantis">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="bg-lavender rounded-2xl px-[clamp(32px,6vw,64px)] py-[clamp(48px,10vw,64px)] text-center relative overflow-hidden"
        >
          <div className="blob blob-sm absolute top-0 right-0 opacity-20" aria-hidden="true" />
          <div className="relative">
            <LeadForm
              heading={heading}
              subtext={subtext}
              buttonText={buttonText}
              source={source}
              variant="inline"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
