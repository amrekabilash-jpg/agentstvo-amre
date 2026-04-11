import Link from "next/link";

const navLinks = [
  { label: "Услуги", href: "/services" },
  { label: "Кейсы", href: "/cases" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export function NavFooter(): React.ReactElement {
  return (
    <div className="bg-gray-50 dark:bg-[#0A0A15] border-t border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center gap-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
          <img src="/images/logo.svg" alt="Агентство" width={28} height={28} className="dark:invert" />
          Агентство
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
