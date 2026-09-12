# `_archive/` — Arsip desain & prototipe versi lama

Folder ini menyimpan **versi awal project sebelum dipindahkan ke Next.js**: landing page HTML statis,
dashboard admin berbasis file, dan prototipe halaman. Semuanya disimpan sebagai referensi desain dan
riwayat pekerjaan — **bukan bagian dari aplikasi yang berjalan**.

## Status: tidak dipakai production

Diperiksa dengan menelusuri seluruh repo:

- Tidak ada satu pun file di `app/`, `components/`, `lib/`, `package.json`, atau
  `.github/workflows/` yang mengimpor atau mereferensikan `_archive/`.
- Arsip berupa HTML/CSS/JS mandiri dengan folder `fonts/` dan `images/` sendiri, jadi bisa dibuka
  langsung di browser sebagai file lokal tanpa server.

Artinya folder ini aman untuk diabaikan saat membaca kode production, tapi jangan dihapus tanpa
alasan — isinya dokumentasi perjalanan desain project ini.

## Isi

### Prototipe landing page per kategori
`Html Jersey Voli/`, `Jersey Army/`, `Jersey Mancing/`, `Jersey Racing Html/`,
`Landingpage Badminton/`, `Landingpage Jersey Running/`, `Landingpage basket/`,
`corporate-collection/`, `fantasy-club/`, `karier/`, `jersey-futsal-custom---landing-page/`

Versi HTML statis dari landing page kategori yang sekarang hidup di `app/jersey-*` dan
`app/corporate-collection`. Struktur tiap folder: `pages/index.html` + `fonts/` + `images/`.

### Prototipe dashboard & halaman operasional
| Folder / file | Isi |
| --- | --- |
| `TNT-Dashboard-Admin-v4/`, `TNT-Dashboard-Admin-v5/` | Dashboard admin versi HTML + `admin.js` / `orders.js` (pendahulu `components/admin/PesananDashboard.tsx`) |
| `detail pesanan/` | Prototipe sheet detail pesanan |
| `halaman tracking customer/` | Prototipe halaman tracking customer (pendahulu `app/status` dan `app/track`) |
| `preview-detail-pesanan.html` | Hasil render prototipe detail pesanan |

### Referensi desain & skrip bantu
| File | Keterangan |
| --- | --- |
| `Design.md` | Token desain versi lama (nama, warna, tipografi) — referensi visual, bukan yang dipakai sekarang |
| `screenshots/` | Tiga tangkapan layar nyata dari halaman project (`corporate-hero.png`, `karier-nextjs.png`, `karier-original.png`) yang dipakai di README utama |
| `find_block.py`, `replace_detail.py` | Skrip Python sekali pakai untuk menyunting `components/admin/PesananDashboard.tsx` secara massal. Berisi path Windows lokal (`D:\TNT SPORT DATA WEB\tntsport\...`) sehingga **tidak jalan di mesin lain**. Disimpan hanya sebagai catatan proses |

## Catatan

- Jangan menambahkan aset baru ke folder ini. Kalau ada desain eksperimen baru, taruh di tempat yang
  jelas statusnya (misalnya folder fitur di `app/` atau `components/`).
- Kalau butuh menghapus salah satu arsip, pastikan dulu tidak ada referensi dari kode aktif (cara
  termudah: cari nama folder tersebut di `app/`, `components/`, `lib/`).
