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
  Sparkles,
  MessageSquareQuote,
  Settings,
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
      { href: "/admin/katalog-features", label: "Keunggulan", icon: Sparkles },
      { href: "/admin/katalog-testimonials", label: "Testimoni", icon: MessageSquareQuote },
    ],
  },
  {
    title: "Atur Bio Link",
    items: [
      { href: "/admin/brand", label: "Brand & Pixel", icon: Settings },
      { href: "/admin/stats", label: "Stats", icon: BarChart3 },
      { href: "/admin/cta-links", label: "CTA Links", icon: Link2 },
      { href: "/admin/reviews", label: "Reviews", icon: Star },
      { href: "/admin/social-links", label: "Social Links", icon: Share2 },
      { href: "/admin/trust-badges", label: "Trust Badges", icon: ShieldCheck },
    ],
  },
];

export function AdminSidebar({ email, mobile, onNavigate }: { email?: string | null; mobile?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function signOut() {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();

      // FIX: Pakai window.location.href untuk force full page reload.
      // router.refresh() + router.replace() tidak cukup karena:
      // 1. router.refresh() async tapi tidak di-await
      // 2. router.replace() jalan sebelum session ter-clear di server
      // 3. Next.js client-side navigation tidak rebuild layout
      //    → sidebar/header tetap ter-render walaupun user sudah logout
      //
      // Dengan window.location.href:
      // - Browser kirim request baru ke /admin/login
      // - Middleware cek session → user sudah logout → render auth page
      // - Layout dibangun ulang dari nol (tanpa sidebar)
      window.location.href = "/admin/login";
    });
  }

  return (
    <div className={mobile ? "flex flex-col h-full" : "flex md:flex-col h-full"}>
      {/* Brand header — desktop only (mobile drawer has its own header) */}
      {!mobile && (
        <div className="hidden md:flex items-center gap-sm p-lg border-b border-hairline">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
            <span className="text-on-primary font-bold text-body-md">T</span>
          </div>
          <h1 className="text-body-sm text-ink font-bold">TNT SPORT</h1>
        </div>
      )}

      {/* Navigation */}
      <nav
        aria-label="Admin navigation"
        className={`flex-1 ${mobile ? "flex flex-col gap-xl overflow-y-auto px-md py-lg" : "flex md:flex-col gap-xl overflow-x-auto md:overflow-y-auto md:overflow-x-hidden px-md md:px-sm py-md md:py-lg scrollbar-hide"}`}
      >
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className={mobile ? "flex flex-col gap-xs" : "flex md:flex-col gap-xs"}>
            <p className={mobile ? "px-md text-button-sm text-stone uppercase tracking-wider mb-xs" : "hidden md:block px-md text-button-sm text-stone uppercase tracking-wider mb-xs"}>
              {group.title}
            </p>
            <div className={mobile ? "flex flex-col gap-xs" : "flex md:flex-col gap-xs"}>
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
                    onClick={mobile ? onNavigate : undefined}
                    className={`text-button-md whitespace-nowrap inline-flex items-center gap-sm rounded-md px-md py-md transition-colors duration-normal ${
                      isActive
                        ? "bg-secondary text-on-primary"
                        : "text-charcoal hover:bg-gray-100 dark:hover:bg-surface-dark hover:text-ink dark:hover:text-on-dark"
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

      {/* User profile + sign out — desktop only */}
      <div className={mobile ? "p-lg border-t border-hairline" : "hidden md:block p-lg border-t border-hairline"}>
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
