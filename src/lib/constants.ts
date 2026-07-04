export const CONTACT = {
  whatsappNumber: "6281234500333",
  whatsappUrl: "https://wa.me/6281234500333",
  email: "gmail@banirisset.com",
  linkedinUrl: "https://linkedin.com/in/banirisset",
  linkedinHandle: "in/banirisset",
} as const;

export const SITE = {
  name: "Bani Risset",
  domain: "hire.banirisset.com",
  blogDomain: "https://banirisset.com",
  // Locale-invariant fallback — used only by manifest.ts (PWA manifests are
  // single-language). Page <title>/description are built per-locale from
  // messages in src/app/[locale]/layout.tsx instead.
  description:
    "Digital & AI Consultant — Building AI Systems, Automation & Digital Growth for Businesses and NGOs. 18 years / since 2008.",
} as const;
