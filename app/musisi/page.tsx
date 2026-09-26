import { Suspense } from 'react'
import FilterMusisi from '@/components/sections/musisi/FilterMusisi'
import GridMusisi from '@/components/sections/musisi/GridMusisi'

export const metadata = {
  title: 'Jelajahi Musisi — WAVEBOX',
  description: 'Direktori musisi indie Indonesia. Filter berdasarkan genre dan kota.',
}

export default function HalamanMusisi() {
  return (
    <div className="mx-auto w-full max-w-content px-5 py-12 md:px-12">
      <h1 className="font-display text-5xl md:text-6xl">Musisi</h1>
      <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-muted">
        Direktori musisi indie Indonesia. Saring berdasarkan genre, kota, atau yang sedang cari
        kolaborator.
      </p>
      <Suspense>
        <FilterMusisi />
        <GridMusisi />
      </Suspense>
    </div>
  )
}
