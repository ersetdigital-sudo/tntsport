import type { Metadata } from "next";
import Image from "next/image";
import { PromoCountdown } from "@/components/PromoCountdown";
import { getBrand } from "@/lib/queries";

export const dynamic = "force-dynamic";

const DESIGNS = Array.from({ length: 20 }, (_, i) => i + 1);

const FEATURES = [
  {
    emoji: "❄️",
    title: "Adem & Nyaman",
    desc: "Bahan ringan, menyerap keringat, dan nyaman untuk aktivitas fisik intens.",
  },
  {
    emoji: "🎨",
    title: "Free Custom Design",
    desc: "Tim desainer siap mewujudkan ide jersey dengan revisi tanpa batas.",
  },
  {
    emoji: "🧵",
    title: "Jahitan Kuat & Rapi",
    desc: "Dijahit presisi dengan mesin modern agar awet untuk jangka panjang.",
  },
  {
    emoji: "⚡",
    title: "Cepat & Tepat",
    desc: "Produksi terjadwal, cocok untuk turnamen mendadak.",
  },
];

const INFO_CARDS = [
  { title: "Mesin teknologi tinggi", desc: "Hasil print konsisten dan presisi." },
  { title: "Tinta bersertifikat", desc: "Tajam, cerah, dan tidak mudah pudar." },
  { title: "Pelayanan profesional", desc: "Didampingi dari konsultasi sampai kirim." },
];

const CATEGORIES = [
  { label: "⚽ Sepak Bola / Futsal", active: true },
  { label: "🏐 Volly Ball", active: false },
  { label: "🏀 Basket", active: false },
  { label: "🎣 Mancing", active: false },
  { label: "🏁 Racing", active: false },
  { label: "🏃 Running", active: false },
  { label: "🎖️ Army", active: false },
  { label: "🏸 Badminton", active: false },
  { label: "🎽 Fantasy Club", active: false },
  { label: "🏢 Instansi/Corporate", active: false },
];

const PRICING = [
  {
    label: "Jersey atasan",
    title: "Atasan Saja",
    price: "Rp50rb",
    unit: "/pcs",
    minOrder: "Minimal pembelian 12 pcs / set",
    features: ["Full printing & desain bebas", "Nama dan nomor punggung", "Revisi desain tanpa batas"],
  },
  {
    label: "Atasan + celana",
    title: "Jersey Setelan",
    price: "Rp110rb",
    unit: "/set",
    minOrder: "Minimal pembelian 12 pcs / set",
    features: ["Semua benefit paket atasan", "Celana full custom siap tanding", "Prioritas jadwal produksi"],
    featured: true,
  },
];

const STEPS = [
  { num: "01", title: "Chat Admin", desc: "Ceritakan kebutuhan jersey kamu." },
  { num: "02", title: "Desain", desc: "Kami buatkan mockup sesuai brief." },
  { num: "03", title: "ACC & DP", desc: "Setujui desain dan DP 50%." },
  { num: "04", title: "Produksi", desc: "Dikerjakan cepat di pabrik kami." },
  { num: "05", title: "Kirim", desc: "Dikemas aman, jersey dipakai segera!" },
];

const TESTIMONIALS = [
  { quote: "Design mantap. Tadinya belum ada ide sama sekali, tapi tim desainya keren dan mau bantu." },
  { quote: "Sudah 3x order jersey padel. Kualitas konsisten, jahatan kuat, bahan adem dan CS fast response." },
  { quote: "1500 pcs dikebut satu minggu, hasil pulasan oke dan event berjalan sesuai harapan." },
];

const FAQS = [
  {
    q: "Apakah ada minimal order?",
    a: "Tidak ada. Kamu bisa order satuan. Untuk order 6 pcs, dapat bonus 1 pcs gratis dan berlaku kelipatannya.",
  },
  {
    q: "Berapa lama proses produksi?",
    a: "Produksi dimulai setelah desain disetujui dan DP masuk. Jadwal disepakati bersama sesuai kebutuhanmu.",
  },
  {
    q: "Apakah bisa request desain sendiri?",
    a: "Bisa. Kirim referensi desain, logo, atau gambar. Desainer akan bantu dan ada revisi gratis.",
  },
  {
    q: "Bahan jersey apa saja yang tersedia?",
    a: "Ada Dryfit, Milano, Emboss, Jacquard, dll — lengkap di halaman katalog bahan.",
  },
];

function waUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const url = brand.url || "https://www.tntsportapparel.id";
  return {
    title: "Promo Bulan Ini — TNT SPORT",
    description:
      "Promo jersey custom bulan ini dari TNT SPORT. Gratis desain, nama, nomor & logo. Tanpa minimal order, revisi bebas.",
    alternates: { canonical: "/promo-bulan-ini" },
    openGraph: {
      title: "Promo Bulan Ini — TNT SPORT",
      description:
        "Promo jersey custom bohongnya. Gratis desain, nama, nomor & logo. Tanpa minimal order, revisi bebas.",
      url: `${url}/promo-bulan-ini`,
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: "Promo Bulan Ini — TNT SPORT",
      description: "Promo jersey custom bulan ini. Gratis desain, tanpa minimal order.",
    },
  };
}

export default async function PromoBulanIniPage() {
  const brand = await getBrand();
  const waNumber = brand.whatsappNumber || "628115491117";
  const generalMessage = "Halo TNT SPORT, saya mau tanya promo bulan ini 🎉";
  const generalWa = waUrl(waNumber, generalMessage);

  return (
    <div className="bg-[#0a0a0b] font-sans text-[#f7f7f7] antialiased">
      <style>{`
        @keyframes promo-scroll { to { transform: translateX(-50%); } }
        .promo-marquee { animation: promo-scroll 26s linear infinite; }
        .promo-grad {
          background: linear-gradient(100deg, #ff3b2f, #ff7a18);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .promo-glow { box-shadow: 0 0 0 1px rgba(255,59,47,.35), 0 20px 60px -20px rgba(255,59,47,.6); }
        .promo-card-hover { transition: transform .35s cubic-bezier(.2,.7,.2,1), border-color .35s, box-shadow .35s; }
        .promo-card-hover:hover { transform: translateY(-6px); border-color: rgba(255,122,24,.4); box-shadow: 0 30px 60px -30px rgba(0,0,0,.8); }
      `}</style>

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-5">
          <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#ff3b2f] to-[#ff7a18] text-lg font-black text-black">
                T
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                TNT<span className="font-medium text-white/50">Sport</span>
              </span>
            </a>
            <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
              <a href="#katalog" className="transition hover:text-white">Katalog</a>
              <a href="#harga" className="transition hover:text-white">Harga</a>
              <a href="#cara-order" className="transition hover:text-white">Cara Order</a>
              <a href="#faq" className="transition hover:text-white">FAQ</a>
            </div>
            <a
              href={waUrl(waNumber, generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ff3b2f] hover:text-white"
            >
              Pesan Sekarang
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,.06) 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#ff3b2f] opacity-20 blur-[120px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff7a18]" /> Langsung dari pabrik
              </span>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Bikin Jersey <span className="promo-grad">Full Printing</span> Cuma 50 Ribu!
              </h1>
              <p className="mt-5 max-w-lg text-base text-white/60 sm:text-lg">
                Custom jersey sesukamu dengan hasil premium. Gratis desain, nama, nomor dan logo—bahkan
                untuk order satuan.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <span className="flex items-center gap-2 text-white/60"><span className="text-[#ff7a18]">✓</span> Free desain</span>
                <span className="flex items-center gap-2 text-white/60"><span className="text-[#ff7a18]">✓</span> Tanpa minimal order</span>
                <span className="flex items-center gap-2 text-white/60"><span className="text-[#ff7a18]">✓</span> Revisi bebas</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#harga"
                  className="promo-glow rounded-xl bg-gradient-to-r from-[#ff3b2f] to-[#ff7a18] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
                >
                  Lihat Harga ↗
                </a>
                <a
                  href="#cara-order"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold transition hover:bg-white/10"
                >
                  Cara Order
                </a>
              </div>
              <div className="mt-10 flex gap-8 border-t border-white/10 pt-6">
                <div><div className="text-2xl font-black">350K+</div><div className="text-xs text-white/60">Order selesai</div></div>
                <div><div className="text-2xl font-black">9K+</div><div className="text-xs text-white/60">Klien puas</div></div>
                <div><div className="text-2xl font-black">4.9 <span className="text-[#ff7a18]">★</span></div><div className="text-xs text-white/60">Rating</div></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -rotate-3 rounded-[2rem] bg-gradient-to-br from-[#ff3b2f]/30 to-[#ff7a18]/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#161619]">
                <Image
                  src="/promo/promo-hero.png"
                  alt="Jersey custom TNT Sport — Promo Bulan Ini"
                  width={1200}
                  height={1200}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="overflow-hidden border-y border-white/10 bg-[#111114] py-4">
          <div className="promo-marquee flex w-max gap-8 text-sm font-semibold uppercase tracking-widest text-white/60">
            {[0, 1].map((dup) => (
              <span key={dup} className="flex gap-8">
                <span>Gratis Desain</span><span className="text-[#ff3b2f]">•</span><span>Revisi Tanpa Batas</span><span className="text-[#ff3b2f]">•</span><span>Tanpa Minimal Order</span><span className="text-[#ff3b2f]">•</span><span>Beli 6 Gratis 1</span><span className="text-[#ff3b2f]">•</span><span>Produksi Cepat</span><span className="text-[#ff3b2f]">•</span>
              </span>
            ))}
          </div>
        </section>

        {/* FLASH SALE */}
        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="relative overflow-hidden rounded-3xl border border-[#ff3b2f]/30 bg-gradient-to-br from-[#1a0d0b] to-[#0a0a0b] p-8 md:p-12">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#ff3b2f]/20 blur-3xl" />
            <div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-between">
              <div className="text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#ff7a18]">⚡ Flash Sale</span>
                <h2 className="mt-2 text-3xl font-black md:text-4xl">Beli 6 Gratis 1</h2>
                <p className="mt-1 text-white/60">Berlaku kelipatan • atasan maupun setelan</p>
              </div>
              <PromoCountdown storageKey="tnt_promo_bulan_flash" />
              <a
                href={waUrl(waNumber, "Halo TNT SPORT, saya mau klaim promo Flash Sale promo bulan ini")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-[#ff3b2f] hover:text-white"
              >
                Klaim Sekarang
              </a>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff7a18]">Kenapa TNT Sport?</span>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">Dibuat untuk tim yang mau tampil maksimal.</h2>
            <p className="mt-3 text-white/60">
              Dari konsultasi desain sampai pengiriman, semua dikerjakan tim profesional dengan material pilihan.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="promo-card-hover rounded-2xl border border-white/10 bg-[#161619] p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-[#ff3b2f]/15 text-xl">{f.emoji}</div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/60">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {INFO_CARDS.map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/10 bg-[#111114] p-5">
                <div className="font-bold">{card.title}</div>
                <p className="mt-1 text-sm text-white/60">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff7a18]">Jersey untuk semua</span>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">Satu tim. Karakter tanpa batas.</h2>
            <p className="mt-3 text-white/60">Kirim referensi, logo, atau warna tim. Kami bantu ubah jadi desain jersey yang siap diproduksi.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <span
                key={c.label}
                className={
                  c.active
                    ? "rounded-full border border-[#ff3b2f]/40 bg-[#ff3b2f]/10 px-4 py-2 text-sm font-semibold"
                    : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60"
                }
              >
                {c.label}
              </span>
            ))}
          </div>
        </section>

        {/* CATALOG */}
        <section id="katalog" className="mx-auto max-w-7xl px-5 py-16 scroll-mt-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black md:text-4xl">Sepak Bola / Futsal</h2>
              <p className="mt-1 text-white/60">20 desain siap pakai — klik untuk pesan.</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/60">20 desain tersedia</span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {DESIGNS.map((i) => {
              const name = `TNT-${String(i).padStart(2, "0")}`;
              const href = waUrl(
                waNumber,
                `Halo TNT SPORT, saya tertarik dengan desain *${name}* di kategori *Sepak Bola / Futsal*`
              );
              return (
                <div key={name} className="promo-card-hover group overflow-hidden rounded-2xl border border-white/10 bg-[#161619]">
                  <div className="relative aspect-square overflow-hidden bg-black/40">
                    <Image
                      src={`/promo/promo-${i}.jpg`}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                      {name}
                    </span>
                  </div>
                  <div className="p-3">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg bg-gradient-to-r from-[#ff3b2f] to-[#ff7a18] py-2 text-center text-xs font-bold transition hover:brightness-110"
                    >
                      Pilih Desain Ini
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-white/60">
            Cuma sedikit preview —{" "}
            <a href={generalWa} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ff7a18] hover:underline">
              minta katalog lengkap via WhatsApp ↗
            </a>
          </p>
        </section>

        {/* PRICING */}
        <section id="harga" className="mx-auto max-w-6xl px-5 py-16 scroll-mt-24">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff7a18]">Harga transparan</span>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Pilih paket timmu</h2>
            <p className="mt-3 text-white/60">Pilih jumlah pembelian, harga menyesuaikan otomatis.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {PRICING.map((p) => (
              <div
                key={p.title}
                className={
                  "promo-card-hover relative rounded-3xl border p-8 " +
                  (p.featured
                    ? "border-[#ff3b2f]/40 bg-gradient-to-br from-[#1a0d0b] to-[#161619] promo-glow"
                    : "border-white/10 bg-[#161619]")
                }
              >
                {p.featured && (
                  <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-[#ff3b2f] to-[#ff7a18] px-3 py-1 text-xs font-bold">
                    Paling diminati
                  </span>
                )}
                <div className="text-xs font-semibold uppercase tracking-widest text-white/60">{p.label}</div>
                <h3 className="mt-2 text-2xl font-black">{p.title}</h3>
                <div className="mt-5 flex items-end gap-1">
                  <span className={`text-4xl font-black ${p.featured ? "promo-grad" : ""}`}>{p.price}</span>
                  <span className="mb-1 text-white/60">{p.unit}</span>
                </div>
                <p className="mt-1 text-sm text-white/60">{p.minOrder}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><span className="text-[#ff7a18]">✓</span> {f}</li>
                  ))}
                </ul>
                <a
                  href={waUrl(waNumber, `Halo TNT SPORT, saya tertarik paket *${p.title}*.`) }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    "mt-8 block rounded-xl py-3 text-center text-sm font-bold transition " +
                    (p.featured
                      ? "bg-gradient-to-r from-[#ff3b2f] to-[#ff7a18] text-white hover:brightness-110"
                      : "border border-white/15 bg-white/5 font-semibold hover:bg-white/10")
                  }
                >
                  Pilih {p.title} ↗
                </a>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#111114] p-6 md:flex-row">
            <div>
              <div className="font-bold">Butuh lebih dari 50 pcs?</div>
              <p className="text-sm text-white/60">Dapatkan harga proyek khusus untuk komunitas, sekolah, dan event.</p>
            </div>
            <a
              href={waUrl(waNumber, "Halo TNT SPORT, saya mau tanya harga khusus untuk >50 pcs")}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Minta Harga Khusus
            </a>
          </div>
        </section>

        {/* PROMO */}
        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#161619] to-[#111114] p-8 md:grid-cols-2 md:p-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ff7a18]">Promo spesial</span>
              <h2 className="mt-3 text-4xl font-black md:text-5xl">Beli 6, <span className="promo-grad">Gratis 1.</span></h2>
              <p className="mt-3 max-w-md text-white/60">
                Berlaku kelipatannya: order 6 dapat 7, order 12 dapat 14, order 18 dapat 21. Berlaku atasan maupun setelan.
              </p>
              <a
                href={waUrl(waNumber, "Halo TNT SPORT, saya mau klaim promo *Beli 6 Gratis 1*")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-[#ff3b2f] hover:text-white"
              >
                Klaim Promo
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Garansi harga terbaik", "Garansi tepat waktu", "Garansi kualitas jahitan", "Revisi gratis"].map((g) => (
                <div key={g} className="rounded-xl border border-white/10 bg-black/60 p-4 text-sm">
                  <span className="text-[#ff7a18]">✓</span> {g}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section id="cara-order" className="mx-auto max-w-7xl px-5 py-16 scroll-mt-24">
          <div className="mb-12 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff7a18]">Cuma 5 langkah</span>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Cara order—mudah!</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <div key={s.num} className="rounded-2xl border border-white/10 bg-[#161619] p-6">
                <div className="promo-grad text-3xl font-black">{s.num}</div>
                <h3 className="mt-3 font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-12 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff7a18]">Verified buyer</span>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Dipercaya ribuan tim</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="rounded-2xl border border-white/10 bg-[#161619] p-6">
                <div className="text-[#ff7a18]">★★★★★</div>
                <blockquote className="mt-3 text-sm text-white/60">"{t.quote}"</blockquote>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-5 py-16 scroll-mt-24">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff7a18]">FAQ</span>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Yang sering ditanyakan.</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/10 bg-[#161619] p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {f.q}
                  <span className="text-xl text-[#ff7a18] transition-transform duration-250 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff3b2f] to-[#ff7a18] p-10 text-center md:p-16">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(0,0,0,.4) 1px, transparent 0)",
                backgroundSize: "26px 26px",
              }}
            />
            <div className="relative">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">Konsultasi gratis • tanpa syarat</span>
              <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-black text-white md:text-5xl">Siap bikin jersey custom?</h2>
              <p className="mx-auto mt-4 max-w-lg text-white/90">Tim kami siap bantu dari desain sampai pengiriman.</p>
              <a
                href={waUrl(waNumber, generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-7 py-4 text-sm font-bold transition hover:bg-white hover:text-black"
              >
                💬 Chat WhatsApp Sekarang
              </a>
              <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/90">
                <span>✓ Garansi harga</span><span>✓ Garansi jahitan</span><span>✓ Revisi gratis</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#111114]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 md:flex-row">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#ff3b2f] to-[#ff7a18] text-lg font-black text-black">T</span>
            <span className="text-lg font-extrabold">TNT<span className="font-medium text-white/50">Sport</span></span>
          </a>
          <p className="text-sm text-white/60">Promo Bulan Ini • Jersey Custom Full Printing • Langsung dari pabrik</p>
        </div>
      </footer>

      {/* Floating WA */}
      <a
        href={generalWa}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-2xl shadow-lg shadow-black/40 transition hover:scale-110"
        aria-label="Chat WhatsApp"
      >
        💬
      </a>
    </div>
  );
}