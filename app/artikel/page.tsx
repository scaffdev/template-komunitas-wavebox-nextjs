import ListArtikel from '@/components/sections/artikel/ListArtikel'

export const metadata = {
  title: 'Artikel & Ulasan — WAVEBOX',
  description: 'Review, feature, opini, dan tips dari komunitas musik indie Indonesia.',
}

export default function HalamanArtikel() {
  return (
    <div className="mx-auto w-full max-w-content px-5 py-12 md:px-12">
      <h1 className="font-display text-5xl md:text-6xl">Artikel</h1>
      <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-muted">
        Tulisan komunitas tentang musik: review album, wawancara, opini scene, dan panduan praktis.
      </p>
      <ListArtikel />
    </div>
  )
}
