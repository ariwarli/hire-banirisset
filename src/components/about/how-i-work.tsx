import { useTranslations } from "next-intl";

/**
 * Ink band, no hairline on this section itself — the color change already
 * separates it from Achievements above and Relevant Experience below.
 */
export function HowIWork() {
  const t = useTranslations("AboutPage.howIWork");
  const body = t.raw("body") as string[];

  return (
    <section className="bg-ink px-[22px] py-8 text-paper md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-12 md:px-11 md:py-[52px]">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[10.5px] tracking-[0.16em] text-paper/50 uppercase">
          {t("eyebrow")}
        </p>
        <h2 className="max-w-[18ch] font-display text-[26px] leading-[1.25] text-pretty md:text-[32px]">
          {t("heading")}
        </h2>
      </div>
      <div className="mt-5 flex flex-col gap-3 md:mt-0">
        {body.map((paragraph, i) => (
          <p
            key={paragraph}
            className={
              i === body.length - 1
                ? "text-[15.5px] leading-[1.6] text-paper text-pretty"
                : "text-[15.5px] leading-[1.6] text-paper/72 text-pretty"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
