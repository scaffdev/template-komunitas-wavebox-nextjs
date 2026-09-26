'use client'

import { useState } from 'react'
import Link from 'next/link'
import FotoMusisi from '@/components/ui/FotoMusisi'
import GenreTag from '@/components/ui/GenreTag'
import { ARTIKELS, TIPE_ARTIKEL, namaGenre } from '@/lib/data'
import { formatTanggal } from '@/lib/utils/date'

export default function ListArtikel() {
  const [tipe, setTipe] = useState<string>('')

  const hasil = tipe ? ARTIKELS.filter((a) => a.tipe === tipe) : ARTIKELS
  const [featured, ...sisa] = hasil

  return (
    <div>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter tipe artikel">
        <GenreTag label="Semua" aktif={tipe === ''} onClick={() => setTipe('')} />
        {TIPE_ARTIKEL.map((t) => (
          <GenreTag key={t.slug} label={t.nama} aktif={tipe === t.slug} onClick={() => setTipe(t.slug)} />
        ))}
      </div>

      {hasil.length === 0 && (
        <p className="mt-12 border-t border-border pt-8 font-sans text-sm text-muted">
          Belum ada artikel tipe ini.
        </p>
      )}

      {featured && (
        <Link href={`/artikel/${featured.slug}`} className="group mt-10 grid gap-6 md:grid-cols-2">
          <FotoMusisi nama={featured.judul} fotoUrl={featured.fotoUrl} rasio="3:2" />
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-muted">Terbaru</p>
            <h2 className="mt-2 font-display text-3xl leading-tight group-hover:text-accent md:text-4xl">
              {featured.judul}
            </h2>
            <p className="mt-3 font-sans text-xs text-muted">
              {featured.penulis} · {formatTanggal(featured.tanggal)} · {featured.estimasiBaca} menit
              baca
            </p>
            <p className="mt-2">
              <GenreTag label={namaGenre(featured.genres[0] ?? '')} />
            </p>
          </div>
        </Link>
      )}

      {sisa.length > 0 && (
        <>
          <hr className="divider my-10" />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {sisa.map((a) => (
              <Link key={a.slug} href={`/artikel/${a.slug}`} className="group block">
                <FotoMusisi nama={a.judul} fotoUrl={a.fotoUrl} rasio="3:2" />
                <h3 className="mt-4 font-display text-xl leading-snug group-hover:text-accent">
                  {a.judul}
                </h3>
                <p className="mt-2 font-sans text-xs text-muted">
                  {a.penulis} · {formatTanggal(a.tanggal)}
                </p>
                <p className="mt-2">
                  <GenreTag label={namaGenre(a.genres[0] ?? '')} />
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
