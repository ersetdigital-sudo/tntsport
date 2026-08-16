"use client";

import { useEffect, useState } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
}

/**
 * GalleryMarquee — galeri foto berjalan (CSS marquee) yang tiap fotonya
 * bisa diklik untuk diperbesar (lightbox).
 * - Animasi tetap 100% CSS (.gal-track keyframes) — komponen ini hanya
 *   menambahkan state zoom.
 * - ESC / klik backdrop / tombol X menutup; scroll body dikunci saat zoom.
 */
export function GalleryMarquee({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="gal-wrap mt-7">
        <div className="gal-track">
          {Array.from({ length: 2 }).map((_, dup) =>
            images.map((g, i) => (
              <button
                key={`${dup}-${i}`}
                type="button"
                onClick={() => dup === 0 && setActive(i)}
                aria-hidden={dup === 1 || undefined}
                aria-label={dup === 1 ? undefined : `Perbesar foto: ${g.alt}`}
                className="gal-item block cursor-pointer p-0 text-left"
              >
                <img src={g.src} alt={dup === 1 ? "" : g.alt} loading="lazy" />
              </button>
            ))
          )}
        </div>
      </div>

      {active !== null && images[active] && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Perbesar foto galeri"
        >
          <div
            className="relative my-auto max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Tutup foto"
              className="absolute -top-2 -right-2 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-[#ff6b00] text-white shadow-lg transition hover:bg-[#ff9d2e]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[active].src}
              alt={images[active].alt}
              className="max-h-[82vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-sm text-white/60">{images[active].alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
