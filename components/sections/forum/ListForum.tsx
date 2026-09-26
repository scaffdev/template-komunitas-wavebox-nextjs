import Link from 'next/link'
import { FORUM_KATEGORIS, FORUM_THREADS, namaKategori } from '@/lib/data'

export default function ListKategori() {
  return (
    <div>
      <h2 className="section-heading font-display text-2xl md:text-3xl">Kategori</h2>
      <div>
        {FORUM_KATEGORIS.map((k) => (
          <div key={k.slug} className="grid gap-1 border-t border-border py-5 last:border-b md:grid-cols-[1fr_auto] md:items-baseline">
            <div>
              <p className="font-sans text-base font-semibold">{k.nama}</p>
              <p className="mt-1 font-sans text-sm text-muted">{k.deskripsi}</p>
            </div>
            <p className="font-sans text-xs text-muted">
              {k.jumlahThread} thread · {k.jumlahBalasan} balasan
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ListThread({ batas }: { batas?: number }) {
  const daftar = batas ? FORUM_THREADS.slice(0, batas) : FORUM_THREADS
  return (
    <div>
      {daftar.map((t) => (
        <div key={t.slug} className="border-t border-border py-4 last:border-b">
          <Link
            href={`/forum/${t.slug}`}
            className="group grid gap-1 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-6"
          >
            <span className="font-sans text-xs text-muted">[{namaKategori(t.kategori)}]</span>
            <span className="font-sans text-[15px] font-medium group-hover:text-accent">
              {t.judul}
            </span>
            <span className="font-sans text-xs text-muted">
              oleh {t.penulis} · {t.waktu} · {t.jumlahBalasan} balasan
            </span>
          </Link>
        </div>
      ))}
    </div>
  )
}
