import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/lib/constants";
import { CaseStudyFigure } from "@/components/case-study-figure";
import { CaseStudyImages } from "@/components/work/case-study-images";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  splitSections,
} from "@/lib/work";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllCaseStudies(locale).map((cs) => ({ locale, slug: cs.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudyBySlug(locale, slug);
  if (!cs) return {};

  return {
    title: cs.title,
    description: cs.outcome,
    openGraph: { title: cs.title, description: cs.outcome, type: "article" },
  };
}

/** MDX element overrides — the prose plugin is not used here. */
const mdxComponents = {
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-[16.5px] leading-[1.7] text-pretty" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="flex flex-col" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="hairline-t py-[11px] text-[15.5px] leading-normal last:border-b last:border-border" {...props} />
  ),
  /* The [KONFIRMASI BANI] notes are authored as *italics* — surface them as
     a callout instead of hiding them. They are editorial to-dos. */
  em: (props: React.ComponentProps<"em">) => (
    <em className="mt-4 block border-l-2 border-foreground/30 bg-paper-alt p-4 text-[14.5px] leading-[1.65] text-muted-foreground italic" {...props} />
  ),
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const cs = getCaseStudyBySlug(locale, slug);
  if (!cs) notFound();

  const t = await getTranslations("CaseStudy");
  const nav = await getTranslations("Nav");
  const footer = await getTranslations("Footer");
  const { intro, sections } = splitSections(cs.content);

  const allCaseStudies = getAllCaseStudies(locale);
  const currentIndex = allCaseStudies.findIndex((item) => item.slug === slug);
  const next =
    allCaseStudies.length > 1
      ? allCaseStudies[(currentIndex + 1) % allCaseStudies.length]
      : null;
  const pointer = next
    ? { label: `${footer("nextCaseStudy")} — ${next.title}`, href: `/work/${next.slug}` }
    : undefined;

  const meta = [
    { label: t("client"), value: cs.client },
    { label: t("year"), value: cs.year },
    { label: t("sector"), value: cs.sector },
    { label: t("tools"), value: cs.tools.join(", ") },
  ];

  return (
    <>
      <div className="hairline-b flex flex-col gap-[22px] px-[22px] py-11 md:px-11">
        <Link
          href="/work"
          className="font-mono text-[11.5px] tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {"←"} {t("back").toUpperCase()}
        </Link>
        <p className="label-mono text-muted-foreground">{cs.sector}</p>
        <h1 className="max-w-[26ch] text-[34px] leading-[1.06] tracking-[-0.025em] md:text-[52px] text-pretty">
          {cs.title}
        </h1>
        {cs.metrics && cs.metrics.length > 0 ? (
          <div className="flex flex-wrap gap-2.5 pt-0.5">
            {cs.metrics.map((metric, i) => (
              <span
                key={metric}
                className={
                  i === 0
                    ? "rounded-full bg-ink px-3.5 py-2.5 text-[12.5px] font-medium text-paper"
                    : "rounded-full border border-foreground/25 px-3.5 py-2.5 text-[12.5px] font-medium"
                }
              >
                {metric}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <dl className="hairline-b grid md:grid-cols-4">
        {meta.map((row, i) => (
          <div
            key={row.label}
            className={`flex flex-col gap-[7px] px-[22px] py-5 md:px-5 ${
              i < 3 ? "md:border-r md:border-border" : ""
            } ${i === 0 ? "md:pl-11" : ""} ${i === 3 ? "md:pr-11" : ""}`}
          >
            <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
              {row.label}
            </dt>
            <dd className="text-[14.5px] leading-snug">{row.value}</dd>
          </div>
        ))}
      </dl>

      {/* Proof slot #1 — full-bleed, right after the meta strip. */}
      {cs.image ? (
        <div className="hairline-b">
          <CaseStudyFigure
            src={cs.image}
            caption={cs.imageCaption}
            alt={cs.title}
            ratio="16/9"
            className="[&_figcaption]:px-[22px] [&_figcaption]:pb-4 md:[&_figcaption]:px-11"
          />
        </div>
      ) : null}

      <div className="grid gap-9 px-[22px] py-12 md:grid-cols-[180px_minmax(0,1fr)] md:gap-x-10 md:px-11 md:py-12">
        {intro ? (
          <>
            <div className="hidden md:block" />
            <div className="max-w-[66ch]">
              <MDXRemote source={intro} components={mdxComponents} />
            </div>
          </>
        ) : null}

        {sections.map((section) => (
          <div key={section.heading} className="contents">
            <h2 className="text-[26px] leading-tight">{section.heading}</h2>
            <div className="flex max-w-[66ch] flex-col gap-4">
              <MDXRemote source={section.body} components={mdxComponents} />

              {/* Proof slot #2 — inside Outcome only. */}
              {/^(outcome|hasil)$/i.test(section.heading) ? (
                <CaseStudyFigure
                  src={cs.proofImage}
                  caption={cs.proofCaption}
                  alt={`${cs.title} — ${cs.proofCaption ?? "bukti"}`}
                  ratio="3/2"
                  className="pt-2.5"
                />
              ) : null}

              {/* Third-party citations proving the Outcome claims. */}
              {/^(outcome|hasil)$/i.test(section.heading) && cs.sources && cs.sources.length > 0 ? (
                <ul className="flex flex-col gap-2 pt-1">
                  {cs.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11.5px] tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {source.label.toUpperCase()} {"↗"}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Solution screenshots — full column width, not capped at 66ch.
                Guarded on images.length too: an empty extra grid row still
                eats the parent's row gap, leaving a blank strip. */}
            {/^(solution|solusi)$/i.test(section.heading) && cs.images && cs.images.length > 0 ? (
              <>
                <div className="hidden md:block" />
                <CaseStudyImages images={cs.images} />
              </>
            ) : null}
          </div>
        ))}

        {cs.assetsUrl ? (
          <>
            <div className="hidden md:block" />
            <a
              href={cs.assetsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-self-start border-b border-foreground/30 pb-1 font-mono text-[11.5px] tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {"LIHAT SEMUA ASET ↗"}
            </a>
          </>
        ) : null}
      </div>

      <div className="hairline-t flex flex-wrap items-center justify-between gap-7 px-[22px] py-9 md:px-11">
        <p className="font-display text-[22px] leading-snug">{t("cta")}</p>
        <a
          href={CONTACT.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-ink px-[26px] py-4 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          {nav("bookConsultation")}
        </a>
      </div>

      <SiteFooter pointer={pointer} />
    </>
  );
}
