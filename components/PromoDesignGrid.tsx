"use client";

import { useState } from "react";
import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/wa";

const DESIGN_COUNT = 20;

const DESIGN_ALTS: Record<number, string> = {
  1: "Desain jersey custom futsal premium agustusan",
  2: "Desain jersey custom merah putih national",
  3: "Desain jersey custom turnamen",
  4: "Desain jersey custom tim sepak bola",
  5: "Desain jersey custom voli",
  6: "Desain jersey custom badminton",
  7: "Desain jersey custom merah marun",
  8: "Desain jersey custom komunitas",
  9: "Desain jersey custom event",
  10: "Desain jersey custom tim olahraga",
  11: "Desain jersey custom nasional",
  12: "Desain jersey custom klasik putih merah",
  13: "Desain jersey custom hitam merah",
  14: "Desain jersey custom full printing merah",
  15: "Desain jersey custom tim kompetisi",
  16: "Desain jersey custom latihan",
  17: "Desain jersey custom merchandise",
  18: "Desain jersey custom klub",
  19: "Desain jersey custom jersey kustom",
  20: "Desain jersey custom merah putih bendera",
};

function ZoomModal({
  design,
  waNumber,
  onClose,
}: {
  design: number;
  waNumber: string;
  onClose: () => void;
}) {
  const waLink = buildWhatsAppLink(waNumber,
    `Halo TNT SPORT APPAREL, saya tertarik dengan desain promo nomor ${String(design).padStart(2, "0")}. Bisa info lebih lanjut?`
  );
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-[92vw] max-w-[500px] rounded-2xl bg-[#1c1c21] shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/promo/promo-${design}.jpg`}
            alt={DESIGN_ALTS[design]}
            className="block h-auto w-full object-contain"
            style={{ maxHeight: "70vh" }}
          />
        </div>
        <div className="border-t border-white/10 bg-[#1c1c21] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#ef233c]">
                Desain {String(design).padStart(2, "0")}
              </p>
              <p className="mt-1 text-sm text-zinc-400">Promo Kemerdekaan</p>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ef233c] px-4 py-2.5 text-xs font-black text-white transition hover:bg-red-500 sm:px-5 sm:text-sm"
            >
              Order Sekarang
            </a>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 sm:h-9 sm:w-9"
          aria-label="Tutup"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function PromoDesignGrid({ waNumber }: { waNumber: string }) {
  const [zoomed, setZoomed] = useState<number | null>(null);

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: DESIGN_COUNT }).map((_, i) => {
          const design = i + 1;
          const waLink = buildWhatsAppLink(waNumber,
            `Halo TNT SPORT APPAREL, saya tertarik dengan desain ${String(design).padStart(2, "0")} di promo kemerdekaan. Bisa info lebih lanjut?`
          );
          return (
            <article
              key={design}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111114] transition duration-300 hover:-translate-y-1 hover:border-[#ef233c]/40 sm:rounded-3xl"
            >
              <button
                onClick={() => setZoomed(design)}
                className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden bg-[#18181c]"
              >
                <Image
                  src={`/promo/promo-${design}.jpg`}
                  alt={DESIGN_ALTS[design] ?? "Desain jersey custom TNT Sport"}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-black opacity-0 shadow-lg transition group-hover:opacity-100">
                    Klik untuk zoom
                  </span>
                </div>
              </button>
              <div className="p-3 sm:p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#ef233c] sm:text-[11px]">
                  Desain {String(design).padStart(2, "0")}
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block w-full rounded-full bg-[#ef233c] py-2 text-center text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-red-500 sm:py-2.5 sm:text-xs"
                >
                  Pilih Desain Ini
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {zoomed && <ZoomModal design={zoomed} waNumber={waNumber} onClose={() => setZoomed(null)} />}
    </>
  );
}