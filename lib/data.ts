/**
 * Fallback content for the TNT SPORT landing page.
 *
 * These values are used by lib/queries.ts when Supabase is unreachable
 * or returns no rows. Edit the live values from the admin panel once
 * the database is seeded — this file is the safety net, not the source
 * of truth at runtime.
 */
import {
  BoltIcon,
  CatalogIcon,
  CheckIcon,
  FacebookIcon,
  FactoryIcon,
  GiftIcon,
  InfoIcon,
  InstagramIcon,
  MapsIcon,
  StarIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";
import type {
  Brand,
  CTALink,
  Review,
  SocialLink,
  StatItem,
  TrustBadge,
} from "@/lib/types";

export const brand: Brand = {
  name: "TNT SPORT",
  accentWord: "SPORT",
  monogram: "TNT",
  tagline: "Pabrik Jersey Custom Full Printing.\nDesain bebas, harga pabrik, kirim se-Indonesia.",
  url: "https://tntsport.id",
  description:
    "TNT SPORT — pabrik jersey custom full printing. Desain bebas, harga mulai 65rb, kirim se-Indonesia. Konsultasi gratis via WhatsApp.",
  whatsappNumber: "6281234567890",
  logoPath: "/logo.jpg",
};

export const trustBadges: TrustBadge[] = [
  { label: "Langsung Pabrik", icon: FactoryIcon, variant: "neutral" },
  { label: "4.9 Rating", icon: StarIcon, variant: "info" },
  { label: "350K+ Order Selesai", icon: CheckIcon, variant: "success" },
];

export const stats: StatItem[] = [
  { value: "350K+", label: "Order Selesai" },
  { value: "9K+", label: "Klien Puas" },
  { value: "65rb", label: "Mulai Dari" },
  { value: "Tepat Waktu", label: "Produksi & Kirim", icon: BoltIcon },
];

const waLink = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
  "Halo TNT SPORT, saya mau konsultasi soal jersey custom."
)}`;

export const ctaLinks: CTALink[] = [
  {
    title: "Chat WhatsApp",
    description: "Gratis konsultasi — tanya desain, harga, estimasi.",
    icon: WhatsAppIcon,
    accent: "whatsapp",
    href: waLink,
    external: true,
  },
  {
    title: "Lihat Katalog & Harga Lengkap",
    description: "Browse model jersey + harga mulai 65rb.",
    icon: CatalogIcon,
    accent: "primary",
    href: `${brand.url}/katalog`,
    external: true,
  },
  {
    title: "Klaim Promo Beli 6 Gratis 1",
    description: "Promo terbatas — klaim sebelum kuota habis.",
    icon: GiftIcon,
    accent: "warning",
    href: waLink,
    external: true,
  },
  {
    title: "Promo Beli 6 Gratis 1 — Detail",
    description: "Belanja 6 jersey, dapatkan 1 jersey gratis. Berlaku semua model.",
    icon: InfoIcon,
    accent: "neutral",
  },
];

export const reviews: Review[] = [
  {
    rating: 5,
    quote:
      "Hasil printingnya rapi banget, warna sesuai desain. Anak tim langsung senang. Pasti repeat order!",
    name: "Dimas Pratama",
    location: "Jakarta",
  },
  {
    rating: 5,
    quote:
      "Harga pabrik beneran. Order 30 jersey buat komunitas, semua ukuran pas. Recommended pol.",
    name: "Rizky Maulana",
    location: "Surabaya",
  },
  {
    rating: 5,
    quote:
      "CS-nya responsif, desain direvisi sampe cocok. Pengiriman cepat ke Bandung. Top.",
    name: "Andi Saputra",
    location: "Bandung",
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "WhatsApp",
    icon: WhatsAppIcon,
    href: waLink,
    ariaLabel: "TNT SPORT di WhatsApp",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://instagram.com/tntsport",
    ariaLabel: "TNT SPORT di Instagram",
  },
  {
    label: "TikTok",
    icon: TikTokIcon,
    href: "https://tiktok.com/@tntsport",
    ariaLabel: "TNT SPORT di TikTok",
  },
  {
    label: "Facebook",
    icon: FacebookIcon,
    href: "https://facebook.com/tntsport",
    ariaLabel: "TNT SPORT di Facebook",
  },
  {
    label: "Maps",
    icon: MapsIcon,
    href: "https://maps.google.com/?q=TNT+SPORT",
    ariaLabel: "Lokasi TNT SPORT di Google Maps",
  },
];
