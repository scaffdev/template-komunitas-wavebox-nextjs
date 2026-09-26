import Sorotan from '@/components/sections/beranda/Sorotan'
import MusisiBaru from '@/components/sections/beranda/MusisiBaru'
import ArtikelTerbaru from '@/components/sections/beranda/ArtikelTerbaru'
import EventMingguIni from '@/components/sections/beranda/EventMingguIni'
import ForumAktif from '@/components/sections/beranda/ForumAktif'

export default function Beranda() {
  return (
    <>
      <div className="mx-auto w-full max-w-content px-5 pt-12 md:px-12 md:pt-16">
        <p className="font-display text-xl italic text-muted md:text-2xl">
          Komunitas Musik Indie Indonesia
        </p>
        <hr className="divider mt-6" />
      </div>

      <div className="mx-auto grid w-full max-w-content gap-12 px-5 py-12 md:grid-cols-12 md:gap-6 md:px-12">
        <div className="md:col-span-7">
          <Sorotan />
          <ArtikelTerbaru />
        </div>
        <div className="md:col-span-5">
          <MusisiBaru />
          <EventMingguIni />
        </div>
      </div>

      <hr className="divider mx-auto w-full max-w-content" />
      <div className="pt-12">
        <ForumAktif />
      </div>
    </>
  )
}
