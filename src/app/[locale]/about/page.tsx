import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { NotableCollaborations } from "@/components/about/notable-collaborations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return { title: t("title"), description: t("bio") };
}

const achievementKeys = ["adsense", "kemenkes", "ngo", "systems", "certified"] as const;

/**
 * The certifications list is intentionally NOT rendered: the fifth
 * achievement ("Sertifikasi resmi Google, Meta, dan PARA") already covers it,
 * and the brief was to cut content. The array still lives in git history —
 * bring it back as a second numbered block if real certificates get added.
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")}>
        <div className="flex flex-wrap items-baseline gap-3.5">
          <span className="text-[17px] leading-normal text-muted-foreground">
            {t("subtitle")}
          </span>
          <span className="font-mono text-[11.5px] tracking-[0.1em] uppercase text-muted-foreground">
            {t("experienceLabel")}
          </span>
        </div>
      </PageHeader>

      <div className="hairline-b px-[22px] py-10 md:px-11">
        <p className="max-w-[72ch] text-[17.5px] leading-[1.75] text-pretty">
          {t("bio")}
        </p>
      </div>

      <div className="hairline-b grid gap-6 px-[22px] py-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:px-11">
        <h2 className="text-[26px] leading-tight">{t("achievementsTitle")}</h2>
        <ul className="flex max-w-[70ch] flex-col">
          {achievementKeys.map((key, i) => (
            <li
              key={key}
              className="hairline-t grid grid-cols-[26px_minmax(0,1fr)] items-baseline gap-3.5 py-3.5 last:border-b last:border-border"
            >
              <span
                className="font-mono text-[12.5px] leading-normal text-accent-paper"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base leading-[1.6]">
                {t(`achievements.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <NotableCollaborations />
    </>
  );
}
