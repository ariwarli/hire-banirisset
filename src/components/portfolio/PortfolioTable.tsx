import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PortfolioItem } from "@/data/portfolio";

interface PortfolioTableProps {
  label: string;
  items: PortfolioItem[];
  locale: string;
}

export function PortfolioTable({ label, items, locale }: PortfolioTableProps) {
  return (
    <div className="mt-10 first:mt-0">
      <h3 className="border-b border-zinc-800 pb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
        {label}
      </h3>
      <div>
        {items.map((item) => (
          <PortfolioRow key={`${item.client}-${item.year}`} item={item} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function PortfolioRow({ item, locale }: { item: PortfolioItem; locale: string }) {
  const client = locale === "en" && item.clientEn ? item.clientEn : item.client;
  const metric = locale === "en" && item.metricEn ? item.metricEn : item.metric;

  const symbols = (
    <span className="inline-flex items-center gap-2">
      {item.imageUrl && (
        <a
          href={item.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Lihat gambar project"
          className="text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
      {item.featured && item.slug && (
        <Link
          href={`/work/${item.slug}`}
          aria-label="Lihat studi kasus"
          className="text-violet-400 transition-colors hover:text-violet-300"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </span>
  );

  return (
    <div className="border-b border-zinc-800 py-3 last:border-b-0 hover:bg-zinc-900/50 md:grid md:grid-cols-[1fr_auto_1fr_auto] md:items-center md:gap-6 md:py-2.5">
      {/* Desktop: 4 kolom */}
      <span className="hidden font-medium text-zinc-100 md:block">{client}</span>
      <span className="hidden text-sm text-zinc-500 md:block">{item.year}</span>
      <span className="hidden text-sm text-zinc-400 md:block">{metric}</span>
      <span className="hidden md:block">{symbols}</span>

      {/* Mobile: 2 baris */}
      <div className="flex items-center justify-between gap-2 md:hidden">
        <span className="flex items-center gap-2 font-medium text-zinc-100">
          {client}
          {symbols}
        </span>
        <span className="shrink-0 text-sm text-zinc-500">{item.year}</span>
      </div>
      <p className="mt-1 text-sm text-zinc-400 md:hidden">{metric}</p>
    </div>
  );
}
