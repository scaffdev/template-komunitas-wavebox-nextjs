# Cara mencopot Supabase dari template ini

> Dibutuhkan bila kamu memakai database/auth lain (mis. via Scaffdev Builder).
> Ikuti section sesuai framework template-mu (Next.js ATAU Laravel).
> Estimasi: ±10 menit. Ikuti berurutan — jangan loncat.
>
> Catatan khusus repo ini: auth bawaan bersifat ganda — form login/daftar
> memakai Supabase bila env terisi, dan otomatis memakai mode demo
> (`localStorage` via `lib/auth.ts`) bila env kosong. Mencopot Supabase
> berarti template berjalan permanen dalam mode demo sampai kamu memasang
> auth pengganti.

## 0. Aturan emas (baca dulu!)

- Hapus **HANYA** file di bagian 1 framework-mu. File di bagian 5 **JANGAN PERNAH** dihapus.
- Kalau ragu satu file, BERHENTI dan tanya pembuat template. Menebak = merusak project.

---

## A. Template Next.js

### A.1. Hapus file (milik Supabase 100% — isi file hanya memanggil SDK Supabase)

- `lib/supabase/client.ts` — browser client (`createBrowserClient` dari `@supabase/ssr`).
- `lib/supabase/server.ts` — server client untuk Server Component (`createServerClient`).
- `lib/supabase/middleware.ts` — refresh session (`supabase.auth.getUser()`), dipanggil root `middleware.ts`.
- `app/api/auth/callback/route.ts` — callback OAuth/verifikasi email (`exchangeCodeForSession`).

```bash
rm lib/supabase/client.ts lib/supabase/server.ts lib/supabase/middleware.ts "app/api/auth/callback/route.ts"
```

### A.1b. Lepas kaitan di file inti (EDIT manual — JANGAN hapus file-file ini)

Dua file form dan `middleware.ts` mengimpor file di A.1. Setelah A.1, perbaiki mereka agar build tidak patah:

1. `app/masuk/FormMasuk.tsx`
   - Hapus baris 9: `import { buatSupabaseBrowser, supabaseTerkonfigurasi } from '@/lib/supabase/client'`
   - Di `kirim()`, hapus cabang Supabase (baris 23–28, `const sb = ...` + `if (sb) {...} else`), sisakan isi cabang `else` (simpan profil demo + `router.push('/dashboard')`).
   - Hapus banner mode demo (baris 51–56, blok `{!supabaseTerkonfigurasi && (...)}`).
2. `app/daftar/FormDaftar.tsx`
   - Hapus baris 9: import yang sama.
   - Di `kirim()`, hapus blok `const sb = ...` + `if (sb) {...}` (baris 27–35), sisakan `simpanProfil(...)` + redirect.
   - Hapus banner mode demo (baris 54–58).
3. `middleware.ts` (root) — isinya hanya meneruskan ke helper Supabase yang sudah dihapus. Pilih salah satu:
   - (disarankan) Ganti seluruh isi dengan pass-through:
     ```ts
     import { NextResponse, type NextRequest } from 'next/server'
     export async function middleware(request: NextRequest) {
       return NextResponse.next()
     }
     export const config = {
       matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
     }
     ```
   - Atau hapus file `middleware.ts` — aman, karena isinya hanya me-refresh sesi Supabase dan tidak menjaga route apa pun.

### A.2. Hapus env (dari `.env.local`)

- `NEXT_PUBLIC_SUPABASE_URL` (dibaca `lib/supabase/client.ts:3`, `server.ts:4`, `middleware.ts:6`, `route.ts:6`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (dibaca `client.ts:4`, `server.ts:5`, `middleware.ts:7`, `route.ts:7`)

Hapus barisnya, jangan dikosongkan saja.

Catatan env lain (jangan ikut terhapus otomatis):

- `SUPABASE_SERVICE_ROLE_KEY` — tidak dibaca satu baris kode pun (hasil grep `SERVICE_ROLE` di `app/` dan `lib/` = 0). Hapus juga bila key itu hanya disiapkan untuk Supabase.
- `NEXT_PUBLIC_SITE_URL` — hanya dipakai route callback yang dihapus (`route.ts:8`); simpan bila auth penggantimu butuh base URL, hapus bila tidak.

### A.3. Bersihkan dependency

```bash
npm uninstall @supabase/ssr @supabase/supabase-js
```

(Nama persis seperti di `package.json` baris 12–13. `slugify` tetap dipakai `FormDaftar.tsx:10` — jangan ikut dihapus.)

### A.4. Verifikasi (wajib lolos semua)

```bash
npm run build
```

```bash
grep -ri "buatSupabase\|supabaseTerkonfigurasi\|perbaruiSession\|exchangeCodeForSession\|@supabase/" app lib components middleware.ts
```

- Build harus sukses.
- Grep harus menghasilkan **0 baris**. Perintah di atas sengaja memakai kata kunci teknis (bukan kata "supabase" polos) karena kata "Supabase" masih boleh muncul di komentar `lib/auth.ts:20-21` dan itu tidak perlu dihapus.
- Bila masih ada sisa (mis. kamu melewatkan satu import di A.1b), hapus import + pemakaiannya, lalu build ulang.

### A.5. Yang JANGAN dihapus (Next.js)

- `lib/auth.ts` — auth demo `localStorage` murni (53 baris, nol import Supabase — buktinya seluruh file hanya memakai `window.localStorage` + React). Dipakai `components/layout/Navbar.tsx:6`, `components/sections/forum/ThreadDetail.tsx:9`, `app/masuk/FormMasuk.tsx:8`, `app/daftar/FormDaftar.tsx:8`, `app/dashboard/profil/FormProfil.tsx:7`, `app/dashboard/IsiDashboard.tsx:6`, `app/dashboard/event/KelolaEvent.tsx:7`, `app/dashboard/artikel/baru/FormArtikelBaru.tsx:7`. Menghapusnya merusak navbar, forum, dan seluruh dashboard.
- `middleware.ts` (root) — plumbing framework Next.js; cukup sesuaikan isinya sesuai A.1b, jangan dihapus membabi buta bila nanti butuh middleware.
- `app/masuk/FormMasuk.tsx` dan `app/daftar/FormDaftar.tsx` — UI auth generik (form email/password + mode demo); yang dilepas hanya kait Supabase-nya sesuai A.1b.
- `types/index.ts` — tipe bersama (`LocalProfile`, `Musisi`, `Artikel`, `EventItem`, ...), bukan khusus Supabase.
- `lib/draf.ts`, `lib/data.ts`, `lib/foto.ts`, `lib/utils/` — data demo lokal + helper slug/tanggal/reading-time; tidak menyentuh Supabase.
- `.env.local` — diedit (A.2), bukan dihapus (masih memuat `NEXT_PUBLIC_SITE_URL` bila dipakai).
- `package.json` — diedit via uninstall (A.3), bukan dihapus.

---

## B. Template Laravel

### B.1. Hapus file (aman — tidak dipakai kode lain)

Tidak berlaku untuk template ini — repo ini Next.js (`package.json` memuat `next 14.2.18`; tidak ada `composer.json` / `artisan`).

### B.2. Hapus env (dari `.env`)

Tidak berlaku untuk template ini — alasannya sama dengan B.1 (tidak ada `.env` Laravel).

### B.3. Bersihkan dependency

Tidak berlaku untuk template ini — alasannya sama dengan B.1 (tidak ada `composer.json`; dependency JS dibersihkan di A.3).

### B.4. Verifikasi (wajib lolos semua)

Tidak berlaku untuk template ini — alasannya sama dengan B.1 (verifikasi memakai `npm run build` di A.4).

### B.5. Yang JANGAN dihapus (Laravel)

Tidak berlaku untuk template ini — alasannya sama dengan B.1 (tidak ada `app/Models/`, migrasi, maupun view Blade di repo ini).

---

## Checklist sebelum menyimpan file ini

- [x] Semua path di A.1/B.1 benar-benar ada di repo (cek satu per satu).
- [x] Nama package di A.3/B.3 sama persis dengan `package.json`/`composer.json`.
- [x] Kata kunci grep di A.4/B.4 menemukan file A.1/B.1 bila dijalankan SEBELUM hapus (kalau grep tidak menemukan apa-apa dari awal, kata kuncinya salah).
- [x] Bagian 5 menyebut SEMUA file bersama yang relevan (cek import!).
- [x] Tidak ada lagi tanda placeholder yang tersisa.
