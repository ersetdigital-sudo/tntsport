import Image from "next/image";
import dynamic from "next/dynamic";
import type { ReactElement } from "react";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import { CategoryDesignGrid, type GridProduct } from "@/components/category-landing/CategoryDesignGrid";
import { PurchaseNotifications } from "@/components/category-landing/PurchaseNotifications";
import { PriceSection } from "@/components/category-landing/PriceSection";
import { ScrollReveal } from "@/components/category-landing/ScrollReveal";
import { TestimonialCarousel } from "@/components/category-landing/TestimonialCarousel";
import { GalleryMarquee } from "@/components/category-landing/GalleryMarquee";
import { buildWhatsAppLink } from "@/lib/wa";
import type { CategoryLandingConfig, LandingTestimonial } from "@/lib/category-landing";

const PageViewTracker = dynamic(() => import("@/components/PageViewTracker").then(m => m.PageViewTracker));
const ViewContentTracker = dynamic(() => import("@/components/ViewContentTracker").then(m => m.ViewContentTracker));

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-bc",
  display: "swap",
});

const FEATURE_ICONS: Record<string, ReactElement> = {
  single: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 7.3 12 3 3.5 7.3v9.4L12 21l8.5-4.3V7.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3.5 7.3 12 11.6l8.5-4.3M12 11.6V21" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="7.3" r="1.1" fill="currentColor" />
    </svg>
  ),
  print: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="14" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  design: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 19 7-7-4-4-7 7-1.5 5.5L12 19Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 8.5 12 5.5 5.5 12a3.5 3.5 0 0 0-1 2.4L4 20l5.6-.5a3.5 3.5 0 0 0 2.4-1L18 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  fast: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  sewing: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20 20 4M4 20h6l-2-4h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
};

interface Props {
  config: CategoryLandingConfig;
  products: GridProduct[];
  testimonials: LandingTestimonial[];
  waNumber: string;
}

export function CategoryLanding({ config, products, testimonials, waNumber }: Props) {
  const wa = (msg: string) => buildWhatsAppLink(waNumber, msg);
  const waOrder = wa(config.wa.order);
  const waClosing = wa(config.wa.closing);

  return (
    <div
      className={`${barlow.variable} ${barlowCondensed.variable} grain overflow-x-hidden`}
      style={{ background: "#08090b", color: "#f4f5f7", fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
    >
      <style>{`
        :root{
          --ink:#08090b; --ink-2:#0f1115; --ink-3:#15181e;
          --line:rgba(255,255,255,.10);
          --fg:#f4f5f7; --muted:#9aa1ad;
          --fire:#ff6b00; --fire-2:#ff9d2e; --ember:#e02a12;
        }
        .display{font-family:var(--font-bc),"Barlow Condensed",system-ui,sans-serif;font-weight:800;letter-spacing:-.01em;line-height:.94;text-transform:uppercase;}
        .kicker{font-family:var(--font-bc),"Barlow Condensed",sans-serif;font-weight:700;letter-spacing:.22em;text-transform:uppercase;}
        .fire-text{background:linear-gradient(100deg,var(--fire-2),var(--fire) 45%,var(--ember));-webkit-background-clip:text;background-clip:text;color:transparent;}
        .btn-fire{
          background:linear-gradient(100deg,var(--fire),var(--ember));
          box-shadow:0 10px 30px -8px rgba(255,107,0,.65), inset 0 1px 0 rgba(255,255,255,.25);
          transition:transform .18s ease, box-shadow .18s ease, filter .18s ease;
        }
        .btn-fire:hover{transform:translateY(-2px);box-shadow:0 16px 40px -8px rgba(255,107,0,.8), inset 0 1px 0 rgba(255,255,255,.3);filter:saturate(1.1);}
        .btn-ghost{border:1px solid rgba(255,255,255,.22);transition:border-color .18s ease,background .18s ease;}
        .btn-ghost:hover{border-color:var(--fire);background:rgba(255,107,0,.09);}
        .card{background:linear-gradient(180deg,var(--ink-2),var(--ink));border:1px solid var(--line);}
        .card-hl{border-color:rgba(255,107,0,.38);box-shadow:0 0 0 1px rgba(255,107,0,.12), 0 30px 60px -30px rgba(255,107,0,.4);}
        .card-cta{margin-top:auto;padding-top:1.75rem;}
        .price-card{background:linear-gradient(180deg,#101319,#0a0c10);}
        .price-card-hl{
          background:linear-gradient(165deg,rgba(255,107,0,.16),rgba(224,42,18,.05) 45%,rgba(10,12,16,1) 85%);
          border-color:rgba(255,107,0,.42);
          box-shadow:0 0 0 1px rgba(255,107,0,.1), 0 40px 80px -40px rgba(255,107,0,.55);
        }
        .qty-toggle{background:#12151b;border:1px solid rgba(255,255,255,.12);}
        .qty-btn{
          position:relative;z-index:1;border-radius:9999px;padding:.6rem 1.4rem;
          font-family:var(--font-bc),"Barlow Condensed",sans-serif;font-weight:700;letter-spacing:.14em;
          text-transform:uppercase;font-size:.78rem;color:var(--muted);
          transition:color .25s ease;white-space:nowrap;
        }
        .qty-btn.is-active{color:#fff;}
        .qty-pill{
          position:absolute;z-index:0;top:.375rem;bottom:.375rem;left:.375rem;
          border-radius:9999px;
          background:linear-gradient(100deg,var(--fire),var(--ember));
          box-shadow:0 6px 20px -6px rgba(255,107,0,.8);
          transition:transform .32s cubic-bezier(.4,.9,.3,1), width .32s cubic-bezier(.4,.9,.3,1);
        }
        .price-fade{animation:priceIn .35s ease;}
        @keyframes priceIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}
        .gal-wrap{
          overflow:hidden;
          -webkit-mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);
          mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);
        }
        .gal-track{display:flex;gap:1rem;width:max-content;animation:galslide 42s linear infinite;}
        .gal-wrap:hover .gal-track{animation-play-state:paused;}
        .gal-item{flex:0 0 auto;width:min(13.5rem,70vw);margin:0;}
        .gal-item img{width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:1rem;border:1px solid rgba(255,255,255,.1);display:block;}
        @keyframes galslide{to{transform:translateX(calc(-50% - .5rem));}}
        @media (min-width:640px){ .gal-item{width:17rem;} }
        .cat-item{position:relative;overflow:hidden;border-radius:1rem;background:#12151b;border:1px solid rgba(255,255,255,.09);}
        .cat-item img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;transition:transform .4s ease;}
        .cat-item:hover img{transform:scale(1.05);}
        .cat-name{
          position:absolute;inset-inline:0;bottom:0;padding:.9rem .8rem .8rem;
          background:linear-gradient(transparent,rgba(8,9,11,.92));
          font-family:var(--font-bc),"Barlow Condensed",sans-serif;font-weight:700;
          text-transform:uppercase;letter-spacing:.03em;font-size:1rem;line-height:1.1;
        }
        .grain{background-image:radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px);background-size:3px 3px;}
        .stripe{background:repeating-linear-gradient(115deg,rgba(255,107,0,.14) 0 2px,transparent 2px 16px);}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);}
        .reveal.in{opacity:1;transform:none;}
        details.faq[open] .faq-ico{transform:rotate(45deg);}
        .faq-ico{transition:transform .22s ease;}
        details.faq summary::-webkit-details-marker{display:none;}
        .marquee{display:flex;gap:2.5rem;width:max-content;animation:slide 26s linear infinite;}
        @keyframes slide{to{transform:translateX(-50%);}}
        .cl-pop{transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .45s ease;}
        .cl-pop-hide{transform:translateY(140%);opacity:0;pointer-events:none;}
        /* ===== Carousel testimoni (auto-scroll infinite, pure CSS) ===== */
        .t-wrap{
          overflow:hidden;
          -webkit-mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent);
          mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent);
        }
        .t-track{
          display:flex;width:max-content;padding-inline:1.25rem;
          animation:t-slide 52s linear infinite;
          will-change:transform;
        }
        .t-item{
          flex:0 0 auto;
          width:min(21rem,78vw);
          margin-right:1.25rem;
        }
        .t-wrap:hover .t-track,
        .t-wrap:active .t-track,
        .t-wrap:focus-within .t-track{animation-play-state:paused;}
        @keyframes t-slide{to{transform:translateX(-50%);}}
        @media (prefers-reduced-motion:reduce){
          .reveal{opacity:1;transform:none;transition:none;}
          .cl-pop{transition:none;}
          .price-fade{animation:none;}
          html{scroll-behavior:auto;}
        }
      `}</style>

      <ScrollReveal />

      <main>
        <PageViewTracker page={config.slug} />
        <ViewContentTracker contentName={config.eyebrow} contentCategory="Category Landing" />
        <PurchaseNotifications pops={config.purchasePops} />

        {/* ================= HERO ================= */}
        <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle,rgba(255,107,0,.22),transparent 65%)" }} />
            <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle,rgba(224,42,18,.16),transparent 65%)" }} />
            <div className="absolute inset-x-0 top-0 h-40 stripe opacity-40" />
          </div>

          <div className="max-w-6xl mx-auto px-5 flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
            <div className="order-2 lg:order-none lg:col-span-7 reveal">
              <p className="kicker text-[11px] sm:text-xs text-[#ff9d2e] flex items-center gap-2 mb-5">
                <span className="inline-block w-6 h-px bg-[#ff6b00]" aria-hidden="true" />
                {config.eyebrow}
              </p>
              {/* clamp + nowrap: tiap baris config selalu 1 baris utuh —
                  di mobile (≥360px) tetap pas 2 baris, desktop membesar proporsional */}
              <h1 className="display text-[clamp(2rem,8.2vw,2.75rem)] leading-[1.02] sm:text-6xl sm:leading-[.95] lg:text-[4.5rem]">
                {config.headline.slice(0, -1).map((line) => (
                  <span key={line} className="block whitespace-nowrap">{line}</span>
                ))}
                <span className="fire-text block whitespace-nowrap">{config.headline[config.headline.length - 1]}</span>
              </h1>
              <p className="display text-lg sm:text-2xl mt-3 text-white/70">{config.headlineSub}</p>
              <p className="mt-6 text-base sm:text-lg text-[#9aa1ad] max-w-xl leading-relaxed">
                {config.subheadline}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                <WhatsAppLeadLink
                  href={waOrder}
                  label={`Order Jersey Sekarang — ${config.eyebrow}`}
                  className="btn-fire rounded-full px-7 py-4 font-bold text-white text-center w-full sm:w-auto cursor-pointer"
                >
                  Order Jersey Sekarang →
                </WhatsAppLeadLink>
                <a href="#desain" className="btn-ghost rounded-full px-7 py-4 font-semibold text-center text-white/90 w-full sm:w-auto cursor-pointer">
                  Lihat Katalog Desain
                </a>
              </div>

              {/* trust bar */}
              <div className="mt-9 pt-7 border-t border-white/10 flex flex-wrap lg:flex-nowrap justify-center gap-x-5 gap-y-3">
                {config.trustBar.map((t) => (
                  <div key={t} className="flex items-center gap-2 whitespace-nowrap">
                    <span className="text-[#ff6b00]" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-none lg:col-span-5 reveal">
              <div className="relative">
                <div className="absolute inset-6 blur-3xl -z-10" style={{ background: "radial-gradient(circle,rgba(255,107,0,.35),transparent 70%)" }} />
                <Image
                  src={config.heroImage}
                  alt={config.heroImageAlt}
                  width={900}
                  height={1100}
                  priority
                  className="w-full h-auto rounded-2xl border border-white/10 shadow-2xl object-cover aspect-[4/3] sm:aspect-auto"
                />
                <div className="absolute -bottom-4 -left-3 sm:left-4 card card-hl rounded-xl px-4 py-3 backdrop-blur">
                  <p className="kicker text-[10px] text-[#ff9d2e]">{config.heroBadge.kicker}</p>
                  <p className="display text-lg leading-none mt-1">{config.heroBadge.text}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MARQUEE ================= */}
        <div className="border-y border-white/10 bg-[#0f1115] py-3 overflow-hidden">
          <div className="marquee kicker text-sm text-white/35">
            {Array.from({ length: 2 }).map((_, dup) => (
              <span key={dup} className="flex gap-10" aria-hidden={dup === 1}>
                {config.marquee.map((m, i) => (
                  <span key={m + i} className="flex gap-10">
                    <span>{m}</span>
                    <span className="text-[#ff6b00]" aria-hidden="true">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ================= PROBLEM → SOLUSI ================= */}
        <section id="kenapa" className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5">
            <div className="max-w-3xl reveal">
              <p className="kicker text-[11px] text-[#ff9d2e] mb-4">Kenapa Pilih Kami</p>
              <h2 className="display text-3xl sm:text-5xl">
                {config.problem.headline.slice(0, -1).map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
                <span className="fire-text block">{config.problem.headline[config.problem.headline.length - 1]}</span>
              </h2>
              <p className="mt-6 text-[#9aa1ad] text-base sm:text-lg leading-relaxed">{config.problem.body}</p>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-5">
              {config.problem.features.map((f) => (
                <div key={f.title} className="card rounded-2xl p-7 reveal">
                  <div
                    className="w-12 h-12 rounded-xl grid place-items-center mb-5 text-[#ff9d2e]"
                    style={{ background: "rgba(255,107,0,.12)", border: "1px solid rgba(255,107,0,.3)" }}
                  >
                    {FEATURE_ICONS[f.icon] ?? FEATURE_ICONS.design}
                  </div>
                  <h3 className="display text-2xl">{f.title}</h3>
                  <p className="mt-3 text-[#9aa1ad] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= KATALOG DESAIN ================= */}
        <section id="desain" className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5">
            <div className="max-w-3xl reveal">
              <p className="kicker text-[11px] text-[#ff9d2e] mb-4">Katalog Desain</p>
              <h2 className="display text-3xl sm:text-5xl">
                {config.catalog.designsHeadline.slice(0, -1).map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
                <span className="fire-text block">{config.catalog.designsHeadline[config.catalog.designsHeadline.length - 1]}</span>
              </h2>
              <p className="mt-5 text-[#9aa1ad] text-base sm:text-lg leading-relaxed">{config.catalog.designsSub}</p>
            </div>

            <CategoryDesignGrid
              products={products}
              waNumber={waNumber}
              waMessageTemplate={config.wa.designTemplate}
            />

            <p className="mt-8 text-sm text-[#9aa1ad] text-center reveal">{config.catalog.designsFootnote}</p>
          </div>
        </section>

        {/* ================= PILIHAN BAHAN ================= */}
        <section id="bahan" className="py-20 md:py-28 bg-[#0f1115] border-y border-white/10">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 reveal">
                <p className="kicker text-[11px] text-[#ff6b00] mb-6">Bahan Kain</p>
                <h2 className="display text-[9vw] sm:text-[6vw] lg:text-[4.2rem] leading-[1.05]">
                  Dry-Fit Berkualitas,
                  <br />
                  Standar <span className="fire-text">Liga Pro.</span>
                </h2>
              </div>
              <div className="lg:col-span-5 reveal">
                <p className="text-[15px] text-[#9aa1ad] leading-relaxed mb-8">
                  Bahan kain yang digunakan dry-fit yang berkualitas dan sudah standar liga pro, nyaman dan tidak bau.
                </p>
                <div className="h-px bg-white/15 mb-8" />
                <div className="flex flex-wrap gap-4">
                  <span className="kicker text-[11px] text-white/80 tracking-[0.15em]">Nyaman Dipakai</span>
                  <span className="kicker text-[11px] text-white/80 tracking-[0.15em]">Tidak Bau</span>
                  <span className="kicker text-[11px] text-white/80 tracking-[0.15em]">Standar Liga Pro</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HARGA ================= */}
        <section id="harga" className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[46rem] h-[26rem] blur-3xl"
              style={{ background: "radial-gradient(circle,rgba(255,107,0,.16),transparent 68%)" }}
            />
            <div
              className="absolute inset-0 opacity-[.35]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto px-5">
            <div className="text-center reveal">
              <h2 className="display text-4xl sm:text-6xl">
                {config.pricing.headline}
                <span className="fire-text">{config.pricing.headlineAccent}</span>
              </h2>
              <p className="mt-4 text-[#9aa1ad] text-base sm:text-lg">{config.pricing.sub}</p>
            </div>

            <PriceSection
              atasan={config.pricing.atasan}
              setelan={config.pricing.setelan}
              bulk={config.pricing.bulk}
              waAtasan={buildWhatsAppLink(waNumber, config.wa.atasan)}
              waAtasanEcer={config.wa.atasanEcer ? buildWhatsAppLink(waNumber, config.wa.atasanEcer) : undefined}
              waAtasanLusin={config.wa.atasanLusin ? buildWhatsAppLink(waNumber, config.wa.atasanLusin) : undefined}
              waSetelan={buildWhatsAppLink(waNumber, config.wa.setelan)}
              waSetelanEcer={config.wa.setelanEcer ? buildWhatsAppLink(waNumber, config.wa.setelanEcer) : undefined}
              waSetelanLusin={config.wa.setelanLusin ? buildWhatsAppLink(waNumber, config.wa.setelanLusin) : undefined}
              waBulk={buildWhatsAppLink(waNumber, config.wa.bulk)}
              eyebrowAtasan={config.eyebrow}
              toggleLusinLabel={config.pricing.toggleLusinLabel}
              toggleEcerLabel={config.pricing.toggleEcerLabel}
            />
          </div>
        </section>

        {/* ================= TESTIMONI ================= */}
        <section id="testimoni" className="py-20 md:py-28 bg-[#0f1115] border-y border-white/10">
          <div className="max-w-6xl mx-auto px-5">
            <div className="max-w-3xl reveal">
              <p className="kicker text-[11px] text-[#ff9d2e] mb-4">Ulasan Pelanggan</p>
              <h2 className="display text-3xl sm:text-5xl">
                {config.testimonials.headline}
                <span className="fire-text">{config.testimonials.headlineAccent}</span>
              </h2>
              <p className="mt-5 text-[#9aa1ad] text-base sm:text-lg">{config.testimonials.sub}</p>
            </div>

            {/* galeri foto berjalan */}
            <div className="mt-12 card rounded-3xl p-6 sm:p-8 reveal" style={{ borderColor: "rgba(255,107,0,.22)" }}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider border border-white/15 text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]" aria-hidden="true" />
                    {config.testimonials.galleryBadge}
                  </span>
                  <h3 className="display text-3xl sm:text-4xl mt-4">
                    {config.testimonials.galleryTitle}
                    <span className="fire-text">{config.testimonials.galleryTitleAccent}</span>
                    {" "}dari Pelanggan Kami
                  </h3>
                </div>
                <p className="text-sm text-[#9aa1ad] sm:text-right sm:max-w-[15rem] leading-relaxed">
                  {config.testimonials.gallerySub}
                </p>
              </div>

              <GalleryMarquee images={config.testimonials.gallery} />
            </div>

            <TestimonialCarousel items={testimonials.slice(0, 6)} />
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq" className="py-20 md:py-28 bg-[#0f1115] border-y border-white/10">
          <div className="max-w-3xl mx-auto px-5">
            <div className="reveal">
              <p className="kicker text-[11px] text-[#ff9d2e] mb-4">FAQ</p>
              <h2 className="display text-3xl sm:text-5xl">
                {config.faqs.headline}
                <span className="fire-text">{config.faqs.headlineAccent}</span>
              </h2>
            </div>

            <div className="mt-10 space-y-3">
              {config.faqs.items.map((f, i) => (
                <details key={f.q} className="faq card rounded-xl px-5 py-4 reveal" open={i === 0}>
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none font-bold text-lg">
                    <span>{f.q}</span>
                    <span className="faq-ico text-[#ff6b00] text-2xl leading-none shrink-0" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-[#9aa1ad] leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA PENUTUP ================= */}
        <section id="order" className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-x-0 bottom-0 h-full" style={{ background: "radial-gradient(60% 70% at 50% 100%,rgba(255,107,0,.22),transparent 70%)" }} />
            <div className="absolute inset-x-0 bottom-0 h-32 stripe opacity-30" />
          </div>
          <div className="max-w-3xl mx-auto px-5 text-center reveal">
            <h2 className="display text-4xl sm:text-6xl">
              {config.closing.headline}
              <br />
              <span className="fire-text">{config.closing.headlineAccent}</span>
            </h2>
            <p className="mt-6 text-[#9aa1ad] text-lg">{config.closing.sub}</p>
            <div className="mt-9">
              <WhatsAppLeadLink
                href={waClosing}
                label={`Order Jersey Sekarang — ${config.eyebrow}`}
                className="btn-fire inline-block rounded-full px-9 py-5 text-lg font-bold text-white cursor-pointer"
              >
                {config.closing.cta} →
              </WhatsAppLeadLink>
            </div>
            <p className="mt-5 text-sm text-white/45">{config.closing.note}</p>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-[#9aa1ad]">
          <p className="display text-xl text-white">
            TNT<span className="fire-text">SPORT</span>{" "}
            <span className="text-[10px] tracking-[.2em] align-super">APPAREL</span>
          </p>
          <p>© {new Date().getFullYear()} · {config.eyebrow}</p>
        </div>
      </footer>
    </div>
  );
}
