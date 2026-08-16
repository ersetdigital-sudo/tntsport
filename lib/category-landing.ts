/**
 * Category landing page configs — copywriting & data per kategori.
 *
 * Setiap kategori punya landing page sendiri (mis. /jersey-futsal) yang
 * dibangun oleh template <CategoryLanding />. Untuk menambah kategori baru:
 * tambahkan satu entry ke CATEGORY_LANDINGS — halaman, SEO, dan sitemap
 * mengikuti otomatis.
 */

export interface LandingFeature {
  icon: "single" | "print" | "design" | "fast" | "sewing";
  title: string;
  desc: string;
}

export interface LandingTestimonial {
  quote: string;
  name: string;
  team: string;
  city: string;
}

export interface LandingFaq {
  q: string;
  a: string;
}

export interface LandingOrderCard {
  badge: string;
  title: string;
  desc: string;
  points: string[];
  footnote?: string;
  cta: string;
  /** anchor internal (mis. "#desain"); tanpa ini CTA menjadi link WA order */
  ctaAnchor?: string;
}

export interface CategoryLandingConfig {
  /** route slug, mis. /jersey-futsal */
  slug: string;
  /** id kategori di katalog (lib/products.ts / Supabase slug) */
  catalogId: string;
  /** label kecil di atas headline hero */
  eyebrow: string;
  /** kata yang di-highlight merah pada headline */
  headline: string[];
  subheadline: string;
  /** teks raksasa outline di belakang hero */
  ghostText: string;
  /** trust bar di bawah hero */
  trustBar: string[];
  /** ticker berjalan di dasar hero */
  ticker: string;
  problem: {
    headline: string;
    body: string;
    features: LandingFeature[];
  };
  catalog: {
    orderLabel: string;
    orderHeadline: string;
    orderSub: string;
    orderCards: LandingOrderCard[];
    orderNote: string;
    designsHeadline: string;
    designsSub: string;
  };
  steps: {
    headline: string;
    sub: string;
    items: { title: string; desc: string }[];
  };
  testimonials: {
    headline: string;
    sub: string;
    fallback: LandingTestimonial[];
  };
  /** rotasi pop-up social proof (nama, kota, produk) */
  purchasePops: { name: string; city: string; product: string }[];
  urgency: {
    headline: string;
    body: string;
    cta: string;
  };
  faqs: LandingFaq[];
  closing: {
    headline: string;
    sub: string;
    cta: string;
  };
  seo: {
    title: string;
    description: string;
  };
  wa: {
    order: string;
    promo: string;
    closing: string;
    /** template pesan WA per desain — "{design}" diganti kode desain saat klik */
    designTemplate: string;
  };
}

export const CATEGORY_LANDINGS: Record<string, CategoryLandingConfig> = {
  football: {
    slug: "jersey-futsal",
    catalogId: "sepak-bola-futsal",
    eyebrow: "Custom Jersey Futsal & Sepak Bola",
    headline: ["Jersey Tim Impian", "Kamu, Jadi Nyata"],
    subheadline:
      "Bahan Dry Fit adem, full printing tajam, desain bebas sesuai selera tim. Cocok buat komunitas, klub, turnamen, sampai kado spesial buat sobat mabar.",
    ghostText: "FUTSAL",
    trustBar: [
      "100+ Tim Sudah Order",
      "Bisa Satuan",
      "Bahan Dry Fit Premium",
      "Packing Aman",
    ],
    ticker:
      "Gratis Desain — Custom Nama, Nomor & Logo — Bisa Satuan — Full Printing Tahan Lama — Beli 12 Gratis 1 — Produksi Cepat — ",
    problem: {
      headline: "Capek Cari Jersey Yang Pas di Hati Tapi Ramah di Kantong?",
      body: "Banyak tim futsal & komunitas bola akhirnya pakai jersey pasaran karena order custom ribet, minimal order banyak, atau hasil sablon gampang pudar. Kami hadir buat jawab semua itu.",
      features: [
        {
          icon: "single",
          title: "Bisa Satuan, Gak Perlu Minimal Order",
          desc: "Mau order 1 pcs buat diri sendiri atau 20 pcs buat satu tim, harga tetap bersahabat.",
        },
        {
          icon: "print",
          title: "Full Printing, Warna Tahan Lama",
          desc: "Teknik cetak digital full printing bikin desain, nama, dan nomor gak gampang luntur meski sering dicuci.",
        },
        {
          icon: "design",
          title: "Desain 100% Sesuai Request",
          desc: 'Kirim logo tim, pilih warna, tentuin gaya — kami wujudkan jadi jersey yang benar-benar punya "identitas" tim kamu.',
        },
      ],
    },
    catalog: {
      orderLabel: "Pilihan order",
      orderHeadline: "Pilih Sesuai Kebutuhan Tim Kamu",
      orderSub:
        "Mau desain full custom buat satu tim, atau cuma butuh 1 pcs buat diri sendiri? Dua-duanya bisa!",
      orderCards: [
        {
          badge: "Min. 6 pcs",
          title: "Custom Desain Full Team",
          desc: "Desain jersey 100% sesuai request — warna, motif, logo tim, sampai gaya sablon, semua bisa disesuaikan biar tim kamu punya identitas sendiri.",
          points: [
            "Bebas request desain dari nol",
            "Cocok buat tim futsal, klub bola, komunitas",
            "Harga makin hemat per pcs kalau order makin banyak",
          ],
          cta: "Konsultasi Desain Tim",
        },
        {
          badge: "1 pcs",
          title: "Order Satuan",
          desc: "Cukup 1 pcs, gak perlu ngajak satu tim. Pilih dari desain katalog yang sudah tersedia, lalu tinggal custom:",
          points: [
            "Nama & Nomor Punggung",
            "Logo Tim",
            "Logo Sponsor",
          ],
          footnote: "Desain dasar mengikuti katalog, bukan custom dari nol.",
          cta: "Pilih Desain Katalog",
          ctaAnchor: "#desain",
        },
      ],
      orderNote:
        "Mau desain benar-benar baru dari nol? Minimal order 6 pcs. Mau cepat & simpel? Order satuan langsung dari katalog yang ada.",
      designsHeadline: "Katalog Desain Jersey Futsal & Bola",
      designsSub: "Klik desain untuk lihat detail & langsung order via WhatsApp.",
    },
    steps: {
      headline: "Order Gampang, Tinggal 4 Langkah",
      sub: "Ceritakan kebutuhanmu, tim kami yang urus sisanya.",
      items: [
        { title: "Pilih Desain", desc: "Browse katalog atau kirim referensi desain sendiri." },
        { title: "Isi Detail", desc: "Nama, nomor, ukuran, dan jumlah pemain." },
        { title: "Konfirmasi & Bayar", desc: "Cek preview desain dulu sebelum produksi." },
        { title: "Jersey Sampai", desc: "Dikirim rapi dengan packing aman sampai tanganmu." },
      ],
    },
    testimonials: {
      headline: "Kata Pelanggan Kami",
      sub: "Ratusan tim & komunitas sudah percaya kualitas jersey kami.",
      fallback: [
        {
          quote:
            "Bahannya adem banget, dipake main futsal 2 jam gak bikin gerah. Desainnya juga persis request tim kami.",
          name: "Rizky",
          team: "Tim Garuda FC",
          city: "Yogyakarta",
        },
        {
          quote:
            "Order 14 pcs buat turnamen kantor, prosesnya cepat dan CS-nya sabar bantu revisi desain. Rekomended!",
          name: "Andhika",
          team: "FC Bintang Timur",
          city: "Sumedang",
        },
        {
          quote:
            "Nomor & nama pemain gak ada yang salah cetak semuanya rapi. Anak-anak tim pada betah main pakai ini.",
          name: "Fajar",
          team: "Squad Sore",
          city: "Bandung",
        },
        {
          quote:
            "Awalnya ragu bisa satuan, ternyata bisa dan harganya masuk akal buat jersey custom seperti ini.",
          name: "Bayu",
          team: "Mabar Community",
          city: "Semarang",
        },
        {
          quote:
            "Warna full printing-nya tajam sampai sekarang, udah sering dicuci juga gak pudar.",
          name: "Ilham",
          team: "Garuda Muda FC",
          city: "Bekasi",
        },
        {
          quote:
            "Packing aman, dikirim tepat waktu sesuai jadwal turnamen. Mantap TNT Sport!",
          name: "Dimas",
          team: "El Cuadro FC",
          city: "Surabaya",
        },
      ],
    },
    purchasePops: [
      { name: "Andri", city: "Sumedang", product: "Jersey Futsal Custom Full Printing" },
      { name: "Rizky", city: "Yogyakarta", product: "Order Satuan Jersey Futsal" },
      { name: "Fajar", city: "Bandung", product: "Jersey Setelan Sepak Bola" },
      { name: "Bayu", city: "Semarang", product: "Jersey Tim Komunitas" },
      { name: "Ilham", city: "Bekasi", product: "Order Satuan Jersey Futsal" },
      { name: "Dimas", city: "Surabaya", product: "Jersey Fantasy Retro" },
    ],
    urgency: {
      headline: "Promo Spesial Buat Tim Yang Order Minggu Ini",
      body: "Order sebelum {deadline} dan dapatkan potongan harga khusus untuk pembelian di atas 10 pcs. Slot produksi terbatas tiap minggunya, buruan amankan sebelum kehabisan!",
      cta: "Klaim Promo Sekarang",
    },
    faqs: [
      {
        q: "Bisa custom nama & nomor sendiri gak?",
        a: "Bisa banget! Tinggal isi form order, kami cetak sesuai request kamu.",
      },
      {
        q: "Berapa lama proses produksinya?",
        a: "Rata-rata 3–7 hari kerja tergantung jumlah pesanan. Jadwal pasti dikonfirmasi saat order.",
      },
      {
        q: "Apakah bisa order satuan?",
        a: "Bisa, order 1 pcs bisa langsung custom nama, nomor punggung, logo tim, dan logo sponsor — desain dasarnya mengikuti katalog yang sudah ada.",
      },
      {
        q: "Kalau mau desain custom dari nol gimana?",
        a: "Untuk desain full custom (bukan dari katalog), minimal order 6 pcs ya, biar bisa kami produksi khusus buat tim kamu.",
      },
      {
        q: "Bahan yang dipakai apa?",
        a: "Dry Fit premium, adem dan menyerap keringat, cocok buat aktivitas olahraga intens.",
      },
    ],
    closing: {
      headline: "Saatnya Tim Kamu Tampil Beda di Lapangan",
      sub: "Jangan cuma jadi penonton — wujudkan jersey impian tim kamu sekarang juga.",
      cta: "Order Jersey Sekarang",
    },
    seo: {
      title: "Custom Jersey Futsal & Sepak Bola — Gratis Desain, Bisa Satuan | TNT SPORT APPAREL",
      description:
        "Jasa custom jersey futsal & sepak bola full printing. Bahan Dry Fit premium, gratis desain, bisa order satuan. Custom nama, nomor & logo sesuai request tim kamu.",
    },
    wa: {
      order:
        "Halo TNT SPORT APPAREL, saya mau konsultasi desain jersey futsal / sepak bola custom full team (min. 6 pcs). Bisa dibantu?",
      promo:
        "Halo TNT SPORT APPAREL, saya mau klaim promo jersey futsal & bola untuk order minggu ini. Info dong!",
      closing:
        "Halo TNT SPORT APPAREL, saya mau mulai order jersey futsal / sepak bola custom untuk tim saya.",
      designTemplate:
        "Halo TNT SPORT APPAREL, saya tertarik dengan desain *{design}* di landing Jersey Futsal & Bola. Bisa info lebih lanjut?",
    },
  },
};

/** Ambil config landing by slug (route param). */
export function getCategoryLanding(slug: string): CategoryLandingConfig | undefined {
  return Object.values(CATEGORY_LANDINGS).find((c) => c.slug === slug);
}

/** Semua slug landing — untuk sitemap & generateStaticParams. */
export function landingSlugs(): string[] {
  return Object.values(CATEGORY_LANDINGS).map((c) => c.slug);
}
