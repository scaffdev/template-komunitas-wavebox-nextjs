import Link from 'next/link'
import { MUSISI } from '@/lib/data'

export default function MusisiBaru() {
  const terbaru = MUSISI.slice(0, 5)

  return (
    <div>
      <h2 className="section-heading font-display text-2xl md:text-3xl">Musisi Baru</h2>
      <ol>
        {terbaru.map((m, i) => (
          <li key={m.slug} className="border-t border-border py-3 last:border-b">
            <Link href={`/musisi/${m.slug}`} className="group flex items-baseline gap-3">
              <span className="font-sans text-xs text-muted">
                {String(i + 1).padStart(2, '0')} /
              </span>
              <span className="font-sans text-[15px] font-medium group-hover:text-accent">
                {m.nama}
              </span>
              <span className="ml-auto shrink-0 font-sans text-xs text-muted">{m.kota}</span>
            </Link>
          </li>
        ))}
      </ol>
      <Link
        href="/musisi"
        className="mt-4 inline-block font-sans text-sm text-muted transition-colors hover:text-accent"
      >
        Jelajahi semua musisi →
      </Link>
    </div>
  )
}
