-- ============================================================================
-- TNT Sport — 0027 kalkulator HPP
-- ============================================================================
-- Memindahkan "DATABASE HPP" + "DAFTAR KAIN" dari Excel kalkulator jersey ke
-- database, untuk halaman Kalkulator HPP di dashboard /pesanan/hpp.
--
-- Struktur data (meniru sheet Excel):
--   hpp_items    : kategori, item, variasi, harga, satuan
--   kain_fabrics : grup, nama, harga per kg + hasil jadi per pcs
--                  (1 kg = 4 pcs atasan / 5 pcs celana)
--
-- Aman dijalankan berulang (idempotent). TIDAK menyentuh tabel lain.
-- ============================================================================

create table if not exists public.hpp_items (
  id         bigint generated always as identity primary key,
  kategori   text not null,
  item       text not null,
  variasi    text not null,
  harga      numeric not null check (harga >= 0),
  satuan     text not null default 'pcs',
  position   int not null default 0,
  updated_at timestamptz not null default now(),
  unique (item, variasi)
);

create table if not exists public.kain_fabrics (
  id           bigserial primary key,
  grup         text not null,
  nama         text not null,
  harga_per_kg numeric not null,
  harga_atasan numeric,
  harga_celana numeric,
  position     int not null default 0,
  updated_at   timestamptz not null default now()
);

-- RLS aktif TANPA policy anon: hanya service role yang membaca, dan hanya
-- SETELAH login dashboard diverifikasi di server (lib/hpp-server.ts).
alter table public.hpp_items enable row level security;
alter table public.kain_fabrics enable row level security;
grant select, insert, update on public.hpp_items to service_role;
grant usage on sequence public.hpp_items_id_seq to service_role;
grant select, insert, update on public.kain_fabrics to service_role;
grant usage on sequence public.kain_fabrics_id_seq to service_role;

-- ---------------------------------------------------------------------------
-- Seed — 29 baris database HPP (padanan sheet DATABASE HPP di Excel).
-- on conflict: harga di-refresh supaya id stabil untuk referensi manual.
-- ---------------------------------------------------------------------------
insert into public.hpp_items (kategori, item, variasi, harga, satuan, position) values
  ('Kain',           'Kain Atasan',       'Basic',             18750, 'pcs',   1),
  ('Kain',           'Kain Celana',       'Basic',             15000, 'pcs',   2),
  ('Kain',           'Kain Atasan',       'Premium',           21250, 'pcs',   3),
  ('Kain',           'Kain Celana',       'Premium',           17000, 'pcs',   4),
  ('Kain',           'Kain Atasan',       'Pro',               23750, 'pcs',   5),
  ('Kain',           'Kain Celana',       'Pro',               19000, 'pcs',   6),
  ('Print/Press',    'Print Atasan',      'Atasan',            25000, 'pcs',   7),
  ('Print/Press',    'Print Celana',      'Celana',            15000, 'pcs',   8),
  ('Jahit Atasan',   'Jahit Atasan',      'Basic',              9000, 'pcs',   9),
  ('Jahit Atasan',   'Jahit Atasan',      'Premium',           11000, 'pcs',  10),
  ('Jahit Atasan',   'Jahit Atasan',      'Pro',               13000, 'pcs',  11),
  ('Jahit Celana',   'Jahit Celana',      'Basic',              5000, 'pcs',  12),
  ('Jahit Celana',   'Jahit Celana',      'Premium',            5500, 'pcs',  13),
  ('Jahit Celana',   'Jahit Celana',      'Pro',                6000, 'pcs',  14),
  ('Logo',           'Logo',              'Woven',              6000, 'pcs',  15),
  ('Logo',           'Logo',              'Tatami',            10000, 'pcs',  16),
  ('Logo',           'Logo',              '3D UV',             15000, 'pcs',  17),
  ('Logo',           'Logo',              '3D Rubber',         19000, 'pcs',  18),
  ('Collar',         'Rib Collar',        'Polly',              6000, 'pcs',  19),
  ('Collar',         'Rib Collar',        'Kasmilon',           8000, 'pcs',  20),
  ('Collar',         'Rib Collar',        'Jaquard',           15000, 'pcs',  21),
  ('Cuff',           'Rib Cuff',          'Polly',              8000, 'set',  22),
  ('Cuff',           'Rib Cuff',          'Kasmilon',          12000, 'set',  23),
  ('Cuff',           'Rib Cuff',          'Jaquard',           15000, 'set',  24),
  ('Namset',         'Namset',            'DTF',                8000, 'set',  25),
  ('Namset',         'Namset',            'Poliflek',          25000, 'set',  26),
  ('Namset',         'Namset',            'Printable',         50000, 'set',  27),
  ('Operasional',    'Biaya Tak Terduga', 'Biaya Tak Terduga',  5000, 'set',  28),
  ('DTF',            'DTF',               'DTF',                5000, 'pcs',  29)
on conflict (item, variasi) do update
  set harga = excluded.harga, kategori = excluded.kategori, satuan = excluded.satuan, position = excluded.position;

-- Seed kain — 11 baris (padanan sheet DAFTAR KAIN di Excel), idempotent:
-- skip kalau kombinasi grup+nama sudah ada.
insert into public.kain_fabrics (grup, nama, harga_per_kg, harga_atasan, harga_celana, position)
select * from (values
  ('Kain Basic','JARUM',75000::numeric,18750::numeric,15000::numeric,1),
  ('Kain Basic','MILANO',75000::numeric,18750::numeric,15000::numeric,2),
  ('Kain Basic','SMASH',75000::numeric,18750::numeric,15000::numeric,3),
  ('Kain Basic','RHABIT',75000::numeric,18750::numeric,15000::numeric,4),
  ('Kain Premium','PUMA',85000::numeric,21250::numeric,17000::numeric,5),
  ('Kain Premium','AIRWALK',85000::numeric,21250::numeric,17000::numeric,6),
  ('Kain Premium','EMBOSS',85000::numeric,21250::numeric,17000::numeric,7),
  ('Kain Premium','RHABIT',85000::numeric,21250::numeric,17000::numeric,8),
  ('Kain Premium','DROPNIDLE',85000::numeric,null::numeric,null::numeric,9),
  ('Kain Pro','JAQUARD',95000::numeric,23750::numeric,19000::numeric,10),
  ('Kain Pro','UV',95000::numeric,23750::numeric,19000::numeric,11)
) as seed(grup, nama, harga_per_kg, harga_atasan, harga_celana, position)
where not exists (
  select 1 from public.kain_fabrics k
  where k.grup = seed.grup and k.nama = seed.nama
);
