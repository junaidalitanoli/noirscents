import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getAbsoluteUrl } from "@/lib/site";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Normalize items to ensure 'Home' is not duplicated
  const filteredItems = items.filter(
    (item, idx) => !(idx === 0 && item.label.trim().toLowerCase() === "home")
  );

  const fullBreadcrumbs = [
    { label: "Home", href: "/" },
    ...filteredItems,
  ];

  const breadcrumbListJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullBreadcrumbs.map((crumb, index) => {
      const itemUrl = crumb.href ? getAbsoluteUrl(crumb.href) : undefined;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        ...(itemUrl ? { item: itemUrl } : {}),
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-3 text-xs text-zinc-500 dark:text-zinc-400">
        <ol className="flex items-center flex-wrap gap-1.5">
          <li className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-zinc-950 dark:hover:text-[#d4af37] flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>

          {filteredItems.map((item, idx) => {
            const isLast = idx === filteredItems.length - 1;
            return (
              <li key={idx} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600" />
                {isLast || !item.href ? (
                  <span className="text-zinc-900 dark:text-zinc-100 font-semibold truncate max-w-xs sm:max-w-md">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-zinc-950 dark:hover:text-[#d4af37] capitalize transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
