"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Image,
  BarChart3,
  Link2,
  Star,
  Share2,
  ShieldCheck,
  Tag,
  Shirt,
  LogOut,
} from "lucide-react";

/**
 * AdminSidebar — primary navigation for the admin panel.
 *
 * Visual design follows the NeedMCP "dashboard-sidebar-overview"
 * wireframe: grouped navigation sections (Main Menu, Katalog, Konten),
 * icon-prefixed links, active state highlight, and a user profile card
 * with sign-out at the bottom.
 *
 * The sidebar collapses to a horizontal scroll bar on mobile
 * (md: breakpoint switches to a vertical rail).
 */

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  /** Matches pathname.startsWith(activePrefix) — defaults to `href`. */
  activePrefix?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Main Menu",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        icon: LayoutDashboard,
        activePrefix: "/admin",
      },
    ],
  },
  {
    title: "Katalog",
    items: [
      { href: "/admin/products", label: "Produk", icon: Shirt },
      { href: "/admin/categories", label: "Kategori", icon: Tag },
    ],
  },
  {
    title: "Konten",
    items: [
      { href: "/admin/brand", label: "Brand", icon: Image },
      { href: "/admin/stats", label: "Stats", icon: BarChart3 },
      { href: "/admin/cta-links", label: "CTA Links", icon: Link2 },
      { href: "/admin/reviews", label: "Reviews", icon: Star },
      { href: "/admin/social-links", label: "Social Links", icon: Share2 },
      { href: "/admin/trust-badges", label: "Trust Badges", icon: ShieldCheck },
    ],
  },
];

export function AdminSidebar({ email }: { email?: string | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function signOut() {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.refresh();
      router.replace("/admin/login");
    });
  }

  return (
    <div className="flex md:flex-col h-full md:h-dvh">
      {/* Brand header */}
      <div className="hidden md:flex items-center gap-sm p-lg border-b border-hairline">
        <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
          <span className="text-on-primary font-bold text-body-md">T</span>
        </div>
        <div>
          <p className="text-button-sm text-stone uppercase tracking-wider">
            Agency
          </p>
          <h1 className="text-body-sm text-ink font-bold">TNT SPORT</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Admin navigation"
        className="flex-1 flex md:flex-col gap-xl overflow-x-auto md:overflow-y-auto md:overflow-x-hidden px-md md:px-sm py-md md:py-lg scrollbar-hide"
      >
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="flex md:flex-col gap-xs">
            <p className="hidden md:block px-md text-button-sm text-stone uppercase tracking-wider mb-xs">
              {group.title}
            </p>
            <div className="flex md:flex-col gap-xs">
              {group.items.map((item) => {
                const prefix = item.activePrefix ?? item.href;
                // Exact match for /admin, startsWith for everything else.
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(prefix);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-button-md whitespace-nowrap inline-flex items-center gap-sm rounded-md px-md py-md transition-colors duration-normal ${
                      isActive
                        ? "bg-secondary text-on-primary"
                        : "text-on-dark-mute hover:bg-surface-dark hover:text-on-dark"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User profile + sign out */}
      <div className="hidden md:block p-lg border-t border-hairline">
        <div className="flex items-center p-sm bg-surface rounded-lg border border-hairline">
          <div className="w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
            <span className="text-on-primary font-bold text-body-sm">
              {(email?.[0] ?? "A").toUpperCase()}
            </span>
          </div>
          <div className="ml-sm flex-1 overflow-hidden">
            <p className="text-body-sm text-ink font-bold truncate">
              {email ?? "Admin"}
            </p>
            <p className="text-caption text-stone truncate">Administrator</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            disabled={pending}
            aria-label="Keluar"
            className="p-xs text-stone hover:text-danger transition-colors duration-normal disabled:opacity-40"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
