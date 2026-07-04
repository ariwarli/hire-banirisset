"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  id: "ID",
  en: "EN",
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <nav aria-label="Switch language" className="flex items-center gap-1 text-sm">
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === activeLocale ? "page" : undefined}
            className={cn(
              "transition-colors",
              locale === activeLocale
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {labels[locale] ?? locale.toUpperCase()}
          </Link>
          {i < routing.locales.length - 1 && (
            <span className="text-muted-foreground" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
