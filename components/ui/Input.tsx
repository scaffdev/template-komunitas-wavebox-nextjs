import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

const KELAS =
  'w-full rounded border border-border bg-surface px-3.5 py-2.5 font-sans text-sm text-primary shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] placeholder:text-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${KELAS} ${props.className ?? ''}`} />
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${KELAS} ${props.className ?? ''}`} />
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${KELAS} ${props.className ?? ''}`} />
}

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-sans text-xs font-medium text-muted">
      {children}
    </label>
  )
}
