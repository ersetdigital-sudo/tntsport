/**
 * Fallback content for the TNT SPORT landing page.
 *
 * These values are used by lib/queries.ts when Supabase is unreachable
 * or returns no rows. Edit the live values from the admin panel once
 * the database is seeded — this file is the safety net, not the source
 * of truth at runtime.
 */
import {
  BagIcon,
  BoltIcon,
  FacebookIcon,
  GiftIcon,
  GridIcon,
  InstagramIcon,
  MapsIcon,
  PaletteIcon,
  ShieldIcon,
  StarIcon,
  TagIcon,
  TikTokIcon,
  TruckIcon,
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
  { label: "Bahan Premium", subtext: "Kualitas terbaik", icon: ShieldIcon, variant: "success" },
  { label: "Desain Bebas", subtext: "Sesuai keinginanmu", icon: PaletteIcon, variant: "info" },
  { label: "Harga Pabrik", subtext: "Lebih hemat", icon: TagIcon, variant: "neutral" },
  { label: "Kirim Se-Indonesia", subtext: "Aman & terpercaya", icon: TruckIcon, variant: "success" },
];

export const stats: StatItem[] = [
  { value: "350K+", label: "Order Selesai", icon: BagIcon },
  { value: "4.9", label: "Rating", icon: StarIcon },
  { value: "100%", label: "Garansi", icon: ShieldIcon },
];

const waLink = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
  "Halo TNT SPORT, saya mau konsultasi soal jersey custom."
)}`;

export const ctaLinks: CTALink[] = [
  {
    title: "Lihat Katalog & Harga Lengkap",
    description: "Pilihan model, bahan, dan harga terbaru",
    icon: GridIcon,
    accent: "primary",
    href: `${brand.url}/katalog`,
    external: true,
  },
  {
    title: "Chat WhatsApp",
    description: "Order & tanya desain langsung ke admin",
    icon: WhatsAppIcon,
    accent: "whatsapp",
    href: waLink,
    external: true,
  },
  {
    title: "PROMO BELI 6 GRATIS 1",
    description: "Berlaku kelipatannya — 12 dapat 14, dst",
    icon: GiftIcon,
    accent: "warning",
    href: waLink,
    external: true,
  },
  {
    title: "Order Sekarang",
    description: "Proses pemesanan cepat untuk jersey custom",
    icon: BoltIcon,
    accent: "neutral",
    href: waLink,
    external: true,
  },
];

export const reviews: Review[] = [
  {
    rating: 5,
    quote:
      "Hasil printingnya rapi banget, warna sesuai desain. Anak tim langsung senang. Pasti repeat order!",
    name: "Dimas Pratama",
    location: "Jakarta",
    identity: "Kapten Tim Futsal",
  },
  {
    rating: 5,
    quote:
      "Harga pabrik beneran. Order 30 jersey buat komunitas, semua ukuran pas. Recommended pol.",
    name: "Rizky Maulana",
    location: "Surabaya",
    identity: "Koordinator Komunitas",
  },
  {
    rating: 5,
    quote:
      "CS-nya responsif, desain direvisi sampe cocok. Pengiriman cepat ke Bandung. Top.",
    name: "Andi Saputra",
    location: "Bandung",
    identity: "Tim Hockey Bandung",
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
