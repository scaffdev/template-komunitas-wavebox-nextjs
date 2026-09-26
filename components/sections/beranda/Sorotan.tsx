import Link from 'next/link'
import FotoMusisi from '@/components/ui/FotoMusisi'
import GenreTag from '@/components/ui/GenreTag'
import { SOROTAN, getMusisi, namaGenre } from '@/lib/data'

export default function Sorotan() {
  const musisi = getMusisi(SOROTAN.musisiSlug)
  if (!musisi) return null

  return (
    <div>
      <h2 className="section-heading font-display text-3xl md:text-4xl">Sorotan Minggu Ini</h2>
      <Link href={`/musisi/${musisi.slug}`} className="group block">
        <FotoMusisi nama={musisi.nama} fotoUrl={musisi.fotoUrl} rasio="3:2" />
        <p className="mt-5 font-display text-3xl leading-tight group-hover:text-accent md:text-4xl">
          {musisi.nama}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-2 font-sans text-sm text-muted">
          {musisi.genres.map((g) => (
            <GenreTag key={g} label={namaGenre(g)} />
          ))}
          <span>· {musisi.kota}</span>
        </p>
        <blockquote className="mt-4 border-l-2 border-accent py-3 pl-4 pr-4 font-display text-lg italic leading-relaxed text-primary/90">
          {SOROTAN.kutipan}
        </blockquote>
      </Link>
    </div>
  )
}
