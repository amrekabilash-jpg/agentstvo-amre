"use client";

import { useState, useRef, type FormEvent } from "react";
import { Send, CheckCircle, ShieldCheck } from "lucide-react";
import { sanitize, isValidEmail, isValidPhone } from "@/lib/validation";
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface LeadFormProps {
  heading?: string;
  subtext?: string;
  buttonText?: string;
  source?: string;
  variant?: "inline" | "compact";
}

export function LeadForm({
  heading,
  subtext,
  buttonText = "Отправить заявку",
  source = "unknown",
  variant = "inline",
}: LeadFormProps): React.ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const submitTimestamps = useRef<number[]>([]);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setError("");

    if (honeypot) { setSubmitted(true); return; }

    const now = Date.now();
    submitTimestamps.current = submitTimestamps.current.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (submitTimestamps.current.length >= RATE_LIMIT_MAX) {
      setError("Слишком много попыток. Подождите минуту.");
      return;
    }
    submitTimestamps.current.push(now);

    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);

    if (cleanName.length < 2) { setError("Введите ваше имя"); return; }
    if (!isValidEmail(cleanEmail) && !isValidPhone(cleanPhone)) {
      setError("Введите email или телефон");
      return;
    }

    try {
      const body = new URLSearchParams({
        "form-name": "lead-form",
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        source,
      }).toString();

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!res.ok) throw new Error("Network error");
      setSubmitted(true);
    } catch {
      setError("Ошибка отправки. Напишите нам напрямую: hello@geoaeo.pro");
    }
  }

  if (submitted) {
    return (
      <div className={`rounded-2xl border border-emerald-200 bg-emerald-50 text-center ${variant === "compact" ? "px-6 py-6" : "px-8 py-8"}`}>
        <CheckCircle size={36} className="text-emerald-500 mx-auto mb-3" />
        <p className="font-bold text-slate-800 mb-1">Спасибо за заявку!</p>
        <p className="text-sm text-slate-500">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none hover:border-[var(--accent-blue-light)] hover:shadow-[0_0_0_3px_rgba(91,95,239,0.08)] focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/20 transition-all duration-200";

  const errorBlock = error ? (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600 flex items-center gap-2 mb-3" role="alert">
      <ShieldCheck size={14} className="shrink-0" />
      {error}
    </div>
  ) : null;

  const honeypotField = (
    <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
      <label htmlFor={`hp-${source}`}>Оставьте пустым</label>
      <input type="text" id={`hp-${source}`} name="company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
    </div>
  );

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-[clamp(280px,90vw,500px)] mx-auto" aria-label="Форма заявки">
        {honeypotField}
        {errorBlock}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor={`name-c-${source}`} className="sr-only">Имя</label>
            <input id={`name-c-${source}`} type="text" required placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div className="flex-1">
            <label htmlFor={`email-c-${source}`} className="sr-only">Email или телефон</label>
            <input id={`email-c-${source}`} type="text" placeholder="Email или телефон" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <MagneticButton strength={0.3}>
            <button type="submit" className="shrink-0 inline-flex items-center justify-center gap-2 bg-[var(--accent-blue)] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[var(--accent-blue-dark)] transition-colors duration-300">
              <Send size={15} />
              {buttonText}
            </button>
          </MagneticButton>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">Бесплатная консультация. Ответим в течение 2 часов.</p>
      </form>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {heading && <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 text-center">{heading}</h3>}
      {subtext && <p className="text-sm text-slate-500 dark:text-slate-300 mb-5 text-center">{subtext}</p>}

      {errorBlock}

      <form onSubmit={handleSubmit} className="space-y-3" aria-label="Форма заявки">
        {honeypotField}
        <div>
          <label htmlFor={`name-${source}`} className="sr-only">Имя</label>
          <input id={`name-${source}`} type="text" required placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor={`email-${source}`} className="sr-only">Email</label>
            <input id={`email-${source}`} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor={`phone-${source}`} className="sr-only">Телефон</label>
            <input id={`phone-${source}`} type="tel" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
        </div>
        <MagneticButton strength={0.3} className="w-full">
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-[var(--accent-blue)] text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-[var(--accent-blue-dark)] hover:-translate-y-0.5 transition-all duration-300">
            <Send size={15} />
            {buttonText}
          </button>
        </MagneticButton>
        <p className="text-xs text-slate-400 text-center">Бесплатная консультация. Ответим в течение 2 часов.</p>
      </form>
    </div>
  );
}
