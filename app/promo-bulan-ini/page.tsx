import type { Metadata } from "next";
import Image from "next/image";
import { Archivo_Black, DM_Sans } from "next/font/google";
import { PromoNav } from "@/components/PromoNav";
import { PromoDesignGrid } from "@/components/PromoDesignGrid";
import { PageViewTracker } from "@/components/PageViewTracker";
import { getBrand } from "@/lib/queries";

export const dynamic = "force-dynamic";

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

const FAQS = [
  { q: "Apakah ada minimal order?", a: "Tidak ada. Kamu bisa order satuan. Untuk order 6 pcs, dapat bonus 1 pcs gratis dan berlaku kelipatannya." },
  { q: "Berapa lama proses produksi?", a: "Produksi dimulai setelah desain disetujui dan DP masuk. Jadwal pengerjaan disepakati bersama sesuai jumlah dan kebutuhanmu." },
  { q: "Apakah bisa request desain sendiri?", a: "Bisa. Kirim referensi desain, logo, atau gambar. Tim desainer akan membantu mewujudkannya dan memberi kesempatan revisi." },
  { q: "Bahan jersey apa saja yang tersedia?", a: "Tersedia Dryfit Brazil, Milano, Embossed, Jacquard, dan bahan khusus sesuai kebutuhan." },
];

const TICKER_TEXT =
  "Gratis desain — Revisi tanpa batas — Tanpa minimal order — Beli 6 gratis 1 — Produksi cepat — ";

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const url = brand.url || "https://www.tntsportapparel.id";
  return {
    title: "Promo Kemerdekaan — TNT SPORT",
    description:
      "Promo jersey custom kemerdekaan dari TNT SPORT. Gratis desain, nama, nomor & logo. Tanpa minimal order, revisi bebas.",
    alternates: { canonical: "/promo-bulan-ini" },
    openGraph: {
      title: "Promo Kemerdekaan — TNT SPORT",
      description:
        "Jersey custom full printing mulai 50 ribu. Gratis desain, bebas custom nama, nomor, dan logo, tanpa minimal order.",
      url: `${url}/promo-bulan-ini`,
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: "Promo Kemerdekaan — TNT SPORT",
      description: "Jersey custom full printing dari 50 ribu. Gratis desain, tanpa minimal order.",
    },
  };
}

export default async function PromoBulanIniPage() {
  const brand = await getBrand();
  const waNumber = brand.whatsappNumber || "628115491117";
  const wa = (msg: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  const waGeneral = wa("Halo TNT SPORT, saya mau tanya promo bulan ini 🎉");
  const waAtasan = wa("Halo TNT SPORT, saya mau pesan *Atasan saja*");
  const waSetelan = wa("Halo TNT SPORT, saya mau pesan *Jersey Setelan*");
  const waPenawaran = wa("Halo TNT SPORT, saya mau penawaran khusus partai besar");
  const waKlaim = wa("Halo TNT SPORT, saya mau klaim promo *Beli 6 Gratis 1*");
  const waKonsultasi = wa("Halo TNT SPORT, saya mau mulai konsultasi jersey custom");

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
      `}</style>

      {/* TOP BAR */}
      <div className="bg-[#ef233c] py-2.5 text-center text-[11px] font-bold uppercase tracking-[.18em] text-white sm:text-xs">
        Promo Kemerdekaan · Beli 6 gratis 1 · Berlaku kelipatannya
      </div>

      <PromoNav />

      <main>
        <PageViewTracker page="promo-bulan-ini" />
        {/* HERO */}
        <section id="home" className="relative min-h-[820px] overflow-hidden border-b border-white/10 lg:min-h-[760px]">
          <div className="hero-grid absolute inset-0 opacity-50" />
          <div className="hero-photo pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[490px] lg:left-[40%] lg:right-0 lg:top-0 lg:h-full lg:w-[60%]">
            <Image
              src="/promo/promo-hero.png"
              alt="Model menggunakan jersey custom TNT Sport"
              fill
              priority
              className="object-cover object-top lg:object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent lg:hidden" />
          </div>
          <div className="hero-shade absolute inset-0" />
          <div className="noise pointer-events-none absolute inset-0 opacity-20" />

          <div className="relative z-20 mx-auto flex min-h-[820px] max-w-7xl items-center px-5 pb-[430px] pt-16 lg:min-h-[760px] lg:px-8 lg:pb-24 lg:pt-12">
            <div className="max-w-[42rem] pt-4 lg:pt-0">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-4 py-2 text-[11px] font-bold uppercase tracking-[.16em] backdrop-blur-md sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-[#ef233c] shadow-[0_0_18px_#ef233c]" />
                Langsung dari pabrik
              </div>
              <h1 className="pdisplay max-w-3xl text-[clamp(3.25rem,7vw,6.35rem)] uppercase leading-[.86] text-white">
                Bikin jersey<br />
                <span className="text-[#ef233c]">full printing</span>
                <br />cuma 50 ribu!
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-300 sm:text-lg">
                Custom jersey sesukamu dengan hasil premium. Gratis desain, nama, nomor, dan logo—bahkan
                untuk order satuan.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-zinc-200 sm:text-xs">
                <span className="rounded-full border border-white/15 bg-black/30 px-3 py-2">✓ Free desain</span>
                <span className="rounded-full border border-white/15 bg-black/30 px-3 py-2">✓ Tanpa minimal order</span>
                <span className="rounded-full border border-white/15 bg-black/30 px-3 py-2">✓ Revisi bebas</span>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waAtasan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#ef233c] px-7 py-4 text-sm font-black uppercase tracking-[.08em] shadow-[0_14px_40px_rgba(239,35,60,.28)] transition hover:-translate-y-0.5 hover:bg-red-500"
                >
                  Lihat harga <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={waKonsultasi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 px-7 py-4 text-sm font-bold backdrop-blur transition hover:bg-white hover:text-black"
                >
                  Cara order
                </a>
              </div>
              <div className="mt-8 grid max-w-lg grid-cols-3 rounded-2xl border border-white/15 bg-black/30 px-5 py-4 backdrop-blur-md">
                <div>
                  <strong className="pdisplay block text-2xl sm:text-3xl">350K+</strong>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 sm:text-[11px]">Order selesai</span>
                </div>
                <div className="border-x border-white/15 px-4 sm:px-5">
                  <strong className="pdisplay block text-2xl sm:text-3xl">9K+</strong>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 sm:text-[11px]">Klien puas</span>
                </div>
                <div className="pl-4 sm:pl-5">
                  <strong className="pdisplay block text-2xl sm:text-3xl">4.9</strong>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 sm:text-[11px]">Rating</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 z-10 w-full overflow-hidden border-y border-black/10 bg-white py-3 text-black">
            <div className="ticker flex w-max whitespace-nowrap text-[10px] font-black uppercase tracking-[.18em] sm:text-xs">
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
                  Kenapa TNT Sport?
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
                    <p className="mt-1 text-2xl font-black">65rb<span className="text-sm font-medium text-zinc-500"> /pcs</span></p>
                  </div>
                  <div className="border-l border-black/10 pl-4">
                    <p className="text-xs text-zinc-500">Dozen (12 pcs)</p>
                    <p className="mt-1 text-2xl font-black text-[#ef233c]">50rb<span className="text-sm font-medium text-zinc-500"> /pcs</span></p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  <li>✓ Jersey atasan full printing</li>
                  <li>✓ Full custom desain bebas</li>
                  <li>✓ Nama &amp; nomor punggung</li>
                  <li>✓ Bisa order satuan</li>
                  <li>✓ Proses cepat &amp; tepat waktu</li>
                </ul>
                <a
                  href={waAtasan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-full items-center justify-center rounded-full bg-black px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#ef233c]"
                >
                  Pesan atasan
                </a>
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
                    <p className="mt-1 text-2xl font-black">115rb<span className="text-sm font-medium text-zinc-500"> /pcs</span></p>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <p className="text-xs text-zinc-500">Dozen (12 pcs)</p>
                    <p className="mt-1 text-2xl font-black text-[#ef233c]">110rb<span className="text-sm font-medium text-zinc-500"> /pcs</span></p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                  <li>✓ Jersey atasan + celana</li>
                  <li>✓ Full custom desain bebas</li>
                  <li>✓ Nama, nomor &amp; logo klub</li>
                  <li>✓ Bisa order satuan</li>
                  <li>✓ Proses cepat &amp; tepat waktu</li>
                </ul>
                <a
                  href={waSetelan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-full items-center justify-center rounded-full bg-[#ef233c] px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
                >
                  Pesan setelan
                </a>
              </article>
            </div>
            <div className="mx-auto mt-6 flex max-w-5xl flex-col items-start justify-between gap-5 rounded-2xl border border-white/25 bg-black/15 p-6 sm:flex-row sm:items-center">
              <div>
                <b className="text-lg">Pembelian partai besar?</b>
                <p className="mt-1 text-sm text-white/75">Tersedia penawaran harga khusus yang lebih kompetitif.</p>
              </div>
              <a
                href={waPenawaran}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-black text-black"
              >
                Minta penawaran →
              </a>
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
                  <h2 className="pdisplay mt-5 text-4xl uppercase leading-none sm:text-6xl">Beli 6, gratis 1.</h2>
                  <p className="mt-4 max-w-2xl text-zinc-400">
                    Berlaku kelipatannya: order 6 dapat 7, order 12 dapat 14, order 18 dapat 21. Berlaku untuk atasan maupun setelan.
                  </p>
                </div>
                <a
                  href={waKlaim}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wider text-black"
                >
                  Klaim promo
                </a>
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
              <p className="text-zinc-600">Ribuan tim &amp; komunitas sudah percaya TNT SPORT.</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <figure
                  key={r.name}
                  className={r.dark ? "rounded-[1.5rem] bg-[#101010] p-6 text-white" : "rounded-[1.5rem] bg-[#f4f3ef] p-6"}
                >
                  <div className="text-[#ef233c]">★★★★★</div>
                  <blockquote className={`mt-5 leading-relaxed ${r.dark ? "text-zinc-300" : "text-zinc-700"}`}>
                    "{r.quote}"
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
            <a
              href={waKonsultasi}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-[#ef233c] px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:bg-white hover:text-black"
            >
              Mulai konsultasi
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#09090b] py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <a href="#home" className="flex items-center gap-2.5 text-white" aria-label="TNT Sport">
            <img src={brand.logoPath || "/logo.jpg"} alt="Logo TNT Sport" className="h-12 w-12 object-contain mix-blend-screen" />
            <span className="text-base font-black tracking-[.16em]">TNT SPORT</span>
          </a>
          <p>Jersey custom full printing · Dibuat untuk tampil maksimal.</p>
          <p>© {new Date().getFullYear()} TNT SPORT</p>
        </div>
      </footer>
    </div>
  );
}