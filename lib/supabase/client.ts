import { createBrowserClient } from '@supabase/ssr'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseTerkonfigurasi = Boolean(url && anon)

/** Browser client. null kalau env Supabase belum diisi (mode demo lokal). */
export function buatSupabaseBrowser() {
  if (!supabaseTerkonfigurasi) return null
  return createBrowserClient(url as string, anon as string)
}
