import Link from 'next/link'
import FotoMusisi from '@/components/ui/FotoMusisi'
import { EVENTS, getEvent } from '@/lib/data'
import { formatTanggal, namaHari } from '@/lib/utils/date'

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }))
}

export default async function HalamanDetailEvent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = getEvent(slug)

  if (!event) {
    return (
      <div className="mx-auto w-full max-w-content px-5 py-16 md:px-12">
        <p className="font-display text-3xl">Event tidak ditemukan.</p>
        <Link href="/event" className="mt-4 inline-block font-sans text-sm text-accent">
          ← Kembali ke event
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-content px-5 py-12 md:px-12">
      <nav className="font-sans text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/event" className="hover:text-accent">
          Event
        </Link>
        {' / '}
        <span className="text-primary">{event.nama}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <FotoMusisi nama={event.nama} fotoUrl={event.fotoUrl} rasio="3:2" />
        <div>
          {event.selesai && (
            <p className="font-sans text-xs uppercase tracking-widest text-muted">
              Sudah selesai
            </p>
          )}
          <h1 className="mt-2 font-display text-4xl leading-tight md:text-5xl">{event.nama}</h1>
          <div className="mt-6 border-t border-border pt-5">
            <p className="font-sans text-[15px]">
              {namaHari(event.tanggal)}, {formatTanggal(event.tanggal)}
              {event.jamMulai ? ` · ${event.jamMulai} WIB` : ''}
            </p>
            <p className="mt-1 font-sans text-[15px] text-muted">
              {event.venue}, {event.kota}
            </p>
          </div>
          <div className="mt-5 border-t border-border pt-5">
            <p className="font-sans text-xs font-medium text-muted">Line-up</p>
            <p className="mt-2 font-sans text-[15px]">{event.lineup.join(', ')}</p>
          </div>
          <div className="mt-5 border-t border-border pt-5">
            <p className="font-sans text-sm leading-relaxed">{event.deskripsi}</p>
          </div>
          {event.linkTiket && !event.selesai && (
            <a
              href={event.linkTiket}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded bg-accent px-5 py-2.5 font-sans text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              Beli Tiket ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
