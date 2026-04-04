"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import {
  HoverSlider,
  HoverSliderImageWrap,
  HoverSliderSvg,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";
import { AnimatedIllustration } from "@/components/ui/AnimatedIllustration";
import { useT } from "@/lib/lang-context";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Static meta (images, colors, layout) — language-independent ── */

const SLIDES_META = [
  { id: "slide-seo", sectionId: "seo", imageUrl: "/images/Programming-cuate.svg" },
  { id: "slide-design", sectionId: "design", imageUrl: "/images/UI-UX-team-cuate.svg" },
  { id: "slide-automation", sectionId: "automation", imageUrl: "/images/Android-cuate.svg" },
  { id: "slide-video", sectionId: "creative", imageUrl: "/images/Online-world-cuate.svg" },
  { id: "slide-branding", sectionId: "branding", imageUrl: "/images/Company-cuate.svg" },
];

const SERVICES_META = [
  { id: "seo", color: "indigo" as const, image: "/images/Programming-cuate.svg", imageAlt: "Программирование", bg: "bg-white", reverse: false },
  { id: "design", color: "pink" as const, image: "/images/UI-UX-team-cuate.svg", imageAlt: "UI/UX Дизайн", bg: "bg-lavender", reverse: true },
  { id: "creative", color: "orange" as const, image: "/images/Online-world-cuate.svg", imageAlt: "Креативные услуги", bg: "bg-white", reverse: false },
  { id: "automation", color: "emerald" as const, image: "/images/Android-cuate.svg", imageAlt: "AI-автоматизация", bg: "bg-lavender", reverse: true },
  { id: "branding", color: "amber" as const, image: "/images/Company-cuate.svg", imageAlt: "Бренд-айдентика", bg: "bg-white", reverse: false },
];

const colorMap = {
  indigo: {
    badge: "bg-indigo-50 text-indigo-700",
    checkBg: "bg-indigo-100",
    checkIcon: "text-indigo-600",
    dot: "bg-[#5B5FEF]",
  },
  pink: {
    badge: "bg-pink-50 text-pink-700",
    checkBg: "bg-pink-100",
    checkIcon: "text-pink-600",
    dot: "bg-[#E84393]",
  },
  orange: {
    badge: "bg-orange-50 text-orange-700",
    checkBg: "bg-orange-100",
    checkIcon: "text-orange-600",
    dot: "bg-orange-500",
  },
  emerald: {
    badge: "bg-emerald-50 text-emerald-700",
    checkBg: "bg-emerald-100",
    checkIcon: "text-emerald-600",
    dot: "bg-emerald-500",
  },
  amber: {
    badge: "bg-amber-50 text-amber-700",
    checkBg: "bg-amber-100",
    checkIcon: "text-amber-600",
    dot: "bg-amber-500",
  },
};

/* ── Page ── */

export default function ServicesPage(): React.ReactElement {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { t } = useT();

  const sp = t.servicesPage;

  const SLIDES = SLIDES_META.map((m, i) => ({ ...m, title: sp.slides[i].title }));
  const services = SERVICES_META.map((m, i) => ({
    ...m,
    title: sp.services[i].title,
    description: sp.services[i].description,
    badge: sp.services[i].badge,
    features: sp.services[i].features,
  }));

  const handleSlideClick = (sectionId: string) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-lavender relative overflow-hidden">
        <div className="blob blob-lg absolute -top-20 -right-32 opacity-40" />
        <div className="blob blob-md absolute bottom-0 -left-20 opacity-30" />

        <div className="container-atlantis relative text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease }}
            className="text-label text-[#5B5FEF] block mb-4"
          >
            {sp.label}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="display-hero max-w-2xl mx-auto mb-4"
          >
            {sp.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease }}
            className="text-body max-w-lg mx-auto"
          >
            {sp.subheading}
          </motion.p>
        </div>
      </section>

      {/* ── Animated Slideshow Section ── */}
      <section className="py-16 lg:py-24 bg-lavender relative overflow-hidden">
        <HoverSlider className="container-atlantis">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease }}
            className="mb-8 text-xs font-semibold uppercase tracking-widest text-[#5B5FEF]"
          >
            {sp.directionsLabel}
          </motion.h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="flex flex-col space-y-3 md:space-y-5">
              {SLIDES.map((slide, index) => (
                <div
                  key={slide.id}
                  onClick={() => handleSlideClick(slide.sectionId)}
                >
                  <TextStaggerHover
                    index={index}
                    className="cursor-pointer font-extrabold uppercase text-[#5B5FEF] text-[clamp(20px,3vw,36px)] leading-[1.15] tracking-[-0.02em] whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                    text={slide.title}
                  />
                </div>
              ))}
            </div>
            <HoverSliderImageWrap className="w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden">
              {SLIDES.map((slide, index) => (
                <div key={slide.id}>
                  <HoverSliderSvg
                    index={index}
                    imageUrl={slide.imageUrl}
                    alt={slide.title}
                    className="size-full max-h-[480px] object-cover"
                  />
                </div>
              ))}
            </HoverSliderImageWrap>
          </div>
        </HoverSlider>
      </section>

      {/* Service sections — hidden by default, revealed on click */}
      <AnimatePresence>
        {services.map((service, sectionIndex) => {
          const colors = colorMap[service.color];
          if (openSection !== service.id) return null;

          return (
            <motion.section
              key={service.id}
              id={service.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className={`scroll-mt-20 overflow-hidden ${service.bg}`}
            >
              <div className="py-14 lg:py-20 relative">
                {sectionIndex % 2 === 0 && (
                  <div className="blob blob-md absolute -right-20 top-1/2 -translate-y-1/2" />
                )}
                {sectionIndex % 2 !== 0 && (
                  <div className="blob blob-sm absolute -left-16 top-1/2 -translate-y-1/2" />
                )}

                <div className="container-atlantis relative">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${service.reverse ? "lg:[direction:rtl]" : ""}`}
                  >
                    {/* Text content */}
                    <motion.div
                      initial={{ opacity: 0, x: service.reverse ? 30 : -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease }}
                      className={service.reverse ? "lg:[direction:ltr]" : ""}
                    >
                      {/* Number badge */}
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className={`w-8 h-8 rounded-full ${colors.dot} flex items-center justify-center`}
                        >
                          <span className="text-white text-xs font-bold">
                            {String(sectionIndex + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <span className={`badge-pill ${colors.badge}`}>
                          {service.badge}
                        </span>
                      </div>

                      <h2 className="display-section mb-4">{service.title}</h2>
                      <p className="text-body mb-6">{service.description}</p>

                      {/* Feature checklist */}
                      <div className="space-y-0">
                        {service.features.map((feature, i) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.04, duration: 0.3, ease }}
                            className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-b-0"
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i % 2 === 0 ? colors.checkBg : "bg-pink-100"}`}
                            >
                              <Check
                                size={12}
                                className={
                                  i % 2 === 0 ? colors.checkIcon : "text-pink-600"
                                }
                              />
                            </div>
                            <span className="text-[15px] font-medium text-slate-700">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Illustration */}
                    <motion.div
                      initial={{ opacity: 0, x: service.reverse ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.15, ease }}
                      className={`relative ${service.reverse ? "lg:[direction:ltr]" : ""}`}
                    >
                      <div className="blob blob-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <div className="relative">
                        <AnimatedIllustration
                          src={service.image}
                          alt={service.imageAlt}
                          className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </AnimatePresence>

      <CTASection
        heading={sp.ctaHeading}
        subtext={sp.ctaSubtext}
        buttonText={sp.ctaButton}
        source="services_cta"
      />
    </div>
  );
}
