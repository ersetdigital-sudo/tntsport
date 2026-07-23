"use client";

import { useState } from "react";

export function PriceCards({ waLink }: { waLink: string }) {
  const [mode, setMode] = useState<"ecer" | "lusin">("lusin");

  const prices = {
    atasan: { ecer: "65rb", lusin: "50rb" },
    setelan: { ecer: "115rb", lusin: "110rb" },
  };

  const note = mode === "ecer" ? "Bisa pesan mulai 1 pcs" : "Minimal pembelian 12 pcs / set";

  return (
    <>
      {/* Price mode toggle */}
      <div className="mx-auto mt-8 flex w-fit rounded-full border border-white/10 bg-[#131611] p-1.5" role="tablist" aria-label="Pilihan jumlah pembelian">
        <button
          className={`rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider transition ${
            mode === "ecer"
              ? "bg-[#00aa13] text-[#080a07] shadow-[0_8px_28px_rgba(0,170,19,.2)]"
              : "text-[#8e9586]"
          }`}
          onClick={() => setMode("ecer")}
        >
          Ecer
        </button>
        <button
          className={`rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider transition ${
            mode === "lusin"
              ? "bg-[#00aa13] text-[#080a07] shadow-[0_8px_28px_rgba(0,170,19,.2)]"
              : "text-[#8e9586]"
          }`}
          onClick={() => setMode("lusin")}
        >
          Lusin <span className="ml-1 opacity-60">• Hemat</span>
        </button>
      </div>

      {/* Price cards */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-2">
        {/* Atasan */}
        <article className="price-card rounded-[2rem] border border-white/10 p-5 sm:p-7 lg:p-9">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[.18em] text-[#7f8678] sm:text-[11px]"
                 style={{ fontFamily: "var(--font-mono)" }}>
                Jersey atasan
              </p>
              <h3 className="mt-1 text-2xl font-black sm:mt-2 sm:text-3xl">Atasan Saja</h3>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#b4baac]">Fleksibel</span>
          </div>
          <div className="mt-5 flex items-baseline gap-2 sm:mt-8">
            <span className="text-sm text-[#00aa13]" style={{ fontFamily: "var(--font-mono)" }}>Rp</span>
            <span className="text-5xl font-black tracking-tight sm:text-6xl">{prices.atasan[mode]}</span>
            <span className="text-[#777e71]">/pcs</span>
          </div>
          <p className="mt-3 text-sm text-[#8f9688]">{note}</p>
          <div className="my-7 h-px bg-white/10" />
          <ul className="space-y-3.5 text-sm text-[#c5c9c0]">
            <li><span className="mr-2 text-[#00aa13]">✓</span> Full printing &amp; desain bebas</li>
            <li><span className="mr-2 text-[#00aa13]">✓</span> Nama dan nomor punggung</li>
            <li><span className="mr-2 text-[#00aa13]">✓</span> Revisi desain tanpa batas</li>
          </ul>
          <a
            href={`${waLink.replace("saya%20mau%20tanya%20jersey%20custom", encodeURIComponent("saya tertarik dengan paket Atasan Saja. Bisa info lebih lanjut?"))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 flex items-center justify-between rounded-full border border-white/15 px-6 py-4 font-black transition hover:border-[#00aa13] hover:text-[#00aa13]"
          >
            <span>Pilih Atasan</span><span>↗</span>
          </a>
        </article>

        {/* Setelan */}
        <article className="price-card featured relative overflow-hidden rounded-[2rem] border border-[#00aa13]/45 p-5 shadow-[0_24px_100px_rgba(0,170,19,.11)] sm:p-7 lg:p-9">
          <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#00aa13] px-5 py-2.5 text-[9px] font-black uppercase tracking-[.15em] text-[#080a07]">
            Paling diminati
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[.18em] text-[#00aa13]/70 sm:text-[11px]"
               style={{ fontFamily: "var(--font-mono)" }}>
              Atasan + celana
            </p>
            <h3 className="mt-1 text-2xl font-black sm:mt-2 sm:text-3xl">Jersey Setelan</h3>
          </div>
          <div className="mt-5 flex items-baseline gap-2 sm:mt-8">
            <span className="text-sm text-[#00aa13]" style={{ fontFamily: "var(--font-mono)" }}>Rp</span>
            <span className="text-5xl font-black tracking-tight sm:text-6xl">{prices.setelan[mode]}</span>
            <span className="text-[#777e71]">/set</span>
          </div>
          <p className="mt-3 text-sm text-[#8f9688]">{note}</p>
          <div className="my-7 h-px bg-white/10" />
          <ul className="space-y-3.5 text-sm text-[#d5d8d0]">
            <li><span className="mr-2 text-[#00aa13]">✓</span> Semua benefit paket atasan</li>
            <li><span className="mr-2 text-[#00aa13]">✓</span> Celana full custom siap tanding</li>
            <li><span className="mr-2 text-[#00aa13]">✓</span> Prioritas jadwal produksi</li>
          </ul>
          <a
            href={`${waLink.replace("saya%20mau%20tanya%20jersey%20custom", encodeURIComponent("saya tertarik dengan paket Jersey Setelan. Bisa info lebih lanjut?"))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 flex items-center justify-between rounded-full bg-[#00aa13] px-6 py-4 font-black text-[#080a07] shadow-[0_10px_35px_rgba(0,170,19,.18)] transition hover:-translate-y-1"
          >
            <span>Pilih Setelan</span><span>↗</span>
          </a>
        </article>
      </div>
    </>
  );
}
