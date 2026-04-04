"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { TeamSection } from "@/components/sections/TeamSection";
import { AnimatedIllustration } from "@/components/ui/AnimatedIllustration";
import { useT } from "@/lib/lang-context";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function AboutPage(): React.ReactElement {
  const { t } = useT();
  const ap = t.aboutPage;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-10 lg:pt-40 lg:pb-14 bg-lavender relative overflow-hidden">
        <div className="blob blob-lg absolute -top-20 -right-32 opacity-40" />
        <div className="blob blob-md absolute bottom-0 -left-24 opacity-30" />

        <div className="container-atlantis relative text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease }}
            className="text-label text-[#5B5FEF] block mb-4"
          >
            {ap.label}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="display-hero max-w-2xl mx-auto mb-4"
          >
            {ap.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease }}
            className="text-body font-medium text-slate-700 max-w-md mx-auto"
          >
            {ap.subheading}
          </motion.p>
        </div>
      </section>

      {/* Culture points + Team illustration — zig-zag: Image LEFT, Text RIGHT */}
      <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
        <div className="blob blob-md absolute -right-20 top-1/2 -translate-y-1/2" />

        <div className="container-atlantis relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center lg:[direction:rtl]">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="lg:[direction:ltr]"
            >
              <span className="text-label text-[#5B5FEF] block mb-3">{ap.cultureLabel}</span>
              <h2 className="display-section mb-6">{ap.cultureHeading}</h2>

              {/* Culture points with checkmarks */}
              <div className="space-y-0">
                {ap.culturePoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease }}
                    className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-b-0"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i % 2 === 0 ? "bg-indigo-100" : "bg-pink-100"}`}>
                      <Check size={12} className={i % 2 === 0 ? "text-indigo-600" : "text-pink-600"} />
                    </div>
                    <span className="text-[15px] font-medium text-slate-700">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="relative lg:[direction:ltr]"
            >
              <div className="blob blob-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <AnimatedIllustration src="/images/UI-UX-team-cuate.svg" alt="Наша команда" className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission — zig-zag: Text LEFT, Image RIGHT */}
      <section className="py-14 lg:py-20 bg-lavender relative overflow-hidden">
        <div className="blob blob-sm absolute -left-16 top-1/2 -translate-y-1/2" />

        <div className="container-atlantis relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="text-label text-[#E84393] block mb-3">{ap.missionLabel}</span>
              <h2 className="display-section mb-4">{ap.missionHeading}</h2>
              <p className="text-body leading-relaxed">
                {ap.missionBody}
              </p>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="relative"
            >
              <div className="blob blob-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <AnimatedIllustration src="/images/tech-company-cuate.svg" alt="Технологическая компания" className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values — zig-zag: Image LEFT, Text RIGHT */}
      <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
        <div className="blob blob-md absolute -right-20 top-1/2 -translate-y-1/2" />

        <div className="container-atlantis relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center lg:[direction:rtl]">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="lg:[direction:ltr]"
            >
              <span className="text-label text-[#5B5FEF] block mb-3">{ap.valuesLabel}</span>
              <h2 className="display-section mb-4">{ap.valuesHeading}</h2>
              <p className="text-body mb-6">{ap.valuesBody}</p>

              <div className="space-y-0">
                {ap.valuesItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease }}
                    className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-b-0"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i % 2 === 0 ? "bg-indigo-100" : "bg-pink-100"}`}>
                      <Check size={12} className={i % 2 === 0 ? "text-indigo-600" : "text-pink-600"} />
                    </div>
                    <span className="text-[15px] font-medium text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="relative lg:[direction:ltr]"
            >
              <div className="blob blob-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <AnimatedIllustration src="/images/Globalization-cuate.svg" alt="Глобализация" className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TeamSection />

      <CTASection
        heading={ap.ctaHeading}
        subtext={ap.ctaSubtext}
        buttonText={ap.ctaButton}
        source="about_cta"
      />
    </div>
  );
}
