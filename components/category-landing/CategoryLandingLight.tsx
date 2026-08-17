"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Archivo, Saira_Condensed } from "next/font/google";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import { ScrollReveal } from "@/components/category-landing/ScrollReveal";
import { PurchaseNotifications } from "@/components/category-landing/PurchaseNotifications";
import type { CategoryLandingConfig, LandingTestimonial, LandingPriceCard } from "@/lib/category-landing";
import type { GridProduct } from "@/components/category-landing/CategoryDesignGrid";
import { buildWhatsAppLink } from "@/lib/wa";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const sairaCondensed = Saira_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sc",
  display: "swap",
});

const STYLES = `
  :root{
    --paper:#ffffff;--paper-2:#f4f7fb;--paper-3:#eaf0f8;
    --line:#dbe4f0;--ink:#0d1b2a;--ink-soft:#31465e;--muted:#647c99;
    --blue:#0a68e0;--blue-2:#2f8fff;--blue-deep:#064aa8;--sky:#e4f0ff;
  }
  .lt-body{background:var(--paper);color:var(--ink);font-family:var(--font-archivo),system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .display{font-family:var(--font-sc),"Saira Condensed",system-ui,sans-serif;font-weight:800;letter-spacing:-.005em;line-height:.96;text-transform:uppercase;}
  .kicker{font-family:var(--font-sc),"Saira Condensed",sans-serif;font-weight:700;letter-spacing:.2em;text-transform:uppercase;}
  .blue-text{background:linear-gradient(100deg,var(--blue-2),var(--blue) 55%,var(--blue-deep));-webkit-background-clip:text;background-clip:text;color:transparent;}
  .btn-blue{background:linear-gradient(100deg,var(--blue-2),var(--blue) 60%,var(--blue-deep));box-shadow:0 10px 28px -10px rgba(10,104,224,.6),inset 0 1px 0 rgba(255,255,255,.35);transition:transform .18s ease,box-shadow .18s ease,filter .18s ease;}
  .btn-blue:hover{transform:translateY(-2px);box-shadow:0 18px 38px -12px rgba(10,104,224,.72),inset 0 1px 0 rgba(255,255,255,.45);filter:saturate(1.06);}
  .btn-outline{border:1.5px solid var(--line);background:#fff;color:var(--ink);transition:border-color .18s ease,background .18s ease,color .18s ease;}
  .btn-outline:hover{border-color:var(--blue);background:var(--sky);color:var(--blue-deep);}
  .card{background:#fff;border:1px solid var(--line);box-shadow:0 1px 2px rgba(13,27,42,.04),0 12px 28px -22px rgba(13,27,42,.28);}
  .card-hl{border-color:rgba(10,104,224,.4);box-shadow:0 0 0 1px rgba(10,104,224,.09),0 26px 50px -28px rgba(10,104,224,.45);}
  .price-card{background:linear-gradient(180deg,#fff,var(--paper-2));}
  .price-card-hl{background:linear-gradient(165deg,rgba(47,143,255,.14),rgba(10,104,224,.05) 45%,#fff 85%);border-color:rgba(10,104,224,.42);box-shadow:0 0 0 1px rgba(10,104,224,.1),0 34px 64px -34px rgba(10,104,224,.5);}
  .qty-toggle{background:#fff;border:1px solid var(--line);box-shadow:0 8px 22px -18px rgba(13,27,42,.35);}
  .qty-btn{position:relative;z-index:1;border-radius:9999px;padding:.6rem 1.4rem;font-family:var(--font-sc),"Saira Condensed",sans-serif;font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:.78rem;color:var(--muted);transition:color .25s ease;white-space:nowrap;cursor:pointer;background:none;border:none;}
  .qty-btn.is-active{color:#fff;}
  .qty-pill{position:absolute;z-index:0;top:.375rem;bottom:.375rem;left:.375rem;border-radius:9999px;background:linear-gradient(100deg,var(--blue-2),var(--blue-deep));box-shadow:0 6px 18px -6px rgba(10,104,224,.75);transition:transform .32s cubic-bezier(.4,.9,.3,1),width .32s cubic-bezier(.4,.9,.3,1);}

  .net-bg{background-image:linear-gradient(rgba(10,104,224,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(10,104,224,.08) 1px,transparent 1px);background-size:22px 22px;}
  .stripe-bg{background:repeating-linear-gradient(115deg,rgba(10,104,224,.1) 0 2px,transparent 2px 16px);}

  .hero-photo{
    mask-image:linear-gradient(to right,transparent 0%,#000 20%,#000 100%);
    -webkit-mask-image:linear-gradient(to right,transparent 0%,#000 20%,#000 100%);
  }
  @media(max-width:1023px){
    .hero-photo{
      mask-image:linear-gradient(to bottom,transparent 0%,#000 18%,#000 84%,transparent 100%);
      -webkit-mask-image:linear-gradient(to bottom,transparent 0%,#000 18%,#000 84%,transparent 100%);
    }
  }

  .gal-wrap{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);}
  .gal-track{display:flex;gap:1rem;width:max-content;animation:galslide 42s linear infinite;}
  .gal-wrap:hover .gal-track{animation-play-state:paused;}
  .gal-item{flex:0 0 auto;width:min(13.5rem,70vw);}
  .gal-item img{width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:1rem;border:1px solid var(--line);display:block;}
  @keyframes galslide{to{transform:translateX(calc(-50% - .5rem));}}
  @media (min-width:640px){.gal-item{width:17rem;}}

  .cat-item{position:relative;overflow:hidden;border-radius:1rem;background:#fff;border:1px solid var(--line);}
  .cat-item img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;transition:transform .4s ease;}
  .cat-item:hover img{transform:scale(1.05);}
  .cat-name{position:absolute;inset-inline:0;bottom:0;padding:.75rem .75rem .7rem;background:linear-gradient(transparent,rgba(255,255,255,.95) 55%);font-family:var(--font-archivo),"Archivo",sans-serif;font-weight:600;letter-spacing:.01em;font-size:.82rem;line-height:1.2;color:var(--ink);}

  .faq[open] .faq-ico{transform:rotate(45deg);}
  .faq-ico{transition:transform .22s ease;}
  .faq summary::-webkit-details-marker{display:none;}

  .marquee{display:flex;gap:2.5rem;width:max-content;animation:mslide 26s linear infinite;}
  @keyframes mslide{to{transform:translateX(-50%);}}

  .price-fade{animation:pfade .35s ease;}
  @keyframes pfade{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}

  .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);}
  .reveal.in{opacity:1;transform:none;}

  .pop-wrap{transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .45s ease;}
  .pop-hide{transform:translateY(140%);opacity:0;pointer-events:none;}

  @media (prefers-reduced-motion:reduce){
    .marquee,.gal-track{animation:none;}
    .reveal{opacity:1;transform:none;transition:none;}
    html{scroll-behavior:auto;}
  }
`;

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  single: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 7.3 12 3 3.5 7.3v9.4L12 21l8.5-4.3V7.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M3.5 7.3 12 11.6l8.5-4.3M12 11.6V21" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="7.3" r="1.1" fill="currentColor" /></svg>,
  print: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><rect x="7" y="14" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" /></svg>,
  design: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 19 7-7-4-4-7 7-1.5 5.5L12 19Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M15 8.5 12 5.5 5.5 12a3.5 3.5 0 0 0-1 2.4L4 20l5.6-.5a3.5 3.5 0 0 0 2.4-1L18 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  fast: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>,
  sewing: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20 20 4M4 20h6l-2-4h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="17" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.8" /></svg>,
};

function weekendDeadline(): string {
  const now = new Date();
  const day = now.getDay();
  now.setDate(now.getDate() + (day === 0 ? 0 : 7 - day));
  return new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long" }).format(now);
}

/* ─── Price Section ─── */
function PriceSection({ atasan, setelan, bulk, waAtasan, waSetelan, waBulk, eyebrowAtasan }: {
  atasan: LandingPriceCard; setelan: LandingPriceCard;
  bulk: { headline: string; accent: string; sub: string; cta: string };
  waAtasan: string; waSetelan: string; waBulk: string; eyebrowAtasan: string;
}) {
  const [mode, setMode] = useState<"ecer" | "lusin">("ecer");
  const wrapRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const movePill = (key: string) => {
    const wrap = wrapRef.current, pill = pillRef.current, btn = btnRefs.current[key];
    if (!wrap || !pill || !btn) return;
    const wr = wrap.getBoundingClientRect(), r = btn.getBoundingClientRect();
    pill.style.width = `${r.width}px`;
    pill.style.transform = `translateX(${r.left - wr.left - 6}px)`;
  };

  useEffect(() => {
    movePill(mode);
    const onResize = () => movePill(mode);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mode]);

  const cards: { card: LandingPriceCard; wa: string; label: string }[] = [
    { card: atasan, wa: waAtasan, label: `${eyebrowAtasan} — Atasan` },
    { card: setelan, wa: waSetelan, label: `${eyebrowAtasan} — Setelan` },
  ];

  return (
    <>
      <div className="mt-8 flex justify-center reveal">
        <div ref={wrapRef} role="tablist" aria-label="Pilih jumlah pembelian" className="qty-toggle relative inline-flex items-center rounded-full p-1.5 gap-1">
          <span ref={pillRef} className="qty-pill" aria-hidden="true" />
          {(["ecer", "lusin"] as const).map((key) => (
            <button key={key} ref={(el) => { btnRefs.current[key] = el; }} role="tab" aria-selected={mode === key} onClick={() => setMode(key)} className={`qty-btn ${mode === key ? "is-active" : ""}`}>
              {key === "ecer" ? "Ecer" : "Lusin · Hemat"}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {cards.map(({ card, wa, label }) => (
          <article key={card.name} className={`price-card card rounded-3xl p-7 sm:p-8 flex flex-col relative reveal ${card.highlighted ? "price-card-hl" : ""}`}>
            <div className="flex items-start justify-between gap-3">
              <p className={`kicker text-[11px] pt-1 ${card.highlighted ? "blue-text" : ""}`} style={{ color: card.highlighted ? undefined : "var(--muted)" }}>{card.kicker}</p>
              {card.highlighted ? (
                <span className="btn-blue rounded-full px-3 py-1 text-[10px] font-bold text-white tracking-wide whitespace-nowrap">{card.badge}</span>
              ) : (
                <span className="rounded-full px-3 py-1 text-[10px] font-bold tracking-wide border" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>{card.badge}</span>
              )}
            </div>
            <h3 className="display text-4xl mt-4" style={{ color: "var(--ink)" }}>{card.name}</h3>
            <div className="mt-6 flex items-end gap-1.5">
              <span className="display text-2xl pb-2" style={{ color: card.highlighted ? "var(--blue)" : "var(--muted)" }}>Rp</span>
              <span key={mode} className={`display text-6xl sm:text-7xl leading-none price-fade ${card.highlighted ? "blue-text" : ""}`} style={{ color: card.highlighted ? undefined : "var(--ink)" }}>{card.prices[mode]}</span>
              <span className="pb-2.5 text-lg" style={{ color: "var(--muted)" }}>{card.unit}</span>
            </div>
            <p key={mode + "note"} className="mt-2.5 text-sm price-fade" style={{ color: "var(--muted)" }}>{card.notes[mode]}</p>
            <ul className="mt-7 pt-6 border-t space-y-3 text-[15px] flex-1" style={{ borderColor: "var(--line)" }}>
              {card.points.map((p) => (
                <li key={p} className="flex gap-3"><span style={{ color: "var(--blue)" }}>✓</span><span style={{ color: "var(--ink-soft)" }}>{p}</span></li>
              ))}
            </ul>
            <div className="mt-auto pt-7">
              <WhatsAppLeadLink href={wa} label={label} className={card.highlighted ? "btn-blue rounded-full pl-6 pr-3 py-3.5 font-bold text-white flex items-center justify-between gap-3" : "btn-outline rounded-full pl-6 pr-3 py-3.5 font-semibold flex items-center justify-between gap-3"}>
                <span>{card.cta}</span>
                <span className="w-8 h-8 rounded-full grid place-items-center text-sm shrink-0" style={{ background: card.highlighted ? "rgba(255,255,255,.22)" : "var(--sky)", color: card.highlighted ? undefined : "var(--blue-deep)" }}>↗</span>
              </WhatsAppLeadLink>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-5 card rounded-3xl px-5 py-5 sm:px-9 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 reveal" style={{ borderColor: "rgba(10,104,224,.3)" }}>
        <div>
          <h3 className="display text-2xl sm:text-4xl">{bulk.headline}<span className="blue-text">{bulk.accent}</span></h3>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--muted)" }}>{bulk.sub}</p>
        </div>
        <WhatsAppLeadLink href={waBulk} label="Minta Harga Khusus" className="btn-blue rounded-full px-6 py-3.5 font-bold text-white text-center whitespace-nowrap shrink-0">{bulk.cta}</WhatsAppLeadLink>
      </div>
    </>
  );
}

/* ─── Testimonial Carousel ─── */
function TestimonialCarousel({ items }: { items: LandingTestimonial[] }) {
  if (!items.length) return null;
  return (
    <div className="card rounded-3xl py-8 reveal" role="region" aria-label="Testimoni pelanggan" style={{ overflow: "hidden" }}>
      <div className="t-track" style={{ display: "flex", width: "max-content", paddingInline: "1.25rem" }}>
        {[...items, ...items].map((r, i) => (
          <figure key={i} className="card rounded-2xl p-5 sm:p-6 flex flex-col shrink-0" style={{ width: "min(21rem, 78vw)", marginRight: "1.25rem" }} aria-hidden={i >= items.length || undefined}>
            <span className="self-start rounded-full px-2.5 py-1 text-[11px] font-bold inline-flex items-center gap-1.5" style={{ background: "rgba(15,157,88,.1)", color: "#0f7a45", border: "1px solid rgba(15,157,88,.28)" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Verified Buyer
            </span>
            <div className="mt-3 tracking-wider" style={{ color: "#f5a524" }}>★★★★★</div>
            <blockquote className="mt-3 text-sm sm:text-[15px] leading-relaxed italic flex-1" style={{ color: "var(--ink-soft)" }}>&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 pt-4 border-t flex items-center gap-3" style={{ borderColor: "var(--line)" }}>
              {r.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.imageUrl} alt={r.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: "var(--blue)" }}>
                  {r.name.split(" ").map(n => n[0]).join("")}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: "var(--ink)" }}>— {r.name}, {r.team}</p>
                <p className="text-xs sm:text-sm mt-0.5 flex items-center gap-1" style={{ color: "var(--muted)" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0"><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" /></svg>
                  <span className="truncate">{r.city}</span>
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ─── Gallery Marquee ─── */
function GalleryMarquee({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active]);
  return (
    <>
      <div className="gal-wrap mt-7">
        <div className="gal-track">
          {Array.from({ length: 2 }).map((_, dup) =>
            images.map((g, i) => (
              <button key={`${dup}-${i}`} type="button" onClick={() => dup === 0 && setActive(i)} aria-hidden={dup === 1 || undefined} className="gal-item block cursor-pointer p-0 text-left">
                <img src={g.src} alt={dup === 1 ? "" : g.alt} loading="lazy" />
              </button>
            ))
          )}
        </div>
      </div>
      {active !== null && images[active] && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <div className="relative my-auto max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setActive(null)} aria-label="Tutup foto" className="absolute -top-2 -right-2 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-white shadow-lg transition" style={{ background: "var(--blue)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
            </button>
            <img src={images[active].src} alt={images[active].alt} className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl" />
            <p className="mt-3 text-center text-sm text-white/60">{images[active].alt}</p>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Design Grid ─── */
function DesignGrid({ products, waNumber, waMessageTemplate }: { products: GridProduct[]; waNumber: string; waMessageTemplate: string }) {
  const [active, setActive] = useState<GridProduct | null>(null);
  if (!products.length) return null;
  return (
    <>
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((p) => (
          <button key={p.id} type="button" onClick={() => setActive(p)} className="cat-item group cursor-pointer text-left">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image src={p.image} alt={p.alt} fill loading="lazy" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105" />
            </div>
            <p className="cat-name">{p.catalogue}</p>
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <div className="relative w-full sm:w-[92vw] sm:max-w-[500px] rounded-t-2xl sm:rounded-2xl shadow-2xl" style={{ background: "var(--paper-2)" }} onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setActive(null)} className="absolute right-3 top-3 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-white transition" style={{ background: "rgba(0,0,0,.6)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
            </button>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl sm:rounded-t-2xl" style={{ background: "var(--paper-3)" }}>
              <Image src={active.image} alt={active.alt} fill sizes="(max-width: 500px) 100vw, 500px" className="object-contain" />
            </div>
            <div className="p-5 pb-8 sm:pb-5">
              <p className="kicker text-[10px]" style={{ color: "var(--muted)" }}>Kode desain</p>
              <h3 className="display text-2xl mt-1" style={{ color: "var(--ink)" }}>{active.catalogue}</h3>
              <WhatsAppLeadLink href={buildWhatsAppLink(waNumber, waMessageTemplate.replace("{design}", active.catalogue))} label={`Katalog ${active.catalogue}`} className="btn-blue mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.11c-.25.7-1.45 1.34-2 1.38-.51.05-.99.23-3.35-.7-2.85-1.12-4.64-4.05-4.78-4.24-.14-.19-1.13-1.51-1.13-2.88 0-1.37.72-2.05.97-2.33.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.62.48.23.55.79 1.92.86 2.06.07.14.11.3.02.49-.09.19-.46.74-.64.93-.13.14-.28.3-.12.58.16.28.71 1.17 1.52 1.89 1.04.93 1.74 1.22 2.02 1.36.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.25.09 1.62.76 1.9.9.28.14.46.21.53.32.07.12.07.68-.18 1.38Z" /></svg>
                Order Desain Ini
              </WhatsAppLeadLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════ */

interface Props {
  config: CategoryLandingConfig;
  products: GridProduct[];
  testimonials: LandingTestimonial[];
  waNumber: string;
}

export function CategoryLandingLight({ config, products, testimonials, waNumber }: Props) {
  const wa = (msg: string) => buildWhatsAppLink(waNumber, msg);
  const waOrder = wa(config.wa.order);
  const waPromo = wa(config.wa.promo);
  const waClosing = wa(config.wa.closing);
  const deadline = weekendDeadline();

  return (
    <div className={`${archivo.variable} ${sairaCondensed.variable}`}>
      <style>{STYLES}</style>
      <div className="lt-body">
        <ScrollReveal />
        <main>
          <PurchaseNotifications pops={config.purchasePops} />

          {/* ═══ HERO ═══ */}
          <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 net-bg opacity-60" />
              <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle,rgba(47,143,255,.22),transparent 65%)" }} />
              <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle,rgba(10,104,224,.14),transparent 65%)" }} />
            </div>

            {/* Hero image — mobile: bottom cutout, desktop: right side */}
            <div className="hero-photo pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[490px] lg:bottom-0 lg:left-[44%] lg:right-[-8%] lg:top-0 lg:h-full">
              {/* Mobile image */}
              <img
                src="https://res.cloudinary.com/dqjh7utdb/image/upload/v1786961633/fpwuhyjcq8mzeajiavoo.png"
                alt={config.heroImageAlt}
                className="block w-full h-full object-cover object-top lg:hidden"
                loading="eager"
              />
              {/* Desktop image */}
              <img
                src={config.heroImage}
                alt={config.heroImageAlt}
                className="hidden lg:block w-full h-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/20 lg:via-transparent lg:to-transparent" style={{ background: undefined }} />
            </div>

            <div className="max-w-6xl mx-auto px-5 relative z-20">
              <div className="max-w-2xl reveal">
                <p className="kicker text-[11px] sm:text-xs flex items-center gap-2 mb-5" style={{ color: "var(--blue)" }}>
                  <span className="inline-block w-6 h-px" style={{ background: "var(--blue)" }} />
                  {config.eyebrow}
                </p>
                <h1 className="display text-[2.5rem] leading-[.96] sm:text-6xl lg:text-[4.35rem]">
                  {config.headline.slice(0, -1).map((line) => <span key={line} className="block">{line}</span>)}
                  <span className="blue-text block">{config.headline[config.headline.length - 1]}</span>
                </h1>
                <p className="display text-lg sm:text-2xl mt-3" style={{ color: "var(--ink-soft)" }}>{config.headlineSub}</p>
                <p className="mt-4 sm:mt-6 text-sm sm:text-lg max-w-xl leading-relaxed" style={{ color: "var(--muted)" }}>{config.subheadline}</p>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                  <WhatsAppLeadLink href={waOrder} label={`Order Jersey Sekarang — ${config.eyebrow}`} className="btn-blue rounded-full px-6 py-3.5 sm:px-7 sm:py-4 font-bold text-white text-center">Order Jersey Sekarang →</WhatsAppLeadLink>
                  <a href="#desain" className="btn-outline rounded-full px-6 py-3.5 sm:px-7 sm:py-4 font-semibold text-center">Lihat Katalog Desain</a>
                </div>
                <div className="mt-7 sm:mt-9 pt-6 sm:pt-7 border-t grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-3" style={{ borderColor: "var(--line)" }}>
                  {config.trustBar.map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <span style={{ color: "var(--blue)" }} className="mt-px">✅</span>
                      <span className="text-xs sm:text-sm font-semibold">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 left-4 sm:left-6 lg:bottom-8 lg:left-[42%] z-20 card card-hl rounded-xl px-4 py-3 reveal">
              <p className="kicker text-[10px]" style={{ color: "var(--blue)" }}>{config.heroBadge.kicker}</p>
              <p className="display text-lg leading-none mt-1">{config.heroBadge.text}</p>
            </div>
          </section>

          {/* ═══ MARQUEE ═══ */}
          <div className="border-y py-3 overflow-hidden" style={{ borderColor: "var(--line)", background: "var(--paper-2)" }}>
            <div className="marquee kicker text-sm" style={{ color: "#93a8c4" }}>
              {Array.from({ length: 2 }).map((_, dup) => (
                <span key={dup} className="flex gap-10" aria-hidden={dup === 1}>
                  {config.marquee.map((m, i) => (
                    <span key={m + i} className="flex gap-10">
                      <span>{m}</span>
                      <span style={{ color: "var(--blue)" }} aria-hidden="true">✦</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* ═══ KENAPA PILIH KAMI ═══ */}
          <section id="kenapa" className="py-16 sm:py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-5">
              <div className="max-w-3xl reveal">
                <p className="kicker text-[11px] mb-4" style={{ color: "var(--blue)" }}>Kenapa Pilih Kami</p>
                <h2 className="display text-2xl sm:text-5xl">
                  {config.problem.headline.slice(0, -1).map((line) => <span key={line} className="block">{line}</span>)}
                  <span className="blue-text block">{config.problem.headline[config.problem.headline.length - 1]}</span>
                </h2>
                <p className="mt-4 sm:mt-6 text-sm sm:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>{config.problem.body}</p>
              </div>
              <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {config.problem.features.map((f) => (
                  <div key={f.title} className="card rounded-2xl p-5 sm:p-7 reveal">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl grid place-items-center mb-4 sm:mb-5" style={{ background: "var(--sky)", border: "1px solid rgba(10,104,224,.22)", color: "var(--blue)" }}>
                      {FEATURE_ICONS[f.icon] ?? FEATURE_ICONS.design}
                    </div>
                    <h3 className="display text-xl sm:text-2xl">{f.title}</h3>
                    <p className="mt-2 sm:mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ PILIHAN ORDER ═══ */}
          <section id="katalog" className="py-16 sm:py-20 md:py-28 border-y" style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}>
            <div className="max-w-6xl mx-auto px-5">
              <div className="max-w-3xl reveal">
                <p className="kicker text-[11px] mb-4" style={{ color: "var(--blue)" }}>{config.catalog.orderLabel}</p>
                <h2 className="display text-2xl sm:text-5xl">
                  {config.catalog.orderHeadline.slice(0, -1).map((line) => <span key={line} className="block">{line}</span>)}
                  <span className="blue-text block">{config.catalog.orderHeadline[config.catalog.orderHeadline.length - 1]}</span>
                </h2>
                <p className="mt-4 sm:mt-5 text-sm sm:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>{config.catalog.orderSub}</p>
              </div>
              <div className="mt-8 sm:mt-12 grid lg:grid-cols-2 gap-5 sm:gap-6">
                {config.catalog.orderCards.map((card) => (
                  <article key={card.title} className={`card rounded-2xl overflow-hidden flex flex-col reveal ${card.highlighted ? "card-hl" : ""}`}>
                    <div className="relative">
                      <Image src={card.image} alt={card.imageAlt} width={1200} height={700} className="w-full h-auto" />
                      {card.imageBadge && <span className="absolute top-3 left-3 sm:top-4 sm:left-4 btn-blue rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-bold text-white tracking-wide">{card.imageBadge}</span>}
                    </div>
                    <div className="p-5 sm:p-7 flex flex-col flex-1">
                      <p className="kicker text-[11px]" style={{ color: "var(--blue)" }}>{card.badge}</p>
                      <h3 className="display text-2xl sm:text-3xl mt-2">{card.title}</h3>
                      <p className="mt-2 sm:mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{card.desc}</p>
                      <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5 text-sm">
                        {card.points.map((p) => (
                          <li key={p} className="flex gap-2 sm:gap-2.5">
                            <span style={{ color: "var(--blue)" }}>✅</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      {card.footnote && <p className="mt-3 sm:mt-4 text-xs sm:text-sm italic" style={{ color: "#8aa0bd" }}>({card.footnote})</p>}
                      <div className="mt-auto pt-5 sm:pt-7">
                        {card.ctaAnchor ? (
                          <a href={card.ctaAnchor} className="btn-outline rounded-full px-5 py-3 sm:px-6 sm:py-3.5 font-semibold text-center block text-sm sm:text-base">{card.cta} →</a>
                        ) : (
                          <WhatsAppLeadLink href={waOrder} label={`${card.cta} — ${config.eyebrow}`} className="btn-blue rounded-full px-5 py-3 sm:px-6 sm:py-3.5 font-bold text-white text-center block text-sm sm:text-base">{card.cta} →</WhatsAppLeadLink>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-5 sm:mt-7 text-xs sm:text-sm card rounded-xl px-4 py-3 sm:px-5 sm:py-4 reveal" style={{ color: "var(--ink-soft)" }}>{config.catalog.orderNote}</p>
            </div>
          </section>

          {/* ═══ HARGA ═══ */}
          <section id="harga" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[46rem] h-[26rem] blur-3xl" style={{ background: "radial-gradient(circle,rgba(47,143,255,.16),transparent 68%)" }} />
              <div className="absolute inset-0 net-bg opacity-40" />
            </div>
            <div className="max-w-5xl mx-auto px-5">
              <div className="text-center reveal">
                <h2 className="display text-3xl sm:text-6xl">{config.pricing.headline}<span className="blue-text">{config.pricing.headlineAccent}</span></h2>
                <p className="mt-3 sm:mt-4 text-sm sm:text-lg" style={{ color: "var(--muted)" }}>{config.pricing.sub}</p>
              </div>
              <PriceSection atasan={config.pricing.atasan} setelan={config.pricing.setelan} bulk={config.pricing.bulk} waAtasan={buildWhatsAppLink(waNumber, config.wa.atasan)} waSetelan={buildWhatsAppLink(waNumber, config.wa.setelan)} waBulk={buildWhatsAppLink(waNumber, config.wa.bulk)} eyebrowAtasan={config.eyebrow} />
            </div>
          </section>

          {/* ═══ KATALOG DESAIN ═══ */}
          <section id="desain" className="py-16 sm:py-20 md:py-28 border-y" style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}>
            <div className="max-w-6xl mx-auto px-5">
              <div className="max-w-3xl reveal">
                <p className="kicker text-[11px] mb-4" style={{ color: "var(--blue)" }}>Katalog Desain</p>
                <h2 className="display text-2xl sm:text-5xl">
                  {config.catalog.designsHeadline.slice(0, -1).map((line) => <span key={line} className="block">{line}</span>)}
                  <span className="blue-text block">{config.catalog.designsHeadline[config.catalog.designsHeadline.length - 1]}</span>
                </h2>
                <p className="mt-4 sm:mt-5 text-sm sm:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>{config.catalog.designsSub}</p>
              </div>
              <DesignGrid products={products} waNumber={waNumber} waMessageTemplate={config.wa.designTemplate} />
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-7 gap-y-4 reveal">
                <WhatsAppLeadLink href={waOrder} label={`Pesan Desain — ${config.eyebrow}`} className="btn-blue rounded-full px-6 py-3.5 sm:px-7 sm:py-4 font-bold text-white text-center text-sm sm:text-base">{config.catalog.designsCta} →</WhatsAppLeadLink>
                <p className="text-xs sm:text-sm text-center" style={{ color: "var(--muted)" }}>{config.catalog.designsFootnote}</p>
              </div>
            </div>
          </section>

          {/* ═══ CARA ORDER ═══ */}
          <section id="cara" className="py-16 sm:py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-5">
              <div className="reveal">
                <p className="kicker text-[11px] mb-4" style={{ color: "var(--blue)" }}>Cara Order</p>
                <h2 className="display text-2xl sm:text-5xl">{config.steps.headline}<span className="blue-text">{config.steps.headlineAccent}</span></h2>
              </div>
              <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                {config.steps.items.map((s, i) => (
                  <div key={s.title} className="card rounded-2xl p-4 sm:p-6 relative overflow-hidden reveal">
                    <span className="display absolute -top-3 -right-1 text-[4rem] sm:text-[6rem] leading-none select-none" style={{ color: "rgba(10,104,224,.07)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <p className="kicker text-[10px] sm:text-[11px]" style={{ color: "var(--blue)" }}>Langkah {i + 1}</p>
                    <h3 className="display text-lg sm:text-2xl mt-1 sm:mt-2">{s.title}</h3>
                    <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ TESTIMONI ═══ */}
          <section id="testimoni" className="py-16 sm:py-20 md:py-28 border-y" style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}>
            <div className="max-w-6xl mx-auto px-5">
              <div className="max-w-3xl reveal">
                <p className="kicker text-[11px] mb-4" style={{ color: "var(--blue)" }}>Ulasan Pelanggan</p>
                <h2 className="display text-2xl sm:text-5xl">Kata <span className="blue-text">Pelanggan Kami</span></h2>
                <p className="mt-4 sm:mt-5 text-sm sm:text-lg" style={{ color: "var(--muted)" }}>{config.testimonials.sub}</p>
              </div>
              <div className="mt-8 sm:mt-12 card rounded-3xl p-5 sm:p-8 reveal" style={{ borderColor: "rgba(10,104,224,.24)" }}>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[9px] sm:text-[10px] font-bold tracking-wider border" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--blue)" }} />
                      {config.testimonials.galleryBadge}
                    </span>
                    <h3 className="display text-2xl sm:text-4xl mt-3 sm:mt-4">{config.testimonials.galleryTitle}<span className="blue-text">{config.testimonials.galleryTitleAccent}</span> dari Pelanggan Kami</h3>
                  </div>
                  <p className="text-xs sm:text-sm sm:text-right sm:max-w-[15rem] leading-relaxed" style={{ color: "var(--muted)" }}>{config.testimonials.gallerySub}</p>
                </div>
                <GalleryMarquee images={config.testimonials.gallery} />
                <div className="mt-5 sm:mt-7 flex justify-center">
                  <WhatsAppLeadLink href={buildWhatsAppLink(waNumber, config.wa.gallery)} label={`Order Seperti Galeri — ${config.eyebrow}`} className="btn-blue rounded-full px-5 py-3 sm:px-7 sm:py-3.5 font-bold text-white text-center inline-flex items-center gap-2 text-sm sm:text-base">
                    <span className="hidden sm:inline">{config.testimonials.galleryCta}</span>
                    <span className="sm:hidden">{config.testimonials.galleryCtaShort ?? config.testimonials.galleryCta}</span>{" "}
                    <span aria-hidden="true">→</span>
                  </WhatsAppLeadLink>
                </div>
              </div>
              <div className="mt-8 sm:mt-12">
                <TestimonialCarousel items={testimonials.slice(0, 6)} />
              </div>
            </div>
          </section>

          {/* ═══ PROMO ═══ */}
          <section id="promo" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 stripe-bg opacity-70" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#fff 0%,rgba(255,255,255,.72) 45%,#fff 100%)" }} />
            </div>
            <div className="max-w-4xl mx-auto px-5 text-center reveal">
              <p className="kicker text-[11px] mb-4" style={{ color: "var(--blue)" }}>Promo Terbatas</p>
              <h2 className="display text-2xl sm:text-5xl">{config.urgency.headline}<br className="hidden sm:block" /> <span className="blue-text">{config.urgency.headlineAccent}</span></h2>
              <p className="mt-4 sm:mt-6 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>{config.urgency.body.replace("{deadline}", deadline)}</p>
              <div className="mt-6 sm:mt-8 flex justify-center">
                <WhatsAppLeadLink href={waPromo} label={`Klaim Promo — ${config.eyebrow}`} className="btn-blue rounded-full px-6 py-3.5 sm:px-8 sm:py-4 font-bold text-white text-sm sm:text-base">{config.urgency.cta} →</WhatsAppLeadLink>
              </div>
              <p className="mt-4 sm:mt-5 text-xs sm:text-sm" style={{ color: "#8aa0bd" }}>⏳ {config.urgency.note}</p>
            </div>
          </section>

          {/* ═══ FAQ ═══ */}
          <section id="faq" className="py-16 sm:py-20 md:py-28 border-y" style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}>
            <div className="max-w-3xl mx-auto px-5">
              <div className="reveal">
                <p className="kicker text-[11px] mb-4" style={{ color: "var(--blue)" }}>FAQ</p>
                <h2 className="display text-2xl sm:text-5xl">{config.faqs.headline}<span className="blue-text">{config.faqs.headlineAccent}</span></h2>
              </div>
              <div className="mt-8 sm:mt-10 space-y-3">
                {config.faqs.items.map((f, i) => (
                  <details key={f.q} className="faq card rounded-xl px-4 py-3 sm:px-5 sm:py-4 reveal" open={i === 0}>
                    <summary className="flex items-start justify-between gap-3 sm:gap-4 cursor-pointer list-none font-bold text-sm sm:text-lg">
                      <span>{f.q}</span>
                      <span className="faq-ico mt-1 shrink-0" aria-hidden="true" />
                    </summary>
                    <p className="mt-2 sm:mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ CTA ═══ */}
          <section id="order" className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-x-0 bottom-0 h-full" style={{ background: "radial-gradient(60% 70% at 50% 100%,rgba(47,143,255,.22),transparent 70%)" }} />
              <div className="absolute inset-0 net-bg opacity-50" />
            </div>
            <div className="max-w-3xl mx-auto px-5 text-center reveal">
              <h2 className="display text-3xl sm:text-6xl">{config.closing.headline}<br /><span className="blue-text">{config.closing.headlineAccent}</span></h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg" style={{ color: "var(--muted)" }}>{config.closing.sub}</p>
              <div className="mt-6 sm:mt-9">
                <WhatsAppLeadLink href={waClosing} label={`Order Jersey Sekarang — ${config.eyebrow}`} className="btn-blue inline-block rounded-full px-7 py-4 sm:px-9 sm:py-5 text-base sm:text-lg font-bold text-white">{config.closing.cta} →</WhatsAppLeadLink>
              </div>
              <p className="mt-4 sm:mt-5 text-xs sm:text-sm" style={{ color: "#8aa0bd" }}>{config.closing.note}</p>
            </div>
          </section>
        </main>

        {/* ═══ FOOTER ═══ */}
        <footer className="border-t py-8 sm:py-10" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between text-xs sm:text-sm" style={{ color: "var(--muted)" }}>
            <p className="display text-lg sm:text-xl" style={{ color: "var(--ink)" }}>TNT<span className="blue-text">SPORT</span> <span className="text-[9px] sm:text-[10px] tracking-[.2em] align-super">APPAREL</span></p>
            <p>© {new Date().getFullYear()} · {config.eyebrow}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
