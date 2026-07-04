import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/work";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllCaseStudies(locale).map((cs) => ({ locale, slug: cs.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudyBySlug(locale, slug);
  if (!cs) return {};

  return {
    title: cs.title,
    description: cs.outcome,
    openGraph: {
      title: cs.title,
      description: cs.outcome,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const cs = getCaseStudyBySlug(locale, slug);
  if (!cs) notFound();

  const t = await getTranslations("CaseStudy");

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <FadeIn>
        <Link
          href="/work"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← {t("back")}
        </Link>

        <Badge variant="secondary" className="mt-6">
          {cs.sector}
        </Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          {cs.title}
        </h1>

        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-card/50 p-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">{t("client")}</dt>
            <dd className="mt-1 font-medium">{cs.client}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t("year")}</dt>
            <dd className="mt-1 font-medium">{cs.year}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t("sector")}</dt>
            <dd className="mt-1 font-medium">{cs.sector}</dd>
          </div>
          <div className="col-span-2 sm:col-span-3">
            <dt className="text-muted-foreground">{t("tools")}</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {cs.tools.map((tool) => (
                <Badge key={tool} variant="outline">
                  {tool}
                </Badge>
              ))}
            </dd>
          </div>
        </dl>
      </FadeIn>

      <FadeIn
        delay={0.1}
        className="prose prose-invert mt-12 max-w-none prose-headings:tracking-tight prose-a:text-primary"
      >
        <MDXRemote source={cs.content} />
      </FadeIn>

      <FadeIn delay={0.15} className="mt-16 border-t border-border/50 pt-10 text-center">
        <Link href="/contact" className={buttonVariants({ size: "lg" })}>
          {t("cta")}
        </Link>
      </FadeIn>
    </div>
  );
}
