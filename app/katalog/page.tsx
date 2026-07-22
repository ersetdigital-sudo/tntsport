import type { Metadata } from "next";
import Image from "next/image";

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

const CATALOG_DATA = [
  {
    id: "football",
    title: "Sepak Bola / Futsal",
    alt: "Katalog jersey Sepak Bola dan Futsal",
    image: "https://api.moda.app/api/v2/images/ref/2d52a662-f209-4e4d-a098-09349a486e93?v=fb24fb940f674a71&s=90b809c3f731926dfbc07b6c00da717c",
  },
  {
    id: "volley",
    title: "Voli",
    alt: "Katalog jersey Voli",
    image: "https://api.moda.app/api/v2/images/ref/4b9f52f4-3857-4574-b5ca-c0121aa049af?v=f74c0bb6556b9352&s=4b3926ab038f34b05bcab1ae86cc45f0",
  },
  {
    id: "basket",
    title: "Basket",
    alt: "Katalog jersey Basket",
    image: "https://api.moda.app/api/v2/images/ref/29b00367-56b1-4d02-84ed-fd4127488008?v=dda6ad0954c8d316&s=e9b81b7936628059564687a7ca51446b",
  },
  {
    id: "fishing",
    title: "Mancing",
    alt: "Katalog jersey Mancing",
    image: "https://api.moda.app/api/v2/images/ref/48b04ca0-5bfa-4cd0-9557-30a64821c221?v=ac4e0035848b8bb3&s=1edadc737b1c5805c79ba7aef0e5689d",
  },
  {
    id: "racing",
    title: "Racing",
    alt: "Katalog jersey Racing",
    image: "https://api.moda.app/api/v2/images/ref/e618cb28-455b-40a5-9d68-2c8ffdfbda35?v=d398832b4649ba12&s=ef4d858e15fe04be04f7f55b7ebec3e4",
  },
  {
    id: "running",
    title: "Running",
    alt: "Katalog jersey Running",
    image: "https://api.moda.app/api/v2/images/ref/88b996b6-6eda-4166-91bf-0bbc7d8194d4?v=244e6bf7de26a60e&s=9da6b59784f94e34bcc450d52c6d6626",
  },
  {
    id: "army",
    title: "Army",
    alt: "Katalog jersey Army",
    image: "https://api.moda.app/api/v2/images/ref/4b84b73b-7b99-4197-afb0-6317c89492cc?v=ee0d9e529ccdda0d&s=a4939dd299c06ef0cdf93591e49d3d4c",
  },
  {
    id: "badminton",
    title: "Badminton",
    alt: "Katalog jersey Badminton",
    image: "https://api.moda.app/api/v2/images/ref/96538b74-a519-48d6-943d-fbafb49c7ed7?v=cd10446eef8d7624&s=367d1607c3ba08785f584c56fdd15590",
  },
  {
    id: "fantasy",
    title: "Fantasy Club",
    alt: "Katalog jersey Fantasy Club",
    image: "https://api.moda.app/api/v2/images/ref/523d56af-d1c7-4d5c-ad4e-d075c5d71a80?v=1abc999fc56d6aa2&s=cf1fccaefba4434e5f4dd0913a5d1293",
  },
  {
    id: "corporate",
    title: "Instansi / Corporate",
    alt: "Katalog jersey Instansi dan Corporate",
    image: "https://api.moda.app/api/v2/images/ref/7d80f03a-6fe1-4213-8bac-d02e35e57ad7?v=9629e3d8de6b3c9e&s=80e84b9cf7a6b0b69c2a31755961861b",
  },
];

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

const CATEGORIES = [
  { id: "football", label: "Sepak Bola / Futsal" },
  { id: "volley", label: "Voli" },
  { id: "basket", label: "Basket" },
  { id: "fishing", label: "Mancing" },
  { id: "racing", label: "Racing" },
  { id: "running", label: "Running" },
  { id: "army", label: "Army" },
  { id: "badminton", label: "Badminton" },
  { id: "fantasy", label: "Fantasy Club" },
  { id: "corporate", label: "Instansi / Corporate" },
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
    dark: false,
  },
  {
    quote:
      "Sudah 3x order jersey padel. Kualitas konsisten, jahitan kuat, bahan adem dan CS fast response.",
    name: "Silva Nurliva",
    location: "Purwokerto • Tim Padel",
    dark: true,
  },
  {
    quote:
      "1500 pcs dikebut satu minggu, hasil mantap dan event berjalan sesuai harapan. Makasih bantuannya!",
    name: "Wahyu Rahmani",
    location: "Banjarmasin • Event Running",
    dark: false,
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
  "Beli 6 Gratis 1",
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
  return <span className="text-[#16a34a]">✓</span>;
}

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="TNT Sport Home">
          <Image
            src="/af7bb11e-1e11-423d-809a-1d5c75fbe91f.png"
            alt="TNT Sport"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl object-contain"
          />
          <div className="text-xl font-black italic tracking-tight">
            TNT <span className="text-[#16a34a]">SPORT</span>
          </div>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-white/70 md:flex">
          <a href="#keunggulan" className="hover:text-[#16a34a]">Keunggulan</a>
          <a href="#kategori" className="hover:text-[#16a34a]">Katalog</a>
          <a href="#harga" className="hover:text-[#16a34a]">Harga</a>
          <a href="#cara-order" className="hover:text-[#16a34a]">Cara Order</a>
          <a href="#ulasan" className="hover:text-[#16a34a]">Ulasan</a>
        </nav>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#16a34a] px-5 py-2.5 text-sm font-black text-white transition hover:bg-green-500"
        >
          Konsultasi Gratis
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
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

      <div className="relative mx-auto min-h-[760px] max-w-7xl px-5 lg:min-h-[790px] lg:px-8">
        <div className="relative z-20 flex max-w-2xl flex-col justify-center pb-[430px] pt-16 lg:min-h-[790px] lg:pb-16 lg:pt-12">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#16a34a]/35 bg-[#16a34a]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[.18em] text-green-400"
               style={{ fontFamily: "var(--font-mono)" }}>
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#16a34a]" />
            Langsung dari pabrik
          </div>
          <h1 className="max-w-3xl text-[58px] font-black uppercase leading-[.88] tracking-[-.055em] sm:text-7xl lg:text-[90px]"
              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
            Bikin Jersey<br />
            <span className="text-[#16a34a]">Full Printing</span><br />
            Cuma 50 Ribu!
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
            Custom jersey sesukamu dengan hasil premium. Gratis desain, nama, nomor dan logo—bahkan untuk order satuan.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-white/70">
            <span className="flex items-center gap-2"><CheckIcon /> Free desain</span>
            <span className="flex items-center gap-2"><CheckIcon /> Tanpa minimal order</span>
            <span className="flex items-center gap-2"><CheckIcon /> Revisi bebas</span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#harga"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#16a34a] px-7 py-4 font-black text-white shadow-[0_12px_45px_rgba(22,163,74,.35)] transition hover:-translate-y-1 hover:bg-green-500"
            >
              Lihat Harga <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#cara-order"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/20 px-7 py-4 font-bold text-white backdrop-blur hover:border-white/50"
            >
              Cara Order
            </a>
          </div>
          <div className="mt-9 grid max-w-lg grid-cols-3 gap-3 border-t border-white/10 pt-6">
            <div>
              <strong className="text-2xl font-black sm:text-3xl">350K+</strong>
              <span className="mt-1 block text-[9px] uppercase tracking-widest text-white/45 sm:text-[10px]">Order selesai</span>
            </div>
            <div>
              <strong className="text-2xl font-black sm:text-3xl">9K+</strong>
              <span className="mt-1 block text-[9px] uppercase tracking-widest text-white/45 sm:text-[10px]">Klien puas</span>
            </div>
            <div>
              <strong className="text-2xl font-black text-[#16a34a] sm:text-3xl">4.9</strong>
              <span className="mt-1 block text-[9px] uppercase tracking-widest text-white/45 sm:text-[10px]">Rating ★</span>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[490px] lg:bottom-0 lg:left-[44%] lg:right-[-8%] lg:top-0 lg:h-full">
          <Image
            src="/37759e58-8f9f-45d9-a4be-7899929c6a95.png"
            alt="Tim mengenakan jersey custom TNT Sport"
            fill
            className="object-cover object-top lg:object-center"
            style={{
              maskImage: "linear-gradient(to right,transparent 0%,#000 20%,#000 100%)",
              WebkitMaskImage: "linear-gradient(to right,transparent 0%,#000 20%,#000 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0b0b0b]/20 lg:via-transparent lg:to-transparent" />
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-30 overflow-hidden border-y border-[#16a34a]/30 bg-[#0b0b0b] py-3.5 text-white"
           style={{
             maskImage: "linear-gradient(90deg,transparent,#000 72px,#000 calc(100% - 72px),transparent)",
             WebkitMaskImage: "linear-gradient(90deg,transparent,#000 72px,#000 calc(100% - 72px),transparent)",
           }}>
        <div className="ticker flex w-max items-center gap-10 whitespace-nowrap pr-10">
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[.16em] text-white/65"
               style={{ fontFamily: "var(--font-mono)" }}>
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className="flex items-center gap-3">
                <i className="h-1.5 w-1.5 rounded-full bg-[#16a34a] shadow-[0_0_10px_#16a34a]" />
                {item}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[.16em] text-white/65"
               style={{ fontFamily: "var(--font-mono)" }}
               aria-hidden="true">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className="flex items-center gap-3">
                <i className="h-1.5 w-1.5 rounded-full bg-[#16a34a] shadow-[0_0_10px_#16a34a]" />
                {item}
              </span>
            ))}
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
    <section id="keunggulan" className="bg-[#f7f7f7] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#16a34a]"
               style={{ fontFamily: "var(--font-mono)" }}>
              Kenapa TNT Sport?
            </p>
            <h2 className="mt-3 max-w-3xl text-5xl font-black uppercase leading-[.92] tracking-tight sm:text-6xl"
                style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
              Dibuat untuk tim yang mau tampil maksimal.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#4a4a4a] lg:justify-self-end">
            Dari konsultasi desain sampai pengiriman, semua dikerjakan tim profesional dengan material pilihan dan mesin produksi modern.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {KEUNGGULAN.map((item, i) => (
            <article key={i} className="rounded-3xl border border-black/[.06] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-[#16a34a] shadow-[0_8px_24px_rgba(22,163,74,.2)]">
                <Image src={item.icon} alt="" width={20} height={20} className="h-5 w-5 invert" />
              </div>
              <h3 className="text-base font-black uppercase">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#666]">{item.desc}</p>
            </article>
          ))}
        </div>

        {/* Info cards */}
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {INFO_CARDS.map((item, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl bg-[#111] px-5 py-4 text-white">
              {item.icon ? (
                <Image src={item.icon} alt="" width={24} height={24} className="h-6 w-6 shrink-0 invert" />
              ) : (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center text-lg text-white">◇</span>
              )}
              <div>
                <strong className="block text-sm font-black">{item.title}</strong>
                <span className="mt-1 block text-xs text-white/50">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Kategori (Catalog Tabs)                                              */
/* ------------------------------------------------------------------ */

function Kategori() {
  const defaultImage = CATALOG_DATA[0];

  return (
    <section id="kategori" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#16a34a]"
               style={{ fontFamily: "var(--font-mono)" }}>
              Jersey untuk semua
            </p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[.9] tracking-tight sm:text-6xl"
                style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
              Satu tim.<br />Karakter tanpa batas.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#666]">
              Kirim referensi, logo, atau warna tim. Kami bantu ubah jadi desain jersey yang siap diproduksi.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5" role="tablist" aria-label="Kategori katalog jersey">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className="catalog-tab rounded-full border border-black/10 bg-[#f7f7f7] px-4 py-2 text-xs font-bold transition hover:border-[#16a34a]"
                  data-catalog={cat.id}
                  aria-selected={cat.id === "football"}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <p className="mt-5 text-[9px] uppercase tracking-[.18em] text-[#999]"
               style={{ fontFamily: "var(--font-mono)" }}>
              Klik kategori untuk melihat koleksi
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0b0b0b] shadow-2xl shadow-black/15">
            <Image
              id="catalogImage"
              src={defaultImage.image}
              alt={defaultImage.alt}
              width={800}
              height={600}
              className="catalog-image aspect-[4/3] h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6 pt-20 text-white">
              <span className="text-[9px] uppercase tracking-[.2em] text-green-400"
                    style={{ fontFamily: "var(--font-mono)" }}>
                Koleksi pilihan
              </span>
              <p id="catalogTitle" className="mt-2 text-xl font-black">{defaultImage.title}</p>
            </div>
            <div className="pointer-events-none absolute right-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
              Full custom
            </div>
          </div>
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
    <section id="harga" className="bg-[#0b0b0b] py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-green-400"
             style={{ fontFamily: "var(--font-mono)" }}>
            Harga transparan
          </p>
          <h2 className="mt-3 text-5xl font-black uppercase sm:text-6xl"
              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
            Pilih paket timmu
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/55">
            Langsung pabrik = harga lebih terjangkau dari toko retail.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 lg:grid-cols-2">
          {/* Atasan */}
          <article className="rounded-[2rem] border border-white/10 bg-[#171717] p-7 sm:p-9">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/45"
                   style={{ fontFamily: "var(--font-mono)" }}>
                  Jersey atasan
                </p>
                <h3 className="mt-2 text-3xl font-black">Atasan Saja</h3>
              </div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs">Bisa ecer</span>
            </div>
            <div className="mt-8 flex items-end gap-2">
              <span className="text-5xl font-black">50rb</span>
              <span className="mb-2 text-white/45">/pcs • lusin</span>
            </div>
            <p className="mt-2 text-sm text-white/45">Ecer mulai Rp65rb/pcs</p>
            <ul className="mt-7 space-y-3 text-sm text-white/75">
              <li>✓ Full printing &amp; desain bebas</li>
              <li>✓ Nama dan nomor punggung</li>
              <li>✓ Proses cepat &amp; tepat waktu</li>
            </ul>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-full border border-white/20 py-3.5 text-center font-black hover:border-[#16a34a] hover:text-green-400"
            >
              Pilih Atasan
            </a>
          </article>

          {/* Setelan */}
          <article className="relative overflow-hidden rounded-[2rem] border border-[#16a34a]/55 bg-[#16a34a] p-7 text-white shadow-[0_20px_80px_rgba(22,163,74,.25)] sm:p-9">
            <div className="absolute right-0 top-0 bg-white px-5 py-2 text-[10px] font-black uppercase tracking-widest text-black">
              Paling diminati
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/70"
                 style={{ fontFamily: "var(--font-mono)" }}>
                Atasan + celana
              </p>
              <h3 className="mt-2 text-3xl font-black">Jersey Setelan</h3>
            </div>
            <div className="mt-8 flex items-end gap-2">
              <span className="text-5xl font-black">110rb</span>
              <span className="mb-2 text-white/70">/set • lusin</span>
            </div>
            <p className="mt-2 text-sm text-white/70">Ecer mulai Rp115rb/set</p>
            <ul className="mt-7 space-y-3 text-sm font-medium">
              <li>✓ Full custom desain bebas</li>
              <li>✓ Nama, nomor &amp; logo klub</li>
              <li>✓ Atasan + celana siap tanding</li>
            </ul>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-full bg-white py-3.5 text-center font-black text-black transition hover:-translate-y-1"
            >
              Pilih Setelan
            </a>
          </article>
        </div>

        {/* Bulk promo */}
        <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-[#f36458]/40 bg-[#f36458]/10 p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <strong className="text-xl">Pembelian partai besar?</strong>
            <p className="mt-1 text-sm text-white/55">Tersedia penawaran harga khusus yang lebih kompetitif.</p>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-[#f36458] px-5 py-3 text-sm font-black sm:mt-0"
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
    <section className="bg-[#0b0b0b] px-5 pb-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#16a34a]/25 bg-[#111] px-6 py-10 shadow-[0_24px_80px_rgba(22,163,74,.08)] sm:px-10 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute -right-2 -top-16 select-none text-[220px] font-black leading-none text-white/[.025] sm:right-8">7</div>
          <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-[#16a34a]/10 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#16a34a] px-4 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-white"
                    style={{ fontFamily: "var(--font-mono)" }}>
                Promo spesial
              </span>
              <h2 className="mt-5 text-4xl font-black uppercase tracking-tight sm:text-6xl"
                  style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
                Beli 6, Gratis 1.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">
                Berlaku kelipatannya: order 6 dapat 7, order 12 dapat 14, order 18 dapat 21. Berlaku untuk atasan maupun setelan.
              </p>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:-translate-y-1 hover:bg-[#16a34a] hover:text-white"
            >
              Klaim Promo
            </a>
          </div>
        </div>

        {/* Guarantee badges */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["Garansi harga terbaik", "Garansi tepat waktu", "Garansi kualitas jahitan", "Revisi gratis"].map((item, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-center text-[10px] font-black uppercase tracking-[.12em] text-white/70">
              <span className="mr-2 text-[#16a34a]">✓</span> {item}
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
    <section id="cara-order" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mb-12">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#16a34a]"
           style={{ fontFamily: "var(--font-mono)" }}>
          Cuma 5 langkah
        </p>
        <h2 className="mt-3 text-5xl font-black uppercase sm:text-6xl"
            style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
          Cara order—mudah!
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {STEPS.map((step, i) => {
          const isLast = i === STEPS.length - 1;
          return (
            <div
              key={i}
              className={`rounded-3xl p-6 ${
                isLast
                  ? "bg-[#16a34a] text-white"
                  : "bg-white p-6 ring-1 ring-black/10"
              }`}
            >
              <span className={`text-4xl font-black ${isLast ? "text-white/55" : "text-[#16a34a]"}`}
                    style={{ fontFamily: "var(--font-mono)" }}>
                {step.num}
              </span>
              <h3 className="mt-8 font-black">{step.title}</h3>
              <p className={`mt-2 text-sm ${isLast ? "text-white/75" : "text-[#4a4a4a]"}`}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ulasan                                                               */
/* ------------------------------------------------------------------ */

function Ulasan() {
  return (
    <section id="ulasan" className="bg-[#efefef] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#16a34a]"
             style={{ fontFamily: "var(--font-mono)" }}>
            Verified buyer
          </p>
          <h2 className="mt-3 text-5xl font-black uppercase sm:text-6xl"
              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
            Dipercaya ribuan tim
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              className={`rounded-3xl p-7 ${
                t.dark
                  ? "bg-[#0b0b0b] text-white"
                  : "bg-white"
              }`}
            >
              <div className="text-[#16a34a]">★★★★★</div>
              <p className="mt-5 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className={`mt-8 border-t pt-5 ${t.dark ? "border-white/10" : "border-black/10"}`}>
                <strong>{t.name}</strong>
                <span className={`block text-sm ${t.dark ? "text-white/45" : "text-[#888]"}`}>
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
    <section className="bg-[#f7f7f7] py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#16a34a]"
             style={{ fontFamily: "var(--font-mono)" }}>
            FAQ
          </p>
          <h2 className="mt-4 max-w-sm text-5xl font-black uppercase leading-[.88] tracking-[-.04em] sm:text-6xl"
              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
            Yang sering ditanyakan.
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#666]">
            Jawaban singkat untuk membantu kamu pesan dengan lebih tenang.
          </p>
        </div>

        <div className="divide-y divide-black/10 border-y border-black/10">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xs font-black uppercase tracking-wide sm:text-sm">
                {item.q}
                <span className="text-lg font-medium text-[#16a34a] transition group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pt-4 text-sm leading-relaxed text-[#666]">{item.a}</p>
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
    <section id="order" className="relative overflow-hidden bg-[#16a34a] px-5 py-24 text-white">
      <div className="absolute inset-0 opacity-30"
           style={{
             backgroundImage: "linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)",
             backgroundSize: "42px 42px",
           }} />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-white/70"
           style={{ fontFamily: "var(--font-mono)" }}>
          Konsultasi gratis • tanpa syarat
        </p>
        <h2 className="mt-4 text-6xl font-black uppercase leading-[.9] sm:text-8xl"
            style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
          Siap bikin<br />jersey custom?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
          Tim kami siap bantu dari desain sampai pengiriman. Ceritakan kebutuhanmu, kami urus sisanya.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-black text-black shadow-xl transition hover:-translate-y-1"
        >
          <WhatsAppIcon /> Chat WhatsApp Sekarang
        </a>
        <div className="mt-7 flex flex-wrap justify-center gap-5 text-[10px] uppercase tracking-widest text-white/70"
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
    <footer className="bg-[#0b0b0b] px-5 py-10 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-2xl font-black italic">
          TNT <span className="text-[#16a34a]">SPORT</span>
        </div>
        <p className="text-sm text-white/45">Desain bebas, harga pabrik, kirim se-Indonesia.</p>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 pt-6 text-xs text-white/35 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} TNT SPORT</span>
        <span>Jersey custom full printing Indonesia</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Catalog Tab Script (Client Component)                                */
/* ------------------------------------------------------------------ */

function CatalogScript() {
  const script = `
    document.querySelectorAll('[data-catalog]').forEach(button => {
      button.addEventListener('click', () => {
        const catalogData = ${JSON.stringify(CATALOG_DATA)};
        const item = catalogData.find(c => c.id === button.dataset.catalog);
        if (!item) return;
        document.querySelectorAll('[data-catalog]').forEach(tab => tab.setAttribute('aria-selected', String(tab === button)));
        const img = document.getElementById('catalogImage');
        const title = document.getElementById('catalogTitle');
        if (img && title) {
          img.style.opacity = '0.2';
          img.style.transform = 'scale(1.025)';
          const preload = new Image();
          preload.onload = () => {
            img.src = item.image;
            img.alt = item.alt;
            title.textContent = item.title;
            requestAnimationFrame(() => {
              img.style.opacity = '1';
              img.style.transform = 'none';
            });
          };
          preload.src = item.image;
        }
      });
    });
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
    />
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
      .catalog-image {
        transition: opacity 0.25s ease, transform 0.45s ease;
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
      <CatalogScript />
    </div>
  );
}
