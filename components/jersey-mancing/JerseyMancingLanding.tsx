"use client";

import { useEffect, useRef, useState } from "react";
import { buildWhatsAppLink } from "@/lib/wa";
import "./jersey-mancing.css";

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

const WA_DEFAULT = "628115491117";

const POPUP_DATA = [
  ["Andri - Jakarta","Jersey Mancing Custom Full Printing","3 menit yang lalu"],
  ["Rizky - Surabaya","Jersey Mancing Satuan + Nama & Logo","7 menit yang lalu"],
  ["Dimas - Bandung","Custom Desain Full Team 12 pcs","11 menit yang lalu"],
  ["Fajar - Yogyakarta","Jersey Mancing Custom Full Printing","15 menit yang lalu"],
  ["Aldi - Semarang","Jersey Mancing Satuan + Logo Sponsor","19 menit yang lalu"],
  ["Nanda - Makassar","Custom Desain Full Team 8 pcs","23 menit yang lalu"],
];

function usePopup() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(POPUP_DATA[0]);
  const idx = useRef(0);
  const stopped = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const show = () => {
        if (stopped.current) return;
        setData(POPUP_DATA[idx.current % POPUP_DATA.length]);
        idx.current++;
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          setTimeout(show, 4200);
        }, 5500);
      };
      show();
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    stopped.current = true;
    setVisible(false);
  };

  return { visible, data, close };
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".jmf .reveal:not(.in)");
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

const CheckIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" style={{ color: "var(--cyan)" }}>
    <path d="m5 13 4 4L19 7" />
  </svg>
);

export default function JerseyMancingLanding({ products, waNumber }: Props) {
  useScrollReveal();
  const [catalogActive, setCatalogActive] = useState<number | null>(null);
  const [galleryActive, setGalleryActive] = useState<number | null>(null);
  const popup = usePopup();
  const wa = (msg: string) => buildWhatsAppLink(waNumber || WA_DEFAULT, msg);

  const GALLERY_IMAGES = [
    { src: "/landing/jersey-futsal/4c090b09-6b9d-4d9a-a061-ca955c49c520.png", alt: "Komunitas mancing memakai jersey custom" },
    { src: "/landing/jersey-futsal/93c90d93-45be-4137-b10d-d810ada22df4.png", alt: "Tim mancing memakai jersey custom kuning" },
    { src: "/landing/jersey-futsal/0cde4945-3487-4e3d-ba70-e94156ac55e3.png", alt: "Pemancing memakai jersey custom lengan panjang" },
    { src: "/landing/jersey-futsal/3af292c0-b13f-4a74-b94e-c0b6885f633c.png", alt: "Komunitas mancing maroon" },
    { src: "/landing/jersey-futsal/21bccec1-b05a-464e-bc44-54cb90c01dde.png", alt: "Tim mancing junior memakai jersey custom biru" },
  ];

  return (
    <div className="jmf">
      {/* ===== 1. HERO ===== */}
      <header className="relative overflow-hidden" style={{ background: "var(--navy-deep)" }}>
        <img
          src="/landing/jersey-mancing/1b0b51a0-1cca-4aa0-b6aa-02bac87faed3.jpg"
          alt="Pemancing memakai jersey fishing hoodie premium di atas kapal"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ opacity: 0.4 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg,rgba(6,26,46,.96) 0%,rgba(6,26,46,.82) 50%,rgba(6,26,46,.6) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(6,26,46,.6) 0%,rgba(6,26,46,.1) 35%,rgba(6,26,46,.92) 100%)" }} />
        <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(41,171,226,.18),transparent 65%)" }} />
        <div className="absolute inset-0 grid-lines" style={{ opacity: 0.5 }} />

        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10 md:pt-24 md:pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full pl-3 pr-4 py-1.5 kicker" style={{ background: "rgba(41,171,226,.1)", border: "1px solid rgba(41,171,226,.35)", color: "var(--cyan-bright)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "var(--cyan-bright)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--cyan-bright)" }} />
              </span>
              JERSEY FISHING HOODIE PREMIUM
            </div>

            <h1 className="mt-7 text-[clamp(2.9rem,8vw,5.5rem)] leading-[.94] tracking-tight text-white">
              Performa maksimal.<br />
              <span className="text-outline">Gaya</span> <span className="grad-cyan">maksimal.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: "var(--silver)" }}>
              Buat kamu yang serius di dunia mancing — nyaman dipakai berjam-jam, ringan, adem,
              cepat kering, dengan desain eksklusif yang bisa dicustom sesuai identitas tim
              atau komunitas kamu.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href={wa("Halo, saya ingin custom jersey fishing hoodie premium. Boleh dibantu?")} target="_blank" rel="noopener" className="btn">
                Custom jersey sekarang
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                </svg>
              </a>
              <a href="#harga" className="btn btn-line">Lihat harga</a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5 text-sm font-semibold" style={{ color: "var(--silver)" }}>
              <span className="inline-flex items-center gap-2">
                <CheckIcon />
                Free custom nameset, logo &amp; sponsor
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckIcon />
                Order satuan atau rombongan
              </span>
            </div>
          </div>

          {/* trust strip */}
          <div className="mt-14 md:mt-20 border-t pt-7 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5" style={{ borderColor: "rgba(255,255,255,.1)" }}>
            <div>
              <p className="display text-lg text-white">{products.length > 0 ? `${products.length}+` : "20+"} Desain</p>
              <p className="mt-1 text-sm" style={{ color: "var(--silver)" }}>Eksklusif, semua bisa dicustom</p>
            </div>
            <div>
              <p className="display text-lg text-white">Custom <span className="cyan">Gratis</span></p>
              <p className="mt-1 text-sm" style={{ color: "var(--silver)" }}>Nameset, logo tim &amp; sponsor</p>
            </div>
            <div>
              <p className="display text-lg text-white">Bahan Dry Fit</p>
              <p className="mt-1 text-sm" style={{ color: "var(--silver)" }}>Ringan, adem, cepat kering</p>
            </div>
            <div>
              <p className="display text-lg text-white">Order 1 Pcs</p>
              <p className="mt-1 text-sm" style={{ color: "var(--silver)" }}>Bisa satuan atau rombongan</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(41,171,226,.6),transparent)" }} />
      </header>

      {/* ===== 2. MASALAH ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="reveal">
              <p className="kicker" style={{ color: "var(--cyan)" }}>MASALAHNYA</p>
              <div className="rule mt-4 mb-6" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl" style={{ color: "var(--navy-deep)" }}>Mancing bukan cuma soal dapat ikan.</h2>
              <div className="mt-6 space-y-4 text-base md:text-lg" style={{ color: "var(--ink-soft)" }}>
                <p>Buat pemancing, kenyamanan saat berada di spot itu penting.</p>
                <p>Panas, keringat, aktivitas bergerak, dan waktu mancing yang panjang bisa bikin pakaian terasa gerah dan tidak nyaman.</p>
                <p>Belum lagi kalau datang bareng komunitas atau tim.</p>
                <p className="font-semibold" style={{ color: "var(--navy-deep)" }}>Masa sudah punya tim, tapi tampilannya masih biasa-biasa aja?</p>
                <p className="display text-2xl mt-6" style={{ color: "var(--navy)" }}>Saatnya pakai jersey yang memang dibuat untuk dunia mancing.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-5 reveal">
              <figure className="photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/landing/jersey-mancing/a4fddaa0-cc8e-4288-920b-7926d7c23193.png" alt="Model memakai jersey fishing hoodie tampak depan" className="w-full object-contain" style={{ aspectRatio: "3/4" }} />
                <figcaption className="photo-tag">TAMPAK DEPAN</figcaption>
              </figure>
              <figure className="photo-card mt-6 md:mt-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/landing/jersey-mancing/1ff3fc70-35fa-43bf-a42c-c1ee06d82572.png" alt="Model memakai jersey fishing hoodie tampak belakang" className="w-full object-contain" style={{ aspectRatio: "3/4" }} />
                <figcaption className="photo-tag">TAMPAK BELAKANG</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. SOLUSI ===== */}
      <section className="relative overflow-hidden" style={{ background: "var(--navy)" }}>
        <div className="absolute inset-0 grid-lines" style={{ opacity: 0.7 }} />
        <div className="absolute -top-40 right-[-10%] w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(41,171,226,.16),transparent 65%)" }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="reveal">
            <p className="kicker" style={{ color: "var(--cyan-bright)" }}>SOLUSINYA</p>
            <div className="rule mt-4 mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl max-w-2xl text-white">Satu jersey untuk performa &amp; identitas tim</h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg" style={{ color: "var(--silver)" }}>
              Jersey Fishing Hoodie Premium dirancang untuk menemani aktivitas mancing kamu tanpa mengorbankan
              kenyamanan maupun penampilan.
            </p>
            <p className="mt-4 display text-xl md:text-3xl grad-cyan">Ringan. Adem. Cepat kering. Dan tampil lebih profesional.</p>
          </div>
          <div className="mt-12 reveal">
            <p className="kicker" style={{ color: "var(--silver)" }}>COCOK DIGUNAKAN UNTUK</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {["Mancing harian", "Mancing laut", "Mancing freshwater", "Komunitas mancing", "Tim mancing", "Turnamen", "Gathering", "Hunting spot bersama"].map((item) => (
                <span key={item} className="chip-dark">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. KEUNGGULAN ===== */}
      <section id="keunggulan" style={{ background: "var(--gray)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="reveal">
            <p className="kicker" style={{ color: "var(--cyan)" }}>KEUNGGULAN</p>
            <div className="rule mt-4 mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl max-w-2xl" style={{ color: "var(--navy-deep)" }}>Kenapa pilih jersey fishing hoodie ini?</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="card-light p-7 reveal transition-transform duration-200 hover:-translate-y-1">
              <div className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z" /></svg>
              </div>
              <h3 className="mt-5 text-xl" style={{ color: "var(--navy-deep)" }}>Bahan dry fit</h3>
              <p className="mt-3 text-base" style={{ color: "var(--ink-soft)" }}>Ringan dan nyaman digunakan untuk aktivitas outdoor. Membantu menjaga tubuh tetap nyaman saat berkeringat dan lebih cepat kering.</p>
            </div>
            <div className="card-light p-7 reveal transition-transform duration-200 hover:-translate-y-1" style={{ transitionDelay: ".06s" }}>
              <div className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" /></svg>
              </div>
              <h3 className="mt-5 text-xl" style={{ color: "var(--navy-deep)" }}>Adem &amp; nyaman</h3>
              <p className="mt-3 text-base" style={{ color: "var(--ink-soft)" }}>Sirkulasi udara maksimal untuk membantu mengurangi rasa gerah saat digunakan dalam aktivitas panjang.</p>
            </div>
            <div className="card-light p-7 reveal transition-transform duration-200 hover:-translate-y-1" style={{ transitionDelay: ".12s" }}>
              <div className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <h3 className="mt-5 text-xl" style={{ color: "var(--navy-deep)" }}>Jahitan kuat</h3>
              <p className="mt-3 text-base" style={{ color: "var(--ink-soft)" }}>Dibuat dengan jahitan yang kuat untuk menemani aktivitas outdoor dan penggunaan berulang.</p>
            </div>
            <div className="card-light p-7 reveal transition-transform duration-200 hover:-translate-y-1">
              <div className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" /><path d="M19 15l.9 2.4L22 18l-2.1.6L19 21l-.9-2.4L16 18l2.1-.6L19 15z" /></svg>
              </div>
              <h3 className="mt-5 text-xl" style={{ color: "var(--navy-deep)" }}>Desain fishing eksklusif</h3>
              <p className="mt-3 text-base" style={{ color: "var(--ink-soft)" }}>Bukan jersey biasa. Visualnya dibuat dengan karakter khas dunia mancing yang membuat penampilan kamu lebih standout di spot maupun saat berkumpul bersama komunitas.</p>
            </div>
            <div className="p-7 md:col-span-2 rounded-[20px] relative overflow-hidden reveal" style={{ background: "linear-gradient(135deg,var(--navy-deep) 0%,#12303A 100%)" }}>
              <div className="absolute inset-0 grid-lines" style={{ opacity: 0.5 }} />
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(41,171,226,.25),transparent 65%)" }} />
              <div className="relative flex flex-col md:flex-row md:items-center gap-7">
                <div>
                  <div className="icon-badge icon-badge-warm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" /></svg>
                  </div>
                  <h3 className="mt-5 text-xl text-white">Custom gratis</h3>
                  <p className="mt-3 text-base max-w-md" style={{ color: "var(--silver)" }}>Bikin jersey kamu lebih personal — tanpa biaya tambahan.</p>
                  <p className="mt-5 kicker cyan">GRATIS CUSTOM</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <span className="chip-dark chip-glow">Nameset</span>
                    <span className="chip-dark chip-glow">Logo tim</span>
                    <span className="chip-dark chip-glow">Logo komunitas</span>
                    <span className="chip-dark chip-glow">Logo sponsor</span>
                  </div>
                </div>
                <p className="display text-2xl md:text-3xl md:ml-auto md:text-right text-white shrink-0">Satu jersey,<br /><span className="cyan">satu identitas.</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. EMOTIONAL ===== */}
      <section className="relative overflow-hidden" style={{ background: "var(--navy-deep)" }}>
        <img src="/landing/jersey-mancing/bf91d06a-0c92-4bcb-afac-169dc8155fab.jpg" alt="Tim mancing memakai jersey seragam di dermaga saat matahari terbit" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.35 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(6,26,46,.97) 0%,rgba(6,26,46,.8) 40%,rgba(6,26,46,.55) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(6,26,46,.3) 0%,transparent 30%,rgba(6,26,46,.7) 100%)" }} />
        <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(41,171,226,.1),transparent 65%)" }} />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
          <div className="max-w-2xl reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 kicker" style={{ background: "rgba(41,171,226,.1)", border: "1px solid rgba(41,171,226,.3)", color: "var(--cyan-bright)" }}>
              UNTUK TIM &amp; KOMUNITAS
            </div>

            <h2 className="mt-8 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] tracking-tight text-white">
              Bawa nama tim kamu ke <span className="grad-cyan">setiap spot.</span>
            </h2>

            <div className="mt-8 space-y-4 text-base md:text-lg leading-relaxed" style={{ color: "#C8DCE8" }}>
              <p>Bayangin datang ke spot mancing bareng teman-teman. Semua pakai jersey dengan nama, logo, dan identitas tim sendiri.</p>
              <p>Bukan cuma terlihat kompak. Tapi terasa seperti <strong style={{ color: "var(--cyan-bright)" }}>satu tim.</strong></p>
              <p>Karena setiap perjalanan mancing punya cerita. Dan setiap tim punya identitas.</p>
            </div>

            <div className="mt-10 relative">
              <div className="absolute -left-3 top-0 bottom-0 w-[3px] rounded-full" style={{ background: "linear-gradient(180deg,var(--cyan-bright),var(--orange-cta))" }} />
              <p className="display text-[clamp(1.4rem,3vw,2rem)] text-white pl-6 leading-snug">
                Bikin jersey yang ikut menjadi<br className="hidden md:block" /> bagian dari cerita itu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. CUSTOM + CARA ORDER ===== */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,var(--navy-deep) 0%,#0A1E35 50%,#0E2A47 100%)" }}>
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(41,171,226,.1),transparent 65%)" }} />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(255,107,53,.08),transparent 65%)" }} />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left — Copy */}
            <div className="reveal">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 kicker" style={{ background: "rgba(41,171,226,.1)", border: "1px solid rgba(41,171,226,.3)", color: "var(--cyan-bright)" }}>
                CUSTOM SESUKA HATI
              </div>
              <h2 className="mt-7 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-tight text-white">
                Custom sesuai<br />
                <span className="grad-cyan">identitas kamu.</span>
              </h2>
              <div className="mt-7 space-y-3 text-base md:text-lg" style={{ color: "#C8DCE8" }}>
                <p>Punya nama tim? Punya komunitas? Punya sponsor?</p>
                <p>Atau ingin bikin jersey dengan nama sendiri?</p>
              </div>
              <p className="mt-5 display text-[clamp(2rem,3.5vw,2.8rem)] text-white">Bisa.</p>
              <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed" style={{ color: "#8FAFC4" }}>
                Kamu cukup kirim detail custom yang diinginkan. Tim kami akan membantu menyesuaikan desain jersey dengan identitas kamu.
              </p>
            </div>

            {/* Right — Steps Card */}
            <div className="reveal relative">
              <div className="absolute inset-0 rounded-[24px] opacity-40" style={{ background: "linear-gradient(135deg,rgba(41,171,226,.2),rgba(255,107,53,.15))", filter: "blur(40px)" }} />
              <div className="relative rounded-[24px] p-8 md:p-10" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                <p className="kicker" style={{ color: "rgba(200,220,232,.5)" }}>CARA ORDER</p>

                <div className="mt-8 space-y-8">
                  {[
                    { n: "1", title: "Pilih desain & kirim detail", desc: "Pilih desain katalog atau kirim referensi sendiri. Cantumkan nameset, logo tim, dan logo sponsor." },
                    { n: "2", title: "Kami rapikan desainnya", desc: "Tim kami bantu susun dan finalkan desain jersey kamu. Gratis, tanpa biaya desain." },
                    { n: "3", title: "Produksi & kirim", desc: "Jersey diproduksi dengan bahan dry fit premium, lalu dikirim ke alamat kamu." },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-5">
                      <div className="step-dot">{s.n}</div>
                      <div>
                        <p className="font-bold text-base md:text-lg text-white">{s.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#8FAFC4" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
                  <p className="display text-xl md:text-2xl text-white">
                    Nameset <span className="grad-cyan">+</span> Logo <span className="grad-cyan">+</span> Sponsor — semua <span style={{ color: "var(--orange-cta)" }}>gratis.</span>
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "#6A8FA6" }}>Tanpa perlu bikin desain dari nol.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. SOCIAL PROOF ===== */}
      <section style={{ background: "var(--gray)" }}>
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24 text-center reveal">
          <p className="kicker" style={{ color: "var(--cyan)" }}>FLEKSIBEL DIPAKAI</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mt-4" style={{ color: "var(--navy-deep)" }}>Dipakai buat mancing, tetap keren buat foto.</h2>
          <p className="mt-6 text-base md:text-lg" style={{ color: "var(--ink-soft)" }}>Jersey yang nyaman untuk aktivitas. Sekaligus cukup keren untuk dipakai saat:</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {["Mancing", "Tournament", "Gathering", "Komunitas", "Hunting Spot"].map((item) => (
              <span key={item} className="chip-light">{item}</span>
            ))}
          </div>
          <p className="mt-10 display text-xl md:text-2xl" style={{ color: "var(--navy)" }}>Karena outfit pemancing juga bisa punya style.</p>
        </div>
      </section>

      {/* ===== 8. TARGET AUDIENCE ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="reveal">
            <p className="kicker" style={{ color: "var(--cyan)" }}>BUAT SIAPA</p>
            <div className="rule mt-4 mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl" style={{ color: "var(--navy-deep)" }}>Cocok buat kamu yang...</h2>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 text-base md:text-lg">
            {[
              "Sering mancing dan butuh pakaian yang nyaman untuk aktivitas outdoor",
              "Punya komunitas atau tim mancing",
              "Mau bikin jersey tim yang terlihat lebih profesional",
              "Ikut event atau turnamen mancing",
              "Mau punya jersey dengan nama dan logo sendiri",
              "Ingin tampil kompak saat mancing bareng",
            ].map((item, i) => (
              <li key={item} className="card-light p-5 flex gap-3 reveal hover:-translate-y-1 transition-transform duration-200" style={{ transitionDelay: `${i * 0.05}s` }}>
                <span className="check">✓</span>
                <span style={{ color: "var(--ink-soft)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 9. KATALOG (dari Supabase) ===== */}
      <section id="katalog" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center reveal">
            <p className="kicker" style={{ color: "var(--cyan)" }}>KATALOG</p>
            <div className="rule mx-auto mt-4 mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl" style={{ color: "var(--navy-deep)" }}>Katalog desain jersey</h2>
            <p className="mt-4 text-base md:text-lg" style={{ color: "var(--ink-soft)" }}>{products.length} pilihan desain. Semua bisa dicustom nameset, logo, dan sponsor.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {products.map((p, i) => (
              <article key={p.id} className="catalog-card reveal">
                <button
                  type="button"
                  onClick={() => setCatalogActive(i)}
                  className="block w-full text-left p-0 bg-transparent cursor-pointer"
                  aria-label={`Perbesar foto: ${p.alt}`}
                >
                  <div className="catalog-thumb overflow-hidden">
                    {p.image.includes("placeholder") ? (
                      <span>KODE {String(i + 1).padStart(2, "0")}</span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.alt} className="transition-transform duration-500 hover:scale-105" loading="lazy" />
                    )}
                  </div>
                </button>
                <div className="p-3 md:p-4 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="display text-sm md:text-base truncate" style={{ color: "var(--navy-deep)" }}>{p.catalogue}</p>
                  </div>
                  <a
                    href={wa(`Halo, saya tertarik desain ${p.catalogue} di kategori Jersey Fishing. Bisa info lebih lanjut?`)}
                    target="_blank"
                    rel="noopener"
                    className="font-semibold shrink-0 transition-colors text-xs"
                    style={{ color: "var(--orange-cta)" }}
                  >
                    Pilih →
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href={wa("Halo, saya ingin pilih desain jersey fishing dan pesan. Boleh dibantu?")} target="_blank" rel="noopener" className="btn">Pilih desain &amp; pesan</a>
          </div>
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
                aria-label="Tutup"
                className="absolute -top-2 -right-2 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-white shadow-lg"
                style={{ background: "var(--orange-cta)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
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
                  href={wa(`Halo, saya tertarik desain ${products[catalogActive].catalogue} di kategori Jersey Fishing. Bisa info lebih lanjut?`)}
                  target="_blank"
                  rel="noopener"
                  className="btn text-sm px-6 py-3"
                >
                  Tanya Desain Ini via WhatsApp →
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== 9.5 FOTO GALERI BERJALAN ===== */}
      <section id="galeri" className="relative py-16 sm:py-20" style={{ background: "var(--navy)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl mb-6">
            <div className="rule mb-6" />
            <h2 className="text-3xl md:text-4xl text-white">Foto Hasil Jersey Mancing</h2>
            <p className="mt-3 text-lg" style={{ color: "var(--silver)" }}>Foto asli dari pelanggan — bukan edit, bukan rekayasa.</p>
          </div>
        </div>
        <div className="gal-wrap mt-7">
          <div className="gal-track">
            {Array.from({ length: 2 }).map((_, dup) =>
              GALLERY_IMAGES.map((g, i) => (
                <button key={`${dup}-${i}`} type="button" onClick={() => setGalleryActive(dup === 0 ? i : null)} className="gal-item">
                  <img src={g.src} alt={dup === 1 ? "" : g.alt} loading="lazy" />
                </button>
              ))
            )}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8 text-center">
          <a href={wa("Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan, saya mau order seperti itu!")} target="_blank" rel="noopener" className="btn text-sm sm:text-base px-5 sm:px-8 py-3 sm:py-4">
            Mau Jersey Seperti Ini? Order Sekarang
          </a>
        </div>
        {galleryActive !== null && GALLERY_IMAGES[galleryActive] && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,.85)", backdropFilter: "blur(4px)" }} onClick={() => setGalleryActive(null)} role="dialog" aria-modal="true">
            <div className="relative my-auto" style={{ maxWidth: "92vw" }} onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setGalleryActive(null)} aria-label="Tutup" className="absolute -top-2 -right-2 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-white shadow-lg" style={{ background: "var(--orange-cta)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={GALLERY_IMAGES[galleryActive].src} alt={GALLERY_IMAGES[galleryActive].alt} className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl" style={{ border: "1px solid rgba(255,255,255,.1)" }} />
              <p className="mt-3 text-center text-sm" style={{ color: "rgba(255,255,255,.6)" }}>{GALLERY_IMAGES[galleryActive].alt}</p>
            </div>
          </div>
        )}
      </section>

      {/* ===== 10. HARGA ===== */}
      <section id="harga" style={{ background: "var(--gray)" }}>
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="text-center reveal">
            <p className="kicker" style={{ color: "var(--cyan)" }}>HARGA</p>
            <div className="rule mx-auto mt-4 mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl" style={{ color: "var(--navy-deep)" }}>Harga jersey fishing hoodie</h2>
            <p className="mt-4 text-base md:text-lg" style={{ color: "var(--ink-soft)" }}>Satu harga, semua custom sudah termasuk. Tanpa biaya desain tambahan.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-[1.1fr_1fr] items-stretch">
            {/* Kartu Harga */}
            <div className="relative overflow-hidden rounded-[24px] p-8 md:p-10 reveal" style={{ background: "linear-gradient(150deg,var(--navy-deep) 0%,#12303A 55%,#17475A 100%)" }}>
              <div className="absolute inset-0 grid-lines" style={{ opacity: 0.5 }} />
              <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(41,171,226,.22),transparent 65%)" }} />
              <div className="relative">
                <span className="chip-dark chip-glow inline-block">Paket Custom Lengkap</span>
                <p className="mt-6 kicker" style={{ color: "var(--silver)" }}>HARGA PER JERSEY</p>
                <div className="mt-2 flex flex-wrap items-end gap-2">
                  <span className="display text-2xl md:text-3xl" style={{ color: "var(--orange-bright)" }}>Rp</span>
                  <span className="display text-6xl md:text-7xl leading-none" style={{ color: "var(--orange-bright)" }}>135.000</span>
                </div>
                <p className="mt-4 text-base md:text-lg" style={{ color: "#E4F3F8" }}>Sudah termasuk <strong style={{ color: "var(--orange-bright)" }}>FREE CUSTOM</strong> — tanpa biaya tambahan.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="chip-dark">Custom Desain</span>
                  <span className="chip-dark">Nameset</span>
                  <span className="chip-dark">Logo</span>
                  <span className="chip-dark">Sponsor</span>
                </div>
                <a href={wa("Halo, saya ingin pesan jersey fishing hoodie premium Rp135.000. Boleh dibantu?")} target="_blank" rel="noopener" className="btn mt-8">Pesan sekarang</a>
              </div>
            </div>

            {/* Rincian */}
            <div className="card-light p-8 md:p-10 flex flex-col justify-center reveal" style={{ transitionDelay: ".08s" }}>
              <p className="kicker" style={{ color: "var(--ink-soft)" }}>SUDAH TERMASUK</p>
              <ul className="mt-5 space-y-4 text-base md:text-lg" style={{ color: "var(--ink-soft)" }}>
                <li className="flex gap-3"><span className="check">✓</span> Bahan dry fit premium</li>
                <li className="flex gap-3"><span className="check">✓</span> Desain fishing eksklusif</li>
                <li className="flex gap-3"><span className="check">✓</span> Custom nameset GRATIS</li>
                <li className="flex gap-3"><span className="check">✓</span> Custom logo tim &amp; komunitas GRATIS</li>
                <li className="flex gap-3"><span className="check">✓</span> Custom logo sponsor GRATIS</li>
              </ul>
              <p className="mt-7 pt-6 text-base" style={{ borderTop: "1px solid #E1E9F1", color: "var(--ink-soft)" }}>
                Order rombongan atau satuan sama-sama bisa. Kirim nama, logo, atau desain kamu — tim kami yang bantu susun.
              </p>
            </div>
          </div>

          {/* Custom Desain Sendiri */}
          <div className="mt-8 card-light p-8 md:p-10 reveal">
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <p className="kicker" style={{ color: "var(--ink-soft)" }}>OPSI CUSTOM PENUH</p>
                <h3 className="display text-2xl md:text-3xl mt-2" style={{ color: "var(--navy-deep)" }}>Mau desain sendiri? Bebas.</h3>
                <p className="mt-3 text-base md:text-lg" style={{ color: "var(--ink-soft)" }}>
                  Kamu bisa custom desain dari nol — bebas pilih warna, motif, layout, nameset, logo tim, sampai logo sponsor.
                  Tinggal kirim referensi atau file desainmu, tim kami yang rapikan.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="chip-light">Bebas warna</span>
                  <span className="chip-light">Bebas motif</span>
                  <span className="chip-light">Desain dari nol</span>
                  <span className="chip-light">Revisi dibantu</span>
                </div>
              </div>
              <div className="rounded-[18px] p-6 text-center relative overflow-hidden" style={{ background: "var(--navy-deep)" }}>
                <div className="absolute inset-0 grid-lines" style={{ opacity: 0.4 }} />
                <div className="relative">
                  <p className="kicker" style={{ color: "var(--silver)" }}>MINIMAL ORDER</p>
                  <p className="display text-5xl md:text-6xl mt-1 leading-none" style={{ color: "var(--orange-bright)" }}>6</p>
                  <p className="mt-2 text-white">pcs untuk custom desain sendiri</p>
                  <p className="mt-3 text-sm" style={{ color: "var(--silver)" }}>Harga tetap Rp135.000 / jersey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. FINAL CTA / FOOTER (single) ===== */}
      <footer id="order" className="relative overflow-hidden" style={{ background: "var(--navy-deep)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(19,198,230,.28), transparent 62%)" }} />
        <div className="absolute inset-0 grid-lines" style={{ opacity: 0.4 }} />
        <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
          <div className="reveal">
            <p className="kicker" style={{ color: "var(--cyan-bright)" }}>JERSEY FISHING HOODIE PREMIUM</p>
            <h2 className="text-3xl md:text-5xl mt-5 text-white">Saatnya tampil kompak di spot.</h2>
            <p className="mt-6 text-base md:text-lg font-semibold" style={{ color: "#DCEAF3" }}>
              Jangan cuma jadi penonton. Bikin jersey fishing custom untuk tim dan komunitas kamu sekarang —
              nameset, logo tim &amp; logo sponsor semuanya gratis.
            </p>

            <div className="card-dark mt-9 p-6 inline-block text-left">
              <p className="kicker" style={{ color: "var(--silver)" }}>SEMUA GRATIS, TANPA BIAYA TAMBAHAN</p>
              <p className="display text-2xl md:text-3xl mt-2 text-white">Nameset <span className="cyan">•</span> Logo <span className="cyan">•</span> Sponsor</p>
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-2.5">
              <span className="chip-dark">Dry Fit</span>
              <span className="chip-dark">Ringan &amp; Nyaman</span>
              <span className="chip-dark">Adem</span>
              <span className="chip-dark">Jahitan Kuat</span>
              <span className="chip-dark chip-glow">Free Custom</span>
            </div>

            <div className="mt-10">
              <a href={wa("Halo, saya ingin custom jersey fishing hoodie premium untuk tim saya. Boleh dibantu?")} target="_blank" rel="noopener" className="btn text-lg">Custom jersey sekarang</a>
              <p className="mt-5 text-sm" style={{ color: "var(--silver)" }}>Klik tombol di atas dan konsultasikan desain kamu bersama tim kami.</p>
            </div>
          </div>
          <p className="mt-14 text-xs" style={{ color: "#5C7488" }}>© {new Date().getFullYear()} TNT SPORT APPAREL — Jersey Fishing Hoodie Premium</p>
        </div>
      </footer>

      {/* POPUP NOTIFIKASI */}
      <div
        className="fixed left-4 bottom-4 z-50 flex items-center gap-3 p-3 rounded-xl max-w-sm transition-all duration-500"
        style={{
          background: "var(--navy-deep)",
          border: "1px solid var(--line)",
          borderLeft: "4px solid var(--cyan)",
          boxShadow: "0 24px 50px -22px rgba(0,0,0,.9)",
          transform: popup.visible ? "translateY(0)" : "translateY(140%)",
          opacity: popup.visible ? 1 : 0,
          pointerEvents: popup.visible ? "auto" : "none",
        }}
      >
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--cyan)", boxShadow: "0 0 0 4px rgba(41,171,226,.16)" }} />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug">
            <strong className="text-white">{popup.data[0]}</strong>, baru memesan{" "}
            <em className="not-italic" style={{ color: "var(--silver)" }}>{popup.data[1]}</em>,{" "}
            <span style={{ color: "var(--ink-soft)" }}>{popup.data[2]}</span>
          </p>
        </div>
        <button onClick={popup.close} aria-label="Tutup notifikasi" className="shrink-0 text-lg leading-none px-1" style={{ color: "var(--ink-soft)", background: "none", border: "none", cursor: "pointer" }}>
          ×
        </button>
      </div>
    </div>
  );
}
