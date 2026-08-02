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
import { bindShortWords, groupShortWords } from "@/lib/typography";

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
  const start = (index / total) * 0.78;
  const end = Math.min(start + 0.18, 1);
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);

  return (
    <motion.span
      style={reduceMotion ? { opacity: 1, y: 0 } : { opacity, y }}
      className="inline-block"
    >
      {word}&nbsp;
    </motion.span>
  );
}

export function Approach() {
  const { lang } = useLang();
  const t = content[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const words = groupShortWords(t.approachText);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.82", "end 0.45"],
  });

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="theme-surface px-4 py-10 sm:px-8 sm:py-16 lg:px-10"
    >
      <div className="mx-auto flex min-h-[72svh] max-w-[1200px] flex-col px-1 py-6 sm:min-h-[78svh] sm:px-10 sm:py-9 lg:max-w-none">
        <div className="flex justify-start sm:justify-center">
          <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] leading-none lowercase">
            {bindShortWords(t.approachTitle)}
          </span>
        </div>

        <p className="mb-auto mt-16 max-w-[1040px] font-hero text-left text-[36px] font-medium leading-[0.94] sm:mx-auto sm:my-auto sm:text-center sm:text-[clamp(30px,5.2vw,72px)]">
          {words.map((word, index) => (
            <ApproachWord
              key={`${word}-${index}`}
              word={word}
              index={index}
              total={words.length}
              progress={scrollYProgress}
              reduceMotion={reduceMotion}
            />
          ))}
        </p>

      </div>
    </section>
  );
}
