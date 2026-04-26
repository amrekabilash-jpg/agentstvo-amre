import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps): React.ReactElement {
  return (
    <nav aria-label="Хлебные крошки" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--foreground-muted)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="select-none">/</span>
              )}
              {isLast || !item.href ? (
                <span
                  className="text-[var(--foreground)] font-medium"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[var(--accent-blue)] transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
