-- ============================================================================
-- TNT SPORT — Rebrand migration
-- ============================================================================
-- Run this in the Supabase SQL Editor AFTER 0001_init.sql. It updates the
-- seed data from the old "TCC JERSEY" brand to "TNT SPORT" and refreshes
-- all landing tables to match lib/data.ts.
--
-- Idempotent: safe to re-run. Wipes landing rows (stats/cta_links/reviews/
-- social_links) before re-seeding; never touches product/catalog tables.
-- ============================================================================

-- Brand row (single row, id = 1).
update public.brand set
  name            = 'TNT SPORT',
  accent_word     = 'SPORT',
  monogram        = 'TNT',
  tagline         = 'Pabrik Jersey Custom Full Printing.
Desain bebas, harga pabrik, kirim se-Indonesia.',
  url             = 'https://tntsport.id',
  description     = 'TNT SPORT — pabrik jersey custom full printing. Desain bebas, harga mulai 65rb, kirim se-Indonesia. Konsultasi gratis via WhatsApp.',
  whatsapp_number = '6281234567890',
  logo_path       = '/logo.jpg',
  updated_at      = now()
where id = 1;

-- Wipe + re-seed landing content.
delete from public.stats;
delete from public.cta_links;
delete from public.reviews;
delete from public.social_links;

insert into public.stats (value, label, icon, sort_order) values
  ('350K+',       'Order Selesai',    null,        1),
  ('9K+',         'Klien Puas',       null,        2),
  ('65rb',        'Mulai Dari',       null,        3),
  ('Tepat Waktu', 'Produksi & Kirim', 'BoltIcon',  4);

insert into public.cta_links (title, description, href, accent, icon, sort_order) values
  ('Chat WhatsApp', 'Gratis konsultasi — tanya desain, harga, estimasi.',
   'https://wa.me/6281234567890?text=Halo%20TNT%20SPORT%2C%20saya%20mau%20konsultasi%20soal%20jersey%20custom.',
   'whatsapp', 'WhatsAppIcon', 1),
  ('Lihat Katalog & Harga Lengkap', 'Browse model jersey + harga mulai 65rb.',
   'https://tntsport.id/katalog',
   'primary', 'CatalogIcon', 2),
  ('Klaim Promo Beli 6 Gratis 1', 'Promo terbatas — klaim sebelum kuota habis.',
   'https://wa.me/6281234567890?text=Halo%20TNT%20SPORT%2C%20saya%20mau%20klaim%20promo%20Beli%206%20Gratis%201.',
   'warning', 'GiftIcon', 3),
  ('Promo Beli 6 Gratis 1 — Detail', 'Belanja 6 jersey, dapatkan 1 jersey gratis. Berlaku semua model.',
   null, 'neutral', 'InfoIcon', 4);

insert into public.reviews (rating, quote, name, location, sort_order) values
  (5, 'Hasil printingnya rapi banget, warna sesuai desain. Anak tim langsung senang. Pasti repeat order!',
   'Dimas Pratama', 'Jakarta', 1),
  (5, 'Harga pabrik beneran. Order 30 jersey buat komunitas, semua ukuran pas. Recommended pol.',
   'Rizky Maulana', 'Surabaya', 2),
  (5, 'CS-nya responsif, desain direvisi sampe cocok. Pengiriman cepat ke Bandung. Top.',
   'Andi Saputra', 'Bandung', 3);

insert into public.social_links (label, href, icon, aria_label, sort_order) values
  ('WhatsApp',  'https://wa.me/6281234567890',              'WhatsAppIcon',  'TNT SPORT di WhatsApp',    1),
  ('Instagram', 'https://instagram.com/tntsport',           'InstagramIcon', 'TNT SPORT di Instagram',   2),
  ('TikTok',    'https://tiktok.com/@tntsport',             'TikTokIcon',    'TNT SPORT di TikTok',      3),
  ('Facebook',  'https://facebook.com/tntsport',            'FacebookIcon',  'TNT SPORT di Facebook',    4),
  ('Maps',      'https://maps.google.com/?q=TNT+SPORT',     'MapsIcon',      'Lokasi TNT SPORT di Google Maps', 5);
