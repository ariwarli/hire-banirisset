import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("HomePage.hero");

  return (
    <section className="hairline-b px-[22px] pt-[34px] pb-[30px] md:px-11 md:pt-14 md:pb-[46px]">
      <h1 className="max-w-[22ch] text-[34px] leading-[1.08] tracking-[-0.02em] text-pretty md:text-[54px] md:leading-[1.06] md:tracking-[-0.025em]">
        {t("h1")}
      </h1>
      <p className="mt-6 max-w-[56ch] text-[15.5px] leading-[1.6] text-foreground/68 text-pretty md:text-[17px]">
        {t("lead")}
      </p>
      <p className="mt-3 text-[14.5px] leading-[1.6] text-foreground/50 text-pretty md:text-[15.5px]">
        {t("prompt")}
      </p>
      <div className="mt-7 flex flex-col gap-2.5 md:flex-row md:gap-3">
        <Link
          href="/contact"
          className="rounded bg-accent-base px-6 py-[15px] text-center text-[15px] font-medium text-accent-on transition-opacity hover:opacity-90 md:w-fit md:py-3.5 md:text-[14.5px]"
        >
          {t("cta")}
        </Link>
        <Link
          href="/work"
          className="rounded border border-border px-6 py-[15px] text-center text-[15px] font-medium transition-colors hover:border-foreground/40 md:w-fit md:py-3.5 md:text-[14.5px]"
        >
          {t("ctaSecondary")}
        </Link>
      </div>
    </section>
  );
}
