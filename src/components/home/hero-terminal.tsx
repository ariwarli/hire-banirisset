"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHAR_INTERVAL_MS = 22;
const LINE_PAUSE_MS = 260;
const START_DELAY_MS = 500;

export function HeroTerminal({ lines }: { lines: string[] }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setLineIndex(lines.length - 1);
      setCharIndex(lines[lines.length - 1]?.length ?? 0);
      setFinished(true);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function typeChar(li: number, ci: number) {
      if (cancelled) return;
      const current = lines[li] ?? "";
      if (ci < current.length) {
        setLineIndex(li);
        setCharIndex(ci + 1);
        timeoutId = setTimeout(() => typeChar(li, ci + 1), CHAR_INTERVAL_MS);
      } else if (li < lines.length - 1) {
        timeoutId = setTimeout(() => typeChar(li + 1, 0), LINE_PAUSE_MS);
      } else {
        setFinished(true);
      }
    }

    timeoutId = setTimeout(() => typeChar(0, 0), START_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [lines]);

  return (
    <motion.div
      initial={{ y: 24 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      aria-hidden
      className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-border/60 bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur-sm md:mx-0"
    >
      <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 truncate text-xs text-muted-foreground">
          bani@automation
        </span>
      </div>
      <div className="min-h-[168px] px-4 py-4 font-mono text-[13px] leading-6">
        {lines.map((line, i) => {
          if (i > lineIndex) return null;
          const isCurrent = i === lineIndex;
          const text = isCurrent ? line.slice(0, charIndex) : line;
          const isPrompt = line.startsWith("$");
          const isCheck = line.startsWith("✓");

          return (
            <div
              key={line}
              className={
                isPrompt
                  ? "text-foreground"
                  : isCheck
                    ? "text-emerald-400"
                    : "text-muted-foreground"
              }
            >
              {text}
              {isCurrent && !finished && (
                <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] animate-pulse bg-primary/80" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
