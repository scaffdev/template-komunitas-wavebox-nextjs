'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useProfil } from '@/lib/auth'
import { bacaDrafArtikel, bacaDrafEvent, hitungThreadSaya } from '@/lib/draf'

export default function IsiDashboard() {
  const profil = useProfil()
  const [jumlah, setJumlah] = useState({ artikel: 0, event: 0, thread: 0 })

  useEffect(() => {
    if (!profil) return
    setJumlah({
      artikel: bacaDrafArtikel().length,
      event: bacaDrafEvent().length,
      thread: hitungThreadSaya(profil.username),
    })
  }, [profil])

  if (!profil) {
    return (
      <div className="mx-auto w-full max-w-reading px-5 py-16">
        <h1 className="font-display text-5xl">Dashboard</h1>
        <p className="mt-6 border border-border bg-surface px-4 py-4 font-sans text-sm leading-relaxed text-muted">
          Halaman ini hanya untuk anggota. Silakan masuk dulu untuk mengelola profil dan kontenmu.
        </p>
        <div className="mt-6 flex gap-3">
          <Button href="/masuk">Masuk</Button>
          <Button href="/daftar" varian="ghost">
            Daftar
          </Button>
        </div>
      </div>
    )
  }

  const baris = [
    { href: '/dashboard/profil', label: 'Profil Saya', info: profil.namaTampil },
    { href: '/dashboard/artikel/baru', label: `Artikel Saya (${jumlah.artikel})`, info: 'Tulis & kelola' },
    { href: '/dashboard/event', label: `Event Saya (${jumlah.event})`, info: 'Buat & kelola' },
    { href: '/forum', label: `Balasan Saya (${jumlah.thread})`, info: 'Lihat forum' },
  ]

  return (
    <div className="mx-auto w-full max-w-reading px-5 py-12">
      <p className="font-sans text-sm text-muted">Dashboard</p>
      <h1 className="mt-2 font-display text-5xl">Halo, {profil.namaTampil}</h1>
      <hr className="divider my-8" />
      <div>
        {baris.map((b) => (
          <Link
            key={b.href}
            href={b.href}
            className="group flex items-baseline justify-between border-t border-border py-5 last:border-b"
          >
            <span className="font-sans text-base font-medium group-hover:text-accent">
              {b.label}
            </span>
            <span className="font-sans text-sm text-muted">
              {b.info} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
