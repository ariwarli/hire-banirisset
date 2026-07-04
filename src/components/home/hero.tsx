"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { HeroTerminal } from "@/components/home/hero-terminal";

export function Hero() {
  const t = useTranslations("Hero");
  const terminalLines = t.raw("terminal.lines") as string[];

  return (
    <section className="relative overflow-hidden border-b border-border/50 px-6 pb-24 pt-28 md:pb-32 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          {/* Position-only animation (no opacity) — an opacity:0 initial state
            on above-the-fold text delays FCP/LCP until JS runs the reveal. */}
          <motion.p
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-primary"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl"
          >
            {t("name")}
          </motion.h1>

          <motion.p
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            {t("tagline")}
          </motion.p>

          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/work" className={buttonVariants({ size: "lg" })}>
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>

        <HeroTerminal lines={terminalLines} />
      </div>
    </section>
  );
}
