"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import type { LandingPriceCard } from "@/lib/category-landing";

interface Props {
  atasan: LandingPriceCard;
  setelan: LandingPriceCard;
  bulk: { headline: string; accent: string; sub: string; cta: string };
  waAtasan: string;
  waSetelan: string;
  /** WA template Setelan mode Ecer (fallback ke waSetelan) */
  waSetelanEcer?: string;
  /** WA template Setelan mode Lusin (fallback ke waSetelan) */
  waSetelanLusin?: string;
  waBulk: string;
  eyebrowAtasan: string;
  /** override label toggle Lusin (default: "Lusin · Hemat") */
  toggleLusinLabel?: string;
}

type Mode = "ecer" | "lusin";

/**
 * Section Harga dengan toggle Ecer/Lusin ala referensi:
 * pill gradien bergeser mengikuti tombol aktif, harga cross-fade.
 */
export function PriceSection({ atasan, setelan, bulk, waAtasan, waSetelan, waSetelanEcer, waSetelanLusin, waBulk, eyebrowAtasan, toggleLusinLabel = "Lusin · Hemat" }: Props) {
  const [mode, setMode] = useState<Mode>("ecer");

  const wrapRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<Record<Mode, HTMLButtonElement | null>>({ ecer: null, lusin: null });

  const movePill = (key: Mode) => {
    const wrap = wrapRef.current;
    const pill = pillRef.current;
    const btn = btnRefs.current[key];
    if (!wrap || !pill || !btn) return;
    const wr = wrap.getBoundingClientRect();
    const r = btn.getBoundingClientRect();
    pill.style.width = `${r.width}px`;
    pill.style.transform = `translateX(${r.left - wr.left - 6}px)`;
  };

  useEffect(() => {
    movePill(mode);
    const onResize = () => movePill(mode);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const cards: { card: LandingPriceCard; wa: string; label: string }[] = [
    { card: atasan, wa: waAtasan, label: `${eyebrowAtasan} — Atasan` },
    {
      card: setelan,
      wa: mode === "ecer" ? (waSetelanEcer ?? waSetelan) : (waSetelanLusin ?? waSetelan),
      label: `${eyebrowAtasan} — Setelan`,
    },
  ];

  return (
    <>
      {/* Toggle Ecer / Lusin */}
      <div className="mt-8 flex justify-center reveal">
        <div
          ref={wrapRef}
          role="tablist"
          aria-label="Pilih jumlah pembelian"
          className="qty-toggle relative inline-flex items-center rounded-full p-1.5 gap-1"
        >
          <span ref={pillRef} className="qty-pill" aria-hidden="true" />
          {(["ecer", "lusin"] as const).map((key) => (
            <button
              key={key}
              ref={(el) => { btnRefs.current[key] = el; }}
              role="tab"
              aria-selected={mode === key}
              onClick={() => { setMode(key); movePill(key); }}
              className={`qty-btn cursor-pointer ${mode === key ? "is-active" : ""}`}
            >
              {key === "ecer" ? "Ecer" : toggleLusinLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Kartu harga */}
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {cards.map(({ card, wa, label }) => (
          <article
            key={card.name}
            className={`price-card card rounded-3xl p-7 sm:p-8 flex flex-col relative reveal ${card.highlighted ? "price-card-hl" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className={`kicker text-[11px] pt-1 ${card.highlighted ? "text-[#ff9d2e]" : "text-[#9aa1ad]"}`}>
                {card.kicker}
              </p>
              {card.highlighted ? (
                <span className="btn-fire rounded-full px-3 py-1 text-[10px] font-bold text-white tracking-wide whitespace-nowrap">
                  {card.badge}
                </span>
              ) : (
                <span className="rounded-full px-3 py-1 text-[10px] font-bold tracking-wide border border-white/15 text-white/70">
                  {card.badge}
                </span>
              )}
            </div>

            <h3 className="display text-4xl mt-4">{card.name}</h3>

            <div className="mt-6 flex items-end gap-1.5">
              <span className={`display text-2xl pb-2 ${card.highlighted ? "text-[#ff9d2e]" : "text-[#9aa1ad]"}`}>Rp</span>
              <span key={mode} className={`display text-6xl sm:text-7xl leading-none price-fade ${card.highlighted ? "fire-text" : ""}`}>
                {card.prices[mode]}
              </span>
              <span className="text-[#9aa1ad] pb-2.5 text-lg">{card.unit}</span>
            </div>
            <p key={mode + "note"} className="mt-2.5 text-sm text-[#9aa1ad] price-fade">
              {card.notes[mode]}
            </p>
            {card.footnote?.[mode] && (
              <p key={mode + "footnote"} className="mt-2 text-xs italic text-white/40 price-fade">
                {card.footnote[mode]}
              </p>
            )}

            <ul className="mt-7 pt-6 border-t border-white/10 space-y-3 text-[15px] flex-1">
              {(card.pointsByMode?.[mode] ?? card.points).map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-[#ff6b00]" aria-hidden="true">✓</span>
                  <span className="text-white/80">{p}</span>
                </li>
              ))}
            </ul>

            <div className="card-cta">
              <WhatsAppLeadLink
                href={wa}
                label={label}
                className={
                  card.highlighted
                    ? "btn-fire rounded-full pl-6 pr-3 py-3.5 font-bold text-white flex items-center justify-between gap-3 cursor-pointer"
                    : "btn-ghost rounded-full pl-6 pr-3 py-3.5 font-semibold text-white flex items-center justify-between gap-3 cursor-pointer"
                }
              >
                <span>{card.cta}</span>
                <span className="w-8 h-8 rounded-full grid place-items-center bg-white/10 text-sm shrink-0" aria-hidden="true">↗</span>
              </WhatsAppLeadLink>
            </div>
          </article>
        ))}
      </div>

      {/* Bulk strip */}
      <div
        className="mt-5 card rounded-3xl px-7 py-7 sm:px-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5 reveal"
        style={{ borderColor: "rgba(255,107,0,.28)" }}
      >
        <div>
          <h3 className="display text-3xl sm:text-4xl">
            {bulk.headline}
            <span className="fire-text">{bulk.accent}</span>
          </h3>
          <p className="mt-2 text-[#9aa1ad] text-sm sm:text-base">{bulk.sub}</p>
        </div>
        <WhatsAppLeadLink
          href={waBulk}
          label="Minta Harga Khusus"
          className="btn-fire rounded-full px-6 py-3.5 font-bold text-white text-center whitespace-nowrap shrink-0 cursor-pointer"
        >
          {bulk.cta}
        </WhatsAppLeadLink>
      </div>
    </>
  );
}
