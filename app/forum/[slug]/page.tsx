import ThreadDetail from '@/components/sections/forum/ThreadDetail'
import { FORUM_THREADS } from '@/lib/data'

export function generateStaticParams() {
  return FORUM_THREADS.map((t) => ({ slug: t.slug }))
}

export default function HalamanThread({ params }: { params: { slug: string } }) {
  return <ThreadDetail slug={params.slug} />
}
