'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Input, Label, Select, Textarea } from '@/components/ui/Input'
import { useProfil } from '@/lib/auth'
import { bacaDrafArtikel, tambahDrafArtikel, type DrafArtikel } from '@/lib/draf'
import { TIPE_ARTIKEL } from '@/lib/data'
import { estimasiBaca } from '@/lib/utils/reading-time'

export default function FormArtikelBaru() {
  const profil = useProfil()
  const [judul, setJudul] = useState('')
  const [tipe, setTipe] = useState('review')
  const [isi, setIsi] = useState('')
  const [draf, setDraf] = useState<DrafArtikel[]>([])
  const [tersimpan, setTersimpan] = useState(false)

  useEffect(() => {
    setDraf(bacaDrafArtikel())
  }, [])

  if (!profil) {
    return (
      <div className="mx-auto w-full max-w-reading px-5 py-16">
        <p className="font-sans text-sm text-muted">
          <Link href="/masuk" className="text-accent hover:opacity-85">
            Masuk
          </Link>{' '}
          dulu untuk menulis artikel.
        </p>
      </div>
    )
  }

  function kirim(e: React.FormEvent) {
    e.preventDefault()
    if (!judul.trim() || !isi.trim()) return
    const baru = {
      judul: judul.trim(),
      tipe,
      isi: isi.trim(),
      dibuat: new Date().toISOString(),
    }
    tambahDrafArtikel(baru)
    setDraf(bacaDrafArtikel())
    setJudul('')
    setIsi('')
    setTersimpan(true)
  }

  return (
    <div className="mx-auto w-full max-w-reading px-5 py-12">
      <nav className="font-sans text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/dashboard" className="hover:text-accent">
          Dashboard
        </Link>
        {' / '}Artikel Baru
      </nav>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Tulis Artikel</h1>
      <form onSubmit={kirim} className="mt-8">
        <div className="mb-4">
          <Label htmlFor="judul">Judul</Label>
          <Input
            id="judul"
            required
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Judul yang panjang dan deskriptif"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="tipe">Tipe</Label>
          <Select id="tipe" value={tipe} onChange={(e) => setTipe(e.target.value)}>
            {TIPE_ARTIKEL.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.nama}
              </option>
            ))}
          </Select>
        </div>
        <div className="mb-2">
          <Label htmlFor="isi">Isi</Label>
          <Textarea
            id="isi"
            rows={10}
            required
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            placeholder="Tulis dengan santai. Pisahkan paragraf dengan baris kosong."
          />
        </div>
        <p className="mb-6 font-sans text-xs text-muted">
          Estimasi: {estimasiBaca(isi)} menit baca.
        </p>
        {tersimpan && (
          <p className="mb-4 font-sans text-sm text-accent">Draf tersimpan di browser ini.</p>
        )}
        <Button type="submit">Simpan Draf</Button>
      </form>

      {draf.length > 0 && (
        <div className="mt-12">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-muted">
            Draf Saya
          </p>
          <div className="mt-2">
            {draf.map((d, i) => (
              <div key={i} className="border-b border-border py-4">
                <p className="font-display text-lg">{d.judul}</p>
                <p className="mt-1 font-sans text-xs capitalize text-muted">
                  {d.tipe} · {estimasiBaca(d.isi)} menit baca
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
