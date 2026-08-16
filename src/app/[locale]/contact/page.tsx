import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { AvailableBadge } from "@/components/available-badge";
import { SiteFooter } from "@/components/layout/site-footer";
import { CONTACT } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return { title: t("title"), description: t("desc") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ContactPage");

  // Telegram first — ContactPage.desc promises it is the fastest channel.
  // LinkedIn isn't repeated here — it's already in the sidebar (desktop) and
  // the footer's social row (mobile).
  const channels = [
    {
      label: t("telegram"),
      value: CONTACT.telegramHandle,
      href: CONTACT.telegramUrl,
      external: true,
    },
    {
      label: t("email"),
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      external: false,
    },
  ];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("desc")} />

      <div className="grid items-start md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="px-[22px] py-10 md:border-r md:border-border md:px-11 md:pb-13">
          <ContactForm />
        </div>

        <div className="flex flex-col px-[22px] pt-10 pb-13 md:pr-11 md:pl-8">
          {channels.map((channel, i) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className={`hairline-t flex flex-col gap-[5px] py-4 transition-colors hover:bg-paper-alt ${
                i === channels.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted-foreground">
                {channel.label}
              </span>
              <span className="text-base leading-snug font-medium">
                {channel.value}
              </span>
            </a>
          ))}
          <AvailableBadge surface="paper" className="pt-5" />
        </div>
      </div>

      <SiteFooter variant="minimal" />
    </>
  );
}
