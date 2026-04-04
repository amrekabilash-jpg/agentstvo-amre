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
        <Link href="/" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">
          <span className="text-indigo-600 dark:text-indigo-400">А</span>гентсво
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
