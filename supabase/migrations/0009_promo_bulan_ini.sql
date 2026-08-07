-- ============================================================================
-- TNT SPORT — Promo Bulan Ini (landing)
-- ============================================================================
-- Run this AFTER 0008_fabrics.sql.
--
-- 1. Adds the 'danger' value to the cta_accent enum (used by the
--    "Promo Bulan Ini" CTA card).
-- 2. Seeds/refreshes a "Promo Bulan Ini" row in cta_links so the link is
--    editable from /admin/cta-links.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1) Extend cta_accent enum with 'danger'
-- ----------------------------------------------------------------------------
do $$ begin
  alter type public.cta_accent add value if not exists 'danger';
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- 2) Seed "Promo Bulan Ini" CTA (idempotent: replace any existing row)
-- ----------------------------------------------------------------------------
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