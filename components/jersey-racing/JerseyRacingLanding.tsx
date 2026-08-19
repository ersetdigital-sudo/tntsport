"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/wa";
import "./jersey-racing.css";

interface Product {
  id: string;
  catalogue: string;
  image: string;
  alt: string;
}

interface Props {
  products: Product[];
}

const WA_NUMBER = "628115491117";

const TRUST_ITEMS = [
  "Langsung Dari Pabrik",
  "Bisa Order Satuan",
  "Gratis Desain + Revisi Bebas",
  "Beli 6 Gratis 1",
];

const FAQS = [
  { q: "Bisa custom nama & nomor start sendiri gak?", a: "Bisa. Setiap jersey bisa ditambahkan nama rider dan nomor start sesuai keinginan. Tinggal informasikan saat pemesanan." },
  { q: "Berapa lama proses produksinya?", a: "Rata-rata 7–14 hari kerja tergantung jumlah pesanan dan kompleksitas desain." },
  { q: "Apakah bisa order satuan?", a: "Bisa. Mulai dari 1 pcs dengan memilih desain dari katalog yang tersedia. Custom nama dan nomor start tetap bisa dilakukan." },
  { q: "Bisa masukin banyak logo sponsor?", a: "Bisa. Pada paket custom, slot sponsor bisa disesuaikan — logo tim, logo sponsor utama, dan sponsor pendukung semuanya bisa masuk dalam desain." },
];

const TESTIMONIALS = [
  { initials: "AR", name: "Andri", team: "Komunitas Touring Jabodetabek", city: "Jakarta", quote: "Jersey dari TNT Sport benar-benar beda kualitasnya. Bahan adem, printing tajam, dan desainnya langsung sesuai keinginan komunitas kami. Setiap touring jadi kelihatan kompak." },
  { initials: "RW", name: "Rizky", team: "Drag Race Team Surabaya", city: "Surabaya", quote: "Kami pesan untuk tim drag race — warnanya bold, nama dan nomor start terlihat jelas dari jauh. Sponsor juga masuk semua dengan rapi. Sangat memuaskan." },
  { initials: "DP", name: "Dimas", team: "Track Day Racing Bandung", city: "Bandung", quote: "Order satuan dulu buat tes, hasilnya langsung oke. Sekarang tim kami sudah pesan ulang untuk seluruh anggota. Harga juga reasonable untuk kualitas sekelas ini." },
];

const GALLERY_IMAGES = [
  { src: "/landing/jersey-futsal/4c090b09-6b9d-4d9a-a061-ca955c49c520.png", alt: "Tim Balreng Kebumen memakai jersey custom merah di Turnamen" },
  { src: "/landing/jersey-futsal/93c90d93-45be-4137-b10d-d810ada22df4.png", alt: "Tim SSB Persem memakai jersey custom kuning" },
  { src: "/landing/jersey-futsal/0cde4945-3487-4e3d-ba70-e94156ac55e3.png", alt: "Pemain memakai jersey custom lengan panjang merah" },
  { src: "/landing/jersey-futsal/3af292c0-b13f-4a74-b94e-c0b6885f633c.png", alt: "Lenox FC memakai jersey custom maroon" },
  { src: "/landing/jersey-futsal/21bccec1-b05a-464e-bc44-54cb90c01dde.png", alt: "Tim junior memakai jersey custom biru saat menerima piala juara 2" },
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".jersey-racing .rv:not(.in), .jersey-racing .rv-l:not(.in), .jersey-racing .rv-r:not(.in), .jersey-racing .rv-z:not(.in), .jersey-racing .swipe:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

export default function JerseyRacingLanding({ products }: Props) {
  useScrollReveal();
  const [priceMode, setPriceMode] = useState<"ecer" | "lusin">("ecer");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [galleryActive, setGalleryActive] = useState<number | null>(null);
  const [catalogActive, setCatalogActive] = useState<number | null>(null);
  const heroArtRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const trustTrackRef = useRef<HTMLDivElement>(null);
  const trustPaused = useRef(false);

  useEffect(() => {
    const heroArt = heroArtRef.current;
    if (!heroArt) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const factor = Math.min(scrollY / 600, 1);
      heroArt.style.transform = `translateY(${factor * 40}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const waLink = (msg: string) => buildWhatsAppLink(WA_NUMBER, msg);

  return (
    <div className="jersey-racing">
      {/* ===== 1. HERO ===== */}
      <section
        id="top"
        className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 sm:pt-24 pb-16"
      >
        {/* base gelap + glow merah dari kanan */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(95% 70% at 96% 30%,rgba(255,34,51,.22),transparent 62%),linear-gradient(160deg,#0b0d11 0%,#08090c 55%,#0a0b0f 100%)" }} />
        <div className="absolute inset-0 grid-tex opacity-[.55]" />
        <div className="absolute inset-0 speedlines opacity-40" />

        {/* panel diagonal ala livery jersey (kanan) */}
        <div ref={heroArtRef} id="heroArt" className="absolute inset-y-0 right-0 w-[34%] sm:w-[44%] md:w-[46%] opacity-70 sm:opacity-80 pointer-events-none will-change-transform" aria-hidden="true">
          <div className="absolute inset-y-0 right-0 w-full" style={{ background: "linear-gradient(105deg,transparent 0%,rgba(255,212,0,.07) 46%,rgba(255,212,0,.02) 100%)", clipPath: "polygon(34% 0,100% 0,100% 100%,0 100%)" }} />
          <div className="absolute inset-y-0 right-0 w-full" style={{ background: "linear-gradient(105deg,transparent 0%,rgba(255,34,51,.20) 62%,rgba(255,34,51,.04) 100%)", clipPath: "polygon(56% 0,84% 0,44% 100%,16% 100%)" }} />
          <div className="absolute inset-y-0 right-0 w-full" style={{ background: "var(--yellow)", opacity: ".42", clipPath: "polygon(84% 0,85.6% 0,73.6% 100%,72% 100%)" }} />
          <div className="absolute inset-y-0 right-0 w-full" style={{ background: "var(--red-hot)", opacity: ".5", clipPath: "polygon(89% 0,90.4% 0,78.4% 100%,77% 100%)" }} />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08090c] to-transparent" />

        {/* scroll cue */}
        <a href="#kenapa" aria-label="Scroll ke bawah" className="scrollcue absolute bottom-8 left-5 sm:left-8 z-20 hidden md:flex items-center gap-3" style={{ color: "#8e97a6" }}>
          <span className="block w-9 h-[1.5px]" style={{ background: "linear-gradient(90deg,var(--red-hot),transparent)" }} />
          <span className="cond text-[.68rem] font-bold" style={{ letterSpacing: ".24em" }}>SCROLL</span>
        </a>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <div className="grid md:grid-cols-[1.15fr_.85fr] gap-10 md:gap-8 lg:gap-10 items-center">

            {/* ── KIRI: headline + CTA ── */}
            <div>
              <p className="kicker mb-6 hero-up" style={{ animationDelay: ".05s" }}>🏁 Custom Jersey Racing</p>
              <h1 className="display hero-up" style={{ fontSize: "clamp(2.5rem,8vw,5.4rem)", marginBottom: "1.75rem", animationDelay: ".18s" }}>
                Jersey Racing Custom,<br />
                <span style={{ color: "var(--red-hot)" }}>Bikin Tim Kamu</span><br />
                Tampil Beda
              </h1>
              <p className="hero-up" style={{ fontSize: "clamp(1.05rem,2.2vw,1.28rem)", color: "#c9cfda", maxWidth: "36rem", lineHeight: 1.6, marginBottom: "2rem", animationDelay: ".32s" }}>
                Full printing tajam, desain bebas, custom nama &amp; nomor start. Cocok buat komunitas touring, drag race, sampai track day.
              </p>

              {/* harga: dipisah garis biar kebaca sebagai fakta, bukan hiasan */}
              <div className="flex items-stretch gap-4 mb-9 hero-up" style={{ animationDelay: ".44s" }}>
                <span className="w-[3px] shrink-0 rounded-full" style={{ background: "linear-gradient(to bottom,var(--red-hot),var(--yellow))" }} />
                <p className="cond font-bold tracking-[.04em] self-center" style={{ fontSize: "clamp(1rem,2.2vw,1.28rem)", color: "var(--yellow)" }}>
                  Mulai <span className="display" style={{ fontSize: "clamp(1.5rem,3.4vw,2.2rem)", verticalAlign: "middle" }}>85 RIBU</span> / pcs
                  <span className="block text-[.86rem] mt-1" style={{ color: "#8e97a6", letterSpacing: ".12em" }}>20 DESAIN RACING SIAP PILIH</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 hero-up" style={{ animationDelay: ".56s" }}>
                <a
                  href={waLink("Halo TNT SPORT APPAREL, saya mau order jersey racing custom. Boleh dibantu?")}
                  target="_blank"
                  rel="noopener"
                  className="btn-primary cond text-white font-bold text-base sm:text-lg px-8 py-4 text-center"
                  style={{ borderRadius: "6px" }}
                >
                  🏁 Order Jersey Sekarang →
                </a>
                <a href="#harga" className="btn-ghost cond font-bold text-base sm:text-lg px-8 py-4 text-center" style={{ borderRadius: "6px" }}>
                  Lihat Harga
                </a>
              </div>
            </div>

            {/* ── KANAN: komposisi tipografi ── */}
            <div className="relative hidden md:block" style={{ height: "26rem" }} aria-hidden="true">
              {/* nomor start besar */}
              <p className="display absolute -top-6 right-0 select-none" style={{ lineHeight: ".78", fontSize: "13.5rem", letterSpacing: "-.03em", color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,.11)" }}>07</p>
              <p className="display absolute right-2 select-none" style={{ top: "7.2rem", lineHeight: 1, fontSize: "3.1rem" }}>
                <span style={{ color: "var(--yellow)" }}>TNT</span><span style={{ color: "var(--red-hot)" }}>.</span>
              </p>

              {/* label vertikal */}
              <p className="cond absolute top-2 left-1 text-[.68rem] font-bold select-none" style={{ letterSpacing: ".42em", color: "#6d7684", writingMode: "vertical-rl" }}>EST. 2017 · INDONESIA</p>

              {/* garis + spec kecil */}
              <div className="absolute right-2 top-[12.4rem] h-px" style={{ width: "13.5rem", background: "linear-gradient(to left,rgba(255,34,51,.7),transparent)" }} />
              <ul className="absolute right-2 top-[13.4rem] space-y-2 text-right cond text-[.72rem] font-bold select-none" style={{ letterSpacing: ".24em", color: "#8e97a6" }}>
                <li>FULL PRINT</li>
                <li>CUSTOM DESIGN</li>
                <li style={{ color: "var(--yellow)" }}>RACING</li>
                <li>TOURING</li>
              </ul>

              {/* chip nomor kecil */}
              <div className="absolute left-1 bottom-0 flex items-center gap-2 select-none">
                <span className="cond text-[.7rem] font-bold" style={{ letterSpacing: ".2em", color: "#4d5563" }}>NO.</span>
                <span className="cond text-[.78rem] font-bold px-2.5 py-1 rounded" style={{ letterSpacing: ".14em", color: "#8e97a6", border: "1px solid rgba(255,255,255,.1)" }}>46</span>
                <span className="cond text-[.78rem] font-bold px-2.5 py-1 rounded" style={{ letterSpacing: ".14em", color: "#8e97a6", border: "1px solid rgba(255,255,255,.1)" }}>99</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="bg-[var(--red)] speedlines overflow-hidden">
        <div ref={trustRef} className="py-4 overflow-hidden" onMouseEnter={() => { trustPaused.current = true; }} onMouseLeave={() => { trustPaused.current = false; }}>
          <div ref={trustTrackRef} className="flex whitespace-nowrap">
            {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 cond font-bold text-sm sm:text-base px-4 shrink-0">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. KENAPA PILIH KAMI ===== */}
      <section id="kenapa" className="grid-tex">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-3xl rv">
            <p className="kicker">Kenapa Beda</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,4.8vw,3.4rem)" }}>
              Bukan Cuma Jersey. Ini{" "}
              <span style={{ color: "var(--red-hot)" }}>Identitas Tim Kamu.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Komunitas racing dan touring sering kumpul di banyak event — dari sirkuit lokal sampai
              kopdar antar kota. Jersey yang asal jadi bikin tim kamu kelihatan kurang niat. Kami bantu
              bikin identitas visual yang benar-benar dipikirin.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <article className="rv card relative p-7 pt-10 pb-8">
              <span className="numtag absolute top-4 left-4 px-2.5 py-1 text-white text-xs"><span>01</span></span>
              <p className="display mt-6 text-xl sm:text-2xl" style={{ lineHeight: 1.05 }}>Ruang Sponsor Yang Rapi</p>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                Desain bisa disusun dengan slot logo sponsor yang jelas dan proporsional.
              </p>
            </article>
            <article className="rv card relative p-7 pt-10 pb-8">
              <span className="numtag absolute top-4 left-4 px-2.5 py-1 text-white text-xs"><span>02</span></span>
              <p className="display mt-6 text-xl sm:text-2xl" style={{ lineHeight: 1.05 }}>Bisa Satuan, Gak Perlu Ngajak Satu Tim</p>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                Order 1 pcs bisa, pilih dari katalog. Butuh desain sendiri buat tim? Mulai 6 pcs.
              </p>
            </article>
            <article className="rv card relative p-7 pt-10 pb-8 sm:col-span-2 lg:col-span-1">
              <span className="numtag absolute top-4 left-4 px-2.5 py-1 text-white text-xs" style={{ background: "linear-gradient(140deg, var(--yellow), var(--amber))" }}><span style={{ color: "var(--ink)" }}>03</span></span>
              <p className="display mt-6 text-xl sm:text-2xl" style={{ lineHeight: 1.05 }}>Desain Bener-Bener Punya Identitas</p>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                Kirim logo tim/komunitas dan warna yang kamu mau — di paket custom, jersey jadi representasi
                identitas tim di setiap event.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== 3. PILIHAN ORDER ===== */}
      <section id="pilihan" className="bg-[var(--ink-2)] slash-both speedlines">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-3xl rv">
            <p className="kicker">Pilihan Order</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,4.8vw,3.4rem)" }}>
              Jersey Racing — Pilih Sesuai{" "}
              <span style={{ color: "var(--red-hot)" }}>Kebutuhan Tim Kamu</span>
            </h2>
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-5">
            {/* Card 1: Custom */}
            <article className="rv card card-hi relative p-7 sm:p-9 flex flex-col">
              <span
                className="cond text-[10px] font-bold tracking-widest px-3 py-1 inline-flex self-start"
                style={{ background: "var(--red)", color: "#fff" }}
              >
                MIN. 6 PCS
              </span>
              <h3 className="display mt-4 text-2xl sm:text-3xl">Custom Desain Full Team</h3>
              <ul className="mt-5 space-y-3 cond text-sm font-semibold tracking-wide" style={{ color: "var(--txt)" }}>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Desain dari nol</li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Bebas warna &amp; motif</li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Logo tim</li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Logo sponsor</li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Nama &amp; nomor start</li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Cocok untuk komunitas/tim</li>
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href={waLink("Halo, saya ingin custom jersey racing full team (min. 6 pcs). Boleh dibantu?")}
                  target="_blank"
                  rel="noopener"
                  className="btn-primary w-full text-base py-4"
                  style={{ borderRadius: "9999px", color: "#fff" }}
                >
                  Konsultasi Desain Tim →
                </a>
              </div>
            </article>

            {/* Card 2: Satuan */}
            <article className="rv card relative p-7 sm:p-9 flex flex-col">
              <span
                className="cond text-[10px] font-bold tracking-widest px-3 py-1 inline-flex self-start"
                style={{ background: "rgba(255,255,255,.08)", color: "var(--muted)", border: "1px solid var(--line)" }}
              >
                MULAI 1 PCS
              </span>
              <h3 className="display mt-4 text-2xl sm:text-3xl">Order Satuan</h3>
              <ul className="mt-5 space-y-3 cond text-sm font-semibold tracking-wide" style={{ color: "var(--txt)" }}>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Pilih desain katalog</li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Custom nama</li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Custom nomor start</li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Tambah logo tim</li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span> Tambah logo sponsor</li>
                <li className="flex gap-3">
                  <span style={{ color: "var(--muted)", opacity: 0.4 }}>✕</span>
                  <span style={{ color: "var(--muted)" }}>Tidak perlu pesan satu tim</span>
                </li>
              </ul>
              <p className="mt-4 text-xs italic" style={{ color: "var(--muted)" }}>
                Warna &amp; motif ikut desain katalog.
              </p>
              <div className="mt-auto pt-6">
                <a
                  href="#katalog"
                  className="btn-ghost w-full text-base py-4"
                  style={{ borderRadius: "9999px" }}
                >
                  Pilih Dari Katalog →
                </a>
              </div>
            </article>
          </div>

          {/* Comparison table */}
          <div className="rv mt-10 overflow-x-auto">
            <table className="cmp w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr className="cond text-xs font-bold tracking-widest" style={{ color: "var(--muted)" }}>
                  <th className="text-left py-3 pr-4" style={{ borderBottom: "1px solid var(--line)" }}>Fitur</th>
                  <th className="text-center py-3 px-4" style={{ borderBottom: "1px solid var(--line)" }}>Custom Full Team</th>
                  <th className="text-center py-3 pl-4" style={{ borderBottom: "1px solid var(--line)" }}>Order Satuan</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Minimum", "6 pcs", "1 pcs"],
                  ["Desain dari nol", "✔", "—"],
                  ["Pilih desain katalog", "✔", "✔"],
                  ["Ganti warna & motif", "✔", "—"],
                  ["Nama", "✔", "✔"],
                  ["Nomor start", "✔", "✔"],
                  ["Logo", "✔", "✔"],
                  ["Sponsor", "✔", "✔"],
                ].map(([feat, custom, satuan], i) => (
                  <tr key={i}>
                    <td className="py-3 pr-4" style={{ color: "var(--txt)", borderBottom: "1px solid var(--line)" }}>{feat}</td>
                    <td className="text-center py-3 px-4" style={{ color: custom === "✔" ? "var(--yellow)" : "var(--muted)", borderBottom: "1px solid var(--line)" }}>{custom}</td>
                    <td className="text-center py-3 pl-4" style={{ color: satuan === "✔" ? "var(--yellow)" : "var(--muted)", borderBottom: "1px solid var(--line)" }}>{satuan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== KATALOG ===== */}
      <section id="katalog" className="grid-tex">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-3xl mb-12">
            <p className="kicker mb-5 rv">Katalog Desain</p>
            <h2 className="display rv swipe" style={{ fontSize: "clamp(1.5rem,5.4vw,3.5rem)", marginBottom: "1.5rem" }}>
              Pilih Basis Desain,{" "}
              <span style={{ color: "var(--red-hot)" }}>Sisanya Kita Custom</span>
            </h2>
            <p className="text-[1.05rem] leading-relaxed rv" style={{ color: "#b3bac6" }}>
              Ini {products.length} dari <strong className="text-white">20 desain racing</strong> yang sudah siap. Order satuan: tinggal tambah nama, nomor start, logo tim &amp; sponsor. Mau ganti warna, motif, atau desain dari nol? Ambil paket custom minimal 6 pcs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {products.map((p, i) => (
              <figure key={p.id} className="card rounded-lg overflow-hidden group rv-z">
                <button
                  type="button"
                  onClick={() => setCatalogActive(i)}
                  className="block w-full text-left p-0 bg-transparent cursor-pointer"
                  aria-label={`Perbesar foto: ${p.alt}`}
                >
                  <div className="aspect-square overflow-hidden bg-white">
                    <img
                      src={p.image}
                      alt={p.alt}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  </div>
                </button>
                <figcaption className="p-3 sm:p-5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="cond font-bold text-sm sm:text-lg leading-tight truncate">{p.catalogue}</p>
                  </div>
                  <a
                    href={buildWhatsAppLink(WA_NUMBER, `Halo TNT SPORT APPAREL, saya tertarik dengan desain *${p.catalogue}* di kategori *Racing*. Bisa info lebih lanjut?`)}
                    target="_blank"
                    rel="noopener"
                    className="cond font-bold shrink-0 transition-colors"
                    style={{ fontSize: ".75rem", letterSpacing: ".12em", color: "var(--yellow)" }}
                  >
                    Pilih →
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Catalog Lightbox */}
          {catalogActive !== null && products[catalogActive] && (
            <div
              className="fixed inset-0 z-[110] flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,.85)", backdropFilter: "blur(4px)" }}
              onClick={() => setCatalogActive(null)}
              role="dialog"
              aria-modal="true"
            >
              <div className="relative my-auto" style={{ maxWidth: "92vw" }} onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setCatalogActive(null)}
                  aria-label="Tutup foto"
                  className="absolute -top-2 -right-2 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-white shadow-lg"
                  style={{ background: "var(--red-hot)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={products[catalogActive].image}
                  alt={products[catalogActive].alt}
                  className="max-h-[65vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                  style={{ border: "1px solid rgba(255,255,255,.1)" }}
                />
                <p className="mt-3 text-center text-sm font-bold" style={{ color: "rgba(255,255,255,.8)" }}>{products[catalogActive].catalogue}</p>
                <div className="mt-4 flex justify-center">
                  <a
                    href={buildWhatsAppLink(WA_NUMBER, `Halo TNT SPORT APPAREL, saya tertarik dengan desain *${products[catalogActive].catalogue}* di kategori *Racing*. Bisa info lebih lanjut?`)}
                    target="_blank"
                    rel="noopener"
                    className="btn-primary cond text-white font-bold text-sm px-6 py-3 text-center"
                    style={{ borderRadius: "9999px" }}
                  >
                    🏁 Tanya Desain Ini via WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== 4. DETAIL CUSTOMIZATION ===== */}
      <section id="custom" className="relative py-12 sm:py-20 lg:py-28 bg-[var(--ink-2)] slash-both speedlines">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-6 sm:pt-8">
          <div className="max-w-3xl mb-8 sm:mb-14">
            <p className="kicker mb-3 sm:mb-5 rv">Detail Customization</p>
            <h2 className="display rv swipe" style={{ fontSize: "clamp(1.5rem,5vw,3.3rem)" }}>
              Bebas Custom Detail Yang Bikin Jersey Kamu{" "}
              <span style={{ color: "var(--red-hot)" }}>Punya Karakter</span>
            </h2>
          </div>

          {/* Jersey diagram full width */}
          <div className="rv mb-6 sm:mb-10 -mx-5 sm:mx-0">
            <div className="relative card rounded-none sm:rounded-lg overflow-visible">
              <img
                src="/landing/jersey-racing/df5ecff4-6109-4bbc-adef-56c6158be7b3.png"
                alt="Diagram bagian jersey TNT Sport Apparel yang bisa dicustom: logo tim, nomor start, nama rider, logo sponsor"
                className="w-full h-auto block"
              />
              {/* Callout hotspots */}
              <span className="cal" style={{ left: "43%", top: "20%" }} data-side="left"><i className="hot" /><b>Logo Tim</b></span>
              <span className="cal" style={{ left: "50%", top: "34%" }} data-side="right"><i className="hot" /><b>Panel Sponsor</b></span>
              <span className="cal" style={{ left: "50%", top: "47%" }} data-side="right"><i className="hot" /><b>Nomor Start</b></span>
              <span className="cal" style={{ left: "20%", top: "33%" }} data-side="left"><i className="hot" /><b>Area Lengan</b></span>
              <span className="cal" style={{ left: "80%", top: "33%" }} data-side="right"><i className="hot" /><b>Nama Rider</b></span>
              <span className="cal" style={{ left: "26%", top: "63%" }} data-side="left"><i className="hot" /><b>Warna Tim</b></span>
              <span className="cal" style={{ left: "74%", top: "63%" }} data-side="right"><i className="hot" /><b>Motif Racing</b></span>
            </div>
            <p className="text-[.75rem] sm:text-[.8rem] mt-2 sm:mt-3.5 italic px-5 sm:px-0" style={{ color: "#7c8492" }}>
              Visual ilustrasi — area bertanda bisa dicustom di paket custom (min. 6 pcs). Untuk order satuan: nama, nomor start, logo tim &amp; sponsor saja.
            </p>
          </div>

          {/* List + CTA below image */}
          <div className="rv">
            <p className="text-sm sm:text-[1.05rem] leading-relaxed mb-5 sm:mb-8" style={{ color: "#b3bac6" }}>
              Di paket <strong className="text-white">custom minimal 6 pcs</strong>, setiap bagian bisa diatur sesuai identitas tim kamu. Ini yang biasanya paling sering dicustom:
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4">
              {[
                "Logo Tim",
                "Nomor Start",
                "Nama Rider",
                "Panel Sponsor",
                "Warna Tim",
                "Motif Racing",
                "Area Lengan",
                "Area Depan",
                "Area Belakang",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 sm:gap-3 items-center">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0" style={{ background: "var(--yellow)", transform: "skewX(-20deg)" }} />
                  <span className="cond font-semibold text-[.85rem] sm:text-[1.02rem]" style={{ letterSpacing: ".04em" }}>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={waLink("Halo TNT SPORT APPAREL, saya mau custom jersey racing. Ini detail yang saya butuhkan:")}
              target="_blank"
              rel="noopener"
              className="btn-primary cond inline-block text-white font-bold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded mt-6 sm:mt-9"
            >
              Diskusi Detail Desain →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 5. SPESIFIKASI ===== */}
      <section id="spek" className="relative py-20 sm:py-28 grid-tex">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="kicker mb-5 rv">Spesifikasi Produk</p>
              <h2 className="display text-[clamp(1.9rem,5.2vw,3.4rem)] mb-7 rv swipe">
                Dibuat Untuk{" "}
                <span style={{ color: "var(--red-hot)" }}>Nyaman Dipakai Seharian</span>
              </h2>
              <div className="card rounded-lg p-6 sm:p-8 rv-l">
                <div className="pb-5 mb-6" style={{ borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                  <p className="display" style={{ fontSize: "clamp(1.4rem,3.4vw,1.9rem)" }}>Dry Fit Premium</p>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    "Ringan",
                    "Adem",
                    "Full printing",
                    "Unisex",
                    "Lengan pendek",
                    "Kerah polo berkancing",
                  ].map((f, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none" stroke="#ff2233" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                      <span style={{ color: "#d3d8e1" }}>{f}</span>
                    </li>
                  ))}
                  <li className="flex gap-3 items-start sm:col-span-2">
                    <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none" stroke="#ff2233" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                    <span style={{ color: "#d3d8e1" }}>Cocok untuk touring &amp; event seharian</span>
                  </li>
                </ul>
                <div className="mt-7 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
                  <p className="cond font-bold text-[.8rem] mb-3" style={{ letterSpacing: ".16em", color: "#8e97a6" }}>Ukuran Tersedia</p>
                  <div className="flex flex-wrap gap-2">
                    {["S", "M", "L", "XL", "2XL"].map((s) => (
                      <span key={s} className="cond font-bold text-sm px-3.5 py-2 rounded" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="rv-r">
              <div className="card rounded-lg overflow-hidden">
                <img
                  src="/landing/jersey-racing/faf53238-29dd-4127-ad0c-3dc7dd627b38.png"
                  alt="Model duduk memakai jersey custom TNT SPORT APPAREL, bahan dryfit full printing"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HARGA ===== */}
      <section id="harga" className="bg-[var(--ink-2)] slash-both speedlines">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-2xl rv">
            <p className="kicker">Daftar Harga</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,4.8vw,3.4rem)" }}>
              Pilih Paket{" "}
              <span style={{ color: "var(--red-hot)" }}>Tim Kamu</span>
            </h2>
          </div>

          {/* Toggle */}
          <div className="rv mt-8 flex justify-center">
            <div className="inline-flex gap-1 p-1" style={{ background: "var(--ink-3)", borderRadius: "9999px", border: "1px solid var(--line)" }}>
              <button
                className={`pricetab ${priceMode === "ecer" ? "is-on" : ""}`}
                onClick={() => setPriceMode("ecer")}
              >
                Ecer
              </button>
              <button
                className={`pricetab ${priceMode === "lusin" ? "is-on" : ""}`}
                onClick={() => setPriceMode("lusin")}
              >
                Lusinan · Hemat
              </button>
            </div>
          </div>

          {/* Price cards */}
          <div className="rv mt-10 grid lg:grid-cols-2 gap-5 sm:gap-6">
            {/* Atasan */}
            <article className="card rounded-lg p-7 sm:p-9 flex flex-col rv-l">
              <div className="flex items-start justify-between gap-4 mb-2">
                <p className="cond font-bold text-sm" style={{ color: "#8e97a6", letterSpacing: ".16em" }}>Jersey Atasan</p>
                <span className="cond font-bold rounded px-3 py-1.5" style={{ fontSize: ".68rem", letterSpacing: ".16em", color: "#9aa2b1", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>Fleksibel</span>
              </div>
              <p className="display" style={{ fontSize: "clamp(1.5rem,3.6vw,2rem)", marginBottom: "1.25rem" }}>Atasan Saja</p>
              <p className="flex items-baseline gap-2 mb-2">
                <span className="cond font-bold text-lg" style={{ color: "var(--yellow)" }}>Rp</span>
                <span key={priceMode} className="display leading-none" style={{ fontSize: "clamp(2.6rem,7vw,3.6rem)", color: "var(--yellow)" }}>
                  {priceMode === "ecer" ? "95RB" : "85RB"}
                </span>
                <span className="cond font-bold text-base" style={{ color: "#8e97a6" }}>/pcs</span>
              </p>
              <p key={priceMode + "-atasan"} className="mb-7" style={{ fontSize: ".92rem", color: "#8e97a6" }}>
                {priceMode === "ecer" ? "Bisa pesan mulai 1 pcs" : "Minimal pembelian 12 pcs"}
              </p>
              <ul className="mb-9 flex-1 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
                {["Full printing", "Nama & nomor start", "Revisi desain tanpa batas"].map((f, i) => (
                  <li key={i} className="flex gap-3 items-start mb-3.5">
                    <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none" stroke="#ff2233" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                    <span style={{ color: "#d3d8e1" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waLink("Halo TNT SPORT APPAREL, saya tertarik paket Atasan Saja jersey racing. Bisa info lebih lanjut?")}
                target="_blank"
                rel="noopener"
                className="btn-ghost cond text-white font-bold text-base px-7 py-3.5 text-center"
                style={{ borderRadius: "6px" }}
              >
                Pilih Atasan →
              </a>
            </article>

            {/* Setelan */}
            <article className="card card-hi rounded-lg p-7 sm:p-9 flex flex-col relative overflow-hidden rv-r">
              <div className="absolute top-0 right-0 cond font-bold text-white px-4 py-1.5" style={{ fontSize: ".72rem", letterSpacing: ".18em", background: "var(--red)", clipPath: "polygon(14% 0,100% 0,100% 100%,0 100%)" }}>Paling Diminati</div>
              <p className="cond font-bold text-sm mt-3 mb-2" style={{ color: "var(--red-hot)", letterSpacing: ".16em" }}>Atasan + Celana</p>
              <p className="display" style={{ fontSize: "clamp(1.5rem,3.6vw,2rem)", marginBottom: "1.25rem" }}>Jersey Setelan</p>
              <p className="flex items-baseline gap-2 mb-2">
                <span className="cond font-bold text-lg" style={{ color: "var(--yellow)" }}>Rp</span>
                <span className="display leading-none" style={{ fontSize: "clamp(2.6rem,7vw,3.6rem)", color: "var(--yellow)" }}>120RB</span>
                <span className="cond font-bold text-base" style={{ color: "#8e97a6" }}>/set</span>
              </p>
              <p className="mb-7" style={{ fontSize: ".92rem", color: "#8e97a6" }}>Minimal pembelian 12 set</p>
              <ul className="mb-9 flex-1 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
                {["Semua benefit paket atasan", "Celana full custom siap tanding", "Prioritas jadwal produksi"].map((f, i) => (
                  <li key={i} className="flex gap-3 items-start mb-3.5">
                    <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none" stroke="#ff2233" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                    <span style={{ color: "#d3d8e1" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waLink("Halo TNT SPORT APPAREL, saya tertarik paket Jersey Setelan racing. Bisa info lebih lanjut?")}
                target="_blank"
                rel="noopener"
                className="btn-primary cond text-white font-bold text-base px-7 py-3.5 text-center"
                style={{ borderRadius: "6px" }}
              >
                Pilih Setelan →
              </a>
            </article>
          </div>

          {/* Bulk */}
          <div className="rv card rounded-lg p-6 sm:p-8 flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="cond font-bold mb-1.5" style={{ fontSize: "1.15rem" }}>
                Butuh lebih dari <span style={{ color: "var(--red-hot)" }}>50 pcs</span>?
              </p>
              <p style={{ fontSize: ".97rem", color: "#9aa2b1" }}>Harga proyek khusus untuk komunitas, klub, sekolah, dan event.</p>
            </div>
            <a
              href={waLink("Halo TNT SPORT APPAREL, saya mau minta harga khusus untuk order jersey racing di atas 50 pcs.")}
              target="_blank"
              rel="noopener"
              className="btn-primary cond text-white font-bold px-6 py-3 shrink-0"
              style={{ fontSize: ".95rem", borderRadius: "6px" }}
            >
              Minta Harga Khusus →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 6. CARA ORDER ===== */}
      <section id="cara-order" className="grid-tex">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-2xl rv">
            <p className="kicker">Cara Order</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,4.8vw,3.4rem)" }}>
              Cara Order —{" "}
              <span style={{ color: "var(--red-hot)" }}>Cuma 5 Langkah</span>
            </h2>
          </div>

          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { num: "1", title: "Chat Admin", desc: "Hubungi kami via WhatsApp, sampaikan kebutuhan jersey racing kamu." },
              { num: "2", title: "Desain", desc: "Pilih dari katalog atau konsultasi desain custom dari nol." },
              { num: "3", title: "ACC & DP", desc: "Setujui desain final dan lakukan pembayaran DP." },
              { num: "4", title: "Produksi", desc: "Proses produksi 7–14 hari kerja sesuai jumlah pesanan." },
              { num: "5", title: "Kirim", desc: "Jersey dikirim rapi dengan pengemasan aman ke alamat kamu." },
            ].map((step, i) => (
              <li key={i} className={`rv card p-6 ${i === 4 ? "card-hi" : ""}`}>
                <span
                  className="display text-3xl"
                  style={{
                    WebkitTextStroke: i === 4 ? "2px var(--yellow)" : "2px var(--red-hot)",
                    color: "transparent",
                  }}
                >
                  {step.num}
                </span>
                <p className="display mt-3 text-lg">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{step.desc}</p>
              </li>
            ))}
          </ol>

          <div className="rv mt-10 text-center">
            <a
              href={waLink("Halo, saya ingin order jersey racing custom sekarang.")}
              target="_blank"
              rel="noopener"
              className="btn-primary text-base px-8 py-4"
              style={{ borderRadius: "9999px", color: "#fff" }}
            >
              🏁 Mulai Order Sekarang →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 7. TESTIMONI ===== */}
      <section id="testimoni" className="bg-[var(--ink-2)] slash-both speedlines">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-2xl rv">
            <p className="kicker">Ulasan Pelanggan</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,4.8vw,3.4rem)" }}>
              Kata Pelanggan{" "}
              <span style={{ color: "var(--red-hot)" }}>Kami</span>
            </h2>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="rv card p-7 flex flex-col">
                <p className="cond text-xs font-bold tracking-widest" style={{ color: "var(--yellow)" }}>✔ Verified Buyer</p>
                <p className="mt-3" style={{ color: "var(--yellow)", fontSize: "1.1rem", letterSpacing: ".1em" }}>★★★★★</p>
                <blockquote className="mt-4 text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className="display text-lg"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      display: "grid",
                      placeItems: "center",
                      background: "var(--red)",
                      color: "#fff",
                      borderRadius: "9999px",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="cond font-extrabold tracking-wide text-white text-sm">— {t.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{t.team} · {t.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Stats bar */}
          <div className="rv mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14 py-6" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            {[
              { num: "350K+", label: "Order Selesai" },
              { num: "9K+", label: "Klien Puas" },
              { num: "4.9", label: "Rating" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="display statnum text-3xl sm:text-4xl" style={{ color: "var(--red-hot)" }}>{s.num}</p>
                <p className="cond text-xs font-bold tracking-widest mt-1" style={{ color: "var(--muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. FOTO GALERI BERJALAN ===== */}
      <section id="galeri" className="relative py-16 sm:py-20 grid-tex">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl mb-6">
            <p className="kicker mb-5 rv">Foto Hasil Jersey</p>
            <h2 className="display text-[clamp(1.7rem,4.2vw,2.8rem)] rv swipe">
              Bukan Edit, <span style={{ color: "var(--red-hot)" }}>Bukan Rekayasa</span>
            </h2>
            <p className="mt-3 text-sm rv" style={{ color: "#8e97a6" }}>Foto asli dari pelanggan</p>
          </div>
        </div>
        {/* Marquee gallery */}
        <div className="gal-wrap mt-7">
          <div className="gal-track">
            {Array.from({ length: 2 }).map((_, dup) =>
              GALLERY_IMAGES.map((g, i) => (
                <button
                  key={`${dup}-${i}`}
                  type="button"
                  onClick={() => setGalleryActive(dup === 0 ? i : null)}
                  aria-hidden={dup === 1 || undefined}
                  aria-label={dup === 1 ? undefined : `Perbesar foto: ${g.alt}`}
                  className="gal-item"
                >
                  <img src={g.src} alt={dup === 1 ? "" : g.alt} loading="lazy" />
                </button>
              ))
            )}
          </div>
        </div>
        {/* CTA */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-8 text-center rv">
          <a
            href={waLink("Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan, saya mau order seperti itu!")}
            target="_blank"
            rel="noopener"
            className="btn-primary cond text-white font-bold text-base px-7 py-4"
            style={{ borderRadius: "6px" }}
          >
            🏁 Mau Jersey Seperti Ini? Order Sekarang
          </a>
        </div>
        {/* Lightbox */}
        {galleryActive !== null && GALLERY_IMAGES[galleryActive] && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,.85)", backdropFilter: "blur(4px)" }}
            onClick={() => setGalleryActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative my-auto" style={{ maxWidth: "92vw" }} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setGalleryActive(null)}
                aria-label="Tutup foto"
                className="absolute -top-2 -right-2 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-white shadow-lg"
                style={{ background: "var(--red-hot)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GALLERY_IMAGES[galleryActive].src}
                alt={GALLERY_IMAGES[galleryActive].alt}
                className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                style={{ border: "1px solid rgba(255,255,255,.1)" }}
              />
              <p className="mt-3 text-center text-sm" style={{ color: "rgba(255,255,255,.6)" }}>{GALLERY_IMAGES[galleryActive].alt}</p>
            </div>
          </div>
        )}
      </section>

      {/* ===== 10. FAQ ===== */}
      <section id="faq" className="grid-tex">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-14">
            <div className="rv">
              <p className="kicker">FAQ</p>
              <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,4.6vw,3.2rem)" }}>
                Pertanyaan{" "}
                <span style={{ color: "var(--red-hot)" }}>Yang Sering Masuk</span>
              </h2>
              <p className="mt-5 leading-relaxed" style={{ color: "var(--muted)" }}>
                Kalau pertanyaan kamu belum ada di sini, langsung hubungi kami — akan segera dibalas.
              </p>
              <a
                href={waLink("Halo, saya ingin menanyakan beberapa hal mengenai jersey racing custom.")}
                target="_blank"
                rel="noopener"
                className="btn-ghost mt-6 text-base px-6 py-3.5"
                style={{ borderRadius: "9999px" }}
              >
                Hubungi Kami →
              </a>
            </div>

            <div className="rv">
              {FAQS.map((faq, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 cursor-pointer list-none text-left"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "1.06rem",
                      letterSpacing: "0.02em",
                      color: openFaq === i ? "var(--yellow)" : "var(--txt)",
                      transition: "color 0.16s ease",
                      background: "none",
                      border: "none",
                      padding: "1.35rem 0",
                    }}
                  >
                    <span>{faq.q}</span>
                    <span
                      className="flex-none relative mt-1"
                      style={{ width: "1.6rem", height: "1.6rem", border: "1.5px solid rgba(255,255,255,.3)" }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%,-50%)",
                          width: ".7rem",
                          height: "1.6px",
                          background: "var(--yellow)",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          transform: openFaq === i ? "translate(-50%,-50%) rotate(90deg)" : "translate(-50%,-50%)",
                          width: "1.6px",
                          height: ".7rem",
                          background: "var(--yellow)",
                          opacity: openFaq === i ? 0 : 1,
                          transition: "transform 0.2s ease, opacity 0.2s ease",
                        }}
                      />
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 leading-relaxed text-sm" style={{ color: "var(--muted)", maxWidth: "56ch", lineHeight: 1.65 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. CTA PENUTUP ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[var(--ink-2)] slash-top">
        <img
          src="/landing/jersey-racing/96eb0470-acc4-4fee-91c9-ed8a950ce71b.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.25 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,#08090c 0%,rgba(8,9,12,.85) 50%,rgba(8,9,12,.7) 100%)" }} />
        <div className="absolute inset-0 speedlines opacity-60" />
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center pt-8">
          <h2 className="display rv swipe" style={{ fontSize: "clamp(1.5rem,5.6vw,3.8rem)", marginBottom: "1.75rem" }}>
            Saatnya Komunitas Kamu Punya{" "}
            <span style={{ color: "var(--red-hot)" }}>Identitas Sendiri</span>{" "}
            di Setiap Event
          </h2>
          <p className="text-sm sm:text-xl rv" style={{ color: "#c9cfda", lineHeight: 1.6, marginBottom: "2.5rem", maxWidth: "42rem", marginLeft: "auto", marginRight: "auto" }}>
            Jangan cuma kumpul bareng — tampil kompak dengan jersey satu identitas.
          </p>
          <div className="rv">
            <a
              href={waLink("Halo TNT SPORT APPAREL, saya mau order jersey racing untuk komunitas saya.")}
              target="_blank"
              rel="noopener"
              className="btn-primary cond inline-block text-white font-bold text-base sm:text-xl px-8 sm:px-10 py-4 sm:py-5"
              style={{ borderRadius: "6px" }}
            >
              🏁 Order Jersey Racing Sekarang →
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "var(--ink-2)", borderTop: "1px solid var(--line)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-24 md:pb-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <a href="#top" className="flex items-center gap-2" style={{ textDecoration: "none", color: "var(--txt)" }}>
            <span style={{ fontSize: "1.2rem" }}>🏁</span>
            <span className="display text-lg" style={{ color: "var(--red-hot)" }}>TNT SPORT</span>
            <span className="cond text-sm font-bold tracking-widest" style={{ color: "var(--muted)" }}>APPAREL</span>
          </a>
          <p className="text-sm text-center sm:text-left max-w-md" style={{ color: "var(--muted)" }}>
            Custom jersey racing full printing. Bahan Dry Fit premium, desain bebas, bisa order
            satuan. Cocok untuk komunitas touring, drag race, dan track day.
          </p>
          <a
            href={waLink("Halo TNT SPORT APPAREL, saya tertarik dengan jersey racing custom.")}
            target="_blank"
            rel="noopener"
            className="btn-primary text-sm px-5 py-3"
            style={{ borderRadius: "9999px", color: "#fff" }}
          >
            WhatsApp Kami
          </a>
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--line)" }}>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 cond text-sm font-bold tracking-widest" style={{ color: "var(--muted)" }}>
            <a href="#katalog" className="hover:text-white transition-colors">Katalog</a>
            <a href="#cara-order" className="hover:text-white transition-colors">Cara Order</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <p className="text-sm" style={{ color: "var(--muted)" }}>© 2026 TNT Sport Apparel. All rights reserved.</p>
        </div>
      </footer>

      {/* ===== MOBILE DOCK CTA ===== */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:hidden"
        style={{
          background: "linear-gradient(0deg,rgba(8,9,12,.97) 60%,transparent)",
          backdropFilter: "blur(6px)",
        }}
      >
        <a
          href={waLink("Halo, saya ingin memesan jersey racing custom. Boleh dibantu?")}
          target="_blank"
          rel="noopener"
          className="btn-primary w-full text-base py-4 flex items-center justify-center gap-2"
          style={{ borderRadius: "9999px", color: "#fff" }}
        >
          🏁 Order Jersey Racing Sekarang
        </a>
      </div>
    </div>
  );
}
