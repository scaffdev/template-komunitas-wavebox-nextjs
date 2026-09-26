'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Input, Label, Textarea } from '@/components/ui/Input'
import { ambilProfil, simpanProfil, useProfil } from '@/lib/auth'
import { bacaEkstraProfil, tulisEkstraProfil } from '@/lib/draf'

export default function FormProfil() {
  const profil = useProfil()
  const [nama, setNama] = useState('')
  const [kota, setKota] = useState('')
  const [bio, setBio] = useState('')
  const [tersimpan, setTersimpan] = useState(false)

  useEffect(() => {
    const p = ambilProfil()
    if (p) setNama(p.namaTampil)
    const ekstra = bacaEkstraProfil()
    setKota(ekstra.kota)
    setBio(ekstra.bio)
  }, [])

  if (!profil) {
    return (
      <div className="mx-auto w-full max-w-reading px-5 py-16">
        <p className="font-sans text-sm text-muted">
          <Link href="/masuk" className="text-accent hover:opacity-85">
            Masuk
          </Link>{' '}
          dulu untuk mengedit profil.
        </p>
      </div>
    )
  }

  function kirim(e: React.FormEvent) {
    e.preventDefault()
    const p = ambilProfil()
    if (!p) return
    simpanProfil({ ...p, namaTampil: nama.trim() || p.namaTampil })
    tulisEkstraProfil({ kota: kota.trim(), bio: bio.trim() })
    setTersimpan(true)
  }

  return (
    <div className="mx-auto w-full max-w-reading px-5 py-12">
      <nav className="font-sans text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/dashboard" className="hover:text-accent">
          Dashboard
        </Link>
        {' / '}Edit Profil
      </nav>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Edit Profil</h1>
      <form onSubmit={kirim} className="mt-8">
        <div className="mb-4">
          <Label htmlFor="nama">Nama tampil</Label>
          <Input id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className="mb-4">
          <Label htmlFor="kota">Kota</Label>
          <Input
            id="kota"
            value={kota}
            onChange={(e) => setKota(e.target.value)}
            placeholder="mis. Bandung"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="bio">Bio singkat</Label>
          <Textarea
            id="bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Ceritakan tentangmu dan musikmu…"
          />
        </div>
        {tersimpan && (
          <p className="mb-4 font-sans text-sm text-accent">Profil tersimpan.</p>
        )}
        <Button type="submit">Simpan</Button>
      </form>
    </div>
  )
}
