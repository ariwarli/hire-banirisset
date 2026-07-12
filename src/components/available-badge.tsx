import { useTranslations } from "next-intl";

export const isAvailableForProjects =
  process.env.NEXT_PUBLIC_AVAILABLE_FOR_PROJECTS === "true";

export function AvailableBadge({ className }: { className?: string }) {
  const t = useTranslations("Nav");

  if (!isAvailableForProjects) {
    return null;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-sm font-medium text-emerald-400 ${className ?? ""}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
      {t("availableForProjects")}
    </span>
  );
}
