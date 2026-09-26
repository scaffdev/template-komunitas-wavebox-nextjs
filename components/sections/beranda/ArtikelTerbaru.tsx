import Link from 'next/link'
import GenreTag from '@/components/ui/GenreTag'
import { ARTIKELS, namaGenre } from '@/lib/data'
import { formatTanggal } from '@/lib/utils/date'

export default function ArtikelTerbaru() {
  const terbaru = ARTIKELS.slice(0, 3)

  return (
    <div className="mt-12">
      <h2 className="section-heading font-display text-2xl md:text-3xl">Artikel Terbaru</h2>
      <div>
        {terbaru.map((a) => (
          <article key={a.slug} className="border-t border-border py-5 last:border-b">
            <Link href={`/artikel/${a.slug}`} className="group block">
              <h3 className="font-display text-xl leading-snug group-hover:text-accent md:text-2xl">
                {a.judul}
              </h3>
              <p className="mt-2 font-sans text-xs text-muted">
                {a.penulis} · {formatTanggal(a.tanggal)} · {a.estimasiBaca} menit baca
              </p>
              <p className="mt-2 flex flex-wrap gap-1.5">
                {a.genres.map((g) => (
                  <GenreTag key={g} label={namaGenre(g)} />
                ))}
              </p>
            </Link>
          </article>
        ))}
      </div>
      <Link
        href="/artikel"
        className="mt-4 inline-block font-sans text-sm text-muted transition-colors hover:text-accent"
      >
        Baca semua artikel →
      </Link>
    </div>
  )
}
