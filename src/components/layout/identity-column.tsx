import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { AvailableBadge } from "@/components/available-badge";
import { BrandMark } from "@/components/layout/brand-mark";
import { CONTACT, ECOSYSTEM } from "@/lib/constants";

/**
 * Replaces BOTH site-header.tsx and site-footer.tsx on desktop.
 * Footer groups were redistributed: quickLinks became this nav, connect
 * became the social row, ecosystem kept its own group, tagline folded into
 * the role label. Facebook is intentionally dropped.
 */
export function IdentityColumn() {
  const t = useTranslations("Nav");
  const footer = useTranslations("Footer");
  const hero = useTranslations("Hero");

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/work", label: t("work") },
    { href: "/contact", label: t("contact") },
  ] as const;

  const ecosystem = [ECOSYSTEM.blog, ECOSYSTEM.agency, ECOSYSTEM.shop];

  return (
    <div className="flex flex-col gap-[34px] px-8 py-9 text-paper">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Bani Risset">
            <BrandMark size="desktop" />
          </Link>
          <LanguageSwitcher />
        </div>

        <nav className="flex flex-col gap-2.5 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-paper/60 transition-colors hover:text-paper aria-[current=page]:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-5 border-y border-paper/15 py-[26px]">
        <AvailableBadge />
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] leading-[1.5] tracking-[0.16em] uppercase text-paper/60">
            {hero("eyebrow")}
          </p>
          <p className="text-[13px] leading-relaxed text-paper/60">
            {footer("tagline").replace(/^.*—\s*/, "")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/contact"
          className="rounded bg-accent-base px-6 py-4 text-center text-sm font-medium text-accent-on transition-opacity hover:opacity-90"
        >
          {t("bookConsultation")}
        </Link>
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-paper/25 px-6 py-4 text-center text-sm font-medium transition-colors hover:border-paper/50"
        >
          {"WhatsApp"}
        </a>

        <nav className="flex gap-[18px] pt-3.5 font-mono text-[11.5px] tracking-[0.08em] text-paper/60">
          <a href={CONTACT.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-paper">{"LinkedIn"}</a>
          <a href={CONTACT.threadsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-paper">{"Threads"}</a>
          <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-paper">{"Instagram"}</a>
        </nav>

        <div className="mt-1 flex flex-col gap-2.5 border-t border-paper/15 pt-5">
          <p className="label-mono text-paper/60">{footer("ecosystem")}</p>
          <nav className="flex flex-col gap-[7px] text-[13px] text-paper/60">
            {ecosystem.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-paper"
              >
                {item.name} {"↗"}
              </a>
            ))}
          </nav>
        </div>

        <p className="pt-3.5 font-mono text-[11px] text-paper/55">
          {footer("copyright")}
        </p>
      </div>
    </div>
  );
}
