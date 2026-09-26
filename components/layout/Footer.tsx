import Link from 'next/link'
import Logo from '@/components/Logo'

const NAV = [
  { href: '/musisi', label: 'Musisi' },
  { href: '/artikel', label: 'Artikel' },
  { href: '/event', label: 'Event' },
  { href: '/forum', label: 'Forum' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto w-full max-w-content px-5 py-12 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Logo width={132} height={43} className="h-[36px] w-auto" />
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-muted">
              Satu tempat. Semua musisi indie Indonesia.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-16 gap-y-3 md:flex md:gap-8">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="font-sans text-sm text-muted transition-colors hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/masuk"
              className="font-sans text-sm text-muted transition-colors hover:text-primary"
            >
              Masuk
            </Link>
            <Link
              href="/daftar"
              className="font-sans text-sm text-muted transition-colors hover:text-primary"
            >
              Daftar
            </Link>
          </nav>
        </div>
        <hr className="divider mt-10" />
        <p className="mt-6 font-sans text-xs text-muted">
          © 2026 WAVEBOX. Komunitas Musik Indie Indonesia.
        </p>
      </div>
    </footer>
  )
}
