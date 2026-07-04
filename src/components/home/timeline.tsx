import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/fade-in";

const years = ["y2008", "y2012", "y2018", "y2023", "y2026"] as const;

export function Timeline() {
  const t = useTranslations("Timeline");

  return (
    <section className="border-b border-border/50 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>

        <ol className="relative mt-14 border-l border-border/60 pl-8">
          {years.map((key, i) => (
            <FadeIn key={key} delay={i * 0.08} className="mb-12 last:mb-0">
              <li>
                <span className="absolute -left-[7px] mt-1.5 size-3.5 rounded-full border-2 border-primary bg-background" />
                <p className="text-sm font-mono text-primary">
                  {t(`items.${key}.year`)}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  {t(`items.${key}.desc`)}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
