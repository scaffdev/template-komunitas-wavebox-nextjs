export type Genre = {
  nama: string
  slug: string
}

export type Karya = {
  judul: string
  tipe: 'single' | 'ep' | 'album'
  tahun: number
  platform: string
  link: string
}

export type Musisi = {
  slug: string
  nama: string
  kota: string
  genres: string[]
  tagline: string
  bio: string
  bergabung: string
  fotoUrl: string | null
  cariKolaborasi: boolean
  kebutuhanKolaborasi: string | null
  links: { label: string; url: string }[]
  karya: Karya[]
  galeri: number
}

export type ArtikelTipe = 'review' | 'feature' | 'opini' | 'tips'

export type Artikel = {
  slug: string
  judul: string
  tipe: ArtikelTipe
  penulis: string
  penulisBio: string
  tanggal: string
  estimasiBaca: number
  genres: string[]
  fotoUrl: string | null
  ringkasan: string
  isi: string[]
  kutipan?: string
}

export type EventItem = {
  slug: string
  nama: string
  tanggal: string
  jamMulai: string | null
  venue: string
  kota: string
  deskripsi: string
  lineup: string[]
  linkTiket: string | null
  fotoUrl: string | null
  featured: boolean
  selesai: boolean
}

export type ForumKategori = {
  nama: string
  slug: string
  deskripsi: string
  jumlahThread: number
  jumlahBalasan: number
}

export type ForumThread = {
  slug: string
  kategori: string
  judul: string
  penulis: string
  waktu: string
  jumlahBalasan: number
  isi: string
}

export type ForumBalasan = {
  threadSlug: string
  penulis: string
  waktu: string
  isi: string
}

export type LocalProfile = {
  username: string
  namaTampil: string
  email: string
}
