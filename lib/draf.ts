'use client'

function baca<T>(kunci: string, awal: T): T {
  if (typeof window === 'undefined') return awal
  try {
    const raw = window.localStorage.getItem(kunci)
    return raw ? (JSON.parse(raw) as T) : awal
  } catch {
    return awal
  }
}

function tulis(kunci: string, nilai: unknown) {
  window.localStorage.setItem(kunci, JSON.stringify(nilai))
}

export type DrafArtikel = {
  judul: string
  tipe: string
  isi: string
  dibuat: string
}

export type DrafEvent = {
  nama: string
  tanggal: string
  venue: string
  kota: string
  deskripsi: string
  lineup: string
  dibuat: string
}

export function bacaDrafArtikel(): DrafArtikel[] {
  return baca<DrafArtikel[]>('wb_draf_artikel', [])
}

export function tambahDrafArtikel(d: DrafArtikel) {
  tulis('wb_draf_artikel', [...bacaDrafArtikel(), d])
}

export function bacaDrafEvent(): DrafEvent[] {
  return baca<DrafEvent[]>('wb_draf_event', [])
}

export function tambahDrafEvent(d: DrafEvent) {
  tulis('wb_draf_event', [...bacaDrafEvent(), d])
}

/** Hitung balasan forum yang ditulis user di browser ini. */
export function hitungThreadSaya(username: string): number {
  if (typeof window === 'undefined') return 0
  let jumlah = 0
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const kunci = window.localStorage.key(i)
      if (!kunci?.startsWith('wb_balasan_')) continue
      const daftar = JSON.parse(window.localStorage.getItem(kunci) ?? '[]') as {
        penulis: string
      }[]
      jumlah += daftar.filter((b) => b.penulis === username).length
    }
  } catch {
    /* abaikan */
  }
  return jumlah
}

export function bacaEkstraProfil(): { kota: string; bio: string } {
  return baca('wb_profil_ekstra', { kota: '', bio: '' })
}

export function tulisEkstraProfil(v: { kota: string; bio: string }) {
  tulis('wb_profil_ekstra', v)
}
