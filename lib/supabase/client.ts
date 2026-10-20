import { createBrowserClient } from "@supabase/ssr";

function env(): { url?: string; key?: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Project baru Supabase memakai publishable key; anon key lama tetap didukung.
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key };
}

/** True bila env Supabase terisi. Dipakai UI untuk menampilkan info "mode demo". */
export const supabaseTerkonfigurasi = Boolean(env().url && env().key);

/**
 * Browser client untuk Client Component. Mengembalikan `null` bila env belum
 * diisi, agar halaman auth tetap berjalan dalam mode demo lokal.
 */
export function buatSupabaseBrowser() {
  const { url, key } = env();
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}
