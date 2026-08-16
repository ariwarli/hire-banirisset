import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SOCIALS = [
  { label: "LinkedIn", href: CONTACT.linkedinUrl },
  { label: "Instagram", href: CONTACT.instagramUrl },
  { label: "Threads", href: CONTACT.threadsUrl },
];

interface SiteFooterProps {
  /** "minimal" skips the CTA slab — /contact already asks for the project. */
  variant?: "default" | "minimal";
  /** Left side of the desktop closer row, e.g. the next case study. */
  pointer?: { label: string; href: string };
}

/**
 * Closes every non-home page (/work, /work/[slug], /about, /contact).
 *
 * The 344px sidebar (site-shell.tsx / identity-column.tsx) already IS the
 * footer from md (768px) up — it carries Book Consultation, WhatsApp,
 * socials, copyright and the locale switcher. So above md this component
 * renders only a thin hairline closer (page pointer + back-to-top); the full
 * dark CTA slab + legal row is mobile-only (<768), matching exactly when the
 * sidebar collapses into the mobile header/drawer. Rendering both at the
 * same width would duplicate the sidebar's own content.
 */
export function SiteFooter({ variant = "default", pointer }: SiteFooterProps) {
  const t = useTranslations("Footer");
  const whatsappHref = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(t("ctaWhatsappMessage"))}`;

  return (
    <>
      <div className="md:hidden">
        <footer className="bg-ink text-paper">
          {variant === "default" ? (
            <div className="flex flex-col gap-4 px-[22px] pt-[34px] pb-6">
              <p className="font-mono text-[10px] tracking-[0.16em] text-accent-ink uppercase">
                {t("ctaEyebrow")}
              </p>
              <h2 className="font-serif text-[30px] leading-[1.14] tracking-[-0.02em] text-pretty">
                {t("ctaTitle")}
              </h2>
              <p className="text-[15px] leading-[1.65] text-paper/62">{t("ctaDesc")}</p>

              <div className="flex flex-col gap-2.5 pt-2">
                <Link
                  href="/contact"
                  className="rounded bg-accent-base px-6 py-[17px] text-center text-[15px] font-medium text-accent-on transition-opacity hover:opacity-90"
                >
                  {t("ctaPrimary")}
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-paper/24 px-6 py-[17px] text-center text-[15px] font-medium transition-colors hover:border-paper/50"
                >
                  {t("ctaWhatsapp")}
                </a>
              </div>
            </div>
          ) : null}

          <div className="border-t border-paper/14 px-[22px] pt-5 pb-6">
            <div className="flex items-center justify-between gap-4">
              <nav className="flex items-center gap-[18px] font-mono text-[10.5px] tracking-[0.08em] text-paper/50">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-paper"
                  >
                    {social.label}
                  </a>
                ))}
              </nav>
              <LanguageSwitcher />
            </div>
            <p className="pt-5 font-mono text-[10.5px] text-paper/50">{t("copyright")}</p>
          </div>
        </footer>
      </div>

      {/* Desktop closer: always present, regardless of variant — a page
          that dead-ends into blank paper reads as broken. /contact ("minimal")
          just never has a pointer, so it's back-to-top only. */}
      <div
        className={cn(
          "hairline-t hidden items-center px-[22px] pt-[22px] pb-[26px] font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase md:flex md:px-11",
          pointer ? "justify-between" : "justify-end"
        )}
      >
        {pointer ? (
          <Link href={pointer.href} className="transition-colors hover:text-foreground">
            {pointer.label}
          </Link>
        ) : null}
        <a href="#" className="transition-colors hover:text-foreground">
          {t("backToTop")}
        </a>
      </div>
    </>
  );
}
