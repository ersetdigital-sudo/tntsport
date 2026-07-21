"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

/**
 * AdminHeader — top bar with breadcrumb, search, and notifications.
 *
 * Visual design follows the NeedMCP "dashboard-sidebar-overview"
 * wireframe: a sticky header with breadcrumb navigation on the left
 * and a search input + notification bell + avatar on the right.
 *
 * The sign-out action now lives in the sidebar user profile card,
 * keeping the header focused on navigation and search.
 */
export function AdminHeader({
  title,
  email,
}: {
  title: string;
  email?: string | null;
}) {
  const pathname = usePathname();

  // Build a simple breadcrumb from the pathname.
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumb = segments.map((seg, i) => {
    const isLast = i === segments.length - 1;
    const label = seg.charAt(0).toUpperCase() + seg.slice(1);
    return { label, isLast };
  });

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-lg border-b border-hairline bg-surface-card px-lg md:px-xxl py-md">
      {/* Breadcrumb */}
      <div className="flex items-center text-body-sm text-stone">
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center">
            {i > 0 && (
              <ChevronRight size={12} className="mx-xs text-stone" />
            )}
            <span
              className={
                crumb.isLast
                  ? "text-ink font-medium"
                  : "text-stone"
              }
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      {/* Right side: search + notifications + avatar */}
      <div className="flex items-center gap-md">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            size={14}
            className="absolute left-md top-1/2 -translate-y-1/2 text-stone"
          />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-48 md:w-64 pl-xl pr-md bg-surface text-ink rounded-md border border-hairline text-body-sm outline-none transition-colors duration-normal focus:border-primary placeholder:text-stone"
          />
        </div>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-sm text-stone hover:text-ink transition-colors duration-normal"
        >
          <Bell size={18} />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center shrink-0">
          <span className="text-on-primary font-bold text-caption">
            {(email?.[0] ?? "A").toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
}