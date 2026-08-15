import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { Capabilities } from "@/components/home/capabilities";
import { WordmarkTicker } from "@/components/home/wordmark-ticker";

/**
 * Four blocks only. SelectedProjects, FeaturedCaseStudies, Timeline and
 * ClosingCta are removed from the homepage per the brief ("too much
 * content"). Their message-catalog entries stay — /work still uses them.
 * The component files can be deleted once you're sure nothing else imports
 * them: home/selected-projects.tsx, home/featured-case-studies.tsx,
 * home/timeline.tsx, home/closing-cta.tsx, home/hero-terminal.tsx.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Capabilities />
      <WordmarkTicker />
    </>
  );
}
