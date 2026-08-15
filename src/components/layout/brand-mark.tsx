/**
 * Nav lockup for logo direction 4b (monogram BR) — see
 * ~/2_Areas/banirisset/projects/hire-banirisset/Ide Logo/PENJELASAN.md.
 * The mockup only specs the 76px hero mark and the 44/28/16px icon swatches;
 * these nav sizes are a scaled-down interpretation, not a pixel-perfect spec.
 */
export function BrandMark({ size = "desktop" }: { size?: "desktop" | "mobile" }) {
  const brSize = size === "desktop" ? "text-[28px]" : "text-[20px]";
  const nameSize = size === "desktop" ? "text-[13px]" : "text-[11px]";
  const labelSize = size === "desktop" ? "text-[8.5px]" : "text-[7.5px]";
  const hairlineHeight = size === "desktop" ? "h-6" : "h-[18px]";
  const gap = size === "desktop" ? "gap-2.5" : "gap-2";

  return (
    <span className={`flex items-center ${gap}`}>
      <span className={`font-display ${brSize} leading-none tracking-[-.06em]`}>
        {"BR"}
      </span>
      <span className={`${hairlineHeight} w-px bg-paper/20`} />
      <span className="flex flex-col gap-0.5">
        <span className={`font-display ${nameSize} leading-none tracking-[-.01em]`}>
          {"Bani Risset"}
        </span>
        <span
          className={`font-mono ${labelSize} leading-none tracking-[.14em] uppercase text-paper/60`}
        >
          {"Digital & AI"}
        </span>
      </span>
    </span>
  );
}
