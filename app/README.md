# `app/` — Halaman & API routes

Folder ini berisi seluruh routing Next.js 15 (App Router): halaman publik, halaman tracking, dua
dashboard operasional, CMS admin, dan semua endpoint API.

## Halaman publik (customer)

| Route | File | Isi |
| --- | --- | --- |
| `/` | `page.tsx` | Landing page utama: hero, katalog, harga, testimoni, CTA WhatsApp |
| `/jersey-futsal`, `/jersey-voli`, `/jersey-basket`, `/jersey-mancing`, `/jersey-racing`, `/jersey-army`, `/jersey-badminton`, `/jersey-running` | `jersey-*/page.tsx` | Landing page per cabang olahraga |
| `/corporate-collection`, `/fantasy-club` | `corporate-collection/`, `fantasy-club/` | Landing page dengan komponen + CSS sendiri |
| `/katalog` | `katalog/page.tsx` | Katalog desain dari Supabase, filter kategori, link order WA |
| `/promo-bulan-ini` | `promo-bulan-ini/page.tsx` | Promo berjalan + flash sale |
| `/karier` | `karier/page.tsx` | Halaman rekrutmen |

Halaman kategori di atas memakai template dan config yang sama, lihat
[`lib/category-landing.ts`](../lib/category-landing.ts) dan
[`components/category-landing/`](../components/category-landing/).

## Tracking customer

| Route | Isi |
| --- | --- |
| `/track` | Form verifikasi (nomor order + nomor HP), lalu dapat token sesi |
| `/track/[orderNumber]` | Detail tracking per order (`TrackDetailClient.tsx` untuk UI-nya) |
| `/status` | Halaman status yang dibuka dari link WhatsApp — pakai `?order=...&token=...` supaya tidak perlu verifikasi ulang |
| `/status/maklon` | Halaman tracking khusus pesanan maklon (6 tahap) |

**Penting:** link tracking yang dikirim lewat WhatsApp memakai token HMAC bertanda tangan yang
berlaku 30 hari (`lib/verify-token.ts`). Jangan mengubah format token tanpa menyesuaikan kedua sisi.

## Dashboard operasional

| Route | Isi |
| --- | --- |
| `/pesanan/orders` | **Dashboard Pesanan** — daftar order jersey, update tahap produksi (memicu WA), edit data order, foto design/WO |
| `/pesanan/maklon` | **Dashboard Maklon** — order maklon, 6 tahap produksi (memicu WA) |
| `/pesanan/login` | Login shared password (cookie `pesanan_auth`) |

Login dashboard ini **bukan** Supabase Auth. Aksesnya dicek di server lewat
`hasAdminAccess()` di [`lib/admin-auth.ts`](../lib/admin-auth.ts) (menerima cookie `pesanan_auth`
atau user Supabase terautentikasi).

## CMS admin

`/admin/*` memakai Supabase Auth (login & signup ada di `admin/login` dan `admin/signup`):

`admin/page.tsx` (ringkasan + grafik penjualan), `admin/products`, `admin/categories`,
`admin/fabrics`, `admin/katalog-features`, `admin/katalog-testimonials`, `admin/reviews`,
`admin/brand`, `admin/cta-links`, `admin/social-links`, `admin/trust-badges`,
`admin/stats`, `admin/orders`.

Semua halaman ini mengelola konten yang dibaca halaman publik lewat `lib/queries.ts`.

## API routes

| Endpoint | Fungsi |
| --- | --- |
| `GET/POST /api/pesanan/orders` | Daftar & tambah order jersey |
| `PATCH /api/pesanan/orders/[id]/status` | **Update tahap produksi jersey** — menulis status, riwayat, dan memicu notifikasi WA |
| `GET/PATCH/DELETE /api/pesanan/orders/[id]` | Detail / ubah / hapus order |
| `GET/POST /api/pesanan/maklon` | Daftar & tambah order maklon |
| `GET/PATCH/DELETE /api/pesanan/maklon/[id]` | Detail / ubah / hapus order maklon |
| `PATCH /api/pesanan/maklon/[id]/status` | **Update tahap produksi maklon** — sama, dengan 6 tahap |
| `POST /api/pesanan/auth` | Login dashboard Pesanan (shared password) |
| `POST /api/track` | Verifikasi nomor order + HP, mengembalikan token sesi |
| `GET /api/track/session` | Validasi token & ambil data order terbaru |
| `POST /api/track/ensure-history` | Backfill riwayat status supaya timeline selalu lengkap |
| `GET /api/admin/deadline-notif` | **Pengingat deadline** — dipanggil scheduler, mengirim WA ke admin |
| `GET/PATCH /api/admin/settings/deadline-notif` | Pengaturan pengingat deadline |
| `GET/POST /api/admin/settings/fonnte` | Pengaturan token Fonnte (disimpan terenkripsi) |
| `POST /api/admin/settings/fonnte/test` | Kirim WA percobaan |
| `GET /api/admin/orders`, `PATCH /api/admin/orders/[id]/status` | Order untuk CMS admin |
| `GET /api/admin/notif-logs` | Log pengiriman notifikasi |
| `POST /api/upload/design` | Upload foto design/WO ke Cloudinary |
| `POST /api/capi` | Relay Conversions API Meta (server-side event) |
| `GET /api/og/katalog` | Generate Open Graph image dinamis untuk halaman katalog |
| `GET/PUT /api/pesanan/steps` | Ambil / update daftar tahap produksi (`production_steps`) |
| `GET /api/pesanan/maklon/steps` | Ambil daftar tahap produksi maklon (`maklon_steps`) |
| `GET/POST /api/admin/profil-toko` | Pengaturan profil toko (nama, nomor HP, jam operasional) |
| `GET /api/brand` | Data brand untuk client |
| `POST /api/debug/test-history` | Endpoint debug manual untuk menguji insert riwayat (lihat catatan di bawah) |

### Catatan penting untuk developer

- **Jangan tambah atau ubah tahap produksi tanpa menyesuaikan tiga tempat**: `lib/types.ts`
  (`ORDER_STATUS_LIST`), `lib/order-status.ts` (aturan progress), dan `lib/fonnte.ts` (nama tahap
  di template WA).
- **`/api/pesanan/*` berjalan dengan anon key** (tanpa session Supabase), jadi operasi tulisnya
  dibungkus RPC `SECURITY DEFINER` di `supabase/migrations/0020_fonnte_rpc.sql`. Jangan ganti jadi
  query tabel langsung — RLS akan memblokirnya.
- **`POST /api/debug/test-history` tidak dipakai UI mana pun.** Endpoint ini menulis dan menghapus
  baris di `order_status_history` (dan melakukan backfill) untuk nomor order apa pun tanpa
  autentikasi, jadi jangan diekspos sebagai fitur. Kandidat untuk dihapus kalau sudah tidak
  dibutuhkan.
- `sitemap.xml/` adalah route handler dinamis (bukan file XML statis) yang membaca brand URL dan
  katalog dari Supabase.
