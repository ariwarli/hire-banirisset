import { AvailableBadge } from "@/components/available-badge";

interface CtaRow {
  label: string;
  value: string;
  href?: string;
}

interface CtaPanelProps {
  heading: string;
  /** Home uses 26ch, About uses 24ch. */
  headingMaxWidthCh?: number;
  body: string[];
  primary: { label: string; href: string };
  /** Always shown on desktop; shown on mobile too unless `hideRowsOnMobile`. */
  rows: CtaRow[];
  /** Home only. Desktop: appended as a table row. Mobile: becomes an outline
   *  button below the primary button instead of a table row. */
  whatsapp?: CtaRow;
  /** About passes true — its mobile layout skips the table entirely. */
  hideRowsOnMobile?: boolean;
}

function CtaRows({ rows, labelColClass }: { rows: CtaRow[]; labelColClass: string }) {
  return (
    <dl className="flex flex-col">
      {rows.map((row) => (
        <div
          key={row.label}
          className={`hairline-t grid ${labelColClass} items-baseline gap-3 py-3 last:border-b last:border-border`}
        >
          <dt className="label-mono min-w-0 text-muted-foreground">{row.label}</dt>
          <dd className="min-w-0">
            {row.href ? (
              <a
                href={row.href}
                className="text-[14.5px] leading-snug break-words transition-colors hover:text-accent-paper"
              >
                {row.value}
              </a>
            ) : (
              <span className="text-[14.5px] leading-snug break-words">{row.value}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Shared paper-surface closing CTA — used by home/closing-consult.tsx and
 * about/closing-consult.tsx. Two columns from lg (1024px) up (narrative +
 * button on the left, practical-info table + availability badge on the
 * right); one column below that, table (optional) and badge inline above
 * the button instead of beside it.
 *
 * The two-column split is gated on lg, not md: at 768–1023px the sidebar
 * (344px) already eats into the content column, and the fixed 132px label
 * width in the rows table doesn't leave enough room for values like
 * "gmail@banirisset.com" to read as one line — verified by hand, it
 * wrapped one character per line at md. Below lg this renders the same
 * single-column layout as phones, which has no fixed-width trap.
 */
export function CtaPanel({
  heading,
  headingMaxWidthCh = 26,
  body,
  primary,
  rows,
  whatsapp,
  hideRowsOnMobile = false,
}: CtaPanelProps) {
  const desktopRows = whatsapp ? [...rows, whatsapp] : rows;

  return (
    <section className="px-[22px] py-[34px] lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.85fr)] lg:gap-14 lg:px-11 lg:py-[52px]">
      <div className="flex flex-col gap-4">
        <h2
          style={{ maxWidth: `${headingMaxWidthCh}ch` }}
          className="font-display text-[27px] leading-[1.2] text-pretty lg:text-[34px]"
        >
          {heading}
        </h2>
        {body.map((paragraph) => (
          <p key={paragraph} className="text-[16px] leading-[1.6] text-foreground/62 text-pretty">
            {paragraph}
          </p>
        ))}

        <div className="flex flex-col gap-4 pt-2 lg:hidden">
          {!hideRowsOnMobile && rows.length > 0 ? (
            <CtaRows rows={rows} labelColClass="grid-cols-[118px_minmax(0,1fr)]" />
          ) : null}
          <AvailableBadge surface="paper" />
          <a
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-accent-base px-6 py-[15px] text-center text-[15px] font-medium text-accent-on transition-opacity hover:opacity-90"
          >
            {primary.label}
          </a>
          {whatsapp ? (
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border px-6 py-[15px] text-center text-[15px] font-medium transition-colors hover:border-foreground/40"
            >
              {whatsapp.label}
            </a>
          ) : null}
        </div>

        <a
          href={primary.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden w-fit rounded bg-accent-base px-6 py-3.5 text-[14.5px] font-medium text-accent-on transition-opacity hover:opacity-90 lg:inline-flex"
        >
          {primary.label}
        </a>
      </div>

      <div className="mt-8 hidden flex-col gap-6 lg:mt-0 lg:flex">
        <CtaRows rows={desktopRows} labelColClass="grid-cols-[132px_minmax(0,1fr)]" />
        <AvailableBadge surface="paper" />
      </div>
    </section>
  );
}
