import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT, SITE } from "@/lib/constants";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const year = 2026;

  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-semibold tracking-tight">{SITE.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            {t("tagline")}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">
            {t("quickLinks")}
          </p>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              {nav("home")}
            </Link>
            <Link href="/work" className="transition-colors hover:text-foreground">
              {nav("work")}
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground">
              {nav("about")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground">
              {nav("contact")}
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">{t("connect")}</p>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="transition-colors hover:text-foreground"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t border-border/50 px-6 py-6 text-center text-xs text-muted-foreground">
        © {year} {SITE.name}. {t("rights")}
      </div>
    </footer>
  );
}
