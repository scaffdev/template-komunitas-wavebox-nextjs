type Props = {
  label: string
  aktif?: boolean
  onClick?: () => void
}

/** Label genre: pill kecil, border saja, tanpa background fill. */
export default function GenreTag({ label, aktif = false, onClick }: Props) {
  const kelas = `inline-block rounded-sm border px-2 py-0.5 font-sans text-[11px] font-medium uppercase tracking-[0.05em] transition-colors ${
    aktif
      ? 'border-accent bg-[rgba(244,114,182,0.12)] text-accentsoft'
      : 'border-border text-muted hover:border-borderlight hover:text-primary'
  }`
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={kelas} aria-pressed={aktif}>
        {label}
      </button>
    )
  }
  return <span className={kelas}>{label}</span>
}
