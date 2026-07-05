export const CONTACT = {
  whatsappNumber: "6281234500333",
  whatsappUrl: "https://wa.me/6281234500333",
  email: "gmail@banirisset.com",
  linkedinUrl: "https://linkedin.com/in/banirisset",
  linkedinHandle: "in/banirisset",
  instagramUrl: "https://www.instagram.com/banirisset/",
  threadsUrl: "https://www.threads.com/@banirisset",
  facebookUrl: "https://www.facebook.com/banirisset.id/",
  // Sender identity for the contact form (Mailketing) — must be
  // registered/verified in the Mailketing dashboard before sending works.
  mailFromName: "Bani Risset",
  mailFromEmail: "bani@banirisset.com",
} as const;

export const ECOSYSTEM = {
  blog: { name: "Blog Bani Risset", url: "https://banirisset.com/" },
  agency: { name: "Teras Digital Tech", url: "https://terasdigital.co.id/" },
  shop: { name: "TerasZone", url: "https://shop.terasdigital.co.id/" },
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
