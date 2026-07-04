import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { SelectedProjects } from "@/components/home/selected-projects";
import { Capabilities } from "@/components/home/capabilities";
import { FeaturedCaseStudies } from "@/components/home/featured-case-studies";
import { Timeline } from "@/components/home/timeline";
import { ClosingCta } from "@/components/home/closing-cta";

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
      <SelectedProjects />
      <Capabilities />
      <FeaturedCaseStudies />
      <Timeline />
      <ClosingCta />
    </>
  );
}
