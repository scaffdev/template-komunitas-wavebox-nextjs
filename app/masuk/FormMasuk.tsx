'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { simpanProfil } from '@/lib/auth'
import { buatSupabaseBrowser, supabaseTerkonfigurasi } from '@/lib/supabase/client'

export default function FormMasuk() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [sibuk, setSibuk] = useState(false)

  async function kirim(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSibuk(true)
    try {
      const sb = buatSupabaseBrowser()
      if (sb) {
        const { error: err } = await sb.auth.signInWithPassword({ email, password })
        if (err) throw new Error(err.message)
        const nama = email.split('@')[0] ?? 'anggota'
        simpanProfil({ username: nama, namaTampil: nama, email })
      } else {
        const nama = email.split('@')[0] ?? 'anggota'
        if (!nama) throw new Error('Email tidak valid')
        simpanProfil({ username: nama, namaTampil: nama, email })
      }
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal masuk. Coba lagi.')
    } finally {
      setSibuk(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-reading px-5 py-16">
      <h1 className="font-display text-5xl">Masuk</h1>
      <p className="mt-3 font-sans text-[15px] text-muted">
        Belum punya akun?{' '}
        <Link href="/daftar" className="text-accent hover:opacity-85">
          Daftar di sini
        </Link>
      </p>
      {!supabaseTerkonfigurasi && (
        <p className="mt-6 border border-border bg-surface px-4 py-3 font-sans text-sm text-muted">
          Mode demo: Supabase belum dikonfigurasi. Masuk dengan email apa pun untuk mencoba
          dashboard.
        </p>
      )}
      <form onSubmit={kirim} className="mt-8">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        {error && <p className="mb-4 font-sans text-sm text-accent">{error}</p>}
        <Button type="submit" disabled={sibuk}>
          {sibuk ? 'Memeriksa…' : 'Masuk'}
        </Button>
      </form>
    </div>
  )
}
