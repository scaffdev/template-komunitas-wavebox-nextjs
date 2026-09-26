'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import GenreTag from '@/components/ui/GenreTag'
import { Select } from '@/components/ui/Input'
import { GENRES, KOTAS, namaGenre } from '@/lib/data'

export default function FilterMusisi() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const genreAktif = params.get('genre')?.split(',').filter(Boolean) ?? []
  const kotaAktif = params.get('kota') ?? ''
  const cariKolab = params.get('kolab') === '1'

  function terapkan(patch: Record<string, string | null>) {
    const baru = new URLSearchParams(params.toString())
    for (const [k, v] of Object.entries(patch)) {
      if (v) baru.set(k, v)
      else baru.delete(k)
    }
    const qs = baru.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  function toggleGenre(slug: string) {
    const set = new Set(genreAktif)
    if (set.has(slug)) set.delete(slug)
    else set.add(slug)
    const daftar = Array.from(set)
    terapkan({ genre: daftar.length ? daftar.join(',') : null })
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        {GENRES.map((g) => (
          <GenreTag
            key={g.slug}
            label={g.nama}
            aktif={genreAktif.includes(g.slug)}
            onClick={() => toggleGenre(g.slug)}
          />
        ))}
      </div>

      {genreAktif.length > 0 && (
        <p className="mt-3 font-sans text-xs text-muted">
          Filter:{' '}
          {genreAktif.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => toggleGenre(g)}
              className="mr-2 text-accent hover:opacity-85"
              aria-label={`Hapus filter ${namaGenre(g)}`}
            >
              {namaGenre(g)} ×
            </button>
          ))}
        </p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Select
            aria-label="Filter kota"
            value={kotaAktif}
            onChange={(e) => terapkan({ kota: e.target.value || null })}
          >
            <option value="">Semua Kota</option>
            {KOTAS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </Select>
        </div>
        <label className="flex cursor-pointer items-center gap-2.5 font-sans text-sm text-muted">
          <input
            type="checkbox"
            checked={cariKolab}
            onChange={(e) => terapkan({ kolab: e.target.checked ? '1' : null })}
            className="h-4 w-4 accent-[#F472B6]"
          />
          Cari kolaborator saja
        </label>
      </div>
    </div>
  )
}
