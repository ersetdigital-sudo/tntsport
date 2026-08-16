"use client";

import { useEffect, useRef, useState } from "react";

export interface PurchasePop {
  name: string;
  city: string;
  product: string;
}

const SHOW_AFTER_MS = 6000;
const ROTATE_MS = 9000;
const VISIBLE_MS = 5500;

/**
 * Pop-up notifikasi pembelian (social proof real-time).
 * - Muncul beberapa detik setelah load, lalu berganti nama/kota otomatis.
 * - Bisa ditutup permanen (session), pause saat hover/fokus.
 * - Menghormati prefers-reduced-motion: hanya tampil statis sekali tanpa rotasi.
 */
export function PurchaseNotifications({ pops }: { pops: PurchasePop[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const hoveredRef = useRef(false);

  useEffect(() => {
    if (dismissed || pops.length === 0) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);

    // Menampilkan & menyembunyikan secara bergantian; berhenti berputar saat kursor diarahkan.
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let showTimer: ReturnType<typeof setTimeout> | undefined;
    let rotateTimer: ReturnType<typeof setInterval> | undefined;

    const start = setTimeout(() => {
      setVisible(true);

      if (media.matches) return; // tampil sekali, tanpa rotasi

      hideTimer = setTimeout(() => {
        setVisible(false);
        showTimer = setTimeout(() => {
          setIndex((i) => (i + 1) % pops.length);
          setVisible(true);
        }, ROTATE_MS - VISIBLE_MS);
      }, VISIBLE_MS);

      rotateTimer = setInterval(() => {
        if (hoveredRef.current) return;
        setIndex((i) => (i + 1) % pops.length);
      }, ROTATE_MS);
    }, SHOW_AFTER_MS);

    return () => {
      clearTimeout(start);
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
      clearInterval(rotateTimer);
    };
  }, [dismissed, pops.length]);

  if (dismissed || pops.length === 0 || (!visible && reducedMotion)) return null;
  if (dismissed) return null;

  const pop = pops[index];

  return (
    <div
      className="fixed bottom-4 left-4 z-[90] max-w-[calc(100vw-2rem)] sm:bottom-6 sm:left-6"
      onMouseEnter={() => (hoveredRef.current = true)}
      onMouseLeave={() => (hoveredRef.current = false)}
      onFocus={() => (hoveredRef.current = true)}
      onBlur={() => (hoveredRef.current = false)}
    >
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-black/10 bg-white/95 p-3 pr-11 shadow-[0_18px_50px_-12px_rgba(0,0,0,.35)] backdrop-blur"
      >
        <span className="relative flex h-3 w-3 flex-none" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
        <div className="min-w-0 text-[13px] leading-snug text-zinc-800">
          <p className="font-bold">
            {pop.name} — {pop.city}
          </p>
          <p className="truncate text-zinc-500">
            baru memesan <span className="font-semibold text-zinc-700">{pop.product}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Tutup notifikasi pembelian"
          className="absolute right-1.5 top-1.5 grid h-8 w-8 cursor-pointer place-items-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
