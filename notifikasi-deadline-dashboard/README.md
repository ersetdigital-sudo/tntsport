# `notifikasi-deadline-dashboard/` — Prototipe dashboard "Notifikasi Deadline"

Prototipe **statis** (HTML + CSS + font mandiri) untuk layar "Notifikasi Deadline": satu halaman
`pages/index.html` berisi tampilan pengingat deadline beserta daftar order yang mendekati deadline.

## Status: tidak dipakai production

- Folder ini **tidak direferensikan** oleh kode mana pun di `app/`, `components/`, `lib/`,
  `package.json`, atau `.github/workflows/` (sudah dicek dengan penelusuran seluruh repo).
- Tidak ada pemanggilan API di dalamnya — halaman hanya berisi markup dan CSS, jadi datanya statis.
- Halaman ini bisa dibuka langsung di browser sebagai file lokal (`pages/index.html`), lengkap dengan
  `fonts/` miliknya sendiri (Geist & Geist Mono).

Fungsinya sekarang digantikan oleh dua hal di aplikasi utama:

1. **Pengaturan** pengingat deadline di dashboard Pesanan (jam kirim, ambang hari, nomor admin,
   tombol kirim uji) — `app/api/admin/settings/deadline-notif/route.ts`.
2. **Halaman** pengingat deadline dengan data nyata — dijalankan oleh endpoint
   `app/api/admin/deadline-notif/route.ts` yang mengirim ringkasan ke WhatsApp admin.

## Isi

| Path | Keterangan |
| --- | --- |
| `pages/index.html` | Satu-satunya halaman: markup + CSS inline tampilan "Notifikasi Deadline" |
| `fonts/` | 18 berkas Geist & Geist Mono (`.ttf`) yang dipakai halaman tersebut |

## Catatan

Prototipe ini disimpan sebagai referensi desain layar notifikasi (warna krem/hijau dan tipografi yang
dipakai dashboard Pesanan). Kalau nanti diputuskan untuk dihapus, cukup hapus seluruh folder ini —
tidak ada dependensi dari sisi aplikasi.
