import ThreadDetail from '@/components/sections/forum/ThreadDetail'
import { FORUM_THREADS } from '@/lib/data'

export function generateStaticParams() {
  return FORUM_THREADS.map((t) => ({ slug: t.slug }))
}

export default async function HalamanThread({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ThreadDetail slug={slug} />
}
