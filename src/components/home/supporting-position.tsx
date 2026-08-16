import { useTranslations } from "next-intl";

/**
 * Ink band between Capabilities and the closing CTA. No hairline on this
 * section itself — the ink/paper color change is already the section
 * boundary; adding a border here would double it.
 */
export function SupportingPosition() {
  const t = useTranslations("HomePage.supportingPosition");
  const body = t.raw("body") as string[];

  return (
    <section className="bg-ink px-[22px] py-[34px] text-paper md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-11 md:px-11 md:py-[52px]">
      <h2 className="max-w-[20ch] font-display text-[26px] leading-[1.25] text-pretty md:max-w-none md:text-[32px]">
        {t("heading")}
      </h2>
      <div className="mt-4 flex flex-col gap-3 md:mt-0">
        {body.map((paragraph) => (
          <p key={paragraph} className="text-[15.5px] leading-[1.6] text-paper/72 text-pretty">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
