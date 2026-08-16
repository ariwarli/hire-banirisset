import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { HowIWork } from "@/components/about/how-i-work";
import { RelevantExperience } from "@/components/about/relevant-experience";
import { Testimonials } from "@/components/about/testimonials";
import { ClosingConsult } from "@/components/about/closing-consult";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const bio = t.raw("bio") as string[];
  return { title: t("title"), description: bio[0] };
}

interface Achievement {
  title: string;
  desc: string;
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");
  const footer = await getTranslations("Footer");
  const bio = t.raw("bio") as string[];
  const achievements = t.raw("achievements") as Achievement[];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")}>
        <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:gap-3.5">
          <span className="text-[17px] leading-normal text-foreground/62">{t("subtitle")}</span>
          <span className="font-mono text-[11.5px] tracking-[0.1em] uppercase text-muted-foreground">
            {t("experienceLabel")}
          </span>
        </div>
      </PageHeader>

      <div className="hairline-b flex max-w-[74ch] flex-col gap-4 px-[22px] py-10 md:px-11">
        {bio.map((paragraph, i) => (
          <p
            key={paragraph}
            className={
              i === 0
                ? "text-[16px] leading-[1.75] text-pretty md:text-[18px]"
                : "text-[15px] leading-[1.75] text-foreground/68 text-pretty md:text-[16.5px]"
            }
          >
            {paragraph}
          </p>
        ))}
        <p className="text-[15px] leading-[1.75] text-foreground/68 text-pretty md:text-[16.5px]">
          {t("bioP4Prefix")}
          <strong className="font-semibold text-foreground">{t("bioP4Strong")}</strong>
          {t("bioP4Suffix")}
        </p>
      </div>

      <div className="hairline-b grid gap-6 px-[22px] py-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:px-11">
        <h2 className="text-[24px] leading-tight md:text-[26px]">{t("achievementsTitle")}</h2>
        <ul className="flex max-w-[70ch] flex-col">
          {achievements.map((item, i) => (
            <li
              key={item.title}
              className="hairline-t grid grid-cols-[26px_minmax(0,1fr)] items-baseline gap-3.5 py-4 last:border-b last:border-border"
            >
              <span
                className="font-mono text-[12.5px] leading-normal text-accent-paper"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[16.5px] leading-snug font-medium">{item.title}</p>
                <p className="text-[15px] leading-[1.5] text-foreground/62">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <HowIWork />
      <RelevantExperience />
      <Testimonials />
      <ClosingConsult />

      <div className="hairline-t px-[22px] pt-5 pb-6 md:px-11 md:pb-[26px]">
        <a
          href="#"
          className="block text-center font-mono text-[10.5px] tracking-[0.1em] text-foreground/55 uppercase transition-colors hover:text-foreground md:text-right"
        >
          {footer("backToTop")}
        </a>
      </div>
    </>
  );
}
