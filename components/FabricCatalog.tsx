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
    label: "3 JACQUARD KAIN",
    note: "Tekstur premium dengan motif anyaman timbul pada kain.",
  },
  base: {
    label: "Base Kain",
    note: "Bahan dasar dryfit adem, cepat kering, dan ringan.",
  },
  embossed: {
    label: "EMBOSSED KAIN",
    note: "Kain dengan efek tekstur timbul 3D, tampil lebih eksklusif.",
  },
};

function FabricModal({ fabric, waNumber, onClose }: { fabric: Fabric; waNumber: string; onClose: () => void }) {
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
  const [detail, setDetail] = useState<Fabric | null>(null);

  const groups = FABRIC_GROUP_ORDER.map((gid) => ({
    id: gid,
    meta: GROUP_META[gid],
    fabrics: fabrics.filter((f) => f.group === gid),
  })).filter((g) => g.fabrics.length > 0);

  if (groups.length === 0) return null;

  return (
    <>
      <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-12">
        {groups.map((group) => (
          <div key={group.id}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#f0f2ec] sm:text-base"
                  style={{ fontFamily: "var(--font-mono)" }}>
                {group.meta.label}
              </h3>
              <p className="text-xs text-[#92998b]">{group.meta.note}</p>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {group.fabrics.map((fabric) => (
                <button
                  key={fabric.id}
                  type="button"
                  onClick={() => setDetail(fabric)}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#131611] text-left transition duration-300 hover:-translate-y-1 hover:border-[#00aa13]/35 sm:rounded-3xl"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#181c15]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={fabric.image}
                      alt={`${fabric.code}_${fabric.name} — Bahan Jersey TNT SPORT`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                      <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#080a07] opacity-0 shadow-lg transition group-hover:opacity-100">
                        Klik untuk zoom
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[9px] font-black uppercase tracking-[.2em] text-[#00aa13]"
                       style={{ fontFamily: "var(--font-mono)" }}>
                      {fabric.code}
                    </p>
                    <p className="mt-1.5 text-lg font-black uppercase tracking-tight text-[#f0f2ec] transition group-hover:text-white sm:text-xl"
                       style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed" }}>
                      {fabric.name}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#92998b] transition group-hover:text-[#00aa13]">
                      Lihat detail
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {detail && (
        <FabricModal fabric={detail} waNumber={waNumber} onClose={() => setDetail(null)} />
      )}
    </>
  );
}
