"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * AdminSidebar — primary navigation for the admin panel.
 *
 * Active state uses the electric-blue "activation" color (secondary)
 * from Design.md. The sidebar collapses to a horizontal scroll bar on
 * mobile (md: breakpoint switches to a vertical rail).
 */

interface NavItem {
  href: string;
  label: string;
  /** Matches pathname.startsWith(activePrefix) — defaults to `href`. */
  activePrefix?: string;
}

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", activePrefix: "/admin" },
  { href: "/admin/brand", label: "Brand" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/cta-links", label: "CTA Links" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/social-links", label: "Social Links" },
  { href: "/admin/trust-badges", label: "Trust Badges" },
  { href: "/admin/categories", label: "Kategori" },
  { href: "/admin/products", label: "Produk" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin navigation"
      className="flex md:flex-col gap-xs overflow-x-auto md:overflow-visible md:w-56 md:shrink-0 md:border-r md:border-hairline md:py-xl"
    >
      {NAV.map((item) => {
        const prefix = item.activePrefix ?? item.href;
        // Exact match for /admin, startsWith for everything else.
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(prefix);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-button-md whitespace-nowrap rounded-md px-lg py-md transition-colors duration-normal ${
              isActive
                ? "bg-secondary text-on-primary"
                : "text-on-dark-mute hover:bg-secondary hover:text-on-primary"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}