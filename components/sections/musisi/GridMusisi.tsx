'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import FotoMusisi from '@/components/ui/FotoMusisi'
import GenreTag from '@/components/ui/GenreTag'
import { MUSISI, namaGenre } from '@/lib/data'

export default function GridMusisi() {
  const params = useSearchParams()
  const genreAktif = params.get('genre')?.split(',').filter(Boolean) ?? []
  const kotaAktif = params.get('kota') ?? ''
  const cariKolab = params.get('kolab') === '1'

  const hasil = MUSISI.filter((m) => {
    if (genreAktif.length && !genreAktif.every((g) => m.genres.includes(g))) return false
    if (kotaAktif && m.kota !== kotaAktif) return false
    if (cariKolab && !m.cariKolaborasi) return false
    return true
  })

  if (!hasil.length) {
    return (
      <p className="mt-12 border-t border-border pt-8 font-sans text-sm text-muted">
        Tidak ada musisi yang cocok dengan filter. Coba longgarkan pilihanmu.
      </p>
    )
  }

  const [featured, ...sisa] = hasil

  return (
    <div className="mt-10">
      <Link href={`/musisi/${featured.slug}`} className="group grid gap-6 md:grid-cols-6">
        <div className="md:col-span-3">
          <FotoMusisi nama={featured.nama} fotoUrl={featured.fotoUrl} rasio="3:2" />
        </div>
        <div className="md:col-span-3">
          <p className="font-sans text-xs text-muted">01 / Unggulan</p>
          <p className="mt-2 font-display text-4xl leading-tight group-hover:text-accent">
            {featured.nama}
          </p>
          <p className="mt-3 flex flex-wrap gap-1.5">
            {featured.genres.map((g) => (
              <GenreTag key={g} label={namaGenre(g)} />
            ))}
          </p>
          <p className="mt-3 font-sans text-sm text-muted">{featured.kota}</p>
          <p className="mt-2 font-sans text-[15px] italic">{featured.tagline}</p>
        </div>
      </Link>

      <hr className="divider my-10" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {sisa.map((m, i) => (
          <Link key={m.slug} href={`/musisi/${m.slug}`} className="group block">
            <FotoMusisi nama={m.nama} fotoUrl={m.fotoUrl} rasio="1:1" />
            <p className="mt-3 font-sans text-xs text-muted">
              {String(i + 2).padStart(2, '0')} /
            </p>
            <p className="mt-1 font-sans text-[15px] font-semibold group-hover:text-accent">
              {m.nama}
            </p>
            <p className="mt-1.5 flex flex-wrap gap-1.5">
              {m.genres.map((g) => (
                <GenreTag key={g} label={namaGenre(g)} />
              ))}
            </p>
            <p className="mt-1.5 font-sans text-xs text-muted">{m.kota}</p>
            <p className="mt-1 font-sans text-[13px] italic text-muted">{m.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
