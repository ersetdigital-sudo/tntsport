# `components/` — Komponen UI

Semua komponen React dipakai oleh halaman di `app/`. Struktur folder mengikuti peran, bukan tipe
file.

## `category-landing/` — template landing page kategori

Dipakai oleh **sembilan** landing page kategori (`/jersey-futsal`, `/jersey-voli`, dan seterusnya).
Seluruh isi halaman (copywriting, harga, testimoni, FAQ, CTA WhatsApp) datang dari satu config di
[`lib/category-landing.ts`](../lib/category-landing.ts) — jadi menambah kategori baru berarti
menambah satu entry config, bukan menyalin komponen.

| File | Fungsi |
| --- | --- |
| `CategoryLanding.tsx` | Template utama landing page kategori |
| `CategoryLandingLight.tsx` | Varian tampilan ringan |
| `CategoryDesignGrid.tsx` | Grid desain yang bisa dipesan (order satuan) |
| `PriceSection.tsx` | Kartu harga mode ecer / lusin |
| `GalleryMarquee.tsx` | Marquee galeri foto customer |
| `TestimonialCarousel.tsx` | Carousel testimoni |
| `PurchaseNotifications.tsx` | Pop-up social proof rotasi pembelian |
| `ScrollReveal.tsx` | Animasi muncul saat di-scroll |

## `jersey-*/`, `corporate-collection/`, `fantasy-club/`

Landing page kategori yang punya komponen + CSS kustom sendiri (lebih banyak elemen khas
dibandingkan template umum). Masing-masing terdiri dari `<Nama>Landing.tsx` dan file `.css`
pasangannya.

## `admin/` — dashboard & CMS

| File | Fungsi |
| --- | --- |
| `PesananDashboard.tsx` | Dashboard Pesanan: daftar order, detail order (sheet), update tahap produksi, pengaturan notifikasi deadline, katalog produk |
| `MaklonDashboard.tsx` | Dashboard Maklon: alur terpisah dengan 6 tahap produksi |
| `AdminHeader.tsx`, `AdminSidebar.tsx`, `MobileSidebar.tsx` | Kerangka CMS `/admin` |
| `LoginForm.tsx`, `SignupForm.tsx` | Autentikasi CMS (Supabase Auth) |
| `ProductEditor.tsx`, `ProductSearchGrid.tsx`, `FabricEditor.tsx`, `TestimonialEditor.tsx`, `KatalogFeatureEditor.tsx` | Editor konten katalog |
| `CrudManager.tsx` | CRUD generik untuk konten sederhana |
| `BrandEditor.tsx` | Pengaturan brand (nama, tagline, nomor WhatsApp, URL) |
| `MetricCard.tsx`, `SalesChart.tsx`, `RecentOrdersTable.tsx` | Ringkasan & statistik |
| `ComingSoon.tsx`, `ThemeToggle.tsx` | Helper UI |

> `PesananDashboard.tsx` dan `MaklonDashboard.tsx` adalah dua file terbesar di repo ini. Kalau
> menambah fitur di sana, pertimbangkan memecah bagian yang berdiri sendiri menjadi komponen
> terpisah di folder ini.

## Root `components/`

| Kelompok | Contoh | Dipakai untuk |
| --- | --- | --- |
| Marketing | `HeroSection.tsx`, `PriceCards.tsx`, `FAQ.tsx`, `ClosingCTA.tsx`, `TrustBadges.tsx`, `SocialProof.tsx`, `StatsGrid.tsx`, `StatCard.tsx` | Section landing page utama |
| WhatsApp | `FloatingWhatsApp.tsx`, `WhatsAppCTA.tsx`, `WhatsAppLeadLink.tsx`, `WhatsAppTracker.tsx` | CTA & pelacakan klik WhatsApp |
| Katalog | `ProductCatalog.tsx`, `FabricCatalog.tsx`, `PromoDesignGrid.tsx`, `PhotoGallery.tsx`, `ReviewCard.tsx`, `Reviews.tsx` | Halaman katalog, promo, dan galeri |
| Promo | `FlashSaleBanner.tsx`, `FlashSaleTimer.tsx`, `PromoCountdown.tsx`, `PromoNav.tsx`, `CountdownTimer.tsx` | Promo & flash sale |
| Analytics | `MetaPixel.tsx`, `PageViewTracker.tsx`, `ViewContentTracker.tsx`, `TrackedLink.tsx` | Meta Pixel, page view, event katalog |
| SEO/konten | `SEOContent.tsx`, `ProfileHeader.tsx`, `Footer.tsx` | Blok konten SEO & kerangka halaman |
| Sosial | `SocialLinks.tsx`, `SocialLinkIcon.tsx` | Ikon sosial dengan warna brand asli |
| Primitif | `ui/button.tsx`, `ui/drawer.tsx`, `ui/sheet.tsx`, `ui/marquee.tsx`, `kokonutui/smooth-drawer.tsx` | Komponen dasar (Radix UI + `vaul` + `cva`) |
| Lain-lain | `Badge.tsx`, `Button.tsx`, `Card.tsx`, `CTALinkCard.tsx`, `CTALinks.tsx`, `icons/` | Primitif styling |
