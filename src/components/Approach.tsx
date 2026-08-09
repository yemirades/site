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

function ApproachCharacter({
  character,
  index,
  total,
  progress,
  reduceMotion,
}: {
  character: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const start = (index / Math.max(total, 1)) * 0.86;
  const end = Math.min(start + 0.1, 1);
  const opacity = useTransform(progress, [start, end], [0.14, 1]);

  return (
    <motion.span
      style={reduceMotion ? { opacity: 1 } : { opacity }}
      className="inline-block"
    >
      {character}
    </motion.span>
  );
}

export function Approach() {
  const { lang } = useLang();
  const t = content[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const words = t.approachText.split(" ");
  const totalCharacters = words.reduce((total, word) => total + word.length, 0);
  let characterIndex = 0;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.86", "end 0.38"],
  });

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="theme-surface min-h-[100svh] px-4 py-10 sm:px-8 sm:py-16 lg:px-10"
    >
      <div className="mx-auto flex min-h-[calc(100svh-80px)] max-w-[1200px] flex-col px-1 py-6 sm:min-h-[calc(100svh-128px)] sm:px-10 sm:py-9 lg:max-w-none">
        <div className="flex justify-start sm:justify-center">
          <span className="tag-pill border border-[var(--line)] px-3 py-1 text-[11px] leading-none lowercase">
            {bindShortWords(t.approachTitle)}
          </span>
        </div>

        <p className="mb-auto mt-14 max-w-[1040px] font-hero text-left text-[32px] font-medium leading-[0.96] sm:mx-auto sm:my-auto sm:text-center sm:text-[clamp(30px,4.6vw,62px)]">
          {words.map((word, wordIndex) => (
            <span
              key={`${word}-${wordIndex}`}
              className="inline-block whitespace-nowrap"
            >
              {Array.from(word).map((character, index) => {
                const currentIndex = characterIndex;
                characterIndex += 1;

                return (
                  <ApproachCharacter
                    key={`${wordIndex}-${index}`}
                    character={character}
                    index={currentIndex}
                    total={totalCharacters}
                    progress={scrollYProgress}
                    reduceMotion={reduceMotion}
                  />
                );
              })}
              {wordIndex < words.length - 1 ? "\u00a0" : null}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
