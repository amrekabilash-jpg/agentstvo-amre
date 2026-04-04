"use client";

import { motion } from "framer-motion";
import { CTASection } from "@/components/sections/CTASection";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { AnimatedIllustration } from "@/components/ui/AnimatedIllustration";
import { useT } from "@/lib/lang-context";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Marquee clients ── */

const clients = ["Rentai", "Baurzan & CO", "Asil Partners", "Renkie.ai"];
const marqueeItems = [...clients, ...clients, ...clients, ...clients];

/* ── Logo Cloud ── */

const logos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso",
  },
];

/* ── Page ── */

export default function CasesPage(): React.ReactElement {
  const { t } = useT();
  const cp = t.casesPage;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-14 lg:pt-40 lg:pb-20 bg-lavender relative overflow-hidden">
        <div className="blob blob-lg absolute -top-24 -right-32 opacity-40" />
        <div className="blob blob-md absolute bottom-0 -left-20 opacity-30" />

        <div className="container-atlantis relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-8"
          >
            <span className="text-label text-[#5B5FEF] block mb-4">{cp.label}</span>
            <h1 className="display-hero max-w-2xl mx-auto mb-4">
              {cp.heading}
            </h1>
            <p className="text-body max-w-lg mx-auto">
              {cp.subheading}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
          >
            <AnimatedIllustration src="/images/Coding-cuate.svg" alt="Кейсы" className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto" />
          </motion.div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="bg-[#5B5FEF] py-16 lg:py-20 relative overflow-hidden" data-cursor-glow>
        <div className="container-atlantis relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center mb-8"
          >
            <span className="block text-base font-medium text-white/70 mb-2">
              {cp.trusted}
            </span>
            <span className="block text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {cp.best}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          >
            <LogoCloud logos={logos} />
          </motion.div>
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container-atlantis">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center mb-12"
          >
            <span className="text-label text-[#5B5FEF] block mb-3">{cp.resultsLabel}</span>
            <h2 className="display-section">{cp.resultsHeading}</h2>
            <p className="text-body max-w-lg mx-auto mt-3">
              {cp.resultsHint}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <BeforeAfterSlider
                beforeSrc="https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1200&auto=format&fit=crop&sat=-100"
                afterSrc="https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1200&auto=format&fit=crop"
              />
              <p className="text-sm font-semibold text-gray-900 mt-4">{cp.cases[0].title}</p>
              <p className="text-xs text-gray-500">{cp.cases[0].result}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              <BeforeAfterSlider
                beforeSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop&sat=-100"
                afterSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
              />
              <p className="text-sm font-semibold text-gray-900 mt-4">{cp.cases[1].title}</p>
              <p className="text-xs text-gray-500">{cp.cases[1].result}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        heading={cp.ctaHeading}
        subtext={cp.ctaSubtext}
        buttonText={cp.ctaButton}
        source="cases_cta"
      />
    </div>
  );
}
