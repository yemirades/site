"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { content } from "@/data/content";
import { LiveClock } from "./LiveClock";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Hero() {
  const { lang } = useLang();
  const t = content[lang];
  const mobileAboutLines =
    lang === "en"
      ? [
          "Sälem! I’m a Multidisciplinary designer,",
          "focused on building clear and functional",
          "websites and visual identities. Currently",
          "working at Mycar Group.",
        ]
      : [
          "Сәлем! Мен мультидисциплинарлы дизайнермін,",
          "түсінікті әрі функционалды сайттар мен",
          "визуалды айдентикалар жасаймын. Қазір",
          "Mycar Group-та жұмыс істеймін.",
        ];

  return (
    <section
      id="top"
      className="theme-surface relative min-h-[100svh] overflow-hidden px-4 sm:px-8 lg:min-h-[568px] lg:px-6"
    >
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col pt-[72px] lg:block lg:min-h-[568px] lg:max-w-none lg:pt-0">
        <div className="relative mx-auto aspect-[386/339] w-full max-w-[240px] shrink-0 overflow-hidden sm:max-w-[320px] lg:absolute lg:left-1/2 lg:top-[111px] lg:h-[339px] lg:w-[386px] lg:max-w-none lg:-translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden bg-black"
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
              className="h-full w-full object-cover object-center"
            >
              <source src={`${basePath}/hero-video.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-4 w-full max-w-[378px] self-end text-[16px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[18px] lg:absolute lg:right-0 lg:top-[238px] lg:mt-0 lg:text-[20px]"
        >
          <span className="sm:hidden">
            {mobileAboutLines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </span>
          <span className="hidden sm:inline">{t.about}</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-auto w-full max-w-[438px] font-display text-[58px] font-medium leading-[0.9] tracking-[-0.05em] lg:absolute lg:bottom-[10px] lg:left-0 lg:mt-0 lg:text-[80px]"
        >
          <span className="block">Mirat</span>
          <span className="block">Yerbolatuly</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.34 }}
          className="mb-4 mt-3 flex items-center gap-[9px] self-start text-[14px] font-medium leading-[1.1] tracking-[-0.02em] lg:absolute lg:bottom-[11px] lg:right-0 lg:mb-0 lg:mt-0"
        >
          <LiveClock />
          <span>{t.location}</span>
        </motion.div>
      </div>
    </section>
  );
}
