"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    q: "Сколько стоят ваши услуги?",
    a: "Зависит от задачи. SEO продвижение — от 80 000 тенге/мес, разработка сайта — от 150 000 тенге, AI-автоматизация — от 150 000 тенге за проект. Первая консультация бесплатно — разберём вашу задачу и назовём точную цену.",
  },
  {
    q: "Как быстро вы начинаете работу?",
    a: "Запускаем проект в течение 3–5 рабочих дней после согласования деталей. На первой консультации уже даём конкретные рекомендации — без лишних слов.",
  },
  {
    q: "Работаете только в Алматы или по всему Казахстану?",
    a: "Работаем онлайн по всему Казахстану и СНГ: Алматы, Астана, Шымкент, Атырау, Россия, Узбекистан. Физическая встреча — только по желанию.",
  },
  {
    q: "Что такое GEO и AEO — зачем это моему бизнесу?",
    a: "GEO (Generative Engine Optimization) — оптимизация под ChatGPT, Perplexity, Google AI Overview. В 2026 году до 40% поисковых запросов получают AI-ответ. Без GEO вас там нет. AEO — оптимизация под голосовой поиск и Featured Snippets. Мы делаем так, чтобы AI рекомендовал именно ваш бизнес.",
  },
  {
    q: "Даёте ли гарантии результата?",
    a: "Мы гарантируем качество работы и прозрачную отчётность. 90% наших клиентов остаются с нами после первого проекта — это лучший показатель. Конкретные позиции в Google гарантировать невозможно — алгоритмы меняются, но рост трафика и видимости — реально.",
  },
];

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

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pt-1 text-sm text-[var(--foreground-secondary)] leading-relaxed border-t border-[var(--border)]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
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
