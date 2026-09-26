/**
 * URL foto deterministik via Picsum (seed per slug).
 * Efek BW → warna ditangani CSS `.foto-bw`, jadi URL selalu berwarna.
 */
export function fotoSeed(seed: string, w = 800, h = 533): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

export function fotoMusisi(slug: string): string {
  return fotoSeed(`wb-${slug}`, 800, 533)
}

export function fotoArtikel(slug: string): string {
  return fotoSeed(`wb-artikel-${slug}`, 800, 533)
}

export function fotoEvent(slug: string): string {
  return fotoSeed(`wb-event-${slug}`, 800, 533)
}

export function fotoGaleri(slug: string, i: number): string {
  return fotoSeed(`wb-${slug}-galeri-${i}`, 600, 600)
}
