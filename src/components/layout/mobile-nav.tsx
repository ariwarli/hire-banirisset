"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { AvailableBadge } from "@/components/available-badge";
import { CONTACT } from "@/lib/constants";

export function MobileNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <button
              type="button"
              aria-label="Buka menu"
              className="grid size-8 place-items-center text-paper"
            />
          }
        >
          <Menu className="size-5" />
        </SheetTrigger>

        {/* w-72 = 288px, matches the mock */}
        <SheetContent
          side="right"
          className="w-72 border-l-0 bg-ink text-paper shadow-[-12px_0_32px_rgba(0,0,0,0.3)]"
        >
          <SheetHeader className="flex-row items-center justify-between px-5 pt-5.5">
            <SheetTitle className="font-display text-[17px] font-normal text-paper">
              {"Bani Risset"}
            </SheetTitle>
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
              className="text-paper/75 transition-colors hover:text-paper"
            >
              <X className="size-4" />
            </button>
          </SheetHeader>

          <nav className="flex flex-col gap-0.5 px-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-2.5 py-3 text-base text-paper/60 transition-colors hover:bg-paper/[0.06] hover:text-paper aria-[current=page]:bg-paper/[0.08] aria-[current=page]:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mx-5 flex items-center justify-between gap-3 border-y border-paper/15 px-2.5 py-4">
            <AvailableBadge />
            <LanguageSwitcher />
          </div>

          <div className="flex flex-col gap-2.5 px-[30px]">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-paper/25 px-5 py-4 text-center text-sm font-medium"
            >
              {"WhatsApp"}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded bg-accent-base px-5 py-4 text-center text-sm font-medium text-accent-on"
            >
              {t("bookConsultation")}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
