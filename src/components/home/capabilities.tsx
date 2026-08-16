import { useTranslations } from "next-intl";

interface CapabilityItem {
  no: string;
  title: string;
  body: string[];
  tags?: string[];
}

/**
 * 2×3 on desktop, single column on mobile. Hairline dividers, no gaps, no
 * radius — the grid IS the card. Numerals use --accent-paper so any accent
 * swatch stays legible at 26–30px. Tags are optional — cells without them
 * don't get a chip row, and the grid doesn't force equal cell heights.
 */
export function Capabilities() {
  const t = useTranslations("HomePage.capabilities");
  const items = t.raw("items") as CapabilityItem[];

  return (
    <>
      <div className="hairline-b px-[22px] py-3 md:px-11">
        <p className="label-mono text-muted-foreground">{t("eyebrow")}</p>
      </div>
      <section className="grid md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.no}
            className="hairline-b flex flex-col gap-2.5 px-[22px] py-[24px] transition-colors hover:bg-paper-alt md:p-[30px] md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-border"
          >
            <span
              className="font-display text-[26px] leading-none text-accent-paper md:text-[30px]"
              aria-hidden="true"
            >
              {item.no}
            </span>
            <h3 className="text-[17px] leading-snug font-medium md:text-[19px]">{item.title}</h3>
            {item.body.map((paragraph) => (
              <p key={paragraph} className="text-[14.5px] leading-[1.6] text-muted-foreground">
                {paragraph}
              </p>
            ))}
            {item.tags && item.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[3px] border border-border px-2.5 py-1.5 font-mono text-[10.5px] leading-none md:text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </section>
    </>
  );
}
