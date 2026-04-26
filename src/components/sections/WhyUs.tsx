"use client";

import { motion } from "framer-motion";
import { AnimatedIllustration } from "@/components/ui/AnimatedIllustration";
import { ParallaxWrapper } from "@/components/ui/parallax-wrapper";
import { useT } from "@/lib/lang-context";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function WhyUs(): React.ReactElement {
  const { t } = useT();

  return (
    <section className="bg-lavender py-14 lg:py-20 relative overflow-hidden">
      <div className="blob blob-lg absolute -top-20 -right-32" />
      <div className="blob blob-md absolute bottom-10 -left-28" />

      <div className="container-atlantis relative">
        {/* Zig-zag: Text LEFT — Image RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="display-quote mb-4">
              {t.whyUs.heading}
            </h2>
            <p className="text-body max-w-lg">
              {t.whyUs.body}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="relative"
          >
            <div className="blob blob-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <ParallaxWrapper className="relative">
              <AnimatedIllustration src="/images/Pair-programming-cuate.svg" alt="Парное программирование" className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto" />
            </ParallaxWrapper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
