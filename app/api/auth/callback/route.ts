import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

/** Callback OAuth / verifikasi email Supabase. */
export async function GET(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const asal = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin

  if (!url || !anon) {
    return NextResponse.redirect(`${asal}/masuk`)
  }

  const kode = request.nextUrl.searchParams.get('code')
  if (kode) {
    const response = NextResponse.redirect(`${asal}/dashboard`)
    const supabase = createServerClient(url, anon, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    })
    await supabase.auth.exchangeCodeForSession(kode)
    return response
  }

  return NextResponse.redirect(`${asal}/masuk`)
}
