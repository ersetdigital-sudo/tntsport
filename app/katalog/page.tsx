import type { Metadata } from "next";
import Image from "next/image";
import { ProductCatalog } from "@/components/ProductCatalog";
import { PriceCards } from "@/components/PriceCards";
import { FlashSaleTimer } from "@/components/FlashSaleTimer";
import { SocialProof } from "@/components/SocialProof";
import { getCatalogData, getKatalogFeatures, getKatalogTestimonials } from "@/lib/queries";

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
  { num: "01", title: "Chat Admin", desc: "Ceritakan kebutuhan jersey kamu.", icon: "MessageCircle" },
  { num: "02", title: "Desain", desc: "Kami buatkan mockup sesuai brief.", icon: "Palette" },
  { num: "03", title: "ACC & DP", desc: "Setujui desain dan DP 50%.", icon: "CheckCircle" },
  { num: "04", title: "Produksi", desc: "Dikerjakan cepat di pabrik kami.", icon: "Cog" },
  { num: "05", title: "Kirim", desc: "Dikemas aman, jersey siap dipakai!", icon: "Truck" },
];

const TESTIMONIALS = [
  {
    badge: "Verified Buyer",
    quote:
      "Order 24 pcs jersey futsal buat tim kantor, semua puas banget. Bahan dryfit-nya adem, jahitan rapi, dan yang paling penting—desainnya persis kayak yang kami mau. Harga segini dapat kualitas segini, worth it banget sih.",
    name: "Rizky Pratama",
    city: "Jakarta Selatan",
    team: "Tim Futsal Kantor BCA",
  },
  {
    badge: "Verified Buyer",
    quote:
      "Buat event lari 5K kampus, kami pesan 300 pcs jersey running. Hasilnya rapi, bahan ringan, dan selesai tepat waktu padahal deadline-nya mepet. Peserta pada nanya beli di mana, langsung repeat order deh.",
    name: "Dewi Lestari",
    city: "Bandung",
    team: "Komunitas Lari ITB",
  },
  {
    badge: "Verified Buyer",
    quote:
      "Udah 4 kali order jersey voli di sini. Yang bikin loyal: desainnya selalu fresh, revisi gratis sampai cocok, dan CS-nya fast response banget. Kali ini 50 pcs selesai 5 hari, top!",
    name: "Ahmad Fauzan",
    city: "Surabaya",
    team: "Tim Voli SMA Negeri 3",
  },
  {
    badge: "Verified Buyer",
    quote:
      "Pesan 12 set jersey badminton buat klub, dari desain sampai pengiriman cuma seminggu. Jahitannya kuat, printing-nya tajam, dan celananya juga nyaman dipake. Pasti bakal order lagi buat turnamen bulan depan.",
    name: "Siti Nurhaliza",
    city: "Yogyakarta",
    team: "Klub Badminton Gadjah Mada",
  },
  {
    badge: "Verified Buyer",
    quote:
      "Komunitas cyclist kami pesan 80 pcs jersey sepeda. Bahan breathable, nggak gerah pasgowes jarak jauh. Desainnya juga kece, banyak yang nanya custom di mana. TNT Sport jawabannya!",
    name: "Budi Santoso",
    city: "Malang",
    team: "Komunitas Cyclist Malang",
  },
  {
    badge: "Verified Buyer",
    quote:
      "Pesan jersey sekolah buat 200 anak. Harga pabrik emang beda jauh dari vendor lain. Kualitas jahitan oke, printing full color nggak luntur setelah dicuci berkali-kali. Anak-anak seneng banget pakainya.",
    name: "Hendra Wijaya",
    city: "Semarang",
    team: "SMA Muhammadiyah 2",
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
  return <span className="text-[#00aa13]">✓</span>;
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
            src="/0df8a74d-b39f-4bc5-8d55-0be10a01cbe2.png"
            alt="Tiga atlet mengenakan jersey custom TNT Sport"
            fill
            className="object-cover object-top lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0b0b0b]/20 lg:via-transparent lg:to-transparent" />
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-30 overflow-hidden border-y border-[#00aa13]/30 bg-[#0b0b0b] py-3 text-white sm:py-3.5">
        <div className="ticker flex w-max items-center gap-8 whitespace-nowrap pr-8 sm:gap-10 sm:pr-10">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-[.16em] text-white/65 sm:gap-8 sm:text-[10px]"
                 style={{ fontFamily: "var(--font-mono)" }}
                 aria-hidden={dup === 1 ? true : undefined}>
              {TICKER_ITEMS.map((item, i) => (
                typeof item === "object" && item.badge ? (
                  <span key={i} className="rounded-full border border-[#00aa13]/50 bg-[#00aa13]/10 px-4 py-1.5 text-[#00aa13]">{item.text}</span>
                ) : (
                  <span key={i} className="flex items-center gap-2 sm:gap-3">
                    <i className="h-1 w-1 rounded-full bg-[#00aa13] shadow-[0_0_10px_#00aa13] sm:h-1.5 sm:w-1.5" />
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
/* Flash Sale                                                           */
/* ------------------------------------------------------------------ */

function FlashSale() {
  return (
    <section id="flash-sale" className="grid-noise relative overflow-hidden border-b border-white/10 bg-[#080a07] px-5 py-10 text-white lg:px-8 lg:py-14">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00aa13]/15 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-[#00aa13]/35 bg-[#11140f] shadow-[0_28px_90px_rgba(0,170,19,.12)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-[#00aa13] shadow-[0_0_24px_rgba(0,170,19,.8)]" />
        <div className="pointer-events-none absolute -right-8 -top-20 select-none text-[170px] font-black italic leading-none text-white/[.025] sm:text-[240px]">TNT</div>
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full border-[42px] border-[#00aa13]/5" />

        <div className="relative grid gap-9 px-6 py-9 sm:px-9 sm:py-11 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:px-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00aa13]/30 bg-[#00aa13]/10 px-3.5 py-2 text-[9px] font-black uppercase tracking-[.2em] text-[#00c317] sm:text-[10px]"
                 style={{ fontFamily: "var(--font-mono)" }}>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00aa13] shadow-[0_0_10px_#00aa13]" />
              TNT Sport Flash Deal
            </div>
            <h2 className="mt-5 text-5xl font-black uppercase leading-[.88] tracking-[-.035em] sm:text-6xl"
                style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
              Waktunya<br /><span className="text-[#00aa13]">Gas Order!</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
              Amankan harga jersey full printing mulai <strong className="text-white">50 ribuan</strong> sebelum promo berakhir. Desain bebas, tanpa minimal order.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-white/60">
              <span><b className="mr-1.5 text-[#00aa13]">✓</b>Gratis desain</span>
              <span><b className="mr-1.5 text-[#00aa13]">✓</b>Revisi bebas</span>
              <span><b className="mr-1.5 text-[#00aa13]">✓</b>Full custom</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#090b08]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-white/55 sm:text-[10px]"
                 style={{ fontFamily: "var(--font-mono)" }}>
                Deal berakhir dalam
              </p>
              <span className="rounded-full bg-[#f36458]/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-[#ff8278]"
                    style={{ fontFamily: "var(--font-mono)" }}>
                Stok promo terbatas
              </span>
            </div>
            <FlashSaleTimer />
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-between rounded-xl bg-[#00aa13] px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_35px_rgba(0,170,19,.22)] transition hover:-translate-y-1 hover:bg-[#00c317]"
            >
              <span>Konsultasi &amp; Order Sekarang</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Keunggulan                                                           */
/* ------------------------------------------------------------------ */

// Lucide icon map for dynamic features
import { Thermometer, Palette, Scissors, Clock, Cog, Droplets, Headphones, Sparkles, MessageCircle, CheckCircle, Truck } from "lucide-react";

const LUCIDE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Thermometer, Palette, Scissors, Clock, Cog, Droplets, Headphones, Sparkles,
  MessageCircle, CheckCircle, Truck,
};

function FeatureIcon({ iconName, fallbackSrc }: { iconName: string | null; fallbackSrc?: string }) {
  // If icon is a URL (uploaded image from Cloudinary)
  if (iconName && iconName.startsWith("http")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={iconName} alt="" className="h-8 w-8 object-contain sm:h-10 sm:w-10" />
    );
  }
  // If icon is a Lucide icon name
  if (iconName && LUCIDE_ICON_MAP[iconName]) {
    const Icon = LUCIDE_ICON_MAP[iconName];
    return <Icon size={24} className="text-white" />;
  }
  // Fallback to static image
  if (fallbackSrc) {
    const isPng = fallbackSrc.endsWith(".png");
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={fallbackSrc}
        alt=""
        className={`h-8 w-8 object-contain sm:h-10 sm:w-10 ${isPng ? "" : "invert"}`}
      />
    );
  }
  return <Sparkles size={24} className="text-white" />;
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
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#00aa13]"
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
            <article key={i} className="rounded-3xl border border-white/10 bg-[#131611] p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[#00aa13]/35 sm:p-6">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#16a34a] shadow-[0_8px_24px_rgba(22,163,74,.2)] sm:mb-8 sm:h-16 sm:w-16">
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
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#171b14] to-[#10120f] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#00aa13]/35">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#00aa13]/[.04] blur-2xl transition group-hover:bg-[#00aa13]/10" />
              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#00aa13]/25 bg-[#00aa13]/10 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
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
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#00aa13]"
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
      {/* Grid noise pattern */}
      <div className="absolute inset-0 opacity-30"
           style={{
             backgroundImage: "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
             backgroundSize: "42px 42px",
           }} />
      {/* Lime glow */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-[#00aa13]/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#00aa13]"
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

        <PriceCards />

        {/* Bulk promo */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4 rounded-3xl border border-[#f36458]/25 bg-[#f36458]/[.07] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <strong className="block text-4xl font-black uppercase leading-[.9] tracking-tight text-white sm:text-6xl"
                    style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
              Butuh lebih dari 50 pcs?
            </strong>
            <p className="mt-3 text-sm text-[#92998b]">Dapatkan harga proyek khusus untuk komunitas, sekolah, dan event.</p>
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
        <div className="relative overflow-hidden rounded-[2rem] border border-[#00aa13]/25 bg-[#111] px-5 py-8 shadow-[0_24px_80px_rgba(0,170,19,.08)] sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute -right-2 -top-16 select-none text-[120px] font-black leading-none text-white/[.025] sm:right-8 sm:text-[220px]">7</div>
          <div className="pointer-events-none absolute -left-20 bottom-0 h-32 w-32 rounded-full bg-[#00aa13]/10 blur-3xl sm:h-48 sm:w-48" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#00aa13] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[.18em] text-[#080a07] sm:px-4 sm:py-2 sm:text-[9px]"
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
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#00aa13] px-5 py-3 text-xs font-black uppercase tracking-wide text-[#080a07] shadow-[0_10px_35px_rgba(0,170,19,.16)] transition hover:-translate-y-1 sm:px-7 sm:py-4 sm:text-sm"
            >
              Klaim Promo
            </a>
          </div>
        </div>

        {/* Guarantee badges */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {["Garansi harga terbaik", "Garansi tepat waktu", "Garansi kualitas jahitan", "Revisi gratis"].map((item, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-[#111] px-3 py-2 text-center text-[9px] font-black uppercase tracking-[.12em] text-white/70 sm:px-4 sm:py-4 sm:text-[10px]">
              <span className="mr-1 text-[#00aa13] sm:mr-2">✓</span> {item}
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
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#00aa13]"
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
          return (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-[#151914] p-4 sm:rounded-3xl sm:p-6"
            >
              <div className="flex items-center gap-3">
                {(() => {
                  const IconComponent = LUCIDE_ICON_MAP[step.icon];
                  return IconComponent ? <IconComponent size={24} className="text-[#00aa13]" /> : null;
                })()}
                <span className="text-2xl font-black text-[#00aa13] sm:text-3xl"
                      style={{ fontFamily: "var(--font-mono)" }}>
                  {step.num}
                </span>
              </div>
              <h3 className="mt-4 font-black text-[#f0f2ec] sm:mt-6">{step.title}</h3>
              <p className="mt-1 text-xs text-[#92998b] sm:mt-2 sm:text-sm">
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

async function Ulasan() {
  const dbTestimonials = await getKatalogTestimonials();
  const testimonials = dbTestimonials?.map((t) => ({
    badge: t.badge,
    quote: t.quote,
    name: t.name,
    city: t.city,
    team: t.team,
    imageUrl: t.imageUrl,
    rating: t.rating,
  })) ?? TESTIMONIALS;

  return (
    <section id="ulasan" className="border-y border-white/10 bg-[#090b08] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#00aa13]"
             style={{ fontFamily: "var(--font-mono)" }}>
            Ulasan Pelanggan
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase text-[#f0f2ec] sm:mt-3 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
            Kata <span className="text-[#00aa13]">Pelanggan</span> Kami
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#a7ad9e]">
            Ribuan tim &amp; komunitas sudah percaya TNT Sport untuk kebutuhan jersey custom mereka.
          </p>
        </div>

        {/* Auto-scrolling Photo Gallery */}
        <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#11140f] p-4 shadow-[0_28px_80px_rgba(0,0,0,.28)] sm:p-6">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#00aa13]"
                 style={{ fontFamily: "var(--font-mono)" }}>
                📸 Bukti bukan janji
              </p>
              <h3 className="mt-2 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl"
                  style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
                Hasil <span className="text-[#00aa13]">nyata</span> dari pelanggan kami
              </h3>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-white/45 sm:text-right">
              Foto asli jersey yang sudah diterima pelanggan — bukan edit, bukan rekayasa
            </p>
          </div>

          {/* Auto-scrolling marquee gallery */}
          <div className="gallery-scroll group overflow-hidden">
            <div className="gallery-track flex gap-3">
              {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
                <figure key={i} className="relative h-[200px] w-[280px] shrink-0 overflow-hidden rounded-xl border border-white/10 sm:h-[240px] sm:w-[340px]">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </figure>
              ))}
            </div>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#00aa13] px-6 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-[#00c317] sm:mx-auto sm:w-fit sm:rounded-full sm:px-8"
          >
            Mau Jersey Seperti Ini? Order Sekarang <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="rounded-2xl border border-white/10 bg-[#11140f] p-5 sm:rounded-3xl sm:p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#00aa13]/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#00aa13]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {t.badge}
                </span>
                <span className="text-[#00aa13] text-xs">{"★".repeat(t.rating ?? 5)}</span>
              </div>
              <p className="text-sm leading-relaxed text-[#d4d7d0] italic">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                {/* Avatar with image or initials */}
                {(t as any).imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={(t as any).imageUrl} alt={t.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00aa13] text-sm font-black text-white">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                )}
                  <strong className="block text-sm font-black uppercase text-[#f0f2ec]">{t.name}</strong>
                  <span className="flex items-center gap-1 text-xs text-[#7f8678]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {t.city} — {t.team}
                  </span>
                </div>
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
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#00aa13]"
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
                <span className="text-base font-medium text-[#00aa13] transition group-open:rotate-45 sm:text-lg">+</span>
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
             backgroundImage: "linear-gradient(rgba(0,170,19,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,170,19,.08) 1px, transparent 1px)",
             backgroundSize: "40px 40px",
           }} />
      {/* Lime glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00aa13]/15 blur-[160px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#00aa13] sm:text-xs"
           style={{ fontFamily: "var(--font-mono)" }}>
          Konsultasi gratis • tanpa syarat
        </p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-[.9] sm:mt-4 sm:text-6xl lg:text-8xl"
            style={{ fontFamily: "var(--font-sans)", fontStretch: "condensed", fontStyle: "italic" }}>
          Siap bikin<br /><span className="text-[#00aa13]">jersey custom?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[#a7ad9e] sm:mt-6 sm:text-lg">
          Tim kami siap bantu dari desain sampai pengiriman. Ceritakan kebutuhanmu, kami urus sisanya.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#00aa13] px-6 py-3 font-black text-[#080a07] shadow-[0_14px_50px_rgba(0,170,19,.25)] transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,170,19,.35)] sm:mt-8 sm:gap-3 sm:px-8 sm:py-4"
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
                TNT <span className="text-[#00aa13]">SPORT</span>
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
      .gallery-scroll .gallery-track {
        animation: gallery-scroll 20s linear infinite;
        will-change: transform;
      }
      .gallery-scroll:hover .gallery-track {
        animation-play-state: paused;
      }
      @keyframes gallery-scroll {
        to { transform: translateX(-50%); }
      }
      @media (prefers-reduced-motion: reduce) {
        .gallery-scroll .gallery-track { animation: none; }
      }
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
        background: linear-gradient(145deg, rgba(0,170,19,.16), rgba(0,170,19,.035));
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
      <main>
        <Hero />
        <FlashSale />
        <Keunggulan />
        <Kategori />
        <Harga />
        <Promo />
        <CaraOrder />
        <Ulasan />
        <FAQ />
        <CTASection />
      </main>
      <SocialProof />
      <Footer />
    </div>
  );
}
