'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { simpanProfil } from '@/lib/auth'
import { buatSupabaseBrowser, supabaseTerkonfigurasi } from '@/lib/supabase/client'
import { makeSlug } from '@/lib/utils/slug'

export default function FormDaftar() {
  const router = useRouter()
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [sibuk, setSibuk] = useState(false)

  async function kirim(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSibuk(true)
    try {
      const username = makeSlug(nama).replace(/-/g, '_').slice(0, 30)
      if (!username) throw new Error('Nama tampil tidak valid')
      const sb = buatSupabaseBrowser()
      if (sb) {
        const { error: err } = await sb.auth.signUp({
          email,
          password,
          options: { data: { username, nama_tampil: nama } },
        })
        if (err) throw new Error(err.message)
      }
      simpanProfil({ username, namaTampil: nama, email })
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mendaftar. Coba lagi.')
    } finally {
      setSibuk(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-reading px-5 py-16">
      <h1 className="font-display text-5xl">Daftar</h1>
      <p className="mt-3 font-sans text-[15px] text-muted">
        Sudah punya akun?{' '}
        <Link href="/masuk" className="text-accent hover:opacity-85">
          Masuk di sini
        </Link>
      </p>
      {!supabaseTerkonfigurasi && (
        <p className="mt-6 border border-border bg-surface px-4 py-3 font-sans text-sm text-muted">
          Mode demo: akun tersimpan di browser ini saja.
        </p>
      )}
      <form onSubmit={kirim} className="mt-8">
        <div className="mb-4">
          <Label htmlFor="nama">Nama tampil</Label>
          <Input
            id="nama"
            required
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama panggung atau nama aslimu"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 6 karakter"
          />
        </div>
        {error && <p className="mb-4 font-sans text-sm text-accent">{error}</p>}
        <Button type="submit" disabled={sibuk}>
          {sibuk ? 'Mendaftar…' : 'Daftar'}
        </Button>
      </form>
    </div>
  )
}
