"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";

/**
 * ThemeToggle - top-right sun/moon switch (client component).
 *
 * Glass pill button with smooth icon transition. A `mounted` guard
 * prevents hydration mismatch - next-themes can't know the theme on
 * the server, so we render a same-sized placeholder until mounted.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";
  const label = isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      className="fixed right-lg top-lg z-50 flex h-12 w-12 items-center justify-center rounded-full glass shadow-premium-md lift-on-hover hover:shadow-premium-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
    >
      {mounted ? (
        isDark ? (
          <SunIcon className="h-5 w-5 text-warning" aria-hidden="true" />
        ) : (
          <MoonIcon className="h-5 w-5 text-secondary" aria-hidden="true" />
        )
      ) : (
        <span className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
