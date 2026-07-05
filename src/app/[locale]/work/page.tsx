import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { getAllCaseStudies } from "@/lib/work";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkPage" });

  return {
    title: t("title"),
    description: t("desc"),
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("WorkPage");
  const caseStudies = getAllCaseStudies(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("desc")}</p>
      </FadeIn>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {caseStudies.map((cs, i) => (
          <FadeIn key={cs.slug} delay={i * 0.06}>
            <Link
              href={`/work/${cs.slug}`}
              className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-border/60 bg-card/50 p-7 transition-colors hover:border-primary/40"
            >
              <div>
                <Badge variant="secondary" className="mb-3">
                  {cs.sector}
                </Badge>
                <h2 className="text-xl font-semibold tracking-tight">
                  {cs.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cs.client} — {cs.year}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{cs.outcome}</p>
            </Link>
          </FadeIn>
        ))}
      </div>

      <PortfolioSection />
    </div>
  );
}
