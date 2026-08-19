"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/wa";
import "./jersey-racing.css";

const WA_NUMBER = "628115491117";

const CATALOG = [
  { code: "TNT-RACING 01", colors: "Navy / Putih / Teal", img: "/landing/jersey-racing/2fd986e0-6b39-4ce6-b718-51788954a9b2.jpg" },
  { code: "TNT-RACING 02", colors: "Hitam / Kuning / Merah", img: "/landing/jersey-racing/2d8164c3-faa7-42f8-a711-3215c0f0806b.jpg" },
  { code: "TNT-RACING 03", colors: "Biru / Hijau Neon / Magenta", img: "/landing/jersey-racing/46fbb49e-7505-4839-a43e-5887ca5b1f76.jpg" },
  { code: "TNT-RACING 04", colors: "Pink / Hijau Neon", img: "/landing/jersey-racing/ea1c6a5b-1fb2-437f-baa3-69b3edbac2d1.jpg" },
  { code: "TNT-RACING 05", colors: "Hitam / Putih / Oranye", img: "/landing/jersey-racing/30c6a691-e83a-4cae-9a6a-40ddd2982ebd.jpg" },
  { code: "TNT-RACING 06", colors: "Hitam / Pink / Kuning", img: "/landing/jersey-racing/b0dc9b4d-7e6b-4400-9dcd-34f44946e187.jpg" },
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
  { initials: "DP", name: "Dimas", team: "Track Day Racing Bandung", city: "Bandung", quote: "Order satuan dulu buat tes, hasilnya langsung oke. Sekarang tim kami sudah pesan ulang untuk seluruh anggota. Harga也很 reasonable untuk kualitas sekelas ini." },
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

export default function JerseyRacingLanding() {
  useScrollReveal();
  const [priceMode, setPriceMode] = useState<"ecer" | "lusin">("ecer");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const heroArtRef = useRef<HTMLDivElement>(null);

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

  const waLink = (msg: string) => buildWhatsAppLink(WA_NUMBER, msg);

  return (
    <div className="jersey-racing">
      {/* ===== FLOATING LOGO ===== */}
      <a
        href="#top"
        className="fixed z-50 flex items-center gap-2 px-4 py-2"
        style={{
          top: "1rem",
          left: "1rem",
          background: "rgba(8,9,12,.88)",
          border: "1px solid rgba(255,255,255,.12)",
          borderRadius: "9999px",
          backdropFilter: "blur(6px)",
          textDecoration: "none",
          color: "var(--txt)",
          fontSize: ".82rem",
          fontFamily: "'Barlow Condensed',sans-serif",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: ".08em",
        }}
      >
        <span style={{ color: "var(--red-hot)", fontSize: "1.1rem" }}>🏁</span>
        <span>TNT Sport.</span>
      </a>

      {/* ===== 1. HERO ===== */}
      <section
        id="top"
        className="relative min-h-[100svh] overflow-hidden"
        style={{
          background: "radial-gradient(110% 85% at 75% 8%,rgba(255,34,51,.10),transparent 52%),radial-gradient(80% 70% at 12% 88%,rgba(255,212,0,.08),transparent 55%),var(--ink)",
        }}
      >
        {/* Background textures */}
        <div className="absolute inset-0 grid-tex opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 speedlines opacity-40" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-6 items-center">
            {/* Left content */}
            <div>
              <p className="kicker hero-up" style={{ animationDelay: ".1s" }}>
                🏁 Custom Jersey Racing
              </p>
              <h1
                className="display hero-up"
                style={{
                  fontSize: "clamp(2.8rem,7.5vw,6.2rem)",
                  lineHeight: .92,
                  marginTop: "1.2rem",
                  animationDelay: ".2s",
                }}
              >
                Jersey Racing Custom,{" "}
                <span style={{ color: "var(--red-hot)" }}>Bikin Tim Kamu</span>{" "}
                Tampil Beda
              </h1>
              <p
                className="hero-up mt-5 text-base sm:text-lg leading-relaxed max-w-xl"
                style={{ color: "var(--muted)", animationDelay: ".35s" }}
              >
                Full printing tajam, desain bebas, custom nama &amp; nomor start.
                Cocok buat komunitas touring, drag race, sampai track day.
              </p>

              {/* Price highlight */}
              <div
                className="hero-up inline-flex items-center gap-3 mt-7 px-4 py-2"
                style={{
                  animationDelay: ".45s",
                  border: "1px solid rgba(255,212,0,.35)",
                  background: "rgba(255,212,0,.06)",
                }}
              >
                <span className="cond text-sm font-bold tracking-widest" style={{ color: "var(--yellow)" }}>
                  Mulai 85 RIBU / pcs
                </span>
                <span style={{ color: "rgba(255,255,255,.25)" }}>|</span>
                <span className="cond text-xs font-bold tracking-widest" style={{ color: "var(--muted)" }}>
                  20 DESAIN RACING SIAP PILIH
                </span>
              </div>

              {/* CTAs */}
              <div className="hero-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: ".55s" }}>
                <a
                  href={waLink("Halo, saya ingin memesan jersey racing custom. Boleh dibantu?")}
                  target="_blank"
                  rel="noopener"
                  className="btn-primary text-base sm:text-lg px-7 py-4"
                  style={{ borderRadius: "9999px", color: "#fff" }}
                >
                  🏁 Order Jersey Sekarang →
                </a>
                <a
                  href="#harga"
                  className="btn-ghost text-base px-6 py-4"
                  style={{ borderRadius: "9999px" }}
                >
                  Lihat Harga
                </a>
              </div>
            </div>

            {/* Right side — hero art */}
            <div ref={heroArtRef} className="relative hidden lg:block" style={{ perspective: "800px" }}>
              {/* Diagonal panels */}
              <div
                className="absolute"
                style={{
                  top: "5%",
                  right: "0",
                  width: "82%",
                  height: "85%",
                  background: "var(--yellow)",
                  clipPath: "polygon(18% 0,100% 0,100% 100%,0 100%)",
                  opacity: 0.12,
                }}
                aria-hidden="true"
              />
              <div
                className="absolute"
                style={{
                  top: "10%",
                  right: "-4%",
                  width: "76%",
                  height: "80%",
                  background: "var(--red-hot)",
                  clipPath: "polygon(22% 0,100% 0,100% 100%,0 100%)",
                  opacity: 0.1,
                }}
                aria-hidden="true"
              />

              {/* Typography composition */}
              <div className="relative z-10 flex flex-col items-end" style={{ padding: "2rem 1rem" }}>
                <span
                  className="display"
                  style={{
                    fontSize: "clamp(6rem,14vw,10rem)",
                    lineHeight: .82,
                    color: "rgba(255,255,255,.06)",
                    letterSpacing: "-.03em",
                  }}
                >
                  07
                </span>
                <span
                  className="display"
                  style={{
                    fontSize: "clamp(3rem,6vw,5rem)",
                    lineHeight: .9,
                    color: "rgba(255,255,255,.08)",
                    marginTop: "-.5rem",
                  }}
                >
                  TNT.
                </span>
                <span
                  className="cond text-xs font-bold tracking-[.2em]"
                  style={{ color: "var(--muted)", marginTop: ".5rem" }}
                >
                  EST. 2017 · INDONESIA
                </span>

                {/* Specs list */}
                <ul className="mt-6 space-y-1.5 cond text-xs font-bold tracking-widest" style={{ color: "rgba(255,255,255,.3)" }}>
                  <li>DRY FIT PREMIUM</li>
                  <li>FULL PRINTING</li>
                  <li>CUSTOM NAMA &amp; NOMOR</li>
                  <li>LOGO SPONSOR</li>
                </ul>

                {/* Number chips */}
                <div className="flex gap-3 mt-6">
                  <span
                    className="display"
                    style={{
                      fontSize: "2.2rem",
                      color: "var(--red-hot)",
                      border: "2px solid var(--red-hot)",
                      padding: ".15rem .6rem",
                      transform: "skewX(-8deg)",
                      opacity: 0.6,
                    }}
                  >
                    46
                  </span>
                  <span
                    className="display"
                    style={{
                      fontSize: "2.2rem",
                      color: "var(--yellow)",
                      border: "2px solid var(--yellow)",
                      padding: ".15rem .6rem",
                      transform: "skewX(-8deg)",
                      opacity: 0.6,
                    }}
                  >
                    99
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="scrollcue absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="cond text-[10px] font-bold tracking-[.25em]" style={{ color: "var(--muted)" }}>
            SCROLL
          </span>
          <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
            <rect x="1" y="1" width="16" height="26" rx="8" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
            <circle cx="9" cy="8" r="2" fill="var(--red-hot)">
              <animate attributeName="cy" values="8;16;8" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="bg-[var(--red)] speedlines">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-3.5 overflow-x-auto">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 cond text-xs sm:text-sm font-bold tracking-widest whitespace-nowrap">
            <li className="flex items-center gap-2"><span style={{ color: "var(--yellow)" }}>●</span> Langsung Dari Pabrik</li>
            <li className="flex items-center gap-2"><span style={{ color: "var(--yellow)" }}>●</span> Bisa Order Satuan</li>
            <li className="flex items-center gap-2"><span style={{ color: "var(--yellow)" }}>●</span> Gratis Desain + Revisi Bebas</li>
            <li className="flex items-center gap-2"><span style={{ color: "var(--yellow)" }}>●</span> Beli 6 Gratis 1</li>
          </ul>
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
          <div className="max-w-3xl rv">
            <p className="kicker">Katalog Desain</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,4.8vw,3.4rem)" }}>
              Pilih Basis Desain,{" "}
              <span style={{ color: "var(--red-hot)" }}>Sisanya Kita Custom</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              Ini 6 dari 20 desain yang tersedia. Pilih yang paling cocok, lalu custom nama, nomor,
              dan logo sesuai kebutuhan tim kamu.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CATALOG.map((item, i) => (
              <a
                key={i}
                href={waLink(`Halo TNT SPORT APPAREL, saya tertarik dengan desain *${item.code}* di kategori *Jersey Racing*. Bisa info lebih lanjut?`)}
                target="_blank"
                rel="noopener"
                className="rv-z block group"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", border: "1px solid var(--line)", borderRadius: "6px" }}>
                  <img
                    src={item.img}
                    alt={`Desain ${item.code} — jersey racing ${item.colors}`}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .35s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                  />
                </div>
                <div className="mt-3">
                  <p className="cond text-sm font-bold tracking-widest" style={{ color: "var(--txt)" }}>{item.code}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{item.colors}</p>
                </div>
                <span
                  className="cond mt-2 inline-flex text-xs font-bold tracking-widest group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--red-hot)" }}
                >
                  Pilih →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. DETAIL CUSTOMIZATION ===== */}
      <section id="custom" className="bg-[var(--ink-2)] slash-both speedlines">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-3xl rv">
            <p className="kicker">Detail Customization</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,4.8vw,3.4rem)" }}>
              Bebas Custom Detail Yang Bikin Jersey Kamu{" "}
              <span style={{ color: "var(--red-hot)" }}>Punya Karakter</span>
            </h2>
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Jersey diagram with callouts */}
            <div className="rv-l relative">
              <div
                className="relative mx-auto"
                style={{ maxWidth: "340px", aspectRatio: "3/4" }}
              >
                <img
                  src="/landing/jersey-racing/df5ecff4-6109-4bbc-adef-56c6158be7b3.png"
                  alt="Diagram jersey racing custom — area yang bisa dikustomisasi"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />

                {/* Callout hotspots */}
                <div className="cal" style={{ top: "20%", left: "43%" }} data-side="left">
                  <span className="hot" />
                  <b>Logo Tim</b>
                </div>
                <div className="cal" style={{ top: "34%", left: "50%" }} data-side="right">
                  <span className="hot" />
                  <b>Panel Sponsor</b>
                </div>
                <div className="cal" style={{ top: "47%", left: "50%" }} data-side="right">
                  <span className="hot" />
                  <b>Nomor Start</b>
                </div>
                <div className="cal" style={{ top: "33%", left: "20%" }} data-side="left">
                  <span className="hot" />
                  <b>Area Lengan</b>
                </div>
                <div className="cal" style={{ top: "33%", left: "80%" }} data-side="right">
                  <span className="hot" />
                  <b>Nama Rider</b>
                </div>
                <div className="cal" style={{ top: "63%", left: "26%" }} data-side="left">
                  <span className="hot" />
                  <b>Warna Tim</b>
                </div>
                <div className="cal" style={{ top: "63%", left: "74%" }} data-side="right">
                  <span className="hot" />
                  <b>Motif Racing</b>
                </div>
              </div>
              <p className="text-xs mt-3.5 italic" style={{ color: "#7c8492" }}>
                Visual ilustrasi — area bertanda bisa dicustom di paket custom (min. 6 pcs). Untuk order satuan: nama, nomor start, logo tim &amp; sponsor saja.
              </p>
            </div>

            {/* Right: List of customizable areas */}
            <div className="rv-r">
              <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "#b3bac6" }}>
                Di paket <strong className="text-white">custom minimal 6 pcs</strong>, setiap bagian bisa diatur sesuai identitas tim kamu. Ini yang biasanya paling sering dicustom:
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
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
                  <li key={i} className="flex gap-3 items-center">
                    <span className="w-2.5 h-2.5 shrink-0" style={{ background: "var(--yellow)", transform: "skewX(-20deg)" }} />
                    <span className="cond font-semibold text-[1.02rem]" style={{ letterSpacing: ".04em" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waLink("Halo TNT SPORT APPAREL, saya mau custom jersey racing. Ini detail yang saya butuhkan:")}
                target="_blank"
                rel="noopener"
                className="btn-primary cond inline-block text-white font-bold text-base px-7 py-3.5 mt-9"
                style={{ borderRadius: "6px" }}
              >
                Diskusi Detail Desain →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. SPESIFIKASI ===== */}
      <section id="spek" className="grid-tex">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="rv-l">
              <p className="kicker">Spesifikasi Produk</p>
              <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,4.8vw,3.4rem)" }}>
                Dibuat Untuk Nyaman Dipakai{" "}
                <span style={{ color: "var(--red-hot)" }}>Seharian</span>
              </h2>
              <div className="mt-8 p-6" style={{ background: "var(--ink-3)", border: "1px solid var(--line)" }}>
                <p className="display text-xl" style={{ color: "var(--yellow)" }}>Dry Fit Premium</p>
                <ul className="mt-4 space-y-2.5 text-sm" style={{ color: "var(--muted)" }}>
                  <li className="flex gap-2">✔ Ringan, adem, dan menyerap keringat</li>
                  <li className="flex gap-2">✔ Full printing tajam, tidak luntur</li>
                  <li className="flex gap-2">✔ Unisex — cocok pria &amp; wanita</li>
                  <li className="flex gap-2">✔ Lengan pendek</li>
                  <li className="flex gap-2">✔ Kerah polo berkancing</li>
                  <li className="flex gap-2">✔ Cocok untuk touring &amp; event seharian</li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["S", "M", "L", "XL", "2XL"].map((s) => (
                    <span
                      key={s}
                      className="cond text-xs font-bold tracking-widest px-3 py-1.5"
                      style={{ border: "1px solid var(--line)", color: "var(--txt)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="rv-r relative flex justify-center">
              <img
                src="/landing/jersey-racing/faf53238-29dd-4127-ad0c-3dc7dd627b38.png"
                alt="Jersey racing custom — spesifikasi produk Dry Fit Premium"
                style={{ maxWidth: "380px", width: "100%", height: "auto", display: "block" }}
              />
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
          <div className="rv mt-10 grid md:grid-cols-2 gap-5">
            {/* Atasan */}
            <article className="card relative p-7 sm:p-9 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <p className="kicker text-xs" style={{ color: "var(--muted)" }}>Jersey Atasan</p>
                <span
                  className="cond text-[10px] font-bold tracking-widest px-3 py-1"
                  style={{ background: "rgba(255,255,255,.06)", color: "var(--muted)", border: "1px solid var(--line)" }}
                >
                  FLEKSIBEL
                </span>
              </div>
              <h3 className="display mt-4 text-3xl sm:text-4xl">Atasan Saja</h3>
              <div className="mt-6 flex items-end gap-1.5">
                <span className="display text-xl pb-1.5" style={{ color: "var(--muted)" }}>Rp</span>
                <span key={priceMode} className="display text-6xl sm:text-7xl leading-none" style={{ color: "var(--txt)" }}>
                  {priceMode === "ecer" ? "95rb" : "85rb"}
                </span>
                <span className="pb-2.5 text-lg" style={{ color: "var(--muted)" }}>/pcs</span>
              </div>
              <p key={priceMode + "-atasan"} className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {priceMode === "ecer" ? "Bisa pesan mulai 1 pcs" : "Minimal pembelian 12 pcs"}
              </p>
              <ul className="mt-7 pt-6 space-y-3 text-[15px] flex-1" style={{ borderTop: "1px solid var(--line)" }}>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span><span style={{ color: "var(--txt)" }}>Full printing</span></li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span><span style={{ color: "var(--txt)" }}>Nama &amp; nomor start</span></li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span><span style={{ color: "var(--txt)" }}>Revisi desain tanpa batas</span></li>
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href={waLink("Halo TNT SPORT APPAREL, saya mau pesan Jersey Atasan saja (racing). Minta info lengkapnya dong!")}
                  target="_blank"
                  rel="noopener"
                  className="btn-ghost w-full text-base py-4"
                  style={{ borderRadius: "9999px" }}
                >
                  Pilih Atasan
                </a>
              </div>
            </article>

            {/* Setelan */}
            <article className="card card-hi relative p-7 sm:p-9 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <p className="kicker text-xs" style={{ color: "var(--yellow)" }}>Atasan + Celana</p>
                <span
                  className="cond text-[10px] font-bold tracking-widest px-3 py-1"
                  style={{ background: "var(--red)", color: "#fff" }}
                >
                  PALING DIMINATI
                </span>
              </div>
              <h3 className="display mt-4 text-3xl sm:text-4xl">Jersey Setelan</h3>
              <div className="mt-6 flex items-end gap-1.5">
                <span className="display text-xl pb-1.5" style={{ color: "var(--yellow)" }}>Rp</span>
                <span key={priceMode} className="display text-6xl sm:text-7xl leading-none" style={{ color: "var(--red-hot)" }}>
                  120RB
                </span>
                <span className="pb-2.5 text-lg" style={{ color: "var(--muted)" }}>/set</span>
              </div>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Harga setelan (atasan + celana)
              </p>
              <ul className="mt-7 pt-6 space-y-3 text-[15px] flex-1" style={{ borderTop: "1px solid var(--line)" }}>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span><span style={{ color: "var(--txt)" }}>Semua benefit paket atasan</span></li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span><span style={{ color: "var(--txt)" }}>Celana full custom siap tanding</span></li>
                <li className="flex gap-3"><span style={{ color: "var(--yellow)" }}>✚</span><span style={{ color: "var(--txt)" }}>Prioritas jadwal produksi</span></li>
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href={waLink("Halo TNT SPORT APPAREL, saya mau pesan Jersey Setelan atasan + celana (racing). Minta info lengkapnya dong!")}
                  target="_blank"
                  rel="noopener"
                  className="btn-primary w-full text-base py-4"
                  style={{ borderRadius: "9999px", color: "#fff" }}
                >
                  Pilih Setelan
                </a>
              </div>
            </article>
          </div>

          {/* Bulk */}
          <div className="rv mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-7" style={{ background: "var(--ink-3)", borderLeft: "4px solid var(--red-hot)" }}>
            <div>
              <h3 className="display text-2xl sm:text-3xl">
                Butuh Lebih dari{" "}
                <span style={{ color: "var(--red-hot)" }}>50 Pcs?</span>
              </h3>
              <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--muted)" }}>
                Dapatkan harga proyek khusus untuk komunitas, event, dan pembelian partai besar.
              </p>
            </div>
            <a
              href={waLink("Halo TNT SPORT APPAREL, saya butuh jersey racing lebih dari 50 pcs buat komunitas/event. Minta harga khusus dong!")}
              target="_blank"
              rel="noopener"
              className="btn-primary px-6 py-3.5 text-base whitespace-nowrap shrink-0"
              style={{ borderRadius: "9999px", color: "#fff" }}
            >
              Minta Harga Khusus
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
      <section className="bg-[var(--ink-2)] slash-top relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/landing/jersey-racing/96eb0470-acc4-4fee-91c9-ed8a950ce71b.png"
            alt=""
            aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }}
          />
        </div>
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(180deg,rgba(16,19,24,.92),rgba(16,19,24,.8))" }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 py-20 sm:py-28 text-center">
          <p className="kicker rv">Mulai Sekarang</p>
          <h2 className="display mt-5 rv" style={{ fontSize: "clamp(2.2rem,6.5vw,4.8rem)" }}>
            Saatnya Komunitas Kamu Punya{" "}
            <span style={{ color: "var(--red-hot)" }}>Identitas Sendiri</span>{" "}
            di Setiap Event
          </h2>
          <p className="mt-6 text-lg rv" style={{ color: "var(--muted)" }}>
            Jangan cuma kumpul bareng — tampil kompak dengan jersey satu identitas.
          </p>
          <div className="mt-10 rv">
            <a
              href={waLink("Halo, saya ingin memesan jersey racing custom sekarang.")}
              target="_blank"
              rel="noopener"
              className="btn-primary text-base sm:text-xl px-9 py-5"
              style={{ borderRadius: "9999px", color: "#fff" }}
            >
              🏁 Order Jersey Racing Sekarang →
            </a>
          </div>
          <p className="mt-6 cond text-sm font-bold tracking-widest rv" style={{ color: "var(--muted)" }}>
            350K+ Order Selesai · Bisa Satuan · Dry Fit Premium
          </p>
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
