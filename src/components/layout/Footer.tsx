"use client";

import Link from "next/link";
import { useT } from "@/lib/lang-context";

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
];

export function Footer(): React.ReactElement {
  const { t } = useT();

  const navLinks = [
    { label: t.nav.services, href: "/services" },
    { label: t.nav.cases, href: "/cases" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contacts, href: "/contacts" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-[#0A0A15] border-t border-slate-200 dark:border-white/10 transition-colors">
      {/* Main footer content */}
      <div className="container-atlantis pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand + Description */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <img src="/images/logo.svg" alt="Агентство" width={52} height={52} className="dark:invert" />
              <span className="text-[17px] font-bold text-slate-900 dark:text-white">Агентство</span>
            </div>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-xs mb-4">
              {t.footer.description}
            </p>

            <p className="text-slate-600 text-sm font-medium mb-1">Казахстан, г. Алматы</p>
            <p className="text-sm text-slate-400 mb-3">Скоро</p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-slate-600 hover:text-[#5B5FEF] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
              {t.footer.social}
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-slate-600 hover:text-[#5B5FEF] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 dark:border-white/10">
        <div className="container-atlantis py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Агентство. {t.footer.rights}
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-slate-600 transition-colors duration-200">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-slate-600 transition-colors duration-200">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
