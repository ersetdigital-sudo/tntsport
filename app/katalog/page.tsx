import type { Metadata } from "next";
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
}

const MODELS: JerseyModel[] = [
  {
    name: "Striker Neon",
    tag: "Futsal & Sepak Bola",
    desc: "Desain bold dengan aksen neon yang menonjol di lapangan. Cocok untuk tim yang mau tampil mencolok.",
  },
  {
    name: "Street Futsal",
    tag: "Futsal & Komunitas",
    desc: "Grafis street-style yang kasual dan modern. Pas untuk komunitas futsal dan tim kampus.",
  },
  {
    name: "Classic League",
    tag: "Liga & Turnamen",
    desc: "Desain clean dan profesional untuk pertandingan resmi. Elegan di lapangan, rapi di foto tim.",
  },
  {
    name: "Training Squad",
    tag: "Latihan & Sekolah",
    desc: "Simpel, nyaman, dan tahan cuci berulang. Dirancang untuk pemakaian harian.",
  },
  {
    name: "Retro 90s",
    tag: "Koleksi & Event",
    desc: "Nostalgia era 90-an dengan warna-warna berani. Cocok untuk event, reunian, atau tim yang suka gaya klasik.",
  },
  {
    name: "Tournament Pro",
    tag: "Turnamen Profesional",
    desc: "Konstruksi premium untuk pertandingan intens. Bahan cepat kering, jahitan rapi, detail presisi.",
  },
];

const WA_LINK =
  "https://wa.me/6281234567890?text=Halo%20TNT%20SPORT%2C%20saya%20mau%20tanya%20jersey%20custom";

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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                  */
/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="katalog-nav">
      <a href="/" className="katalog-wordmark">
        TNT SPORT
      </a>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="katalog-cta-outline"
      >
        Chat Admin
      </a>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Intro                                                                */
/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <section className="katalog-intro reveal" style={{ "--i": 0 } as React.CSSProperties}>
      <p className="katalog-intro__label">Katalog Model Jersey</p>
      <h1 className="katalog-intro__title">
        Inspirasi Jersey Custom<br />
        Full Printing
      </h1>
      <p className="katalog-intro__sub">
        Kumpulan model jersey custom TNT SPORT sebagai inspirasi untuk tim kamu.
        Semua bisa disesuaikan — warna, logo, nama, dan sponsor. Mau pakai desain
        sendiri juga bisa.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Catalogue Grid                                                       */
/* ------------------------------------------------------------------ */

function CatalogueGrid() {
  return (
    <section id="katalog" className="katalog-catalogue reveal" style={{ "--i": 1 } as React.CSSProperties}>
      <div className="katalog-grid">
        {MODELS.map((m, i) => (
          <article key={i} className="katalog-card">
            <div className="katalog-card__visual">
              <span className="katalog-card__index">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="katalog-card__body">
              <span className="katalog-card__tag">{m.tag}</span>
              <h3 className="katalog-card__name">{m.name}</h3>
              <p className="katalog-card__desc">{m.desc}</p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="katalog-card__link"
              >
                Konsultasi Model Ini →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA                                                                  */
/* ------------------------------------------------------------------ */

function CTASection() {
  return (
    <section className="katalog-cta-section reveal" style={{ "--i": 2 } as React.CSSProperties}>
      <h2 className="katalog-section-title">
        Mau Bikin Jersey Custom untuk Tim Kamu?
      </h2>
      <p className="katalog-cta-section__text">
        Chat admin TNT SPORT sekarang untuk konsultasi desain. Kirim ide, foto
        referensi, atau brief sederhana — tim desain kami bantu wujudkan jersey
        custom full printing untuk tim kamu.
      </p>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="katalog-cta-primary"
      >
        Chat Admin & Konsultasi Desain
      </a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="katalog-footer">
      <p className="katalog-footer__line">Jersey custom, dibuat untuk tim kamu.</p>
      <div className="katalog-footer__meta">
        <span className="katalog-wordmark katalog-wordmark--sm">TNT SPORT</span>
        <span className="katalog-footer__copy">
          Full Printing &middot; Indonesia
        </span>
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
      <Nav />
      <main>
        <Intro />
        <CatalogueGrid />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}