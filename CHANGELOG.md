# Changelog

Riwayat perubahan konten & fitur di hire.banirisset.com. Terbaru di atas.

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
