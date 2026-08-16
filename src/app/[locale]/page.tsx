import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { Capabilities } from "@/components/home/capabilities";
import { SupportingPosition } from "@/components/home/supporting-position";
import { ClosingConsult } from "@/components/home/closing-consult";
import { WordmarkTicker } from "@/components/home/wordmark-ticker";
import { MobileLegal } from "@/components/home/mobile-legal";

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
      <SupportingPosition />
      <ClosingConsult />
      <WordmarkTicker />
      <MobileLegal />
    </>
  );
}
