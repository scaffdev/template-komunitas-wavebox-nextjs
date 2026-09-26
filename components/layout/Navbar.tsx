'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { hapusProfil, useProfil } from '@/lib/auth'

const MENU = [
  { href: '/musisi', label: 'Musisi' },
  { href: '/artikel', label: 'Artikel' },
  { href: '/event', label: 'Event' },
  { href: '/forum', label: 'Forum' },
]

function IkonMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 6h16M3 11h16M3 16h16" stroke="#EDEDED" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IkonTutup() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" stroke="#EDEDED" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Navbar() {
  const [buka, setBuka] = useState(false)
  const profil = useProfil()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <nav className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-5 md:px-12">
        <Link href="/" aria-label="WAVEBOX — beranda" onClick={() => setBuka(false)}>
          <Logo
            width={118}
            height={38}
            className="h-[32px] w-auto transition-opacity hover:opacity-85"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {MENU.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="font-sans text-sm text-muted transition-colors hover:text-primary"
            >
              {m.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          {profil ? (
            <>
              <Link href="/dashboard" className="font-sans text-sm text-primary hover:text-accent">
                {profil.namaTampil}
              </Link>
              <button
                type="button"
                onClick={hapusProfil}
                className="font-sans text-sm text-muted transition-colors hover:text-primary"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                href="/masuk"
                className="font-sans text-sm text-muted transition-colors hover:text-primary"
              >
                Masuk
              </Link>
              <Link
                href="/daftar"
                className="rounded bg-accent px-5 py-2.5 font-sans text-sm font-medium text-[#131314] shadow-[0_4px_20px_rgba(244,114,182,0.25)] transition-opacity hover:opacity-90"
              >
                Daftar
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={buka ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setBuka((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          {buka ? <IkonTutup /> : <IkonMenu />}
        </button>
      </nav>

      {buka && (
        <div className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-xs flex-col border-r border-border bg-surface px-6 py-6 shadow-[24px_0_64px_rgba(0,0,0,0.5)] md:hidden">
          <div className="flex items-center justify-between">
            <Logo width={104} height={34} className="h-[30px] w-auto" />
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setBuka(false)}
              className="flex h-10 w-10 items-center justify-center"
            >
              <IkonTutup />
            </button>
          </div>
          <div className="mt-8 flex flex-col">
            {MENU.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                onClick={() => setBuka(false)}
                className="border-t border-border py-4 font-display text-2xl text-primary last:border-b"
              >
                {m.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            {profil ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setBuka(false)}
                  className="rounded bg-accent px-5 py-2.5 text-center font-sans text-sm font-medium text-bg"
                >
                  {profil.namaTampil}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    hapusProfil()
                    setBuka(false)
                  }}
                  className="rounded border border-border px-5 py-2.5 text-center font-sans text-sm text-primary"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/daftar"
                  onClick={() => setBuka(false)}
                  className="rounded bg-accent px-5 py-2.5 text-center font-sans text-sm font-medium text-bg"
                >
                  Daftar
                </Link>
                <Link
                  href="/masuk"
                  onClick={() => setBuka(false)}
                  className="rounded border border-border px-5 py-2.5 text-center font-sans text-sm text-primary"
                >
                  Masuk
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
