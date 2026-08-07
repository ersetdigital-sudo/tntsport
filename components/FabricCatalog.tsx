"use client";

import { useState } from "react";
import type { Fabric, FabricGroupId } from "@/lib/types";

interface FabricCatalogProps {
  fabrics: Fabric[];
  waNumber: string;
}

const FABRIC_GROUP_ORDER: FabricGroupId[] = ["jacquard", "base", "embossed"];

const GROUP_META: Record<FabricGroupId, { label: string; note: string }> = {
  jacquard: {
    label: "3 Jacquard Kain",
    note: "Tekstur premium dengan motif anyaman timbul.",
  },
  base: {
    label: "Base Kain",
    note: "Dryfit adem, cepat kering, dan ringan.",
  },
  embossed: {
    label: "Embossed Kain",
    note: "Efek tekstur timbul 3D yang lebih eksklusif.",
  },
};

function FabricZoomModal({ fabric, waNumber, onClose }: { fabric: Fabric; waNumber: string; onClose: () => void }) {
  const waMessage = `Halo TNT SPORT, saya tertarik dengan bahan *${fabric.code}_${fabric.name}* (${GROUP_META[fabric.group].label}). Bisa info harga dan detailnya?`;
  const href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-[92vw] max-w-[500px] rounded-2xl bg-[#131611] shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fabric.image}
            alt={`${fabric.code}_${fabric.name} — Bahan Jersey TNT SPORT`}
            className="block h-auto w-full object-contain"
            style={{ maxHeight: "70vh" }}
          />
        </div>

        <div className="border-t border-white/10 bg-[#131611] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[#00aa13]"
                 style={{ fontFamily: "var(--font-mono)" }}>
                {fabric.code}_{fabric.name}
              </p>
              <p className="mt-1 text-xs text-[#a7ad9e]">{GROUP_META[fabric.group].label}</p>
              {fabric.description ? (
                <p className="mt-3 text-sm leading-relaxed text-[#d4d9cc]">{fabric.description}</p>
              ) : null}
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#00aa13] px-4 py-2.5 text-xs font-black text-[#080a07] transition hover:bg-[#00c317] sm:px-5 sm:text-sm"
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

export function FabricCatalog({ fabrics, waNumber }: FabricCatalogProps) {
  const [zoom, setZoom] = useState<Fabric | null>(null);

  const groups = FABRIC_GROUP_ORDER.map((gid) => ({
    id: gid,
    meta: GROUP_META[gid],
    fabrics: fabrics.filter((f) => f.group === gid),
  })).filter((g) => g.fabrics.length > 0);

  if (groups.length === 0) return null;

  return (
    <>
      <div className="mt-8 space-y-6 sm:mt-10">
        {groups.map((group) => (
          <div key={group.id} className="rounded-2xl border border-white/10 bg-[#131611]/60 sm:rounded-3xl">
            <div className="flex flex-col gap-1 border-b border-white/10 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#f0f2ec] sm:text-sm"
                  style={{ fontFamily: "var(--font-mono)" }}>
                {group.meta.label}
              </h3>
              <p className="text-[11px] text-[#92998b] sm:text-xs">{group.meta.note}</p>
            </div>

            <div className="flex flex-col divide-y divide-white/5">
              {group.fabrics.map((fabric) => {
                const waMessage = `Halo TNT SPORT, saya tertarik dengan bahan *${fabric.code}_${fabric.name}* (${group.meta.label}). Bisa info harga dan detailnya?`;
                const href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
                return (
                  <details key={fabric.id} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 transition hover:bg-white/[.03] sm:px-6 [&::-webkit-details-marker]:hidden">
                      <span className="min-w-0">
                        <span className="block text-[9px] font-black uppercase tracking-[.2em] text-[#00aa13]"
                              style={{ fontFamily: "var(--font-mono)" }}>
                          {fabric.code}
                        </span>
                        <span className="mt-0.5 block truncate text-base font-black uppercase tracking-tight text-[#f0f2ec] sm:text-lg"
                              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed" }}>
                          {fabric.name}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#92998b] transition group-hover:text-[#00aa13]">
                        Detail
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-200 group-open:rotate-90"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </summary>

                    <div className="grid gap-4 px-4 pb-5 sm:grid-cols-[180px_1fr] sm:px-6 sm:pb-6 sm:pt-1">
                      <button
                        type="button"
                        onClick={() => setZoom(fabric)}
                        className="group/zoom relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/10 text-left sm:w-[180px]"
                        aria-label={`Zoom ${fabric.code}_${fabric.name}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={fabric.image}
                          alt={`${fabric.code}_${fabric.name} — Bahan Jersey TNT SPORT`}
                          className="h-full w-full object-cover transition duration-300 group-hover/zoom:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover/zoom:bg-black/20">
                          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#080a07] opacity-0 shadow-lg transition group-hover/zoom:opacity-100">
                            Klik untuk zoom
                          </span>
                        </span>
                      </button>
                      <div className="flex flex-col justify-between gap-4">
                        <p className="text-sm leading-relaxed text-[#a7ad9e] sm:text-base">
                          {fabric.description ?? "Konsultasikan bahan ini dengan tim kami untuk pilihan yang paling pas."}
                        </p>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00aa13] px-5 py-2.5 text-xs font-black uppercase tracking-wide text-[#080a07] transition hover:bg-[#00c317] sm:w-fit sm:px-6 sm:text-sm"
                        >
                          Order Bahan Ini
                        </a>
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {zoom && (
        <FabricZoomModal fabric={zoom} waNumber={waNumber} onClose={() => setZoom(null)} />
      )}
    </>
  );
}