import ListKategori, { ListThread } from '@/components/sections/forum/ListForum'

export const metadata = {
  title: 'Forum — WAVEBOX',
  description: 'Diskusi komunitas musik indie Indonesia.',
}

export default function HalamanForum() {
  return (
    <div className="mx-auto w-full max-w-content px-5 py-12 md:px-12">
      <h1 className="font-display text-5xl md:text-6xl">Forum</h1>
      <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-muted">
        Ruang diskusi scene indie: dari rekomendasi band sampai cari teman ngeband.
      </p>

      <div className="mt-10">
        <ListKategori />
      </div>

      <div className="mt-12">
        <h2 className="section-heading font-display text-2xl md:text-3xl">Thread Aktif Terbaru</h2>
        <ListThread />
      </div>
    </div>
  )
}
