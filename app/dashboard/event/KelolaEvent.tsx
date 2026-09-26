'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Input, Label, Textarea } from '@/components/ui/Input'
import { useProfil } from '@/lib/auth'
import { bacaDrafEvent, tambahDrafEvent, type DrafEvent } from '@/lib/draf'
import { formatTanggal } from '@/lib/utils/date'

export default function KelolaEvent() {
  const profil = useProfil()
  const [nama, setNama] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [venue, setVenue] = useState('')
  const [kota, setKota] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [lineup, setLineup] = useState('')
  const [daftar, setDaftar] = useState<DrafEvent[]>([])
  const [tersimpan, setTersimpan] = useState(false)

  useEffect(() => {
    setDaftar(bacaDrafEvent())
  }, [])

  if (!profil) {
    return (
      <div className="mx-auto w-full max-w-reading px-5 py-16">
        <p className="font-sans text-sm text-muted">
          <Link href="/masuk" className="text-accent hover:opacity-85">
            Masuk
          </Link>{' '}
          dulu untuk mengelola event.
        </p>
      </div>
    )
  }

  function kirim(e: React.FormEvent) {
    e.preventDefault()
    if (!nama.trim() || !tanggal) return
    tambahDrafEvent({
      nama: nama.trim(),
      tanggal,
      venue: venue.trim(),
      kota: kota.trim(),
      deskripsi: deskripsi.trim(),
      lineup: lineup.trim(),
      dibuat: new Date().toISOString(),
    })
    setDaftar(bacaDrafEvent())
    setNama('')
    setTanggal('')
    setVenue('')
    setKota('')
    setDeskripsi('')
    setLineup('')
    setTersimpan(true)
  }

  return (
    <div className="mx-auto w-full max-w-reading px-5 py-12">
      <nav className="font-sans text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/dashboard" className="hover:text-accent">
          Dashboard
        </Link>
        {' / '}Event Saya
      </nav>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Event Saya</h1>

      <form onSubmit={kirim} className="mt-8">
        <div className="mb-4">
          <Label htmlFor="nama">Nama event</Label>
          <Input id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="tanggal">Tanggal</Label>
            <Input
              id="tanggal"
              type="date"
              required
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="kota">Kota</Label>
            <Input id="kota" value={kota} onChange={(e) => setKota(e.target.value)} />
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="venue">Venue</Label>
          <Input id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
        </div>
        <div className="mb-4">
          <Label htmlFor="lineup">Line-up (pisahkan koma)</Label>
          <Input id="lineup" value={lineup} onChange={(e) => setLineup(e.target.value)} />
        </div>
        <div className="mb-6">
          <Label htmlFor="deskripsi">Deskripsi</Label>
          <Textarea
            id="deskripsi"
            rows={4}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>
        {tersimpan && (
          <p className="mb-4 font-sans text-sm text-accent">Event tersimpan di browser ini.</p>
        )}
        <Button type="submit">Tambah Event</Button>
      </form>

      {daftar.length > 0 && (
        <div className="mt-12">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-muted">
            Event Saya
          </p>
          <div className="mt-2">
            {daftar.map((d, i) => (
              <div key={i} className="border-b border-border py-4">
                <p className="font-display text-lg">{d.nama}</p>
                <p className="mt-1 font-sans text-xs text-muted">
                  {formatTanggal(d.tanggal)}
                  {d.venue ? ` · ${d.venue}` : ''}
                  {d.kota ? `, ${d.kota}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
