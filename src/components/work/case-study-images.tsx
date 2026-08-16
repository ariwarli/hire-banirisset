import fs from "fs";
import path from "path";
import Image from "next/image";
import { imageSize } from "image-size";

interface CaseStudyImageData {
  src: string;
  alt: string;
  caption?: string;
}

interface ResolvedImage extends CaseStudyImageData {
  width: number;
  height: number;
  wide: boolean;
}

const NUMBERS = ["01", "02"];
/** width/height ≥ this is treated as landscape; below is portrait/square. */
const WIDE_RATIO_THRESHOLD = 1.2;

function resolveImage(image: CaseStudyImageData): ResolvedImage {
  const filePath = path.join(process.cwd(), "public", image.src);
  const buffer = fs.readFileSync(filePath);
  const { width, height } = imageSize(buffer);
  return { ...image, width, height, wide: width / height >= WIDE_RATIO_THRESHOLD };
}

function ImageCaption({ caption, number }: { caption?: string; number: string }) {
  return (
    <div className="flex w-full items-baseline justify-between gap-3 pt-2.5">
      {caption ? (
        <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
          {caption}
        </span>
      ) : (
        <span />
      )}
      <span className="font-mono text-[10.5px] tracking-[0.1em] text-foreground/40">
        {number}
      </span>
    </div>
  );
}

/** Full column width, locked 16:9 — the only variant `object-fit: cover` is safe for. */
function WideImage({ image, number }: { image: ResolvedImage; number: string }) {
  return (
    <figure className="m-0 flex w-full flex-col">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-placeholder">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 760px, 100vw"
          className="object-cover"
        />
      </div>
      <ImageCaption caption={image.caption} number={number} />
    </figure>
  );
}

/**
 * Renders at its intrinsic size (capped at 520px tall) instead of cropping —
 * a forced 16:9 `cover` would slice off ~40%+ of a tall portrait mockup.
 * `inline-flex` + `items-start` makes the figure shrink-wrap to the image's
 * own rendered width, so the caption row below sits flush with the image's
 * edges instead of stretching to the full column/grid-cell width.
 */
function PortraitImage({ image, number }: { image: ResolvedImage; number: string }) {
  return (
    <figure className="m-0 inline-flex flex-col items-start">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 768px) 400px, 100vw"
        className="h-auto max-h-[520px] w-auto max-w-full"
      />
      <ImageCaption caption={image.caption} number={number} />
    </figure>
  );
}

function ImageBlock({ image, number }: { image: ResolvedImage; number: string }) {
  return image.wide ? (
    <WideImage image={image} number={number} />
  ) : (
    <PortraitImage image={image} number={number} />
  );
}

/**
 * Optional screenshot slot for the Solution section. Renders nothing when
 * `images` is empty or absent — no placeholder, no reserved space. Max 2
 * images; anything past that is ignored rather than forcing an undesigned
 * 3-column grid.
 */
export function CaseStudyImages({ images }: { images?: CaseStudyImageData[] }) {
  if (!images || images.length === 0) return null;

  const resolved = images.slice(0, 2).map(resolveImage);

  if (resolved.length === 1) {
    return <ImageBlock image={resolved[0]} number={NUMBERS[0]} />;
  }

  const allPortrait = resolved.every((image) => !image.wide);

  if (allPortrait) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {resolved.map((image, i) => (
          <ImageBlock key={image.src} image={image} number={NUMBERS[i]} />
        ))}
      </div>
    );
  }

  // All-wide, or mixed orientation (undesigned case) — stack vertically,
  // each rendered per its own orientation rule.
  return (
    <div className="flex flex-col gap-7">
      {resolved.map((image, i) => (
        <ImageBlock key={image.src} image={image} number={NUMBERS[i]} />
      ))}
    </div>
  );
}
