"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedIllustration } from "@/components/ui/AnimatedIllustration";
import { useT } from "@/lib/lang-context";

const CYCLE_MS = 2400;

function MorphingWord(): React.ReactElement {
  const { t } = useT();
  const words = t.hero.words as readonly string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className="block relative h-[1.2em] text-[#5B5FEF] overflow-hidden whitespace-nowrap">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero(): React.ReactElement {
  const { t } = useT();

  return (
    <section className="section-atlantis bg-lavender relative overflow-hidden">
      <div className="blob blob-lg absolute -top-20 -right-20" aria-hidden="true" />
      <div className="blob blob-md absolute bottom-10 left-10" aria-hidden="true" />

      <div className="container-atlantis relative">
        {/* Zig-zag: Text LEFT — Image RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h1 className="display-hero mb-4">
              {t.hero.heading}
              <MorphingWord />
            </h1>
            <p className="text-body max-w-lg mb-8">
              {t.hero.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton strength={0.4}>
                <Link href="/contacts" className="btn-primary">
                  {t.hero.cta}
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <Link href="/cases" className="btn-secondary">
                  {t.hero.casesBtn}
                </Link>
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="relative"
          >
            <div className="blob blob-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
            <div className="relative">
              <AnimatedIllustration
                src="/images/Team-cuate.svg"
                alt="Командная работа"
                className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
