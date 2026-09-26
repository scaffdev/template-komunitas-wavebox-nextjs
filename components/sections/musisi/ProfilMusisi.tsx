'use client'

import { useState } from 'react'
import Link from 'next/link'
import FotoMusisi from '@/components/ui/FotoMusisi'
import GenreTag from '@/components/ui/GenreTag'
import { ARTIKELS, getMusisi, namaGenre } from '@/lib/data'
import { fotoGaleri } from '@/lib/foto'
import { formatTanggal } from '@/lib/utils/date'

const TABS = [
  { id: 'musik', label: 'Musik' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'artikel', label: 'Artikel' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function ProfilMusisi({ slug }: { slug: string }) {
  const [tab, setTab] = useState<TabId>('musik')
  const musisi = getMusisi(slug)

  if (!musisi) {
    return (
      <div className="mx-auto w-full max-w-content px-5 py-16 md:px-12">
        <p className="font-display text-3xl">Musisi tidak ditemukan.</p>
        <Link href="/musisi" className="mt-4 inline-block font-sans text-sm text-accent">
          ← Kembali ke direktori
        </Link>
      </div>
    )
  }

  const artikelMusisi = ARTIKELS.filter((a) => a.penulis === musisi.nama)

  return (
    <div className="mx-auto grid w-full max-w-content gap-12 px-5 py-12 md:grid-cols-12 md:px-12">
      <aside className="md:col-span-3">
        <FotoMusisi nama={musisi.nama} fotoUrl={musisi.fotoUrl} rasio="1:1" />
        <h1 className="mt-5 font-sans text-xl font-bold uppercase tracking-wide">{musisi.nama}</h1>
        <p className="mt-2 flex flex-wrap gap-1.5">
          {musisi.genres.map((g) => (
            <GenreTag key={g} label={namaGenre(g)} />
          ))}
        </p>
        <p className="mt-2 font-sans text-sm text-muted">{musisi.kota}, Indonesia</p>

        <div className="mt-8 border-t border-border pt-5">
          <p className="font-sans text-xs font-medium text-muted">Tentang</p>
          <p className="mt-2 font-sans text-sm leading-relaxed">{musisi.bio}</p>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <p className="font-sans text-xs font-medium text-muted">Bergabung</p>
          <p className="mt-2 font-sans text-sm">{musisi.bergabung}</p>
        </div>

        {musisi.cariKolaborasi && (
          <div className="mt-6 border-t border-border pt-5">
            <p className="font-sans text-xs font-medium text-accent">Cari Kolaborasi</p>
            <p className="mt-2 font-sans text-sm">{musisi.kebutuhanKolaborasi}</p>
          </div>
        )}

        <div className="mt-6 border-t border-border pt-5">
          <p className="font-sans text-xs font-medium text-muted">Link</p>
          <ul className="mt-2">
            {musisi.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-sm text-primary transition-colors hover:text-accent"
                >
                  ↗ {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="md:col-span-9">
        <nav className="flex gap-8 border-b border-border" aria-label="Konten musisi">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-selected={tab === t.id}
              className={`-mb-px border-b-2 pb-3 font-sans text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'border-accent text-primary'
                  : 'border-transparent text-muted hover:text-primary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {tab === 'musik' && (
          <div className="mt-2">
            {musisi.karya.map((k) => (
              <div
                key={k.judul}
                className="flex items-center gap-4 border-b border-border py-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-dashed border-border bg-surface font-display text-lg text-muted">
                  {k.judul[0]}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-sans text-[15px] font-medium">{k.judul}</p>
                  <p className="font-sans text-xs text-muted">
                    {k.tipe} · {k.tahun} · {k.platform}
                  </p>
                </div>
                <a
                  href={k.link}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto shrink-0 font-sans text-sm text-accent hover:opacity-85"
                >
                  Dengarkan ↗
                </a>
              </div>
            ))}
          </div>
        )}

        {tab === 'galeri' && (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: musisi.galeri }).map((_, i) => (
              <FotoMusisi
                key={i}
                nama={`${musisi.nama} ${i + 1}`}
                fotoUrl={fotoGaleri(musisi.slug, i + 1)}
                rasio="1:1"
              />
            ))}
          </div>
        )}

        {tab === 'artikel' && (
          <div className="mt-2">
            {artikelMusisi.length === 0 && (
              <p className="border-b border-border py-6 font-sans text-sm text-muted">
                Belum ada artikel dari {musisi.nama}.
              </p>
            )}
            {artikelMusisi.map((a) => (
              <div key={a.slug} className="border-b border-border py-4">
                <Link href={`/artikel/${a.slug}`} className="group block">
                  <span className="font-display text-lg group-hover:text-accent">{a.judul}</span>
                  <span className="mt-1 block font-sans text-xs text-muted">
                    {formatTanggal(a.tanggal)}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
