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

const STEPS = [
  {
    num: "01",
    title: "Konsultasi via WhatsApp",
    desc: "Ceritakan kebutuhan tim kamu — jumlah, model, warna, dan referensi desain. Tim TNT SPORT akan langsung merespons.",
  },
  {
    num: "02",
    title: "Desain & Revisi",
    desc: "Tim desain membuatkan visual jersey berdasarkan brief kamu. Revisi sampai desain benar-benar sesuai.",
  },
  {
    num: "03",
    title: "Produksi & Quality Check",
    desc: "Setelah desain fix dan pembayaran dikonfirmasi, jersey masuk proses produksi full printing dengan kontrol kualitas ketat.",
  },
  {
    num: "04",
    title: "Pengiriman ke Alamat",
    desc: "Jersey selesai diproduksi, dikemas rapi, dan dikirim ke alamat kamu via ekspedisi ke seluruh Indonesia.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Apa itu jersey custom full printing?",
    a: "Jersey custom full printing adalah jersey yang desainnya dicetak menyeluruh ke bahan menggunakan teknik printing, sehingga warna dan detail grafis bisa lebih bebas dibanding sablon biasa.",
  },
  {
    q: "Jersey custom ini cocok untuk siapa saja?",
    a: "Jersey custom full printing TNT SPORT cocok untuk tim futsal, sepak bola, komunitas, sekolah, perusahaan, maupun event yang butuh seragam khusus dengan desain sendiri.",
  },
  {
    q: "Apakah saya bisa pakai desain sendiri?",
    a: "Bisa. Kamu bisa kirim file desain, atau cukup kirim brief sederhana dan tim desain TNT SPORT akan bantu buatkan desain sesuai arahan kamu.",
  },
  {
    q: "Berapa lama proses pembuatan jersey custom?",
    a: "Estimasi waktu produksi biasanya beberapa hari kerja setelah desain fix dan pembayaran dikonfirmasi. Detail waktunya bisa berbeda tergantung jumlah pesanan dan antrean produksi.",
  },
  {
    q: "Apakah bisa kirim ke luar kota?",
    a: "Bisa. TNT SPORT melayani pengiriman jersey custom ke seluruh Indonesia melalui jasa ekspedisi.",
  },
  {
    q: "Minimal order jersey custom berapa pcs?",
    a: "Untuk info minimal order dan harga terbaru, silakan chat admin TNT SPORT lewat WhatsApp untuk penjelasan lengkap.",
  },
];

const WA_LINK = "https://wa.me/6281234567890?text=Halo%20TNT%20SPORT%2C%20saya%20mau%20tanya%20jersey%20custom";

/* ------------------------------------------------------------------ */
/* Structured Data                                                      */
/* ------------------------------------------------------------------ */

function JsonLd() {
  const brand = "TNT SPORT";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand,
    url: "https://tntsport.id",
    sameAs: [],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                  */
/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="katalog-nav">
      <a href="/" className="katalog-wordmark">TNT SPORT</a>
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="katalog-cta-outline">
        Chat Admin
      </a>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="katalog-hero reveal" style={{ "--i": 0 } as React.CSSProperties}>
      <p className="katalog-hero__label">Jersey Custom Full Printing</p>
      <h1 className="katalog-hero__title">
        Bikin Jersey Custom<br />
        untuk Tim Kamu
      </h1>
      <p className="katalog-hero__sub">
        Desain bebas, bahan nyaman, produksi rapi. Proses order simpel lewat WhatsApp
        untuk tim futsal, sepak bola, komunitas, sekolah, dan event.
      </p>
      <div className="katalog-hero__ctas">
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="katalog-cta-primary">
          Chat Admin &amp; Kirim Desain
        </a>
        <a href="#katalog" className="katalog-cta-secondary">
          Lihat Katalog Model
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Value Props                                                          */
/* ------------------------------------------------------------------ */

function ValueProps() {
  const points = [
    { label: "Full Printing", desc: "Cetak menyeluruh ke bahan. Warna dan grafis lebih detail, lebih bebas dari sablon biasa." },
    { label: "Desain Bebas", desc: "Kirim desain sendiri atau biarkan tim desain kami bantu buatkan dari nol." },
    { label: "Bahan Nyaman", desc: "Material yang breathable dan ringan. Nyaman dipakai dari awal hingga akhir pertandingan." },
    { label: "Produksi Rapi", desc: "Jahitan presisi, cutting konsisten, dan quality check di setiap tahap produksi." },
    { label: "Order Simpel", desc: "Semua proses dari konsultasi sampai pengiriman cukup lewat WhatsApp." },
  ];

  return (
    <section className="katalog-values reveal" style={{ "--i": 1 } as React.CSSProperties}>
      <h2 className="katalog-section-title">Kenapa Jersey Custom di TNT SPORT Beda</h2>
      <div className="katalog-values__grid">
        {points.map((p, i) => (
          <div key={i} className="katalog-value-item">
            <span className="katalog-value-item__label">{p.label}</span>
            <p className="katalog-value-item__desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Catalogue Grid                                                       */
/* ------------------------------------------------------------------ */

function CatalogueGrid() {
  return (
    <section id="katalog" className="katalog-catalogue reveal" style={{ "--i": 2 } as React.CSSProperties}>
      <h2 className="katalog-section-title">Pilih Model Jersey Custom Favoritmu</h2>
      <p className="katalog-section-intro">
        Jelajahi beberapa model jersey custom full printing pilihan TNT SPORT sebagai inspirasi.
        Semua bisa disesuaikan warna, logo, nama, dan sponsor sesuai kebutuhan tim kamu.
      </p>
      <div className="katalog-grid">
        {MODELS.map((m, i) => (
          <article key={i} className="katalog-card">
            <div className="katalog-card__visual">
              <span className="katalog-card__index">{String(i + 1).padStart(2, "0")}</span>
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
                Konsultasi Model Ini
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Order Steps                                                          */
/* ------------------------------------------------------------------ */

function OrderSteps() {
  return (
    <section className="katalog-steps reveal" style={{ "--i": 3 } as React.CSSProperties}>
      <h2 className="katalog-section-title">Cara Pesan Jersey Custom Full Printing di TNT SPORT</h2>
      <ol className="katalog-steps__list">
        {STEPS.map((s, i) => (
          <li key={i} className="katalog-step">
            <span className="katalog-step__num">{s.num}</span>
            <div className="katalog-step__content">
              <h3 className="katalog-step__title">{s.title}</h3>
              <p className="katalog-step__desc">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */

function FAQ() {
  return (
    <section className="katalog-faq reveal" style={{ "--i": 4 } as React.CSSProperties}>
      <h2 className="katalog-section-title">Pertanyaan Seputar Jersey Custom Full Printing</h2>
      <div className="katalog-faq__list">
        {FAQ_ITEMS.map((item, i) => (
          <details key={i} className="katalog-faq-item">
            <summary className="katalog-faq-item__q">{item.q}</summary>
            <p className="katalog-faq-item__a">{item.a}</p>
          </details>
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
    <section className="katalog-cta-section reveal" style={{ "--i": 5 } as React.CSSProperties}>
      <h2 className="katalog-section-title">Siap Bikin Jersey Custom untuk Tim Kamu?</h2>
      <p className="katalog-cta-section__text">
        Kirim ide desain atau foto referensi, dan biarkan TNT SPORT bantu wujudkan
        jersey custom full printing untuk tim kamu.
      </p>
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="katalog-cta-primary">
        Chat Admin TNT SPORT Sekarang
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
        <span className="katalog-footer__copy">Full Printing &middot; Indonesia</span>
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
        <Hero />
        <ValueProps />
        <CatalogueGrid />
        <OrderSteps />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
