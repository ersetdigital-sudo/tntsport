import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Archivo_Black, DM_Sans } from "next/font/google";
import { PromoNav } from "@/components/PromoNav";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import { getBrand, getKatalogTestimonials } from "@/lib/queries";

const PromoDesignGrid = dynamic(() => import("@/components/PromoDesignGrid").then(m => m.PromoDesignGrid));
const PageViewTracker = dynamic(() => import("@/components/PageViewTracker").then(m => m.PageViewTracker));
const PhotoGallery = dynamic(() => import("@/components/PhotoGallery").then(m => m.PhotoGallery));
const ViewContentTracker = dynamic(() => import("@/components/ViewContentTracker").then(m => m.ViewContentTracker));

export const revalidate = 3600;

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

const FEATURES = [
  {
    icon: "/478b7ee7-e7d0-445e-94d7-d63f1e4484d4.svg",
    title: "Adem & Nyaman",
    desc: "Bahan ringan, menyerap keringat, dan nyaman untuk aktivitas fisik intens.",
  },
  {
    icon: "/a9338ee8-b3e8-4859-a2ca-e69aa12edda9.svg",
    title: "Free Custom Design",
    desc: "Tim desainer siap mewujudkan ide jersey dengan revisi tanpa batas.",
  },
  {
    icon: "/jahitan-kuat-rapi.png",
    title: "Jahitan Kuat & Rapi",
    desc: "Dijahit presisi dengan mesin modern agar awet untuk jangka panjang.",
  },
  {
    icon: "/98907d3f-8c1b-41ae-8cf1-9b3d483dace9.svg",
    title: "Cepat & Tepat",
    desc: "Proses produksi terjadwal, cocok bahkan untuk turnamen mendadak.",
  },
];

const INFO_CARDS = [
  { icon: "/cfab14fb-fc07-4a15-84f4-ebb1af1b0585.svg", title: "Mesin teknologi tinggi", desc: "Hasil print konsisten dan presisi." },
  { icon: "/6266d3d8-3e9e-46b3-a2cf-2d6a5cf908fa.svg", title: "Tinta bersertifikat", desc: "Tajam, cerah, dan tidak mudah pudar." },
  { icon: "/8999be50-4d20-45c1-b37e-0ce948ade336.svg", title: "Pelayanan profesional", desc: "Didampingi dari konsultasi sampai kirim." },
];

const STEPS = [
  { title: "Konsultasi", desc: "Ceritakan kebutuhan jersey kamu." },
  { title: "Desain", desc: "Tim kami buat mockup sesuai keinginan." },
  { title: "ACC & DP", desc: "Setujui desain lalu DP 50%." },
  { title: "Produksi", desc: "Diproduksi cepat di pabrik." },
  { title: "Kirim", desc: "Dikemas aman dikirim ke alamatmu." },
];

const REVIEWS = [
  {
    quote: "Desain mantap. Tadinya belum ada ide sama sekali, tapi tim desainnya keren dan mau revisi berkali-kali.",
    name: "Aliasta M",
    meta: "Magelang · Komunitas",
    dark: false,
  },
  {
    quote: "Sudah 3x order jersey padel di sini. Kualitas konsisten bagus, jahitan kuat, bahan adem, dan CS fast response.",
    name: "Silva Nurliva",
    meta: "Purwokerto · Tim Padel",
    dark: true,
  },
  {
    quote: "1500 pcs dikebut satu minggu, hasil mantap dan event berjalan sesuai harapan. Makasih sudah bantu!",
    name: "Wahyu Rahmani",
    meta: "Banjarmasin · Event Running",
    dark: false,
  },
];

const GALLERY_IMAGES = [
  { src: "/b2fe362c-daed-4c7c-82af-a78c1e9da0cc.jpg", alt: "Tim sepak bola memakai jersey custom merah" },
  { src: "/a66a21ab-a0c6-44d6-9b52-d5596a15fcc6.jpg", alt: "Tim junior memakai jersey kuning custom" },
  { src: "/0696556a-f40d-4067-a896-0524dcfe4a36.jpg", alt: "Pelanggan memakai jersey merah custom" },
  { src: "/1537d016-3b7d-4c45-9f20-6c2c9ac9ebdf.jpg", alt: "Tim dalam turnamen dengan jersey custom" },
  { src: "/37de4d36-d677-43f0-ae3c-8f5ac22298f8.jpg", alt: "Tim menerima penghargaan" },
  { src: "/1fa04ec7-8832-45d4-b869-3f25ffdef9ca.jpg", alt: "Tim di kejuaraan" },
];

const FAQS = [
  { q: "Apakah ada minimal order?", a: "Tidak ada. Kamu bisa order satuan. Untuk order 12 pcs, dapat bonus 1 pcs gratis dan berlaku kelipatannya." },
  { q: "Berapa lama proses produksi?", a: "Produksi dimulai setelah desain disetujui dan DP masuk. Jadwal pengerjaan disepakati bersama sesuai jumlah dan kebutuhanmu." },
  { q: "Apakah bisa request desain sendiri?", a: "Bisa. Kirim referensi desain, logo, atau gambar. Tim desainer akan membantu mewujudkannya dan memberi kesempatan revisi." },
  { q: "Bahan jersey apa saja yang tersedia?", a: "Tersedia Dryfit Brazil, Milano, Embossed, Jacquard, dan bahan khusus sesuai kebutuhan." },
];

const TICKER_TEXT =
  "Gratis desain — Revisi tanpa batas — Tanpa minimal order — Beli 12 gratis 1 — Produksi cepat — ";

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const url = brand.url || "https://www.tntsportapparel.id";
  return {
    title: "Promo Kemerdekaan — TNT SPORT APPAREL",
    description:
      "Promo jersey custom kemerdekaan dari TNT SPORT APPAREL. Gratis desain, nama, nomor & logo. Tanpa minimal order, revisi bebas.",
    alternates: { canonical: "/promo-bulan-ini" },
    openGraph: {
      title: "Promo Kemerdekaan — TNT SPORT APPAREL",
      description:
        "Jersey custom full printing mulai 85 ribu. Gratis desain, bebas custom nama, nomor, dan logo, tanpa minimal order.",
      url: `${url}/promo-bulan-ini`,
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: "Promo Kemerdekaan — TNT SPORT APPAREL",
      description: "Jersey custom full printing dari 85 ribu. Gratis desain, tanpa minimal order.",
    },
  };
}

export default async function PromoBulanIniPage() {
  const brand = await getBrand();
  const dbTestimonialsRaw = await getKatalogTestimonials();
  const dbTestimonials = dbTestimonialsRaw?.map((t) => ({
    quote: t.quote,
    name: t.name,
    meta: t.team ? `${t.city} · ${t.team}` : t.city,
    dark: true,
  })) ?? REVIEWS;
  const waNumber = brand.whatsappNumber || "628115491117";
  const wa = (msg: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  const waGeneral = wa("Halo TNT SPORT APPAREL, saya mau tanya promo bulan ini 🎉");
  const waAtasan = wa("Halo TNT SPORT APPAREL, saya ingin membuat Jersey Atasan Full Printing. Boleh dibantu konsultasi desain dan hitung total harganya?");
  const waSetelan = wa("Halo TNT SPORT APPAREL, saya ingin membuat Jersey Setelan Full Printing. Boleh dibantu konsultasi desain, pilihan bahan, dan total biayanya?");
  const waPenawaran = wa("Halo TNT SPORT APPAREL, saya mau penawaran khusus partai besar");
  const waKlaim = wa("Halo TNT SPORT APPAREL, saya mau klaim promo *Beli 12 Gratis 1*");
  const waKonsultasi = wa("Halo TNT SPORT APPAREL, saya mau mulai konsultasi jersey custom");

  return (
    <div
      className={`${archivoBlack.variable} ${dmSans.variable} overflow-x-hidden bg-[#09090b] text-white antialiased selection:bg-[#ef233c] selection:text-white`}
      style={{ fontFamily: "var(--font-dm)" }}
    >
      <style>{`
        .pdisplay { font-family: var(--font-ab); letter-spacing:-.045em; }
        .p-display { font-family: var(--font-ab); letter-spacing:-.045em; }
        .noise { background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E"); }
        .hero-grid { background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px); background-size:54px 54px; }
        .hero-shade { background:linear-gradient(180deg,rgba(9,9,11,.18) 0%,rgba(9,9,11,.7) 54%,#09090b 100%); }
        @media (min-width:1024px) { .hero-shade { background:radial-gradient(circle at 80% 26%,rgba(239,35,60,.18),transparent 34%),linear-gradient(90deg,#09090b 0%,#09090b 36%,rgba(9,9,11,.85) 42%,rgba(9,9,11,.08) 70%,rgba(9,9,11,.35) 100%); } }
        .faq[open] .faq-plus { transform:rotate(45deg); }
        .faq-plus { transition:transform .25s ease; }
        .promo-ticker { animation:promo-ticker-scroll 26s linear infinite; will-change:transform; }
        @keyframes promo-ticker-scroll { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
        .gallery-scroll .gallery-track { animation:promo-gallery-scroll 16s linear infinite; will-change:transform; }
        .gallery-scroll:hover .gallery-track { animation-play-state:paused; }
        @keyframes promo-gallery-scroll { to { transform:translateX(-50%); } }
        .tnt-hero__glow { position:absolute; right:-6%; top:44%; width:60vw; height:60vw; max-width:900px; max-height:900px; transform:translateY(-50%); background:radial-gradient(circle,rgba(239,35,60,.45) 0%,transparent 62%); filter:blur(30px); opacity:.55; mix-blend-mode:screen; }
        .tnt-hero__stripes { position:absolute; inset:0; background-image:repeating-linear-gradient(115deg,rgba(255,255,255,.028) 0px,rgba(255,255,255,.028) 1px,transparent 1px,transparent 13px); opacity:.8; }
        .tnt-hero__ghost { position:absolute; left:2vw; bottom:-8vh; z-index:1; font-family:var(--font-ab); font-style:italic; font-weight:800; font-size:clamp(18rem,34vw,40rem); line-height:.78; letter-spacing:-.04em; color:transparent; -webkit-text-stroke:2px rgba(255,255,255,.11); pointer-events:none; user-select:none; }
        .tnt-title__underline { position:absolute; left:0; bottom:-.12em; width:100%; height:.07em; min-height:5px; border-radius:999px; background:linear-gradient(90deg,#ef233c 0%,#ef233c 50%,#fff 50%,#fff 100%); }
        .tnt-check { width:15px; height:15px; flex:none; border-radius:50%; background:#ef233c; position:relative; }
        .tnt-check::after { content:""; position:absolute; left:4.5px; top:2.5px; width:4px; height:7px; border:solid #fff; border-width:0 2px 2px 0; transform:rotate(43deg); }
        .tnt-pill__flag { width:20px; height:14px; border-radius:2px; overflow:hidden; background:linear-gradient(180deg,#E8112D 0 50%,#FFFFFF 50% 100%); box-shadow:0 0 0 1px rgba(0,0,0,.35),0 1px 3px rgba(0,0,0,.4); flex:none; }
        .tnt-pill__sep { width:1px; height:12px; background:rgba(255,255,255,.45); }
        .tnt-dot { width:7px; height:7px; border-radius:50%; background:#ef233c; box-shadow:0 0 0 0 rgba(239,35,60,.45); animation:tnt-ping 1.9s ease-out infinite; }
        @keyframes tnt-ping { 0% { box-shadow:0 0 0 0 rgba(239,35,60,.65); } 70% { box-shadow:0 0 0 9px rgba(239,35,60,0); } 100% { box-shadow:0 0 0 0 rgba(239,35,60,0); } }
        .tnt-hero__photo { position:absolute; inset:0 0 0 auto; width:78%; height:100%; object-fit:cover; object-position:42% 22%; filter:contrast(1.08) saturate(.95) brightness(.86); }
        .tnt-hero__scrim { position:absolute; inset:0; background:linear-gradient(90deg,#09090b 0%,#09090b 30%,rgba(9,9,11,.96) 42%,rgba(9,9,11,.72) 54%,rgba(9,9,11,.28) 70%,rgba(9,9,11,.10) 88%,rgba(9,9,11,.55) 100%),linear-gradient(180deg,rgba(9,9,11,.70) 0%,transparent 26%,transparent 62%,rgba(9,9,11,.85) 100%); }
        @media (max-width:1024px) { .tnt-hero__photo { width:86%; object-position:34% 18%; } .tnt-hero__scrim { background:linear-gradient(90deg,#09090b 0%,rgba(9,9,11,.95) 38%,rgba(9,9,11,.62) 60%,rgba(9,9,11,.30) 100%),linear-gradient(180deg,rgba(9,9,11,.6) 0%,transparent 30%,rgba(9,9,11,.8) 100%); } }
        @media (max-width:760px) { .tnt-hero__photo { width:100%; height:46svh; inset:0 0 auto 0; object-position:center 16%; } .tnt-hero__scrim { background:linear-gradient(180deg,rgba(9,9,11,.45) 0%,rgba(9,9,11,.20) 22%,rgba(9,9,11,.86) 38%,#09090b 48%,#09090b 100%); } .tnt-hero__glow { top:26%; right:-20%; opacity:.4; } .tnt-hero__ghost { font-size:16rem; right:-1rem; bottom:2vh; opacity:.7; } }
      `}</style>

      <PromoNav />

      <main>
        <PageViewTracker page="promo-bulan-ini" />
        <ViewContentTracker contentName="Promo Kemerdekaan" contentCategory="Promo" />
        {/* HERO */}
        <section id="home" className="relative min-h-[900px] overflow-hidden bg-[#09090b] text-white lg:min-h-[850px]">
          {/* Latar */}
          <div className="absolute inset-0 z-0">
            <div className="hero-photo pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[490px] lg:left-[40%] lg:right-0 lg:top-0 lg:h-full lg:w-[60%]">
              <Image
                src="/promo/promo-hero.png"
                alt="Model menggunakan jersey custom TNT SPORT APPAREL"
                fill
                priority
                sizes="100vw"
                className="object-cover object-top lg:object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent lg:hidden" />
            </div>
            <div className="tnt-hero__scrim" />
            <div className="tnt-hero__glow" />
            <div className="tnt-hero__stripes" />
          </div>

          {/* Angka 81 raksasa */}
          <div className="tnt-hero__ghost" aria-hidden="true">81</div>

          <div className="relative z-20 mx-auto flex min-h-[900px] max-w-7xl items-center px-5 pb-[430px] pt-16 lg:min-h-[850px] lg:px-8 lg:pb-24 lg:pt-12">
            <div className="max-w-[640px] pt-4 lg:pt-0">

              {/* Eyebrow: pill + emblem */}
              <div className="flex flex-wrap items-center gap-y-3">
                <div className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#ef233c] to-[#a80d21] px-4 py-2 text-[11px] font-bold uppercase tracking-[.14em] text-white shadow-[0_6px_26px_-8px_rgba(239,35,60,.45)]">
                  <span className="tnt-pill__flag" aria-hidden="true" />
                  <span>Promo Kemerdekaan</span>
                  <span className="tnt-pill__sep" aria-hidden="true" />
                  <span className="font-semibold opacity-90 tracking-[.1em]">17 Agustus</span>
                </div>

                {/* Emblem HUT RI ke-81 */}
                <div className="inline-flex items-center gap-2.5 border-l border-white/16 pl-3.5 ml-3.5">
                  <svg width="62" height="50" viewBox="0 0 120 96" role="img" aria-label="Dirgahayu Indonesia ke-81" className="shrink-0 drop-shadow-[0_3px_8px_rgba(0,0,0,.45)]">
                    <defs>
                      <linearGradient id="tntRed2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#F5304A" />
                        <stop offset="1" stopColor="#B00C22" />
                      </linearGradient>
                    </defs>
                    <text x="4" y="60" fontFamily="Arial Narrow, sans-serif" fontSize="66" fontWeight="800" fontStyle="italic" fill="url(#tntRed2)" stroke="#fff" strokeWidth="2.4" paintOrder="stroke">81</text>
                    <text x="78" y="60" fontFamily="Arial Narrow, sans-serif" fontSize="24" fontWeight="800" fill="#fff">TH</text>
                    <path d="M4 72 C30 64, 62 80, 116 68 L116 80 C62 92, 30 76, 4 84 Z" fill="#E8112D" />
                    <path d="M4 84 C30 76, 62 92, 116 80 L116 92 C62 104, 30 88, 4 96 Z" fill="#fff" opacity=".92" />
                  </svg>
                  <div className="flex flex-col leading-[1.25]">
                    <strong className="text-[13px] font-bold text-white">Dirgahayu Indonesia</strong>
                    <span className="text-[11px] font-semibold tracking-[.12em] text-[#A2A8B3]">1945 – 2026</span>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <h1 className="pdisplay mt-6 max-w-3xl uppercase leading-[.87] tracking-[-.015em] text-white sm:mt-8">
                <span className="block text-[clamp(3.4rem,8.2vw,7.2rem)]">Jersey</span>
                <span className="block text-[clamp(3.4rem,8.2vw,7.2rem)]">Custom</span>
                <span className="block text-[clamp(3.4rem,8.2vw,7.2rem)]">Mulai</span>
                <span className="relative inline-block mt-[.06em] text-[clamp(3.4rem,8.2vw,7.2rem)] text-[#ef233c] drop-shadow-[0_0_44px_rgba(239,35,60,.38)]">
                  85 Ribu!
                  <span className="tnt-title__underline" aria-hidden="true" />
                </span>
              </h1>

              {/* Subcopy */}
              <p className="mt-6 max-w-[30rem] text-[clamp(.98rem,1.15vw,1.08rem)] leading-[1.65] text-[#A2A8B3] sm:mt-8">
                Rayakan HUT RI ke-81 dengan seragam tim kebanggaanmu. Mulai <strong className="font-bold text-white">Rp85.000</strong> — gratis desain, nama, nomor &amp; logo. Tanpa minimum order, langsung diproduksi di pabrik sendiri.
              </p>

              {/* Fitur */}
              <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2.5 sm:mt-6 sm:gap-x-2.5 sm:gap-y-3">
                {["Gratis desain", "Tanpa minimal order", "Revisi bebas"].map((feat) => (
                  <li key={feat} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3.5 py-[11px] text-[12px] font-semibold tracking-[.02em] text-[#E4E7EC]">
                    <span className="tnt-check" aria-hidden="true" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:mt-9">
                <a
                  href="#harga"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#ef233c] to-[#a80d21] px-8 py-4 text-sm font-bold uppercase tracking-[.06em] text-white shadow-[0_14px_38px_-12px_rgba(239,35,60,.45),inset_0_1px_0_rgba(255,255,255,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_46px_-12px_rgba(239,35,60,.62),inset_0_1px_0_rgba(255,255,255,.28)]"
                >
                  Klaim Promo
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a
                  href="#cara-order"
                  className="inline-flex items-center justify-center rounded-full border border-white/22 bg-white/[.03] px-8 py-4 text-sm font-bold uppercase tracking-[.06em] text-white backdrop-blur transition hover:border-white/45 hover:bg-white/[.09] hover:-translate-y-0.5"
                >
                  Cara order
                </a>
              </div>

              {/* Urgensi */}
              <p className="mt-5 flex items-center gap-2.5 text-[13px] font-medium text-[#C6CBD4] sm:mt-5">
                <span className="tnt-dot" aria-hidden="true" />
                Kuota promo terbatas — berakhir 31 Agustus
              </p>

              {/* Statistik */}
              <div className="mt-7 flex w-fit flex-wrap gap-[clamp(1.5rem,4vw,3rem)] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.055] to-white/[.015] px-[1.7rem] py-[1.4rem] backdrop-blur-[10px] sm:mt-9">
                <div className="flex flex-col gap-0.5">
                  <span className="pdisplay text-[clamp(1.85rem,3.2vw,2.4rem)] font-extrabold leading-none tracking-[-.01em]">350K+</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#A2A8B3]">Order selesai</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="pdisplay text-[clamp(1.85rem,3.2vw,2.4rem)] font-extrabold leading-none tracking-[-.01em]">9K+</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#A2A8B3]">Klien puas</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="pdisplay text-[clamp(1.85rem,3.2vw,2.4rem)] font-extrabold leading-none tracking-[-.01em]">4.9<span className="text-[.5em] font-bold text-[#A2A8B3]">/5</span></span>
                  <span className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#A2A8B3]">Rating</span>
                </div>
              </div>

            </div>
          </div>

          {/* Ticker */}
          <div className="absolute bottom-0 left-0 z-10 w-full overflow-hidden border-y border-black/10 bg-white py-3 text-black">
            <div className="promo-ticker flex w-max whitespace-nowrap text-[10px] font-black uppercase tracking-[.18em] sm:text-xs">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="pr-8">{TICKER_TEXT}</span>
              ))}
            </div>
          </div>
        </section>

        {/* KEUNGGULAN */}
        <section id="keunggulan" className="bg-[#f5f4f0] py-24 text-[#111] sm:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid items-end gap-8 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <span className="text-xs font-black uppercase tracking-[.25em] text-[#ef233c]" style={{ fontFamily: "var(--font-dm)" }}>
                  Kenapa TNT SPORT APPAREL?
                </span>
                <h2 className="pdisplay mt-4 text-4xl uppercase leading-[.95] sm:text-6xl">
                  Dibuat untuk tim yang mau tampil maksimal.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 lg:justify-self-end">
                Dari konsultasi desain sampai pengiriman, semua dikerjakan tim profesional dengan material
                pilihan dan mesin produksi modern.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <article
                  key={f.title}
                  className="rounded-[1.6rem] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ef233c]">
                    <img src={f.icon} alt="" className="h-6 w-6 brightness-0 invert" />
                  </div>
                  <h3 className="mt-6 text-lg font-black uppercase">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.desc}</p>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              {INFO_CARDS.map((c) => (
                <div key={c.title} className="flex items-center gap-5 rounded-2xl bg-[#151515] p-5 text-white">
                  <img src={c.icon} alt="" className="h-8 w-8 brightness-0 invert" />
                  <div>
                    <b>{c.title}</b>
                    <p className="mt-1 text-sm text-zinc-400">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESAIN */}
        <section id="desain" className="relative overflow-hidden bg-[#09090b] py-24 sm:py-32">
          <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-[#ef233c]/20 blur-[100px]" />
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-black uppercase tracking-[.25em] text-[#ef233c]">Galeri desain</span>
                <h2 className="pdisplay mt-4 max-w-3xl text-4xl uppercase leading-[.95] sm:text-6xl">
                  Satu tim.<br />Karakter tanpa batas.
                </h2>
              </div>
              <p className="max-w-sm text-zinc-400">Kirim referensi, logo, atau warna tim. Kami bantu ubah jadi desain yang siap diproduksi.</p>
            </div>
            <div className="mt-6">
              <PromoDesignGrid waNumber={waNumber} />
            </div>
          </div>
        </section>

        {/* HARGA */}
        <section id="harga" className="bg-[#ef233c] py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-[.25em] text-white/70">Harga transparan</span>
              <h2 className="pdisplay mt-4 text-4xl uppercase leading-none sm:text-6xl">
                Langsung pabrik.<br />Harga lebih hemat.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-white/80">
                Tanpa biaya tersembunyi. Desain, nama, nomor, dan logo sudah termasuk.
              </p>
            </div>
            <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
              <article className="rounded-[2rem] bg-white p-7 text-black shadow-2xl sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.2em] text-zinc-500">Jersey</p>
                    <h3 className="pdisplay mt-1 text-3xl uppercase">Atasan saja</h3>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-bold">Tanpa minimum</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 border-y border-black/10 py-6">
                  <div>
                    <p className="text-xs text-zinc-500">Ecer</p>
                    <p className="mt-1 text-2xl font-black">95rb<span className="text-sm font-medium text-zinc-500"> /pcs</span></p>
                  </div>
                  <div className="border-l border-black/10 pl-4">
                    <p className="text-xs text-zinc-500">Beli 1 lusin (12 pcs)</p>
                    <p className="mt-1 text-2xl font-black text-[#ef233c]">85rb<span className="text-sm font-medium text-zinc-500"> /pcs</span></p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  <li>✓ Jersey atasan full printing</li>
                  <li>✓ Full custom desain bebas</li>
                  <li>✓ Nama &amp; nomor punggung</li>
                  <li>✓ Bisa order satuan</li>
                  <li>✓ Proses cepat &amp; tepat waktu</li>
                </ul>
                <WhatsAppLeadLink
                  href={waAtasan}
                  label="Pesan Atasan"
                  className="mt-8 flex w-full items-center justify-center rounded-full bg-black px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#ef233c]"
                >
                  Pesan atasan
                </WhatsAppLeadLink>
              </article>
              <article className="relative rounded-[2rem] bg-[#101010] p-7 text-white shadow-2xl sm:p-9">
                <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black">
                  Paling diminati
                </span>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.2em] text-zinc-500">Jersey</p>
                    <h3 className="pdisplay mt-1 text-3xl uppercase">Setelan</h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">Atasan + celana</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 border-y border-white/10 py-6">
                  <div>
                    <p className="text-xs text-zinc-500">Ecer</p>
                    <p className="mt-1 text-2xl font-black">145rb<span className="text-sm font-medium text-zinc-500"> /pcs</span></p>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <p className="text-xs text-zinc-500">Beli 1 lusin (12 pcs)</p>
                    <p className="mt-1 text-2xl font-black text-[#ef233c]">120rb<span className="text-sm font-medium text-zinc-500"> /pcs</span></p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                  <li>✓ Jersey atasan + celana</li>
                  <li>✓ Full custom desain bebas</li>
                  <li>✓ Nama, nomor &amp; logo klub</li>
                  <li>✓ Bisa order satuan</li>
                  <li>✓ Proses cepat &amp; tepat waktu</li>
                </ul>
                <WhatsAppLeadLink
                  href={waSetelan}
                  label="Pesan Setelan"
                  className="mt-8 flex w-full items-center justify-center rounded-full bg-[#ef233c] px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
                >
                  Pesan setelan
                </WhatsAppLeadLink>
              </article>
            </div>
            <div className="mx-auto mt-6 flex max-w-5xl flex-col items-start justify-between gap-5 rounded-2xl border border-white/25 bg-black/15 p-6 sm:flex-row sm:items-center">
              <div>
                <b className="text-lg">Pembelian partai besar?</b>
                <p className="mt-1 text-sm text-white/75">Tersedia penawaran harga khusus yang lebih kompetitif.</p>
              </div>
              <WhatsAppLeadLink
                href={waPenawaran}
                label="Minta Penawaran"
                className="whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-black text-black"
              >
                Minta penawaran →
              </WhatsAppLeadLink>
            </div>
          </div>
        </section>

        {/* PROMO */}
        <section className="border-b border-white/10 bg-[#09090b] py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#ef233c]/50 bg-[linear-gradient(135deg,#18181b,#09090b)] p-8 sm:p-12">
              <div className="pdisplay absolute right-[-2rem] top-[-5rem] text-[14rem] text-white/[.025]">7</div>
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full bg-[#ef233c] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em]">
                    Promo spesial
                  </span>
                  <h2 className="pdisplay mt-5 text-4xl uppercase leading-none sm:text-6xl">Beli 12, gratis 1.</h2>
                  <p className="mt-4 max-w-2xl text-zinc-400">
                    Berlaku kelipatannya: order 12 dapat 13, order 24 dapat 26, order 36 dapat 39. Berlaku untuk atasan maupun setelan.
                  </p>
                </div>
                <WhatsAppLeadLink
                  href={waKlaim}
                  label="Klaim Promo"
                  className="inline-flex justify-center rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wider text-black"
                >
                  Klaim promo
                </WhatsAppLeadLink>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-300 md:grid-cols-4">
              <div className="rounded-xl border border-white/10 p-4">Garansi harga terbaik</div>
              <div className="rounded-xl border border-white/10 p-4">Garansi tepat waktu</div>
              <div className="rounded-xl border border-white/10 p-4">Garansi kualitas jahitan</div>
              <div className="rounded-xl border border-white/10 p-4">Revisi gratis</div>
            </div>
          </div>
        </section>

        {/* CARA ORDER */}
        <section id="cara-order" className="bg-[#f5f4f0] py-24 text-black sm:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-[.25em] text-[#ef233c]">Cara order</span>
              <h2 className="pdisplay mt-4 text-4xl uppercase sm:text-6xl">5 langkah mudah.</h2>
              <p className="mt-4 text-zinc-600">Ceritakan kebutuhanmu, tim kami yang urus sisanya.</p>
            </div>
            <div className="relative mt-16 grid gap-4 md:grid-cols-5">
              <div className="absolute left-[10%] right-[10%] top-8 hidden border-t border-dashed border-black/20 md:block" />
              {STEPS.map((s, i) => (
                <article key={s.title} className="relative rounded-2xl border border-black/10 bg-white p-5">
                  <span className={`pdisplay grid h-12 w-12 place-items-center rounded-full text-xl text-white ${i === 0 ? "bg-[#ef233c]" : "bg-black"}`}>
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-black uppercase">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ULASAN */}
        <section className="bg-white py-24 text-black sm:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-black uppercase tracking-[.25em] text-[#ef233c]">Ulasan pelanggan</span>
                <h2 className="pdisplay mt-4 text-4xl uppercase sm:text-6xl">Bukan kata kami.</h2>
              </div>
              <p className="text-zinc-600">Ribuan tim &amp; komunitas sudah percaya TNT SPORT APPAREL.</p>
            </div>

            {/* Photo Gallery */}
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-black/10 bg-[#f4f3ef] p-4 shadow-[0_28px_80px_rgba(0,0,0,.12)] sm:p-6">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#ef233c]">Bukti bukan janji</p>
                  <h3 className="pdisplay mt-2 text-3xl uppercase tracking-tight sm:text-4xl">Hasil nyata dari pelanggan kami</h3>
                </div>
                <p className="max-w-sm text-xs leading-relaxed text-zinc-500 sm:text-right">Foto asli jersey yang sudah diterima pelanggan — bukan edit, bukan rekayasa</p>
              </div>
              <PhotoGallery images={GALLERY_IMAGES} />
            </div>

            {/* Testimonials */}
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {dbTestimonials.map((r, i) => (
                <figure
                  key={r.name + i}
                  className={r.dark ? "rounded-[1.5rem] bg-[#101010] p-6 text-white" : "rounded-[1.5rem] bg-[#f4f3ef] p-6"}
                >
                  <div className="text-[#ef233c]">★★★★★</div>
                  <blockquote className={`mt-5 leading-relaxed ${r.dark ? "text-zinc-300" : "text-zinc-700"}`}>
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className={`mt-7 border-t pt-5 ${r.dark ? "border-white/10" : "border-black/10"}`}>
                    <b>{r.name}</b>
                    <p className="text-sm text-zinc-500">{r.meta}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-[#f5f4f0] py-24 text-black sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
            <div>
              <span className="text-xs font-black uppercase tracking-[.25em] text-[#ef233c]">FAQ</span>
              <h2 className="pdisplay mt-4 text-4xl uppercase leading-[.95] sm:text-6xl">Yang sering ditanyakan.</h2>
              <p className="mt-5 max-w-sm text-zinc-600">Jawaban singkat untuk membantu kamu pesan dengan lebih tenang.</p>
            </div>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {FAQS.map((f, i) => (
                <details key={f.q} className="faq group py-6" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-black uppercase [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span className="faq-plus text-2xl font-light">+</span>
                  </summary>
                  <p className="mt-4 pr-10 text-sm leading-relaxed text-zinc-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ORDER */}
        <section id="order" className="relative overflow-hidden bg-[#09090b] py-24 sm:py-32">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ef233c]/20 blur-[120px]" />
          <div className="relative mx-auto max-w-5xl px-5 text-center lg:px-8">
            <span className="text-xs font-black uppercase tracking-[.25em] text-[#ef233c]">Siap mulai?</span>
            <h2 className="pdisplay mt-5 text-[clamp(3rem,8vw,7rem)] uppercase leading-[.86]">
              Siap pesan<br />jersey custom?
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg text-zinc-400">
              Konsultasi gratis, tanpa syarat. Siapkan jumlah pesanan, jenis jersey, dan referensi desainmu.
            </p>
            <WhatsAppLeadLink
              href={waKonsultasi}
              label="Mulai Konsultasi"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-[#ef233c] px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:bg-white hover:text-black"
            >
              Mulai konsultasi
            </WhatsAppLeadLink>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#09090b] py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <a href="#home" className="flex items-center gap-2.5 text-white" aria-label="TNT SPORT APPAREL">
            <img src={brand.logoPath || "/logo.jpg"} alt="Logo TNT SPORT APPAREL" className="h-12 w-12 object-contain mix-blend-screen" />
            <span className="text-base font-black tracking-[.16em]">TNT SPORT APPAREL</span>
          </a>
          <p>Jersey custom full printing · Dibuat untuk tampil maksimal.</p>
          <p>© {new Date().getFullYear()} TNT SPORT APPAREL</p>
        </div>
      </footer>
    </div>
  );
}