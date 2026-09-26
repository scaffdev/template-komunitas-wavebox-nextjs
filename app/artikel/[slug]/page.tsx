import Link from 'next/link'
import FotoMusisi from '@/components/ui/FotoMusisi'
import GenreTag from '@/components/ui/GenreTag'
import { ARTIKELS, getArtikel, namaGenre } from '@/lib/data'
import { formatTanggal } from '@/lib/utils/date'

export function generateStaticParams() {
  return ARTIKELS.map((a) => ({ slug: a.slug }))
}

export default function HalamanDetailArtikel({ params }: { params: { slug: string } }) {
  const artikel = getArtikel(params.slug)

  if (!artikel) {
    return (
      <div className="mx-auto w-full max-w-reading px-5 py-16">
        <p className="font-display text-3xl">Artikel tidak ditemukan.</p>
        <Link href="/artikel" className="mt-4 inline-block font-sans text-sm text-accent">
          ← Kembali ke artikel
        </Link>
      </div>
    )
  }

  const lainnya = ARTIKELS.filter((a) => a.slug !== artikel.slug).slice(0, 3)
  const tengah = Math.ceil(artikel.isi.length / 2)

  return (
    <article className="mx-auto w-full max-w-reading px-5 py-12">
      <nav className="font-sans text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/artikel" className="hover:text-accent">
          Artikel
        </Link>
        {' / '}
        <span className="capitalize">{artikel.tipe}</span>
        {' / '}
        <span className="text-primary">{artikel.judul.slice(0, 40)}…</span>
      </nav>

      <p className="mt-6 flex flex-wrap gap-1.5">
        {artikel.genres.map((g) => (
          <GenreTag key={g} label={namaGenre(g)} />
        ))}
      </p>

      <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{artikel.judul}</h1>
      <p className="mt-4 font-sans text-sm text-muted">
        Oleh {artikel.penulis} · {formatTanggal(artikel.tanggal)} · {artikel.estimasiBaca} menit
        baca
      </p>

      <hr className="divider my-8" />

      <FotoMusisi nama={artikel.judul} fotoUrl={artikel.fotoUrl} rasio="3:2" />
      <p className="mt-2 font-sans text-xs text-muted">Ilustrasi: arsip komunitas WAVEBOX.</p>

      <div className="mt-8">
        {artikel.isi.slice(0, tengah).map((p, i) => (
          <p key={i} className="mb-6 font-sans text-[17px] leading-[1.8]">
            {p}
          </p>
        ))}
        {artikel.kutipan && (
          <blockquote className="my-8 border-l-2 border-accent pl-5 font-display text-2xl italic leading-snug">
            {artikel.kutipan}
          </blockquote>
        )}
        {artikel.isi.slice(tengah).map((p, i) => (
          <p key={i} className="mb-6 font-sans text-[17px] leading-[1.8]">
            {p}
          </p>
        ))}
      </div>

      <hr className="divider my-10" />

      <div>
        <p className="font-sans text-xs font-medium uppercase tracking-widest text-muted">
          Tentang Penulis
        </p>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-display text-lg text-muted">
            {artikel.penulis[0]}
          </div>
          <div>
            <p className="font-sans text-[15px] font-semibold">{artikel.penulis}</p>
            <p className="font-sans text-sm text-muted">{artikel.penulisBio}</p>
          </div>
        </div>
      </div>

      <hr className="divider my-10" />

      <div>
        <p className="font-sans text-xs font-medium uppercase tracking-widest text-muted">
          Artikel Lain
        </p>
        <div className="mt-2">
          {lainnya.map((a) => (
            <div key={a.slug} className="border-b border-border py-4">
              <Link href={`/artikel/${a.slug}`} className="group block">
                <span className="font-display text-lg group-hover:text-accent">{a.judul}</span>
                <span className="mt-1 block font-sans text-xs text-muted">
                  {a.penulis} · {formatTanggal(a.tanggal)}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
