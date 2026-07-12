import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT, ECOSYSTEM, SITE } from "@/lib/constants";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const year = 2026;

  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <p className="font-semibold tracking-tight">{SITE.name}</p>
          <p className="mt-2 max-w-xs text-base text-muted-foreground">
            {t("tagline")}
          </p>
        </div>

        <div>
          <p className="text-base font-medium text-foreground">
            {t("quickLinks")}
          </p>
          <nav className="mt-3 flex flex-col gap-2 text-base text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              {nav("home")}
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground"
            >
              {nav("about")}
            </Link>
            <Link
              href="/work"
              className="transition-colors hover:text-foreground"
            >
              {nav("work")}
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground"
            >
              {nav("contact")}
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-base font-medium text-foreground">{t("connect")}</p>
          <nav className="mt-3 flex flex-col gap-2 text-base text-muted-foreground">
            <a
              href={CONTACT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href={CONTACT.threadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Threads
            </a>
            <a
              href={CONTACT.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Facebook
            </a>
          </nav>
        </div>

        <div>
          <p className="text-base font-medium text-foreground">
            {t("ecosystem")}
          </p>
          <nav className="mt-3 flex flex-col gap-2 text-base text-muted-foreground">
            <a
              href={ECOSYSTEM.blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {ECOSYSTEM.blog.name}
            </a>
            <a
              href={ECOSYSTEM.agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {ECOSYSTEM.agency.name}
            </a>
            <a
              href={ECOSYSTEM.shop.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {ECOSYSTEM.shop.name}
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t border-border/50 px-6 py-6 text-center text-sm text-muted-foreground">
        © {year} {SITE.name}. {t("rights")}
      </div>
    </footer>
  );
}
