import ListEvent from '@/components/sections/event/ListEvent'

export const metadata = {
  title: 'Event & Gig — WAVEBOX',
  description: 'Kalender gig dan event musik indie Indonesia.',
}

export default function HalamanEvent() {
  return (
    <div className="mx-auto w-full max-w-content px-5 py-12 md:px-12">
      <h1 className="font-display text-5xl md:text-6xl">Event</h1>
      <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-muted">
        Kalender gig indie: dari showcase kamar sampai panggung gudang. Dikelompokkan per bulan.
      </p>
      <ListEvent />
    </div>
  )
}
