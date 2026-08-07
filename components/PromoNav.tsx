"use client";

import { useState } from "react";

const LINKS = [
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#desain", label: "Desain" },
  { href: "#harga", label: "Harga" },
  { href: "#cara-order", label: "Cara Order" },
  { href: "#faq", label: "FAQ" },
];

/**
 * PromoNav — sticky header untuk landing Promo Bulan Ini (desain baru:
 * Archivo Black + aksen merah). Menu mobile toggle via useState.
 */
export function PromoNav({ logoHref }: { logoHref: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5" aria-label="TNT Sport">
          <img src={logoHref} alt="Logo TNT Sport" className="h-12 w-12 object-contain mix-blend-screen" />
          <span className="text-base font-black tracking-[.16em] text-white sm:text-lg">TNT SPORT</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-zinc-300 md:flex" aria-label="Navigasi utama">
          {LINKS.map((l) => (
            <a key={l.href} className="transition hover:text-white" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#harga"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#ef233c] hover:text-white md:inline-flex"
        >
          Pesan sekarang
        </a>
        <button
          id="menuButton"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 md:hidden"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="space-y-1.5">
            <i className="block h-0.5 w-5 bg-white" />
            <i className="block h-0.5 w-5 bg-white" />
          </span>
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-[#09090b] px-5 py-5 md:hidden" aria-label="Navigasi mobile">
          <div className="grid gap-1 text-base font-semibold">
            {LINKS.map((l) => (
              <a
                key={l.href}
                className="rounded-xl px-3 py-3 hover:bg-white/5"
                href={l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}