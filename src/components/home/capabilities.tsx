import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/fade-in";

const order = ["ai", "seo", "cloud", "security", "integration", "analytics"] as const;

const spanClass: Record<(typeof order)[number], string> = {
  ai: "md:col-span-4 md:row-span-2",
  seo: "md:col-span-2",
  cloud: "md:col-span-2",
  security: "md:col-span-2",
  integration: "md:col-span-3",
  analytics: "md:col-span-3",
};

export function Capabilities() {
  const t = useTranslations("Capabilities");

  return (
    <section className="border-b border-border/50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-6">
          {order.map((key, i) => (
            <FadeIn key={key} delay={i * 0.05} className={spanClass[key]}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-card/50 p-6">
                <h3 className="text-lg font-semibold tracking-tight">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
