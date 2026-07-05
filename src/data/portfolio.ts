// portfolio.ts — data semua project untuk Zone B di /work
// Cara tambah project baru: tambah entry di array sesuai kategori
// Format metric: max ~60 karakter, berbasis hasil/konteks

export type PortfolioCategory =
  | 'website-app'   // Website & Aplikasi
  | 'iklan-seo'     // Iklan & SEO
  | 'social-media'  // Social Media & Konten
  | 'ai-training'   // AI, Training & Consulting

export interface PortfolioItem {
  client: string
  clientEn?: string         // versi EN kalau berbeda
  category: PortfolioCategory
  year: string              // "2016" atau "2012–sekarang"
  metric: string            // ID — 1 baris hasil/konteks
  metricEn?: string         // EN — isi kalau beda dari metric
  featured?: boolean        // true = punya halaman /work/[slug]
  slug?: string             // wajib kalau featured: true
  imageUrl?: string         // URL eksternal (Pinterest / GDrive) — tampil sebagai ikon ↗
}

// ─────────────────────────────────────────────────────────────────
// WEBSITE & APLIKASI
// ─────────────────────────────────────────────────────────────────
const websiteApp: PortfolioItem[] = [
  {
    client: 'Kemenkes RI — AIDS Digital',
    clientEn: 'Ministry of Health RI — AIDS Digital',
    category: 'website-app',
    year: '2014',
    metric: '50K+ pengguna aktif terdaftar',
    metricEn: '50K+ registered active users',
    featured: true,
    slug: 'kemenkes-aids-digital',
  },
  {
    client: 'GWL-INA',
    category: 'website-app',
    year: '2019',
    metric: 'Platform voting digital 10K+ partisipan',
    metricEn: 'Digital voting platform, 10K+ participants',
    featured: true,
    slug: 'gwl-ina-voting',
  },
  {
    client: 'siap.help',
    category: 'website-app',
    year: '2023',
    metric: 'SaaS platform produktivitas berbasis AI',
    metricEn: 'AI-based productivity SaaS platform',
    featured: true,
    slug: 'siap-help',
  },
  {
    client: 'MunculDiGoogle',
    category: 'website-app',
    year: '2024',
    metric: 'Platform SEO & visibilitas bisnis lokal',
    metricEn: 'SEO & local business visibility platform',
    featured: true,
    slug: 'munculdigoogle',
  },
  {
    client: 'SentraAI',
    category: 'website-app',
    year: '2024',
    metric: 'Platform AI untuk UMKM Indonesia',
    metricEn: 'AI platform for Indonesian SMEs',
    featured: true,
    slug: 'sentraai',
  },
  {
    client: 'Baby Jim Aditya',
    category: 'website-app',
    year: '2012–sekarang',
    metric: 'Website artis aktif >12 tahun',
    metricEn: 'Artist website, active 12+ years',
  },
  // [KONFIRMASI BANI] — tambah project website lain di sini
  // Contoh format:
  // {
  //   client: 'Nama Klien',
  //   category: 'website-app',
  //   year: '20XX',
  //   metric: 'Deskripsi singkat hasil',
  // },
]

// ─────────────────────────────────────────────────────────────────
// IKLAN & SEO
// ─────────────────────────────────────────────────────────────────
const iklanSeo: PortfolioItem[] = [
  {
    client: 'OSN Kemdikbud 2014',
    clientEn: 'OSN Ministry of Education 2014',
    category: 'iklan-seo',
    year: '2014',
    metric: '#OSNDIKBUD2014 trending Twitter nasional',
    metricEn: '#OSNDIKBUD2014 national Twitter trending',
  },
  {
    client: 'Google & Meta Advertiser',
    clientEn: 'Google & Meta Advertiser',
    category: 'iklan-seo',
    year: '2013–sekarang',
    metric: 'Kelola 100+ kampanye iklan berbayar',
    metricEn: 'Managed 100+ paid ad campaigns',
  },
  {
    client: 'Broadcast Marketing',
    clientEn: 'Broadcast Marketing',
    category: 'iklan-seo',
    year: '2012–sekarang',
    metric: 'SMS/WhatsApp/Email blast 50K+ kontak',
    metricEn: 'SMS/WhatsApp/Email blast to 50K+ contacts',
  },
  // [KONFIRMASI BANI] — tambah klien SEO / ads spesifik di sini
]

// ─────────────────────────────────────────────────────────────────
// SOCIAL MEDIA & KONTEN
// ─────────────────────────────────────────────────────────────────
const socialMedia: PortfolioItem[] = [
  {
    client: 'Syahrini',
    category: 'social-media',
    year: '2016',
    metric: 'Full campaign viral, coverage Kompas.com',
    metricEn: 'Viral full campaign, Kompas.com coverage',
  },
  {
    client: 'Dona Arsinta',
    category: 'social-media',
    year: '2017',
    metric: 'Social media KPAK Jakarta',
    metricEn: 'Social media management KPAK Jakarta',
  },
  {
    client: 'Bryan — Aktifis Kesehatan',
    clientEn: 'Bryan — Health Activist',
    category: 'social-media',
    year: '2018',
    metric: 'Kampanye sosial media kesehatan',
    metricEn: 'Health-focused social media campaign',
  },
  {
    client: 'Jamil Azzaini',
    category: 'social-media',
    year: '2020',
    metric: 'Media campaign motivasi nasional',
    metricEn: 'National motivational media campaign',
  },
  {
    client: 'Homeless World Cup — Mexico',
    category: 'social-media',
    year: '2012',
    metric: 'Media campaign Tim Indonesia di luar negeri',
    metricEn: 'Media campaign for Indonesian team abroad',
  },
  {
    client: 'KPAK Jakarta',
    category: 'social-media',
    year: '2017',
    metric: 'Pengelolaan media sosial lembaga pemerintah',
    metricEn: 'Government agency social media management',
  },
  // [KONFIRMASI BANI] — tambah klien social media lain di sini
]

// ─────────────────────────────────────────────────────────────────
// AI, TRAINING & CONSULTING
// ─────────────────────────────────────────────────────────────────
const aiTraining: PortfolioItem[] = [
  {
    client: 'BBC Academy — Kelly Olsen',
    clientEn: 'BBC Academy — Kelly Olsen (CEO Tahitian Noni)',
    category: 'ai-training',
    year: '2018',
    metric: 'Mentoring social media & digital strategy',
    metricEn: 'Social media & digital strategy mentoring',
  },
  {
    client: 'Narasumber Digital Marketing',
    clientEn: 'Digital Marketing Speaker',
    category: 'ai-training',
    year: '2015–sekarang',
    metric: 'Pembicara di 50+ event & workshop',
    metricEn: 'Speaker at 50+ events & workshops',
  },
  {
    client: 'AI Training — Korporat',
    clientEn: 'Corporate AI Training',
    category: 'ai-training',
    year: '2023–sekarang',
    metric: 'Training AI untuk tim bisnis & UMKM',
    metricEn: 'AI training for business teams & SMEs',
  },
  {
    client: 'WhatsApp Automation Consulting',
    category: 'ai-training',
    year: '2020–sekarang',
    metric: 'Otomasi customer service via WhatsApp API',
    metricEn: 'Customer service automation via WhatsApp API',
  },
  // [KONFIRMASI BANI] — tambah training / speaking events lain di sini
]

// ─────────────────────────────────────────────────────────────────
// EXPORT UTAMA
// ─────────────────────────────────────────────────────────────────
export const portfolio: PortfolioItem[] = [
  ...websiteApp,
  ...iklanSeo,
  ...socialMedia,
  ...aiTraining,
]

// Helper: filter by category
export function getPortfolioByCategory(category: PortfolioCategory): PortfolioItem[] {
  return portfolio.filter((item) => item.category === category)
}

// Helper: semua kategori dengan label display
export const categoryConfig: Record<
  PortfolioCategory,
  { label: string; labelEn: string }
> = {
  'website-app': {
    label: 'Website & Aplikasi',
    labelEn: 'Website & Apps',
  },
  'iklan-seo': {
    label: 'Iklan & SEO',
    labelEn: 'Ads & SEO',
  },
  'social-media': {
    label: 'Social Media & Konten',
    labelEn: 'Social Media & Content',
  },
  'ai-training': {
    label: 'AI, Training & Consulting',
    labelEn: 'AI, Training & Consulting',
  },
}
