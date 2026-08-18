"use client";

import { useRef } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { content } from "@/data/content";
import { bindShortWords } from "@/lib/typography";

function ApproachWord({
  word,
  index,
  total,
  progress,
  reduceMotion,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const start = (index / Math.max(total, 1)) * 0.42;
  const end = Math.min(start + 0.1, 1);
  const y = useTransform(progress, [start, end], ["110%", "0%"]);

  return (
    <motion.span
      style={reduceMotion ? { y: "0%" } : { y }}
      className="inline-block will-change-transform"
    >
      {word}
    </motion.span>
  );
}

export function Approach() {
  const { lang } = useLang();
  const t = content[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const words = t.approachText.split(" ");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.86", "end 0.38"],
  });

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="theme-surface min-h-[72svh] px-4 py-10 sm:min-h-[100svh] sm:px-8 sm:py-16 lg:px-10"
    >
      <div className="mx-auto flex min-h-[calc(72svh-80px)] max-w-[1200px] flex-col px-1 py-6 sm:min-h-[calc(100svh-128px)] sm:px-10 sm:py-9 lg:max-w-none">
        <div className="flex justify-start sm:justify-center">
          <span className="tag-pill border border-[var(--line)] px-3 py-1 text-[11px] leading-none uppercase">
            {bindShortWords(t.approachTitle)}
          </span>
        </div>

        <p aria-label={t.approachText} className="type-title mb-auto mt-14 max-w-[1040px] font-hero text-left sm:mx-auto sm:my-auto sm:text-center">
          {words.map((word, wordIndex) => (
            <span
              key={`${word}-${wordIndex}`}
              aria-hidden="true"
              className="mb-[-.12em] inline-block overflow-hidden pb-[.12em] whitespace-nowrap"
            >
              <ApproachWord word={word} index={wordIndex} total={words.length} progress={scrollYProgress} reduceMotion={reduceMotion} />
              {wordIndex < words.length - 1 ? "\u00a0" : null}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
