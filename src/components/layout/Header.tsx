"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { useT } from "@/lib/lang-context";

export function Header(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "top-3 bg-transparent"
          : "top-0 bg-white/90 dark:bg-[#0F0F1A]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/10"
      }`}
    >
      <div
        className={`flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "max-w-4xl mx-auto px-6 h-14 rounded-full bg-white/80 dark:bg-[#0F0F1A]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            : "max-w-7xl mx-auto px-6 h-20"
        }`}
      >
        {/* LOGO */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
          <img
            src="/images/logo.svg"
            alt="Агентство"
            className={`dark:invert transition-all duration-300 ${scrolled ? "w-9 h-9" : "w-[52px] h-[52px]"}`}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[17px] font-bold text-slate-900 dark:text-white">Агентство</span>
            <span
              className={`hidden sm:block text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide transition-all duration-300 overflow-hidden ${
                scrolled ? "max-h-0 opacity-0" : "max-h-6 opacity-100"
              }`}
            >
              Digital Agency — Almaty, Kazakhstan
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
          <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors text-sm">{t.nav.services}</Link>
          <Link href="/cases" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors text-sm">{t.nav.cases}</Link>
          <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors text-sm">Блог</Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors text-sm">{t.nav.about}</Link>
          <Link href="/contacts" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors text-sm">{t.nav.contacts}</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300"
            aria-label={t.nav.menu}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`md:hidden bg-white dark:bg-[#1A1A2E] px-6 py-4 space-y-3 ${
            scrolled
              ? "mt-2 mx-4 rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-lg"
              : "border-t border-gray-100 dark:border-white/10"
          }`}
        >
          <Link href="/services" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium" onClick={() => setMobileOpen(false)}>{t.nav.services}</Link>
          <Link href="/cases" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium" onClick={() => setMobileOpen(false)}>{t.nav.cases}</Link>
          <Link href="/blog" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium" onClick={() => setMobileOpen(false)}>Блог</Link>
          <Link href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium" onClick={() => setMobileOpen(false)}>{t.nav.about}</Link>
          <Link href="/contacts" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium" onClick={() => setMobileOpen(false)}>{t.nav.contacts}</Link>
        </div>
      )}
    </header>
  );
}
