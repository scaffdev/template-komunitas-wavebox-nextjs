'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Input'
import { FORUM_BALASANS, getThread, namaKategori } from '@/lib/data'
import type { ForumBalasan } from '@/types'
import { ambilProfil, useProfil } from '@/lib/auth'

function kunciBalasan(slug: string) {
  return `wb_balasan_${slug}`
}

function bacaBalasanLokal(slug: string): ForumBalasan[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(kunciBalasan(slug))
    return raw ? (JSON.parse(raw) as ForumBalasan[]) : []
  } catch {
    return []
  }
}

export default function ThreadDetail({ slug }: { slug: string }) {
  const profil = useProfil()
  const [isi, setIsi] = useState('')
  const [lokal, setLokal] = useState<ForumBalasan[]>([])

  const thread = getThread(slug)

  useEffect(() => {
    setLokal(bacaBalasanLokal(slug))
  }, [slug])

  if (!thread) {
    return (
      <div className="mx-auto w-full max-w-reading px-5 py-16">
        <p className="font-display text-3xl">Thread tidak ditemukan.</p>
        <Link href="/forum" className="mt-4 inline-block font-sans text-sm text-accent">
          ← Kembali ke forum
        </Link>
      </div>
    )
  }

  const seed = FORUM_BALASANS.filter((b) => b.threadSlug === slug)
  const semua = [...seed, ...lokal]

  function kirim(e: React.FormEvent) {
    e.preventDefault()
    const p = ambilProfil()
    if (!p || !isi.trim()) return
    const balasan: ForumBalasan = {
      threadSlug: slug,
      penulis: p.username,
      waktu: 'baru saja',
      isi: isi.trim(),
    }
    const baru = [...bacaBalasanLokal(slug), balasan]
    window.localStorage.setItem(kunciBalasan(slug), JSON.stringify(baru))
    setLokal(baru)
    setIsi('')
  }

  return (
    <div className="mx-auto w-full max-w-reading px-5 py-12">
      <nav className="font-sans text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/forum" className="hover:text-accent">
          Forum
        </Link>
        {' / '}
        <span>{namaKategori(thread.kategori)}</span>
      </nav>

      <h1 className="mt-4 font-display text-3xl leading-tight md:text-4xl">{thread.judul}</h1>
      <p className="mt-3 font-sans text-sm text-muted">
        oleh {thread.penulis} · {thread.waktu}
      </p>

      <hr className="divider my-8" />

      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-display text-base text-muted">
          {thread.penulis[0]?.toUpperCase()}
        </div>
        <div>
          <p className="font-sans text-sm font-semibold">{thread.penulis}</p>
          <p className="mt-2 font-sans text-[15px] leading-relaxed">{thread.isi}</p>
        </div>
      </div>

      <div className="mt-8">
        <p className="font-sans text-xs font-medium uppercase tracking-widest text-muted">
          {semua.length} Balasan
        </p>
        {semua.map((b, i) => (
          <div key={i} className="flex gap-4 border-t border-border py-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-display text-base text-muted">
              {b.penulis[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-sans text-sm">
                <span className="font-semibold">{b.penulis}</span>{' '}
                <span className="text-muted">· {b.waktu}</span>
              </p>
              <p className="mt-2 font-sans text-[15px] leading-relaxed">{b.isi}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-8">
        {profil ? (
          <form onSubmit={kirim}>
            <Textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              rows={4}
              required
              placeholder="Tulis balasanmu…"
              aria-label="Tulis balasan"
            />
            <Button type="submit" className="mt-3">
              Balas
            </Button>
          </form>
        ) : (
          <p className="border border-border bg-surface px-4 py-4 font-sans text-sm text-muted">
            <Link href="/masuk" className="text-accent hover:opacity-85">
              Masuk
            </Link>{' '}
            untuk ikut membalas thread ini.
          </p>
        )}
      </div>
    </div>
  )
}
