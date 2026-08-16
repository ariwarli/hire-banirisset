import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { SiteFooter } from "@/components/layout/site-footer";
import { portfolio } from "@/data/portfolio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkPage" });
  return { title: t("title"), description: t("desc") };
}

/**
 * The old featured-case-study card grid is gone: the tables already carry a
 * link affordance to every case study, and the brief was to cut content.
 */
export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("WorkPage");
  const zoneB = await getTranslations("WorkPage.zoneB");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("desc")}
      >
        <p className="pt-1 font-mono text-[11.5px] tracking-[0.1em] text-muted-foreground">
          {zoneB("count", { count: portfolio.length }).toUpperCase()}
        </p>
      </PageHeader>
      <PortfolioSection />
      <SiteFooter />
    </>
  );
}
