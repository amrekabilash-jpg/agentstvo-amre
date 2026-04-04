"use client";

import { motion } from "framer-motion";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { useT } from "@/lib/lang-context";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const logos = [
  { src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia" },
  { src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase" },
  { src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" },
  { src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel" },
  { src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub" },
  { src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg", alt: "Claude AI" },
  { src: "https://svgl.app/library/clerk-wordmark-light.svg", alt: "Clerk" },
  { src: "https://svgl.app/library/turso-wordmark-light.svg", alt: "Turso" },
];

export function Clients(): React.ReactElement {
  const { t } = useT();

  return (
    <section className="bg-[#5B5FEF] py-14 lg:py-20 relative overflow-hidden" data-cursor-glow>
      <div className="container-atlantis">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-8"
        >
          <span className="block text-base font-medium text-white/70 mb-2">
            {t.clients.trusted}
          </span>
          <span className="block text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {t.clients.best}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        >
          <LogoCloud logos={logos} />
        </motion.div>
      </div>
    </section>
  );
}
