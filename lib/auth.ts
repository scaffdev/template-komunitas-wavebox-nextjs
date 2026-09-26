'use client'

import { useCallback, useEffect, useState } from 'react'
import type { LocalProfile } from '@/types'

const KEY = 'wb_profile'
const EVENT = 'wb-auth-change'

function baca(): LocalProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as LocalProfile) : null
  } catch {
    return null
  }
}

/**
 * Auth demo lokal (dipakai selama Supabase belum dikonfigurasi).
 * Nanti diganti Supabase Auth tanpa mengubah halaman.
 */
export function simpanProfil(p: LocalProfile) {
  window.localStorage.setItem(KEY, JSON.stringify(p))
  window.dispatchEvent(new Event(EVENT))
}

export function hapusProfil() {
  window.localStorage.removeItem(KEY)
  window.dispatchEvent(new Event(EVENT))
}

export function ambilProfil(): LocalProfile | null {
  return baca()
}

export function useProfil(): LocalProfile | null {
  const [profil, setProfil] = useState<LocalProfile | null>(null)

  const segarkan = useCallback(() => setProfil(baca()), [])

  useEffect(() => {
    segarkan()
    window.addEventListener(EVENT, segarkan)
    window.addEventListener('storage', segarkan)
    return () => {
      window.removeEventListener(EVENT, segarkan)
      window.removeEventListener('storage', segarkan)
    }
  }, [segarkan])

  return profil
}
