# Lari 42,2 km: Website Perkenalan Lioniel

**Garis start (live):** https://lionil-dreamon-cretivox.vercel.app

Dibuat untuk **Cretivox Endurance Test** (Front-end Developer, Internship Experience Season II Batch 6). Namanya juga tes ketahanan, jadi temanya sekalian lari marathon.

## Rute lomba

1. **Ambil nomor dada.** Login dulu sebelum boleh lewat garis start.
2. **Hitung mundur.** 3, 2, 1, Start!
3. **Lari.** Jarak naik dari 0 sampai 42,2 km.
4. **Masuk landing page.** Hero, cerita, rute perjalanan, proyek, perlengkapan, dan kontak.

## Biar bisa lewat garis start

Login pakai akun peserta uji coba (akun dummy publik dari dokumentasi API):

- Username: `emilys`
- Password: `emilyspass`

Tombol "Isi otomatis" di layar login juga bisa dipakai kalau malas ngetik.

## Perlengkapan lari

- Next.js (App Router) dan React
- GSAP + ScrollTrigger buat animasi dan scroll yang bikin betah
- Login lewat API (`POST https://dummyjson.com/user/login`), token disimpan di `sessionStorage`
- CSS biasa, tanpa framework
- Deploy di Vercel

## Pemanasan di lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Alamat API sudah diatur bawaan, jadi nggak perlu isi apa-apa. Kalau mau pakai API lain, salin `.env.local.example` jadi `.env.local`, lalu ubah `NEXT_PUBLIC_API_BASE` dan `NEXT_PUBLIC_LOGIN_PATH`.

## Peta lintasan

```
app/
  page.js        login, nomor dada, transisi lari, dan landing page
  globals.css    semua gaya
  layout.js      layout dan metadata
```

## Pelarinya

**Lioniel Salomon Siregar**, mahasiswa Sistem Informasi semester 3, Universitas Terbuka.
Kilometer terdekat: front-end developer. Garis finish yang jauh: software engineer yang paham banyak sisi.

- GitHub: https://github.com/lionilsalomon414-commits
- LinkedIn: https://linkedin.com/in/lionil-salomon-siregar-54897a320
