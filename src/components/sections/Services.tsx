"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Palette, Bot, Megaphone, Fingerprint, Video } from "lucide-react";
import Link from "next/link";
import { useT } from "@/lib/lang-context";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  href: string;
}

const servicesMeta = [
  { icon: <Search size={28} />, color: "text-[#5B5FEF]", bg: "bg-indigo-50", href: "/services#seo" },
  { icon: <Palette size={28} />, color: "text-[#E84393]", bg: "bg-pink-50", href: "/services#creative" },
  { icon: <Bot size={28} />, color: "text-emerald-600", bg: "bg-emerald-50", href: "/services#automation" },
  { icon: <Megaphone size={28} />, color: "text-orange-500", bg: "bg-orange-50", href: "/services#creative" },
  { icon: <Fingerprint size={28} />, color: "text-purple-600", bg: "bg-purple-50", href: "/services#creative" },
  { icon: <Video size={28} />, color: "text-[#5B5FEF]", bg: "bg-indigo-50", href: "/services#creative" },
];

function TiltCard({ service, index, more }: { service: ServiceCard; index: number; more: string }): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative bg-white dark:bg-[#1A1A2E] rounded-2xl border border-gray-100 dark:border-white/10 p-7 cursor-pointer
          shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(91,95,239,0.12)]
          dark:shadow-none dark:hover:shadow-[0_12px_40px_rgba(129,140,248,0.15)]
          transition-shadow duration-500"
      >
        <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-5 ${service.color}`}>
          {service.icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.description}</p>
        <Link
          href={service.href}
          className={`text-sm font-semibold ${service.color} group-hover:underline`}
        >
          {more}
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function Services(): React.ReactElement {
  const { t } = useT();

  const services: ServiceCard[] = t.services.items.map((item, i) => ({
    title: item.title,
    description: item.description,
    ...servicesMeta[i],
  }));

  return (
    <section className="bg-gray-50/50 py-16 lg:py-24 relative overflow-hidden">
      <div className="container-atlantis">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <span className="text-label text-[#5B5FEF] block mb-3">{t.services.label}</span>
          <h2 className="display-section">{t.services.heading}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} more={t.services.more} />
          ))}
        </div>
      </div>
    </section>
  );
}
