import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { CONTACT } from "@/lib/constants";

export function ClosingCta() {
  const t = useTranslations("ClosingCta");

  return (
    <section className="px-6 py-28">
      <FadeIn className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          {t("title")}
        </h2>
        <p className="max-w-xl text-muted-foreground">{t("desc")}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className={buttonVariants({ size: "lg" })}>
            {t("ctaPrimary")}
          </Link>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
