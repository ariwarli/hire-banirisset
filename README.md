# hire-banirisset

Portofolio Bani Risset — Konsultan Digital & AI Strategist (18 tahun / sejak 2008). Next.js 15 + React 19 + TypeScript, static-first, dark mode default.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript 5
- Tailwind CSS 4 + shadcn/ui, Framer Motion
- next-intl (ID default, `/en` disiapkan)
- MDX case study (`src/content/work/`) via `next-mdx-remote/rsc`, frontmatter divalidasi `zod`
- Form kontak: Server Action + Resend, rate limit in-memory, honeypot

## Development

```bash
npm install
cp .env.example .env   # isi RESEND_API_KEY
npm run dev
```

```bash
npm run lint
npm run build
```

## Struktur

```
src/app/[locale]/     # halaman (Home, /work, /work/[slug], /about, /contact)
src/components/       # UI components (home sections, layout, shadcn/ui)
src/content/work/     # case study MDX
src/lib/              # work.ts, projects.ts, actions/contact.ts, rate-limit.ts
messages/             # next-intl (id.json, en.json)
```

## Deploy

Vercel, auto-deploy dari branch `main`. Env vars wajib di Vercel dashboard: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.

Dokumentasi planning & arsitektur lengkap ada di `../planning/` dan `../dev-docs/` (di luar repo git ini, project root).
