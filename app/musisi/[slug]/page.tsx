import ProfilMusisi from '@/components/sections/musisi/ProfilMusisi'
import { MUSISI } from '@/lib/data'

export function generateStaticParams() {
  return MUSISI.map((m) => ({ slug: m.slug }))
}

export default function HalamanProfil({ params }: { params: { slug: string } }) {
  return <ProfilMusisi slug={params.slug} />
}
