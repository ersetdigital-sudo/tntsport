"use client";

import { useEffect, useRef, useState } from "react";

export interface PurchasePop {
  name: string;
  city: string;
  product: string;
  time: string;
}

const SHOW_AFTER_MS = 3500;
const ROTATE_MS = 9000;
const VISIBLE_MS = 5500;

/**
 * Pop-up notifikasi pembelian (social proof real-time) ala referensi:
 * card gelap dengan border oranye, nama-kota, produk, waktu, Verified.
 * - Muncul beberapa detik setelah load, berganti otomatis.
 * - Bisa ditutup permanen, sembunyi/tampil dengan transisi slide.
 * - prefers-reduced-motion: tampil sekali tanpa rotasi.
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

  if (dismissed || pops.length === 0) return null;

  const pop = pops[index];
  const hidden = !visible || (reducedMotion && false);

  return (
    <div
      className={`cl-pop fixed bottom-4 left-4 z-50 max-w-[19rem] sm:max-w-sm ${hidden ? "cl-pop-hide" : ""}`}
      onMouseEnter={() => (hoveredRef.current = true)}
      onMouseLeave={() => (hoveredRef.current = false)}
    >
      <div
        className="card rounded-xl p-3.5 pr-9 shadow-2xl backdrop-blur relative"
        style={{ borderColor: "rgba(255,107,0,.25)" }}
        role="status"
        aria-live="polite"
      >
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Tutup notifikasi"
          className="absolute top-2 right-2.5 grid h-8 w-8 cursor-pointer place-items-center text-white/35 hover:text-white text-lg leading-none"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="flex items-start gap-2.5">
          <span className="mt-1 w-2 h-2 rounded-full bg-green-400 shrink-0 animate-pulse" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-bold leading-snug">
              {pop.name} — {pop.city}
            </p>
            <p className="text-[13px] text-[#9aa1ad] leading-snug mt-0.5">
              baru memesan <em className="text-white/80 not-italic font-semibold">{pop.product}</em>
            </p>
            <p className="text-[11px] text-white/40 mt-1.5">
              {pop.time} · <span className="text-green-400">Verified</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
