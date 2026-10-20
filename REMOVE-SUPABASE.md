# Cara mencopot Supabase (WAVEBOX)

> Dipakai bila kamu ganti database/auth lain (mis. lewat Scaffdev Builder).
> Estimasi ±10 menit. Ikuti berurutan.

## 0. Aturan emas

- Hapus **HANYA** file di bagian 1. File lain jangan disentuh.
- Kalau ragu satu file, berhenti dan tanya pembuat template.

## 1. Hapus file milik Supabase

- `lib/supabase/client.ts` — browser client
- `lib/supabase/server.ts` — server client
- `proxy.ts` — refresh session tiap request
- `app/api/auth/callback/route.ts` — callback OAuth

```bash
rm lib/supabase/client.ts lib/supabase/server.ts proxy.ts app/api/auth/callback/route.ts
rmdir lib/supabase 2>/dev/null || true
```

> Catatan Next.js 16: refresh session memakai `proxy.ts` (bukan `middleware.ts`).
> Kalau template-mu di-downgrade ke Next ≤15, isi `proxy.ts` dipindah ke
> `middleware.ts` dengan `export async function middleware`.

## 2. Hapus env dari `.env.local`

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (bila memakai key baru)

Hapus barisnya, jangan dikosongkan saja.

## 3. Bersihkan dependency

```bash
npm uninstall @supabase/ssr @supabase/supabase-js
```

## 4. Sesuaikan halaman auth (opsional)

`app/masuk/FormMasuk.tsx` dan `app/daftar/FormDaftar.tsx` mengimpor
`buatSupabaseBrowser` + `supabaseTerkonfigurasi` dari `lib/supabase/client`.
Setelah file itu dihapus, ganti pemanggilannya dengan mode demo lokal
(`lib/auth.ts`) atau auth pilihanmu.

## 5. Verifikasi (wajib lolos)

```bash
npm run build
```

```bash
grep -ri "supabase" app lib components proxy.ts 2>/dev/null
```

- Build harus sukses.
- Grep harus 0 baris. Bila masih ada sisa (mis. query `.from(` di halaman),
  ganti dulu sumber datanya, lalu build ulang.
