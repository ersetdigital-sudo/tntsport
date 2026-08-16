import Image from "next/image";
import dynamic from "next/dynamic";
import type { ReactElement } from "react";
import { Archivo_Black, DM_Sans } from "next/font/google";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import { CategoryDesignGrid, type GridProduct } from "@/components/category-landing/CategoryDesignGrid";
import { PurchaseNotifications } from "@/components/category-landing/PurchaseNotifications";
import { buildWhatsAppLink } from "@/lib/wa";
import type { CategoryLandingConfig, LandingTestimonial } from "@/lib/category-landing";

const PageViewTracker = dynamic(() => import("@/components/PageViewTracker").then(m => m.PageViewTracker));
const ViewContentTracker = dynamic(() => import("@/components/ViewContentTracker").then(m => m.ViewContentTracker));

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ab",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

/**
 * Palet kategori: deep navy + satu aksen oranye.
 * Sengaja hanya satu warna aksen — biar tidak bersaing dengan foto produk.
 * Base navy membedakan dari promo-bulan-ini (hitam + merah).
 */
const C = {
  bg: "#0b1020",        // deep navy
  bgCard: "#121826",    // kartu gelap
  light: "#f6f6f4",     // section terang netral
  lightCard: "#eeefec", // kartu terang
  orange: "#f97316",
  orangeHi: "#fb923c",
  orangeDeep: "#c2410c",
  muted: "#aab3c7",     // teks sekunder di gelap (cool gray)
};

const FEATURE_ICONS: Record<string, ReactElement> = {
  single: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 7.3 12 3 3.5 7.3v9.4L12 21l8.5-4.3V7.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3.5 7.3 12 11.6l8.5-4.3M12 11.6V21" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="7.3" r="1.1" fill="currentColor" />
    </svg>
  ),
  print: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="14" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  design: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 19 7-7-4-4-7 7-1.5 5.5L12 19Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 8.5 12 5.5 5.5 12a3.5 3.5 0 0 0-1 2.4L4 20l5.6-.5a3.5 3.5 0 0 0 2.4-1L18 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  fast: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  sewing: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20 20 4M4 20h6l-2-4h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
};

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5 text-amber-500" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2.5 15 9l7 .8-5.2 4.7 1.5 6.9L12 17.8 5.7 21.4l1.5-6.9L2 9.8 9 9l3-6.5Z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
        dark ? "bg-white/10 text-zinc-300" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l2.4 2.4h3.2v3.2L20 10l-2.4 2.4v3.2h-3.2L12 18l-2.4-2.4H6.4v-3.2L4 10l2.4-2.4V4.4h3.2L12 2Z" fill="currentColor" />
        <path d="m8.5 10 2.5 2.5 4.5-4.5" stroke={dark ? "#0b1020" : "#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified Buyer
    </span>
  );
}

/** Akhir pekan ini (Minggu) sebagai deadline promo, format Indonesia. */
function weekendDeadline(): string {
  const now = new Date();
  const day = now.getDay();
  now.setDate(now.getDate() + (day === 0 ? 0 : 7 - day));
  return new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long" }).format(now);
}

interface Props {
  config: CategoryLandingConfig;
  products: GridProduct[];
  testimonials: LandingTestimonial[];
  heroImage: string;
  waNumber: string;
  logoPath: string;
}

export function CategoryLanding({ config, products, testimonials, heroImage, waNumber, logoPath }: Props) {
  const wa = (msg: string) => buildWhatsAppLink(waNumber, msg);
  const waOrder = wa(config.wa.order);
  const waPromo = wa(config.wa.promo);
  const waClosing = wa(config.wa.closing);
  const deadline = weekendDeadline();

  return (
    <div
      className={`${archivoBlack.variable} ${dmSans.variable} overflow-x-hidden bg-[#0b1020] text-white antialiased selection:bg-[#f97316] selection:text-white`}
      style={{ fontFamily: "var(--font-dm)" }}
    >
      <style>{`
        .pdisplay { font-family: var(--font-ab); letter-spacing:-.045em; }
        .tnt-hero__glow { position:absolute; right:-8%; top:40%; width:55vw; height:55vw; max-width:820px; max-height:820px; transform:translateY(-50%); background:radial-gradient(circle,rgba(249,115,22,.22) 0%,transparent 60%); filter:blur(34px); opacity:.6; mix-blend-mode:screen; }
        .tnt-hero__stripes { position:absolute; inset:0; background-image:repeating-linear-gradient(115deg,rgba(255,255,255,.024) 0px,rgba(255,255,255,.024) 1px,transparent 1px,transparent 13px); opacity:.8; }
        .tnt-hero__ghost { position:absolute; left:2vw; bottom:-8vh; z-index:1; font-family:var(--font-ab); font-style:italic; font-weight:800; font-size:clamp(18rem,34vw,40rem); line-height:.78; letter-spacing:-.04em; color:transparent; -webkit-text-stroke:2px rgba(255,255,255,.08); pointer-events:none; user-select:none; }
        .tnt-title__underline { position:absolute; left:0; bottom:-.12em; width:100%; height:.07em; min-height:5px; border-radius:999px; background:linear-gradient(90deg,${C.orange} 0%,${C.orangeHi} 100%); }
        .tnt-check { width:15px; height:15px; flex:none; border-radius:50%; background:${C.orange}; position:relative; }
        .tnt-check::after { content:""; position:absolute; left:4.5px; top:2.5px; width:4px; height:7px; border:solid #fff; border-width:0 2px 2px 0; transform:rotate(43deg); }
        .tnt-dot { width:7px; height:7px; border-radius:50%; background:#fff; animation:tnt-ping-w 1.9s ease-out infinite; }
        @keyframes tnt-ping-w { 0% { box-shadow:0 0 0 0 rgba(255,255,255,.55); } 70% { box-shadow:0 0 0 9px rgba(255,255,255,0); } 100% { box-shadow:0 0 0 0 rgba(255,255,255,0); } }
        .tnt-hero__scrim { position:absolute; inset:0; background:linear-gradient(90deg,${C.bg} 0%,${C.bg} 30%,rgba(11,16,32,.96) 42%,rgba(11,16,32,.72) 54%,rgba(11,16,32,.28) 70%,rgba(11,16,32,.10) 88%,rgba(11,16,32,.55) 100%),linear-gradient(180deg,rgba(11,16,32,.70) 0%,transparent 26%,transparent 62%,rgba(11,16,32,.85) 100%); }
        @media (max-width:1024px) { .tnt-hero__scrim { background:linear-gradient(90deg,${C.bg} 0%,rgba(11,16,32,.95) 38%,rgba(11,16,32,.62) 60%,rgba(11,16,32,.30) 100%),linear-gradient(180deg,rgba(11,16,32,.6) 0%,transparent 30%,rgba(11,16,32,.8) 100%); } }
        @media (max-width:760px) { .tnt-hero__scrim { background:linear-gradient(180deg,rgba(11,16,32,.45) 0%,rgba(11,16,32,.20) 22%,rgba(11,16,32,.86) 38%,${C.bg} 48%,${C.bg} 100%); } .tnt-hero__glow { top:26%; right:-20%; opacity:.4; } .tnt-hero__ghost { font-size:16rem; right:-1rem; bottom:2vh; opacity:.7; } }
        .cl-cta { background:linear-gradient(135deg,${C.orangeHi} 0%,${C.orange} 45%,${C.orangeDeep} 100%); box-shadow:0 14px 38px -12px rgba(249,115,22,.55),inset 0 1px 0 rgba(255,255,255,.25); }
        .cl-cta:hover { transform:translateY(-2px); box-shadow:0 20px 46px -12px rgba(249,115,22,.7),inset 0 1px 0 rgba(255,255,255,.3); }
        .cl-ticker { animation:cl-ticker-scroll 26s linear infinite; will-change:transform; }
        @keyframes cl-ticker-scroll { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
        .faq[open] .faq-plus { transform:rotate(45deg); }
        .faq-plus { transition:transform .25s ease; }
        @media (prefers-reduced-motion: reduce) {
          .cl-ticker { animation:none; }
          .tnt-dot { animation:none; }
          .cl-cta, .cl-cta:hover { transform:none; }
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1020]/90 backdrop-blur-xl" />

      <main>
        <PageViewTracker page={config.slug} />
        <ViewContentTracker contentName={config.eyebrow} contentCategory="Category Landing" />
        <PurchaseNotifications pops={config.purchasePops} />

        {/* ================= HERO ================= */}
        <section id="home" className="relative min-h-[880px] overflow-hidden bg-[#0b1020] text-white lg:min-h-[820px]">
          <div className="absolute inset-0 z-0">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[460px] lg:left-[40%] lg:right-0 lg:top-0 lg:h-full lg:w-[60%]">
              <Image
                src={heroImage}
                alt={`${config.eyebrow} — TNT SPORT APPAREL`}
                fill
                priority
                sizes="100vw"
                className="object-cover object-top lg:object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-transparent to-transparent lg:hidden" />
            </div>
            <div className="tnt-hero__scrim" />
            <div className="tnt-hero__glow" />
            <div className="tnt-hero__stripes" />
          </div>

          <div className="tnt-hero__ghost" aria-hidden="true">{config.ghostText}</div>

          <div className="relative z-20 mx-auto flex min-h-[880px] max-w-7xl items-center px-5 pb-[420px] pt-16 lg:min-h-[820px] lg:px-8 lg:pb-28 lg:pt-12">
            <div className="max-w-[640px] pt-4 lg:pt-0">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#f97316] px-4 py-2 text-[11px] font-bold uppercase tracking-[.14em] text-white shadow-[0_6px_26px_-8px_rgba(249,115,22,.55)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 7.5v4.2l3 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                {config.eyebrow}
              </div>

              {/* Headline */}
              <h1 className="pdisplay mt-6 uppercase leading-[.9] tracking-[-.015em] text-white sm:mt-8">
                {config.headline.map((line, i) => (
                  <span
                    key={line}
                    className={`block text-[clamp(2.6rem,6.4vw,5.4rem)] ${
                      i === config.headline.length - 1
                        ? "relative mt-[.06em] inline-block bg-gradient-to-r from-[#fb923c] via-[#f97316] to-[#ea580c] bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {line}
                    {i === config.headline.length - 1 && <span className="tnt-title__underline" aria-hidden="true" />}
                  </span>
                ))}
              </h1>

              {/* Subheadline */}
              <p className="mt-6 max-w-[32rem] text-[clamp(.98rem,1.15vw,1.08rem)] leading-[1.65] text-[#aab3c7] sm:mt-8">
                {config.subheadline}
              </p>

              {/* CTA */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:mt-9">
                <WhatsAppLeadLink
                  href={waOrder}
                  label={`Order — ${config.eyebrow}`}
                  className="cl-cta inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[.06em] text-white transition"
                >
                  Order Jersey Sekarang
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </WhatsAppLeadLink>
                <a
                  href="#desain"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/[.04] px-8 py-4 text-sm font-bold uppercase tracking-[.06em] text-white backdrop-blur transition hover:border-white/45 hover:bg-white/[.1] hover:-translate-y-0.5"
                >
                  Lihat Katalog Desain
                </a>
              </div>

              {/* Trust bar */}
              <ul className="mt-7 flex max-w-[36rem] flex-wrap gap-x-2 gap-y-2.5">
                {config.trustBar.map((t) => (
                  <li
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3.5 py-[11px] text-[12px] font-semibold tracking-[.02em] text-zinc-200"
                  >
                    <span className="tnt-check" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ticker */}
          <div className="absolute bottom-0 left-0 z-10 w-full overflow-hidden border-y border-black/25 bg-[#f97316] py-3 text-white">
            <div className="cl-ticker flex w-max whitespace-nowrap text-[10px] font-black uppercase tracking-[.18em] sm:text-xs">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="pr-8">{config.ticker}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PROBLEM → SOLUSI ================= */}
        <section id="keunggulan" className="bg-[#f6f6f4] py-24 text-[#101528] sm:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid items-end gap-8 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <span className="text-xs font-black uppercase tracking-[.25em] text-[#c2410c]">Kenapa pilih kami?</span>
                <h2 className="pdisplay mt-4 text-4xl uppercase leading-[.95] sm:text-6xl">
                  {config.problem.headline}
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 lg:justify-self-end">
                {config.problem.body}
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {config.problem.features.map((f, i) => (
                <article
                  key={f.title}
                  className="relative overflow-hidden rounded-[1.6rem] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#f97316]/50 hover:shadow-xl sm:p-8"
                >
                  <span className="pdisplay absolute -right-2 -top-6 text-[7rem] leading-none text-black/[.05]" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#fb923c] to-[#ea580c] text-white">
                    {FEATURE_ICONS[f.icon] ?? FEATURE_ICONS.design}
                  </div>
                  <h3 className="mt-6 text-lg font-black uppercase leading-snug">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PILIHAN ORDER + DESAIN ================= */}
        <section id="desain" className="relative overflow-hidden bg-[#0b1020] py-24 sm:py-32">
          <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-[#f97316]/15 blur-[100px]" />
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {/* Pilihan order cards */}
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-black uppercase tracking-[.25em] text-[#fb923c]">
                  {config.catalog.orderLabel} — Jersey Futsal &amp; Sepak Bola
                </span>
                <h2 className="pdisplay mt-4 max-w-3xl text-4xl uppercase leading-[.95] sm:text-6xl">
                  {config.catalog.orderHeadline}
                </h2>
              </div>
              <p className="max-w-sm text-[#aab3c7]">{config.catalog.orderSub}</p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {config.catalog.orderCards.map((card, idx) => {
                const isTeam = idx === 0;
                return (
                  <article
                    key={card.title}
                    className={`relative overflow-hidden rounded-[1.8rem] border p-7 sm:p-9 ${
                      isTeam
                        ? "border-[#f97316]/40 bg-gradient-to-b from-[#f97316]/[.1] to-transparent"
                        : "border-white/10 bg-white/[.03]"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] ${
                        isTeam ? "bg-[#f97316] text-white" : "bg-white/10 text-white"
                      }`}
                    >
                      {isTeam ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M8 19V7l12-2v12M8 19a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12-2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                          <path d="M4 21c.8-3.5 4-5.5 8-5.5s7.2 2 8 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {card.badge}
                    </span>
                    <h3 className="pdisplay mt-5 text-2xl uppercase leading-tight text-white sm:text-3xl">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#aab3c7]">{card.desc}</p>
                    <ul className="mt-5 space-y-3 text-sm text-zinc-200">
                      {card.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <span className="tnt-check mt-0.5" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {card.footnote && (
                      <p className="mt-5 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-xs leading-relaxed text-[#8e97ad]">
                        {card.footnote}
                      </p>
                    )}
                    {card.ctaAnchor ? (
                      <a
                        href={card.ctaAnchor}
                        className="mt-7 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#f97316] bg-transparent px-7 py-3.5 text-sm font-black uppercase tracking-wider text-[#fb923c] transition hover:-translate-y-0.5 hover:bg-[#f97316] hover:text-white"
                      >
                        {card.cta}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ) : (
                      <WhatsAppLeadLink
                        href={waOrder}
                        label={`${card.cta} — ${config.eyebrow}`}
                        className="cl-cta mt-7 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-wider text-white transition"
                      >
                        {card.cta}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </WhatsAppLeadLink>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Catatan clarity */}
            <div className="mt-6 flex items-start gap-3.5 rounded-2xl border border-[#f97316]/25 bg-[#f97316]/[.07] p-5 sm:items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-none text-[#fb923c] sm:mt-0" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0-3.5 10.9c.7.5 1 1.3 1 2.1h5c0-.8.3-1.6 1-2.1A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M10 19h4M10.5 21.5h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <p className="text-sm leading-relaxed text-zinc-300">{config.catalog.orderNote}</p>
            </div>

            {/* Designs grid */}
            <div className="mt-24">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <span className="text-xs font-black uppercase tracking-[.25em] text-[#fb923c]">Galeri desain</span>
                  <h2 className="pdisplay mt-4 max-w-3xl text-4xl uppercase leading-[.95] sm:text-6xl">
                    {config.catalog.designsHeadline}
                  </h2>
                </div>
                <p className="max-w-sm text-[#aab3c7]">{config.catalog.designsSub}</p>
              </div>
              <CategoryDesignGrid products={products} waNumber={waNumber} waMessageTemplate={config.wa.designTemplate} />
            </div>
          </div>
        </section>

        {/* ================= CARA ORDER ================= */}
        <section id="cara-order" className="bg-[#f6f6f4] py-24 text-black sm:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-[.25em] text-[#c2410c]">Cara order</span>
              <h2 className="pdisplay mt-4 text-4xl uppercase sm:text-6xl">{config.steps.headline}</h2>
              <p className="mt-4 text-zinc-600">{config.steps.sub}</p>
            </div>
            <div className="relative mt-16 grid gap-4 md:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-8 hidden border-t border-dashed border-black/20 md:block" />
              {config.steps.items.map((s, i) => (
                <article key={s.title} className="relative rounded-2xl border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:border-[#f97316]/50 hover:shadow-lg">
                  <span className={`pdisplay grid h-12 w-12 place-items-center rounded-full text-xl text-white ${i === 0 ? "bg-[#f97316]" : "bg-[#121826]"}`}>
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-black uppercase">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TESTIMONI ================= */}
        <section className="bg-[#f6f6f4] pb-24 pt-4 text-black sm:pb-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-black uppercase tracking-[.25em] text-[#c2410c]">Ulasan pelanggan</span>
                <h2 className="pdisplay mt-4 text-4xl uppercase sm:text-6xl">{config.testimonials.headline}</h2>
              </div>
              <p className="text-zinc-600">{config.testimonials.sub}</p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 6).map((r, i) => (
                <figure
                  key={r.name + i}
                  className={`flex flex-col rounded-[1.5rem] p-6 ${i % 3 === 1 ? "bg-[#121826] text-white" : "bg-white"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <Stars />
                    <VerifiedBadge dark={i % 3 === 1} />
                  </div>
                  <blockquote className={`mt-5 flex-1 leading-relaxed ${i % 3 === 1 ? "text-zinc-300" : "text-zinc-700"}`}>
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className={`mt-7 flex items-center justify-between gap-3 border-t pt-5 ${i % 3 === 1 ? "border-white/10" : "border-black/10"}`}>
                    <div>
                      <b>— {r.name}</b>
                      <p className={`text-sm ${i % 3 === 1 ? "text-zinc-400" : "text-zinc-500"}`}>{r.team}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${i % 3 === 1 ? "text-zinc-400" : "text-zinc-500"}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
                        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                      {r.city}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ================= URGENCY / PROMO ================= */}
        <section className="relative overflow-hidden bg-[#f97316] py-20 text-white sm:py-24">
          <div className="pdisplay absolute -left-6 top-1/2 -translate-y-1/2 text-[16rem] leading-none text-white/[.08]" aria-hidden="true">
            %
          </div>
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_.7fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[.2em]">
                  <span className="tnt-dot" aria-hidden="true" />
                  Promo minggu ini
                </span>
                <h2 className="pdisplay mt-5 text-4xl uppercase leading-[.95] sm:text-6xl">
                  {config.urgency.headline}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
                  {config.urgency.body.replace("{deadline}", deadline)}
                </p>
              </div>
              <div className="lg:justify-self-end">
                <WhatsAppLeadLink
                  href={waPromo}
                  label={`Klaim Promo — ${config.eyebrow}`}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0b1020] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-black"
                >
                  {config.urgency.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </WhatsAppLeadLink>
                <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[.14em] text-white/80">
                  Berakhir {deadline}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq" className="bg-[#f6f6f4] py-24 text-black sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
            <div>
              <span className="text-xs font-black uppercase tracking-[.25em] text-[#c2410c]">FAQ</span>
              <h2 className="pdisplay mt-4 text-4xl uppercase leading-[.95] sm:text-6xl">Yang sering ditanyakan.</h2>
              <p className="mt-5 max-w-sm text-zinc-600">Jawaban singkat untuk membantu kamu pesan dengan lebih tenang.</p>
            </div>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {config.faqs.map((f, i) => (
                <details key={f.q} className="faq group py-6" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-black uppercase [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span className="faq-plus text-2xl font-light" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-4 pr-10 text-sm leading-relaxed text-zinc-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA PENUTUP ================= */}
        <section id="order" className="relative overflow-hidden bg-[#0b1020] py-24 sm:py-32">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f97316]/25 blur-[120px]" />
          <div className="relative mx-auto max-w-5xl px-5 text-center lg:px-8">
            <span className="text-xs font-black uppercase tracking-[.25em] text-[#fb923c]">Siap mulai?</span>
            <h2 className="pdisplay mt-5 text-[clamp(2.6rem,7vw,6rem)] uppercase leading-[.88]">
              {config.closing.headline}
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg text-[#aab3c7]">{config.closing.sub}</p>
            <WhatsAppLeadLink
              href={waClosing}
              label={`Order Sekarang — ${config.eyebrow}`}
              className="cl-cta mt-9 inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition"
            >
              {config.closing.cta}
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </WhatsAppLeadLink>
            <p className="mt-6 text-sm text-[#8e97ad]">
              Konsultasi gratis, tanpa syarat. Ceritakan jumlah pesanan &amp; referensi desainmu.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0b1020] py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-[#8e97ad] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <a href="#home" className="flex items-center gap-2.5 text-white" aria-label="TNT SPORT APPAREL">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoPath || "/logo.jpg"} alt="Logo TNT SPORT APPAREL" className="h-12 w-12 object-contain mix-blend-screen" />
            <span className="text-base font-black tracking-[.16em]">TNT SPORT APPAREL</span>
          </a>
          <p>{config.eyebrow} · Custom nama, nomor &amp; logo.</p>
          <p>© {new Date().getFullYear()} TNT SPORT APPAREL</p>
        </div>
      </footer>
    </div>
  );
}
