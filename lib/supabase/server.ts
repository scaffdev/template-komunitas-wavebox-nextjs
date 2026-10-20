import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function env(): { url?: string; key?: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key };
}

/**
 * Server client untuk Server Component / Server Action / Route Handler.
 * Mengembalikan `null` bila env belum diisi (mode demo lokal).
 */
export async function buatSupabaseServer() {
  const { url, key } = env();
  if (!url || !key) return null;

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Dipanggil dari Server Component (cookie read-only) — abaikan.
        }
      },
    },
  });
}
