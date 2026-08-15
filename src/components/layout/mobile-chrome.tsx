import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MobileNav } from "@/components/layout/mobile-nav";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { AvailableBadge } from "@/components/available-badge";
import { BrandMark } from "@/components/layout/brand-mark";

/**
 * Under md the identity column unfolds into two stacked ink blocks:
 * a header bar and an identity block. Desktop hides both.
 */
export function MobileChrome() {
  const t = useTranslations("Nav");
  const hero = useTranslations("Hero");
  const footer = useTranslations("Footer");

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/work", label: t("work") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <div className="bg-ink text-paper md:hidden">
      <div className="flex items-center justify-between gap-3.5 px-[22px] py-5">
        <Link href="/" aria-label="Bani Risset">
          <BrandMark size="mobile" />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <MobileNav links={links} />
        </div>
      </div>

      <div className="flex flex-col gap-5 px-[22px] pt-1 pb-[30px]">
        <AvailableBadge />
        <p className="font-mono text-[10.5px] leading-[1.6] tracking-[0.16em] uppercase text-paper/60">
          {hero("eyebrow")} {"·"}{" "}
          {footer("tagline").replace(/^.*—\s*/, "")}
        </p>
      </div>
    </div>
  );
}
