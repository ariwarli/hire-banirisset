import Image from "next/image";

/**
 * Renders nothing when there is no image — deliberate. For 2012–2014
 * projects a fabricated mockup is worse than no image at all; an enterprise
 * or NGO reader spots it immediately. Fill `image` in the MDX frontmatter
 * only when a real screenshot exists.
 */
export function CaseStudyFigure({
  src,
  caption,
  alt,
  ratio = "16/9",
  className,
}: {
  src?: string;
  caption?: string;
  alt: string;
  ratio?: "16/9" | "3/2";
  className?: string;
}) {
  if (!src) return null;

  return (
    <figure className={className}>
      <div
        className="relative w-full bg-placeholder"
        style={{ aspectRatio: ratio.replace("/", " / ") }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 936px, 100vw"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="label-mono pt-3 text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
