# Panduan Kustomisasi Template WAVEBOX

Template landing page + direktori komunitas musik indie Indonesia.
**Tagline bawaan:** "Satu tempat. Semua musisi indie Indonesia."
**Estetika:** editorial gelap (rujukan: Pitchfork, Bandcamp, zine) — bukan SaaS generik.

---

## 1. Gambaran cepat

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · Supabase (opsional, bisa jalan tanpa backend) · TypeScript.

Syarat: **Node.js 22+** (dibutuhkan `@supabase/supabase-js` 2.114+), npm 10+.

**Peta halaman (`app/`):**

| Route | File | Isi |
|---|---|---|
| `/` | `app/page.tsx` | Beranda: Sorotan + Musisi Baru + Artikel Terbaru + Event Minggu Ini + Diskusi Aktif |
| `/musisi` | `app/musisi/page.tsx` | Direktori + filter (`FilterMusisi` + `GridMusisi`) |
| `/musisi/[slug]` | `app/musisi/[slug]/page.tsx` | Profil (`ProfilMusisi`: foto 1:1, bio, tab Musik/Galeri/Artikel) |
| `/artikel` | `app/artikel/page.tsx` | Daftar (`ListArtikel`: 1 featured + grid) |
| `/artikel/[slug]` | `app/artikel/[slug]/page.tsx` | Detail baca (max `680px`, ada `Tentang Penulis` + `Artikel Lain`) |
| `/event` | `app/event/page.tsx` | Daftar per bulan (`ListEvent`, featured punya foto) |
| `/event/[slug]` | `app/event/[slug]/page.tsx` | Detail event + tombol tiket |
| `/forum`, `/forum/[slug]` | `app/forum/...` | Kategori + thread + balasan (teks, avatar inisial — by design tanpa foto) |
| `/dashboard`, `/dashboard/profil`, `/dashboard/artikel/baru`, `/dashboard/event` | `app/dashboard/...` | Area login (form tanpa upload foto) |
| `/masuk`, `/daftar` | `app/masuk/page.tsx`, `app/daftar/page.tsx` | Auth |

**Data demo:** semuanya lokal di `lib/data.ts` (tipe di `types/index.ts`).
Selama `.env.local` Supabase kosong, aplikasi jalan dengan data lokal + akun demo `localStorage` (`lib/auth.ts`).

---

## 2. Ganti identitas (nama, logo, metadata)

| Yang diganti | File | Cara |
|---|---|---|
| Nama + tagline beranda | `app/page.tsx` (`Komunitas Musik Indie Indonesia`) | Edit teks langsung |
| Judul tab, SEO, OG/Twitter | `app/layout.tsx` (`metadata`, `metadataBase: https://wavebox.id`) | Ganti `title`, `description`, `url`, `siteName` |
| Gambar share SOSMED | `public/og-image.png` (dirujuk di `layout.tsx:33,40`) | Timpa file 1200×630 dengan nama sama |
| Logo navbar/footer | `components/Logo.tsx` (SVG inline equalizer + wordmark WAVE/BOX) | Edit SVG ini — bukan `public/wavebox-logo.svg` (itu duplikat tak terpakai). Warna aksen logo: `#F472B6` |
| Teks footer | `components/layout/Footer.tsx` (`Satu tempat...`, `© 2026 WAVEBOX...`, `NAV`) | Edit langsung |
| Bahasa HTML | `app/layout.tsx` (`<html lang="id">`) | Ganti bila template dipakai non-Indonesia |

---

## 3. Ganti warna & pencahayaan (lighting)

Token hidup di **dua tempat yang wajib sinkron**: `tailwind.config.js` (`colors`) dan `app/globals.css` (`:root`).

**Nilai saat ini (hasil tuning "ruangan redup menyala"):**

| Token | Hex | Pakai untuk |
|---|---|---|
| `bg` | `#131314` | Background utama |
| `surface` | `#1C1C1F` | Panel, input, foto |
| `elevated` | `#232327` | Permukaan terangkat |
| `border` / `borderlight` | `#2C2C31` / `#3A3A41` | Divider, border foto |
| `primary` | `#F2F2F0` | Heading, konten |
| `muted` | `#A7A7B0` | Meta (sengaja terang agar kontras ~7:1, nyaman dibaca lama) |
| `faint` | `#7A7A85` | Placeholder, inisial |
| `accent` | `#F472B6` | Satu-satunya neon pink — hemat |
| `accentsoft` | `#F9A8D4` | Hover judul (lembut, bukan flash) |

**Aturan aksen (penting agar tidak kembali jadi "ruangan neon"):**

- `.section-heading` (`globals.css`): garis netral + sentuhan pink 44px (`::after`). Jangan kembalikan ke `border-bottom: 2px solid accent` penuh.
- Hover judul (`group-hover:text-accent`) di-override global jadi `#F9A8D4` (`globals.css`). Kalau mau hover lebih berani, ubah di situ — tidak perlu edit 10 file list.
- `body`/`main` punya cahaya ambient radial sangat halus (putih 5% + pink 5%). Untuk tema lebih gelap/terang, ubah opacity di `globals.css` blok `body`, bukan tambah gradien ungu-biru.
- `blockquote` punya wash `accent-soft → transparan`; `::selection` pink 85%.

**Contoh ganti aksen pink → oranye:** ganti `#F472B6` di `tailwind.config.js` + `:root` + `Logo.tsx` (`stopColor`, `stroke`, `fill`) sekaligus.

---

## 4. Ganti font

`app/layout.tsx` memakai `DM Serif Display` (display) + `Syne` (body) via `next/font/google` dengan variabel `--font-display` / `--font-sans`.
`tailwind.config.js`: `fontFamily.display` / `sans` merujuk variabel itu.

Cara ganti: tukar import di `layout.tsx`, update `variable`, tidak perlu sentuh komponen (semuanya pakai `font-display` / `font-sans`).
Body `line-height: 1.7`, heading `-0.02em / 1.15` — diatur di `globals.css`.

---

## 5. Ganti konten (musisi, artikel, event, forum)

Satu sumber: **`lib/data.ts`**. Bentuk tiap tipe lihat `types/index.ts`.

```ts
// Contoh tambah musisi
{
  slug: 'nama-band', nama: 'Nama Band', kota: 'Bandung',
  genres: ['indie-folk'], tagline: 'Satu kalimat.',
  bio: '...', bergabung: 'Oktober 2026',
  fotoUrl: fotoMusisi('nama-band'),   // atau '/images/nama-band.jpg'
  cariKolaborasi: false, kebutuhanKolaborasi: null,
  links: [{ label: 'Spotify', url: 'https://...' }],
  karya: [{ judul: 'Single 1', tipe: 'single', tahun: 2026, platform: 'Spotify', link: 'https://...' }],
  galeri: 3,
}
```

| Koleksi | Lokasi | Catatan |
|---|---|---|
| `GENRES`, `KOTAS` | `data.ts:12-32` | Slug genre dipakai filter URL (`/musisi?genre=...&kota=...`) |
| `MUSISI` (8 demo) | `data.ts:38-199` | `SOROTAN.musisiSlug` harus cocok dengan salah satu slug |
| `ARTIKELS` (6 demo) | `data.ts:205-318` | `tipe`: `review\|feature\|opini\|tips` (filter di `ListArtikel`) |
| `EVENTS` (5 demo) | `data.ts:331-398` | `featured: true` + belum `selesai` tampil besar berfoto; `selesai: true` tampil redup 50% |
| `FORUM_KATEGORIS/THREADS/BALASANS` | `data.ts:404-...` | Teks saja; tidak ada field foto by design |
| `SOROTAN` | `data.ts:509-514` | `{ musisiSlug: 'nadia-sore', judul, kutipan }` — tampil di beranda kiri atas |

Hapus data demo = hapus objek dari array. Tambah halaman otomatis ter-render via `generateStaticParams` di tiap `[slug]/page.tsx`.

---

## 6. Ganti foto

**Sumber saat ini:** `lib/foto.ts` — URL deterministik Picsum per slug:

```ts
fotoMusisi('nadia-sore')  // picsum seed wb-nadia-sore 800×533
fotoArtikel(slug)         // seed wb-artikel-<slug>
fotoEvent(slug)           // seed wb-event-<slug>
fotoGaleri(slug, i)       // seed wb-<slug>-galeri-<i> 600×600
```

Efek hitam-putih → warna saat hover murni CSS (`.foto-bw` di `globals.css`), jadi URL selalu berwarna.

**Ganti ke foto asli lokal:**

1. Taruh file di `public/images/` (mis. `public/images/nadia-sore.jpg`).
2. Di `data.ts` ganti `fotoUrl: fotoMusisi('nadia-sore')` → `fotoUrl: '/images/nadia-sore.jpg'`.
3. Tidak perlu ubah komponen — `Sorotan`, `GridMusisi`, `ProfilMusisi`, `ListArtikel`, `ListEvent`, detail artikel/event sudah wiring `fotoUrl`.
4. Kalau tidak mau lagi domain luar: hapus `images.remotePatterns` (`next.config.js`) dan import `lib/foto` yang tak terpakai.

**Komponen foto:** `components/ui/FotoMusisi.tsx` — props `nama | fotoUrl | rasio ('3:2'|'1:1')`.
Tanpa `fotoUrl` tampil placeholder (`.foto-placeholder`: dashed + inisial, `aria-label`).
Rasio: band/artikel/event `3:2`, avatar/galeri `1:1`. Cover `karya` di profil masih kotak inisial (`ProfilMusisi.tsx:109`) — bukan foto.

---

## 7. Navigasi & layout

- **Menu atas:** `components/layout/Navbar.tsx` (`MENU`: Musisi/Artikel/Event/Forum). Sticky, `bg-bg/95 + backdrop-blur + shadow`. Mobile = drawer kiri (`bg-surface`).
- **Footer link:** `components/layout/Footer.tsx` (`NAV` + Masuk/Daftar).
- **Beranda split:** `app/page.tsx` — `md:grid-cols-12`, kiri `col-span-7` (Sorotan + ArtikelTerbaru), kanan `col-span-5` (MusisiBaru + EventMingguIni), bawah full-width `ForumAktif`. Ubah proporsi di sini.
- **Utilitas visual:** `.divider` (garis 1px, bukan card), `.section-heading` (lihat §3), `max-w-content: 1280px`, `max-w-reading: 680px` (detail artikel).

---

## 8. Komponen UI (jangan tambah varian tanpa perlu)

| Komponen | File | Aturan |
|---|---|---|
| `Button` | `components/ui/Button.tsx` | Hanya `primary` (pink, shadow pink 25%) dan `ghost` (border). Hover = opacity, tanpa glow/transform |
| `GenreTag` | `components/ui/GenreTag.tsx` | Pill border, aktif = border pink + wash 12% + teks `accentsoft` |
| `Input/Textarea/Select/Label` | `components/ui/Input.tsx` | `bg-surface`, focus `border-accent + ring 40%`, placeholder `faint` |
| `FotoMusisi` | `components/ui/FotoMusisi.tsx` | Lihat §6 |

---

## 9. Auth, Supabase, dashboard

- `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (atau `NEXT_PUBLIC_SUPABASE_ANON_KEY` untuk key legacy), `NEXT_PUBLIC_SITE_URL`. Kosong = mode demo lokal.
- Client/server: `lib/supabase/client.ts` + `lib/supabase/server.ts`; refresh session tiap request via `proxy.ts` (Next.js 16; dulu `middleware.ts`). Panduan copot ada di `REMOVE-SUPABASE.md`.
- Tulis konten: `app/dashboard/artikel/baru` (`FormArtikelBaru`), event (`KelolaEvent`), profil (`FormProfil`) — belum ada upload foto; foto diatur lewat `data.ts`/§6.

---

## 10. Checklist sebelum publish

- [ ] `app/layout.tsx`: title, description, `metadataBase`, OG image diganti
- [ ] `public/og-image.png` 1200×630 milik sendiri
- [ ] `lib/data.ts`: genre/kota/musisi/artikel/event/forum/SOROTAN sudah konten asli, tidak ada slug demo nyasar
- [ ] Foto: Picsum masih dipakai atau sudah `/images/...`; tidak ada placeholder inisial yang tidak disengaja
- [ ] `tailwind.config.js` + `globals.css` sinkron; aksen pink hanya di titik penting
- [ ] `.env.local` produksi terisi (atau sadar jalan mode demo)
- [ ] `npm run lint` + `npm run build` hijau, cek mobile 375px + desktop 1280px
