'use client'

import { useState } from 'react'
import Link from 'next/link'
import FotoMusisi from '@/components/ui/FotoMusisi'
import { Select } from '@/components/ui/Input'
import { EVENTS, KOTAS } from '@/lib/data'
import { formatTanggalPendek, kunciBulan, namaHari } from '@/lib/utils/date'

export default function ListEvent() {
  const [kota, setKota] = useState('')
  const [status, setStatus] = useState<'semua' | 'upcoming' | 'selesai'>('semua')

  const hasil = EVENTS.filter((e) => {
    if (kota && e.kota !== kota) return false
    if (status === 'upcoming' && e.selesai) return false
    if (status === 'selesai' && !e.selesai) return false
    return true
  })

  const grup: Record<string, typeof hasil> = {}
  for (const e of hasil) {
    const k = kunciBulan(e.tanggal)
    if (!grup[k]) grup[k] = []
    grup[k].push(e)
  }

  return (
    <div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Select aria-label="Filter kota" value={kota} onChange={(e) => setKota(e.target.value)}>
          <option value="">Semua Kota</option>
          {KOTAS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Filter status"
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
        >
          <option value="semua">Semua</option>
          <option value="upcoming">Upcoming</option>
          <option value="selesai">Selesai</option>
        </Select>
      </div>

      {hasil.length === 0 && (
        <p className="mt-12 border-t border-border pt-8 font-sans text-sm text-muted">
          Tidak ada event yang cocok dengan filter.
        </p>
      )}

      {Object.entries(grup).map(([bulan, daftar]) => (
        <div key={bulan} className="mt-12">
          <h2 className="section-heading font-display text-2xl md:text-3xl">{bulan}</h2>
          <div>
            {daftar.map((e) => (
              <div
                key={e.slug}
                className={`border-t border-border py-5 last:border-b ${e.selesai ? 'opacity-50' : ''}`}
              >
                {e.featured && !e.selesai && (
                  <Link href={`/event/${e.slug}`} className="group mb-5 grid gap-5 md:grid-cols-2">
                    <FotoMusisi nama={e.nama} fotoUrl={e.fotoUrl} rasio="3:2" />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-accent">
                        Featured
                      </p>
                      <p className="mt-2 font-display text-3xl leading-tight group-hover:text-accent">
                        {e.nama}
                      </p>
                      <p className="mt-2 font-sans text-sm text-muted">
                        {namaHari(e.tanggal)}, {formatTanggalPendek(e.tanggal)}
                        {e.jamMulai ? ` · ${e.jamMulai}` : ''} · {e.venue}, {e.kota}
                      </p>
                      <p className="mt-2 font-sans text-sm text-muted">
                        Line-up: {e.lineup.join(', ')}
                      </p>
                    </div>
                  </Link>
                )}
                {(!e.featured || e.selesai) && (
                  <Link
                    href={`/event/${e.slug}`}
                    className="group grid gap-1 md:grid-cols-[140px_1fr] md:gap-6"
                  >
                    <p className="font-sans text-sm text-muted">
                      {formatTanggalPendek(e.tanggal)}
                      <span className="ml-2">{namaHari(e.tanggal)}</span>
                    </p>
                    <div>
                      <p className="font-display text-2xl group-hover:text-accent">{e.nama}</p>
                      <p className="mt-1 font-sans text-sm text-muted">
                        {e.venue}, {e.kota}
                      </p>
                      <p className="mt-1 font-sans text-sm text-muted">
                        Line-up: {e.lineup.join(', ')}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
