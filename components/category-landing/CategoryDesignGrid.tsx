"use client";

import { useState } from "react";
import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/wa";

export interface GridProduct {
  id: string;
  catalogue: string;
  image: string;
  alt: string;
}

interface Props {
  products: GridProduct[];
  waNumber: string;
  /** template pesan WA — "{design}" diganti kode desain saat klik */
  waMessageTemplate: string;
}

function ZoomModal({
  product,
  waLink,
  onClose,
}: {
  product: GridProduct;
  waLink: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail desain ${product.catalogue}`}
    >
      <div
        className="relative my-auto w-[92vw] max-w-[500px] rounded-2xl bg-[#121826] shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail desain"
          className="absolute right-3 top-3 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-black/60 text-white transition hover:bg-[#f97316]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl bg-[#111] sm:rounded-t-3xl">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 500px) 92vw, 500px"
            className="object-contain"
          />
        </div>
        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a9b6ac]">
            Kode desain
          </p>
          <h3 className="pdisplay mt-1 text-2xl uppercase text-white" style={{ fontFamily: "var(--font-ab)" }}>
            {product.catalogue}
          </h3>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#fb923c] to-[#c2410c] px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.11c-.25.7-1.45 1.34-2 1.38-.51.05-.99.23-3.35-.7-2.85-1.12-4.64-4.05-4.78-4.24-.14-.19-1.13-1.51-1.13-2.88 0-1.37.72-2.05.97-2.33.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.62.48.23.55.79 1.92.86 2.06.07.14.11.3.02.49-.09.19-.46.74-.64.93-.13.14-.28.3-.12.58.16.28.71 1.17 1.52 1.89 1.04.93 1.74 1.22 2.02 1.36.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.25.09 1.62.76 1.9.9.28.14.46.21.53.32.07.12.07.68-.18 1.38Z" />
            </svg>
            Order Desain Ini
          </a>
        </div>
      </div>
    </div>
  );
}

export function CategoryDesignGrid({ products, waNumber, waMessageTemplate }: Props) {
  const [active, setActive] = useState<GridProduct | null>(null);

  if (!products.length) return null;

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {products.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p)}
            aria-label={`Lihat detail desain ${p.catalogue}`}
            className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#121826] transition hover:-translate-y-1 hover:border-[#f97316]/60"
          >
            <Image
              src={p.image}
              alt={p.alt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2.5 pt-8 text-left text-[11px] font-bold uppercase tracking-wider text-white">
              {p.catalogue}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <ZoomModal
          product={active}
          waLink={buildWhatsAppLink(waNumber, waMessageTemplate.replace("{design}", active.catalogue))}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
