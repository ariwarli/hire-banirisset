import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeIn } from "@/components/fade-in";
import { NotableCollaborations } from "@/components/about/notable-collaborations";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    title: t("title"),
    description: t("bio"),
  };
}

const certifications = [
  "Google AdWords Search Certification",
  "Gemini Certified Educator — Google for Education",
  "Hands-on AI Masterclass III: Mastery — you.com x PAIR (Grade: Distinction)",
  "Manus for Business Analysts — Manus Academy",
];

const achievementKeys = [
  "adsense",
  "kemenkes",
  "ngo",
  "systems",
  "certified",
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <FadeIn>
        <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{t("subtitle")}</p>
        <Badge variant="secondary" className="mt-4">
          {t("experienceLabel")}
        </Badge>
        <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">
          {t("bio")}
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight">
          {t("achievementsTitle")}
        </h2>
        <ul className="mt-5 flex flex-col gap-3">
          {achievementKeys.map((key) => (
            <li
              key={key}
              className="rounded-xl border border-border/60 bg-card/50 p-4 text-sm text-muted-foreground"
            >
              {t(`achievements.${key}`)}
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn delay={0.15} className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight">
          {t("certificationsTitle")}
        </h2>
        <ul className="mt-5 flex flex-col gap-3">
          {certifications.map((cert) => (
            <li
              key={cert}
              className="rounded-xl border border-border/60 bg-card/50 p-4 text-sm text-muted-foreground"
            >
              {cert}
            </li>
          ))}
        </ul>
      </FadeIn>

      <NotableCollaborations />
    </div>
  );
}
