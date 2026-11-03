"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { homeFaqs as faqs } from "@/lib/home-faq";


export function HomeFaq(): React.ReactElement {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-atlantis bg-white">
      <div className="container-atlantis max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-label text-[#5B5FEF] block mb-3">Вопросы и ответы</span>
          <h2 className="display-section">Отвечаем на главное</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl border border-[var(--border)] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors"
                aria-expanded={open === i}
              >
                <span className="text-sm leading-snug">{faq.q}</span>
                <span
                  className="text-[#5B5FEF] text-xl flex-shrink-0 transition-transform duration-300"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>

              {/* Answer stays in the HTML (collapsed via height) so it matches the FAQPage JSON-LD for crawlers. */}
              <motion.div
                initial={false}
                animate={open === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
                aria-hidden={open !== i}
              >
                <p className="px-5 pb-5 pt-1 text-sm text-[var(--foreground-secondary)] leading-relaxed border-t border-[var(--border)]">
                  {faq.a}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-[var(--foreground-muted)] mb-3">
            Не нашли ответ на свой вопрос?
          </p>
          <Link
            href="/contacts"
            className="text-sm font-semibold text-[#5B5FEF] hover:underline underline-offset-2"
          >
            Напишите нам — ответим за 2 часа →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
