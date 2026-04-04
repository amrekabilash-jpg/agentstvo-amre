"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/lang-context";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const statsValues = [
  { value: 120, color: "text-[#5B5FEF]" },
  { value: 6, color: "text-[#E84393]" },
  { value: 98, color: "text-[#5B5FEF]" },
  { value: 3, color: "text-[#E84393]" },
];

function AnimatedCounter({
  value,
  suffix,
  color,
}: {
  value: number;
  suffix: string;
  color: string;
}): React.ReactElement {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;

    const unsubscribe = motionVal.on("change", (v) => {
      setDisplayed(Math.round(v));
    });

    const controls = animate(motionVal, value, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [isInView, value, motionVal]);

  return (
    <span ref={ref} className={color}>
      {displayed}
      {suffix}
    </span>
  );
}

export function Stats(): React.ReactElement {
  const { t } = useT();

  const stats: StatItem[] = t.stats.items.map((item, i) => ({
    value: statsValues[i].value,
    suffix: item.suffix,
    label: item.label,
    color: statsValues[i].color,
  }));

  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
      <div className="container-atlantis">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <span className="text-label text-[#5B5FEF] block mb-3">{t.stats.label}</span>
          <h2 className="display-section">{t.stats.heading}</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="text-center"
            >
              <div className="text-[clamp(40px,8vw,72px)] font-extrabold leading-none tracking-tight mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  color={stat.color}
                />
              </div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
