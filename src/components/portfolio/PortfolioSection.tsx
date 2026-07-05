import { getLocale, getTranslations } from "next-intl/server";
import { PortfolioTable } from "@/components/portfolio/PortfolioTable";
import { categoryConfig, getPortfolioByCategory, portfolio } from "@/data/portfolio";

export async function PortfolioSection() {
  const locale = await getLocale();
  const t = await getTranslations("WorkPage.zoneB");

  const categories = Object.keys(categoryConfig) as (keyof typeof categoryConfig)[];

  return (
    <section className="mt-24 border-t border-zinc-800 pt-16">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
        {t("title")}
      </h2>
      <p className="mt-2 text-sm text-zinc-500">
        {t("count", { count: portfolio.length })}
      </p>

      <div className="mt-10">
        {categories.map((category) => {
          const items = getPortfolioByCategory(category);
          const config = categoryConfig[category];
          const label = locale === "en" ? config.labelEn : config.label;

          return (
            <PortfolioTable key={category} label={label} items={items} locale={locale} />
          );
        })}
      </div>
    </section>
  );
}
