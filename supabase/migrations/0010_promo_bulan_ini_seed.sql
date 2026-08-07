-- ============================================================================
-- TNT SPORT — Promo Bulan Ini (bagian 2: seed CTA)
-- ============================================================================
-- Jalankan SETELAH 0009_promo_bulan_ini.sql (enum 'danger' sudah ada).
-- Seed CTA "Promo Bulan Ini" ke tabel cta_links sehingga link-nya bisa
-- diubah dari /admin/cta-links. Idempotent: replace baris yang ada.
-- ============================================================================
delete from public.cta_links where title = 'Promo Bulan Ini';

insert into public.cta_links (title, description, href, accent, icon, sort_order)
values (
  'Promo Bulan Ini',
  'Cek promo terbaru & penawaran spesial bulan ini',
  'https://www.tntsportapparel.id/promo-bulan-ini',
  'danger',
  'FlameIcon',
  100
);