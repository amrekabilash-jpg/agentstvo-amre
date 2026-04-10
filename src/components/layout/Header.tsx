"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { useT } from "@/lib/lang-context";

export function Header(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useT();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0F0F1A]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

        {/* LOGO - Left */}
        <div className="flex-shrink-0 text-2xl font-bold text-gray-900 dark:text-white">
          <Link href="/"><span className="text-indigo-600 dark:text-indigo-400">А</span></Link>
        </div>

        {/* NAVIGATION - Strict Center */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-10">
          <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">{t.nav.services}</Link>
          <Link href="/cases" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">{t.nav.cases}</Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">{t.nav.about}</Link>
          <Link href="/contacts" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">{t.nav.contacts}</Link>
        </nav>

        {/* Right side: Lang toggle + Theme toggle + Mobile hamburger */}
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
        <div className="md:hidden bg-white dark:bg-[#1A1A2E] border-t border-gray-100 dark:border-white/10 px-6 py-4 space-y-3">
          <Link href="/services" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium" onClick={() => setMobileOpen(false)}>{t.nav.services}</Link>
          <Link href="/cases" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium" onClick={() => setMobileOpen(false)}>{t.nav.cases}</Link>
          <Link href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium" onClick={() => setMobileOpen(false)}>{t.nav.about}</Link>
          <Link href="/contacts" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium" onClick={() => setMobileOpen(false)}>{t.nav.contacts}</Link>
        </div>
      )}
    </header>
  );
}
