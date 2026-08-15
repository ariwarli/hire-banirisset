import Image from "next/image";
import { useTranslations } from "next-intl";

interface NotableCollab {
  name: string;
  title: string;
  project: string;
  year: string;
  image: string;
}

/**
 * Photos are still `/collabs/placeholder.webp` for all seven — the grey tile
 * with a FOTO label in the mock is what a missing image looks like on
 * purpose. Drop the real square crops into /public/collabs and point each
 * catalog entry at its own file.
 */
export function NotableCollaborations() {
  const t = useTranslations("AboutPage.notableCollabs");
  const items = t.raw("items") as NotableCollab[];

  return (
    <section className="flex flex-col gap-6 px-[22px] py-10 md:px-11 md:pb-13">
      <h2 className="text-[26px] leading-tight">{t("title")}</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((collab) => (
          <div key={collab.name} className="flex flex-col gap-3">
            <div className="group relative aspect-square overflow-hidden border border-border bg-placeholder">
              <Image
                src={collab.image}
                alt={collab.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
              />
            </div>
            <div className="flex flex-col gap-[3px]">
              <p className="text-[15px] leading-snug font-medium">{collab.name}</p>
              <p className="text-[12.5px] leading-snug text-muted-foreground">
                {collab.title}
              </p>
              <p className="pt-0.5 font-mono text-[11px] leading-normal text-muted-foreground">
                {collab.project} {"·"} {collab.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
