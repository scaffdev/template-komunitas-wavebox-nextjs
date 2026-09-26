import Link from 'next/link'
import { FORUM_THREADS, namaKategori } from '@/lib/data'

export default function ForumAktif() {
  const aktif = FORUM_THREADS.slice(0, 6)

  return (
    <section className="mx-auto w-full max-w-content px-5 pb-20 md:px-12">
      <h2 className="section-heading font-display text-3xl md:text-4xl">Diskusi Aktif</h2>
      <div>
        {aktif.map((t) => (
          <div key={t.slug} className="border-t border-border py-4 last:border-b">
            <Link href={`/forum/${t.slug}`} className="group grid gap-1 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-6">
              <span className="font-sans text-xs text-muted">{namaKategori(t.kategori)}</span>
              <span className="font-sans text-[15px] font-medium group-hover:text-accent">
                {t.judul}
              </span>
              <span className="font-sans text-xs text-muted">
                {t.penulis} · {t.waktu} · {t.jumlahBalasan} balasan
              </span>
            </Link>
          </div>
        ))}
      </div>
      <Link
        href="/forum"
        className="mt-6 inline-block font-sans text-sm text-muted transition-colors hover:text-accent"
      >
        Buka semua diskusi →
      </Link>
    </section>
  )
}
