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
  imageUrl?: string | null;
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
  /** gambar header kartu */
  image: string;
  imageAlt: string;
  /** badge kecil di pojok gambar (mis. "PALING POPULER") */
  imageBadge?: string;
  highlighted?: boolean;
}

export interface LandingPriceCard {
  kicker: string;
  badge: string;
  name: string;
  unit: string;
  prices: { ecer: string; lusin: string };
  notes: { ecer: string; lusin: string };
  footnote?: { ecer?: string; lusin?: string };
  points: string[];
  pointsByMode?: { ecer: string[]; lusin: string[] };
  cta: string;
  highlighted?: boolean;
}

export interface CategoryLandingConfig {
  /** route slug, mis. /jersey-futsal */
  slug: string;
  /** id kategori di katalog (Supabase product_categories.slug) */
  catalogId: string;
  /** label kecil di atas headline hero */
  eyebrow: string;
  /** baris-baris headline; baris terakhir otomatis pakai gradient fire-text */
  headline: string[];
  /** baris display kecil di bawah headline utama */
  headlineSub: string;
  subheadline: string;
  /** gambar kartu di kanan hero */
  heroImage: string;
  heroImageAlt: string;
  /** badge kecil mengapung di kartu hero */
  heroBadge: { kicker: string; text: string };
  /** trust bar di bawah hero */
  trustBar: string[];
  /** item marquee setelah hero */
  marquee: string[];
  problem: {
    headline: string[];
    body: string;
    features: LandingFeature[];
  };
  catalog: {
    orderLabel: string;
    orderHeadline: string[];
    orderSub: string;
    orderCards: LandingOrderCard[];
    orderNote: string;
    designsHeadline: string[];
    designsSub: string;
    designsCta: string;
    designsFootnote: string;
  };
  pricing: {
    headline: string;
    headlineAccent: string;
    sub: string;
    atasan: LandingPriceCard;
    setelan: LandingPriceCard;
    bulk: { headline: string; accent: string; sub: string; cta: string };
  };
  steps: {
    headline: string;
    headlineAccent: string;
    items: { title: string; desc: string }[];
  };
  testimonials: {
    headline: string;
    headlineAccent: string;
    sub: string;
    galleryBadge: string;
    galleryTitle: string;
    galleryTitleAccent: string;
    gallerySub: string;
    galleryCta: string;
    /** label pendek CTA galeri khusus mobile (fallback: galleryCta) */
    galleryCtaShort?: string;
    gallery: { src: string; alt: string }[];
    fallback: LandingTestimonial[];
  };
  /** rotasi pop-up social proof (nama, produk, waktu) */
  purchasePops: { name: string; city: string; product: string; time: string }[];
  urgency: {
    headline: string;
    headlineAccent: string;
    body: string;
    cta: string;
    note: string;
    bgImage: string;
  };
  faqs: {
    headline: string;
    headlineAccent: string;
    items: LandingFaq[];
  };
  closing: {
    headline: string;
    headlineAccent: string;
    sub: string;
    cta: string;
    note: string;
  };
  seo: {
    title: string;
    description: string;
  };
  wa: {
    order: string;
    promo: string;
    closing: string;
    atasan: string;
    setelan: string;
    bulk: string;
    gallery: string;
    /** template pesan WA per desain — "{design}" diganti kode desain saat klik */
    designTemplate: string;
  };
}

export const CATEGORY_LANDINGS: Record<string, CategoryLandingConfig> = {
  football: {
    slug: "jersey-futsal",
    catalogId: "sepak-bola-futsal",
    eyebrow: "Custom Jersey Futsal & Sepak Bola",
    headline: ["Jersey Tim Impian Kamu,", "Jadi Nyata"],
    headlineSub: "Custom Nama, Nomor & Logo Sendiri",
    subheadline:
      "Bahan Dry Fit adem, full printing tajam, desain bebas sesuai selera tim. Cocok buat komunitas, klub, turnamen, sampai kado spesial buat sobat mabar.",
    heroImage:
      "https://res.cloudinary.com/dqjh7utdb/image/upload/w_1200,q_auto,f_auto/v1786875492/ag5aet0sni75yy2j72iy.png",
    heroImageAlt: "Jersey futsal & sepak bola custom TNT SPORT APPAREL",
    heroBadge: { kicker: "Full Printing", text: "Nama · Nomor · Logo" },
    trustBar: [
      "100+ Tim Sudah Order",
      "Bisa Satuan",
      "Bahan Dry Fit Premium",
      "Packing Aman",
    ],
    marquee: ["Futsal", "Sepak Bola", "Komunitas", "Turnamen", "Dry Fit Premium", "Bisa Satuan"],
    problem: {
      headline: ["Capek Cari Jersey Yang Pas di Hati", "Tapi Ramah di Kantong?"],
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
          desc: "Kirim logo tim, pilih warna, tentuin gaya — kami wujudkan jadi jersey yang benar-benar punya identitas tim kamu.",
        },
      ],
    },
    catalog: {
      orderLabel: "Pilihan Order",
      orderHeadline: ["Jersey Futsal & Sepak Bola —", "Pilih Sesuai Kebutuhan Tim Kamu"],
      orderSub: "Mau desain full custom buat satu tim, atau cuma butuh 1 pcs buat diri sendiri? Dua-duanya bisa!",
      orderCards: [
        {
          badge: "Min. 6 pcs",
          title: "Custom Desain Full Team",
          desc: "Minimal order 6 pcs. Desain jersey 100% sesuai request — warna, motif, logo tim, sampai gaya sablon, semua bisa disesuaikan biar tim kamu punya identitas sendiri.",
          points: [
            "Bebas request desain dari nol",
            "Cocok buat tim futsal, klub bola, komunitas",
            "Harga makin hemat per pcs kalau order makin banyak",
          ],
          cta: "Konsultasi Desain Tim",
          image: "/landing/jersey-futsal/foto-team.webp",
          imageAlt: "Tim memakai jersey custom full printing TNT SPORT APPAREL",
          imageBadge: "PALING POPULER",
          highlighted: true,
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
          image: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1787016984/r4o6jhm6sluouwl87kjd.png",
          imageAlt: "Jersey custom order satuan TNT SPORT APPAREL",
        },
      ],
      orderNote:
        "Mau desain benar-benar baru dari nol? Minimal order 6 pcs. Mau cepat & simpel? Order satuan langsung dari katalog yang ada.",
      designsHeadline: ["20 Desain Siap Pakai,", "Tinggal Custom Nama & Nomor"],
      designsSub:
        "Semua desain di bawah bisa langsung dipesan satuan. Tinggal pilih nomor desainnya, kirim nama, nomor punggung, dan logo tim — sisanya kami yang urus.",
      designsCta: "Pesan Desain Pilihanmu",
      designsFootnote: "Gak nemu yang cocok? Bikin desain dari nol (min. 6 pcs).",
    },
    pricing: {
      headline: "Pilih Paket ",
      headlineAccent: "Timmu",
      sub: "Pilih jumlah pembelian, harga akan menyesuaikan otomatis.",
      atasan: {
        kicker: "Jersey Atasan",
        badge: "FLEKSIBEL",
        name: "Atasan Saja",
        unit: "/pcs",
        prices: { ecer: "75rb", lusin: "65rb" },
        notes: { ecer: "Bisa pesan mulai 1 pcs", lusin: "Minimal pembelian 12 pcs" },
        footnote: { ecer: "Mau desain custom sendiri? Order minimal 6 pcs" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
        },
        cta: "Pilih Atasan",
      },
      setelan: {
        kicker: "Atasan + Celana",
        badge: "PALING DIMINATI",
        name: "Jersey Setelan",
        unit: "/set",
        prices: { ecer: "145rb", lusin: "120rb" },
        notes: { ecer: "Bisa pesan mulai 1 set", lusin: "Minimal pembelian 12 set" },
        footnote: { ecer: "Mau desain custom sendiri? Order minimal 6 pcs" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
          "Celana non printing",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
            "Celana non printing",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
            "Celana non printing",
          ],
        },
        cta: "Pilih Setelan",
        highlighted: true,
      },
      bulk: {
        headline: "Butuh Lebih dari ",
        accent: "50 Pcs?",
        sub: "Dapatkan harga proyek khusus untuk komunitas, sekolah, dan event.",
        cta: "Minta Harga Khusus",
      },
    },
    steps: {
      headline: "Order Gampang, ",
      headlineAccent: "Tinggal 4 Langkah",
      items: [
        { title: "Pilih Desain", desc: "Browse katalog atau kirim referensi desain sendiri." },
        { title: "Isi Detail", desc: "Nama, nomor, ukuran, dan jumlah pemain." },
        { title: "Konfirmasi & Bayar", desc: "Cek preview desain dulu sebelum produksi." },
        { title: "Jersey Sampai di Tanganmu", desc: "Dikirim rapi dengan packing aman." },
      ],
    },
    testimonials: {
      headline: "Kata ",
      headlineAccent: "Pelanggan Kami",
      sub: "Ratusan tim & komunitas sudah percaya kualitas jersey kami.",
      galleryBadge: "BUKTI BUKAN JANJI",
      galleryTitle: "Hasil ",
      galleryTitleAccent: "Nyata",
      gallerySub: "Foto asli jersey yang sudah diterima pelanggan — bukan edit, bukan rekayasa.",
      galleryCta: "Mau Jersey Seperti Ini? Order Sekarang",
      galleryCtaShort: "Order Sekarang",
      gallery: [
        { src: "/landing/jersey-futsal/4c090b09-6b9d-4d9a-a061-ca955c49c520.png", alt: "Tim Balreng Kebumen memakai jersey custom merah di Turnamen Mustika Aji Cup" },
        { src: "/landing/jersey-futsal/93c90d93-45be-4137-b10d-d810ada22df4.png", alt: "Tim SSB Persem memakai jersey custom kuning di Kades Cup Blambangan" },
        { src: "/landing/jersey-futsal/0cde4945-3487-4e3d-ba70-e94156ac55e3.png", alt: "Pemain memakai jersey custom lengan panjang merah" },
        { src: "/landing/jersey-futsal/3af292c0-b13f-4a74-b94e-c0b6885f633c.png", alt: "Lenox FC memakai jersey custom maroon di Open Copa Lenox 2026" },
        { src: "/landing/jersey-futsal/21bccec1-b05a-464e-bc44-54cb90c01dde.png", alt: "Tim junior memakai jersey custom biru saat menerima piala juara 2" },
      ],
      fallback: [
        { quote: "Bahannya adem banget, dipake main futsal 2 jam gak bikin gerah. Desainnya juga persis request tim kami.", name: "Rizky", team: "Tim Garuda FC", city: "Yogyakarta" },
        { quote: "Order 18 pcs buat turnamen antar RW, jadinya rapi semua. Nomor punggung gak ada yang salah cetak sama sekali.", name: "Bayu", team: "Putra Mandiri FC", city: "Bekasi" },
        { quote: "Awalnya ragu order satuan, ternyata beneran bisa 1 pcs. Logo komunitas saya dicetak tajam, gak pecah.", name: "Dimas", team: "Komunitas Mabar Senin", city: "Surabaya" },
        { quote: "Desain dari nol dibantuin sampai fix, revisi juga gak dipersulit. Tim jadi punya identitas sendiri akhirnya.", name: "Fajar", team: "Rajawali Futsal", city: "Bandung" },
        { quote: "Udah dicuci belasan kali warnanya masih nyala, gak luntur. Beda jauh sama jersey sablon yang dulu.", name: "Aldi", team: "Bintang Muda FC", city: "Semarang" },
        { quote: "Beli buat kado ulang tahun temen, dikasih nama dia sama nomor favoritnya. Packingnya rapi banget pas sampai.", name: "Nanda", team: "Tim Serigala Malam", city: "Makassar" },
      ],
    },
    purchasePops: [
      { name: "Andri", city: "Sumedang", product: "Jersey Futsal Custom Full Printing", time: "3 menit yang lalu" },
      { name: "Rizal", city: "Malang", product: "Custom Desain Full Team 12 pcs", time: "6 menit yang lalu" },
      { name: "Yoga", city: "Depok", product: "Jersey Satuan + Nama & Nomor", time: "9 menit yang lalu" },
      { name: "Sandi", city: "Palembang", product: "Jersey Futsal Custom Full Printing", time: "12 menit yang lalu" },
      { name: "Ilham", city: "Denpasar", product: "Custom Desain Full Team 8 pcs", time: "15 menit yang lalu" },
      { name: "Wahyu", city: "Medan", product: "Jersey Satuan + Logo Sponsor", time: "18 menit yang lalu" },
      { name: "Bagas", city: "Solo", product: "Jersey Futsal Custom Full Printing", time: "21 menit yang lalu" },
      { name: "Reza", city: "Pontianak", product: "Custom Desain Full Team 15 pcs", time: "24 menit yang lalu" },
    ],
    urgency: {
      headline: "Promo Spesial Buat Tim",
      headlineAccent: "Yang Order Minggu Ini",
      body: "Order sebelum {deadline} dan dapatkan potongan harga khusus untuk pembelian di atas 10 pcs. Slot produksi terbatas tiap minggunya, buruan amankan sebelum kehabisan!",
      cta: "Klaim Promo Sekarang",
      note: "Estimasi produksi 7 hari kerja setelah desain disetujui.",
      bgImage: "/landing/jersey-futsal/d56f2c7a-fef3-4f01-abc8-e8863951a845.jpg",
    },
    faqs: {
      headline: "Pertanyaan Yang ",
      headlineAccent: "Sering Ditanya",
      items: [
        { q: "Bisa custom nama & nomor sendiri gak?", a: "Bisa banget! Tinggal isi form order, kami cetak sesuai request kamu." },
        { q: "Berapa lama proses produksinya?", a: "Rata-rata 7 hari kerja tergantung jumlah pesanan." },
        { q: "Apakah bisa order satuan?", a: "Bisa, order 1 pcs bisa langsung custom nama, nomor punggung, logo tim, dan logo sponsor — desain dasarnya mengikuti katalog yang sudah ada." },
        { q: "Kalau mau desain custom dari nol gimana?", a: "Untuk desain full custom (bukan dari katalog), minimal order 6 pcs ya, biar bisa kami produksi khusus buat tim kamu." },
        { q: "Bahan yang dipakai apa?", a: "Dry Fit premium, adem dan menyerap keringat, cocok buat aktivitas olahraga intens." },
      ],
    },
    closing: {
      headline: "Saatnya Tim Kamu ",
      headlineAccent: "Tampil Beda di Lapangan",
      sub: "Jangan cuma jadi penonton — wujudkan jersey impian tim kamu sekarang juga.",
      cta: "Order Jersey Sekarang",
      note: "Gratis konsultasi desain · Bisa satuan · Packing aman",
    },
    seo: {
      title: "Custom Jersey Futsal & Sepak Bola — Bisa Satuan, Full Printing | TNT SPORT APPAREL",
      description:
        "Jersey futsal & bola custom nama, nomor, dan logo sendiri. Bahan Dry Fit premium, full printing tajam, bisa order satuan. 100+ tim sudah order.",
    },
    wa: {
      order: "Halo TNT SPORT APPAREL, saya mau konsultasi desain jersey futsal / sepak bola custom full team (min. 6 pcs). Bisa dibantu?",
      promo: "Halo TNT SPORT APPAREL, saya mau klaim promo jersey futsal & bola untuk order minggu ini. Info dong!",
      closing: "Halo TNT SPORT APPAREL, saya mau mulai order jersey futsal / sepak bola custom untuk tim saya.",
      atasan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Atasan saja (futsal/bola). Minta info lengkapnya dong!",
      setelan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Setelan atasan + celana (futsal/bola). Minta info lengkapnya dong!",
      bulk: "Halo TNT SPORT APPAREL, saya butuh jersey lebih dari 50 pcs buat komunitas/sekolah/event. Minta harga khusus dong!",
      gallery: "Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan di landing futsal, saya mau order seperti itu!",
      designTemplate: "Halo TNT SPORT APPAREL, saya tertarik dengan desain *{design}* di katalog Jersey Futsal & Bola. Bisa info lebih lanjut?",
    },
  },

  volley: {
    slug: "jersey-voli",
    catalogId: "Volly Ball",
    eyebrow: "🏐 Custom Jersey Voli",
    headline: ["Jersey Voli Satu Tim,", "Satu Semangat"],
    headlineSub: "Custom Nama, Nomor & Logo Sendiri",
    subheadline:
      "Bahan Dry Fit ringan & elastis, full printing rapi, desain bebas sesuai identitas tim. Cocok buat klub voli, tim sekolah, komunitas kantor, sampai turnamen antar RT.",
    heroImage: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1786960413/fbn5xyfyxdaj46pxlfiv.png",
    heroImageAlt: "Dua model memakai jersey voli custom putih navy, pegang bola voli",
    heroBadge: { kicker: "Full Printing", text: "Nama · Nomor · Logo" },
    trustBar: [
      "100+ Tim Sudah Order",
      "Bisa Satuan",
      "Bahan Dry Fit Ringan",
      "Packing Aman",
    ],
    marquee: ["Voli Indoor", "Klub Voli", "Tim Sekolah", "Komunitas Kantor", "Dry Fit Ringan", "Bisa Satuan"],
    problem: {
      headline: ["Jersey Voli Yang Nyaman Dipake", "Dari Servis Pertama Sampai", "Set Penentuan"],
      body: "Voli itu olahraga yang banyak gerak eksplosif — lompat, smash, diving. Jersey yang kaku atau gerah bisa ganggu performa. Makanya kami fokus di bahan yang benar-benar ringan dan gak nempel pas keringetan.",
      features: [
        {
          icon: "single",
          title: "Bahan Ringan & Elastis",
          desc: "Dry Fit khusus yang gak bikin gerah, cocok buat gerakan cepat dan lompatan tinggi.",
        },
        {
          icon: "print",
          title: "Bisa Satuan, Gak Ribet",
          desc: "Mau order buat satu tim atau cuma buat diri sendiri, sama-sama gampang.",
        },
        {
          icon: "design",
          title: "Desain Bebas Sesuai Identitas Tim",
          desc: "Kirim logo klub/sekolah, pilih warna, kami wujudkan jadi jersey yang benar-benar \"punya tim kamu\".",
        },
      ],
    },
    catalog: {
      orderLabel: "Pilihan Order",
      orderHeadline: ["Jersey Voli —", "Pilih Sesuai Kebutuhan Tim Kamu"],
      orderSub: "Mau desain full custom buat satu tim, atau cuma butuh 1 pcs buat diri sendiri? Dua-duanya bisa!",
      orderCards: [
        {
          badge: "Min. 6 pcs",
          title: "Custom Desain Full Team",
          desc: "Minimal order 6 pcs. Desain jersey 100% sesuai request — warna, motif, logo klub/sekolah, semua bisa disesuaikan biar tim voli kamu punya identitas sendiri.",
          points: [
            "Bebas request desain dari nol",
            "Cocok buat tim voli sekolah, klub, komunitas kantor",
            "Harga makin hemat per pcs kalau order makin banyak",
          ],
          cta: "Konsultasi Desain Tim",
          image: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1787018985/hmcoydaxndh7kk7leqrx.png",
          imageAlt: "Tim memakai jersey voli custom TNT SPORT APPAREL",
          imageBadge: "PALING POPULER",
          highlighted: true,
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
          image: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1787020582/mcwu3n2zljchzihohyrt.png",
          imageAlt: "Jersey voli satuan TNT SPORT APPAREL",
        },
      ],
      orderNote:
        "Mau desain benar-benar baru dari nol? Minimal order 6 pcs. Mau cepat & simpel? Order satuan langsung dari katalog yang ada.",
      designsHeadline: ["Desain Siap Pakai,", "Tinggal Custom Nama & Nomor"],
      designsSub:
        "Semua desain di bawah bisa langsung dipesan satuan. Tinggal pilih nomor desainnya, kirim nama, nomor punggung, dan logo tim — sisanya kami yang urus.",
      designsCta: "Pesan Desain Pilihanmu",
      designsFootnote: "Gak nemu yang cocok? Bikin desain dari nol (min. 6 pcs).",
    },
    pricing: {
      headline: "Pilih Paket ",
        headlineAccent: "Tim Voli Kamu",
      sub: "Pilih jumlah pembelian, harga akan menyesuaikan otomatis.",
      atasan: {
        kicker: "Jersey Atasan",
        badge: "FLEKSIBEL",
        name: "Atasan Saja",
        unit: "/pcs",
        prices: { ecer: "75rb", lusin: "65rb" },
        notes: { ecer: "Mau desain custom sendiri? Order minimal 6 pcs", lusin: "Minimal pembelian 12 pcs" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
        },
        cta: "Pilih Atasan",
      },
      setelan: {
        kicker: "Atasan + Celana",
        badge: "PALING DIMINATI",
        name: "Jersey Setelan",
        unit: "/set",
        prices: { ecer: "145rb", lusin: "120rb" },
        notes: { ecer: "Mau desain custom sendiri? Order minimal 6 pcs", lusin: "Minimal pembelian 12 set" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
          "Celana non printing",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
            "Celana non printing",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
            "Celana non printing",
          ],
        },
        cta: "Pilih Setelan",
        highlighted: true,
      },
      bulk: {
        headline: "Butuh Lebih dari ",
        accent: "50 Pcs?",
        sub: "Dapatkan harga proyek khusus untuk klub, sekolah, dan event turnamen.",
        cta: "Minta Harga Khusus",
      },
    },
    steps: {
      headline: "Order Gampang, ",
      headlineAccent: "Tinggal 4 Langkah",
      items: [
        { title: "Pilih Desain", desc: "Browse katalog atau kirim referensi desain sendiri." },
        { title: "Isi Detail", desc: "Nama, nomor, ukuran, dan jumlah pemain." },
        { title: "Konfirmasi & Bayar", desc: "Cek preview desain dulu sebelum produksi." },
        { title: "Jersey Sampai di Tanganmu", desc: "Dikirim rapi dengan packing aman." },
      ],
    },
    testimonials: {
      headline: "Kata ",
      headlineAccent: "Pelanggan Kami",
      sub: "Klub, tim sekolah, dan komunitas voli sudah percaya kualitas jersey kami.",
      galleryBadge: "BUKTI BUKAN JANJI",
      galleryTitle: "Hasil ",
      galleryTitleAccent: "Nyata",
      gallerySub: "Foto asli jersey yang sudah diterima pelanggan — bukan edit, bukan rekayasa.",
      galleryCta: "Mau Jersey Seperti Ini? Order Sekarang",
      galleryCtaShort: "Order Sekarang",
      gallery: [
        { src: "/landing/jersey-futsal/4c090b09-6b9d-4d9a-a061-ca955c49c520.png", alt: "Tim Balreng Kebumen memakai jersey custom merah" },
        { src: "/landing/jersey-futsal/93c90d93-45be-4137-b10d-d810ada22df4.png", alt: "Tim SSB Persem memakai jersey custom kuning" },
        { src: "/landing/jersey-futsal/0cde4945-3487-4e3d-ba70-e94156ac55e3.png", alt: "Pemain memakai jersey custom lengan panjang merah" },
        { src: "/landing/jersey-futsal/3af292c0-b13f-4a74-b94e-c0b6885f633c.png", alt: "Lenox FC memakai jersey custom maroon" },
        { src: "/landing/jersey-futsal/21bccec1-b05a-464e-bc44-54cb90c01dde.png", alt: "Tim junior memakai jersey custom biru" },
      ],
      fallback: [
        { quote: "Bahannya ringan banget, dipake latihan smash & lompat gak bikin risih. Warnanya juga awet gak pudar.", name: "Dita", team: "Klub Voli Srikandi", city: "Yogyakarta" },
        { quote: "Order 12 pcs buat tim voli sekolah, semua ukuran pas dan nomor punggungnya rapi. Anak-anak pede pas turnamen.", name: "Pak Hendra", team: "SMAN 3 Voli", city: "Semarang" },
        { quote: "Awalnya ragu order satuan, ternyata beneran bisa 1 pcs. Logo klub dicetak tajam, gak pecah sama sekali.", name: "Rani", team: "Voli Putri Garuda", city: "Surabaya" },
        { quote: "Desain dari nol dibantuin sampai fix. Tim voli kantor kami akhirnya punya jersey identitas sendiri.", name: "Adi", team: "Komunitas Voli Kantor", city: "Bekasi" },
        { quote: "Elastis dan gak nempel walau keringetan pas main 3 set penuh. Nyaman buat diving juga.", name: "Sinta", team: "Klub Voli Merapi", city: "Yogyakarta" },
        { quote: "Packing rapi, sampai tepat waktu sebelum turnamen antar RT. Bakal order lagi buat tim cadangan.", name: "Yusuf", team: "Voli Karang Taruna", city: "Bandung" },
      ],
    },
    purchasePops: [
      { name: "Bagas", city: "Sumedang", product: "Jersey Voli Custom Full Printing", time: "5 menit yang lalu" },
      { name: "Nadia", city: "Malang", product: "Custom Desain Full Team 12 pcs", time: "8 menit yang lalu" },
      { name: "Fikri", city: "Depok", product: "Jersey Voli Satuan + Nama & Nomor", time: "11 menit yang lalu" },
      { name: "Sari", city: "Palembang", product: "Jersey Voli Custom Full Printing", time: "14 menit yang lalu" },
      { name: "Gilang", city: "Denpasar", product: "Custom Desain Full Team 8 pcs", time: "17 menit yang lalu" },
      { name: "Mega", city: "Medan", product: "Jersey Voli Satuan + Logo Sponsor", time: "20 menit yang lalu" },
      { name: "Rio", city: "Solo", product: "Jersey Voli Custom Full Printing", time: "23 menit yang lalu" },
      { name: "Tika", city: "Pontianak", product: "Custom Desain Full Team 15 pcs", time: "26 menit yang lalu" },
    ],
    urgency: {
      headline: "Promo Spesial Buat Tim",
      headlineAccent: "Yang Order Minggu Ini",
      body: "Order sebelum {deadline} dan dapatkan potongan harga khusus untuk pembelian di atas 10 pcs. Slot produksi terbatas tiap minggunya, buruan amankan sebelum kehabisan!",
      cta: "Klaim Promo Sekarang",
      note: "Estimasi produksi 7 hari kerja setelah desain disetujui.",
      bgImage: "/products/placeholder.svg",
    },
    faqs: {
      headline: "Pertanyaan Yang ",
      headlineAccent: "Sering Ditanya",
      items: [
        { q: "Bisa custom nama & nomor sendiri gak?", a: "Bisa banget! Tinggal isi form order, kami cetak sesuai request kamu." },
        { q: "Berapa lama proses produksinya?", a: "Rata-rata 7 hari kerja tergantung jumlah pesanan." },
        { q: "Apakah bisa order satuan?", a: "Bisa, order 1 pcs bisa langsung custom nama, nomor punggung, logo tim, dan logo sponsor — desain dasarnya mengikuti katalog yang sudah ada." },
        { q: "Kalau mau desain custom dari nol gimana?", a: "Untuk desain full custom (bukan dari katalog), minimal order 6 pcs ya, biar bisa kami produksi khusus buat tim kamu." },
        { q: "Bahannya cocok buat gerakan lompat & smash?", a: "Cocok, kami pakai Dry Fit ringan yang elastis dan menyerap keringat, jadi tetap nyaman meski banyak gerakan eksplosif." },
      ],
    },
    closing: {
      headline: "Saatnya Tim Voli Kamu ",
      headlineAccent: "Tampil Kompak di Lapangan",
      sub: "Jangan cuma latihan bareng — tampil kompak juga dengan jersey satu identitas.",
      cta: "Order Jersey Voli Sekarang",
      note: "Gratis konsultasi desain · Bisa satuan · Packing aman",
    },
    seo: {
      title: "Custom Jersey Voli — Custom Nama, Nomor & Logo, Bisa Satuan | TNT SPORT APPAREL",
      description:
        "Jersey voli custom nama, nomor, dan logo tim sendiri. Bahan Dry Fit ringan & elastis, full printing rapi, bisa order satuan. Cocok buat klub, tim sekolah, dan komunitas kantor.",
    },
    wa: {
      order: "Halo TNT SPORT APPAREL, saya mau konsultasi desain jersey voli custom full team (min. 6 pcs). Bisa dibantu?",
      promo: "Halo TNT SPORT APPAREL, saya mau klaim promo jersey voli untuk order minggu ini. Info dong!",
      closing: "Halo TNT SPORT APPAREL, saya mau mulai order jersey voli custom untuk tim saya.",
      atasan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Atasan saja (voli). Minta info lengkapnya dong!",
      setelan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Setelan atasan + celana (voli). Minta info lengkapnya dong!",
      bulk: "Halo TNT SPORT APPAREL, saya butuh jersey voli lebih dari 50 pcs buat klub/sekolah/event. Minta harga khusus dong!",
      gallery: "Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan di landing voli, saya mau order seperti itu!",
      designTemplate: "Halo TNT SPORT APPAREL, saya tertarik dengan desain *{design}* di katalog Jersey Voli. Bisa info lebih lanjut?",
    },
  },

  basket: {
    slug: "jersey-basket",
    catalogId: "basket",
    eyebrow: "🏀 Custom Jersey Basket",
    headline: ["Jersey Kamu. Nama Kamu.", "Game Kamu."],
    headlineSub: "Custom Nama, Nomor & Logo Sendiri",
    subheadline:
      "Bahan Dry Fit ringan, full printing tajam, desain bebas — dari street ball sampai liga komunitas. Custom nama, nomor, dan logo tim sendiri, tanpa proses yang rumit.",
    heroImage: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1786960413/fefef2d5-6e2e-4daa-a4fd-ccaa58f0fc60.png",
    heroImageAlt: "Pemain basket memakai jersey custom full printing biru-oranye nomor 10 sedang mendribel bola",
    heroBadge: { kicker: "Full Printing", text: "Nama · Nomor · Logo" },
    trustBar: [
      "100+ Tim Telah Memesan",
      "Bisa Satuan",
      "Bahan Dry Fit Premium",
      "Packing Aman",
    ],
    marquee: ["Streetball", "Liga Komunitas", "3x3", "Bisa Satuan", "20 Desain Siap Pilih", "Custom Dari Nol", "Dry Fit Premium"],
    problem: {
      headline: ["Jersey yang salah pilih hanya menaikkan", "rasa percaya diri, bukan performa di lapangan"],
      body: "Basket adalah permainan cepat — crossover, drive, jump shot. Jersey yang kaku atau berbahan panas akan mengganggu pergerakan. Kami merancang jersey yang benar-benar diperhitungkan untuk bergerak, bukan sekadar untuk difoto.",
      features: [
        {
          icon: "single",
          title: "Bahan ringan, tidak lembap saat berkeringat",
          desc: "Dry Fit premium, tetap sejuk meski bermain full court 2 jam nonstop.",
        },
        {
          icon: "print",
          title: "Bisa satuan, tanpa minimum satu tim",
          desc: "Baik pesanan 1 pcs untuk pribadi maupun jumlah besar untuk tim, harganya tetap wajar.",
        },
        {
          icon: "design",
          title: "Desain dengan identitas sendiri",
          desc: "Bukan template pasaran — kirim logo, pilih warna, dan jersey kamu punya identitasnya sendiri.",
        },
      ],
    },
    catalog: {
      orderLabel: "Pilihan Order",
      orderHeadline: ["20 desain siap pilih, atau rancang dari nol —", "sesuai kebutuhan kamu"],
      orderSub: "Ingin praktis? Pilih saja dari 20 desain yang tersedia. Ingin tampil berbeda? Custom sepenuhnya juga bisa.",
      orderCards: [
        {
          badge: "Min. 6 pcs",
          title: "Custom Desain Full Team",
          desc: "Minimal order 6 pcs. Desain 100% dari nol — warna, motif, dan logo tim sepenuhnya kamu tentukan. Cocok untuk tim yang ingin punya identitas sendiri, bukan jersey pasaran.",
          points: [
            "Bebas mengajukan desain dari nol",
            "Cocok untuk komunitas streetball, tim liga, dan klub basket",
            "Semakin banyak pesanan, semakin hemat per pcs",
          ],
          cta: "Konsultasi Desain Tim",
          image: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1786960413/fefef2d5-6e2e-4daa-a4fd-ccaa58f0fc60.png",
          imageAlt: "Tim memakai jersey basket custom TNT SPORT APPAREL",
          imageBadge: "PALING POPULER",
          highlighted: true,
        },
        {
          badge: "1 pcs",
          title: "Order Satuan",
          desc: "Cukup 1 pcs. Pilih dari 20 desain siap pakai, lalu tinggal custom:",
          points: [
            "Nama & Nomor Punggung",
            "Logo Tim",
            "Logo Sponsor",
          ],
          footnote: "Desain dasar mengikuti katalog, bukan custom dari nol.",
          cta: "Pilih Desain Katalog",
          ctaAnchor: "#desain",
          image: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1786960413/fefef2d5-6e2e-4daa-a4fd-ccaa58f0fc60.png",
          imageAlt: "Jersey basket satuan TNT SPORT APPAREL",
        },
      ],
      orderNote:
        "Ingin desain yang benar-benar baru? Minimal order 6 pcs. Ingin langsung pesan? Pilih saja dari 20 desain yang sudah tersedia.",
      designsHeadline: ["20 Desain Siap Pilih", "Tinggal Custom Nama & Nomor"],
      designsSub:
        "Semua desain di bawah bisa langsung dipesan satuan. Tinggal pilih nomor desainnya, kirim nama, nomor punggung, dan logo tim — sisanya kami yang urus.",
      designsCta: "Pesan Desain Pilihanmu",
      designsFootnote: "Gak nemu yang cocok? Bikin desain dari nol (min. 6 pcs).",
    },
    pricing: {
      headline: "Pilih Paket ",
      headlineAccent: "Tim Basket Kamu",
      sub: "Pilih jumlah pembelian, harga akan menyesuaikan otomatis.",
      atasan: {
        kicker: "Jersey Atasan",
        badge: "FLEKSIBEL",
        name: "Atasan Saja",
        unit: "/pcs",
        prices: { ecer: "75rb", lusin: "65rb" },
        notes: { ecer: "Mau desain custom sendiri? Order minimal 6 pcs", lusin: "Minimal pembelian 12 pcs" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
        },
        cta: "Pilih Atasan",
      },
      setelan: {
        kicker: "Atasan + Celana",
        badge: "PALING DIMINATI",
        name: "Jersey Setelan",
        unit: "/set",
        prices: { ecer: "145rb", lusin: "120rb" },
        notes: { ecer: "Mau desain custom sendiri? Order minimal 6 pcs", lusin: "Minimal pembelian 12 set" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
          "Celana non printing",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
            "Celana non printing",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
            "Celana non printing",
          ],
        },
        cta: "Pilih Setelan",
        highlighted: true,
      },
      bulk: {
        headline: "Butuh Lebih dari ",
        accent: "50 Pcs?",
        sub: "Dapatkan harga proyek khusus untuk komunitas, sekolah, dan event.",
        cta: "Minta Harga Khusus",
      },
    },
    steps: {
      headline: "Proses pesanan mudah, hanya ",
      headlineAccent: "4 langkah",
      items: [
        { title: "Pilih Desain", desc: "Pilih dari 20 desain atau kirimkan referensi sendiri." },
        { title: "Isi Detail", desc: "Nama, nomor, ukuran, jumlah pemain." },
        { title: "Konfirmasi & Bayar", desc: "Periksa preview terlebih dahulu sebelum produksi dimulai." },
        { title: "Jersey Tiba Di Tangan Kamu", desc: "Dikirim rapi dengan pengemasan aman." },
      ],
    },
    testimonials: {
      headline: "Ulasan dari mereka yang ",
      headlineAccent: "sudah memesan",
      sub: "Komunitas streetball hingga tim liga telah mempercayai kualitas jersey kami.",
      galleryBadge: "BUKTI BUKAN JANJI",
      galleryTitle: "Hasil ",
      galleryTitleAccent: "Nyata",
      gallerySub: "Foto asli jersey yang sudah diterima pelanggan — bukan edit, bukan rekayasa.",
      galleryCta: "Mau Jersey Seperti Ini? Order Sekarang",
      galleryCtaShort: "Order Sekarang",
      gallery: [],
      fallback: [
        { quote: "Bahannya sangat ringan dan pergerakan terasa bebas, tidak kaku seperti jersey berkualitas rendah. Desainnya juga benar-benar sesuai permintaan.", name: "Fajar", team: "Komunitas Streetball Jogja", city: "Yogyakarta" },
        { quote: "Pesanan 12 pcs untuk tim, semua ukuran pas. Hasil printing tajam dan nomor punggung tidak mengelupas meski sudah sering dicuci.", name: "Dwi", team: "Tim Liga Basket Bekasi", city: "Bekasi" },
        { quote: "Saya hanya memesan satuan, tetapi tetap dilayani dengan baik. Nama dan nomor sesuai, pengirimannya rapi dan cepat.", name: "Arif", team: "3x3 Kalibata Squad", city: "Jakarta" },
        { quote: "Desain dari nol dibantu hingga final. Warnanya persis seperti logo klub kami. Sangat memuaskan.", name: "Nanda", team: "Basket Putri Sleman", city: "Sleman" },
        { quote: "Bermain full court 2 jam tetap terasa sejuk dan tidak lembap di badan. Ini yang membedakannya dari jersey murah.", name: "Bagas", team: "Komunitas Streetball Malang", city: "Malang" },
        { quote: "Harga sangat wajar untuk kualitas seperti ini. Tim kami sudah melakukan pemesanan ulang dua kali.", name: "Rizky", team: "Klub Basket Semarang", city: "Semarang" },
      ],
    },
    purchasePops: [
      { name: "Reza", city: "Bandung", product: "Jersey Basket Custom Full Printing", time: "2 menit yang lalu" },
      { name: "Dimas", city: "Surabaya", product: "Custom Desain Full Team 10 pcs", time: "6 menit yang lalu" },
      { name: "Yoga", city: "Yogyakarta", product: "Jersey Basket Satuan + Nama & Nomor", time: "9 menit yang lalu" },
      { name: "Putri", city: "Makassar", product: "Jersey Basket Custom Full Printing", time: "13 menit yang lalu" },
      { name: "Andre", city: "Tangerang", product: "Custom Desain Full Team 8 pcs", time: "17 menit yang lalu" },
      { name: "Bima", city: "Semarang", product: "Jersey Basket Satuan + Logo Sponsor", time: "21 menit yang lalu" },
      { name: "Galih", city: "Balikpapan", product: "Jersey Basket Custom Full Printing", time: "25 menit yang lalu" },
      { name: "Sandi", city: "Medan", product: "Custom Desain Full Team 14 pcs", time: "29 menit yang lalu" },
    ],
    urgency: {
      headline: "Promo untuk tim yang memesan ",
      headlineAccent: "minggu ini",
      body: "Pesan minggu ini dan dapatkan potongan harga khusus untuk pembelian di atas 10 pcs. Slot produksi terbatas, segera amankan tempat kamu.",
      cta: "Klaim Promo Sekarang",
      note: "Berlaku untuk pesanan di atas 10 pcs",
      bgImage: "/products/placeholder.svg",
    },
    faqs: {
      headline: "Masih ada ",
      headlineAccent: "pertanyaan?",
      items: [
        { q: "Bisakah custom nama & nomor sendiri?", a: "Bisa. Cukup isi formulir pesanan, dan kami cetak sesuai permintaan kamu." },
        { q: "Berapa lama proses produksinya?", a: "Rata-rata 7 hari kerja tergantung jumlah pesanan." },
        { q: "Ada berapa pilihan desain?", a: "Tersedia 20 desain siap pilih. Jika menginginkan desain lain, tersedia opsi custom dari nol dengan minimal order 6 pcs." },
        { q: "Bisa order satuan?", a: "Bisa. Pesanan 1 pcs dapat langsung custom nama, nomor punggung, logo tim, dan logo sponsor — desain dasar mengikuti salah satu dari 20 desain yang tersedia." },
        { q: "Apakah bahannya cocok untuk bermain full court dalam waktu lama?", a: "Cocok. Dry Fit ringan dan menyerap keringat, sehingga tetap nyaman meski bermain lama." },
      ],
    },
    closing: {
      headline: "Saatnya tim kamu punya ",
      headlineAccent: "jersey sendiri",
      sub: "Tinggalkan jersey pasaran. Bangun identitas tim kamu di lapangan.",
      cta: "Pesan Jersey Basket Sekarang",
      note: "100+ tim telah memesan · bisa satuan · dry fit premium",
    },
    seo: {
      title: "Custom Jersey Basket — Jersey, Nama, dan Nomor Sesuai Keinginan Kamu | TNT SPORT APPAREL",
      description:
        "Jersey basket custom nama, nomor, dan logo tim sendiri. Bahan Dry Fit ringan, full printing tajam, bisa order satuan. 20 desain siap pilih atau custom dari nol.",
    },
    wa: {
      order: "Halo TNT SPORT APPAREL, saya ingin memesan jersey basket custom. Boleh dibantu?",
      promo: "Halo TNT SPORT APPAREL, saya ingin mengklaim promo jersey basket minggu ini (di atas 10 pcs).",
      closing: "Halo TNT SPORT APPAREL, saya ingin memesan jersey basket custom sekarang.",
      atasan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Atasan saja (basket). Minta info lengkapnya dong!",
      setelan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Setelan atasan + celana (basket). Minta info lengkapnya dong!",
      bulk: "Halo TNT SPORT APPAREL, saya butuh jersey basket lebih dari 50 pcs buat komunitas/sekolah/event. Minta harga khusus dong!",
      gallery: "Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan di landing basket, saya mau order seperti itu!",
      designTemplate: "Halo TNT SPORT APPAREL, saya tertarik dengan desain *{design}* di katalog Jersey Basket. Bisa info lebih lanjut?",
    },
  },

  racing: {
    slug: "jersey-racing",
    catalogId: "racing",
    eyebrow: "🏁 Custom Jersey Racing",
    headline: [""],
    headlineSub: "",
    subheadline: "",
    heroImage: "",
    heroImageAlt: "",
    heroBadge: { kicker: "", text: "" },
    trustBar: [],
    marquee: [],
    problem: { headline: [""], body: "", features: [] },
    catalog: {
      orderLabel: "",
      orderHeadline: [""],
      orderSub: "",
      orderCards: [],
      orderNote: "",
      designsHeadline: [""],
      designsSub: "",
      designsCta: "",
      designsFootnote: "",
    },
    pricing: {
      headline: "",
      headlineAccent: "",
      sub: "",
      atasan: { kicker: "", badge: "", name: "", unit: "", prices: { ecer: "", lusin: "" }, notes: { ecer: "", lusin: "" }, points: [], cta: "" },
      setelan: { kicker: "", badge: "", name: "", unit: "", prices: { ecer: "", lusin: "" }, notes: { ecer: "", lusin: "" }, points: [], cta: "" },
      bulk: { headline: "", accent: "", sub: "", cta: "" },
    },
    steps: { headline: "", headlineAccent: "", items: [] },
    testimonials: {
      headline: "",
      headlineAccent: "",
      sub: "",
      galleryBadge: "",
      galleryTitle: "",
      galleryTitleAccent: "",
      gallerySub: "",
      galleryCta: "",
      gallery: [],
      fallback: [],
    },
    purchasePops: [],
    urgency: { headline: "", headlineAccent: "", body: "", cta: "", note: "", bgImage: "" },
    faqs: {
      headline: "",
      headlineAccent: "",
      items: [
        { q: "Bisa custom nama & nomor start sendiri gak?", a: "Bisa banget. Kirim nama dan nomor start yang kamu mau lewat WhatsApp, kami cetak sesuai request. Revisi desain gratis tanpa batas sampai cocok." },
        { q: "Berapa lama proses produksinya?", a: "Produksi dimulai setelah desain disetujui dan DP masuk. Jadwal pengerjaan disepakati bersama sesuai jumlah dan kebutuhanmu." },
        { q: "Apakah bisa order satuan?", a: "Bisa, mulai 1 pcs dari desain katalog. Yang bisa ditambah: nama, nomor start, logo tim, dan logo sponsor — warna dan motifnya ikut desain katalog. Kalau mau ganti warna, motif, atau desain dari nol, minimal 6 pcs." },
        { q: "Bisa masukin banyak logo sponsor?", a: "Bisa, tinggal kirim logo-logo sponsornya, nanti kami bantu susun tata letaknya biar rapi dan proporsional di jersey." },
      ],
    },
    closing: { headline: "", headlineAccent: "", sub: "", cta: "", note: "" },
    seo: {
      title: "Custom Jersey Racing — Full Printing, Bisa Satuan | TNT SPORT APPAREL",
      description: "Jersey racing custom full printing. Atasan 95rb satuan, 85rb mulai 12 pcs. Langsung dari pabrik. 20 desain racing siap pilih, bisa order satuan. Custom desain dari nol minimal 6 pcs. Gratis desain, revisi bebas, beli 6 gratis 1.",
    },
    wa: {
      order: "",
      promo: "",
      closing: "",
      atasan: "",
      setelan: "",
      bulk: "",
      gallery: "",
      designTemplate: "",
    },
  },

  army: {
    slug: "jersey-army",
    catalogId: "army",
    eyebrow: "🎖️ Army Collection",
    headline: ["Tampil Solid.", "Tampil Berkarakter."],
    headlineSub: "Jersey Army untuk Tim yang Punya Identitas",
    subheadline:
      "Desain bergaya military & tactical, siap menemani berbagai aktivitas. Cocok untuk komunitas, instansi, corporate, dan organisasi.",
    heroImage: "",
    heroImageAlt: "Jersey army collection military tactical TNT SPORT APPAREL",
    heroBadge: { kicker: "Army Collection", text: "Military · Tactical" },
    trustBar: [],
    marquee: [],
    problem: { headline: [""], body: "", features: [] },
    catalog: {
      orderLabel: "",
      orderHeadline: [""],
      orderSub: "",
      orderCards: [],
      orderNote: "",
      designsHeadline: [""],
      designsSub: "",
      designsCta: "",
      designsFootnote: "",
    },
    pricing: {
      headline: "",
      headlineAccent: "",
      sub: "",
      atasan: { kicker: "", badge: "", name: "", unit: "", prices: { ecer: "", lusin: "" }, notes: { ecer: "", lusin: "" }, points: [], cta: "" },
      setelan: { kicker: "", badge: "", name: "", unit: "", prices: { ecer: "", lusin: "" }, notes: { ecer: "", lusin: "" }, points: [], cta: "" },
      bulk: { headline: "", accent: "", sub: "", cta: "" },
    },
    steps: { headline: "", headlineAccent: "", items: [] },
    testimonials: {
      headline: "",
      headlineAccent: "",
      sub: "",
      galleryBadge: "",
      galleryTitle: "",
      galleryTitleAccent: "",
      gallerySub: "",
      galleryCta: "",
      gallery: [],
      fallback: [],
    },
    purchasePops: [],
    urgency: { headline: "", headlineAccent: "", body: "", cta: "", note: "", bgImage: "" },
    faqs: {
      headline: "",
      headlineAccent: "",
      items: [],
    },
    closing: { headline: "", headlineAccent: "", sub: "", cta: "", note: "" },
    seo: {
      title: "Army Collection — Jersey Military & Tactical Custom | TNT SPORT APPAREL",
      description:
        "Jersey army custom military & tactical. Full printing, nama, nomor, logo. 20+ desain siap custom. Mulai dari 85rb/pcs.",
    },
    wa: {
      order: "",
      promo: "",
      closing: "",
      atasan: "",
      setelan: "",
      bulk: "",
      gallery: "",
      designTemplate: "",
    },
  },

  mancing: {
    slug: "jersey-mancing",
    catalogId: "Fishing",
    eyebrow: "🎣 Custom Jersey Mancing",
    headline: ["Jersey Mancing Custom,", "Tampil Kompak, Tangkap Ikan Lebih PD"],
    headlineSub: "Custom Nama, Nomor & Logo Komunitas",
    subheadline:
      "Bahan Dry Fit adem & nyaman, full printing tajam, desain bebas sesuai identitas komunitas mancing. Cocok buat mancing harian, event, turnamen, sampai kado spesial.",
    heroImage: "",
    heroImageAlt: "Komunitas mancing memakai jersey custom TNT SPORT APPAREL",
    heroBadge: { kicker: "Full Printing", text: "Nama · Nomor · Logo" },
    trustBar: [
      "Langsung Dari Pabrik",
      "Bisa Order Satuan",
      "Gratis Desain + Revisi Bebas",
      "Bahan Dry Fit Premium",
    ],
    marquee: ["Mancing Laut", "Mancing Danau", "Komunitas Mancing", "Event Mancing", "Dry Fit Premium", "Bisa Satuan"],
    problem: {
      headline: ["Jersey Biasa Bikin Mancing", "Nggak Nyaman?"],
      body: "Banyak pemancing pakai kaos biasa karena jersey mancing gak ada yang sesuai kebutuhan. Akhirnya kepanasan, gerah, dan gak pede pas kumpul komunitas. Kami hadir buat jawab semua itu.",
      features: [
        {
          icon: "single",
          title: "Bisa Satuan, Gak Perlu Minimal Order",
          desc: "Mau order 1 pcs buat diri sendiri atau 20 pcs buat satu komunitas, harga tetap bersahabat.",
        },
        {
          icon: "print",
          title: "Full Printing, Warna Tahan Lama",
          desc: "Teknik cetak digital full printing bikin desain, nama, dan nomor gak gampang luntur meski sering dicuci.",
        },
        {
          icon: "design",
          title: "Desain 100% Sesuai Request",
          desc: "Kirim logo komunitas, pilih warna, tentuin gaya — kami wujudkan jadi jersey yang benar-benar punya identitas.",
        },
      ],
    },
    catalog: {
      orderLabel: "Pilihan Order",
      orderHeadline: ["Jersey Mancing —", "Pilih Sesuai Kebutuhan Komunitasmu"],
      orderSub: "Mau desain full custom buat satu komunitas, atau cuma butuh 1 pcs buat diri sendiri? Dua-duanya bisa!",
      orderCards: [
        {
          badge: "Min. 6 pcs",
          title: "Custom Desain Full Team",
          desc: "Minimal order 6 pcs. Desain jersey 100% sesuai request — warna, motif, logo komunitas, semua bisa disesuaikan biar komunitasmu punya identitas sendiri.",
          points: [
            "Bebas request desain dari nol",
            "Cocok buat komunitas mancing, tim event, klub",
            "Harga makin hemat per pcs kalau order makin banyak",
          ],
          cta: "Konsultasi Desain Komunitas",
          image: "/landing/jersey-futsal/foto-team.webp",
          imageAlt: "Komunitas memakai jersey mancing custom TNT SPORT APPAREL",
          imageBadge: "PALING POPULER",
          highlighted: true,
        },
        {
          badge: "1 pcs",
          title: "Order Satuan",
          desc: "Cukup 1 pcs, gak perlu ngajak satu komunitas. Pilih dari desain katalog yang sudah tersedia, lalu tinggal custom:",
          points: [
            "Nama & Nomor Punggung",
            "Logo Komunitas",
            "Logo Sponsor",
          ],
          footnote: "Desain dasar mengikuti katalog, bukan custom dari nol.",
          cta: "Pilih Desain Katalog",
          ctaAnchor: "#desain",
          image: "/landing/jersey-futsal/foto-satuan.png",
          imageAlt: "Jersey mancing satuan TNT SPORT APPAREL",
        },
      ],
      orderNote:
        "Mau desain benar-benar baru dari nol? Minimal order 6 pcs. Mau cepat & simpel? Order satuan langsung dari katalog yang ada.",
      designsHeadline: ["Desain Siap Pakai,", "Tinggal Custom Nama & Nomor"],
      designsSub:
        "Semua desain di bawah bisa langsung dipesan satuan. Tinggal pilih nomor desainnya, kirim nama, nomor punggung, dan logo komunitas — sisanya kami yang urus.",
      designsCta: "Pesan Desain Pilihanmu",
      designsFootnote: "Gak nemu yang cocok? Bikin desain dari nol (min. 6 pcs).",
    },
    pricing: {
      headline: "Pilih Paket ",
      headlineAccent: "Komunitasmu",
      sub: "Pilih jumlah pembelian, harga akan menyesuaikan otomatis.",
      atasan: {
        kicker: "Jersey Atasan",
        badge: "FLEKSIBEL",
        name: "Atasan Saja",
        unit: "/pcs",
        prices: { ecer: "75rb", lusin: "65rb" },
        notes: { ecer: "Bisa pesan mulai 1 pcs", lusin: "Minimal pembelian 12 pcs" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
        },
        cta: "Pilih Atasan",
      },
      setelan: {
        kicker: "Atasan + Celana",
        badge: "PALING DIMINATI",
        name: "Jersey Setelan",
        unit: "/set",
        prices: { ecer: "145rb", lusin: "120rb" },
        notes: { ecer: "Bisa pesan mulai 1 set", lusin: "Minimal pembelian 12 set" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
          "Celana non printing",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
            "Celana non printing",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
            "Celana non printing",
          ],
        },
        cta: "Pilih Setelan",
        highlighted: true,
      },
      bulk: {
        headline: "Butuh Lebih dari ",
        accent: "50 Pcs?",
        sub: "Dapatkan harga proyek khusus untuk komunitas, event, dan turnamen mancing.",
        cta: "Minta Harga Khusus",
      },
    },
    steps: {
      headline: "Order Gampang, ",
      headlineAccent: "Tinggal 5 Langkah",
      items: [
        { title: "Chat Admin", desc: "Hubungi kami via WhatsApp, sampaikan kebutuhan jersey mancing kamu." },
        { title: "Pilih Desain", desc: "Browse katalog atau kirim referensi desain sendiri." },
        { title: "ACC & Bayar", desc: "Setujui desain final dan lakukan pembayaran DP." },
        { title: "Produksi", desc: "Proses produksi 7 hari kerja sesuai jumlah pesanan." },
        { title: "Jersey Sampai di Tanganmu", desc: "Dikirim rapi dengan packing aman." },
      ],
    },
    testimonials: {
      headline: "Kata ",
      headlineAccent: "Pelanggan Kami",
      sub: "Komunitas mancing sudah percaya kualitas jersey kami.",
      galleryBadge: "BUKTI BUKAN JANJI",
      galleryTitle: "Hasil ",
      galleryTitleAccent: "Nyata",
      gallerySub: "Foto asli jersey yang sudah diterima pelanggan — bukan edit, bukan rekayasa.",
      galleryCta: "Mau Jersey Seperti Ini? Order Sekarang",
      galleryCtaShort: "Order Sekarang",
      gallery: [
        { src: "/landing/jersey-futsal/4c090b09-6b9d-4d9a-a061-ca955c49c520.png", alt: "Komunitas mancing memakai jersey custom" },
        { src: "/landing/jersey-futsal/93c90d93-45be-4137-b10d-d810ada22df4.png", alt: "Tim mancing memakai jersey custom kuning" },
        { src: "/landing/jersey-futsal/0cde4945-3487-4e3d-ba70-e94156ac55e3.png", alt: "Pemancing memakai jersey custom lengan panjang" },
        { src: "/landing/jersey-futsal/3af292c0-b13f-4a74-b94e-c0b6885f633c.png", alt: "Komunitas mancing maroon" },
        { src: "/landing/jersey-futsal/21bccec1-b05a-464e-bc44-54cb90c01dde.png", alt: "Tim mancing junior memakai jersey custom biru" },
      ],
      fallback: [
        { quote: "Bahannya adem banget, dipake mancing dari subuh sampai sore tetap nyaman. Desainnya juga persis request komunitas kami.", name: "Andri", team: "Komunitas Mancing Jaktim", city: "Jakarta" },
        { quote: "Order 12 pcs buat komunitas, semua ukuran pas. Hasil printing tajam dan warnanya gak luntur meski kena air laut terus.", name: "Rizky", team: "Strike Mania", city: "Surabaya" },
        { quote: "Order satuan dulu buat tes, hasilnya langsung oke. Sekarang seluruh anggota komunitas sudah pesan ulang.", name: "Dimas", team: "Mancing Bareng Bandung", city: "Bandung" },
        { quote: "Desain dari nol dibantuin sampai fix. Komunitas kami akhirnya punya jersey identitas sendiri.", name: "Fajar", team: "Mancing Mania Jogja", city: "Yogyakarta" },
        { quote: "Udah dicuci belasan kali warnanya masih nyala, gak luntur. Beda jauh sama jersey sablon yang dulu.", name: "Aldi", team: "Pemancing Semarang", city: "Semarang" },
        { quote: "Beli buat kado ulang tahun temen, dikasih nama dia sama nomor favoritnya. Packingnya rapi banget pas sampai.", name: "Nanda", team: "Mancing Seru Makassar", city: "Makassar" },
      ],
    },
    purchasePops: [
      { name: "Andri", city: "Jakarta", product: "Jersey Mancing Custom Full Printing", time: "3 menit yang lalu" },
      { name: "Rizal", city: "Surabaya", product: "Custom Desain Full Team 12 pcs", time: "6 menit yang lalu" },
      { name: "Yoga", city: "Bandung", product: "Jersey Satuan + Nama & Nomor", time: "9 menit yang lalu" },
      { name: "Sandi", city: "Semarang", product: "Jersey Mancing Custom Full Printing", time: "12 menit yang lalu" },
      { name: "Ilham", city: "Yogyakarta", product: "Custom Desain Full Team 8 pcs", time: "15 menit yang lalu" },
      { name: "Wahyu", city: "Medan", product: "Jersey Satuan + Logo Sponsor", time: "18 menit yang lalu" },
      { name: "Bagas", city: "Solo", product: "Jersey Mancing Custom Full Printing", time: "21 menit yang lalu" },
      { name: "Reza", city: "Pontianak", product: "Custom Desain Full Team 15 pcs", time: "24 menit yang lalu" },
    ],
    urgency: {
      headline: "Promo Spesial Buat Komunitas",
      headlineAccent: "Yang Order Minggu Ini",
      body: "Order sebelum {deadline} dan dapatkan potongan harga khusus untuk pembelian di atas 10 pcs. Slot produksi terbatas tiap minggunya, buruan amankan sebelum kehabisan!",
      cta: "Klaim Promo Sekarang",
      note: "Estimasi produksi 7 hari kerja setelah desain disetujui.",
      bgImage: "/landing/jersey-futsal/d56f2c7a-fef3-4f01-abc8-e8863951a845.jpg",
    },
    faqs: {
      headline: "Pertanyaan Yang ",
      headlineAccent: "Sering Ditanya",
      items: [
        { q: "Berapa harga jersey mancing custom?", a: "Atasan Rp75.000/pcs untuk satuan dan Rp65.000/pcs untuk pembelian lusinan. Untuk order 50 pcs ke atas ada harga khusus, silakan hubungi admin." },
        { q: "Minimal ordernya berapa pcs?", a: "Order satuan bisa mulai 1 pcs dengan memilih desain dari katalog. Kalau mau desain custom dari nol untuk komunitas, minimalnya 6 pcs." },
        { q: "Bisa custom nama dan logo komunitas?", a: "Bisa. Nama, nomor, dan logo komunitas bisa dicustom, bahkan untuk order 1 pcs. Nama tiap anggota juga bisa dibuat berbeda dalam satu batch order." },
        { q: "Berapa lama proses produksinya?", a: "Lama produksi tergantung jumlah order dan tingkat kerumitan desain. Rata-rata 7 hari kerja setelah desain disetujui." },
        { q: "Bahannya cocok buat mancing di laut?", a: "Cocok. Kami pakai Dry Fit premium yang adem, menyerap keringat, dan tahan air. Warna dan printing juga tahan terkena air laut maupun air tawar." },
      ],
    },
    closing: {
      headline: "Saatnya Komunitas Mancing Kamu ",
      headlineAccent: "Tampil Kompak",
      sub: "Jangan cuma mancing biasa — tampil kompak juga dengan jersey satu identitas.",
      cta: "Order Jersey Mancing Sekarang",
      note: "Gratis konsultasi desain · Bisa satuan · Packing aman",
    },
    seo: {
      title: "Jersey Mancing Custom — Full Printing, Bisa Satuan | TNT SPORT APPAREL",
      description:
        "Jersey mancing custom nama, nomor, dan logo komunitas sendiri. Bahan Dry Fit adem & nyaman, full printing tajam, bisa order satuan. Mulai dari 75rb/pcs.",
    },
    wa: {
      order: "Halo TNT SPORT APPAREL, saya mau konsultasi desain jersey mancing custom full team (min. 6 pcs). Bisa dibantu?",
      promo: "Halo TNT SPORT APPAREL, saya mau klaim promo jersey mancing untuk order minggu ini. Info dong!",
      closing: "Halo TNT SPORT APPAREL, saya mau mulai order jersey mancing custom untuk komunitas saya.",
      atasan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Atasan saja (mancing). Minta info lengkapnya dong!",
      setelan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Setelan atasan + celana (mancing). Minta info lengkapnya dong!",
      bulk: "Halo TNT SPORT APPAREL, saya butuh jersey mancing lebih dari 50 pcs buat komunitas/event. Minta harga khusus dong!",
      gallery: "Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan di landing mancing, saya mau order seperti itu!",
      designTemplate: "Halo TNT SPORT APPAREL, saya tertarik dengan desain *{design}* di katalog Jersey Mancing. Bisa info lebih lanjut?",
    },
  },

  badminton: {
    slug: "jersey-badminton",
    catalogId: "badminton",
    eyebrow: "🏸 Custom Jersey Badminton",
    headline: ["Main Cepat.", "Tampil Lebih Tajam."],
    headlineSub: "Custom Nama, Nomor & Logo Sendiri",
    subheadline:
      "Jersey badminton custom untuk tim yang siap tampil kompetitif. Dry-fit adem, full printing tajam, jahitan kuat, free custom nameset dan logo.",
    heroImage: "/landing/jersey-badminton/c7feb97a-5f8f-4114-9788-ad01760eaede.png",
    heroImageAlt: "Model mengenakan jersey badminton custom BD-10",
    heroBadge: { kicker: "Full Printing", text: "Nama · Nomor · Logo" },
    trustBar: [
      "20+ Desain",
      "Siap Custom",
      "Klub & Komunitas",
      "Bahan Dry Fit Premium",
    ],
    marquee: ["Badminton", "Klub Badminton", "Komunitas", "Turnamen", "Dry Fit Premium", "Bisa Satuan"],
    problem: {
      headline: ["Dibuat untuk game", "yang cepat."],
      body: "Badminton menuntut gerakan cepat, fokus tinggi, dan kenyamanan maksimal. Karena itu, jersey yang digunakan juga harus siap mengikuti setiap gerakan di lapangan.",
      features: [
        {
          icon: "fast",
          title: "Dry-Fit Adem",
          desc: "Ringan dan nyaman digunakan untuk latihan maupun pertandingan.",
        },
        {
          icon: "print",
          title: "Full Printing",
          desc: "Desain dicetak secara penuh agar visual jersey terlihat lebih maksimal dan berkarakter.",
        },
        {
          icon: "sewing",
          title: "Jahitan Kuat",
          desc: "Jahitan rapi dan kuat untuk mendukung aktivitas olahraga yang intens.",
        },
        {
          icon: "design",
          title: "Free Custom",
          desc: "Nameset, nomor, logo klub, komunitas, dan sponsor dapat disesuaikan.",
        },
      ],
    },
    catalog: {
      orderLabel: "Collection",
      orderHeadline: ["Pilih desain yang sesuai", "karakter timmu."],
      orderSub: "Beragam desain badminton dengan karakter sporty, modern, dan kompetitif.",
      orderCards: [],
      orderNote: "",
      designsHeadline: ["Pilih desain yang sesuai", "karakter timmu."],
      designsSub:
        "Beragam desain badminton dengan karakter sporty, modern, dan kompetitif.",
      designsCta: "Pilih Desain",
      designsFootnote: "Desain baru terus ditambahkan tiap bulan.",
    },
    pricing: {
      headline: "Pilih ",
      headlineAccent: "paket timmu",
      sub: "Pilih jumlah pembelian, harga akan menyesuaikan otomatis.",
      atasan: {
        kicker: "Jersey Atasan",
        badge: "FLEKSIBEL",
        name: "Atasan Saja",
        unit: "/pcs",
        prices: { ecer: "75rb", lusin: "65rb" },
        notes: { ecer: "Bisa pesan mulai 1 pcs", lusin: "Minimal pembelian 12 pcs" },
        footnote: { ecer: "Mau desain custom sendiri? Order minimal 6 pcs" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
        },
        cta: "Pilih Desain",
      },
      setelan: {
        kicker: "",
        badge: "",
        name: "",
        unit: "",
        prices: { ecer: "", lusin: "" },
        notes: { ecer: "", lusin: "" },
        points: [],
        cta: "",
      },
      bulk: {
        headline: "Lebih dari ",
        accent: "50 pcs?",
        sub: "Harga proyek khusus untuk komunitas, instansi, sekolah, dan event.",
        cta: "Minta Harga Khusus",
      },
    },
    steps: {
      headline: "Desain sesuai ",
      headlineAccent: "timmu.",
      items: [
        { title: "Pilih Desain", desc: "Pilih desain badminton yang paling sesuai dengan karakter tim." },
        { title: "Kirim Data", desc: "Kirim nama, nomor, logo, dan sponsor." },
        { title: "Custom", desc: "Desain disesuaikan dengan identitas tim kamu." },
        { title: "Siap Dimainkan", desc: "Jersey siap digunakan untuk latihan, pertandingan, turnamen, maupun event tim." },
      ],
    },
    testimonials: {
      headline: "Kata ",
      headlineAccent: "Pelanggan Kami",
      sub: "Klub, tim, dan komunitas badminton sudah percaya kualitas jersey kami.",
      galleryBadge: "BUKTI BUKAN JANJI",
      galleryTitle: "Hasil ",
      galleryTitleAccent: "Nyata",
      gallerySub: "Foto asli jersey yang sudah diterima pelanggan — bukan edit, bukan rekayasa.",
      galleryCta: "Mau Jersey Seperti Ini? Order Sekarang",
      galleryCtaShort: "Order Sekarang",
      gallery: [],
      fallback: [
        { quote: "Bahannya adem banget, dipake main badminton 2 jam gak bikin gerah. Desainnya juga persis request tim kami.", name: "Rizky", team: "Tim Garuda BC", city: "Yogyakarta" },
        { quote: "Order 12 pcs buat turnamen antar klub, jadinya rapi semua. Nomor punggung gak ada yang salah cetak sama sekali.", name: "Bayu", team: "Putra Mandiri BC", city: "Bekasi" },
        { quote: "Awalnya ragu order satuan, ternyata beneran bisa 1 pcs. Logo komunitas saya dicetak tajam, gak pecah.", name: "Dimas", team: "Komunitas Badminton Senin", city: "Surabaya" },
        { quote: "Desain dari nol dibantuin sampai fix, revisi juga gak dipersulit. Tim jadi punya identitas sendiri akhirnya.", name: "Fajar", team: "Rajawali BC", city: "Bandung" },
        { quote: "Udah dicuci belasan kali warnanya masih nyala, gak luntur. Beda jauh sama jersey sablon yang dulu.", name: "Aldi", team: "Bintang Muda BC", city: "Semarang" },
        { quote: "Beli buat kado ulang tahun temen, dikasih nama dia sama nomor favoritnya. Packingnya rapi banget pas sampai.", name: "Nanda", team: "Tim Serigala Malam", city: "Makassar" },
      ],
    },
    purchasePops: [
      { name: "Rizky", city: "Yogyakarta", product: "Jersey Badminton Custom Full Printing", time: "3 menit yang lalu" },
      { name: "Andi", city: "Bandung", product: "Custom Desain Full Team 12 pcs", time: "6 menit yang lalu" },
      { name: "Dewi", city: "Jakarta", product: "Jersey Badminton Satuan + Nama & Nomor", time: "9 menit yang lalu" },
      { name: "Bagus", city: "Surabaya", product: "Jersey Badminton Custom Full Printing", time: "12 menit yang lalu" },
      { name: "Putri", city: "Semarang", product: "Custom Desain Full Team 8 pcs", time: "15 menit yang lalu" },
      { name: "Fajar", city: "Malang", product: "Jersey Badminton Satuan + Logo Sponsor", time: "18 menit yang lalu" },
      { name: "Hendra", city: "Medan", product: "Jersey Badminton Custom Full Printing", time: "21 menit yang lalu" },
      { name: "Sinta", city: "Solo", product: "Custom Desain Full Team 15 pcs", time: "24 menit yang lalu" },
    ],
    urgency: {
      headline: "Promo Spesial Buat Tim",
      headlineAccent: "Yang Order Minggu Ini",
      body: "Order sebelum {deadline} dan dapatkan potongan harga khusus untuk pembelian di atas 10 pcs. Slot produksi terbatas tiap minggunya, buruan amankan sebelum kehabisan!",
      cta: "Klaim Promo Sekarang",
      note: "Estimasi produksi 7 hari kerja setelah desain disetujui.",
      bgImage: "/products/placeholder.svg",
    },
    faqs: {
      headline: "Pertanyaan Yang ",
      headlineAccent: "Sering Ditanya",
      items: [
        { q: "Bisa custom nama & nomor sendiri gak?", a: "Bisa banget! Tinggal isi form order, kami cetak sesuai request kamu." },
        { q: "Berapa lama proses produksinya?", a: "Rata-rata 7 hari kerja tergantung jumlah pesanan." },
        { q: "Apakah bisa order satuan?", a: "Bisa, order 1 pcs bisa langsung custom nama, nomor punggung, logo tim, dan logo sponsor — desain dasarnya mengikuti katalog yang sudah ada." },
        { q: "Kalau mau desain custom dari nol gimana?", a: "Untuk desain full custom (bukan dari katalog), minimal order 6 pcs ya, biar bisa kami produksi khusus buat tim kamu." },
        { q: "Bahan yang dipakai apa?", a: "Dry Fit premium, adem dan menyerap keringat, cocok buat aktivitas olahraga intens." },
        { q: "Harganya berapa?", a: "Atasan Rp95.000/pcs untuk satuan dan Rp85.000/pcs untuk pembelian lusinan (mulai 12 pcs). Untuk order 50 pcs ke atas ada harga khusus." },
      ],
    },
    closing: {
      headline: "Siap tampil ",
      headlineAccent: "lebih tajam di lapangan?",
      sub: "Pilih desain badminton favoritmu dan custom sesuai identitas tim.",
      cta: "Pilih Desain Badminton",
      note: "20+ Desain · Siap Custom · Untuk Klub & Komunitas",
    },
    seo: {
      title: "Jersey Badminton Custom — Full Printing, Bisa Satuan | TNT SPORT APPAREL",
      description:
        "Jersey badminton custom untuk tim yang siap tampil kompetitif. Dry-fit adem, full printing, jahitan kuat, free custom nameset dan logo. Bisa order satuan. Mulai dari 85rb/pcs.",
    },
    wa: {
      order: "Halo TNT SPORT APPAREL, saya mau konsultasi desain jersey badminton custom full team (min. 6 pcs). Bisa dibantu?",
      promo: "Halo TNT SPORT APPAREL, saya mau klaim promo jersey badminton untuk order minggu ini. Info dong!",
      closing: "Halo TNT SPORT APPAREL, saya mau mulai order jersey badminton custom untuk tim saya.",
      atasan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Badminton Atasan saja. Minta info lengkapnya dong!",
      setelan: "",
      bulk: "Halo TNT SPORT APPAREL, saya butuh jersey badminton lebih dari 50 pcs buat komunitas/sekolah/event. Minta harga khusus dong!",
      gallery: "Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan di landing badminton, saya mau order seperti itu!",
      designTemplate: "Halo TNT SPORT APPAREL, saya tertarik dengan desain *{design}* di katalog Jersey Badminton. Bisa info lebih lanjut?",
    },
  },

  running: {
    slug: "jersey-running",
    catalogId: "running",
    eyebrow: "🏃 Custom Jersey Running",
    headline: [""],
    headlineSub: "",
    subheadline: "",
    heroImage: "",
    heroImageAlt: "",
    heroBadge: { kicker: "", text: "" },
    trustBar: [],
    marquee: [],
    problem: { headline: [""], body: "", features: [] },
    catalog: {
      orderLabel: "",
      orderHeadline: [""],
      orderSub: "",
      orderCards: [],
      orderNote: "",
      designsHeadline: [""],
      designsSub: "",
      designsCta: "",
      designsFootnote: "",
    },
    pricing: {
      headline: "",
      headlineAccent: "",
      sub: "",
      atasan: { kicker: "", badge: "", name: "", unit: "", prices: { ecer: "", lusin: "" }, notes: { ecer: "", lusin: "" }, points: [], cta: "" },
      setelan: { kicker: "", badge: "", name: "", unit: "", prices: { ecer: "", lusin: "" }, notes: { ecer: "", lusin: "" }, points: [], cta: "" },
      bulk: { headline: "", accent: "", sub: "", cta: "" },
    },
    steps: { headline: "", headlineAccent: "", items: [] },
    testimonials: {
      headline: "",
      headlineAccent: "",
      sub: "",
      galleryBadge: "",
      galleryTitle: "",
      galleryTitleAccent: "",
      gallerySub: "",
      galleryCta: "",
      gallery: [],
      fallback: [],
    },
    purchasePops: [],
    urgency: { headline: "", headlineAccent: "", body: "", cta: "", note: "", bgImage: "" },
    faqs: {
      headline: "",
      headlineAccent: "",
      items: [
        { q: "Berapa harga jersey running custom?", a: "Atasan Rp95.000/pcs untuk satuan dan Rp85.000/pcs untuk pembelian lusinan. Setelan (jersey + celana) Rp145.000 satuan dan Rp120.000 lusinan. Untuk order 50 pcs ke atas ada harga khusus, silakan hubungi admin." },
        { q: "Minimal ordernya berapa pcs?", a: "Order satuan bisa mulai 1 pcs dengan memilih desain dari katalog TNT-RUN. Kalau mau desain custom dari nol untuk tim, minimalnya 6 pcs." },
        { q: "Bisa custom nama dan nomor bib sendiri?", a: "Bisa. Nama pelari, nomor dada, dan logo tim bisa dicustom, bahkan untuk order 1 pcs. Nama tiap anggota tim juga bisa dibuat berbeda-beda dalam satu batch order." },
        { q: "Berapa lama proses produksinya?", a: "Lama produksi tergantung jumlah order dan tingkat kerumitan desain. Karena kami produksi sendiri di pabrik, estimasi waktu yang pasti akan diinformasikan admin saat desain sudah di-ACC. Silakan chat admin untuk cek jadwal produksi terkini." },
        { q: "Gimana cara ordernya?", a: "Lima langkah: chat admin via WhatsApp, pilih dari katalog atau kirim desainmu, ACC desain lalu bayar DP, jersey masuk produksi, terakhir dikirim ke alamatmu. Desain dan revisinya gratis." },
      ],
    },
    closing: { headline: "", headlineAccent: "", sub: "", cta: "", note: "" },
    seo: {
      title: "Jersey Running Custom Ringan & Nyaman — Mulai Rp85.000 | TNT SPORT APPAREL",
      description: "Jersey running custom full printing bahan Dry Fit Premium. Bisa order satuan, gratis desain + revisi bebas. Langsung dari pabrik, sejak 2017. Mulai Rp85.000/pcs.",
    },
    wa: {
      order: "",
      promo: "",
      closing: "",
      atasan: "",
      setelan: "",
      bulk: "",
      gallery: "",
      designTemplate: "",
      },
    },

  corporate: {
    slug: "corporate-collection",
    catalogId: "instansi-corporate",
    eyebrow: "👔 Jersey Corporate Custom",
    headline: ["Bikin Timmu", "Tampil Lebih Profesional."],
    headlineSub: "Custom Logo, Nama, Nomor & Sponsor",
    subheadline:
      "Jersey custom untuk perusahaan, instansi, komunitas, dan tim yang ingin tampil kompak dengan identitas sendiri. Bahan dry-fit, full printing, jahitan rapi.",
    heroImage: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1787562493/k3oijzuk0wkv4yguml2d.png",
    heroImageAlt: "Jersey corporate custom tampak depan",
    heroBadge: { kicker: "Custom Available", text: "Logo · Nama · Nomor · Sponsor" },
    trustBar: [
      "20+ Desain Siap Custom",
      "Full Printing",
      "Free Custom Identitas",
      "Tim & Perusahaan",
    ],
    marquee: ["Corporate", "Perusahaan", "Instansi", "Gathering", "Dry Fit Premium", "Bisa Satuan"],
    problem: {
      headline: ["Bukan Sekadar Seragam.", "Identitas."],
      body: "Jersey corporate yang dirancang untuk berbagai aktivitas perusahaan — mulai dari event, gathering, olahraga, outing, komunitas internal, hingga kegiatan promosi brand.",
      features: [
        { icon: "fast", title: "Dry-Fit Nyaman", desc: "Ringan dan nyaman digunakan untuk berbagai aktivitas." },
        { icon: "print", title: "Full Printing", desc: "Desain dapat disesuaikan dengan identitas visual perusahaan." },
        { icon: "design", title: "Custom Identitas", desc: "Logo perusahaan, nama, nomor, dan sponsor dapat disesuaikan." },
        { icon: "sewing", title: "Jahitan Rapi & Kuat", desc: "Finishing rapi untuk menghasilkan jersey yang nyaman dan profesional." },
      ],
    },
    catalog: {
      orderLabel: "Collection",
      orderHeadline: ["Pilih Desain yang Sesuai", "Karakter Timmu."],
      orderSub: "Beragam desain corporate dengan karakter sporty, modern, dan profesional.",
      orderCards: [],
      orderNote: "",
      designsHeadline: ["Pilih Desain yang Sesuai", "Karakter Timmu."],
      designsSub: "Beragam desain corporate dengan karakter sporty, modern, dan profesional.",
      designsCta: "Pilih Desain",
      designsFootnote: "Desain baru terus ditambahkan tiap bulan.",
    },
    pricing: {
      headline: "Pilih Paket ",
      headlineAccent: "Timmu.",
      sub: "Pilih jumlah pembelian, harga akan menyesuaikan otomatis.",
      atasan: {
        kicker: "Jersey Atasan",
        badge: "FLEKSIBEL",
        name: "Atasan Saja",
        unit: "/pcs",
        prices: { ecer: "75rb", lusin: "65rb" },
        notes: { ecer: "Bisa pesan mulai 1 pcs", lusin: "Minimal pembelian 12 pcs" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
          ],
        },
        cta: "Pilih Atasan",
      },
      setelan: {
        kicker: "Atasan + Celana",
        badge: "PALING DIMINATI",
        name: "Jersey Setelan",
        unit: "/set",
        prices: { ecer: "145rb", lusin: "120rb" },
        notes: { ecer: "Bisa pesan mulai 1 set", lusin: "Minimal pembelian 12 set" },
        points: [
          "Full printing, pilih dari katalog desain",
          "Nama dan nomor punggung",
          "Revisi desain tanpa batas",
          "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
          "Printing sublime, warna cerah dan tahan bertahun-tahun",
          "Celana non printing",
        ],
        pointsByMode: {
          ecer: [
            "Full printing, pilih dari katalog desain",
            "Nama dan nomor punggung",
            "Revisi desain tanpa batas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
            "Celana non printing",
          ],
          lusin: [
            "Bebas desain sendiri atau pilih dari katalog kami",
            "Nama dan nomor punggung, gratis",
            "Revisi desain tanpa batas sampai tim kamu puas",
            "Bahan dry-fit standar liga pro, nyaman dan tidak bau",
            "Printing sublime, warna cerah dan tahan bertahun-tahun",
            "Celana non printing",
          ],
        },
        cta: "Pilih Setelan",
        highlighted: true,
      },
      bulk: {
        headline: "Butuh Lebih dari ",
        accent: "50 Pcs?",
        sub: "Dapatkan harga proyek khusus untuk perusahaan, instansi, komunitas, dan event.",
        cta: "Minta Harga Khusus",
      },
    },
    steps: {
      headline: "Dari Desain ",
      headlineAccent: "Jadi Jersey Timmu.",
      items: [
        { title: "Pilih Desain", desc: "Pilih desain corporate yang paling cocok." },
        { title: "Kirim Data", desc: "Kirim logo, nama, nomor, sponsor, dan detail lainnya." },
        { title: "Proses Custom", desc: "Desain disesuaikan dengan kebutuhan tim." },
        { title: "Siap Digunakan", desc: "Jersey diproses dan siap digunakan untuk aktivitas tim." },
      ],
    },
    testimonials: {
      headline: "Mereka Sudah Tampil Bersama.",
      headlineAccent: "Sekarang Giliran Timmu.",
      sub: "",
      galleryBadge: "",
      galleryTitle: "",
      galleryTitleAccent: "",
      gallerySub: "",
      galleryCta: "",
      gallery: [],
      fallback: [
        { quote: "Jersey corporate dari TNT bikin tim kami keliatan lebih kompak pas company outing. Kualitas bahan beneran adem.", name: "Andi Prasetyo", team: "PT Mitra Solusi", city: "Jakarta" },
        { quote: "Order 50 set buat sports day kantor. Hasilnya rapi semua, warna ga luntur meski udah dicuci berkali-kali.", name: "Rina Wulandari", team: "Bank Digital Nusantara", city: "Bandung" },
        { quote: "Custom logo dan nama perusahaan langsung di jersey. Klien kami sampe nanya jersey-nya pesen dimana.", name: "Budi Santoso", team: "Construction Pro", city: "Surabaya" },
      ],
    },
    purchasePops: [
      { name: "Rina W.", city: "Bandung", product: "Corporate Set 50 set", time: "2 menit lalu" },
      { name: "Andi P.", city: "Jakarta", product: "Corporate Atasan", time: "5 menit lalu" },
      { name: "Budi S.", city: "Surabaya", product: "Corporate Set 30 set", time: "8 menit lalu" },
    ],
    urgency: {
      headline: "Slot Produksi ",
      headlineAccent: "Minggu Ini",
      body: "Order sekarang untuk mendapatkan jadwal produksi minggu ini.",
      cta: "Pesan Sekarang",
      note: "Gratis desain + revisi",
      bgImage: "",
    },
    faqs: {
      headline: "Yang Sering ",
      headlineAccent: "Ditanyakan.",
      items: [
        { q: "Apakah bisa custom logo perusahaan?", a: "Bisa. Logo perusahaan dapat dipasang pada jersey sesuai posisi dan ukuran yang kamu inginkan." },
        { q: "Apakah bisa custom nama dan nomor?", a: "Bisa. Nama dan nomor punggung dapat disesuaikan untuk setiap anggota tim." },
        { q: "Apakah bisa menggunakan desain sendiri?", a: "Bisa. Kamu dapat mengirimkan desain sendiri untuk diproses, atau memilih dari koleksi yang tersedia." },
        { q: "Apakah bisa custom warna sesuai brand perusahaan?", a: "Bisa. Warna jersey dapat disesuaikan dengan warna brand perusahaan." },
        { q: "Apakah tersedia untuk kebutuhan perusahaan dalam jumlah banyak?", a: "Tersedia. Untuk kebutuhan di atas 50 pcs, hubungi kami untuk penawaran harga proyek khusus." },
        { q: "Bagaimana proses pemesanannya?", a: "Pilih desain, kirim data (logo, nama, nomor, sponsor), desain disesuaikan, lalu jersey diproses hingga siap digunakan." },
        { q: "Berapa lama proses produksinya?", a: "Estimasi waktu produksi menyesuaikan jumlah pesanan dan tingkat kerumitan desain. Hubungi kami untuk estimasi pastinya." },
      ],
    },
    closing: {
      headline: "Siap Bikin Timmu",
      headlineAccent: "Tampil Lebih Profesional?",
      sub: "Pilih desain corporate favoritmu, sesuaikan dengan identitas perusahaan, lalu buat jersey untuk timmu.",
      cta: "Pilih Desain Corporate",
      note: "Pilih Desain • Kirim Data • Custom • Selesai",
    },
    seo: {
      title: "Jersey Corporate Custom — Full Printing, Custom Logo & Nameset | TNT SPORT APPAREL",
      description:
        "Jersey corporate custom untuk perusahaan, instansi, dan komunitas. Custom logo, nama, nomor, sponsor. Bahan dry-fit, full printing, jahitan rapi. Mulai dari 65rb/pcs.",
    },
    wa: {
      order: "Halo TNT SPORT APPAREL, saya mau konsultasi desain jersey corporate custom untuk perusahaan saya.",
      promo: "Halo TNT SPORT APPAREL, saya mau klaim promo jersey corporate untuk order minggu ini. Info dong!",
      closing: "Halo TNT SPORT APPAREL, saya mau mulai order jersey corporate custom untuk perusahaan saya.",
      atasan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Corporate Atasan saja. Minta info lengkapnya dong!",
      setelan: "Halo TNT SPORT APPAREL, saya mau pesan Jersey Corporate Setelan atasan + celana. Minta info lengkapnya dong!",
      bulk: "Halo TNT SPORT APPAREL, saya butuh jersey corporate lebih dari 50 pcs buat perusahaan. Minta harga khusus dong!",
      gallery: "Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan di landing corporate, saya mau order seperti itu!",
      designTemplate: "Halo TNT SPORT APPAREL, saya tertarik dengan desain *{design}* di katalog Jersey Corporate. Bisa info lebih lanjut?",
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
