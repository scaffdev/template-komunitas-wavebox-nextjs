import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = {
  children: ReactNode
  varian?: 'primary' | 'ghost'
  href?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const KELAS = {
  primary: 'bg-accent text-[#131314] shadow-[0_4px_20px_rgba(244,114,182,0.25)] hover:opacity-90',
  ghost: 'bg-transparent text-primary border border-borderlight hover:border-muted hover:bg-surface',
}

export default function Button({ children, varian = 'primary', href, ...rest }: Props) {
  const kelas = `inline-block rounded px-5 py-2.5 font-sans text-sm font-medium transition-opacity ${KELAS[varian]} ${rest.className ?? ''}`
  if (href) {
    return (
      <Link href={href} className={kelas}>
        {children}
      </Link>
    )
  }
  return (
    <button type={rest.type ?? 'button'} {...rest} className={kelas}>
      {children}
    </button>
  )
}
