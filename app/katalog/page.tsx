import type { Metadata } from "next";
import Image from "next/image";
import { getBrand } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  return {
    title: "Katalog Jersey Custom Full Printing",
    description:
      "Jelajahi model jersey custom full printing TNT SPORT untuk tim futsal, sepak bola, komunitas, sekolah, dan event. Desain bebas, bahan nyaman, produksi rapi.",
    alternates: { canonical: "/katalog" },
    openGraph: {
      title: `Katalog Jersey Custom Full Printing · ${brand.name}`,
      description:
        "Pilih model jersey custom favoritmu. Full printing, desain bebas, proses order simpel lewat WhatsApp.",
      url: `${brand.url ?? ""}/katalog`,
      type: "website",
      locale: "id_ID",
    },
  };
}

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

interface JerseyModel {
  name: string;
  tag: string;
  desc: string;
  accent: string;
}

const MODELS: JerseyModel[] = [
  {
    name: "Striker Neon",
    tag: "Futsal & Sepak Bola",
    desc: "Desain bold dengan aksen neon yang menonjol di lapangan. Cocok untuk tim yang mau tampil mencolok.",
    accent: "var(--k-accent)",
  },
  {
    name: "Street Futsal",
    tag: "Futsal & Komunitas",
    desc: "Grafis street-style yang kasual dan modern. Pas untuk komunitas futsal dan tim kampus.",
    accent: "#e600ff",
  },
  {
    name: "Classic League",
    tag: "Liga & Turnamen",
    desc: "Desain clean dan profesional untuk pertandingan resmi. Elegan di lapangan, rapi di foto tim.",
    accent: "#55beff",
  },
  {
    name: "Training Squad",
    tag: "Latihan & Sekolah",
    desc: "Simpel, nyaman, dan tahan cuci berulang. Dirancang untuk pemakaian harian.",
    accent: "#f59e0b",
  },
  {
    name: "Retro 90s",
    tag: "Koleksi & Event",
    desc: "Nostalgia era 90-an dengan warna-warna berani. Cocok untuk event, reunian, atau tim yang suka gaya klasik.",
    accent: "#f36458",
  },
  {
    name: "Tournament Pro",
    tag: "Turnamen Profesional",
    desc: "Konstruksi premium untuk pertandingan intens. Bahan cepat kering, jahitan rapi, detail presisi.",
    accent: "var(--k-accent)",
  },
];

const WA_LINK =
  "https://wa.me/6281234567890?text=Halo%20TNT%20SPORT%2C%20saya%20mau%20tanya%20jersey%20custom";

const STEPS = [
  {
    num: "01",
    title: "Konsultasi",
    desc: "Chat admin, kirim referensi desain, dan diskusi kebutuhan tim kamu.",
  },
  {
    num: "02",
    title: "Desain",
    desc: "Tim desain TNT SPORT buatkan mockup jersey sesuai brief kamu.",
  },
  {
    num: "03",
    title: "Produksi",
    desc: "Setelah approve, jersey diproduksi full printing dan dikirim ke alamat.",
  },
];

const FEATURES = [
  {
    icon: "01",
    title: "Full Printing",
    desc: "Seluruh permukaan jersey dicetak penuh tanpa batasan warna atau gradasi.",
  },
  {
    icon: "02",
    title: "Desain Bebas",
    desc: "Mau pakai desain sendiri atau dibuatkan tim kami — semua bisa.",
  },
  {
    icon: "03",
    title: "Bahan Premium",
    desc: "Dry-fit, breathable, dan tahan cuci berulang. Nyaman dipakai seharian.",
  },
  {
    icon: "04",
    title: "Proses Cepat",
    desc: "Produksi 5–7 hari kerja. Untuk urgent, tersedia layanan ekspres.",
  },
  {
    icon: "05",
    title: "Harga Transparan",
    desc: "Tidak ada biaya tersembunyi. Harga sudah termasuk desain dan revisi.",
  },
  {
    icon: "06",
    title: "Garansi Kualitas",
    desc: "Jersey cacat produksi? Kami ganti baru tanpa biaya tambahan.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Jersey tim futsal kami hasilnya luar biasa. Teman-teman pada puas, bahkan lawan tanya beli di mana.",
    name: "Rizky Pratama",
    role: "Kapten Tim Futsal Garuda",
    rating: 5,
  },
  {
    quote:
      "Prosesnya cepat dan adminnya sabar banget revisi desain sampai cocok. Harga juga fair.",
    name: "Dewi Lestari",
    role: "Manajer Komunitas Runner ID",
    rating: 5,
  },
  {
    quote:
      "Sudah 3x order di TNT SPORT. Kualitas konsisten, pengiriman tepat waktu. Recommended!",
    name: "Ahmad Fauzi",
    role: "Guru Olahraga SMPN 12",
    rating: 5,
  },
];

const MARQUEE_TEAMS = [
  "FC GARUDA",
  "RUNNER ID",
  "SMPN 12",
  "FUTSAL KAMPUS",
  "KOMUNITAS SEPEDA",
  "TIM VOLI NUSANTARA",
  "JERSEY EVENT 2025",
  "LIGA FUTSAL INDONESIA",
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
    sameAs: [],
  };
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Jersey Custom Full Printing TNT SPORT",
    description:
      "Jersey custom full printing untuk tim futsal, sepak bola, komunitas, dan event. Desain bebas, bahan premium, proses cepat.",
    brand: { "@type": "Brand", name: "TNT SPORT" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
    },
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
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Icons (inline SVG)                                                   */
/* ------------------------------------------------------------------ */

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.27 3.48 11.85l.67-3.93L1.3 5.14l3.94-.57L7 1z"
        fill={filled ? "var(--k-accent)" : "none"}
        stroke="var(--k-accent)"
        strokeWidth="1"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */

function Navbar() {
  return (
    <header className="ks-nav">
      <div className="ks-nav__inner">
        <a href="/" className="ks-nav__logo">
          <span className="ks-nav__logo-img">
            <Image
              src="/logo.jpg"
              alt="TNT SPORT logo"
              width={36}
              height={36}
              className="h-full w-full rounded-full object-cover"
              priority
            />
          </span>
          TNT SPORT
        </a>
        <nav className="ks-nav__links" aria-label="Navigasi utama">
          <a href="#katalog" className="ks-nav__link">
            Katalog
          </a>
          <a href="#keunggulan" className="ks-nav__link">
            Keunggulan
          </a>
          <a href="#proses" className="ks-nav__link">
            Proses
          </a>
          <a href="#testimoni" className="ks-nav__link">
            Testimoni
          </a>
        </nav>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="ks-nav__cta"
        >
          <WhatsAppIcon />
          Chat Admin
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero Split                                                           */
/* ------------------------------------------------------------------ */

function HeroSplit() {
  return (
    <section className="ks-hero">
      <div className="ks-hero__grid">
        {/* Left: Content */}
        <div className="ks-hero__content">
          <span className="ks-badge">JERSEY CUSTOM</span>
          <h1 className="ks-hero__title">
            Desain Jersey
            <br />
            Impian Tim Kamu
          </h1>
          <p className="ks-hero__desc">
            Jersey custom full printing untuk tim futsal, sepak bola, komunitas,
            sekolah, dan event. Desain bebas, bahan premium, proses cepat.
          </p>
          <div className="ks-hero__actions">
            <a href="#katalog" className="ks-btn-primary">
              Lihat Katalog
              <ChevronRight />
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="ks-btn-outline"
            >
              Chat Admin
            </a>
          </div>
          <div className="ks-hero__proof">
            <div className="ks-hero__avatars">
              <span className="ks-hero__avatar" style={{ background: "var(--k-accent)" }}>
                RP
              </span>
              <span className="ks-hero__avatar" style={{ background: "#e600ff" }}>
                DL
              </span>
              <span className="ks-hero__avatar" style={{ background: "#55beff" }}>
                AF
              </span>
            </div>
            <p className="ks-hero__proof-text">
              Dipercaya <strong>500+</strong> tim di seluruh Indonesia
            </p>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="ks-hero__visual">
          <div className="ks-hero__mockup">
            <div className="ks-hero__mockup-bar">
              <span className="ks-hero__dot ks-hero__dot--red" />
              <span className="ks-hero__dot ks-hero__dot--gold" />
              <span className="ks-hero__dot ks-hero__dot--green" />
              <span className="ks-hero__mockup-url">tntsport.id/katalog</span>
            </div>
            <div className="ks-hero__mockup-body">
              <div className="ks-hero__mockup-stats">
                <div className="ks-hero__mockup-stat">
                  <span className="ks-hero__mockup-stat-num">500+</span>
                  <span className="ks-hero__mockup-stat-label">Tim Dilayani</span>
                </div>
                <div className="ks-hero__mockup-stat">
                  <span className="ks-hero__mockup-stat-num">4.9</span>
                  <span className="ks-hero__mockup-stat-label">Rating</span>
                </div>
              </div>
              <div className="ks-hero__mockup-jersey">
                <div className="ks-hero__jersey-img">
                  <Image
                    src="/jersey-transparent.png"
                    alt="Jersey custom TNT SPORT"
                    width={200}
                    height={200}
                    className="h-auto w-full object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="ks-hero__mockup-tags">
                <span className="ks-hero__mockup-tag">Full Printing</span>
                <span className="ks-hero__mockup-tag">Custom Design</span>
                <span className="ks-hero__mockup-tag">Premium Fabric</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                              */
/* ------------------------------------------------------------------ */

function Marquee() {
  const items = [...MARQUEE_TEAMS, ...MARQUEE_TEAMS];
  return (
    <div className="ks-marquee" aria-hidden>
      <div className="ks-marquee__track">
        {items.map((t, i) => (
          <span key={i} className="ks-marquee__item">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Comparison                                                           */
/* ------------------------------------------------------------------ */

function Comparison() {
  return (
    <section className="ks-comparison">
      <div className="ks-comparison__inner">
        <h2 className="ks-section-title">Kenapa Pilih TNT SPORT?</h2>
        <div className="ks-comparison__grid">
          <div className="ks-comparison__card ks-comparison__card--problem">
            <span className="ks-comparison__badge ks-comparison__badge--problem">
              Order Manual
            </span>
            <ul className="ks-comparison__list">
              <li>Desain terbatas, tidak bisa request bebas</li>
              <li>Bahan tipis, gampang rusak setelah beberapa kali cuci</li>
              <li>Proses lama, tidak ada kejelasan timeline</li>
              <li>Harga tidak transparan, banyak biaya tambahan</li>
            </ul>
          </div>
          <div className="ks-comparison__card ks-comparison__card--solution">
            <span className="ks-comparison__badge ks-comparison__badge--solution">
              Dengan TNT SPORT
            </span>
            <ul className="ks-comparison__list">
              <li>Desain bebas — request sendiri atau dibuatkan</li>
              <li>Bahan premium dry-fit, tahan cuci berulang</li>
              <li>Proses 5–7 hari, update progress real-time</li>
              <li>Harga flat, sudah termasuk desain dan revisi</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Features                                                             */
/* ------------------------------------------------------------------ */

function Features() {
  return (
    <section id="keunggulan" className="ks-features">
      <div className="ks-features__inner">
        <h2 className="ks-section-title">Keunggulan Kami</h2>
        <p className="ks-section-sub">
          Setiap jersey dibuat dengan standar kualitas tinggi dan perhatian pada detail.
        </p>
        <div className="ks-features__grid">
          {FEATURES.map((f, i) => (
            <article key={i} className="ks-feature-card">
              <span className="ks-feature-card__icon">{f.icon}</span>
              <h3 className="ks-feature-card__title">{f.title}</h3>
              <p className="ks-feature-card__desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How It Works                                                         */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  return (
    <section id="proses" className="ks-hiw">
      <div className="ks-hiw__inner">
        <h2 className="ks-section-title ks-section-title--light">
          Cara Order di TNT SPORT
        </h2>
        <div className="ks-hiw__grid">
          {STEPS.map((s, i) => (
            <article key={i} className="ks-step">
              <span className="ks-step__num">{s.num}</span>
              <h3 className="ks-step__title">{s.title}</h3>
              <p className="ks-step__desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Katalog Grid                                                         */
/* ------------------------------------------------------------------ */

function KatalogGrid() {
  return (
    <section id="katalog" className="ks-katalog">
      <div className="ks-katalog__inner">
        <h2 className="ks-section-title">Model Jersey Kami</h2>
        <p className="ks-section-sub">
          Pilih model sebagai inspirasi. Semua bisa disesuaikan — warna, logo, nama, dan sponsor.
        </p>
        <div className="ks-katalog__grid">
          {MODELS.map((m, i) => (
            <article key={i} className="ks-kard">
              <div className="ks-kard__visual" style={{ borderColor: m.accent }}>
                <span className="ks-kard__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="ks-kard__jersey" style={{ color: m.accent }}>
                  <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35 25L22 35L16 65L30 68V120H90V68L104 65L98 35L85 25H78L68 35H52L42 25H35Z" fill="currentColor" opacity="0.85" />
                    <path d="M35 25L22 35L16 65L30 68V120H90V68L104 65L98 35L85 25H78L68 35H52L42 25H35Z" stroke="var(--k-ink)" strokeWidth="0.8" opacity="0.4" />
                  </svg>
                </div>
              </div>
              <div className="ks-kard__body">
                <span className="ks-kard__tag">{m.tag}</span>
                <h3 className="ks-kard__name">{m.name}</h3>
                <p className="ks-kard__desc">{m.desc}</p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ks-kard__link"
                >
                  Konsultasi Model Ini <ChevronRight />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Bento Grid                                                           */
/* ------------------------------------------------------------------ */

function BentoGrid() {
  return (
    <section className="ks-bento">
      <div className="ks-bento__inner">
        <h2 className="ks-section-title">Untuk Siapa Saja</h2>
        <div className="ks-bento__grid">
          <article className="ks-bento__card ks-bento__card--primary">
            <span className="ks-bento__badge">Tim Olahraga</span>
            <h3 className="ks-bento__title">Futsal, Sepak Bola, Voli</h3>
            <p className="ks-bento__desc">
              Jersey tim dengan nama dan nomor punggung. Cocok untuk liga, turnamen, atau latihan rutin.
            </p>
          </article>
          <article className="ks-bento__card ks-bento__card--secondary">
            <span className="ks-bento__badge">Komunitas</span>
            <h3 className="ks-bento__title">Runner, Sepeda, Event</h3>
            <p className="ks-bento__desc">
              Jersey komunitas untuk event, gathering, atau identitas grup. Desain unik, harga ramah.
            </p>
          </article>
          <article className="ks-bento__card ks-bento__card--outline">
            <span className="ks-bento__badge">Sekolah & Kampus</span>
            <h3 className="ks-bento__title">Olahraga, Paskibra, Ekstrakurikuler</h3>
            <p className="ks-bento__desc">
              Jersey untuk kegiatan sekolah dan kampus. Tahan cuci, nyaman dipakai, dan harga terjangkau.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                         */
/* ------------------------------------------------------------------ */

function Testimonials() {
  return (
    <section id="testimoni" className="ks-testi">
      <div className="ks-testi__inner">
        <h2 className="ks-section-title">Kata Mereka</h2>
        <div className="ks-testi__grid">
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="ks-testi__card">
              <div className="ks-testi__stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <StarIcon key={j} filled />
                ))}
              </div>
              <blockquote className="ks-testi__quote">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="ks-testi__author">
                <span
                  className="ks-testi__avatar"
                  style={{
                    background:
                      i === 0
                        ? "var(--k-accent)"
                        : i === 1
                          ? "#e600ff"
                          : "#55beff",
                  }}
                >
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div>
                  <p className="ks-testi__name">{t.name}</p>
                  <p className="ks-testi__role">{t.role}</p>
                </div>
              </div>
            </article>
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
    <section className="ks-cta">
      <div className="ks-cta__inner">
        <h2 className="ks-cta__title">
          Siap Bikin Jersey Custom untuk Tim Kamu?
        </h2>
        <p className="ks-cta__desc">
          Chat admin TNT SPORT sekarang. Kirim ide, foto referensi, atau brief
          sederhana — tim desain kami bantu wujudkan.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="ks-btn-primary ks-btn-primary--lg"
        >
          <WhatsAppIcon />
          Chat Admin & Konsultasi Desain
        </a>
        <p className="ks-cta__note">Gratis konsultasi &middot; Revisi desain sampai cocok</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="ks-footer">
      <div className="ks-footer__inner">
        <div className="ks-footer__brand">
          <span className="ks-footer__logo">
            <span className="ks-footer__logo-img">
              <Image
                src="/logo.jpg"
                alt="TNT SPORT logo"
                width={28}
                height={28}
                className="h-full w-full rounded-full object-cover"
              />
            </span>
            TNT SPORT
          </span>
          <p className="ks-footer__tagline">
            Jersey custom full printing untuk tim kamu.
          </p>
        </div>
        <div className="ks-footer__links">
          <div className="ks-footer__col">
            <h4 className="ks-footer__heading">Navigasi</h4>
            <a href="#katalog" className="ks-footer__link">Katalog</a>
            <a href="#keunggulan" className="ks-footer__link">Keunggulan</a>
            <a href="#proses" className="ks-footer__link">Proses Order</a>
            <a href="#testimoni" className="ks-footer__link">Testimoni</a>
          </div>
          <div className="ks-footer__col">
            <h4 className="ks-footer__heading">Layanan</h4>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ks-footer__link">
              Chat Admin
            </a>
            <a href="/katalog" className="ks-footer__link">Katalog Model</a>
          </div>
        </div>
        <div className="ks-footer__bottom">
          <span className="ks-footer__copy">
            TNT SPORT &middot; Full Printing &middot; Indonesia
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function KatalogPage() {
  return (
    <div className="katalog-page">
      <JsonLd />
      <Navbar />
      <main>
        <HeroSplit />
        <Marquee />
        <Comparison />
        <Features />
        <HowItWorks />
        <KatalogGrid />
        <BentoGrid />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
