import type { Metadata } from "next";
import { Archivo, Space_Mono, Libre_Caslon_Display } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { SiteShell } from "@/components/layout/site-shell";
import { SITE } from "@/lib/constants";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const caslon = Libre_Caslon_Display({
  variable: "--font-caslon",
  subsets: ["latin"],
  weight: ["400"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const heroT = await getTranslations({ locale, namespace: "Hero" });
  const footerT = await getTranslations({ locale, namespace: "Footer" });

  const title = `${SITE.name} — ${heroT("eyebrow")}`;
  const description = footerT("tagline");

  return {
    metadataBase: new URL(`https://${SITE.domain}`),
    title: { default: title, template: `%s — ${SITE.name}` },
    description,
    openGraph: {
      title,
      description,
      url: `https://${SITE.domain}`,
      siteName: SITE.name,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { languages: { id: "/", en: "/en" } },
    other: { "hero-eyebrow": heroT("eyebrow") },
  };
}

function buildJsonLd(locale: string, jobTitle: string, description: string) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Budi Rissetyabudi Darma Adi",
    alternateName: "Bani Risset",
    jobTitle,
    url: `https://${SITE.domain}${locale === "id" ? "" : `/${locale}`}`,
    email: "mailto:gmail@banirisset.com",
    sameAs: ["https://linkedin.com/in/banirisset", "https://banirisset.com"],
  };

  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.name} — ${jobTitle}`,
    description,
    url: `https://${SITE.domain}${locale === "id" ? "" : `/${locale}`}`,
    areaServed: "ID",
  };

  return { personJsonLd, professionalServiceJsonLd };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const heroT = await getTranslations({ locale, namespace: "Hero" });
  const footerT = await getTranslations({ locale, namespace: "Footer" });
  const { personJsonLd, professionalServiceJsonLd } = buildJsonLd(
    locale,
    heroT("eyebrow"),
    footerT("tagline")
  );

  return (
    // NOTE: the .dark class is deliberately gone — the redesign is light-first.
    <html
      lang={locale}
      className={`${archivo.variable} ${spaceMono.variable} ${caslon.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
        <NextIntlClientProvider>
          <SiteShell>{children}</SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
