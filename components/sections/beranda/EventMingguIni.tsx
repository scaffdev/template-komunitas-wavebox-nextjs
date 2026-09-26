import Link from 'next/link'
import { EVENTS } from '@/lib/data'
import { formatTanggalPendek } from '@/lib/utils/date'

export default function EventMingguIni() {
  const upcoming = EVENTS.filter((e) => !e.selesai).slice(0, 4)

  return (
    <div className="mt-12">
      <h2 className="section-heading font-display text-2xl md:text-3xl">Event Minggu Ini</h2>
      <div>
        {upcoming.map((e) => (
          <div key={e.slug} className="border-t border-border py-4 last:border-b">
            <Link href={`/event/${e.slug}`} className="group block">
              <p className="font-sans text-[15px] font-medium group-hover:text-accent">{e.nama}</p>
              <p className="mt-1 font-sans text-xs text-muted">
                {formatTanggalPendek(e.tanggal)} · {e.venue} · {e.kota}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <Link
        href="/event"
        className="mt-4 inline-block font-sans text-sm text-muted transition-colors hover:text-accent"
      >
        Lihat semua event →
      </Link>
    </div>
  )
}
