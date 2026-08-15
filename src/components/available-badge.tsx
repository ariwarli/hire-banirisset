import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export const isAvailableForProjects =
  process.env.NEXT_PUBLIC_AVAILABLE_FOR_PROJECTS === "true";

/**
 * `surface` picks the accent's derived text colour:
 *   ink   → --accent-ink   (lifted, 4.9:1 on #101010)
 *   paper → --accent-paper (sunk, 5.25:1 on #fafafa)
 * The dot always uses raw --accent (non-text, 3:1 applies).
 */
export function AvailableBadge({
  className,
  surface = "ink",
}: {
  className?: string;
  surface?: "ink" | "paper";
}) {
  const t = useTranslations("Nav");

  if (!isAvailableForProjects) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[12.5px] leading-snug",
        surface === "ink" ? "text-accent-ink" : "text-accent-paper",
        className
      )}
    >
      <span
        className="anim-pulse size-1.5 shrink-0 rounded-full bg-accent-base"
        aria-hidden="true"
      />
      {t("availableForProjects")}
    </span>
  );
}
