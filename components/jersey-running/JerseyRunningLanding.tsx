"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/wa";
import "./jersey-running.css";

interface Product {
  id: string;
  catalogue: string;
  image: string;
  alt: string;
}

interface Props {
  products: Product[];
  waNumber: string;
}

const WA_NUMBER_DEFAULT = "628115491117";

const TRUST_ITEMS = [
  "Langsung Dari Pabrik",
  "Bisa Order Satuan",
  "Gratis Desain + Revisi Bebas",
  "Bahan Dry Fit Premium",
];

const FAQS = [
  {
    q: "Berapa harga jersey running custom?",
    a: "Atasan Rp95.000/pcs untuk satuan dan Rp85.000/pcs untuk pembelian lusinan. Setelan (jersey + celana) Rp145.000 satuan dan Rp120.000 lusinan. Untuk order 50 pcs ke atas ada harga khusus, silakan hubungi admin.",
  },
  {
    q: "Minimal ordernya berapa pcs?",
    a: "Order satuan bisa mulai 1 pcs dengan memilih desain dari katalog TNT-RUN. Kalau mau desain custom dari nol untuk tim, minimalnya 6 pcs.",
  },
  {
    q: "Bisa custom nama dan nomor bib sendiri?",
    a: "Bisa. Nama pelari, nomor dada, dan logo tim bisa dicustom, bahkan untuk order 1 pcs. Nama tiap anggota tim juga bisa dibuat berbeda-beda dalam satu batch order.",
  },
  {
    q: "Berapa lama proses produksinya?",
    a: "Lama produksi tergantung jumlah order dan tingkat kerumitan desain. Karena kami produksi sendiri di pabrik, estimasi waktu yang pasti akan diinformasikan admin saat desain sudah di-ACC. Silakan chat admin untuk cek jadwal produksi terkini.",
  },
  {
    q: "Gimana cara ordernya?",
    a: "Lima langkah: chat admin via WhatsApp, pilih dari katalog atau kirim desainmu, ACC desain lalu bayar DP, jersey masuk produksi, terakhir dikirim ke alamatmu. Desain dan revisinya gratis.",
  },
];

const TESTIMONIALS = [
  {
    initials: "AR",
    name: "Andri",
    team: "Komunitas Lari Jogja",
    city: "Yogyakarta",
    quote: "Bahannya adem banget, dipake lari 10K tetap nyaman. Desainnya juga persis request tim kami.",
  },
  {
    initials: "RW",
    name: "Rizky",
    team: "Runners Surabaya",
    city: "Surabaya",
    quote: "Order 12 pcs buat tim lari, semua ukuran pas. Hasil printing tajam dan nomor bib tidak mengelupas.",
  },
  {
    initials: "DP",
    name: "Dimas",
    team: "Marathon Bandung",
    city: "Bandung",
    quote: "Order satuan dulu buat tes, hasilnya langsung oke. Sekarang tim kami sudah pesan ulang untuk seluruh anggota.",
  },
];

const GALLERY_IMAGES = [
  { src: "/landing/jersey-futsal/4c090b09-6b9d-4d9a-a061-ca955c49c520.png", alt: "Tim pelari memakai jersey running custom di event marathon" },
  { src: "/landing/jersey-futsal/93c90d93-45be-4137-b10d-d810ada22df4.png", alt: "Komunitas lari memakai jersey custom kuning" },
  { src: "/landing/jersey-futsal/0cde4945-3487-4e3d-ba70-e94156ac55e3.png", alt: "Pelari memakai jersey custom lengan panjang merah" },
  { src: "/landing/jersey-futsal/3af292c0-b13f-4a74-b94e-c0b6885f633c.png", alt: "Tim lari memakai jersey custom maroon" },
  { src: "/landing/jersey-futsal/21bccec1-b05a-464e-bc44-54cb90c01dde.png", alt: "Pelari muda memakai jersey custom biru" },
];

const CUSTOMIZATION_POINTS = [
  { id: 1, title: "Logo Tim", desc: "Logo komunitas atau tim lari kamu, dicetak tajam full printing.", left: "39%", top: "25%" },
  { id: 2, title: "Nomor Dada", desc: "Nomor bib langsung tercetak di jersey, nggak perlu ditempel.", left: "45%", top: "36%" },
  { id: 3, title: "Nama Pelari", desc: "Nama masing-masing anggota, beda tiap jersey tanpa biaya tambahan.", left: "34%", top: "55%" },
  { id: 4, title: "Panel Sponsor", desc: "Area khusus buat logo sponsor atau partner event.", left: "48%", top: "47%" },
  { id: 5, title: "Warna Tim", desc: "Kombinasi warna bebas, disesuaikan sama identitas tim kamu.", left: "25%", top: "44%" },
  { id: 6, title: "Area Lengan", desc: "Bisa diisi logo kecil, nama event, atau aksen warna tambahan.", left: "58%", top: "27%" },
];

const SPECS = [
  { label: "Bahan", value: "Dry Fit Premium", desc: "Adem dan menyerap keringat." },
  { label: "Bobot", value: "Ringan", desc: "Nggak berat waktu dipakai lari jauh." },
  { label: "Printing", value: "Full Printing", desc: "Desain tercetak sampai ke seluruh bagian." },
  { label: "Ukuran", value: "Unisex", desc: "Bisa dipakai pelari pria maupun wanita." },
  { label: "Model", value: "Lengan Pendek", desc: "Potongan standar jersey running." },
  { label: "Cocok Untuk", value: "Marathon · Trail · Lari Pagi", desc: "Dari latihan rutin sampai race day." },
];

const STEPS = [
  { num: "01", title: "Chat Admin", desc: "Hubungi via WhatsApp, ceritain kebutuhan tim kamu." },
  { num: "02", title: "Pilih/Kirim Desain", desc: "Pilih dari katalog atau kirim ide desainmu sendiri." },
  { num: "03", title: "ACC & DP", desc: "Setujui hasil desain, lalu lakukan pembayaran DP." },
  { num: "04", title: "Produksi", desc: "Jersey diproduksi langsung di pabrik kami." },
  { num: "05", title: "Kirim", desc: "Dikirim ke alamatmu, siap dipakai lari." },
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".jersey-running .reveal:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en, i) => {
          if (en.isIntersecting) {
            const delay = Math.min(i * 70, 280);
            setTimeout(() => en.target.classList.add("is-in"), delay);
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

export default function JerseyRunningLanding({ products, waNumber }: Props) {
  useScrollReveal();
  const [priceMode, setPriceMode] = useState<"ecer" | "lusin">("ecer");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [catalogLightbox, setCatalogLightbox] = useState<number | null>(null);
  const [galleryLightbox, setGalleryLightbox] = useState<number | null>(null);
  const trustTrackRef = useRef<HTMLDivElement>(null);
  const trustPaused = useRef(false);

  // Trust bar marquee
  useEffect(() => {
    const track = trustTrackRef.current;
    if (!track) return;
    let pos = 0;
    let raf: number;
    const speed = 0.6;
    const animate = () => {
      if (!trustPaused.current) {
        pos -= speed;
        const half = track.scrollWidth / 2;
        if (Math.abs(pos) >= half) pos = 0;
        track.style.transform = `translateX(${pos}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const waLink = useCallback(
    (msg: string) => buildWhatsAppLink(waNumber || WA_NUMBER_DEFAULT, msg),
    [waNumber]
  );

  const prices = {
    ecer: { atasan: "95RB", setelan: "145RB", labelAtasan: "Bisa pesan mulai 1 pcs", labelSetelan: "Bisa pesan mulai 1 set", note: "Order 12 pcs ke atas, hemat sampai Rp25.000/pcs" },
    lusin: { atasan: "85RB", setelan: "120RB", labelAtasan: "Minimal pembelian 12 pcs", labelSetelan: "Minimal pembelian 12 set", note: "Harga lusinan aktif — hemat Rp10.000/pcs & Rp25.000/set" },
  };

  const handleHotspotHover = (id: number) => {
    setActiveHotspot(id);
  };

  return (
    <div className="jersey-running">
      {/* ===== 1. HERO ===== */}
      <section id="top" className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0 tex-grid opacity-70" aria-hidden="true" />
        <div className="absolute inset-0 tex-speed fade-edges" aria-hidden="true" />
        <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full blur-2xl" style={{ background: "radial-gradient(circle,rgba(255,122,69,0.22),transparent 65%)" }} aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="reveal">
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[var(--line-strong)] bg-white px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-kicker text-[0.72rem] uppercase tracking-[0.2em] text-[var(--muted)]">Est. 2017 · Yogyakarta, Indonesia</span>
              </div>

              <h1 className="font-display text-[2.1rem] leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.85rem]">
                Jersey Running Custom,<br className="hidden sm:block" />
                Ringan &amp; Nyaman<br className="hidden sm:block" />
                <span className="text-sunrise">Sepanjang Larimu</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Full printing tajam, bahan Dry Fit Premium. Custom nama, nomor bib, dan logo tim sendiri.
              </p>

              <div className="mt-7 flex flex-wrap items-end gap-x-3 gap-y-1">
                <span className="font-kicker text-sm uppercase tracking-[0.18em] text-[var(--muted-2)]">Mulai</span>
                <span className="font-display text-3xl text-[var(--text)] sm:text-4xl">Rp85.000</span>
                <span className="font-kicker pb-1 text-lg text-[var(--muted)]">/pcs</span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={waLink("Halo TNT Sport Apparel, saya mau order jersey running custom.")}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary px-7 py-4 text-base"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.13h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 01-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.24-8.23 8.24zm4.53-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" /></svg>
                  Order via WhatsApp
                </a>
                <a href="#harga" className="btn btn-ghost px-7 py-4 text-base">Lihat Harga &amp; Katalog</a>
              </div>
            </div>

            <div className="reveal relative">
              <div className="absolute -inset-3 rounded-2xl blur-xl" style={{ background: "radial-gradient(circle at 60% 35%,rgba(255,77,141,0.26),transparent 70%)" }} aria-hidden="true" />
              <figure className="relative overflow-hidden rounded-2xl border border-[var(--line-strong)]">
                <img
                  src="/landing/jersey-running/fb2db85b-08bb-4b93-b864-51e7c9ef1d6f.png"
                  alt="Dua pelari mengenakan jersey running custom TNT Sport Apparel saat matahari terbit"
                  width={1856}
                  height={2304}
                  className="h-full w-full object-cover aspect-[4/5] lg:aspect-[4/4.4]"
                />
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1a1a1a]/70 to-transparent p-5">
                  <p className="font-kicker text-xs uppercase tracking-[0.2em] text-white/90">Dry Fit Premium · Full Printing</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. TRUST BAR (Marquee) ===== */}
      <section className="relative border-y border-[var(--line)] bg-[var(--ink-2)]">
        <div className="absolute inset-0 tex-speed-soft" aria-hidden="true" />
        <div
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden"
          onMouseEnter={() => { trustPaused.current = true; }}
          onMouseLeave={() => { trustPaused.current = false; }}
        >
          <div className="mq-wrap py-5 lg:py-5">
            <div ref={trustTrackRef} className="mq-track">
              {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 px-6 shrink-0">
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true"><path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="text-sm font-semibold uppercase tracking-[0.08em] sm:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. KENAPA PILIH KAMI ===== */}
      <section id="keunggulan" className="relative py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 tex-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-2xl">
            <p className="kicker">Kenapa Pilih Kami</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
              Dibuat Buat Pelari,<br />Bukan Sekadar Kaos Olahraga
            </h2>
            <div className="rule-accent mt-5" />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <article className="card card-hover reveal p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true"><path d="M12 3s5 4.5 5 9a5 5 0 11-10 0c0-4.5 5-9 5-9z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" /></svg>
              </div>
              <h3 className="font-display text-lg">Bahan Dry Fit Premium</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-[var(--muted)]">
                Adem, menyerap keringat, nyaman buat gerakan repetitif kayak lari.
              </p>
            </article>

            <article className="card card-hover reveal p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg>
              </div>
              <h3 className="font-display text-lg">Bisa Satuan Tanpa Minimal</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-[var(--muted)]">
                Order 1 pcs pun tetap bisa custom nama, nomor bib, dan logo.
              </p>
            </article>

            <article className="card card-hover reveal p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.9" /><circle cx="16.5" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.7" /><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6S14 16 14.6 19M16 14.2c2.2.3 3.8 1.8 4.3 4.3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg>
              </div>
              <h3 className="font-display text-lg">Desain Identitas Tim</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-[var(--muted)]">
                Custom desain dari nol buat komunitas/tim lari kamu.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== 4. PILIHAN ORDER ===== */}
      <section id="pilihan" className="relative border-y border-[var(--line)] bg-[var(--ink-2)] py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 tex-speed-soft" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-2xl">
            <p className="kicker">Pilihan Order</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">Pilih Cara Ordermu</h2>
            <div className="rule-accent mt-5" />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="card card-hover reveal relative overflow-hidden p-7 sm:p-8">
              <span className="absolute right-5 top-5 rounded-full bg-[image:var(--grad-sunrise)] px-3 py-1 font-kicker text-[0.68rem] uppercase tracking-[0.16em] text-white">Untuk Tim</span>
              <p className="font-kicker text-sm uppercase tracking-[0.18em] text-[var(--muted-2)]">Min. 6 pcs</p>
              <h3 className="mt-2 font-display text-2xl">Custom Full Team</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-[var(--muted)]">
                Desain dari nol, logo tim, warna bebas.
              </p>
              <ul className="mt-6 space-y-2.5 text-[0.95rem] text-[var(--muted)]">
                <li className="flex gap-2.5"><span className="text-[var(--accent)]">✓</span> Desain dibuat dari nol sesuai identitas tim</li>
                <li className="flex gap-2.5"><span className="text-[var(--accent)]">✓</span> Logo tim &amp; panel sponsor</li>
                <li className="flex gap-2.5"><span className="text-[var(--accent)]">✓</span> Kombinasi warna bebas</li>
                <li className="flex gap-2.5"><span className="text-[var(--accent)]">✓</span> Gratis desain + revisi bebas</li>
              </ul>
              <a
                href={waLink("Halo, saya mau order Custom Full Team (min. 6 pcs) jersey running.")}
                target="_blank"
                rel="noopener"
                className="btn btn-primary mt-7 w-full py-3.5"
              >
                Konsultasi Desain Tim
              </a>
            </article>

            <article className="card card-hover reveal p-7 sm:p-8">
              <p className="font-kicker text-sm uppercase tracking-[0.18em] text-[var(--muted-2)]">Mulai 1 pcs</p>
              <h3 className="mt-2 font-display text-2xl">Order Satuan</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-[var(--muted)]">
                Pilih dari katalog, custom nama/nomor bib/logo.
              </p>
              <ul className="mt-6 space-y-2.5 text-[0.95rem] text-[var(--muted)]">
                <li className="flex gap-2.5"><span className="text-[var(--accent)]">✓</span> Tanpa minimal order</li>
                <li className="flex gap-2.5"><span className="text-[var(--accent)]">✓</span> Pilih desain dari katalog TNT-RUN</li>
                <li className="flex gap-2.5"><span className="text-[var(--accent)]">✓</span> Custom nama &amp; nomor bib</li>
                <li className="flex gap-2.5"><span className="text-[var(--accent)]">✓</span> Bisa tambah logo sendiri</li>
              </ul>
              <a
                href={waLink("Halo, saya mau order satuan jersey running dari katalog.")}
                target="_blank"
                rel="noopener"
                className="btn btn-ghost mt-7 w-full py-3.5"
              >
                Order Satuan
              </a>
            </article>
          </div>

          {/* Comparison label */}
          <p className="reveal mt-14 text-center font-kicker text-sm uppercase tracking-[0.18em] text-[var(--muted-2)]">
            Bandingkan Berdampingan
          </p>

          {/* Desktop: table */}
          <div className="reveal cmp-wrap mt-5 hidden md:block">
            <table className="cmp w-full text-[0.95rem]">
              <caption className="sr-only">Perbandingan Custom Full Team dan Order Satuan</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[28%]"><span className="sr-only">Kriteria</span></th>
                  <th scope="col" className="cmp-col-hi w-[36%]">
                    <span className="cmp-coltitle">Custom Full Team</span>
                    <span className="cmp-colnote">Min. 6 pcs</span>
                  </th>
                  <th scope="col" className="w-[36%]">
                    <span className="cmp-coltitle">Order Satuan</span>
                    <span className="cmp-colnote">Mulai 1 pcs</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr><th scope="row">Minimal order</th><td className="cmp-col-hi"><strong>6 pcs</strong></td><td><strong>1 pcs</strong></td></tr>
                <tr><th scope="row">Desain</th><td className="cmp-col-hi">Dibuat dari nol sesuai brief tim</td><td>Pilih dari katalog TNT-RUN 01–06</td></tr>
                <tr><th scope="row">Warna</th><td className="cmp-col-hi">Bebas, sesuai warna tim</td><td>Mengikuti desain katalog</td></tr>
                <tr><th scope="row">Logo tim</th><td className="cmp-col-hi"><span className="tick" aria-hidden="true">✓</span>Ya, termasuk panel sponsor</td><td><span className="tick" aria-hidden="true">✓</span>Bisa ditambahkan</td></tr>
                <tr><th scope="row">Nama &amp; nomor bib</th><td className="cmp-col-hi"><span className="tick" aria-hidden="true">✓</span>Ya, per anggota tim</td><td><span className="tick" aria-hidden="true">✓</span>Ya</td></tr>
                <tr><th scope="row">Gratis desain + revisi</th><td className="cmp-col-hi"><span className="tick" aria-hidden="true">✓</span>Ya, revisi bebas</td><td><span className="tick" aria-hidden="true">✓</span>Ya, revisi bebas</td></tr>
                <tr><th scope="row">Cocok untuk</th><td className="cmp-col-hi">Komunitas &amp; tim lari, event</td><td>Pelari individu, coba dulu</td></tr>
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards */}
          <div className="reveal mt-5 grid gap-4 md:hidden">
            <div className="cmp-m cmp-m-hi">
              <p className="cmp-m-title">Custom Full Team <span className="cmp-m-tag">Min. 6 pcs</span></p>
              <dl className="cmp-m-list">
                <div><dt>Desain</dt><dd>Dibuat dari nol sesuai brief tim</dd></div>
                <div><dt>Warna</dt><dd>Bebas, sesuai warna tim</dd></div>
                <div><dt>Logo tim</dt><dd>Ya, termasuk panel sponsor</dd></div>
                <div><dt>Nama &amp; nomor bib</dt><dd>Ya, per anggota tim</dd></div>
                <div><dt>Gratis desain + revisi</dt><dd>Ya, revisi bebas</dd></div>
                <div><dt>Cocok untuk</dt><dd>Komunitas &amp; tim lari, event</dd></div>
              </dl>
            </div>
            <div className="cmp-m">
              <p className="cmp-m-title">Order Satuan <span className="cmp-m-tag">Mulai 1 pcs</span></p>
              <dl className="cmp-m-list">
                <div><dt>Desain</dt><dd>Pilih dari katalog TNT-RUN 01–06</dd></div>
                <div><dt>Warna</dt><dd>Mengikuti desain katalog</dd></div>
                <div><dt>Logo tim</dt><dd>Bisa ditambahkan</dd></div>
                <div><dt>Nama &amp; nomor bib</dt><dd>Ya</dd></div>
                <div><dt>Gratis desain + revisi</dt><dd>Ya, revisi bebas</dd></div>
                <div><dt>Cocok untuk</dt><dd>Pelari individu, coba dulu</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. KATALOG ===== */}
      <section id="katalog" className="relative py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 tex-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="kicker">Katalog Desain</p>
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">Seri TNT-RUN</h2>
              <div className="rule-accent mt-5" />
              <p className="mt-5 text-[0.98rem] leading-relaxed text-[var(--muted)]">
                Semua desain bisa dicustom nama, nomor bib, dan logo tim. Warna bisa disesuaikan untuk order tim.
              </p>
            </div>
            <a
              href={waLink("Halo, saya mau lihat katalog lengkap jersey running TNT-RUN.")}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost px-6 py-3.5"
            >
              Minta Katalog Lengkap
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {products.map((p, i) => (
              <article key={p.id} className="card card-hover reveal overflow-hidden">
                <button
                  type="button"
                  className="thumb"
                  onClick={() => setCatalogLightbox(i)}
                  aria-label={`Lihat gambar ${p.catalogue}`}
                >
                  <img src={p.image} alt={p.alt} width={1024} height={1024} loading="lazy" />
                </button>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-display text-base">{p.catalogue}</h3>
                  </div>
                  <a
                    href={waLink(`Halo, saya tertarik desain ${p.catalogue}.`)}
                    target="_blank"
                    rel="noopener"
                    className="font-kicker text-xs uppercase tracking-[0.14em] text-[var(--accent)] hover:text-[var(--accent-deep)] transition-colors"
                  >
                    Order →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. DETAIL CUSTOMIZATION ===== */}
      <section id="kustomisasi" className="relative border-y border-[var(--line)] bg-[var(--ink-2)] py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 tex-speed-soft" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-2xl">
            <p className="kicker">Detail Kustomisasi</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">Semua Bagian Bisa Kamu Atur</h2>
            <div className="rule-accent mt-5" />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14 lg:items-center">
            <div className="reveal relative mx-auto w-full max-w-[520px]">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[#f4efec]">
                <img
                  src="/landing/jersey-running/29b651bd-1764-4c9e-814f-099f428a3103.jpg"
                  alt="Mockup jersey running TNT Sport Apparel tampak depan dan belakang dengan titik-titik area kustomisasi"
                  width={2474}
                  height={2474}
                  loading="lazy"
                  className="w-full"
                />
                {CUSTOMIZATION_POINTS.map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    className="hotspot"
                    style={{ left: pt.left, top: pt.top }}
                    data-hot={pt.id}
                    aria-label={pt.title}
                    onMouseEnter={() => handleHotspotHover(pt.id)}
                    onClick={() => handleHotspotHover(pt.id)}
                  >
                    {pt.id}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-center font-kicker text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">
                Klik titik untuk lihat detail
              </p>
            </div>

            <ul className="reveal space-y-3">
              {CUSTOMIZATION_POINTS.map((pt) => (
                <li key={pt.id}>
                  <div
                    className="card flex items-start gap-4 p-5 transition-colors"
                    style={activeHotspot === pt.id ? { borderColor: "rgba(255,122,69,0.6)", background: "rgba(255,122,69,0.08)" } : undefined}
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] font-kicker font-bold text-[var(--accent)]">{pt.id}</span>
                    <div>
                      <h3 className="font-display text-base">{pt.title}</h3>
                      <p className="mt-1.5 text-[0.94rem] leading-relaxed text-[var(--muted)]">{pt.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 7. SPESIFIKASI ===== */}
      <section id="spesifikasi" className="relative py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 tex-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-2xl">
            <p className="kicker">Spesifikasi</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">Detail Produk</h2>
            <div className="rule-accent mt-5" />
          </div>
          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SPECS.map((s, i) => (
              <div key={i} className="card reveal p-6">
                <dt className="font-kicker text-xs uppercase tracking-[0.18em] text-[var(--muted-2)]">{s.label}</dt>
                <dd className="mt-2 font-display text-lg">{s.value}</dd>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--muted)]">{s.desc}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ===== 8. HARGA ===== */}
      <section id="harga" className="relative border-y border-[var(--line)] bg-[var(--ink-2)] py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 tex-speed fade-edges opacity-70" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="kicker flex items-center gap-3"><span className="rule-accent" style={{ width: 26, height: 2 }} />Daftar Harga</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
              Pilih Paket <span className="text-sunrise">Tim Kamu</span>
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-[var(--muted)]">
              Harga sudah termasuk desain, full printing, nama &amp; nomor. Nggak ada biaya tersembunyi.
            </p>

            <div className="seg mt-7" role="tablist" aria-label="Pilih tipe harga">
              <button type="button" role="tab" aria-selected={priceMode === "ecer"} onClick={() => setPriceMode("ecer")}>
                Ecer
              </button>
              <button type="button" role="tab" aria-selected={priceMode === "lusin"} onClick={() => setPriceMode("lusin")}>
                Lusinan · Hemat
              </button>
            </div>
            <p className="mt-3 font-kicker text-sm uppercase tracking-[0.14em] text-[var(--muted-2)]">
              {prices[priceMode].note}
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
            <article className="price-card card card-hover reveal">
              <div className="price-head">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-kicker text-sm uppercase tracking-[0.18em] text-[var(--muted-2)]">Jersey Atasan</p>
                  <span className="chip">Fleksibel</span>
                </div>
                <h3 className="mt-3 font-display text-2xl">Atasan Saja</h3>
                <p className="mt-2 text-[0.95rem] text-[var(--muted)]">Buat pelari individu atau tambah anggota baru.</p>
              </div>
              <div className="price-figure">
                <span className="font-kicker text-lg text-[var(--muted)]">Rp</span>
                <span className="font-display text-[3.1rem] leading-none tracking-tight sm:text-[3.4rem]">{prices[priceMode].atasan}</span>
                <span className="font-kicker pb-2 text-base text-[var(--muted)]">/pcs</span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{prices[priceMode].labelAtasan}</p>
              <ul className="price-list">
                <li><span className="tick" aria-hidden="true">✓</span>Full printing, tanpa batas warna</li>
                <li><span className="tick" aria-hidden="true">✓</span>Nama &amp; nomor start</li>
                <li><span className="tick" aria-hidden="true">✓</span>Revisi desain tanpa batas</li>
              </ul>
              <a href={waLink("Halo, saya mau tanya harga jersey running (atasan).")} target="_blank" rel="noopener" className="btn btn-ghost price-cta">Pilih Atasan →</a>
            </article>

            <article className="price-card price-card-featured card card-hover reveal">
              <span className="price-badge">Paling Diminati</span>
              <div className="price-head">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-kicker text-sm uppercase tracking-[0.18em] text-[var(--accent-deep)]">Atasan + Celana</p>
                  <span className="chip chip-accent">Hemat</span>
                </div>
                <h3 className="mt-3 font-display text-2xl">Jersey Setelan</h3>
                <p className="mt-2 text-[0.95rem] text-[var(--muted)]">Paket lengkap satu tim, tampil seragam saat race.</p>
              </div>
              <div className="price-figure">
                <span className="font-kicker text-lg text-[var(--muted)]">Rp</span>
                <span className="font-display text-[3.1rem] leading-none tracking-tight sm:text-[3.4rem]" style={{ color: "var(--accent-deep)" }}>{prices[priceMode].setelan}</span>
                <span className="font-kicker pb-2 text-base text-[var(--muted)]">/set</span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{prices[priceMode].labelSetelan}</p>
              <ul className="price-list">
                <li><span className="tick" aria-hidden="true">✓</span>Semua benefit paket atasan</li>
                <li><span className="tick" aria-hidden="true">✓</span>Celana full custom siap tanding</li>
                <li><span className="tick" aria-hidden="true">✓</span>Prioritas jadwal produksi</li>
              </ul>
              <a href={waLink("Halo, saya mau tanya harga jersey running (setelan).")} target="_blank" rel="noopener" className="btn btn-primary price-cta">Pilih Setelan →</a>
            </article>
          </div>

          <div className="reveal mx-auto mt-6 flex max-w-5xl flex-col items-center gap-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 text-center sm:flex-row sm:items-center sm:justify-between sm:p-7 sm:text-left">
            <div className="sm:flex sm:items-center sm:gap-5">
              <p className="font-display text-3xl leading-none text-[var(--accent-deep)] sm:text-4xl">50+</p>
              <div className="mt-2 sm:mt-0">
                <p className="font-kicker text-base uppercase tracking-[0.12em] text-[var(--text)]">Order Skala Besar</p>
                <p className="mt-1 text-[0.95rem] text-[var(--muted)]">Harga proyek khusus buat komunitas, klub, sekolah, dan event.</p>
              </div>
            </div>
            <a href={waLink("Halo, saya mau tanya harga khusus bulk 50+ pcs jersey running.")} target="_blank" rel="noopener" className="btn btn-ghost shrink-0 px-6 py-3">Minta Harga Khusus →</a>
          </div>
        </div>
      </section>

      {/* ===== 9. CARA ORDER ===== */}
      <section id="cara-order" className="relative py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 tex-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-2xl">
            <p className="kicker">Cara Order</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">5 Langkah Sampai Jerseymu Jadi</h2>
            <div className="rule-accent mt-5" />
          </div>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <li key={i} className="card reveal p-6">
                <span className="step-num">{step.num}</span>
                <h3 className="mt-4 font-display text-base">{step.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--muted)]">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== 10. TESTIMONI ===== */}
      <section id="testimoni" className="relative border-y border-[var(--line)] bg-[var(--ink-2)] py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 tex-speed-soft" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-2xl">
            <p className="kicker">Testimoni</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">Kata Mereka</h2>
            <div className="rule-accent mt-5" />
          </div>

          <ul className="reveal mt-10 flex flex-wrap gap-3">
            {["Sejak 2017", "Order Diproses Cepat", "Produksi Sendiri", "Gratis Revisi Desain"].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 rounded-full border border-[var(--line-strong)] bg-white px-4 py-2.5">
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-[var(--accent)]" aria-hidden="true"><path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="font-kicker text-sm uppercase tracking-[0.12em]">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="card reveal p-7">
                <p className="font-kicker text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent)]">✔ Verified Buyer</p>
                <p className="mt-3" style={{ color: "var(--accent)", fontSize: "1.1rem", letterSpacing: ".1em" }}>★★★★★</p>
                <blockquote className="mt-4 text-[0.97rem] leading-relaxed text-[var(--muted)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-[var(--line)] pt-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm" style={{ background: "var(--accent)", color: "#fff" }}>{t.initials}</span>
                  <div>
                    <span className="block font-display text-sm text-[var(--text)]">— {t.name}</span>
                    <span className="mt-0.5 block font-kicker text-xs uppercase tracking-[0.14em] text-[var(--muted-2)]">{t.team} · {t.city}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10.5 FOTO GALERI BERJALAN ===== */}
      <section id="galeri" className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-4">
            <p className="kicker">Foto Hasil Jersey</p>
            <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl lg:text-[2.2rem]">
              Bukan Edit, <span className="text-sunrise">Bukan Rekayasa</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm" style={{ color: "var(--muted-2)" }}>Foto asli dari pelanggan</p>
          </div>
        </div>
        <div className="gal-wrap mt-5">
          <div className="gal-track">
            {Array.from({ length: 2 }).map((_, dup) =>
              GALLERY_IMAGES.map((g, i) => (
                <button key={`${dup}-${i}`} type="button" onClick={() => setGalleryLightbox(dup === 0 ? i : null)} className="gal-item">
                  <img src={g.src} alt={dup === 1 ? "" : g.alt} loading="lazy" />
                </button>
              ))
            )}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 text-center">
          <a
            href={waLink("Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan, saya mau order seperti itu!")}
            target="_blank"
            rel="noopener"
            className="btn btn-primary px-7 py-3.5 text-sm"
          >
            🏃 Mau Jersey Seperti Ini? Order Sekarang
          </a>
        </div>
      </section>

      {/* ===== 11. FAQ ===== */}
      <section id="faq" className="relative py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 tex-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="reveal">
            <p className="kicker">FAQ</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">Pertanyaan Umum</h2>
            <div className="rule-accent mt-5" />
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="faq-item card reveal p-0" open={openFaq === i} onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) setOpenFaq(i); }}>
                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6">
                  <h3 className="font-display text-base sm:text-lg">{faq.q}</h3>
                  <span className="chev shrink-0 text-xl leading-none text-[var(--accent)]">+</span>
                </summary>
                <div className="faq-body px-5 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-[0.97rem] leading-relaxed text-[var(--muted)]">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 12. CTA PENUTUP ===== */}
      <section className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--ink-2)] py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 tex-speed fade-edges" aria-hidden="true" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" style={{ background: "radial-gradient(circle,rgba(255,122,69,0.20),transparent 65%)" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="reveal">
            <p className="kicker">Siap Mulai?</p>
            <h2 className="mt-4 font-display text-3xl leading-[1.12] sm:text-4xl lg:text-[3rem]">
              Saatnya Tim Lari Kamu<br className="hidden sm:block" /> Punya <span className="text-sunrise">Identitas Sendiri</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]">
              Gratis desain + revisi bebas. Bisa mulai dari 1 pcs, langsung dari pabrik kami.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={waLink("Halo TNT Sport Apparel, saya mau bikin jersey running buat tim saya.")}
                target="_blank"
                rel="noopener"
                className="btn btn-primary w-full px-8 py-4 text-base sm:w-auto"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.13h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 01-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.24-8.23 8.24zm4.53-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" /></svg>
                Order via WhatsApp
              </a>
              <a href="#katalog" className="btn btn-ghost w-full px-8 py-4 text-base sm:w-auto">Lihat Katalog</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 13. FOOTER ===== */}
      <footer className="relative bg-[var(--ink)] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xl tracking-tight">TNT</span>
                <span className="font-kicker text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Sport Apparel</span>
              </div>
              <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-[var(--muted)]">
                Produsen jersey running custom full printing bahan Dry Fit Premium. Langsung dari pabrik, bisa order satuan.
              </p>
              <p className="mt-5 font-kicker text-xs uppercase tracking-[0.18em] text-[var(--muted-2)]">
                Est. 2017 · Yogyakarta, Indonesia
              </p>
            </div>
            <div>
              <h2 className="font-kicker text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">Kontak</h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-[var(--muted)]">
                <li>
                  <a href={waLink("Halo TNT Sport Apparel, saya mau tanya-tanya.")} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-[var(--accent-deep)] transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[var(--accent)]" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" /></svg>
                    0811-5491-117
                  </a>
                </li>
              </ul>
              <a href={waLink("Halo TNT Sport Apparel, saya mau tanya-tanya.")} target="_blank" rel="noopener" className="btn btn-primary mt-6 px-5 py-3 text-sm">Chat Admin</a>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-[var(--line)] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-kicker text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">
              © 2026 TNT Sport Apparel. Semua hak dilindungi.
            </p>
            <a href="#top" className="font-kicker text-xs uppercase tracking-[0.16em] text-[var(--muted-2)] hover:text-[var(--accent-deep)] transition-colors">Kembali ke atas ↑</a>
          </div>
        </div>
      </footer>

      {/* ===== Floating WhatsApp ===== */}
      <a
        href={waLink("Halo TNT Sport Apparel, saya mau tanya jersey running custom.")}
        target="_blank"
        rel="noopener"
        className="wa-float btn btn-primary h-14 w-14 !rounded-full p-0"
        aria-label="Chat WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.13h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 01-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.24-8.23 8.24zm4.53-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" /></svg>
      </a>

      {/* ===== Catalog Lightbox ===== */}
      {catalogLightbox !== null && products[catalogLightbox] && (
        <div className="lightbox-overlay" onClick={() => setCatalogLightbox(null)} role="dialog" aria-label="Gambar katalog">
          <button className="lightbox-close" onClick={() => setCatalogLightbox(null)} aria-label="Tutup">✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); setCatalogLightbox((catalogLightbox - 1 + products.length) % products.length); }} aria-label="Sebelumnya">‹</button>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); setCatalogLightbox((catalogLightbox + 1) % products.length); }} aria-label="Berikutnya">›</button>
          <img
            src={products[catalogLightbox].image}
            alt={products[catalogLightbox].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox-caption">{products[catalogLightbox].catalogue}</div>
          <a
            href={waLink(`Halo, saya tertarik desain ${products[catalogLightbox].catalogue}.`)}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            className="btn btn-primary mt-4 px-6 py-3 text-sm"
          >
            🏃 Tanya Desain Ini via WhatsApp →
          </a>
        </div>
      )}

      {/* ===== Gallery Lightbox ===== */}
      {galleryLightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setGalleryLightbox(null)} role="dialog" aria-label="Galeri foto">
          <button className="lightbox-close" onClick={() => setGalleryLightbox(null)} aria-label="Tutup">✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); setGalleryLightbox((galleryLightbox - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length); }} aria-label="Sebelumnya">‹</button>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); setGalleryLightbox((galleryLightbox + 1) % GALLERY_IMAGES.length); }} aria-label="Berikutnya">›</button>
          <img
            src={GALLERY_IMAGES[galleryLightbox].src}
            alt={GALLERY_IMAGES[galleryLightbox].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox-caption">{GALLERY_IMAGES[galleryLightbox].alt}</div>
        </div>
      )}
    </div>
  );
}
