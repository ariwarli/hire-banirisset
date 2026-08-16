import { useTranslations } from "next-intl";

interface Entry {
  name: string;
  body: string[];
}

export function RelevantExperience() {
  const t = useTranslations("AboutPage.relevantExperience");
  const entries = t.raw("entries") as Entry[];

  return (
    <div className="hairline-b grid gap-6 px-[22px] py-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:px-11">
      <h2 className="text-[24px] leading-tight md:text-[26px]">{t("title")}</h2>
      <div className="flex max-w-[70ch] flex-col">
        {entries.map((entry) => (
          <div
            key={entry.name}
            className="hairline-t flex flex-col gap-1.5 py-[18px] last:border-b last:border-border md:py-5"
          >
            <h3 className="text-[16px] leading-snug font-medium md:text-[17px]">{entry.name}</h3>
            {entry.body.map((paragraph) => (
              <p key={paragraph} className="text-[15.5px] leading-[1.55] text-foreground/66 text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
        <p className="mt-5 text-[15.5px] leading-[1.55] text-foreground/66 text-pretty">
          {t("closing")}
        </p>
      </div>
    </div>
  );
}
