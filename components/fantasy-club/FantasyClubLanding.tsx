"use client";

import { useEffect, useRef, useState } from "react";
import type { FantasyClubProduct } from "@/lib/queries";
import "./fantasy-club.css";

const FALLBACK_COLLECTION: FantasyClubProduct[] = [
  { code: "FC-001", name: "BOCA JUNIOR FANTASY", image: "/landing/fantasy-club/ee7afb07-e08f-4a12-b847-945de15133f2.png", alt: "FC-001 Boca Junior Fantasy" },
  { code: "FC-002", name: "BOCA JUNIOR CONCEPT", image: "/landing/fantasy-club/be9ed3ea-c751-4c0f-8f07-d9a52229448a.png", alt: "FC-002 Boca Junior Concept" },
  { code: "FC-003", name: "BELGICA FANTASY EDITION", image: "/landing/fantasy-club/70b10d97-130f-464f-b313-8473755d9609.png", alt: "FC-003 Belgica Fantasy Edition" },
  { code: "FC-004", name: "BAYERN MUNCHEN FANTASY EDITION", image: "/landing/fantasy-club/bbc8cac1-af3a-409b-953b-a53b688f2b55.png", alt: "FC-004 Bayern Munchen Fantasy Edition" },
  { code: "FC-005", name: "AUSTRALIA FANTASY EDITION", image: "/landing/fantasy-club/8c80ebc5-df95-4758-9d52-26438b64158c.png", alt: "FC-005 Australia Fantasy Edition" },
];

const PRICE_DATA = {
  ecer: {
    atasan: "75.000",
    setelan: "145.000",
    note: "Harga satuan, bisa pesan mulai 1 pcs.",
    small: "Mau desain custom sendiri? Order minimal 6 pcs.",
    benefits: [
      "Full printing, pilih dari katalog desain",
      "Nama dan nomor punggung",
      "Revisi desain tanpa batas",
      "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
      "Printing sublime, warna cerah dan tahan bertahun-tahun",
    ],
  },
  lusin: {
    atasan: "65.000",
    setelan: "120.000",
    note: "Harga hemat, berlaku untuk pemesanan minimal 12 pcs / set.",
    small: "",
    benefits: [
      "Bebas desain sendiri atau pilih dari katalog kami",
      "Nama dan nomor punggung, gratis",
      "Revisi desain tanpa batas sampai tim kamu puas",
      "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
      "Printing sublime, warna cerah dan tahan bertahun-tahun",
    ],
  },
};

const AUDIENCES = [
  "FUTSAL TEAM",
  "FOOTBALL CLUB",
  "COMMUNITY",
  "ACADEMY",
  "SCHOOL",
  "TOURNAMENT",
  "SUPPORTER",
  "PERSONAL",
];

const KEUNGGULAN = [
  { num: "01", title: "DESAIN BERKARAKTER", desc: "Pattern dan kombinasi warna yang membuat jersey lebih standout." },
  { num: "02", title: "LOOK MODERN", desc: "Desain terinspirasi dari gaya football apparel masa kini." },
  { num: "03", title: "BISA CUSTOM", desc: "Sesuaikan logo tim, nama pemain, nomor, dan sponsor." },
  { num: "04", title: "SIAP PRODUKSI", desc: "Setelah desain disepakati, jersey siap diproduksi sesuai kebutuhan tim." },
];

const STEPS = [
  { num: "01", title: "PILIH DESAIN", desc: "Pilih desain Fantasy Club yang paling sesuai dengan karakter tim." },
  { num: "02", title: "KIRIM DATA", desc: "Kirim logo, nama pemain, nomor, sponsor, dan detail lainnya." },
  { num: "03", title: "CUSTOM", desc: "Desain disesuaikan dengan identitas dan kebutuhan tim kamu." },
  { num: "04", title: "SIAP DIPRODUKSI", desc: "Setelah desain disepakati, jersey siap masuk proses produksi." },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const parent = en.target.parentNode as HTMLElement;
            const i = Array.prototype.indexOf.call(parent?.children, en.target);
            (en.target as HTMLElement).style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
            (en.target as HTMLElement).classList.add("fc-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    el.querySelectorAll(".fc-reveal").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return ref;
}

function PriceToggle({ active, onChange }: { active: string; onChange: (k: string) => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex p-1 border" style={{ borderColor: "rgba(23,25,28,0.2)", background: "rgba(23,25,28,0.04)" }}>
        {[
          { key: "ecer", label: "ECER — MULAI 1 PCS" },
          { key: "lusin", label: "LUSIN — MINIMAL 12 PCS" },
        ].map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={() => onChange(b.key)}
            className="fc-display text-[14px] md:text-[15px] px-6 md:px-9 py-3.5 transition-colors"
            style={{
              background: active === b.key ? "var(--fc-green)" : "transparent",
              color: active === b.key ? "var(--fc-black)" : "rgba(23,25,28,0.6)",
            }}
          >
            {b.label}
          </button>
        ))}
      </div>
      <div className="mt-3 text-[13px]" style={{ color: "rgba(23,25,28,0.55)" }}>
        {active === "ecer" ? "Harga satuan, bisa pesan mulai 1 pcs." : "Harga hemat, berlaku untuk pemesanan minimal 12 pcs / set."}
      </div>
    </div>
  );
}

export function FantasyClubLanding({ products }: { products: FantasyClubProduct[] }) {
  const rootRef = useReveal();
  const [qty, setQty] = useState("ecer");
  const price = PRICE_DATA[qty as keyof typeof PRICE_DATA];
  const collection = products.length > 0 ? products : FALLBACK_COLLECTION;

  return (
    <div ref={rootRef} className="fantasy-club">
      {/* HERO */}
      <section id="top" className="relative overflow-hidden fc-noise pt-14" style={{ background: "var(--fc-charcoal)" }}>
        <div className="absolute inset-0 fc-grid-lines opacity-60" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 78% 20%,rgba(255,255,255,.07),transparent 60%)" }} />
        <div className="fc-diag" style={{ top: "34%", left: "-5%", width: "70%" }} />
        <div className="fc-diag" style={{ top: "62%", left: "-5%", width: "45%" }} />

        <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 pt-14 md:pt-24 pb-16 md:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-6 relative z-10">
            <div className="fc-reveal flex items-center gap-3 fc-label" style={{ color: "var(--fc-gray)" }}>
              <span className="inline-block w-10 h-px" style={{ background: "var(--fc-green)" }} />
              FANTASY CLUB / FOOTBALL APPAREL
            </div>
            <h1 className="fc-reveal fc-display mt-6 text-[clamp(56px,11vw,132px)]">
              BUKAN JERSEY<br />YANG <span style={{ color: "var(--fc-green)" }}>BIASA.</span>
            </h1>
            <p className="fc-reveal mt-7 text-[clamp(17px,2.2vw,22px)] leading-[1.35] max-w-[520px]" style={{ color: "var(--fc-cream)" }}>
              Desain jersey yang lebih berani untuk tim yang ingin tampil berbeda di lapangan.
            </p>
            <p className="fc-reveal mt-5 text-[15px] leading-[1.7] max-w-[520px]" style={{ color: "var(--fc-gray)" }}>
              Pilih dari koleksi desain fantasy yang modern, expressive, dan siap dikustomisasi dengan identitas tim kamu. Tambahkan logo, nama, nomor, sponsor, dan detail lainnya sesuai kebutuhan.
            </p>
            <div className="fc-reveal mt-9">
              <a href="#koleksi" className="fc-btn inline-flex items-center gap-3 text-[15px] px-8 py-4">PILIH DESAIN <span>→</span></a>
            </div>
            <div className="fc-reveal mt-6 fc-label flex flex-wrap items-center gap-x-3 gap-y-2" style={{ color: "var(--fc-gray)" }}>
              <span>CUSTOM LOGO</span><span style={{ color: "var(--fc-green)" }}>•</span>
              <span>NAMA</span><span style={{ color: "var(--fc-green)" }}>•</span>
              <span>NOMOR</span><span style={{ color: "var(--fc-green)" }}>•</span>
              <span>SPONSOR</span>
            </div>
            <div className="fc-reveal mt-12 pt-6 border-t fc-hair flex items-center justify-between max-w-[520px] fc-label" style={{ color: "var(--fc-gray)" }}>
              <span>FANTASY FOOTBALL COLLECTION / 2026</span>
              <span>NO. 011</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="fc-num absolute -top-6 md:-top-12 left-0 lg:-left-16 text-[34vw] lg:text-[22vw] select-none pointer-events-none" style={{ color: "rgba(243,240,232,0.05)" }}>23</div>
            <div className="fc-reveal relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/landing/fantasy-club/02e49952-8984-4f27-bf83-fddbbe1c4a8b.png" alt="Jersey Fantasy Club charcoal dengan sash electric green" className="relative w-full max-w-[620px] mx-auto" />
            </div>
            <div className="fc-reveal hidden md:flex absolute bottom-2 right-0 items-center gap-3 fc-label" style={{ color: "var(--fc-gray)" }}>
              <span className="inline-block w-16 h-px" style={{ background: "rgba(166,168,170,0.4)" }} />FC / 2026
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="relative" style={{ background: "var(--fc-cream)", color: "var(--fc-charcoal)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-24 md:py-40 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-1">
            <div className="fc-num text-[64px] md:text-[92px]" style={{ color: "rgba(23,25,28,0.14)" }}>02</div>
          </div>
          <div className="lg:col-span-7 lg:col-start-3">
            <h2 className="fc-reveal fc-display text-[clamp(40px,7vw,86px)]">
              TAMPIL <span style={{ color: "var(--fc-green)" }}>BEDA.</span><br />MAIN LEBIH PERCAYA DIRI.
            </h2>
            <p className="fc-reveal mt-8 max-w-[560px] text-[16px] md:text-[17px] leading-[1.75]" style={{ color: "rgba(23,25,28,0.72)" }}>
              Fantasy Club dibuat untuk kamu yang tidak ingin memakai desain jersey yang terasa generik. Setiap desain membawa karakter visual yang lebih berani, modern, dan siap menjadi identitas baru untuk tim kamu.
            </p>
          </div>
          <div className="lg:col-span-10 lg:col-start-3 mt-10 md:mt-20 border-t" style={{ borderColor: "rgba(23,25,28,0.14)" }}>
            <div className="fc-reveal fc-display text-[clamp(48px,13vw,150px)] pt-6 md:pt-10 leading-[.85]">BOLD</div>
            <div className="fc-reveal fc-display text-[clamp(48px,13vw,150px)] leading-[.85] lg:pl-[18%]" style={{ color: "rgba(23,25,28,0.35)" }}>CREATIVE</div>
            <div className="fc-reveal fc-display text-[clamp(48px,13vw,150px)] leading-[.85] lg:pl-[36%]">UNIQUE</div>
          </div>
        </div>
      </section>

      {/* COLLECTION — from Supabase */}
      <section id="koleksi" className="relative fc-noise" style={{ background: "var(--fc-charcoal)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 className="fc-reveal fc-display mt-6 text-[clamp(38px,6.4vw,80px)]">PILIH DESAIN<br />YANG PUNYA KARAKTER.</h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="fc-reveal text-[15px] leading-[1.7]" style={{ color: "var(--fc-gray)" }}>{collection.length}+ desain Fantasy Club siap dipilih dan dikustomisasi sesuai identitas tim kamu.</p>
            </div>
          </div>

          {/* Modern grid — alternating vertical offset */}
          <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {collection.map((item, i) => (
              <a
                key={item.code}
                href="#custom"
                className={`fc-card fc-reveal group block ${i % 2 === 1 ? "md:mt-12" : ""}`}
              >
                <div className="fc-frame relative overflow-hidden rounded-xl" style={{ background: "var(--fc-black)" }}>
                  <div className="aspect-[4/5] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="fc-label text-[10px]" style={{ color: "var(--fc-green)" }}>PILIH DESAIN →</span>
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <div className="fc-label text-[10px] md:text-[11px]" style={{ color: "var(--fc-green)" }}>{item.code}</div>
                  <div className="fc-cname fc-display text-[14px] md:text-[16px] mt-1 leading-tight">{item.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HARGA */}
      <section id="harga" style={{ background: "var(--fc-cream)", color: "var(--fc-charcoal)" }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-24 md:py-36">
          <div className="text-center max-w-[720px] mx-auto">
            <h2 className="fc-reveal fc-display mt-6 text-[clamp(38px,6.4vw,76px)]">HARGA JERSEY<br /><span style={{ color: "var(--fc-green)" }}>FANTASY CLUB.</span></h2>
            <p className="fc-reveal mt-5 text-[15px] md:text-[16px] leading-[1.7]" style={{ color: "rgba(23,25,28,0.7)" }}>Semua harga sudah termasuk desain, printing, nama dan nomor. Pilih jumlah pesanan, harga langsung menyesuaikan.</p>
          </div>

          <div className="fc-reveal mt-10 md:mt-14">
            <PriceToggle active={qty} onChange={setQty} />
          </div>

          <div className="fc-reveal mt-14 md:mt-20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-14">
              {/* Paket A */}
              <div className="pt-8 border-t-2" style={{ borderColor: "rgba(23,25,28,0.25)" }}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="fc-display text-[clamp(26px,3.2vw,36px)]">ATASAN SAJA</h3>
                  <span className="fc-label" style={{ color: "rgba(23,25,28,0.5)" }}>PAKET A</span>
                </div>
                <p className="mt-2 text-[14px]" style={{ color: "rgba(23,25,28,0.6)" }}>Atasan full printing, siap dikustom.</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="fc-display text-[20px] pb-3" style={{ color: "rgba(23,25,28,0.55)" }}>RP</span>
                  <span className="fc-num text-[clamp(60px,8vw,92px)]">{price.atasan}</span>
                </div>
                <div className="fc-label mt-1" style={{ color: "rgba(23,25,28,0.55)" }}>PER PCS</div>
                {price.small && <div className="mt-3 text-[13px] leading-[1.6]" style={{ color: "rgba(23,25,28,0.55)" }}>{price.small}</div>}
                <ul className="mt-7 space-y-3 text-[14.5px]" style={{ color: "rgba(23,25,28,0.78)" }}>
                  {price.benefits.map((b, i) => (
                    <li key={i} className="flex gap-3"><span style={{ color: "var(--fc-green)" }}>✓</span><span>{b}</span></li>
                  ))}
                </ul>
                <a href="#final" className="fc-outline-btn inline-flex items-center justify-center gap-2 w-full md:w-auto mt-8 fc-display text-[14px] px-8 py-4">PILIH PAKET A <span>→</span></a>
              </div>

              {/* Paket B */}
              <div className="pt-8 border-t-2 relative" style={{ borderColor: "var(--fc-green)" }}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="fc-display text-[clamp(26px,3.2vw,36px)]">ATASAN + CELANA</h3>
                  <span className="fc-label px-2 py-[4px]" style={{ background: "var(--fc-green)", color: "var(--fc-black)" }}>PALING DIPILIH</span>
                </div>
                <p className="mt-2 text-[14px]" style={{ color: "rgba(23,25,28,0.6)" }}>Satu set lengkap siap tanding.</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="fc-display text-[20px] pb-3" style={{ color: "rgba(23,25,28,0.55)" }}>RP</span>
                  <span className="fc-num text-[clamp(60px,8vw,92px)]" style={{ color: "var(--fc-green)" }}>{price.setelan}</span>
                </div>
                <div className="fc-label mt-1" style={{ color: "rgba(23,25,28,0.55)" }}>PER SET (ATASAN + CELANA)</div>
                {price.small && <div className="mt-3 text-[13px] leading-[1.6]" style={{ color: "rgba(23,25,28,0.55)" }}>{price.small}</div>}
                <ul className="mt-7 space-y-3 text-[14.5px]" style={{ color: "rgba(23,25,28,0.78)" }}>
                  {price.benefits.map((b, i) => (
                    <li key={i} className="flex gap-3"><span style={{ color: "var(--fc-green)" }}>✓</span><span>{b}</span></li>
                  ))}
                  <li className="flex gap-3"><span style={{ color: "var(--fc-green)" }}>✓</span><span>Celana non printing</span></li>
                </ul>
                <a href="#final" className="fc-btn inline-flex items-center justify-center gap-2 w-full md:w-auto mt-8 text-[14px] px-8 py-4">PILIH PAKET B <span>→</span></a>
              </div>
            </div>
          </div>

          <div className="fc-reveal mt-16 pt-8 border-t text-center fc-label flex flex-wrap justify-center gap-x-8 gap-y-3" style={{ borderColor: "rgba(23,25,28,0.16)", color: "rgba(23,25,28,0.55)" }}>
            <span>SISTEM PRE ORDER, BUKAN READY STOCK</span>
            <span>ATASAN FULL PRINTING · CELANA NON PRINTING</span>
            <span>PENGERJAAN 5–7 HARI KERJA</span>
            <span>GRATIS CUSTOM, NAMESET, LOGO &amp; SPONSOR</span>
          </div>
        </div>
      </section>

      {/* BAHAN */}
      <section id="bahan" className="relative fc-noise" style={{ background: "var(--fc-charcoal)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <div className="fc-label" style={{ color: "var(--fc-green)" }}>BAHAN KAIN</div>
              <h2 className="fc-reveal fc-display mt-4 text-[clamp(30px,4.6vw,58px)]">DRY-FIT BERKUALITAS,<br />STANDAR <span style={{ color: "var(--fc-green)" }}>LIGA PRO.</span></h2>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <p className="fc-reveal text-[15px] md:text-[16px] leading-[1.7]" style={{ color: "var(--fc-gray)" }}>
                Bahan kain yang digunakan dry-fit yang berkualitas dan sudah standar liga pro, nyaman dan tidak bau.
              </p>
              <div className="fc-reveal flex flex-wrap gap-x-8 gap-y-3 fc-label pt-4 border-t fc-hair" style={{ color: "var(--fc-gray)" }}>
                <span>NYAMAN DIPAKAI</span>
                <span>TIDAK BAU</span>
                <span>STANDAR LIGA PRO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section id="keunggulan" style={{ background: "var(--fc-cream)", color: "var(--fc-charcoal)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <h2 className="fc-reveal fc-display mt-6 text-[clamp(38px,6.4vw,80px)]">SATU DESAIN.<br />BANYAK KARAKTER.</h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="fc-reveal text-[16px] leading-[1.75]" style={{ color: "rgba(23,25,28,0.72)" }}>Tidak semua tim ingin terlihat sama. Fantasy Club memberikan pilihan desain dengan warna, pattern, dan karakter visual yang lebih ekspresif agar jersey kamu terasa lebih personal.</p>
            </div>
          </div>

          <div className="mt-16 md:mt-24 grid md:grid-cols-4 gap-x-8 gap-y-12 border-t" style={{ borderColor: "rgba(23,25,28,0.16)" }}>
            {KEUNGGULAN.map((k, i) => (
              <div key={i} className={`fc-reveal pt-8 ${i < 3 ? "md:border-r md:pr-8" : ""}`} style={{ borderColor: "rgba(23,25,28,0.16)" }}>
                <div className="fc-num text-[56px]" style={{ color: i === 0 ? "var(--fc-green)" : "rgba(23,25,28,0.22)" }}>{k.num}</div>
                <h3 className="fc-display text-[22px] mt-3">{k.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7]" style={{ color: "rgba(23,25,28,0.68)" }}>{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM IDENTITY */}
      <section className="relative fc-noise overflow-hidden" style={{ background: "var(--fc-charcoal)" }}>
        <div className="absolute inset-0 fc-grid-lines opacity-40" />
        <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <h2 className="fc-reveal fc-display mt-6 text-[clamp(36px,5.6vw,72px)]">DESAIN BOLEH FANTASY.<br />IDENTITAS TETAP <span style={{ color: "var(--fc-green)" }}>PUNYA KAMU.</span></h2>
              <p className="fc-reveal mt-6 max-w-[460px] text-[15px] leading-[1.75]" style={{ color: "var(--fc-gray)" }}>Mulai dari desain dasar hingga detail terakhir, jersey dapat disesuaikan dengan identitas tim kamu.</p>
            </div>
          </div>

          <div className="relative mt-12 md:mt-16 grid lg:grid-cols-12 items-center gap-8">
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-16 text-right">
              <div className="fc-reveal">
                <div className="fc-display text-[30px]">LOGO</div>
                <div className="ml-auto mt-3 h-px w-[70%]" style={{ background: "linear-gradient(90deg,transparent,var(--fc-green))" }} />
              </div>
              <div className="fc-reveal">
                <div className="fc-display text-[30px]">NAMA</div>
                <div className="ml-auto mt-3 h-px w-[85%]" style={{ background: "linear-gradient(90deg,transparent,rgba(166,168,170,0.5))" }} />
              </div>
            </div>

            <div className="lg:col-span-6 fc-reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/landing/fantasy-club/570faad1-9827-4ba4-86a1-b420ff83402f.png" alt="Bagian belakang jersey Fantasy Club dengan nameset dan nomor" className="w-full max-w-[560px] mx-auto" />
            </div>

            <div className="hidden lg:flex lg:col-span-3 flex-col gap-16">
              <div className="fc-reveal">
                <div className="fc-display text-[30px]">NUMBER</div>
                <div className="mt-3 h-px w-[85%]" style={{ background: "linear-gradient(270deg,transparent,var(--fc-green))" }} />
              </div>
              <div className="fc-reveal">
                <div className="fc-display text-[30px]">SPONSOR</div>
                <div className="mt-3 h-px w-[70%]" style={{ background: "linear-gradient(270deg,transparent,rgba(166,168,170,0.5))" }} />
              </div>
            </div>

            <div className="lg:hidden grid grid-cols-2 gap-y-6 fc-label" style={{ color: "var(--fc-gray)" }}>
              <span>LOGO</span><span>NAMA</span><span>NUMBER</span><span>SPONSOR</span>
            </div>
          </div>

          <div className="fc-reveal mt-14 md:mt-20 pt-8 border-t fc-hair">
            <div className="fc-display text-[clamp(28px,4.4vw,54px)] leading-[1.02]">
              YOUR TEAM.<br /><span style={{ color: "var(--fc-gray)" }}>YOUR COLORS.</span><br /><span style={{ color: "var(--fc-green)" }}>YOUR IDENTITY.</span>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM PROCESS */}
      <section id="custom" style={{ background: "var(--fc-cream)", color: "var(--fc-charcoal)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 className="fc-reveal fc-display mt-6 text-[clamp(38px,6.4vw,80px)]">DARI DESAIN<br />JADI JERSEY TIMMU.</h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="fc-reveal text-[15px] leading-[1.7]" style={{ color: "rgba(23,25,28,0.7)" }}>Proses custom dibuat sederhana supaya kamu bisa fokus memilih desain yang paling cocok.</p>
            </div>
          </div>

          <div className="mt-16 md:mt-24 relative">
            <div className="hidden md:block absolute top-[30px] left-0 right-0 h-px" style={{ background: "rgba(23,25,28,0.18)" }} />
            <div className="md:hidden absolute top-0 bottom-0 left-[10px] w-px" style={{ background: "rgba(23,25,28,0.18)" }} />
            <div className="grid md:grid-cols-4 gap-x-8 gap-y-10">
              {STEPS.map((s, i) => (
                <div key={i} className="fc-reveal relative pl-10 md:pl-0">
                  <div className="absolute md:static left-0 top-[10px] w-[9px] h-[9px] md:mb-6" style={{ background: i === 0 ? "var(--fc-green)" : "rgba(23,25,28,0.35)" }} />
                  <div className="fc-num text-[52px] md:mt-0 mt-1" style={{ color: i === 0 ? "var(--fc-green)" : "rgba(23,25,28,0.22)" }}>{s.num}</div>
                  <h3 className="fc-display text-[22px] mt-3">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.7] pr-6" style={{ color: "rgba(23,25,28,0.68)" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UNTUK SIAPA */}
      <section className="relative fc-noise" style={{ background: "var(--fc-charcoal)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <h2 className="fc-reveal fc-display mt-6 text-[clamp(36px,5.6vw,72px)]">DIBUAT UNTUK<br />TIM YANG TIDAK MAU TERLIHAT BIASA.</h2>
            </div>
          </div>

          <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              {AUDIENCES.map((a, i) => (
                <a
                  key={a}
                  href="#custom"
                  className={`fc-aud fc-reveal block border-t fc-hair py-4 md:py-5 relative ${i === AUDIENCES.length - 1 ? "border-b" : ""}`}
                >
                  <span className="fc-display text-[clamp(30px,5.6vw,64px)]">{a}</span>
                  <span className="fc-rule absolute bottom-0 left-0 right-0 h-px" style={{ background: "var(--fc-green)" }} />
                </a>
              ))}
            </div>
            <div className="lg:col-span-3 lg:col-start-10 flex flex-col justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/landing/fantasy-club/12350b65-0336-4827-a052-f3e82af059ab.png" alt="Detail printing dan nameset jersey" className="w-full border fc-hair" />
              <p className="fc-reveal mt-6 text-[15px] leading-[1.75]" style={{ color: "var(--fc-gray)" }}>Untuk tim kecil, komunitas, akademi, hingga squad turnamen. Selama kamu punya karakter, kami bantu menerjemahkannya menjadi jersey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSPIRASI */}
      <section id="inspirasi" style={{ background: "var(--fc-cream)", color: "var(--fc-charcoal)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-24 md:py-36 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <h2 className="fc-reveal fc-display mt-6 text-[clamp(38px,6.2vw,78px)]">PUNYA REFERENSI SENDIRI?</h2>
            <p className="fc-reveal mt-6 text-[clamp(17px,2vw,21px)] leading-[1.4] max-w-[480px]">Kirim referensi, logo, atau warna yang kamu inginkan.</p>
            <p className="fc-reveal mt-5 max-w-[520px] text-[15px] leading-[1.75]" style={{ color: "rgba(23,25,28,0.7)" }}>Tidak menemukan desain yang pas dari koleksi kami? Tidak masalah. Kamu bisa mengirim referensi desain atau kombinasi warna yang kamu suka untuk dikembangkan menjadi jersey yang sesuai dengan karakter tim kamu.</p>
            <a href="#final" className="fc-btn fc-reveal inline-flex items-center gap-3 text-[14px] px-7 py-3.5 mt-8">KIRIM REFERENSI <span>→</span></a>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-2 gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/landing/fantasy-club/12350b65-0336-4827-a052-f3e82af059ab.png" alt="Close-up detail printing jersey" className="fc-reveal col-span-2 w-full object-cover aspect-[3/2]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/landing/fantasy-club/02e49952-8984-4f27-bf83-fddbbe1c4a8b.png" alt="Detail jersey fantasy" className="fc-reveal w-full object-cover aspect-square" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/landing/fantasy-club/570faad1-9827-4ba4-86a1-b420ff83402f.png" alt="Detail nameset jersey" className="fc-reveal w-full object-cover aspect-square" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="final" className="relative fc-noise overflow-hidden" style={{ background: "var(--fc-charcoal)" }}>
        <div className="absolute inset-0 fc-grid-lines opacity-50" />
        <div className="fc-diag" style={{ top: "20%", left: "-5%", width: "60%" }} />
        <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 py-28 md:py-44 text-center">
          <h2 className="fc-reveal fc-display text-[clamp(44px,9.5vw,140px)]">
            SIAP BIKIN<br />JERSEY YANG<br />BENER-BENER<br />PUNYA <span style={{ color: "var(--fc-green)" }}>KARAKTER?</span>
          </h2>
          <p className="fc-reveal mt-8 max-w-[620px] mx-auto text-[16px] md:text-[18px] leading-[1.6]" style={{ color: "var(--fc-gray)" }}>
            Pilih desain Fantasy Club favoritmu dan ubah menjadi jersey dengan identitas tim kamu sendiri.
          </p>
          <a href="#koleksi" className="fc-btn fc-reveal inline-flex items-center gap-3 text-[16px] px-10 py-5 mt-10">PILIH DESAIN <span>→</span></a>
          <div className="fc-reveal fc-label mt-6" style={{ color: "var(--fc-gray)" }}>CUSTOM LOGO • NAMA • NOMOR • SPONSOR</div>
        </div>
        <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 pb-14">
          <div className="border-t fc-hair pt-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between fc-label" style={{ color: "var(--fc-gray)" }}>
            <span className="fc-display text-[22px]" style={{ color: "var(--fc-cream)" }}>FANTASY CLUB</span>
            <span>FOOTBALL APPAREL / 2026</span>
          </div>
        </div>
      </section>
    </div>
  );
}
