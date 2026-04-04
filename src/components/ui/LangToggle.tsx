"use client";

import { useT } from "@/lib/lang-context";

export function LangToggle(): React.ReactElement {
  const { lang, setLang } = useT();

  return (
    <button
      onClick={() => setLang(lang === "ru" ? "kk" : "ru")}
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/15 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
      aria-label="Сменить язык"
    >
      <span className={lang === "ru" ? "text-indigo-600 dark:text-indigo-400" : "opacity-50"}>РУ</span>
      <span className="opacity-30">/</span>
      <span className={lang === "kk" ? "text-indigo-600 dark:text-indigo-400" : "opacity-50"}>ҚАЗ</span>
    </button>
  );
}
