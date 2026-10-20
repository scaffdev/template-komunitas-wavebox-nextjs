import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/** Callback OAuth / verifikasi email Supabase. */
export async function GET(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const asal = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

  if (!url || !key) {
    return NextResponse.redirect(`${asal}/masuk`);
  }

  const kode = request.nextUrl.searchParams.get("code");
  if (kode) {
    const response = NextResponse.redirect(`${asal}/dashboard`);
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });
    await supabase.auth.exchangeCodeForSession(kode);
    return response;
  }

  return NextResponse.redirect(`${asal}/masuk`);
}
