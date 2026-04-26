"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AnimatedIllustration } from "@/components/ui/AnimatedIllustration";
import { MagneticButton } from "@/components/ui/magnetic-button";
import ShaderBackground from "@/components/ui/shader-background";
import { useT } from "@/lib/lang-context";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const channelIcons = [
  <svg key="email" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="#E84393" strokeWidth="1.5" fill="none" />
    <path d="M2 4 L12 13 L22 4" stroke="#E84393" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="phone" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M5 4H9L11 9L8.5 10.5C9.57 12.67 11.33 14.43 13.5 15.5L15 13L20 15V19C20 20.1 19.1 21 18 21C9.72 20.37 3.63 14.28 3 6C3 4.9 3.9 4 5 4Z" stroke="#5B5FEF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="address" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M12 2C8 2 5 5 5 8.5C5 13.5 12 22 12 22C12 22 19 13.5 19 8.5C19 5 16 2 12 2Z" stroke="#10B981" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="8.5" r="2.5" stroke="#10B981" strokeWidth="1.5" fill="#10B981" fillOpacity="0.2" />
  </svg>,
];

const channelHrefs = ["mailto:amrekabilash@gmail.com", null, null];
const channelValues = ["amrekabilash@gmail.com", "Скоро", null];
const channelColors = ["pink", "indigo", "emerald"] as const;

const colorMap = {
  pink: { bg: "bg-pink-50", border: "border-pink-200", dot: "bg-[#E84393]", hoverBorder: "hover:border-pink-300" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", dot: "bg-[#5B5FEF]", hoverBorder: "hover:border-indigo-300" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500", hoverBorder: "hover:border-emerald-300" },
};

/* ── Page ── */

export default function ContactsPage(): React.ReactElement {
  const { t } = useT();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Honeypot — hidden field, bots fill it, humans don't
  const [honeypot, setHoneypot] = useState("");

  // Rate limiting — track submissions
  const submitTimestamps = useRef<number[]>([]);
  const MAX_SUBMITS = 3;
  const RATE_WINDOW_MS = 60_000; // 1 minute

  const sanitize = (input: string): string =>
    input
      .replace(/<[^>]*>/g, "")
      .replace(/[<>"'`]/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      .trim();

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setFormError("");

    // 1. Honeypot check — if filled, silently "succeed" (bot trap)
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    // 2. Rate limiting — max 3 submits per minute
    const now = Date.now();
    submitTimestamps.current = submitTimestamps.current.filter(
      (ts) => now - ts < RATE_WINDOW_MS
    );
    if (submitTimestamps.current.length >= MAX_SUBMITS) {
      setFormError("Слишком много попыток. Подождите минуту.");
      return;
    }
    submitTimestamps.current.push(now);

    // 3. Sanitize inputs
    const cleanName = sanitize(formState.name);
    const cleanEmail = sanitize(formState.email);
    const cleanMessage = sanitize(formState.message);

    // 4. Validation
    if (cleanName.length < 2) {
      setFormError("Введите корректное имя (минимум 2 символа)");
      return;
    }
    if (cleanName.length > 100) {
      setFormError("Имя слишком длинное (максимум 100 символов)");
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setFormError("Введите корректный email адрес");
      return;
    }
    if (cleanMessage.length < 10) {
      setFormError("Сообщение слишком короткое (минимум 10 символов)");
      return;
    }
    if (cleanMessage.length > 5000) {
      setFormError("Сообщение слишком длинное (максимум 5000 символов)");
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "4b47bcf9-417b-4e1e-9b3d-232164e19c10",
          subject: `📩 Новое сообщение от ${cleanName} — geoaeo.pro`,
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          botcheck: "",
        }),
      });

      const data = await res.json() as { success: boolean };
      if (!data.success) throw new Error("Web3Forms error");
      setSubmitted(true);
    } catch {
      setFormError("Ошибка отправки. Попробуйте позже или свяжитесь через Telegram.");
    }
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-10 lg:pt-40 lg:pb-14 bg-lavender relative overflow-hidden">
        <div className="blob blob-lg absolute -top-20 -right-32 opacity-40" />
        <div className="blob blob-md absolute bottom-0 -left-24 opacity-30" />

        <div className="container-atlantis relative text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease }}
            className="text-label text-[#5B5FEF] block mb-4"
          >
            {t.contacts.label}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="display-hero max-w-2xl mx-auto mb-4"
          >
            {t.contacts.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease }}
            className="text-body font-medium text-slate-700 dark:text-slate-400 max-w-md mx-auto mb-8"
          >
            {t.contacts.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
          >
            <AnimatedIllustration src="/images/Connected-cuate.svg" alt="Связаться с нами" className="w-full h-auto max-w-sm mx-auto [&_svg]:w-full [&_svg]:h-auto" />
          </motion.div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-10 lg:py-14">
        <div className="container-atlantis">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.contacts.channels.map((channel, index) => {
              const colors = colorMap[channelColors[index]];
              const href = channelHrefs[index];
              const value = channelValues[index] ?? channel.value ?? "";
              const inner = (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                      {channelIcons[index]}
                    </div>
                    <span className="text-label text-slate-500">{channel.title}</span>
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-white mb-1">{value}</p>
                  <p className="text-xs text-slate-500">{channel.description}</p>
                </>
              );
              return (
                <motion.div
                  key={channel.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4, ease }}
                >
                  {href ? (
                    <a href={href} className={`block rounded-xl border ${colors.border} ${colors.bg} p-5 transition-all duration-300 ${colors.hoverBorder} hover:-translate-y-1`}>
                      {inner}
                    </a>
                  ) : (
                    <div className={`rounded-xl border ${colors.border} ${colors.bg} p-5 transition-all duration-300 ${colors.hoverBorder} hover:-translate-y-1 cursor-default`}>
                      {inner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 lg:py-14 bg-slate-50/60 dark:bg-[#1A1A2E]/60">
        <div className="container-atlantis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="text-label text-[#E84393] block mb-3">{t.contacts.formLabel}</span>
              <h2 className="display-section mb-3">{t.contacts.formHeading}</h2>
              <p className="text-body mb-8">{t.contacts.formBody}</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease }}
                  className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                      <path d="M5 12L10 17L19 7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-4 mb-2">{t.contacts.successTitle}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t.contacts.successBody}</p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", message: "" });
                    }}
                    className="text-sm font-semibold text-[#5B5FEF] hover:underline"
                  >
                    {t.contacts.sendMore}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" data-netlify="true" name="contact-form">
                  <input type="hidden" name="form-name" value="contact-form" />
                  {/* Honeypot — invisible to humans, bots fill it */}
                  <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Оставьте пустым</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Error message */}
                  {formError && (
                    <div className="rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                      <ShieldCheck size={16} className="shrink-0" />
                      {formError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.contacts.name}</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#1A1A2E] dark:text-white px-4 py-3.5 text-sm outline-none hover:border-[#818CF8] hover:shadow-[0_0_0_3px_rgba(91,95,239,0.08)] focus:border-[#5B5FEF] focus:ring-2 focus:ring-[#5B5FEF]/20 focus:shadow-[0_0_12px_rgba(91,95,239,0.12)] transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      placeholder={t.contacts.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.contacts.email}</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#1A1A2E] dark:text-white px-4 py-3.5 text-sm outline-none hover:border-[#818CF8] hover:shadow-[0_0_0_3px_rgba(91,95,239,0.08)] focus:border-[#5B5FEF] focus:ring-2 focus:ring-[#5B5FEF]/20 focus:shadow-[0_0_12px_rgba(91,95,239,0.12)] transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.contacts.message}</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#1A1A2E] dark:text-white px-4 py-3.5 text-sm outline-none hover:border-[#818CF8] hover:shadow-[0_0_0_3px_rgba(91,95,239,0.08)] focus:border-[#5B5FEF] focus:ring-2 focus:ring-[#5B5FEF]/20 focus:shadow-[0_0_12px_rgba(91,95,239,0.12)] transition-all duration-200 resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      placeholder={t.contacts.messagePlaceholder}
                    />
                  </div>

                  <MagneticButton strength={0.4}>
                    <button
                      type="submit"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      {t.contacts.send}
                      <Send size={16} />
                    </button>
                  </MagneticButton>
                </form>
              )}
            </motion.div>

            {/* Right: FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <span className="text-label text-[#5B5FEF] block mb-3">{t.contacts.faqLabel}</span>
              <h3 className="display-quote mb-6">{t.contacts.faqHeading}</h3>

              <div className="space-y-4">
                {t.contacts.faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4, ease }}
                    className="rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#1A1A2E] p-5 hover:-translate-y-1 hover:border-[#5B5FEF] hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(129,140,248,0.12)] transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${index % 2 === 0 ? "bg-indigo-100" : "bg-pink-100"}`}>
                        <Check size={12} className={index % 2 === 0 ? "text-indigo-600" : "text-pink-600"} />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">{item.q}</h4>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed pl-8">{item.a}</p>
                  </motion.div>
                ))}
              </div>

              {/* Mini trust block */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4, ease }}
                className="mt-6 rounded-xl bg-lavender p-5 text-center"
              >
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">{t.contacts.trustText}</p>
                <p className="text-xs text-slate-500">{t.contacts.trustSub}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA — light background with 3 transparent circles */}
      <section className="py-10 lg:py-14">
        <div className="container-atlantis">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="rounded-2xl px-8 py-10 lg:px-14 lg:py-14 text-center relative overflow-hidden"
          >
            {/* WebGL shader background */}
            <ShaderBackground />

            {/* Dark overlay so text stays readable */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">{t.contacts.messengerHeading}</h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8 leading-relaxed">
                {t.contacts.messengerBody}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <MagneticButton strength={0.4}>
                  <Link
                    href="https://t.me/agentsvo"
                    className="inline-flex items-center gap-2 bg-white text-[#5B5FEF] px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-colors duration-300"
                  >
                    Telegram
                    <ArrowRight size={18} />
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.4}>
                  <Link
                    href="https://wa.me/77017282236"
                    className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-colors duration-300"
                  >
                    WhatsApp
                    <ArrowRight size={18} />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Address footer */}
      <section className="pb-10">
        <div className="container-atlantis text-center">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Казахстан, г. Алматы</span>
            <span className="mx-3 text-slate-300">|</span>
            <span className="text-slate-400">Скоро</span>
          </p>
        </div>
      </section>
    </div>
  );
}
