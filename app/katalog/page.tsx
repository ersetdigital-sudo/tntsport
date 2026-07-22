import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Katalog Jersey Custom Full Printing — TNT SPORT",
    description:
      "Jelajahi katalog jersey custom full printing TNT SPORT. Mulai 65 ribuan, bebas desain, tanpa minimal order. Untuk futsal, sepak bola, komunitas, sekolah, dan event.",
    alternates: { canonical: "/katalog" },
    openGraph: {
      title: "Katalog Jersey Custom Full Printing · TNT SPORT",
      description:
        "Jersey full printing mulai 65 ribuan. Bebas desain, bebas tambah nama & nomor, dan bisa order satuan.",
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

const KATALOG_ITEMS = [
  {
    code: "BOLA-54",
    title: "Futsal / Bola",
    image: "https://api.moda.app/api/v2/images/ref/defb6388-ebe3-40a0-b457-d08334b6baae?v=d9c4edb32255a94c&s=131d426c96ffb7ed53b81319bf6dd905",
    alt: "Jersey futsal putih",
  },
  {
    code: "BOLA-53",
    title: "Custom Team",
    image: "https://api.moda.app/api/v2/images/ref/9ad7f29b-74cc-4583-b40b-b77d39d5049a?v=ebde868f4a24317d&s=ffa3a6f7caa47c4febd51c697148a90a",
    alt: "Jersey futsal merah",
  },
];

const KEUNGGULAN = [
  {
    num: "01",
    title: "Free Custom Design",
    desc: "Desainer kami bantu wujudkan ide kamu, revisi sampai puas tanpa biaya tambahan.",
  },
  {
    num: "02",
    title: "Bahan Adem",
    desc: "Material ringan, menyerap keringat, dan nyaman untuk aktivitas intens.",
  },
  {
    num: "03",
    title: "Jahitan Bergaransi",
    desc: "Dijahit presisi dengan mesin modern agar rapi, kuat, dan tahan lama.",
  },
  {
    num: "04",
    title: "Produksi Cepat",
    desc: "Proses tepat waktu dengan kontrol kualitas sebelum jersey dikirim.",
  },
];

const STEPS = [
  { num: "01", title: "Chat", desc: "Ceritakan kebutuhan jersey kamu via WhatsApp." },
  { num: "02", title: "Desain", desc: "Kami buatkan mockup sesuai keinginan." },
  { num: "03", title: "ACC & DP", desc: "Setujui desain dan lakukan DP 50%." },
  { num: "04", title: "Produksi", desc: "Jersey diproduksi dan dicek kualitasnya." },
  { num: "05", title: "Kirim", desc: "Dikemas aman dan dikirim ke alamatmu." },
];

const TESTIMONIALS = [
  {
    quote:
      "Sudah 3x order jersey futsal di sini. Kualitas konsisten bagus, jahitan kuat, bahan adem. CS juga fast response.",
    name: "Budi Santoso",
    location: "Jakarta — Tim Futsal RW",
  },
  {
    quote:
      "Order 40 pcs untuk sekolah, selesai tepat waktu sebelum kompetisi. Anak-anak senang banget sama hasilnya.",
    name: "Siti Rahayu",
    location: "Bandung — Guru Olahraga SMA",
  },
];

const FAQ_ITEMS = [
  {
    q: "Apakah ada minimal order?",
    a: "Tidak ada. Kamu bisa order satuan. Kalau order 6 pcs, kamu dapat bonus 1 pcs gratis dan berlaku kelipatannya.",
  },
  {
    q: "Apakah bisa request desain sendiri?",
    a: "Bisa. Kirim referensi, logo, atau ide kamu via WhatsApp. Tim desain akan bantu membuat mockup dan revisi sebelum produksi.",
  },
  {
    q: "Bagaimana sistem pembayarannya?",
    a: "DP 50% setelah desain disetujui, lalu pelunasan sebelum barang dikirim.",
  },
  {
    q: "Bahan jersey apa yang tersedia?",
    a: "Tersedia Dryfit Brazil, Milano, Embos, Jacquard, Benzema, Serena, dan bahan khusus sesuai kebutuhan.",
  },
];

const CATEGORIES = [
  { emoji: "⚽", label: "Futsal" },
  { emoji: "🏸", label: "Badminton" },
  { emoji: "🏐", label: "Voli" },
  { emoji: "🏀", label: "Basket" },
  { emoji: "🎮", label: "Esport" },
  { emoji: "🚴", label: "Road Bike" },
  { emoji: "+", label: "Lainnya" },
];

/* ------------------------------------------------------------------ */
/* Structured Data                                                      */
/* ------------------------------------------------------------------ */

function JsonLd() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TNT SPORT",
    url: "https://tntsport.id",
    logo: "https://tntsport.id/logo.jpg",
    sameAs: [],
  };
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Jersey Custom Full Printing TNT SPORT",
    description:
      "Jersey custom full printing untuk tim futsal, sepak bola, komunitas, dan event. Desain bebas, bahan premium, harga mulai 65 ribu.",
    brand: { "@type": "Brand", name: "TNT SPORT" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "65000",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
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
/* Icons (inline SVG)                                                   */
/* ------------------------------------------------------------------ */

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m13 2-9 12h8l-1 8 9-12h-8l1-8Z" />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 21h18M5 21V8l7-4v17M12 10l7-3v14M8 10v2M8 15v2M15 11v2M18 10v2M15 16v2M18 15v2" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 2.4-3.2L12 7Zm0 0h4.5a2.5 2.5 0 1 0-2.4-3.2L12 7Z" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
      <path d="m13.5 8 3 3" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ticker                                                               */
/* ------------------------------------------------------------------ */

function Ticker() {
  const items = [
    { icon: <LightningIcon />, text: "Proses Cepat" },
    { icon: <FactoryIcon />, text: "Langsung Pabrik" },
    { icon: <GiftIcon />, text: "Beli 6 Gratis 1" },
    { icon: <PenIcon />, text: "Desain Bebas" },
    { icon: <CheckCircleIcon />, text: "Bisa Satuan" },
  ];

  const TickerItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <span className="flex items-center gap-2 pr-8">
      {icon}
      {text}
    </span>
  );

  return (
    <div className="overflow-hidden border-y-4 border-[#11110f] bg-[#ff5a1f] py-4 text-black">
      <div className="ticker flex w-max items-center whitespace-nowrap text-xl font-black uppercase italic tracking-wide sm:text-2xl"
           style={{ fontFamily: "var(--k-font-display)" }}>
        {/* First set */}
        {items.map((item, i) => (
          <TickerItem key={`a-${i}`} icon={item.icon} text={item.text} />
        ))}
        {/* Duplicate set for seamless loop */}
        {items.map((item, i) => (
          <TickerItem key={`b-${i}`} icon={item.icon} text={item.text} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#11110f]/90 text-white backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-[#dfff00]">
            <Image
              src="/logo.jpg"
              alt="TNT SPORT logo"
              width={44}
              height={44}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span className="text-2xl font-black uppercase tracking-tight"
                style={{ fontFamily: "var(--k-font-display)" }}>
            TNT SPORT
          </span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-semibold lg:flex">
          <a href="#keunggulan" className="transition hover:text-[#ff5a1f]">Keunggulan</a>
          <a href="#katalog" className="transition hover:text-[#ff5a1f]">Katalog</a>
          <a href="#harga" className="transition hover:text-[#ff5a1f]">Harga</a>
          <a href="#cara-order" className="transition hover:text-[#ff5a1f]">Cara Order</a>
        </div>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-[#dfff00] px-6 py-3 text-sm font-extrabold text-black transition hover:-translate-y-0.5 hover:bg-white lg:inline-flex"
        >
          KONSULTASI GRATIS ↗
        </a>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#11110f] pt-20 text-white">
      {/* Grid noise */}
      <div className="absolute inset-0 opacity-40"
           style={{
             backgroundImage: "linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)",
             backgroundSize: "44px 44px",
           }} />
      {/* Glow orb */}
      <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-[#ff5a1f]/30 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        {/* Left: Content */}
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dfff00]/30 bg-[#dfff00]/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#dfff00]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#dfff00]" />
            #1 Pabrik Jersey Terpercaya
          </div>
          <h1 className="max-w-3xl text-[4.3rem] font-black uppercase italic leading-[.84] tracking-[-.04em] sm:text-8xl lg:text-[7.2rem]"
              style={{ fontFamily: "var(--k-font-display)" }}>
            Bikin Tim Lo <span className="text-[#ff5a1f]">Tampil Beda.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl">
            Jersey full printing mulai <strong className="text-white">65 ribuan</strong>. Bebas desain, bebas tambah nama &amp; nomor, dan bisa order satuan.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#ff5a1f] px-8 py-4 text-center font-extrabold uppercase transition hover:-translate-y-1 hover:bg-[#dfff00] hover:text-black"
            >
              Bikin Jersey Sekarang ↗
            </a>
            <a
              href="#katalog"
              className="rounded-full border border-white/20 px-8 py-4 text-center font-bold uppercase transition hover:border-white hover:bg-white hover:text-black"
            >
              Lihat Katalog
            </a>
          </div>
          {/* Stats */}
          <div className="mt-12 grid max-w-lg grid-cols-3 border-t border-white/15 pt-7">
            <div>
              <strong className="block text-3xl font-black sm:text-4xl" style={{ fontFamily: "var(--k-font-display)" }}>350K+</strong>
              <span className="text-xs text-white/50">Order selesai</span>
            </div>
            <div>
              <strong className="block text-3xl font-black sm:text-4xl" style={{ fontFamily: "var(--k-font-display)" }}>9K+</strong>
              <span className="text-xs text-white/50">Klien puas</span>
            </div>
            <div>
              <strong className="block text-3xl font-black text-[#dfff00] sm:text-4xl" style={{ fontFamily: "var(--k-font-display)" }}>4.9★</strong>
              <span className="text-xs text-white/50">Rating pelanggan</span>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative mx-auto h-[480px] w-full max-w-lg sm:h-[600px]">
          {/* Image 1 - white jersey */}
          <div className="absolute left-0 top-16 w-[62%] -rotate-6 overflow-hidden rounded-[2rem] border border-white/20 bg-white p-2 shadow-2xl">
            <Image
              src="https://api.moda.app/api/v2/images/ref/defb6388-ebe3-40a0-b457-d08334b6baae?v=d9c4edb32255a94c&s=131d426c96ffb7ed53b81319bf6dd905"
              alt="Desain jersey custom putih"
              width={400}
              height={400}
              className="aspect-square w-full rounded-[1.55rem] object-cover"
            />
          </div>
          {/* Image 2 - red jersey */}
          <div className="absolute bottom-10 right-0 w-[65%] rotate-6 overflow-hidden rounded-[2rem] border border-white/20 bg-[#ff5a1f] p-2 shadow-2xl">
            <Image
              src="https://api.moda.app/api/v2/images/ref/9ad7f29b-74cc-4583-b40b-b77d39d5049a?v=ebde868f4a24317d&s=ffa3a6f7caa47c4febd51c697148a90a"
              alt="Desain jersey custom merah"
              width={400}
              height={400}
              className="aspect-square w-full rounded-[1.55rem] object-cover"
            />
          </div>
          {/* Promo badge */}
          <div className="absolute right-3 top-2 rotate-3 rounded-2xl bg-[#dfff00] px-5 py-4 text-black shadow-xl">
            <span className="block text-3xl font-black" style={{ fontFamily: "var(--k-font-display)" }}>BELI 6</span>
            <span className="text-xs font-extrabold uppercase tracking-wider">Gratis 1 Jersey</span>
          </div>
          {/* Price badge */}
          <div className="absolute bottom-0 left-3 -rotate-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">Mulai dari</span>
            <span className="block text-4xl font-black" style={{ fontFamily: "var(--k-font-display)" }}>Rp65K</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Keunggulan                                                           */
/* ------------------------------------------------------------------ */

function Keunggulan() {
  return (
    <section id="keunggulan" className="bg-[#f5f1e8] px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="text-sm font-extrabold uppercase tracking-[.2em] text-[#ff5a1f]">Kenapa TNT SPORT?</span>
            <h2 className="mt-4 text-5xl font-black uppercase leading-none sm:text-7xl"
                style={{ fontFamily: "var(--k-font-display)" }}>
              Kualitas Nggak Harus <span className="italic text-[#ff5a1f]">Mahal.</span>
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2"
               style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
            {KEUNGGULAN.map((item) => (
              <article key={item.num} className="bg-white p-8">
                <span className="block text-5xl font-black text-[#ff5a1f]"
                      style={{ fontFamily: "var(--k-font-display)" }}>
                  {item.num}
                </span>
                <h3 className="mt-8 text-2xl font-black uppercase"
                    style={{ fontFamily: "var(--k-font-display)" }}>
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-black/55">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Katalog                                                               */
/* ------------------------------------------------------------------ */

function KatalogSection() {
  return (
    <section id="katalog" className="bg-[#11110f] px-5 py-24 text-white lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-extrabold uppercase tracking-[.2em] text-[#dfff00]">Katalog Pilihan</span>
            <h2 className="mt-4 text-5xl font-black uppercase sm:text-7xl"
                style={{ fontFamily: "var(--k-font-display)" }}>
              Jersey Buat <span className="italic text-[#ff5a1f]">Semua Tim.</span>
            </h2>
          </div>
          <p className="max-w-sm text-white/50">
            Futsal, badminton, voli, basket, esport, road bike, hingga komunitas.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {KATALOG_ITEMS.map((item) => (
            <article key={item.code} className="group relative overflow-hidden rounded-3xl">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={600}
                  height={600}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0"
                     style={{ background: "linear-gradient(180deg,transparent 50%,rgba(0,0,0,.8))" }} />
                <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[#dfff00]">{item.code}</p>
                  <h3 className="text-3xl font-black uppercase" style={{ fontFamily: "var(--k-font-display)" }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}

          {/* CTA Card */}
          <article className="relative flex min-h-80 flex-col justify-between overflow-hidden rounded-3xl bg-[#ff5a1f] p-8 text-black">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[32px] border-black/10" />
            <span className="text-7xl font-black" style={{ fontFamily: "var(--k-font-display)" }}>15+</span>
            <div>
              <h3 className="text-4xl font-black uppercase leading-none" style={{ fontFamily: "var(--k-font-display)" }}>
                Kategori Jersey
              </h3>
              <p className="mt-4 max-w-xs text-black/65">
                Punya desain sendiri? Kirim referensinya, kami bantu jadiin jersey.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex rounded-full bg-black px-6 py-3 font-bold text-white"
              >
                Lihat Semua Desain ↗
              </a>
            </div>
          </article>
        </div>

        {/* Category tags */}
        <div className="mt-8 flex flex-wrap gap-2 text-sm font-semibold text-white/70">
          {CATEGORIES.map((cat) => (
            <span key={cat.label} className="rounded-full border border-white/15 px-4 py-2">
              {cat.emoji} {cat.label}
            </span>
          ))}
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
    <section id="harga" className="bg-[#f5f1e8] px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-extrabold uppercase tracking-[.2em] text-[#ff5a1f]">Harga Transparan</span>
          <h2 className="mt-4 text-5xl font-black uppercase sm:text-7xl"
              style={{ fontFamily: "var(--k-font-display)" }}>
            Langsung dari <span className="italic text-[#ff5a1f]">Pabrik.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-black/55">
            Tanpa biaya tersembunyi. Sudah termasuk custom desain, nama, nomor, dan logo.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Card 1 - Atasan Saja */}
          <article className="rounded-[2rem] border border-black/10 bg-white p-8 sm:p-10">
            <p className="font-bold uppercase tracking-widest text-black/40">Atasan Saja</p>
            <h3 className="mt-3 text-4xl font-black uppercase" style={{ fontFamily: "var(--k-font-display)" }}>
              Jersey Full Print
            </h3>
            <div className="my-8 flex items-end gap-2">
              <span className="text-7xl font-black" style={{ fontFamily: "var(--k-font-display)" }}>65K</span>
              <span className="pb-3 text-black/45">/ pcs (lusin)</span>
            </div>
            <ul className="space-y-4 text-black/65">
              <li>✓ Full custom desain bebas</li>
              <li>✓ Nama &amp; nomor punggung</li>
              <li>✓ Bisa order satuan</li>
              <li>✓ Garansi kualitas jahitan</li>
            </ul>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 block rounded-full border-2 border-black px-6 py-4 text-center font-extrabold uppercase transition hover:bg-black hover:text-white"
            >
              Pesan Atasan ↗
            </a>
          </article>

          {/* Card 2 - Setelan */}
          <article className="relative overflow-hidden rounded-[2rem] bg-[#ff5a1f] p-8 text-black sm:p-10">
            <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#dfff00] px-5 py-3 text-xs font-black uppercase tracking-wider">
              Paling Diminati
            </div>
            <p className="font-bold uppercase tracking-widest text-black/50">Atasan + Celana</p>
            <h3 className="mt-3 text-4xl font-black uppercase" style={{ fontFamily: "var(--k-font-display)" }}>
              Jersey Setelan
            </h3>
            <div className="my-8 flex items-end gap-2">
              <span className="text-7xl font-black" style={{ fontFamily: "var(--k-font-display)" }}>110K</span>
              <span className="pb-3 text-black/55">/ stel (lusin)</span>
            </div>
            <ul className="space-y-4 text-black/70">
              <li>✓ Atasan + celana full printing</li>
              <li>✓ Full custom desain bebas</li>
              <li>✓ Nama, nomor &amp; logo klub</li>
              <li>✓ Bisa order satuan</li>
            </ul>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 block rounded-full bg-black px-6 py-4 text-center font-extrabold uppercase text-white transition hover:bg-[#dfff00] hover:text-black"
            >
              Pesan Setelan ↗
            </a>
          </article>
        </div>

        {/* Promo banner */}
        <div className="mx-auto mt-6 max-w-5xl rounded-2xl bg-[#dfff00] px-6 py-5 text-center font-bold">
          🎁 PROMO: Beli 6 gratis 1 — berlaku kelipatannya untuk atasan maupun setelan.
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
    <section id="cara-order" className="bg-[#ff5a1f] px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-sm font-extrabold uppercase tracking-[.2em]">Cara Order</span>
          <h2 className="mt-4 text-5xl font-black uppercase leading-none sm:text-7xl"
              style={{ fontFamily: "var(--k-font-display)" }}>
            Dari Ide ke Jersey, <span className="italic text-white">Cuma 5 Langkah.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => {
            const isFirst = i === 0;
            const isLast = i === STEPS.length - 1;
            return (
              <article
                key={step.num}
                className={`rounded-3xl p-6 ${
                  isFirst
                    ? "bg-black text-white"
                    : isLast
                      ? "bg-[#dfff00] text-black"
                      : "bg-white/20 text-black"
                }`}
              >
                <span className={`block text-5xl font-black ${isFirst ? "text-[#dfff00]" : ""}`}
                      style={{ fontFamily: "var(--k-font-display)" }}>
                  {step.num}
                </span>
                <h3 className="mt-10 text-2xl font-black uppercase"
                    style={{ fontFamily: "var(--k-font-display)" }}>
                  {step.title}
                </h3>
                <p className={`mt-2 text-sm ${isFirst ? "text-white/55" : "text-black/60"}`}>
                  {step.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                          */
/* ------------------------------------------------------------------ */

function Testimonials() {
  return (
    <section className="bg-[#11110f] px-5 py-24 text-white lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <span className="text-sm font-extrabold uppercase tracking-[.2em] text-[#dfff00]">Ulasan Pelanggan</span>
            <h2 className="mt-4 text-5xl font-black uppercase leading-none sm:text-7xl"
                style={{ fontFamily: "var(--k-font-display)" }}>
              Dipercaya <span className="italic text-[#ff5a1f]">Ribuan Tim.</span>
            </h2>
            <div className="mt-8 flex text-3xl text-[#dfff00]">
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <p className="mt-2 text-white/45">4.9 dari ribuan pelanggan</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="flex text-[#dfff00]">
                  {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className="mt-5 text-lg leading-relaxed text-white/75">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-7 font-bold">
                  {t.name}
                  <span className="block text-sm font-normal text-white/35">{t.location}</span>
                </footer>
              </blockquote>
            ))}
          </div>
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
    <section className="bg-[#f5f1e8] px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <span className="text-sm font-extrabold uppercase tracking-[.2em] text-[#ff5a1f]">FAQ</span>
          <h2 className="mt-4 text-5xl font-black uppercase leading-none sm:text-7xl"
              style={{ fontFamily: "var(--k-font-display)" }}>
            Masih Ada <span className="italic text-[#ff5a1f]">Pertanyaan?</span>
          </h2>
        </div>
        <div className="divide-y divide-black/15 border-y border-black/15">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="group py-6">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-xl font-bold">
                {item.q}
                <span className="plus text-3xl transition group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pt-4 leading-relaxed text-black/55">{item.a}</p>
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
    <section className="px-5 pb-8 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#ff5a1f] px-6 py-20 text-center sm:px-12 lg:py-28">
        {/* Decorative circles */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border-[45px] border-black/10" />
        <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full border-[50px] border-[#dfff00]/40" />

        <div className="relative">
          <p className="font-extrabold uppercase tracking-[.2em]">Konsultasi Gratis • Tanpa Syarat</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-6xl font-black uppercase leading-[.9] sm:text-8xl"
              style={{ fontFamily: "var(--k-font-display)" }}>
            Siap Bikin Jersey <span className="italic text-white">Tim Kamu?</span>
          </h2>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex rounded-full bg-black px-9 py-5 font-extrabold uppercase text-white transition hover:-translate-y-1 hover:bg-[#dfff00] hover:text-black"
          >
            Chat Admin Sekarang ↗
          </a>
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
    <footer className="bg-[#11110f] px-5 pb-28 pt-16 text-white lg:px-8 lg:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 border-b border-white/10 pb-12 sm:flex-row">
        <div>
          <div className="text-3xl font-black uppercase" style={{ fontFamily: "var(--k-font-display)" }}>
            TNT SPORT
          </div>
          <p className="mt-3 max-w-sm text-white/45">
            Pabrik jersey custom full printing untuk tim, klub, sekolah, dan komunitas di seluruh Indonesia.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-white/60">
          <a href="#keunggulan" className="hover:text-white transition">Keunggulan</a>
          <a href="#katalog" className="hover:text-white transition">Katalog</a>
          <a href="#harga" className="hover:text-white transition">Harga</a>
          <a href="#cara-order" className="hover:text-white transition">Cara Order</a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-8 text-xs text-white/30 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} TNT SPORT. All rights reserved.</p>
        <p>Jersey custom, langsung dari pabrik.</p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Floating WA Button                                                   */
/* ------------------------------------------------------------------ */

function FloatingWA() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#dfff00] px-5 py-4 font-extrabold text-black shadow-2xl transition hover:-translate-y-1"
    >
      <span className="text-xl">💬</span>
      <span className="hidden sm:inline">Chat Admin</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function KatalogPage() {
  return (
    <div className="katalog-page overflow-x-hidden">
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Keunggulan />
        <KatalogSection />
        <Harga />
        <CaraOrder />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <FloatingWA />
    </div>
  );
}
