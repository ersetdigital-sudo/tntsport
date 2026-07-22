import type { Metadata } from "next";
import Image from "next/image";
import { ProductCatalog } from "@/components/ProductCatalog";
import { getCatalogData, getKatalogFeatures } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Katalog Jersey Custom Full Printing — TNT SPORT",
    description:
      "Jersey custom full printing mulai 50 ribuan. Desain bebas, tanpa minimal order, produksi cepat, kirim ke seluruh Indonesia.",
    alternates: { canonical: "/katalog" },
    openGraph: {
      title: "Katalog Jersey Custom Full Printing · TNT SPORT",
      description:
        "Custom jersey sesukamu dengan hasil premium. Gratis desain, nama, nomor dan logo—bahkan untuk order satuan.",
      url: "https://tntsport.id/katalog",
      type: "website",
      locale: "id_ID",
    },
  };
}

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const WA_LINK =
  "https://wa.me/6281234567890?text=Halo%20TNT%20SPORT%2C%20saya%20mau%20tanya%20jersey%20custom";

const KEUNGGULAN = [
  {
    icon: "/378b562a-d8ba-4fd6-b19a-b05c96238007.svg",
    title: "Adem & Nyaman",
    desc: "Bahan ringan, menyerap keringat, dan nyaman untuk aktivitas fisik intens.",
  },
  {
    icon: "/a9338ee8-b3e8-4859-a2ca-e69aa12edda9.svg",
    title: "Free Custom Design",
    desc: "Tim desainer siap mewujudkan ide jersey dengan revisi tanpa batas.",
  },
  {
    icon: "/50636280-ac18-44e1-9637-f960e68658c3.svg",
    title: "Jahitan Kuat & Rapi",
    desc: "Dijahit presisi dengan mesin modern agar awet untuk jangka panjang.",
  },
  {
    icon: "/3c0197de-fbae-45be-a3c6-1e3d206e874c.svg",
    title: "Cepat & Tepat",
    desc: "Proses produksi terjadwal, cocok bahkan untuk turnamen mendadak.",
  },
];

const INFO_CARDS = [
  {
    icon: "/cfab14fb-fc07-4a15-84f4-ebb1af1b0585.svg",
    title: "Mesin teknologi tinggi",
    desc: "Hasil print konsisten dan presisi.",
  },
  {
    icon: null,
    title: "Tinta bersertifikat",
    desc: "Tajam, cerah, dan tidak mudah pudar.",
  },
  {
    icon: "/8999be50-4d20-45c1-b37e-0ce948ade336.svg",
    title: "Pelayanan profesional",
    desc: "Didampingi dari konsultasi sampai kirim.",
  },
];

const STEPS = [
  { num: "01", title: "Chat Admin", desc: "Ceritakan kebutuhan jersey kamu." },
  { num: "02", title: "Desain", desc: "Kami buatkan mockup sesuai brief." },
  { num: "03", title: "ACC & DP", desc: "Setujui desain dan DP 50%." },
  { num: "04", title: "Produksi", desc: "Dikerjakan cepat di pabrik kami." },
  { num: "05", title: "Kirim", desc: "Dikemas aman, jersey siap dipakai!" },
];

const TESTIMONIALS = [
  {
    quote:
      "Design mantap. Tadinya belum ada ide sama sekali, tapi tim desainnya keren dan mau revisi berkali-kali.",
    name: "Aliasta M",
    location: "Magelang • Komunitas Murai",
  },
  {
    quote:
      "Sudah 3x order jersey padel. Kualitas konsisten, jahitan kuat, bahan adem dan CS fast response.",
    name: "Silva Nurliva",
    location: "Purwokerto • Tim Padel",
  },
  {
    quote:
      "1500 pcs dikebut satu minggu, hasil mantap dan event berjalan sesuai harapan. Makasih bantuannya!",
    name: "Wahyu Rahmani",
    location: "Banjarmasin • Event Running",
  },
];

const FAQ_ITEMS = [
  {
    q: "Apakah ada minimal order?",
    a: "Tidak ada. Kamu bisa order satuan. Untuk order 6 pcs, dapat bonus 1 pcs gratis dan berlaku kelipatannya.",
  },
  {
    q: "Berapa lama proses produksi?",
    a: "Produksi dimulai setelah desain disetujui dan DP masuk. Jadwal pengerjaan disepakati bersama sesuai jumlah dan kebutuhanmu.",
  },
  {
    q: "Apakah bisa request desain sendiri?",
    a: "Bisa. Kirim referensi desain, logo, atau gambar. Tim desainer akan membantu mewujudkannya dan memberi kesempatan revisi.",
  },
  {
    q: "Bahan jersey apa yang tersedia?",
    a: "Tersedia Dryfit Brazil, Milano, Embos, Jacquard, Benzema, Serena, dan bahan khusus sesuai kebutuhan.",
  },
];

const TICKER_ITEMS = [
  "Gratis Desain",
  "Revisi Tanpa Batas",
  "Tanpa Minimal Order",
  { text: "Beli 6 Gratis 1", badge: true },
  "Produksi Cepat",
];

/* ------------------------------------------------------------------ */
/* Structured Data                                                      */
/* ------------------------------------------------------------------ */

function JsonLd() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Jersey Custom Full Printing TNT SPORT",
    description:
      "Jersey custom full printing mulai 50 ribuan. Desain bebas, tanpa minimal order, produksi cepat.",
    brand: { "@type": "Brand", name: "TNT SPORT" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "50000",
      highPrice: "250000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Icons                                                                */
/* ------------------------------------------------------------------ */

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function CheckIcon() {
  return <span className="text-[#c5f518]">✓</span>;
}

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-5 lg:px-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="TNT Sport Home">
          <Image
            src="/af7bb11e-1e11-423d-809a-1d5c75fbe91f.png"
            alt="TNT Sport"
            width={40}
            height={40}
            className="h-9 w-9 rounded-xl object-contain sm:h-10 sm:w-10"
          />
          <div className="text-base font-black italic tracking-tight sm:text-xl">
            TNT <span className="text-[#c5f518]">SPORT</span>
          </div>
        </a>
        <nav className="hidden items-center gap-6 text-xs font-semibold text-white/70 lg:flex lg:gap-8 lg:text-sm">
          <a href="#keunggulan" className="hover:text-[#c5f518]">Keunggulan</a>
          <a href="#kategori" className="hover:text-[#c5f518]">Katalog</a>
          <a href="#harga" className="hover:text-[#c5f518]">Harga</a>
          <a href="#cara-order" className="hover:text-[#c5f518]">Cara Order</a>
          <a href="#ulasan" className="hover:text-[#c5f518]">Ulasan</a>
        </nav>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#c5f518] px-4 py-2 text-xs font-black text-[#080a07] transition hover:bg-[#d4ff33] sm:px-5 sm:py-2.5 sm:text-sm"
        >
          Konsultasi Gratis
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — KEPT AS-IS from original                                      */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#0b0b0b] text-white">
      {/* Grid noise */}
      <div className="absolute inset-0 opacity-40"
           style={{
             backgroundImage: "linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)",
             backgroundSize: "42px 42px",
           }} />
      {/* Glow */}
      <div className="absolute left-[38%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#16a34a]/10 blur-[120px]" />

      <div className="relative mx-auto min-h-[600px] max-w-7xl px-5 sm:min-h-[700px] lg:min-h-[790px] lg:px-8">
        <div className="relative z-20 flex max-w-2xl flex-col justify-center pb-[430px] pt-16 lg:min-h-[790px] lg:pb-16 lg:pt-12">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#16a34a]/35 bg-[#16a34a]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-green-400 sm:mb-6 sm:px-4 sm:py-2 sm:text-[11px]"
               style={{ fontFamily: "var(--font-mono)" }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#16a34a] sm:h-2 sm:w-2" />
            Langsung dari pabrik
          </div>
          <h1 className="max-w-3xl text-[36px] font-black uppercase leading-[.88] tracking-[-.055em] sm:text-[58px] lg:text-[90px]"
              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
            Bikin Jersey<br />
            <span className="text-[#16a34a]">Full Printing</span><br />
            Cuma 50 Ribu!
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65 sm:mt-6 sm:text-base lg:text-lg">
            Custom jersey sesukamu dengan hasil premium. Gratis desain, nama, nomor dan logo—bahkan untuk order satuan.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold text-white/70 sm:mt-5 sm:gap-x-5 sm:text-xs">
            <span className="flex items-center gap-2"><CheckIcon /> Free desain</span>
            <span className="flex items-center gap-2"><CheckIcon /> Tanpa minimal order</span>
            <span className="flex items-center gap-2"><CheckIcon /> Revisi bebas</span>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <a
              href="#harga"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16a34a] px-5 py-3 font-black text-white shadow-[0_12px_45px_rgba(22,163,74,.35)] transition hover:-translate-y-1 hover:bg-green-500 sm:px-7 sm:py-4"
            >
              Lihat Harga <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#cara-order"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/20 px-5 py-3 font-bold text-white backdrop-blur hover:border-white/50 sm:px-7 sm:py-4"
            >
              Cara Order
            </a>
          </div>
          <div className="mt-9 grid max-w-lg grid-cols-3 gap-3 border-t border-white/10 pt-6">
            <div>
              <strong className="text-xl font-black sm:text-2xl lg:text-3xl">350K+</strong>
              <span className="mt-1 block text-[8px] uppercase tracking-widest text-white/45 sm:text-[9px] lg:text-[10px]">Order selesai</span>
            </div>
            <div>
              <strong className="text-xl font-black sm:text-2xl lg:text-3xl">9K+</strong>
              <span className="mt-1 block text-[8px] uppercase tracking-widest text-white/45 sm:text-[9px] lg:text-[10px]">Klien puas</span>
            </div>
            <div>
              <strong className="text-xl font-black text-[#16a34a] sm:text-2xl lg:text-3xl">4.9</strong>
              <span className="mt-1 block text-[8px] uppercase tracking-widest text-white/45 sm:text-[9px] lg:text-[10px]">Rating ★</span>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="hero-photo pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[490px] lg:bottom-0 lg:left-[44%] lg:right-[-8%] lg:top-0 lg:h-full">
          <Image
            src="/37759e58-8f9f-45d9-a4be-7899929c6a95.png"
            alt="Tim mengenakan jersey custom TNT Sport"
            fill
            className="object-cover object-top lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0b0b0b]/20 lg:via-transparent lg:to-transparent" />
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-30 overflow-hidden border-y border-[#c5f518]/30 bg-[#0b0b0b] py-3 text-white sm:py-3.5">
        <div className="ticker flex w-max items-center gap-8 whitespace-nowrap pr-8 sm:gap-10 sm:pr-10">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-[.16em] text-white/65 sm:gap-8 sm:text-[10px]"
                 style={{ fontFamily: "var(--font-mono)" }}
                 aria-hidden={dup === 1 ? true : undefined}>
              {TICKER_ITEMS.map((item, i) => (
                typeof item === "object" && item.badge ? (
                  <span key={i} className="rounded-full border border-[#c5f518]/50 bg-[#c5f518]/10 px-4 py-1.5 text-[#c5f518]">{item.text}</span>
                ) : (
                  <span key={i} className="flex items-center gap-2 sm:gap-3">
                    <i className="h-1 w-1 rounded-full bg-[#c5f518] shadow-[0_0_10px_#c5f518] sm:h-1.5 sm:w-1.5" />
                    {item as string}
                  </span>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Keunggulan                                                           */
/* ------------------------------------------------------------------ */

// Lucide icon map for dynamic features
import { Thermometer, Palette, Scissors, Clock, Cog, Droplets, Headphones, Sparkles } from "lucide-react";

const LUCIDE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Thermometer, Palette, Scissors, Clock, Cog, Droplets, Headphones, Sparkles,
};

function FeatureIcon({ iconName, fallbackSrc }: { iconName: string | null; fallbackSrc?: string }) {
  if (iconName && LUCIDE_ICON_MAP[iconName]) {
    const Icon = LUCIDE_ICON_MAP[iconName];
    return <Icon size={20} className="text-white" />;
  }
  if (fallbackSrc) {
    return <Image src={fallbackSrc} alt="" width={20} height={20} className="h-4 w-4 invert sm:h-5 sm:w-5" />;
  }
  return <Sparkles size={20} className="text-white" />;
}

async function Keunggulan() {
  const features = await getKatalogFeatures();

  const featureCards = features
    ?.filter((f) => f.section === "feature")
    .map((f) => ({ icon: f.icon, title: f.title, desc: f.description })) ?? KEUNGGULAN;

  const infoCards = features
    ?.filter((f) => f.section === "info")
    .map((f) => ({ icon: f.icon, title: f.title, desc: f.description })) ?? INFO_CARDS;

  return (
    <section id="keunggulan" className="border-b border-white/10 bg-[#0a0c09] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 grid gap-6 lg:mb-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#c5f518]"
               style={{ fontFamily: "var(--font-mono)" }}>
              Kenapa TNT Sport?
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black uppercase leading-[.92] tracking-tight text-[#f0f2ec] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
              Dibuat untuk tim yang mau tampil maksimal.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[#a7ad9e] sm:text-base lg:justify-self-end">
            Dari konsultasi desain sampai pengiriman, semua dikerjakan tim profesional dengan material pilihan dan mesin produksi modern.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {featureCards.map((item, i) => (
            <article key={i} className="rounded-3xl border border-white/10 bg-[#131611] p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[#c5f518]/35 sm:p-6">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-[#16a34a] shadow-[0_8px_24px_rgba(22,163,74,.2)] sm:mb-8 sm:h-11 sm:w-11">
                <FeatureIcon iconName={item.icon} fallbackSrc={KEUNGGULAN[i]?.icon} />
              </div>
              <h3 className="text-sm font-black uppercase text-[#f0f2ec] sm:text-base">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#92998b] sm:mt-3 sm:text-sm">{item.desc}</p>
            </article>
          ))}
        </div>

        {/* Info cards */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {infoCards.map((item, i) => {
            const fallbackIcon = INFO_CARDS[i]?.icon ?? undefined;
            return (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#171b14] to-[#10120f] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c5f518]/35">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#c5f518]/[.04] blur-2xl transition group-hover:bg-[#c5f518]/10" />
              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#c5f518]/25 bg-[#c5f518]/10 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
                  <FeatureIcon iconName={item.icon} fallbackSrc={fallbackIcon} />
                </div>
                <div>
                  <strong className="block text-sm font-black text-[#f0f2ec]">{item.title}</strong>
                  <span className="mt-1 block text-xs leading-relaxed text-[#858c7e]">{item.desc}</span>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Kategori                                                             */
/* ------------------------------------------------------------------ */

async function Kategori() {
  const catalogData = await getCatalogData();

  return (
    <section id="kategori" className="border-b border-white/10 bg-[#0d100c] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#c5f518]"
             style={{ fontFamily: "var(--font-mono)" }}>
            Jersey untuk semua
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-[.9] tracking-tight text-[#f0f2ec] sm:mt-4 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
            Satu tim.<br />Karakter tanpa batas.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#a7ad9e] sm:mt-6 sm:text-base">
            Kirim referensi, logo, atau warna tim. Kami bantu ubah jadi desain jersey yang siap diproduksi.
          </p>
          <ProductCatalog categories={catalogData ?? undefined} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Harga                                                                */
/* ------------------------------------------------------------------ */

function Harga() {
  return (
    <section id="harga" className="relative overflow-hidden bg-[#080a07] py-16 text-[#f0f2ec] sm:py-24">
      {/* Grid pattern — full section */}
      <div className="absolute inset-0 opacity-[0.12]"
           style={{
             backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
             backgroundSize: "40px 40px",
           }} />
      {/* Lime glow */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-[#c5f518]/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#c5f518]"
             style={{ fontFamily: "var(--font-mono)" }}>
            Harga transparan
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase sm:mt-3 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
            Pilih paket timmu
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#a7ad9e] sm:mt-4 sm:text-base">
            Pilih jumlah pembelian, harga akan menyesuaikan otomatis.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 lg:grid-cols-2">
          {/* Atasan */}
          <article className="price-card flex flex-col rounded-[2rem] border border-white/10 p-5 sm:p-7 lg:p-9">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-[.18em] text-[#7f8678] sm:text-[11px]"
                   style={{ fontFamily: "var(--font-mono)" }}>
                  Jersey atasan
                </p>
                <h3 className="mt-1 text-2xl font-black sm:mt-2 sm:text-3xl">Atasan Saja</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#b4baac]">Fleksibel</span>
            </div>
            <div className="mt-5 flex items-baseline gap-2 sm:mt-8">
              <span className="text-sm text-[#c5f518]" style={{ fontFamily: "var(--font-mono)" }}>Rp</span>
              <span className="text-5xl font-black tracking-tight sm:text-6xl">50rb</span>
              <span className="text-[#777e71]">/pcs</span>
            </div>
            <p className="mt-3 text-sm text-[#8f9688]">Minimal pembelian 12 pcs / set</p>
            <div className="my-7 h-px bg-white/10" />
            <ul className="space-y-3.5 text-sm text-[#c5c9c0]">
              <li><span className="mr-2 text-[#c5f518]">✓</span> Full printing &amp; desain bebas</li>
              <li><span className="mr-2 text-[#c5f518]">✓</span> Nama dan nomor punggung</li>
              <li><span className="mr-2 text-[#c5f518]">✓</span> Revisi desain tanpa batas</li>
            </ul>
            <a
              href={`${WA_LINK.replace("saya%20mau%20tanya%20jersey%20custom", encodeURIComponent("saya tertarik dengan paket Atasan Saja. Bisa info lebih lanjut?"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-black text-[#f0f2ec] transition hover:border-[#c5f518] hover:text-[#c5f518]"
            >
              <span>Pilih Atasan</span>
              <span>↗</span>
            </a>
          </article>

          {/* Setelan */}
          <article className="price-card featured relative flex flex-col overflow-hidden rounded-[2rem] border border-[#c5f518]/45 p-5 shadow-[0_24px_100px_rgba(197,245,24,.11)] sm:p-7 lg:p-9">
            <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#c5f518] px-5 py-2.5 text-[9px] font-black uppercase tracking-[.15em] text-[#080a07]">
              Paling diminati
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[.18em] text-[#c5f518]/70 sm:text-[11px]"
                 style={{ fontFamily: "var(--font-mono)" }}>
                Atasan + celana
              </p>
              <h3 className="mt-1 text-2xl font-black sm:mt-2 sm:text-3xl">Jersey Setelan</h3>
            </div>
            <div className="mt-5 flex items-baseline gap-2 sm:mt-8">
              <span className="text-sm text-[#c5f518]" style={{ fontFamily: "var(--font-mono)" }}>Rp</span>
              <span className="text-5xl font-black tracking-tight sm:text-6xl">110rb</span>
              <span className="text-[#777e71]">/set</span>
            </div>
            <p className="mt-3 text-sm text-[#8f9688]">Minimal pembelian 12 pcs / set</p>
            <div className="my-7 h-px bg-white/10" />
            <ul className="space-y-3.5 text-sm text-[#d5d8d0]">
              <li><span className="mr-2 text-[#c5f518]">✓</span> Semua benefit paket atasan</li>
              <li><span className="mr-2 text-[#c5f518]">✓</span> Celana full custom siap tanding</li>
              <li><span className="mr-2 text-[#c5f518]">✓</span> Prioritas jadwal produksi</li>
            </ul>
            <a
              href={`${WA_LINK.replace("saya%20mau%20tanya%20jersey%20custom", encodeURIComponent("saya tertarik dengan paket Jersey Setelan. Bisa info lebih lanjut?"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-between gap-3 rounded-xl bg-[#c5f518] px-6 py-4 font-black text-[#080a07] shadow-[0_10px_35px_rgba(197,245,24,.18)] transition hover:-translate-y-1"
            >
              <span>Pilih Setelan</span>
              <span>↗</span>
            </a>
          </article>
        </div>

        {/* Bulk promo */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4 rounded-3xl border border-[#f36458]/25 bg-[#f36458]/[.07] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <strong className="text-lg">Butuh lebih dari 50 pcs?</strong>
            <p className="mt-1 text-sm text-[#92998b]">Dapatkan harga proyek khusus untuk komunitas, sekolah, dan event.</p>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#f36458]/50 px-5 py-3 text-sm font-black text-[#ff8278] transition hover:bg-[#f36458] hover:text-[#080a07]"
          >
            Minta Harga Khusus
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Promo                                                                */
/* ------------------------------------------------------------------ */

function Promo() {
  return (
    <section className="bg-[#0b0b0b] px-5 pb-16 text-white sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#c5f518]/25 bg-[#111] px-5 py-8 shadow-[0_24px_80px_rgba(197,245,24,.08)] sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute -right-2 -top-16 select-none text-[120px] font-black leading-none text-white/[.025] sm:right-8 sm:text-[220px]">7</div>
          <div className="pointer-events-none absolute -left-20 bottom-0 h-32 w-32 rounded-full bg-[#c5f518]/10 blur-3xl sm:h-48 sm:w-48" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#c5f518] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[.18em] text-[#080a07] sm:px-4 sm:py-2 sm:text-[9px]"
                    style={{ fontFamily: "var(--font-mono)" }}>
                Promo spesial
              </span>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:mt-5 sm:text-4xl lg:text-6xl"
                  style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
                Beli 6, Gratis 1.
              </h2>
              <p className="mt-3 max-w-3xl text-xs leading-relaxed text-white/55 sm:mt-4 sm:text-sm">
                Berlaku kelipatannya: order 6 dapat 7, order 12 dapat 14, order 18 dapat 21. Berlaku untuk atasan maupun setelan.
              </p>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#c5f518] px-5 py-3 text-xs font-black uppercase tracking-wide text-[#080a07] shadow-[0_10px_35px_rgba(197,245,24,.16)] transition hover:-translate-y-1 sm:px-7 sm:py-4 sm:text-sm"
            >
              Klaim Promo
            </a>
          </div>
        </div>

        {/* Guarantee badges */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {["Garansi harga terbaik", "Garansi tepat waktu", "Garansi kualitas jahitan", "Revisi gratis"].map((item, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-[#111] px-3 py-2 text-center text-[9px] font-black uppercase tracking-[.12em] text-white/70 sm:px-4 sm:py-4 sm:text-[10px]">
              <span className="mr-1 text-[#c5f518] sm:mr-2">✓</span> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cara Order                                                           */
/* ------------------------------------------------------------------ */

function CaraOrder() {
  return (
    <section id="cara-order" className="bg-[#0d100c] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="mb-8 sm:mb-12">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#c5f518]"
           style={{ fontFamily: "var(--font-mono)" }}>
          Cuma 5 langkah
        </p>
        <h2 className="mt-2 text-3xl font-black uppercase text-[#f0f2ec] sm:mt-3 sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
          Cara order—mudah!
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {STEPS.map((step, i) => {
          const isLast = i === STEPS.length - 1;
          return (
            <div
              key={i}
              className={`rounded-2xl border p-4 sm:rounded-3xl sm:p-6 ${
                isLast
                  ? "bg-[#c5f518] text-[#080a07] border-[#c5f518] col-span-2 sm:col-span-1 shadow-[0_20px_55px_rgba(197,245,24,.12)]"
                  : "border-white/10 bg-[#151914]"
              }`}
            >
              <span className={`text-3xl font-black sm:text-4xl ${isLast ? "opacity-40" : "text-[#c5f518]"}`}
                    style={{ fontFamily: "var(--font-mono)" }}>
                {step.num}
              </span>
              <h3 className={`mt-4 font-black sm:mt-8 ${isLast ? "text-[#080a07]" : "text-[#f0f2ec]"}`}>{step.title}</h3>
              <p className={`mt-1 text-xs sm:mt-2 sm:text-sm ${isLast ? "opacity-65" : "text-[#92998b]"}`}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ulasan                                                               */
/* ------------------------------------------------------------------ */

function Ulasan() {
  return (
    <section id="ulasan" className="border-y border-white/10 bg-[#090b08] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#c5f518]"
             style={{ fontFamily: "var(--font-mono)" }}>
            Verified buyer
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase text-[#f0f2ec] sm:mt-3 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
            Dipercaya ribuan tim
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              className={`rounded-2xl border border-white/10 p-5 sm:rounded-3xl sm:p-7 ${
                i === 1 ? "bg-[#0b0b0b]" : "bg-[#141713]"
              }`}
            >
              <div className="text-[#c5f518]">★★★★★</div>
              <p className="mt-3 text-sm leading-relaxed text-[#d4d7d0] sm:mt-5 sm:text-base">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 border-t border-white/10 pt-3 sm:mt-8 sm:pt-5">
                <strong className="text-sm text-[#f0f2ec] sm:text-base">{t.name}</strong>
                <span className="block text-xs text-[#7f8678] sm:text-sm">
                  {t.location}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */

function FAQ() {
  return (
    <section className="bg-[#0d100c] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#c5f518]"
             style={{ fontFamily: "var(--font-mono)" }}>
            FAQ
          </p>
          <h2 className="mt-3 max-w-sm text-3xl font-black uppercase leading-[.88] tracking-[-.04em] text-[#f0f2ec] sm:mt-4 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
            Yang sering ditanyakan.
          </h2>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-[#a7ad9e] sm:mt-6 sm:text-sm">
            Jawaban singkat untuk membantu kamu pesan dengan lebih tenang.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="group py-4 sm:py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-black uppercase tracking-wide text-[#f0f2ec] sm:gap-6 sm:text-sm">
                {item.q}
                <span className="text-base font-medium text-[#c5f518] transition group-open:rotate-45 sm:text-lg">+</span>
              </summary>
              <p className="max-w-2xl pt-3 text-xs leading-relaxed text-[#a7ad9e] sm:pt-4 sm:text-sm">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA                                                                  */
/* ------------------------------------------------------------------ */

function CTASection() {
  return (
    <section id="order" className="relative overflow-hidden border-t border-white/10 bg-[#080a07] px-5 py-16 text-[#f0f2ec] sm:py-24">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.15]"
           style={{
             backgroundImage: "linear-gradient(rgba(197,245,24,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(197,245,24,.08) 1px, transparent 1px)",
             backgroundSize: "40px 40px",
           }} />
      {/* Lime glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5f518]/15 blur-[160px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#c5f518] sm:text-xs"
           style={{ fontFamily: "var(--font-mono)" }}>
          Konsultasi gratis • tanpa syarat
        </p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-[.9] sm:mt-4 sm:text-6xl lg:text-8xl"
            style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
          Siap bikin<br /><span className="text-[#c5f518]">jersey custom?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[#a7ad9e] sm:mt-6 sm:text-lg">
          Tim kami siap bantu dari desain sampai pengiriman. Ceritakan kebutuhanmu, kami urus sisanya.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#c5f518] px-6 py-3 font-black text-[#080a07] shadow-[0_14px_50px_rgba(197,245,24,.25)] transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(197,245,24,.35)] sm:mt-8 sm:gap-3 sm:px-8 sm:py-4"
        >
          <WhatsAppIcon /> Chat WhatsApp Sekarang
        </a>
        <div className="mt-5 flex flex-wrap justify-center gap-3 text-[9px] uppercase tracking-widest text-white/70 sm:mt-7 sm:gap-5 sm:text-[10px]"
             style={{ fontFamily: "var(--font-mono)" }}>
          <span>✓ Garansi harga</span>
          <span>✓ Garansi jahitan</span>
          <span>✓ Revisi gratis</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-black px-5 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Logo + Social */}
        <div className="flex flex-col items-center gap-5 border-b border-white/10 pb-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/af7bb11e-1e11-423d-809a-1d5c75fbe91f.png"
              alt="TNT Sport"
              width={48}
              height={48}
              className="h-12 w-12 rounded-xl object-contain"
            />
            <div className="text-center sm:text-left">
              <div className="text-lg font-black italic tracking-tight">
                TNT <span className="text-[#c5f518]">SPORT</span>
              </div>
              <p className="text-xs text-white/40">Jersey Custom Full Printing</p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
               className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-white hover:text-white"
               aria-label="WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://instagram.com/tntsport" target="_blank" rel="noopener noreferrer"
               className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-white hover:text-white"
               aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://tiktok.com/@tntsport" target="_blank" rel="noopener noreferrer"
               className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-white hover:text-white"
               aria-label="TikTok">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .55.04.81.12V9a6.33 6.33 0 00-.81-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 005.58 2.18V2.56a4.84 4.84 0 01-1.59.13z"/></svg>
            </a>
            <a href="https://facebook.com/tntsport" target="_blank" rel="noopener noreferrer"
               className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-white hover:text-white"
               aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center gap-2 pt-6 text-center">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} TNT SPORT. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Ticker Animation CSS                                                 */
/* ------------------------------------------------------------------ */

function TickerStyles() {
  return (
    <style>{`
      .ticker {
        animation: ticker-scroll 22s linear infinite;
        will-change: transform;
      }
      .ticker:hover {
        animation-play-state: paused;
      }
      @keyframes ticker-scroll {
        to { transform: translateX(-50%); }
      }
      @media (prefers-reduced-motion: reduce) {
        .ticker { animation: none; }
      }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .hero-photo {
        mask-image: linear-gradient(to right, transparent 0%, #000 20%, #000 100%);
        -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 20%, #000 100%);
      }
      @media (max-width: 1023px) {
        .hero-photo {
          mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 84%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 84%, transparent 100%);
        }
      }
      .price-card {
        background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018));
        box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 28px 80px rgba(0,0,0,.24);
      }
      .price-card.featured {
        background: linear-gradient(145deg, rgba(197,245,24,.16), rgba(197,245,24,.035));
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function KatalogPage() {
  return (
    <div className="overflow-x-hidden antialiased">
      <TickerStyles />
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <Keunggulan />
        <Kategori />
        <Harga />
        <Promo />
        <CaraOrder />
        <Ulasan />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
