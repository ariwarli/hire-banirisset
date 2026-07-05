import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/fade-in";

interface NotableCollab {
  name: string;
  title: string;
  project: string;
  year: string;
  image: string;
}

export function NotableCollaborations() {
  const t = useTranslations("AboutPage.notableCollabs");
  const items = t.raw("items") as NotableCollab[];

  return (
    <FadeIn delay={0.2} className="mt-16">
      <h2 className="text-xl font-semibold tracking-tight">{t("title")}</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((collab) => (
          <div key={collab.name} className="flex flex-col gap-3">
            <div className="group relative aspect-square overflow-hidden rounded-xl border border-border/60 bg-card/50">
              <Image
                src={collab.image}
                alt={collab.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
              />
            </div>
            <div>
              <p className="text-sm font-semibold">{collab.name}</p>
              <p className="text-xs text-muted-foreground">{collab.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {collab.project} — {collab.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
