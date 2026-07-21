"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, ChevronRight, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { MobileSidebar } from "./MobileSidebar";

/**
 * AdminHeader — top bar with hamburger (mobile), breadcrumb, search, theme toggle.
 */
export function AdminHeader({
  title,
  email,
}: {
  title: string;
  email?: string | null;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Build a simple breadcrumb from the pathname.
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumb = segments.map((seg, i) => {
    const isLast = i === segments.length - 1;
    const label = seg.charAt(0).toUpperCase() + seg.slice(1);
    return { label, isLast };
  });

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between gap-lg border-b border-hairline bg-surface-card px-lg md:px-xxl py-md">
        {/* Left: hamburger (mobile) + breadcrumb */}
        <div className="flex items-center gap-md">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka menu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md text-ink hover:bg-surface transition-colors md:hidden"
          >
            <Menu size={22} />
          </button>
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
        </div>

        {/* Right side: search + theme toggle */}
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
        </div>
      </header>

      {/* Mobile sidebar drawer */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        email={email}
      />
    </>
  );
}
