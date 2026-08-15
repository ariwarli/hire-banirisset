"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = { id: "ID", en: "EN" };

/**
 * Same link-based behaviour as before — localePrefix is "as-needed", so ID
 * is served at / and EN at /en. Only the chrome changed: a segmented pill.
 * Do NOT turn this into client state; it must stay two real routes.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <nav
      aria-label="Switch language"
      className={cn(
        "flex gap-0.5 rounded-full border border-paper/20 p-[3px]",
        className
      )}
    >
      {routing.locales.map((locale) => {
        const active = locale === activeLocale;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-[11px] py-1.5 font-mono text-[10.5px] font-bold tracking-[0.08em] transition-colors",
              active ? "bg-paper text-ink" : "text-paper/60 hover:text-paper"
            )}
          >
            {labels[locale] ?? locale.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
