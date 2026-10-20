import ProfilMusisi from '@/components/sections/musisi/ProfilMusisi'
import { MUSISI } from '@/lib/data'

export function generateStaticParams() {
  return MUSISI.map((m) => ({ slug: m.slug }))
}

export default async function HalamanProfil({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProfilMusisi slug={slug} />
}
