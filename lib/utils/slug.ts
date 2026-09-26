import slugifyLib from 'slugify'

export function makeSlug(teks: string): string {
  return slugifyLib(teks, { lower: true, strict: true, locale: 'id' })
}
