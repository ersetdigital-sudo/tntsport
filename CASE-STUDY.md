# TNT Sport Apparel — Business Process Automation Case Study

Bagaimana operasional harian pabrik jersey custom pindah dari chat manual ke sistem yang meng-update customer **secara otomatis** — dan admin cukup melakukan satu aksi per order.

Semua detail di bawah diambil dari source code repo ini, bukan estimasi atau asumsi.
Website production: **[www.tntsportapparel.id](https://www.tntsportapparel.id)**

---

## 1. Problem

Sebelum sistem ini ada, seluruh operasional bergantung pada chat WhatsApp manual — dan itu menimbulkan empat masalah yang berulang setiap hari:

**Order dan progress hanya hidup di kepala admin.**
Tidak ada satu sumber data yang bisa dibuka bersama. Tahap produksi dicatat manual, dan kalau admin lupa, order bisa berhenti diam-diam di tengah jalan.

**Update ke customer diketik satu per satu.**
Setiap produksi naik tahap, admin harus membuka chat customer, mengetik pesan progress, dan mengirimnya. Saat order ramai, pekerjaan ini yang pertama tertunda — dan yang pertaya memicu pertanyaan customer.

**Customer harus bertanya untuk tahu progress.**
Tidak ada tempat self-service. Pertanyaan *"pesananku sudah sampai mana?"* datang berulang, dan setiap pertanyaan menyita waktu admin.

**Deadline produksi tidak punya pengingat.**
Order yang harusnya dikejar hari ini baru tersadar saat customer komplain. Keterlambatan terdeteksi dari arah yang salah.

Semua ini punya akar yang sama: **informasi produksi tersebar di mana-mana, dan tidak ada sistem yang menyebarkannya.**

## 2. Solution

Sistem ini memindahkan seluruh alur ke tiga lapis yang saling menopang:

**1. Single source of truth untuk order & produksi.**
Setiap pesanan tersimpan di database dengan tahap produksi aktif (`orders.current_stage`) dan riwayat perubahannya (`order_status_history`). Tidak ada lagi "maaf, saya cek dulu" — datanya selalu ada di satu tempat.

**2. Dashboard admin sebagai satu-satunya titik update.**
Admin mengubah tahap produksi dari satu layar. Sistem menyebar konsekuensinya otomatis: progress dihitung ulang, riwayat dicatat, dan customer menerima notifikasi WhatsApp.

**3. Halaman tracking self-service untuk customer.**
Customer membuka progres pesanannya sendiri lewat link di pesan WhatsApp (token bertanda tangan, berlaku 30 hari) atau lewat halaman tracking dengan verifikasi nomor HP.

Hasil akhirnya begini: **admin mengerjakan satu aksi — pindah tahap — dan sistem menyelesaikan sisanya.** Pencatatan, perhitungan, riwayat, dan komunikasi ke customer jalan tanpa disentuh.

## 3. Production Workflow (11 Tahap)

Alur produksi jersey dipecah menjadi 11 tahap, dipakai konsisten oleh dashboard admin, halaman tracking customer, dan template pesan WhatsApp — jadi tidak ada istilah yang beda antara satu tempat dan tempat lain:

| # | Tahap | Status di database | Progress |
| --- | --- | --- | --- |
| 1 | Desain | `desain` | 9% |
| 2 | Layout | `layout` | 18% |
| 3 | Profing Warna | `profing_warna` | 27% |
| 4 | Cetak / Print | `cetak_print` | 36% |
| 5 | Press / Transfer Sublime | `press_transfer` | 45% |
| 6 | Potong Pola / Cutting Panel | `potong_pola` | 55% |
| 7 | Jahit / Sewing | `jahit` | 64% |
| 8 | Finishing | `finishing` | 73% |
| 9 | Quality Control | `quality_control` | 82% |
| 10 | Packing | `packing` | 91% |
| 11 | Kirim | `kirim` → `selesai` | 100% |

Detail yang penting secara operasional:

- **Tahap akhir menuntaskan order.** Pindah ke `Kirim` otomatis menjadikan status `selesai` dan progress 100% — tidak perlu menunggu nomor resi.
- **Nomor resi opsional.** Kalau diisi, halaman tracking menampilkan ekspedisi, nomor resi, dan tombol lacak. Kalau kosong, customer melihat status "Selesai".
- **Riwayat tidak pernah hilang.** Setiap perubahan tahap menulis entri baru di `order_status_history` — inilah timeline yang dilihat customer.
- **Data lama tetap terbaca.** Order dengan penamaan tahap versi lama (`print`, `pres`, `potong`) dinormalisasi otomatis, tanpa migrasi manual.
- **Maklon punya alur sendiri.** Pesanan maklon dipisahkan dalam tabel sendiri dengan 6 tahap (Layout → Profing Warna → Cutting Bahan → Press Sublime → QC → Kirim), dashboard sendiri, dan halaman tracking sendiri.

## 4. WhatsApp Automation

**Problem.** Update progress ke customer adalah pekerjaan berulang yang menyita waktu dan paling mudah terlewat saat order ramai.

### Alur

```mermaid
flowchart LR
    A[Admin Update Status] --> B[System Detects Status Change]
    B --> C[Automation Trigger]
    C --> D[Fonnte WhatsApp API]
    D --> E[Customer Receives WhatsApp]
```

1. Admin memilih tahap baru di timeline produksi, lalu menyimpan.
2. Endpoint membandingkan tahap baru dengan tahap sebelumnya di database (`previousStage`).
3. Kalau tahap **benar-benar berubah**, sistem menyusun pesan dan mengklaim slot pengiriman lewat RPC `claim_stage_notification`.
4. Kalau klaim berhasil, pesan dikirim lewat Fonnte API. Kalau slot sudah pernah diklaim — klik dobel, request kembar — pengiriman dilewati.
5. Hasil pengiriman (sukses/gagal + respons API) dicatat ke `notification_logs`.

### Isi notifikasi

- **Tahap 1–10** (template `UPDATE PESANAN`): nama customer, nomor pesanan, nama tahap aktif, progress `n/11`, dan link tracking bertoken.
- **Tahap 11** (template `PESANAN DIKIRIM`): pesanan selesai diproduksi, masuk pengiriman, plus link tracking.
- **Maklon** (template `UPDATE MAKLON` / `MAKLON DIKIRIM`): sama, dengan progress `n/6`.

### Keputusan teknis yang menjaga data produksi tetap aman

| Masalah | Penanganan di sistem |
| --- | --- |
| Customer dapat WA dobel | Unique `(order_id, stage)` di `notification_logs` + RPC klaim atomik |
| Klik simpan berkali-kali | Tahap yang sama tidak memicu pengiriman ulang (`skipped_same_stage`) |
| WA gagal, status order ikut gagal | Update status disimpan lebih dulu; hasil WA hanya dicatat |
| Token Fonnte bocor ke browser | Token dienkripsi di `app_settings`, didekripsi server-side saja |
| Dashboard tidak punya session Supabase | Operasi DB dibungkus RPC `SECURITY DEFINER`, tabel tetap RLS |
| Customer harus verifikasi ulang dari link WA | Token tracking bertanda tangan HMAC, berlaku 30 hari |

## 5. Deadline Automation

**Problem.** Deadline produksi tidak punya pengingat otomatis. Order yang harusnya dikejar hari ini baru tersadar saat customer menanyakan.

### Alur

```mermaid
flowchart LR
    A[Scheduler / GitHub Actions] --> B[Deadline Checking API]
    B --> C[Identifikasi Order Mendekati Deadline]
    C --> D[Fonnte WhatsApp API]
    D --> E[Admin Menerima WhatsApp]
```

1. Scheduler memanggil `GET /api/admin/deadline-notif` dengan `CRON_SECRET`.
2. Endpoint membaca pengaturan dari `app_settings`: aktif/nonaktif, jam kirim, ambang hari (default `3,2,1`), daftar nomor admin.
3. Order yang belum selesai difilter berdasarkan selisih hari ke deadline.
4. Ringkasan dikirim ke setiap nomor admin lewat Fonnte — pengiriman per nomor jalan paralel supaya tidak mentok batas durasi function.
5. Order yang berhasil dinotifikasi ditandai `deadline_notified_at`, dan tanggal kirim dicatat di `deadline_notif_last_sent_date`.

### Pengingat bertahap

Ambang hari default adalah **H-3, H-2, H-1** (bisa diubah dari dashboard). Order yang sama mendapat pengingat bertahap saat makin dekat deadline — bukan satu peringatan tunggal yang gampang terlewat.

### Penjagaan supaya tidak spam

| Risiko | Penanganan |
| --- | --- |
| Endpoint dipanggil berkali-kali dalam sehari | Flag harian `deadline_notif_last_sent_date` (tanggal WIB) |
| Order yang sama dinotifikasi dobel | Dedup per order lewat `orders.deadline_notified_at` |
| Order yang sudah kelar ikut diingatkan | Order berstatus `selesai` dilewati |
| Endpoint dipanggil sebelum jam kirim | Pengecekan berbasis window; membalas jelas "belum waktunya" |
| Gangguan sesaat database | Endpoint membalas `503` supaya eksekusi berikutnya mencoba lagi |

## 6. Technical Implementation

| Lapisan | Implementasi |
| --- | --- |
| Frontend | Next.js 15 App Router + React 19 + TypeScript + Tailwind CSS |
| Halaman kategori | Satu template (`components/category-landing/`) + satu config (`lib/category-landing.ts`) untuk 9 kategori |
| Database | Supabase Postgres dengan RLS; anon hanya bisa baca, write khusus admin terautentikasi |
| Skema | 24 file migrasi (`supabase/migrations/0001` → `0025`), termasuk RPC notifikasi |
| Riwayat & audit | `order_status_history`, `maklon_status_history`, `notification_logs`, `page_views` |
| Media | Cloudinary unsigned upload + kompresi gambar di browser sebelum upload |
| Auth admin | Supabase Auth untuk CMS `/admin`, shared password cookie untuk dashboard `/pesanan` |
| Proteksi endpoint | `CRON_SECRET` untuk endpoint cron, rate limit per order untuk update tahap |
| Tracking customer | Token HMAC bertanda tangan (`lib/verify-token.ts`) + verifikasi nomor HP |
| SEO | Metadata per halaman, sitemap dinamis, robots, JSON-LD schema.org, `llms.txt` untuk AI crawler |
| Analytics | Meta Pixel (browser) + Conversions API relay (server) dengan dedup `eventID` |
| Automation | GitHub Actions workflow + endpoint pengingat deadline |

## 7. Impact

**Dampak kualitatif** — tidak ada metrik bisnis yang diukur dari sistem ini, jadi tidak ada angka yang diklaim:

- **Update customer berhenti jadi pekerjaan manual.** Admin tidak lagi mengetik pesan progress satu per satu; perubahan tahap di dashboard langsung mengirim notifikasi.
- **Progress order konsisten.** Semua order melewati 11 tahap yang sama, dengan progress yang dihitung sistem — bukan perkiraan admin.
- **Customer jadi self-service.** Pertanyaan status pesanan dijawab sendiri lewat link tracking di pesan WhatsApp.
- **Deadline lebih terstruktur.** Pengingat H-3/H-2/H-1 otomatis, dengan jejak pengiriman yang bisa diperiksa.
- **Konten dan katalog bisa diubah tanpa developer.** Kategori, produk, harga, testimoni, dan promo dikelola dari dashboard.
- **Kesalahan manual berkurang.** Anti-duplikat notifikasi dan riwayat perubahan status menghilangkan risiko update dobel atau kehilangan jejak perubahan.

**Skala teknis yang bisa diverifikasi dari repo:**

| Metrik | Nilai |
| --- | --- |
| Commit | 640+ (Juli–September 2026) |
| Deployment via Vercel | 500+ |
| Landing page kategori | 9 kategori + halaman Fantasy Club & katalog |
| Tahap produksi | 11 tahap (jersey) dan 6 tahap (maklon) |
| File migrasi database | 24 (`0001` → `0025`) |
| Jenis notifikasi WhatsApp | 4 template (tahap jersey, pengiriman jersey, tahap maklon, pengiriman maklon) + ringkasan deadline |
