import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/fade-in";
import { Badge } from "@/components/ui/badge";
import { getFeaturedCaseStudies } from "@/lib/work";

export async function FeaturedCaseStudies() {
  const locale = await getLocale();
  const t = await getTranslations("FeaturedCaseStudies");
  const caseStudies = getFeaturedCaseStudies(locale, 3);

  return (
    <section className="border-b border-border/50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>

        <div className="mt-12 flex flex-col gap-4">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs.slug} delay={i * 0.08}>
              <Link
                href={`/work/${cs.slug}`}
                className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/50 p-8 transition-colors hover:border-primary/40 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {cs.sector}
                  </Badge>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {cs.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cs.client} — {cs.year}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                    {cs.outcome}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                  {t("readCase")} →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
