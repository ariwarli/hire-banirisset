"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    // Animate position only, never opacity: an opacity:0 initial state makes
    // the browser treat this content as unpainted, which delays LCP/FCP
    // until the animation's JS runs (measured via Lighthouse — see
    // dev-docs/ai/CURRENT_STATE.md). translateY has no such cost.
    <motion.div
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
