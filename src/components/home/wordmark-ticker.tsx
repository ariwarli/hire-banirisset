import { useTranslations } from "next-intl";

/**
 * Old-school running text. The client marks are TEXT until real logo files
 * arrive — swap each <span> for a monochrome SVG at the same optical size.
 *
 * Two rules keep this from breaking the grid:
 *  1. the track is w-max with the list duplicated, translated -50%
 *  2. the viewport needs overflow-hidden AND its parent needs min-w-0,
 *     or the max-content width propagates into the grid track
 */
const WORDMARKS = [
  "Kemenkes RI",
  "CCM",
  "WHRIN",
  "Rumah Cemara",
  "BBC Academy",
  "KPAN",
  "LBH APIK",
  "Homeless World Cup",
  "Gue Tau",
  "Lolipop",
  "Its Me Lasagna",
  "Baby Jim Aditya",
  "Rutgers",
];

export function WordmarkTicker() {
  // NOTE: add `"trustedBy": "Dipercaya oleh" / "Trusted by"` under Home in
  // messages/{id,en}.json — this is the one string the redesign introduces.
  const t = useTranslations("Home");

  return (
    <section className="hairline-b min-w-0 py-6">
      <p className="label-mono px-[22px] text-muted-foreground md:px-11">
        {t("trustedBy")}
      </p>
      <div className="ticker-viewport mt-3.5 overflow-hidden">
        <div className="anim-ticker flex w-max gap-11 pl-[22px] text-[15px] text-muted-foreground md:pl-11">
          {[...WORDMARKS, ...WORDMARKS].map((mark, i) => (
            <span key={`${mark}-${i}`} className="whitespace-nowrap">
              {mark}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
