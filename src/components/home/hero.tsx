import { useTranslations } from "next-intl";

/**
 * Typographic hero — no imagery by design. h1 is Hero.tagline (identical in
 * both locales in the catalog); the paragraph is ClosingCta.desc, which is
 * where the old closing section's copy went.
 */
export function Hero() {
  const t = useTranslations("Hero");
  const cta = useTranslations("ClosingCta");

  return (
    <section className="hairline-b px-[22px] py-12 md:px-11 md:pt-14 md:pb-12">
      <h1 className="max-w-[24ch] text-[34px] leading-[1.06] tracking-[-0.02em] md:text-[52px] md:tracking-[-0.025em] text-pretty">
        {t("tagline")}
      </h1>
      <p className="mt-6 max-w-[50ch] whitespace-pre-line text-[15.5px] leading-[1.6] text-muted-foreground md:text-[17px] text-pretty">
        {cta("desc")}
      </p>
    </section>
  );
}
