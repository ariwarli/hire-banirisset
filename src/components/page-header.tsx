/**
 * Shared page header for /work, /work/[slug], /about, /contact.
 * Eyebrow (Space Mono) → Caslon h1 → optional lead paragraph.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="hairline-b flex flex-col gap-3.5 px-[22px] py-12 md:px-11 md:pt-14 md:pb-10">
      <p className="label-mono text-muted-foreground">{eyebrow}</p>
      <h1 className="text-[34px] leading-[1.06] tracking-[-0.025em] md:text-[52px]">
        {title}
      </h1>
      {lead ? (
        <p className="max-w-[56ch] text-[16.5px] leading-[1.6] text-muted-foreground text-pretty">
          {lead}
        </p>
      ) : null}
      {children}
    </div>
  );
}
