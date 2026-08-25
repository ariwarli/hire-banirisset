# Changelog

Riwayat perubahan konten & fitur di hire.banirisset.com. Terbaru di atas.

## 2026-08-24

- **Case study Baby Jim Aditya** — `src/content/work/{id,en}/babyjimaditya.mdx`: halaman `/work/babyjimaditya` baru (personal branding website, 2012–sekarang); entry `portfolio.ts` ditandai `featured: true` + `slug`; gambar mockup homepage dipasang di section Solution. Commit `9c412eb`.
- **Case study GueTau.com** — `src/content/work/{id,en}/guetau.mdx`: halaman `/work/guetau` baru (portal informasi kesehatan untuk anak muda, 2009–2010, situs sudah tidak beroperasi); entry baru di `portfolio.ts`. Commit `ad6fbe2`.
- **Case study Rumah Cemara** — `src/content/work/{id,en}/rumah-cemara.mdx`: halaman `/work/rumah-cemara` baru (website organisasi nonprofit kesehatan & inklusi sosial, 2010); entry baru di `portfolio.ts`. **Perlu konfirmasi Bani**: brief menyebut tahun proyek "2010" tapi narasi sumber menyebut "Pada 2011" — field `year` sementara diisi 2010 mengikuti instruksi eksplisit. Commit `c8b27d4`.
- Ketiganya sudah di-push ke `origin/main`.

## 2026-08-16

- **Testimonials & footer** — `src/components/about/testimonials.tsx` (baru), `src/components/layout/site-footer.tsx` (baru): "collaborator gallery" di halaman About diganti jadi testimoni klien; footer situs ditambahkan (about, work, contact). `notable-collaborations.tsx` dihapus. Commit `4ac7bba`.
- **Case study sources & images** — `src/components/work/case-study-images.tsx` (baru), `src/content/work/{id,en}/kemenkes-aids-digital.mdx`: tambah gambar mockup untuk case study Kemenkes AIDS Digital & munculdigoogle; case study GWL-INA disembunyikan (`gwl-ina-voting.mdx` → `.hidden`); copy Kemenkes diperbaiki. Commit `e57a73c`.
- **Fix copy /work list** — `src/data/portfolio.ts`: tahun & metrik case study Kemenkes RI dan Baby Jim Aditya diperbarui. Commit `2d9d5ab`.
- **Redesign Home & About** — `src/app/[locale]/{page,about/page}.tsx`, komponen baru `cta-panel.tsx`, `how-i-work.tsx`, `relevant-experience.tsx`, `closing-consult.tsx` (home & about), `supporting-position.tsx`, `mobile-legal.tsx`: rombak layout Home & About (mockup 11a/11b/12a/12b), copy ID/EN diperbarui menyeluruh. Commit `980f34c`.

## 2026-08-15

- **Wordmark ticker (nama klien)** — `src/components/home/wordmark-ticker.tsx`: daftar klien diganti (CCM, WHRIN, Rumah Cemara, KPAN, LBH APIK, Gue Tau, Lolipop, Its Me Lasagna, Baby Jim Aditya, Rutgers; BBC Academy & Homeless World Cup dipertahankan). Commit `a7a4d8b`.
- **Closing CTA** — `messages/id.json` & `messages/en.json` (`ClosingCta.desc`): teks ajakan diskusi diperbarui. Commit `1cb41a5`.
- **About page — bio** — `messages/id.json` & `messages/en.json` (`AboutPage.bio`): bio ditulis ulang, menambahkan cakupan Indonesia/Thailand/Australia/Singapura dan SEO/digital marketing. Commit `1cb41a5`.
- **About page — achievements** — `messages/id.json` & `messages/en.json` (`AboutPage.achievementsTitle`, `AboutPage.achievements`): judul section "Prestasi" → "Pengalaman & Pencapaian" ("Achievements" → "Experience & Achievements"), 5 item diperbarui. Commit `1cb41a5`.
