"use client";

import { motion } from "framer-motion";
import { AnimatedIllustration } from "@/components/ui/AnimatedIllustration";
import { useT } from "@/lib/lang-context";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

interface ZigZagBlock {
  heading: string;
  text: string;
  image: string;
  imageAlt: string;
  bg: string;
  reverse: boolean;
}

const blocksMeta = [
  { image: "/images/Brainstorming-cuate.svg", imageAlt: "Мозговой штурм", bg: "bg-white", reverse: true },
  { image: "/images/Open-source-cuate.svg", imageAlt: "Open source", bg: "bg-lavender", reverse: false },
];

const blocks2Meta = [
  { image: "/images/Team-work-cuate.svg", imageAlt: "Командная работа", bg: "bg-white", reverse: true },
  { image: "/images/Version-control-cuate.svg", imageAlt: "Контроль версий", bg: "bg-lavender", reverse: false },
  { image: "/images/Company-cuate.svg", imageAlt: "Компания", bg: "bg-white", reverse: true },
];

export function QuoteBlocks(): React.ReactElement {
  const { t } = useT();

  const zigZagBlocks: ZigZagBlock[] = blocksMeta.map((m, i) => ({
    heading: t.quoteBlocks[i].heading,
    text: t.quoteBlocks[i].text,
    ...m,
  }));

  const zigZagBlocks2: ZigZagBlock[] = blocks2Meta.map((m, i) => ({
    heading: t.quoteBlocks[2 + i].heading,
    text: t.quoteBlocks[2 + i].text,
    ...m,
  }));

  return (
    <>
      {/* Zig-zag blocks (2 & 3) */}
      {zigZagBlocks.map((block, index) => (
        <section
          key={index}
          className={`${block.bg} py-14 lg:py-20 relative overflow-hidden`}
        >
          {index % 2 === 0 && <div className="blob blob-md absolute -right-20 top-1/2 -translate-y-1/2" />}
          {index % 2 !== 0 && <div className="blob blob-sm absolute -left-16 top-1/2 -translate-y-1/2" />}

          <div className="container-atlantis relative">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${block.reverse ? "lg:[direction:rtl]" : ""}`}>
              <motion.div
                initial={{ opacity: 0, x: block.reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className={block.reverse ? "lg:[direction:ltr]" : ""}
              >
                <h2 className="display-quote mb-4">{block.heading}</h2>
                <p className="text-body max-w-lg">{block.text}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: block.reverse ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className={`relative ${block.reverse ? "lg:[direction:ltr]" : ""}`}
              >
                <div className="blob blob-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="relative">
                  <AnimatedIllustration src={block.image} alt={block.imageAlt} className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Zig-zag blocks (4, 5 & 6) */}
      {zigZagBlocks2.map((block, index) => (
        <section
          key={`zz2-${index}`}
          className={`${block.bg} py-14 lg:py-20 relative overflow-hidden`}
        >
          {index % 2 === 0 && <div className="blob blob-md absolute -right-20 top-1/2 -translate-y-1/2" />}
          {index % 2 !== 0 && <div className="blob blob-sm absolute -left-16 top-1/2 -translate-y-1/2" />}

          <div className="container-atlantis relative">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${block.reverse ? "lg:[direction:rtl]" : ""}`}>
              <motion.div
                initial={{ opacity: 0, x: block.reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className={block.reverse ? "lg:[direction:ltr]" : ""}
              >
                <h2 className="display-quote mb-4">{block.heading}</h2>
                <p className="text-body max-w-lg">{block.text}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: block.reverse ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className={`relative ${block.reverse ? "lg:[direction:ltr]" : ""}`}
              >
                <div className="blob blob-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="relative">
                  <AnimatedIllustration src={block.image} alt={block.imageAlt} className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
