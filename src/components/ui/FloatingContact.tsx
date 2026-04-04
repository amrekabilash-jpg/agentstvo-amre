"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function FloatingContact(): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease }}
            className="w-[300px] rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#5B5FEF] px-5 py-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">Онлайн-консультант</h4>
                  <p className="text-xs text-white/80 mt-0.5">Мы на связи — ответим быстро!</p>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
              {/* Online indicator */}
              <div className="flex items-center gap-2 mt-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                </span>
                <span className="text-xs text-white/90">Онлайн</span>
              </div>
            </div>

            {/* Options */}
            <div className="p-4 space-y-2.5">
              <p className="text-xs text-slate-500 mb-3">Выберите удобный способ связи:</p>

              {/* WhatsApp */}
              <a
                href="https://wa.me/77017282236?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                  <Send size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">WhatsApp</p>
                  <p className="text-xs text-slate-400">Быстрый ответ</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+77017282236"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:border-[#818CF8] hover:bg-indigo-50 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors">
                  <Phone size={16} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Позвонить</p>
                  <p className="text-xs text-slate-400">+7 701 728 22 36</p>
                </div>
              </a>

              {/* Email / Form */}
              <Link
                href="/contacts"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center shrink-0 group-hover:bg-pink-200 transition-colors">
                  <Mail size={16} className="text-pink-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Написать</p>
                  <p className="text-xs text-slate-400">Форма обратной связи</p>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button with pulse */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Закрыть панель связи" : "Открыть онлайн-консультант"}
        className="relative w-14 h-14 rounded-full bg-[var(--accent-blue)] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[var(--accent-blue)] animate-ping opacity-30" aria-hidden="true" />
        {/* Icon */}
        <span className="relative">
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </span>
      </button>
    </div>
  );
}
