import { getLocale } from "next-intl/server";
import { PortfolioTable } from "@/components/portfolio/PortfolioTable";
import { categoryConfig, getPortfolioByCategory } from "@/data/portfolio";

export async function PortfolioSection() {
  const locale = await getLocale();
  const categories = Object.keys(categoryConfig) as (keyof typeof categoryConfig)[];

  return (
    <section className="flex flex-col gap-10 px-[22px] py-9 md:px-11 md:pt-9 md:pb-14">
      {categories.map((category) => {
        const items = getPortfolioByCategory(category);
        const config = categoryConfig[category];
        const label = locale === "en" ? config.labelEn : config.label;

        return (
          <PortfolioTable
            key={category}
            label={label}
            items={items}
            locale={locale}
          />
        );
      })}
    </section>
  );
}
