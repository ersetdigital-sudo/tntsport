"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

const WA_NUMBER_DEFAULT = "628115491117";

const TRUST_ITEMS = [
  "Langsung Dari Pabrik",
  "Bisa Order Satuan",
  "Gratis Desain + Revisi Bebas",
  "Bahan Dry Fit Premium",
];

const PAIN_POINTS = [
  {
    icon: "thermometer",
    title: "Kepanasan & Gerah",
    desc: "Jersey berbahan biasa bikin badan gerah, gak nyaman seharian di bawah terik matahari.",
  },
  {
    icon: "droplet",
    title: "Keringet Nempel",
    desc: "Bahan gak menyerap keringat bikin badan lepek dan risih pas mancing.",
  },
  {
    icon: "scissors",
    title: "Sablon Gampang Pudar",
    desc: "Jersey murah cuma sablon manual — warnanya luntur setelah beberapa kali cuci.",
  },
  {
    icon: "users",
    title: "Gak Ada Identitas Tim",
    desc: "Pakai kaos asal jadi bikin komunitas mancing kelihatan kurang kompak.",
  },
];

const VALUE_PROPS = [
  {
    icon: "factory",
    title: "Langsung Dari Pabrik",
    desc: "Gak perlu perantara, harga lebih hemat dan kualitas terjaga.",
  },
  {
    icon: "single",
    title: "Bisa Order Satuan",
    desc: "Mulai 1 pcs pun bisa. Gak perlu ngajak satu komunitas dulu.",
  },
  {
    icon: "design",
    title: "Gratis Desain + Revisi",
    desc: "Desain custom sesuai keinginan, revisi tanpa batas sampai cocok.",
  },
  {
    icon: "fabric",
    title: "Bahan Dry Fit Premium",
    desc: "Adem, ringan, dan menyerap keringat — cocok buat mancing panas-panasan.",
  },
  {
    icon: "print",
    title: "Full Printing Tajam",
    desc: "Warna cerah, desain tajam, tahan lama meski sering dicuci.",
  },
  {
    icon: "shield",
    title: "Kualitas Terjamin",
    desc: "Sudah dipercaya ratusan komunitas mancing di seluruh Indonesia.",
  },
];

const BENEFITS = [
  {
    icon: "price",
    title: "Harga Bersahabat",
    desc: "Mulai 75rb/pcs satuan, makin hemat kalau order rame-rame.",
  },
  {
    icon: "fast",
    title: "Proses Cepat",
    desc: "Estimasi 7 hari kerja, packing rapi dan aman sampai tujuan.",
  },
  {
    icon: "quality",
    title: "Jahitan Rapi",
    desc: "Dikerjakan oleh penjahit berpengalaman, jahitan kuat dan rapi.",
  },
  {
    icon: "custom",
    title: "100% Custom",
    desc: "Nama, nomor, logo, warna — semua bisa disesuaikan.",
  },
  {
    icon: "wa",
    title: "Konsultasi Gratis",
    desc: "Langsung chat admin via WhatsApp, dibantu dari awal sampai jadi.",
  },
  {
    icon: "safe",
    title: "Packing Aman",
    desc: "Setiap jersey dikemas rapi dengan bubble wrap untuk keamanan.",
  },
];

const STEPS = [
  { num: "1", title: "Chat Admin", desc: "Hubungi kami via WhatsApp, sampaikan kebutuhan jersey mancing kamu." },
  { num: "2", title: "Pilih Desain", desc: "Pilih dari katalog atau konsultasi desain custom dari nol." },
  { num: "3", title: "ACC & Bayar", desc: "Setujui desain final dan lakukan pembayaran DP." },
  { num: "4", title: "Produksi", desc: "Proses produksi 7 hari kerja sesuai jumlah pesanan." },
  { num: "5", title: "Kirim", desc: "Jersey dikirim rapi dengan pengemasan aman ke alamat kamu." },
];

const TESTIMONIALS = [
  {
    initials: "AR",
    name: "Andri",
    team: "Komunitas Mancing Jaktim",
    city: "Jakarta",
    quote: "Bahannya adem banget, dipake mancing dari subuh sampai sore tetap nyaman. Desainnya juga persis request komunitas kami.",
  },
  {
    initials: "RW",
    name: "Rizky",
    team: "Strike Mania",
    city: "Surabaya",
    quote: "Order 12 pcs buat komunitas, semua ukuran pas. Hasil printing tajam dan warnanya gak luntur meski kena air laut terus.",
  },
  {
    initials: "DP",
    name: "Dimas",
    team: "Mancing Bareng Bandung",
    city: "Bandung",
    quote: "Order satuan dulu buat tes, hasilnya langsung oke. Sekarang seluruh anggota komunitas sudah pesan ulang.",
  },
];

const GALLERY_IMAGES = [
  { src: "/landing/jersey-futsal/4c090b09-6b9d-4d9a-a061-ca955c49c520.png", alt: "Komunitas mancing memakai jersey custom di danau" },
  { src: "/landing/jersey-futsal/93c90d93-45be-4137-b10d-d810ada22df4.png", alt: "Tim mancing memakai jersey custom kuning" },
  { src: "/landing/jersey-futsal/0cde4945-3487-4e3d-ba70-e94156ac55e3.png", alt: "Pemancing memakai jersey custom lengan panjang" },
  { src: "/landing/jersey-futsal/3af292c0-b13f-4a74-b94e-c0b6885f633c.png", alt: "Komunitas mancing maroon di acara mancing bersama" },
  { src: "/landing/jersey-futsal/21bccec1-b05a-464e-bc44-54cb90c01dde.png", alt: "Tim mancing junior memakai jersey custom biru" },
];

const FAQS = [
  {
    q: "Berapa harga jersey mancing custom?",
    a: "Atasan Rp75.000/pcs untuk satuan dan Rp65.000/pcs untuk pembelian lusinan. Untuk order 50 pcs ke atas ada harga khusus, silakan hubungi admin.",
  },
  {
    q: "Minimal ordernya berapa pcs?",
    a: "Order satuan bisa mulai 1 pcs dengan memilih desain dari katalog. Kalau mau desain custom dari nol untuk komunitas, minimalnya 6 pcs.",
  },
  {
    q: "Bisa custom nama dan logo komunitas?",
    a: "Bisa. Nama, nomor, dan logo komunitas bisa dicustom, bahkan untuk order 1 pcs. Nama tiap anggota juga bisa dibuat berbeda dalam satu batch order.",
  },
  {
    q: "Berapa lama proses produksinya?",
    a: "Lama produksi tergantung jumlah order dan tingkat kerumitan desain. Rata-rata 7 hari kerja setelah desain disetujui. Estimasi waktu pasti akan diinformasikan admin.",
  },
  {
    q: "Bahannya cocok buat mancing di laut?",
    a: "Cocok. Kami pakai Dry Fit premium yang adem, menyerap keringat, dan tahan air. Warna dan printing juga tahan terkena air laut maupun air tawar.",
  },
  {
    q: "Gimana cara ordernya?",
    a: "Lima langkah: chat admin via WhatsApp, pilih dari katalog atau kirim desainmu, ACC desain lalu bayar DP, jersey masuk produksi, terakhir dikirim ke alamatmu. Desain dan revisinya gratis.",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".jersey-mancing .rv:not(.in), .jersey-mancing .rv-l:not(.in), .jersey-mancing .rv-r:not(.in), .jersey-mancing .rv-z:not(.in)");
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

export default function JerseyMancingLanding({ products, waNumber }: Props) {
  useScrollReveal();
  const [priceMode, setPriceMode] = useState<"ecer" | "lusin">("ecer");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [catalogLightbox, setCatalogLightbox] = useState<number | null>(null);
  const [galleryLightbox, setGalleryLightbox] = useState<number | null>(null);
  const trustTrackRef = useRef<HTMLDivElement>(null);
  const trustPaused = useRef(false);

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
    ecer: { atasan: "75RB", label: "Bisa pesan mulai 1 pcs" },
    lusin: { atasan: "65RB", label: "Minimal pembelian 12 pcs" },
  };

  return (
    <div className="jersey-mancing">
      {/* ===== Floating Logo ===== */}
      <a href="#top" className="float-logo" aria-label="Kembali ke atas">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3L2 9l10 6 10-6-10-6zM2 17l10 6 10-6M2 13l10 6 10-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--orange)" }} />
        </svg>
        <span>TNT SPORT</span>
      </a>

      {/* ===== 1. HERO ===== */}
      <section id="top" className="hero-section">
        <div className="hero-grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 sm:pt-28 sm:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="kicker mb-5 hero-up" style={{ animationDelay: "0.05s" }}>
                Fishing Jersey Custom
              </p>
              <h1 className="font-display hero-up" style={{ fontSize: "clamp(2rem, 6vw, 3.8rem)", lineHeight: 1.08, marginBottom: "1.5rem", animationDelay: "0.18s" }}>
                Jersey Mancing Custom &mdash; Tampil Kompak, Tangkap Ikan Lebih PD
              </h1>
              <p className="hero-up" style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text-secondary)", maxWidth: "36rem", lineHeight: 1.7, marginBottom: "1.5rem", animationDelay: "0.32s" }}>
                Full printing tajam, bahan Dry Fit Premium adem &amp; nyaman. Custom nama, nomor, dan logo komunitas mancing kamu sendiri.
              </p>

              <div className="flex items-stretch gap-3 mb-8 hero-up" style={{ animationDelay: "0.44s" }}>
                <span className="w-1 shrink-0 rounded-full" style={{ background: "linear-gradient(to bottom, var(--orange), var(--blue))" }} />
                <p className="font-heading font-semibold self-center" style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: "var(--text-secondary)" }}>
                  Mulai <span className="font-display" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--orange)" }}>75 RIBU</span> / pcs
                  <span className="block text-xs mt-1" style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>DESAIN KATALOG SIAP PESAN</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 hero-up" style={{ animationDelay: "0.56s" }}>
                <a
                  href={waLink("Halo TNT SPORT APPAREL, saya mau order jersey mancing custom. Boleh dibantu?")}
                  target="_blank"
                  rel="noopener"
                  className="btn-primary text-base px-8 py-4"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.13h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 01-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.24-8.23 8.24zm4.53-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" /></svg>
                  Order via WhatsApp
                </a>
                <a href="#harga" className="btn-secondary text-base px-8 py-4">
                  Lihat Harga
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-3 rounded-2xl blur-xl" style={{ background: "radial-gradient(circle at 60% 35%, rgba(37,99,235,0.12), transparent 70%)" }} aria-hidden="true" />
              <figure className="relative overflow-hidden rounded-2xl border border-[var(--border)]">
                <img
                  src="/landing/jersey-futsal/foto-team.webp"
                  alt="Komunitas mancing memakai jersey custom TNT Sport Apparel"
                  className="w-full h-auto object-cover aspect-[4/5]"
                  loading="lazy"
                />
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/90 font-semibold">Dry Fit Premium · Full Printing</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. TRUST BAR ===== */}
      <section className="trust-bar" onMouseEnter={() => { trustPaused.current = true; }} onMouseLeave={() => { trustPaused.current = false; }}>
        <div className="py-4 overflow-hidden">
          <div ref={trustTrackRef} className="trust-track">
            {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 font-semibold text-sm sm:text-base px-5 shrink-0">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. PROBLEM ===== */}
      <section id="masalah" className="section-light py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl rv">
            <p className="kicker mb-4">Masalah Umum</p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", lineHeight: 1.1 }}>
              Jersey Biasa Bikin Mancing Nggak Nyaman?
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Banyak pemancing pakai kaos biasa karena jersey mancing gak ada yang sesuai kebutuhan. Akhirnya kepanasan, gerah, dan gak pede pas kumpul komunitas. Kami hadir buat jawab semua itu.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAIN_POINTS.map((p, i) => (
              <article key={i} className="card p-6 rv" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: "rgba(220,38,38,0.08)" }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="var(--destructive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {p.icon === "thermometer" && <><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" /></>}
                    {p.icon === "droplet" && <><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" /></>}
                    {p.icon === "scissors" && <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></>}
                    {p.icon === "users" && <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></>}
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold" style={{ color: "var(--text)" }}>{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. SOLUTION / VALUE PROPS ===== */}
      <section id="solusi" className="section-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl rv">
            <p className="kicker mb-4">Solusinya</p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", lineHeight: 1.1 }}>
              Jersey Mancing Custom TNT Sport &mdash; <span style={{ color: "var(--blue)" }}>Solusinya!</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Kami produksi jersey mancing custom yang nyaman, tahan lama, dan punya identitas komunitas kamu sendiri. Gak perlu jersey pasaran lagi.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUE_PROPS.map((v, i) => (
              <article key={i} className="card p-7 rv" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: "rgba(37,99,235,0.08)" }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {v.icon === "factory" && <><path d="M2 20h20M5 20V8l7-4 7 4v12M9 20v-6h6v6" /></>}
                    {v.icon === "single" && <><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></>}
                    {v.icon === "design" && <><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></>}
                    {v.icon === "fabric" && <><path d="M20.38 3.46L16 2 12 5.5 8 2 3.62 3.46a2 2 0 00-1.34 1.89v13.3a2 2 0 002.66 1.89L8 17l4 3.5 4-3.5 3.06 1.05a2 2 0 002.66-1.89V5.35a2 2 0 00-1.34-1.89z" /></>}
                    {v.icon === "print" && <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M12 18h.01" /></>}
                    {v.icon === "shield" && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>}
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold" style={{ color: "var(--text)" }}>{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. CATALOG ===== */}
      <section id="katalog" className="section-light py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="kicker mb-4 rv">Katalog Desain</p>
            <h2 className="font-display rv swipe" style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)", marginBottom: "1rem" }}>
              Pilih Desain, <span style={{ color: "var(--blue)" }}>Sisanya Kita Custom</span>
            </h2>
            <p className="text-base leading-relaxed rv" style={{ color: "var(--text-secondary)" }}>
              Ini {products.length} dari desain mancing yang sudah siap. Order satuan: tinggal tambah nama, nomor, logo komunitas &amp; sponsor. Mau ganti warna atau desain dari nol? Ambil paket custom minimal 6 pcs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((p, i) => (
              <figure key={p.id} className="card overflow-hidden group rv-z">
                <button
                  type="button"
                  onClick={() => setCatalogLightbox(i)}
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
                <figcaption className="p-3 sm:p-4 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-sm sm:text-base leading-tight truncate" style={{ color: "var(--text)" }}>{p.catalogue}</p>
                  </div>
                  <a
                    href={buildWhatsAppLink(waNumber || WA_NUMBER_DEFAULT, `Halo TNT SPORT APPAREL, saya tertarik dengan desain *${p.catalogue}* di kategori *Fishing*. Bisa info lebih lanjut?`)}
                    target="_blank"
                    rel="noopener"
                    className="font-semibold shrink-0 transition-colors"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--orange)" }}
                  >
                    Pilih →
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Catalog Lightbox */}
          {catalogLightbox !== null && products[catalogLightbox] && (
            <div
              className="lightbox-overlay"
              onClick={() => setCatalogLightbox(null)}
              role="dialog"
              aria-modal="true"
            >
              <div className="relative my-auto" style={{ maxWidth: "92vw" }} onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setCatalogLightbox(null)}
                  aria-label="Tutup foto"
                  className="lightbox-close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={products[catalogLightbox].image}
                  alt={products[catalogLightbox].alt}
                  className="max-h-[65vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <p className="mt-3 text-center text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>{products[catalogLightbox].catalogue}</p>
                <div className="mt-4 flex justify-center">
                  <a
                    href={buildWhatsAppLink(waNumber || WA_NUMBER_DEFAULT, `Halo TNT SPORT APPAREL, saya tertarik dengan desain *${products[catalogLightbox].catalogue}* di kategori *Fishing*. Bisa info lebih lanjut?`)}
                    target="_blank"
                    rel="noopener"
                    className="btn-primary text-sm px-6 py-3"
                    style={{ borderRadius: "9999px" }}
                  >
                    🎣 Tanya Desain Ini via WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== 6. COMPARISON ===== */}
      <section id="perbandingan" className="section-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="kicker mb-4 rv">Perbandingan</p>
            <h2 className="font-display rv swipe" style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}>
              Custom Full Team <span style={{ color: "var(--blue)" }}>vs</span> Order Satuan
            </h2>
          </div>

          <div className="rv overflow-x-auto">
            <table className="cmp w-full text-sm" style={{ borderCollapse: "collapse", minWidth: "480px" }}>
              <thead>
                <tr>
                  <th className="text-left py-3 pr-4" style={{ borderBottom: "2px solid var(--border)" }}>Fitur</th>
                  <th className="text-center py-3 px-4" style={{ borderBottom: "2px solid var(--blue)", color: "var(--blue)" }}>Custom Full Team</th>
                  <th className="text-center py-3 pl-4" style={{ borderBottom: "2px solid var(--orange)", color: "var(--orange)" }}>Order Satuan</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Minimum", "6 pcs", "1 pcs"],
                  ["Desain dari nol", "✔", "—"],
                  ["Pilih desain katalog", "✔", "✔"],
                  ["Ganti warna & motif", "✔", "—"],
                  ["Nama", "✔", "✔"],
                  ["Nomor", "✔", "✔"],
                  ["Logo Komunitas", "✔", "✔"],
                  ["Logo Sponsor", "✔", "✔"],
                ].map(([feat, custom, satuan], i) => (
                  <tr key={i}>
                    <td className="py-3 pr-4 font-medium" style={{ color: "var(--text)", borderBottom: "1px solid var(--border)" }}>{feat}</td>
                    <td className="text-center py-3 px-4 font-semibold" style={{ color: custom === "✔" ? "var(--blue)" : "var(--muted)", borderBottom: "1px solid var(--border)" }}>{custom}</td>
                    <td className="text-center py-3 pl-4 font-semibold" style={{ color: satuan === "✔" ? "var(--orange)" : "var(--muted)", borderBottom: "1px solid var(--border)" }}>{satuan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== 7. BENEFITS ===== */}
      <section id="keunggulan" className="section-light py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl rv">
            <p className="kicker mb-4">Keunggulan</p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", lineHeight: 1.1 }}>
              Kenapa Pilih <span style={{ color: "var(--blue)" }}>TNT Sport?</span>
            </h2>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <article key={i} className="card p-7 rv" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: "rgba(234,88,12,0.08)" }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {b.icon === "price" && <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>}
                    {b.icon === "fast" && <><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>}
                    {b.icon === "quality" && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>}
                    {b.icon === "custom" && <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></>}
                    {b.icon === "wa" && <><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></>}
                    {b.icon === "safe" && <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z" /></>}
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold" style={{ color: "var(--text)" }}>{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. PROCESS / TIMELINE ===== */}
      <section id="proses" className="section-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl rv">
            <p className="kicker mb-4">Proses Order</p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", lineHeight: 1.1 }}>
              5 Langkah Sampai Jerseymu Jadi
            </h2>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {STEPS.map((step, i) => (
              <div key={i} className="card p-6 rv" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span
                  className="font-display text-3xl font-bold"
                  style={{
                    WebkitTextStroke: "2px var(--blue)",
                    color: "transparent",
                  }}
                >
                  {step.num}
                </span>
                <p className="font-heading mt-3 text-lg font-semibold" style={{ color: "var(--text)" }}>{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="rv mt-10 text-center">
            <a
              href={waLink("Halo, saya ingin order jersey mancing custom sekarang.")}
              target="_blank"
              rel="noopener"
              className="btn-primary text-base px-8 py-4"
              style={{ borderRadius: "9999px" }}
            >
              🎣 Mulai Order Sekarang →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 9. TESTIMONIALS ===== */}
      <section id="testimoni" className="section-light py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl rv">
            <p className="kicker mb-4">Ulasan Pelanggan</p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", lineHeight: 1.1 }}>
              Kata Pelanggan <span style={{ color: "var(--blue)" }}>Kami</span>
            </h2>
            <p className="mt-4 text-base" style={{ color: "var(--text-secondary)" }}>Komunitas mancing sudah percaya kualitas jersey kami.</p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="card p-7 flex flex-col rv" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p className="font-semibold text-xs" style={{ color: "var(--success)", letterSpacing: "0.12em" }}>✔ Verified Buyer</p>
                <p className="mt-2 text-sm" style={{ color: "var(--orange)", letterSpacing: "0.08em" }}>★★★★★</p>
                <blockquote className="mt-3 text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className="font-display text-base font-bold"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      display: "grid",
                      placeItems: "center",
                      background: "var(--blue)",
                      color: "#fff",
                      borderRadius: "9999px",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>— {t.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{t.team} · {t.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Stats bar */}
          <div className="rv mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14 py-6" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            {[
              { num: "350K+", label: "Order Selesai" },
              { num: "9K+", label: "Klien Puas" },
              { num: "4.9", label: "Rating" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold" style={{ color: "var(--blue)" }}>{s.num}</p>
                <p className="text-xs font-semibold mt-1" style={{ color: "var(--muted)", letterSpacing: "0.12em" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Gallery Marquee ===== */}
      <section id="galeri" className="section-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-6">
            <p className="kicker mb-4 rv">Foto Hasil Jersey</p>
            <h2 className="font-display rv swipe" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}>
              Bukan Edit, <span style={{ color: "var(--blue)" }}>Bukan Rekayasa</span>
            </h2>
            <p className="mt-3 text-sm rv" style={{ color: "var(--muted)" }}>Foto asli dari pelanggan</p>
          </div>
        </div>
        <div className="gal-wrap mt-7">
          <div className="gal-track">
            {Array.from({ length: 2 }).map((_, dup) =>
              GALLERY_IMAGES.map((g, i) => (
                <button
                  key={`${dup}-${i}`}
                  type="button"
                  onClick={() => setGalleryLightbox(dup === 0 ? i : null)}
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 text-center rv">
          <a
            href={waLink("Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan, saya mau order seperti itu!")}
            target="_blank"
            rel="noopener"
            className="btn-primary text-base px-7 py-4"
            style={{ borderRadius: "6px" }}
          >
            🎣 Mau Jersey Seperti Ini? Order Sekarang
          </a>
        </div>

        {/* Gallery Lightbox */}
        {galleryLightbox !== null && GALLERY_IMAGES[galleryLightbox] && (
          <div
            className="lightbox-overlay"
            onClick={() => setGalleryLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative my-auto" style={{ maxWidth: "92vw" }} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setGalleryLightbox(null)}
                aria-label="Tutup foto"
                className="lightbox-close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GALLERY_IMAGES[galleryLightbox].src}
                alt={GALLERY_IMAGES[galleryLightbox].alt}
                className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              />
              <p className="mt-3 text-center text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{GALLERY_IMAGES[galleryLightbox].alt}</p>
            </div>
          </div>
        )}
      </section>

      {/* ===== 10. FAQ ===== */}
      <section id="faq" className="section-light py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14">
            <div className="rv">
              <p className="kicker mb-4">FAQ</p>
              <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", lineHeight: 1.1 }}>
                Pertanyaan <span style={{ color: "var(--blue)" }}>Yang Sering Masuk</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Belum nemu jawaban yang kamu cari? Chat langsung via WhatsApp, admin kami siap bantu kapan aja.
              </p>
              <a
                href={waLink("Halo TNT SPORT APPAREL, saya punya pertanyaan tentang jersey mancing custom.")}
                target="_blank"
                rel="noopener"
                className="btn-secondary mt-6 inline-flex text-sm px-6 py-3"
              >
                Chat Admin via WhatsApp
              </a>
            </div>

            <div className="rv-r space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="faq-a">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. CTA FINAL ===== */}
      <section id="cta" className="cta-final py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto rv">
            <h2 className="font-display text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
              Siap Bikin Jersey Mancing?
            </h2>
            <p className="mt-5 text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
              Jangan cuma jadi penonton — wujudkan jersey impian komunitas mancing kamu sekarang juga.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waLink("Halo TNT SPORT APPAREL, saya mau mulai order jersey mancing custom untuk komunitas saya.")}
                target="_blank"
                rel="noopener"
                className="btn-primary text-base px-8 py-4"
                style={{ background: "var(--orange)", borderRadius: "9999px" }}
              >
                🎣 Order Jersey Sekarang
              </a>
            </div>
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Gratis konsultasi desain · Bisa satuan · Packing aman
            </p>
          </div>
        </div>
      </section>

      {/* ===== 12. FOOTER ===== */}
      <footer className="site-footer py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold" style={{ color: "#fff" }}>TNT SPORT APPAREL</span>
              <span className="text-xs">&copy; {new Date().getFullYear()}</span>
            </div>
            <p className="text-xs text-center sm:text-right" style={{ color: "rgba(255,255,255,0.4)" }}>
              Jersey mancing custom full printing · Bahan Dry Fit Premium · Langsung dari pabrik
            </p>
          </div>
        </div>
      </footer>

      {/* ===== Floating WhatsApp ===== */}
      <a
        href={waLink("Halo TNT SPORT APPAREL, saya tertarik dengan jersey mancing custom. Bisa info lebih lanjut?")}
        target="_blank"
        rel="noopener"
        className="wa-float"
        aria-label="Chat WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.13h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 01-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.24-8.23 8.24zm4.53-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
        </svg>
      </a>
    </div>
  );
}
