import { useTranslations } from "next-intl";

const order = ["ai", "seo", "cloud", "security", "integration", "analytics"] as const;

/**
 * 2×3 on desktop, single column on mobile. Hairline dividers, no gaps, no
 * radius — the grid IS the card. Numerals use --accent-paper so any accent
 * swatch stays legible at 26–30px.
 */
export function Capabilities() {
  const t = useTranslations("Capabilities");

  return (
    <section className="grid md:grid-cols-2">
      {order.map((key, i) => (
        <div
          key={key}
          className="hairline-b flex flex-col gap-2 px-[22px] py-[22px] transition-colors hover:bg-paper-alt md:gap-3.5 md:px-[30px] md:py-[26px] md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-border"
        >
          <span
            className="font-display text-[26px] leading-none text-accent-paper md:text-[30px]"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[17px] leading-snug font-medium md:text-[19px]">
            {t(`items.${key}.title`)}
          </h3>
          <p className="text-[14.5px] leading-[1.6] text-muted-foreground">
            {t(`items.${key}.desc`)}
          </p>
        </div>
      ))}
    </section>
  );
}
