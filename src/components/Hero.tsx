"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { content } from "@/data/content";
import { LiveClock } from "./LiveClock";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Hero() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section id="top" className="theme-surface relative min-h-[650px] px-4 sm:min-h-[610px] sm:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center pt-24 text-center sm:pt-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative size-[108px] overflow-hidden rounded-full bg-[#21142f] sm:size-[120px]"
          data-video-slot
        >
          <video
            aria-label={lang === "ru" ? "Видео-портрет Мирата" : "Video portrait of Mirat"}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={`${basePath}/portrait-figma.jpg`}
            className="h-full w-full object-cover object-top"
          />
          <span className="pointer-events-none absolute bottom-2 right-2 size-2 rounded-full bg-white/80 ring-4 ring-black/20" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 font-display text-[66px] leading-[0.84] tracking-[-0.02em] sm:mt-10 sm:text-[82px] lg:text-[92px]"
        >
          Mirat Yerbolatov
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-5 max-w-[365px] text-[10px] uppercase leading-[1.28] tracking-[0.01em] sm:text-[12px]"
        >
          {t.about}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.34 }}
          className="mt-16 flex items-center gap-3 text-[9px] uppercase leading-none tracking-[0.015em] sm:mt-20 sm:text-[10px]"
        >
          <LiveClock />
          <span>{t.location}</span>
        </motion.div>
      </div>
    </section>
  );
}
