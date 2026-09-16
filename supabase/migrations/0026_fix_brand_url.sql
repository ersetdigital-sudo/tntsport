-- ============================================================
-- 0026: Perbaiki domain brand (tntsport.id -> www.tntsportapparel.id)
-- ============================================================
-- brand.url diset ke 'https://tntsport.id' oleh 0002_rebrand_tnt.sql, padahal
-- domain produksi adalah https://www.tntsportapparel.id.
--
-- Dampaknya: /sitemap.xml dan /robots.txt di-generate dari brand.url, sehingga
-- sitemap yang ada di www.tntsportapparel.id berisi 212 URL host tntsport.id.
-- Google menolak semuanya dengan error "URL tidak diperbolehkan untuk Peta
-- Situs di lokasi ini" (setiap URL di sitemap harus satu host dengan lokasi
-- file sitemap). Nilai yang sama juga jadi metadataBase + canonical di semua
-- halaman.
--
-- Idempotent: safe to re-run.

update public.brand set
  url        = 'https://www.tntsportapparel.id',
  updated_at = now()
where id = 1;

-- CTA links ikut menyimpan domain lama.
update public.cta_links
set href = replace(href, '//tntsport.id', '//www.tntsportapparel.id')
where href like '%//tntsport.id%';
