import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import type { SelectedProject } from "@/lib/projects";

export function SelectedProjects() {
  const t = useTranslations("SelectedProjects");
  const selectedProjects = t.raw("items") as SelectedProject[];

  return (
    <section className="border-b border-border/50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-base font-medium text-primary">{t("eyebrow")}</p>
            <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/work"
            className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("viewAll")} →
          </Link>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {selectedProjects.map((project, i) => {
            const card = (
              <Card className="h-full border-border/60 bg-card/50 transition-colors hover:border-primary/40">
                <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-muted-foreground">
                      {project.category}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-base text-muted-foreground">
                      {project.client}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-base text-muted-foreground">
                    <span>{project.year}</span>
                    {project.href && (
                      <span className="text-primary">{t("viewDetail")} →</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );

            return (
              <FadeIn key={project.title} delay={i * 0.05}>
                {project.href ? (
                  <Link href={project.href} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
