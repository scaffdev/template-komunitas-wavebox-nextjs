/** Estimasi menit baca: 200 kata per menit, minimal 1 menit. */
export function estimasiBaca(teks: string): number {
  const kata = teks.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(kata / 200))
}
