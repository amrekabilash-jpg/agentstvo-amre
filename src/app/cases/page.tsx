"use client";

import { motion } from "framer-motion";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedIllustration } from "@/components/ui/AnimatedIllustration";
import { CaseCard } from "@/components/ui/CaseCard";
import { cases } from "@/data/cases";
import { useT } from "@/lib/lang-context";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

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
            <h1 className="display-hero max-w-2xl mx-auto mb-4">{cp.heading}</h1>
            <p className="text-body max-w-lg mx-auto">{cp.subheading}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
          >
            <AnimatedIllustration
              src="/images/Coding-cuate.svg"
              alt="Кейсы"
              className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-atlantis">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center mb-12"
          >
            <span className="text-label text-[#5B5FEF] block mb-3">Наши работы</span>
            <h2 className="display-section">Реальные проекты — реальные результаты</h2>
            <p className="text-body max-w-lg mx-auto mt-3">
              Каждый кейс — это живой сайт или продукт который работает прямо сейчас
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cases.map((item, i) => (
              <CaseCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-lavender py-12">
        <div className="container-atlantis">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "4+", label: "Запущенных проекта" },
              { value: "3", label: "Страны присутствия" },
              { value: "100%", label: "Проектов сданы в срок" },
              { value: "Full", label: "Цикл разработки" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease }}
              >
                <span className="block text-3xl font-extrabold text-[#5B5FEF] mb-1">{s.value}</span>
                <span className="text-sm text-gray-500 font-medium">{s.label}</span>
              </motion.div>
            ))}
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
