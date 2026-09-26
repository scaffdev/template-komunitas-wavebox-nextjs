type Props = {
  nama: string
  fotoUrl?: string | null
  rasio?: '1:1' | '3:2'
  className?: string
}

function inisial(nama: string): string {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((k) => k[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * Foto musisi: hitam-putih default → berwarna saat hover.
 * Tanpa foto: rectangle surface dengan border dash + inisial.
 */
export default function FotoMusisi({ nama, fotoUrl, rasio = '3:2', className = '' }: Props) {
  const aspek = rasio === '1:1' ? 'aspect-square' : 'aspect-[3/2]'
  if (!fotoUrl) {
    return (
      <div
        className={`foto-placeholder flex ${aspek} w-full items-center justify-center rounded ${className}`}
        role="img"
        aria-label={`Foto ${nama} belum tersedia`}
      >
        <span className="font-display text-4xl text-faint">{inisial(nama)}</span>
      </div>
    )
  }
  return (
    <div className={`foto-bw ${aspek} w-full overflow-hidden rounded bg-surface ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={fotoUrl} alt={nama} className="h-full w-full object-cover" loading="lazy" />
    </div>
  )
}
