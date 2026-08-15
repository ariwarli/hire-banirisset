import { Link } from "@/i18n/navigation";
import type { PortfolioItem } from "@/data/portfolio";

const ROW =
  "grid items-baseline gap-5 py-[13px] transition-colors hover:bg-paper-alt md:grid-cols-[minmax(0,1.1fr)_116px_minmax(0,1.4fr)_28px]";

export function PortfolioTable({
  label,
  items,
  locale,
}: {
  label: string;
  items: PortfolioItem[];
  locale: string;
}) {
  return (
    <div className="flex flex-col">
      <h3 className="label-mono border-b border-border pb-3 text-muted-foreground">
        {label}
      </h3>
      {items.map((item, i) => (
        <PortfolioRow
          key={`${item.client}-${item.year}`}
          item={item}
          locale={locale}
          last={i === items.length - 1}
        />
      ))}
    </div>
  );
}

function PortfolioRow({
  item,
  locale,
  last,
}: {
  item: PortfolioItem;
  locale: string;
  last: boolean;
}) {
  const client = locale === "en" && item.clientEn ? item.clientEn : item.client;
  const metric = locale === "en" && item.metricEn ? item.metricEn : item.metric;

  return (
    <div className={`${ROW} ${last ? "" : "border-b border-border/80"}`}>
      <span className="text-[15.5px] leading-snug font-medium">{client}</span>
      <span className="font-mono text-[13px] text-muted-foreground">
        {item.year}
      </span>
      <span className="text-[14.5px] leading-normal text-muted-foreground">
        {metric}
      </span>
      <span className="flex items-center gap-2 font-mono text-sm">
        {item.imageUrl ? (
          <a
            href={item.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lihat gambar project"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {"↗"}
          </a>
        ) : null}
        {item.featured && item.slug ? (
          <Link
            href={`/work/${item.slug}`}
            aria-label="Lihat studi kasus"
            className="text-accent-paper transition-opacity hover:opacity-70"
          >
            {"↗"}
          </Link>
        ) : null}
      </span>
    </div>
  );
}
