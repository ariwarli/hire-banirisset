import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeIn } from "@/components/fade-in";
import { ContactForm } from "@/components/contact-form";
import { CONTACT } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return {
    title: t("title"),
    description: t("desc"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ContactPage");

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <p className="text-base font-medium text-primary">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("desc")}</p>
      </FadeIn>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <FadeIn className="flex flex-col gap-4">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border/60 bg-card/50 p-5 transition-colors hover:border-primary/40"
          >
            <p className="text-base text-muted-foreground">{t("whatsapp")}</p>
            <p className="mt-1 font-medium">+{CONTACT.whatsappNumber}</p>
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="rounded-xl border border-border/60 bg-card/50 p-5 transition-colors hover:border-primary/40"
          >
            <p className="text-base text-muted-foreground">{t("email")}</p>
            <p className="mt-1 font-medium">{CONTACT.email}</p>
          </a>
          <a
            href={CONTACT.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border/60 bg-card/50 p-5 transition-colors hover:border-primary/40"
          >
            <p className="text-base text-muted-foreground">{t("linkedin")}</p>
            <p className="mt-1 font-medium">{CONTACT.linkedinHandle}</p>
          </a>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  );
}
