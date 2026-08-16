import { useTranslations } from "next-intl";
import { CONTACT } from "@/lib/constants";

const SOCIALS = [
  { label: "LinkedIn", href: CONTACT.linkedinUrl },
  { label: "Threads", href: CONTACT.threadsUrl },
  { label: "Instagram", href: CONTACT.instagramUrl },
];

/**
 * Mobile-only closer for the homepage — desktop doesn't need this, the
 * sidebar already carries socials + copyright.
 */
export function MobileLegal() {
  const t = useTranslations("Footer");

  return (
    <div className="bg-ink px-[22px] py-6 text-paper md:hidden">
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
      <p className="pt-4 font-mono text-[10.5px] text-paper/50">{t("copyright")}</p>
    </div>
  );
}
