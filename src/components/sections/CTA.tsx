"use client";

import { motion } from "framer-motion";
import { LeadForm } from "@/components/ui/LeadForm";
import { AnimatedIllustration } from "@/components/ui/AnimatedIllustration";
import { useT } from "@/lib/lang-context";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function CTA(): React.ReactElement {
  const { t } = useT();

  return (
    <>
      {/* Block 8: Image LEFT — Text RIGHT */}
      <section className="bg-white py-14 lg:py-20 relative overflow-hidden">
        <div className="blob blob-md absolute -right-20 top-1/2 -translate-y-1/2" />

        <div className="container-atlantis relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center lg:[direction:rtl]">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="lg:[direction:ltr]"
            >
              <h2 className="display-quote mb-4">
                {t.cta.heading1}
              </h2>
              <p className="text-body max-w-lg">
                {t.cta.body1}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="relative lg:[direction:ltr]"
            >
              <div className="blob blob-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <AnimatedIllustration src="/images/Operating-system-upgrade-cuate.svg" alt="Обновление системы" className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Block 9: Lead Capture Form */}
      <section className="bg-lavender py-14 lg:py-20 relative overflow-hidden">
        <div className="blob blob-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="blob blob-sm absolute -left-16 top-1/2 -translate-y-1/2" />

        <div className="container-atlantis relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <h2 className="display-quote mb-4">
                {t.cta.heading2}
              </h2>
              <p className="text-body max-w-lg mb-8">
                {t.cta.body2}
              </p>
              <LeadForm
                buttonText={t.cta.button}
                source="home_cta"
                variant="inline"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="relative"
            >
              <div className="blob blob-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <AnimatedIllustration src="/images/Upgrade-cuate.svg" alt="Обновление" className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
