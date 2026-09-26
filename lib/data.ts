import type {
  Artikel,
  EventItem,
  ForumBalasan,
  ForumKategori,
  ForumThread,
  Genre,
  Musisi,
} from '@/types'
import { fotoArtikel, fotoEvent, fotoMusisi } from '@/lib/foto'

export const GENRES: Genre[] = [
  { nama: 'Indie Folk', slug: 'indie-folk' },
  { nama: 'Indie Pop', slug: 'indie-pop' },
  { nama: 'Math Rock', slug: 'math-rock' },
  { nama: 'Emo', slug: 'emo' },
  { nama: 'Shoegaze', slug: 'shoegaze' },
  { nama: 'Dream Pop', slug: 'dream-pop' },
  { nama: 'Ambient', slug: 'ambient' },
  { nama: 'Jazz Indie', slug: 'jazz-indie' },
  { nama: 'Post-Punk', slug: 'post-punk' },
  { nama: 'Lo-Fi', slug: 'lo-fi' },
]

export const KOTAS = [
  'Jakarta',
  'Bandung',
  'Yogyakarta',
  'Surabaya',
  'Semarang',
  'Malang',
  'Denpasar',
]

export function namaGenre(slug: string): string {
  return GENRES.find((g) => g.slug === slug)?.nama ?? slug
}

export const MUSISI: Musisi[] = [
  {
    slug: 'nadia-sore',
    nama: 'Nadia Sore',
    kota: 'Bandung',
    genres: ['indie-folk', 'indie-pop'],
    tagline: 'Lagu-lagu kamar untuk perjalanan jauh.',
    bio: 'Nadia Sore menulis lagu di kamar kosnya sejak 2021. Gitar akustik, sesekali synth pinjaman, dan lirik tentang kota yang berubah lebih cepat dari ingatan. EP perdananya direkam mandiri dan disebar dari kamar ke kamar.',
    bergabung: 'Maret 2025',
    fotoUrl: fotoMusisi('nadia-sore'),
    cariKolaborasi: true,
    kebutuhanKolaborasi: 'Butuh: produser strings & artwork designer',
    links: [
      { label: 'Spotify', url: 'https://spotify.com' },
      { label: 'Bandcamp', url: 'https://bandcamp.com' },
      { label: 'Instagram', url: 'https://instagram.com' },
    ],
    karya: [
      { judul: 'Jendela Kos', tipe: 'single', tahun: 2025, platform: 'Spotify', link: 'https://spotify.com' },
      { judul: 'Kamar ke Kamar', tipe: 'ep', tahun: 2024, platform: 'Bandcamp', link: 'https://bandcamp.com' },
      { judul: 'Senja Terakhir di Dago', tipe: 'single', tahun: 2024, platform: 'YouTube', link: 'https://youtube.com' },
    ],
    galeri: 6,
  },
  {
    slug: 'kala-senja',
    nama: 'Kala Senja',
    kota: 'Yogyakarta',
    genres: ['shoegaze', 'dream-pop'],
    tagline: 'Gitar berlapis, vokal seperti kabut.',
    bio: 'Kuartet asal Yogyakarta yang terobsesi pada pedal reverb dan suara gamelan yang disampling. Terbentuk dari tongkrongan rental studio, kini rutin mengisi panggung-panggung kecil Jogja dan Solo.',
    bergabung: 'April 2025',
    fotoUrl: fotoMusisi('kala-senja'),
    cariKolaborasi: false,
    kebutuhanKolaborasi: null,
    links: [
      { label: 'Spotify', url: 'https://spotify.com' },
      { label: 'Instagram', url: 'https://instagram.com' },
    ],
    karya: [
      { judul: 'Kabut Malioboro', tipe: 'album', tahun: 2025, platform: 'Spotify', link: 'https://spotify.com' },
      { judul: 'Demo Kamar 02', tipe: 'ep', tahun: 2023, platform: 'Bandcamp', link: 'https://bandcamp.com' },
    ],
    galeri: 9,
  },
  {
    slug: 'ruang-tunggu',
    nama: 'Ruang Tunggu',
    kota: 'Jakarta',
    genres: ['math-rock'],
    tagline: 'Birama ganjil untuk antrean yang tak bergerak.',
    bio: 'Trio math rock Jakarta yang lahir dari kejenuhan macet dan antre. Riff tapping yang rapat, drum yang tak memberi ampun, dan tidak ada satu pun lagu tentang cinta.',
    bergabung: 'Mei 2025',
    fotoUrl: fotoMusisi('ruang-tunggu'),
    cariKolaborasi: true,
    kebutuhanKolaborasi: 'Butuh: vokalis (opsional, bisa instrumental)',
    links: [
      { label: 'Bandcamp', url: 'https://bandcamp.com' },
      { label: 'YouTube', url: 'https://youtube.com' },
    ],
    karya: [
      { judul: 'Antre', tipe: 'ep', tahun: 2024, platform: 'Bandcamp', link: 'https://bandcamp.com' },
      { judul: '7/8 Pagi', tipe: 'single', tahun: 2025, platform: 'Spotify', link: 'https://spotify.com' },
    ],
    galeri: 4,
  },
  {
    slug: 'lembayung',
    nama: 'Lembayung',
    kota: 'Surabaya',
    genres: ['dream-pop', 'indie-pop'],
    tagline: 'Pop manis dengan ujung yang pahit.',
    bio: 'Proyek solo asal Surabaya yang merekam semuanya di kamar dengan satu mic dan laptop bekas. Terpengaruh pop 80-an Indonesia dan dream pop Jepang.',
    bergabung: 'Juni 2025',
    fotoUrl: fotoMusisi('lembayung'),
    cariKolaborasi: false,
    kebutuhanKolaborasi: null,
    links: [
      { label: 'Spotify', url: 'https://spotify.com' },
      { label: 'Instagram', url: 'https://instagram.com' },
    ],
    karya: [
      { judul: 'Lembayung', tipe: 'album', tahun: 2025, platform: 'Spotify', link: 'https://spotify.com' },
    ],
    galeri: 5,
  },
  {
    slug: 'tinta-dan-senar',
    nama: 'Tinta & Senar',
    kota: 'Bandung',
    genres: ['indie-folk'],
    tagline: 'Duo gitar dan puisi.',
    bio: 'Duo kakak-beradik yang menggabungkan puisi spoken word dengan fingerstyle gitar. Tampil di kafe, toko buku, dan sesekali di pinggir jalan Braga.',
    bergabung: 'Juli 2025',
    fotoUrl: fotoMusisi('tinta-dan-senar'),
    cariKolaborasi: true,
    kebutuhanKolaborasi: 'Butuh: pemain cello untuk live set',
    links: [{ label: 'Instagram', url: 'https://instagram.com' }],
    karya: [
      { judul: 'Braga, 23:40', tipe: 'single', tahun: 2025, platform: 'Spotify', link: 'https://spotify.com' },
    ],
    galeri: 3,
  },
  {
    slug: 'gelombang-pasang',
    nama: 'Gelombang Pasang',
    kota: 'Denpasar',
    genres: ['post-punk'],
    tagline: 'Bass galak dari selatan pulau.',
    bio: 'Band post-punk Denpasar dengan lirik dwibahasa tentang pariwisata, abrasi, dan anak muda yang bertahan. Live set mereka legendaris berisiknya.',
    bergabung: 'Agustus 2025',
    fotoUrl: fotoMusisi('gelombang-pasang'),
    cariKolaborasi: false,
    kebutuhanKolaborasi: null,
    links: [
      { label: 'Bandcamp', url: 'https://bandcamp.com' },
      { label: 'YouTube', url: 'https://youtube.com' },
    ],
    karya: [
      { judul: 'Abrasi', tipe: 'album', tahun: 2024, platform: 'Bandcamp', link: 'https://bandcamp.com' },
      { judul: 'Selatan', tipe: 'single', tahun: 2025, platform: 'Spotify', link: 'https://spotify.com' },
    ],
    galeri: 7,
  },
  {
    slug: 'kamar-kos',
    nama: 'Kamar Kos',
    kota: 'Malang',
    genres: ['lo-fi', 'ambient'],
    tagline: 'Beat untuk begadang yang tenang.',
    bio: 'Beatmaker asal Malang yang memproduksi semuanya dari kasur. Sampel suara hujan, angkot, dan pengajian subuh jadi ciri khasnya.',
    bergabung: 'September 2025',
    fotoUrl: fotoMusisi('kamar-kos'),
    cariKolaborasi: true,
    kebutuhanKolaborasi: 'Butuh: vokalis & gitaris untuk kolab beat',
    links: [
      { label: 'Spotify', url: 'https://spotify.com' },
      { label: 'Bandcamp', url: 'https://bandcamp.com' },
    ],
    karya: [
      { judul: 'Begadang Tenang', tipe: 'ep', tahun: 2025, platform: 'Spotify', link: 'https://spotify.com' },
    ],
    galeri: 2,
  },
  {
    slug: 'sore-di-atap',
    nama: 'Sore di Atap',
    kota: 'Semarang',
    genres: ['emo', 'indie-pop'],
    tagline: 'Emo revival dari kota lumpia.',
    bio: 'Kuintet emo asal Semarang yang tidak malu-malu soal perasaan. Twinkle guitar, teriakan bareng penonton, dan kaos kaki belang di setiap gig.',
    bergabung: 'September 2025',
    fotoUrl: fotoMusisi('sore-di-atap'),
    cariKolaborasi: false,
    kebutuhanKolaborasi: null,
    links: [{ label: 'Instagram', url: 'https://instagram.com' }],
    karya: [
      { judul: 'Atap Tetangga', tipe: 'ep', tahun: 2024, platform: 'Bandcamp', link: 'https://bandcamp.com' },
    ],
    galeri: 4,
  },
]

export function getMusisi(slug: string): Musisi | undefined {
  return MUSISI.find((m) => m.slug === slug)
}

export const ARTIKELS: Artikel[] = [
  {
    slug: 'review-lembayung-album',
    judul: 'Review: “Lembayung” — album yang tumbuh seperti lumut',
    tipe: 'review',
    penulis: 'Nadia Sore',
    penulisBio: 'Musisi indie-folk asal Bandung. Menulis tentang album yang ia dengar berulang-ulang.',
    tanggal: '2026-09-18',
    estimasiBaca: 8,
    genres: ['dream-pop'],
    fotoUrl: fotoArtikel('review-lembayung-album'),
    ringkasan:
      'Debut album Lembayung tidak meledak — ia merambat. Pelan, lembap, dan akhirnya menutupi seluruh dinding kepalamu.',
    isi: [
      'Ada album yang menyambutmu di pintu depan dengan hook besar. Lembayung bukan album seperti itu. Ia masuk lewat jendela belakang, duduk di sudut kamar, dan baru kamu sadari kehadirannya tiga hari kemudian saat melodinya tidak mau pergi.',
      'Dibuka dengan synth yang terdengar seperti kaset yang sedikit melar, album ini bergerak tanpa terburu-buru. Vokal yang nyaris berbisik berpadu dengan drum machine yang longgar — kombinasi yang seharusnya berantakan, tapi justru terasa jujur.',
      'Puncaknya ada di trek kelima, di mana gitar clean akhirnya muncul setelah empat lagu penuh kabut. Rasanya seperti matahari yang muncul sebentar di musim hujan: singkat, tapi cukup untuk membuatmu bertahan.',
      'Kekurangannya? Mixing di dua trek tengah terdengar sempit, seolah direkam dengan mic yang sama untuk semua instrumen. Tapi justru di situlah pesonanya — album ini terdengar seperti dibuat manusia, bukan pabrik.',
    ],
    kutipan: 'Lembayung tidak meledak — ia merambat. Pelan, lembap, dan akhirnya menutupi seluruh dinding kepalamu.',
  },
  {
    slug: 'feature-nadia-sore-wawancara',
    judul: 'Feature: Nadia Sore dan keberanian merekam dari kamar kos',
    tipe: 'feature',
    penulis: 'Raka Pradipta',
    penulisBio: 'Penulis lepas. Meliput scene Bandung sejak 2019.',
    tanggal: '2026-09-12',
    estimasiBaca: 6,
    genres: ['indie-folk'],
    fotoUrl: fotoArtikel('feature-nadia-sore-wawancara'),
    ringkasan:
      'Obrolan sore tentang mic pinjaman, tetangga kos yang protes, dan kenapa kamar sempit justru melahirkan lagu-lagu lapang.',
    isi: [
      'Kos Nadia Sore di Dago berukuran nyaris sama dengan studio rekaman profesional: kecil. Bedanya, di sini ada jemuran, dispenser, dan kucing tetangga yang kadang masuk ke rekaman.',
      '“Aku pernah sewa studio beneran sekali. Kaku. Semua terdengar rapi tapi mati,” katanya sambil menyeduh teh. “Di kos, aku bisa rekam jam 2 pagi pas idenya datang. Itu nggak bisa dibeli.”',
      'EP “Kamar ke Kamar” direkam dengan satu mic kondensor pinjaman dan laptop yang kipasnya ikut masuk ke tiga lagu. Nadia tidak menghapusnya. “Itu bunyi kamarku. Kenapa harus dihapus?”',
      'Tahun ini ia akan tur kamar-ke-kamar: tampil di ruang tamu pendengar, bukan panggung. “Penonton 15 orang yang duduk lesehan dengerinnya lebih khidmat daripada 200 orang yang sibuk merekam pakai HP.”',
    ],
  },
  {
    slug: 'opini-venue-jakarta',
    judul: 'Opini: kenapa venue indie di Jakarta makin sedikit?',
    tipe: 'opini',
    penulis: 'Fajar Nugraha',
    penulisBio: 'Promotor gig kecil-kecilan di Jakarta Selatan.',
    tanggal: '2026-09-05',
    estimasiBaca: 5,
    genres: ['indie-pop'],
    fotoUrl: fotoArtikel('opini-venue-jakarta'),
    ringkasan:
      'Sewa naik, tetangga protes, izin ribet. Venue kecil tutup satu per satu — dan scene ikut menyusut.',
    isi: [
      'Dalam dua tahun terakhir, empat venue kecil tempat saya biasa bikin gig tutup. Alasannya mirip-mirip: sewa naik dua kali lipat, protes kebisingan, atau pemilik gedung yang lebih suka disewa jadi coffee shop.',
      'Masalahnya bukan cuma tempat. Venue kecil adalah tempat band pemula main pertama kali, tempat soundman belajar, tempat penonton menemukan band favorit berikutnya. Tanpa mereka, tangga scene ini putus di tengah.',
      'Solusinya? Tidak ada yang instan. Tapi yang bisa kita lakukan sekarang: datang ke gig, bayar tiketnya (jangan minta gratisan), dan beli merchandise langsung dari band. Scene ini hidup dari dompet kita sendiri.',
    ],
  },
  {
    slug: 'tips-rilis-single-tanpa-label',
    judul: 'Panduan: rilis single pertama tanpa label, checklist 2026',
    tipe: 'tips',
    penulis: 'Kala Senja',
    penulisBio: 'Band shoegaze asal Yogyakarta. Sudah merilis 1 album secara mandiri.',
    tanggal: '2026-08-28',
    estimasiBaca: 7,
    genres: ['shoegaze'],
    fotoUrl: fotoArtikel('tips-rilis-single-tanpa-label'),
    ringkasan:
      'Dari mastering sampai artwork: semua yang kami pelajari (dengan cara yang susah) saat merilis album pertama.',
    isi: [
      'Pertama: mastering. Jangan mastering sendiri kalau telingamu sudah lelah mendengar lagu itu 200 kali. Cari jasa mastering online, banyak yang terjangkau, dan telinga segar itu tidak ternilai.',
      'Kedua: artwork. Cover adalah hal pertama yang dilihat orang di Spotify. Minta tolong teman desainer, bayar dengan layak, dan pastikan terbaca dalam ukuran thumbnail kecil.',
      'Ketiga: jadwal. Submit ke distributor minimal 3 minggu sebelum tanggal rilis kalau mau kejar playlist editorial. Melewatkan ini artinya playlist besar sudah tutup pintu.',
      'Keempat: jangan rilis hari Jumat kalau kamu belum punya pendengar. Rilismu akan tenggelam di antara ratusan rilis besar. Selasa atau Rabu memberi ruang bernapas lebih lega.',
    ],
  },
  {
    slug: 'review-kabut-malioboro',
    judul: 'Review: “Kabut Malioboro” dan shoegaze yang berbau gamelan',
    tipe: 'review',
    penulis: 'Tinta & Senar',
    penulisBio: 'Duo folk asal Bandung. Pendengar setia segala yang berisik.',
    tanggal: '2026-08-20',
    estimasiBaca: 6,
    genres: ['shoegaze'],
    fotoUrl: fotoArtikel('review-kabut-malioboro'),
    ringkasan:
      'Kala Senja menyampel gamelan ke dalam tembok gitar. Hasilnya: shoegaze yang tidak bisa datang dari negara lain.',
    isi: [
      'Shoegaze Indonesia sering dituduh meniru: terlalu My Bloody Valentine, terlalu Slowdive. “Kabut Malioboro” mematahkan tuduhan itu di trek pertama, saat saron yang disampling muncul di antara deru fuzz.',
      'Ini bukan gimmick tempelan. Skala pelog menyusup ke progresi akor di hampir semua lagu, memberi warna yang tidak akan kamu temukan di band shoegaze mana pun di luar sini.',
      'Vokal yang tenggelam dalam mix mungkin membuat sebagian pendengar frustrasi — liriknya nyaris tak terdengar. Tapi bukankah itu memang kontrak shoegaze? Suara sebagai tekstur, bukan ceramah.',
    ],
  },
  {
    slug: 'feature-scene-malang',
    judul: 'Feature: Malang, kota kecil dengan telinga besar',
    tipe: 'feature',
    penulis: 'Raka Pradipta',
    penulisBio: 'Penulis lepas. Meliput scene Bandung sejak 2019.',
    tanggal: '2026-08-10',
    estimasiBaca: 9,
    genres: ['lo-fi', 'ambient'],
    fotoUrl: fotoArtikel('feature-scene-malang'),
    ringkasan:
      'Dari kos-kosan beatmaker sampai gig di kebun apel: potret scene yang tumbuh tanpa sorotan media ibu kota.',
    isi: [
      'Malang tidak punya venue besar. Yang ia punya: kos-kosan dengan wifi kencang, udara dingin yang bikin betah begadang, dan komunitas yang saling meminjamkan alat tanpa kwitansi.',
      'Scene beat dan ambient tumbuh subur di sini justru karena tidak ada tekanan industri. Tidak ada A&R yang datang, tidak ada showcase yang harus dimenangkan. Musik dibuat karena malamnya panjang.',
      '“Di Jakarta orang nanya: kapan rilis? Di sini orang nanya: dengerin dong,” kata salah satu beatmaker yang kami temui. Mungkin itu definisi scene yang sehat.',
    ],
  },
]

export function getArtikel(slug: string): Artikel | undefined {
  return ARTIKELS.find((a) => a.slug === slug)
}

export const TIPE_ARTIKEL: { slug: string; nama: string }[] = [
  { slug: 'review', nama: 'Review' },
  { slug: 'feature', nama: 'Feature' },
  { slug: 'opini', nama: 'Opini' },
  { slug: 'tips', nama: 'Tips' },
]

export const EVENTS: EventItem[] = [
  {
    slug: 'lintas-kamar-vol-4',
    nama: 'Lintas Kamar Vol. 4',
    tanggal: '2026-10-12',
    jamMulai: '19:00',
    venue: 'Ruang Rindu, Kemang',
    kota: 'Jakarta',
    deskripsi:
      'Edisi keempat gig kamar-ke-kamar: penonton duduk lesehan, tidak ada barikade, tidak ada yang boleh merekam pakai flash. Kapasitas 80 orang.',
    lineup: ['Nadia Sore', 'Tinta & Senar', 'Kamar Kos'],
    linkTiket: 'https://tiket.com',
    fotoUrl: fotoEvent('lintas-kamar-vol-4'),
    featured: true,
    selesai: false,
  },
  {
    slug: 'jogja-berisik-kecil',
    nama: 'Jogja Berisik (Edisi Kecil)',
    tanggal: '2026-10-17',
    jamMulai: '18:00',
    venue: 'Studio Klangenan',
    kota: 'Yogyakarta',
    deskripsi: 'Showcase band-band berisik Jogja-Solo dalam format intim. Bawa earplug sendiri.',
    lineup: ['Kala Senja', 'Ruang Tunggu'],
    linkTiket: 'https://tiket.com',
    fotoUrl: fotoEvent('jogja-berisik-kecil'),
    featured: false,
    selesai: false,
  },
  {
    slug: 'pasar-merch-malang',
    nama: 'Pasar Merch & Tukar Kaset',
    tanggal: '2026-10-25',
    jamMulai: '15:00',
    venue: 'Taman Krida Budaya',
    kota: 'Malang',
    deskripsi: 'Jual-beli merch, tukar kaset dan vinyl, plus akustikan sore dari musisi lokal.',
    lineup: ['Kamar Kos', 'Lembayung'],
    linkTiket: null,
    fotoUrl: fotoEvent('pasar-merch-malang'),
    featured: false,
    selesai: false,
  },
  {
    slug: 'selatan-menggema',
    nama: 'Selatan Menggema',
    tanggal: '2026-11-08',
    jamMulai: '19:30',
    venue: 'Gudang Keramik',
    kota: 'Denpasar',
    deskripsi: 'Malam post-punk dan eksperimental di gudang tua. Line-up penuh dari selatan pulau.',
    lineup: ['Gelombang Pasang'],
    linkTiket: 'https://tiket.com',
    fotoUrl: fotoEvent('selatan-menggema'),
    featured: false,
    selesai: false,
  },
  {
    slug: 'atap-tetangga-tour',
    nama: 'Atap Tetangga Tour: Semarang',
    tanggal: '2026-09-06',
    jamMulai: '19:00',
    venue: 'Atap Parkir Sri Ratu',
    kota: 'Semarang',
    deskripsi: 'Tur atap-atap kota: panggung di atas parkir, penonton di bawah langit.',
    lineup: ['Sore di Atap'],
    linkTiket: null,
    fotoUrl: fotoEvent('atap-tetangga-tour'),
    featured: false,
    selesai: true,
  },
]

export function getEvent(slug: string): EventItem | undefined {
  return EVENTS.find((e) => e.slug === slug)
}

export const FORUM_KATEGORIS: ForumKategori[] = [
  { nama: 'Scene & Budaya', slug: 'scene-budaya', deskripsi: 'Venue, promotor, dan dinamika scene lokal.', jumlahThread: 47, jumlahBalasan: 312 },
  { nama: 'Rekomen Musik', slug: 'rekomen-musik', deskripsi: 'Minta dan kasih rekomendasi band baru.', jumlahThread: 83, jumlahBalasan: 521 },
  { nama: 'Gear & Teknis', slug: 'gear-teknis', deskripsi: 'Alat, rekaman rumahan, dan mixing.', jumlahThread: 29, jumlahBalasan: 198 },
  { nama: 'Kolaborasi & Cari Member', slug: 'kolaborasi', deskripsi: 'Cari teman ngeband atau partner kolab.', jumlahThread: 61, jumlahBalasan: 144 },
]

export const FORUM_THREADS: ForumThread[] = [
  {
    slug: 'preamp-budget-home-recording',
    kategori: 'gear-teknis',
    judul: 'Recommend preamp budget untuk home recording?',
    penulis: 'kamar_kos',
    waktu: '2 jam lalu',
    jumlahBalasan: 14,
    isi: 'Halo semua, saya rekam vokal pakai mic kondensor langsung ke audio interface. Hasilnya tipis banget. Ada rekomendasi preamp budget di bawah 2 juta yang worth it? Atau mending nabung dulu? Terima kasih sebelumnya.',
  },
  {
    slug: 'venue-indie-jakarta-makin-dikit',
    kategori: 'scene-budaya',
    judul: 'Kenapa venue indie di Jakarta makin dikit?',
    penulis: 'fajar_n',
    waktu: '5 jam lalu',
    jumlahBalasan: 32,
    isi: 'Empat venue tempat saya biasa bikin gig tutup dalam dua tahun. Sewa naik, protes warga, izin ribet. Menurut kalian scene Jakarta harus bagaimana? Pindah ke pinggiran? Atau format gig-nya yang harus berubah?',
  },
  {
    slug: 'band-mirip-barasuara-yogya',
    kategori: 'rekomen-musik',
    judul: 'Ada yang tau band kayak Barasuara tapi dari Yogya?',
    penulis: 'sore_diatap',
    waktu: 'kemarin',
    jumlahBalasan: 8,
    isi: 'Lagi cari band dengan energi rock psikedelik plus instrumen tradisional. Kalau ada yang dari Yogya atau Solo, tolong drop link-nya di sini. Makasih!',
  },
  {
    slug: 'cari-drummer-bandung',
    kategori: 'kolaborasi',
    judul: '[Bandung] Cari drummer untuk band indie-folk',
    penulis: 'tinta_senar',
    waktu: 'kemarin',
    jumlahBalasan: 5,
    isi: 'Halo, kami duo folk (gitar + spoken word) cari drummer yang mainnya lembut dan sabar. Latihan seminggu sekali di daerah Dago. Minat? Balas di sini ya.',
  },
  {
    slug: 'distributor-lokal-vs-luar',
    kategori: 'gear-teknis',
    judul: 'Distributor lokal vs luar: pengalaman kalian?',
    penulis: 'lembayung',
    waktu: '2 hari lalu',
    jumlahBalasan: 21,
    isi: 'Mau rilis album pertama dan bingung pilih agregator. Yang lokal katanya CS-nya fast respon, yang luar katanya playlist pitching-nya lebih kuat. Minta pengalaman jujurnya dong.',
  },
  {
    slug: 'setlist-pertama-kali-manggung',
    kategori: 'scene-budaya',
    judul: 'Tips setlist buat pertama kali manggung?',
    penulis: 'ruang_tunggu',
    waktu: '3 hari lalu',
    jumlahBalasan: 11,
    isi: 'Band kami dapat slot 30 menit di gig kampus bulan depan, pertama kali main di depan orang. Berapa lagu idealnya? Urutan lagu cepat-lambat bagaimana? Semua saran diterima.',
  },
]

export const FORUM_BALASANS: ForumBalasan[] = [
  {
    threadSlug: 'preamp-budget-home-recording',
    penulis: 'kala_senja',
    waktu: '1 jam lalu',
    isi: 'Jujur: di bawah 2 juta mending nabung atau beli bekas yang bagus. Preamp murah bedanya tipis sama preamp interface. Yang lebih ngaruh: akustik ruangan. Kasur dan gorden tebal lebih worth it.',
  },
  {
    threadSlug: 'preamp-budget-home-recording',
    penulis: 'nadia_sore',
    waktu: '45 menit lalu',
    isi: 'Setuju sama atas. Saya rekam EP cuma pakai interface + mic pinjaman, yang penting gain staging bener dan ruangan tidak menggema. Uangnya mending buat mic yang lebih bagus dulu.',
  },
  {
    threadSlug: 'venue-indie-jakarta-makin-dikit',
    penulis: 'ruang_tunggu',
    waktu: '3 jam lalu',
    isi: 'Kami sekarang main di pinggiran: Depok, Bekasi, Tangerang. Sewa separuhnya, penontonnya justru lebih loyal. Scene tidak harus di selatan terus.',
  },
  {
    threadSlug: 'band-mirip-barasuara-yogya',
    penulis: 'fajar_n',
    waktu: '12 jam lalu',
    isi: 'Coba dengerin Kala Senja, ada unsur gamelan yang disampling. Beda jalur sih (lebih shoegaze), tapi energi eksperimennya mirip.',
  },
]

export function getThread(slug: string): ForumThread | undefined {
  return FORUM_THREADS.find((t) => t.slug === slug)
}

export function namaKategori(slug: string): string {
  return FORUM_KATEGORIS.find((k) => k.slug === slug)?.nama ?? slug
}

export const SOROTAN = {
  musisiSlug: 'nadia-sore',
  judul: 'Sorotan Minggu Ini',
  kutipan:
    '“Di kos, aku bisa rekam jam 2 pagi pas idenya datang. Itu nggak bisa dibeli.” — Nadia Sore',
}
