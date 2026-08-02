"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { content } from "@/data/content";
import { bindShortWords } from "@/lib/typography";
import { LiveClock } from "./LiveClock";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Hero() {
  const { lang } = useLang();
  const t = content[lang];
  const mobileAboutLines =
    lang === "en"
      ? [
          "Sälem! I’m a product designer",
          "with a background in communication design.",
          "Currently working at Mycar Group.",
        ]
      : [
          "Сәлем! Мен мультидисциплинарлы дизайнермін,",
          "түсінікті әрі функционалды сайттар мен",
          "визуалды айдентикалар жасаймын. Қазір",
          "Mycar Group-та жұмыс істеймін.",
        ];
  const desktopAboutLines =
    lang === "en"
      ? [
          "Sälem! I’m a product designer",
          "with a background in communication design.",
          "Currently working at Mycar Group.",
        ]
      : [t.about];

  return (
    <section
      id="top"
      className="theme-surface relative min-h-[100svh] overflow-hidden px-4 sm:px-8 lg:h-[100svh] lg:min-h-0 lg:px-10"
    >
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col pb-[140px] pt-[92px] sm:pb-4 lg:block lg:h-full lg:min-h-0 lg:max-w-none lg:py-0">
        <div className="hero-frame relative ml-auto mr-0 aspect-square w-[120px] max-w-[calc(100vw-32px)] shrink-0 overflow-hidden sm:mx-auto sm:w-[min(62vw,260px)] sm:max-w-none lg:absolute lg:left-1/2 lg:top-1/2 lg:size-[260px] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden"
            data-video-slot
          >
            <video
              aria-label={
                lang === "kk"
                  ? "Мираттың видео-портреті"
                  : "Video portrait of Mirat"
              }
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="hero-video h-full w-full object-cover object-center"
            >
              <source src={`${basePath}/hero-video.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-hero hero-name pointer-events-none relative z-10 mt-auto flex w-full flex-col items-start gap-1 text-[64px] font-semibold leading-[0.86] tracking-[-0.045em] sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:text-[64px] lg:absolute lg:inset-x-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:text-[80px]"
        >
          <span>Mirat</span>
          <span>Yerbolatuly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-[15px] w-full max-w-[378px] text-[14px] font-semibold leading-[1.12] tracking-[-0.02em] sm:mt-5 sm:text-[18px] lg:absolute lg:bottom-[22px] lg:left-0 lg:mt-0 lg:text-[20px]"
        >
          <span className="sm:hidden">
            {mobileAboutLines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {bindShortWords(line)}
              </span>
            ))}
          </span>
          <span className="hidden sm:block">
            {desktopAboutLines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {bindShortWords(line)}
              </span>
            ))}
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.34 }}
          className="absolute bottom-6 left-0 flex items-center gap-[9px] text-[14px] font-medium leading-[1.1] tracking-[-0.02em] sm:bottom-4 lg:bottom-[22px] lg:left-auto lg:right-0"
        >
          <LiveClock />
          <span>{bindShortWords(t.location)}</span>
        </motion.div>
      </div>
    </section>
  );
}
