"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { content } from "@/data/content";
import { LiveClock } from "./LiveClock";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Hero() {
  const { lang } = useLang();
  const t = content[lang];
  const name = lang === "en" ? ["Mirat", "Yerbolatov"] : ["Мират", "Ерболат"];

  return (
    <section
      id="top"
      className="relative min-h-[720px] overflow-hidden bg-white px-4 sm:px-8 lg:min-h-screen"
    >
      <div className="relative mx-auto min-h-[720px] max-w-[960px] lg:min-h-screen">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="absolute left-0 top-24 max-w-[310px] text-[11px] uppercase leading-[1.22] tracking-[0.015em] sm:left-1/2 sm:top-6 sm:w-[280px] sm:-translate-x-1/2 sm:text-[12px]"
        >
          {t.about}
        </motion.p>

        <div className="absolute inset-x-0 bottom-7 grid items-end gap-8 sm:bottom-8 sm:grid-cols-3 sm:gap-0">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[76px] leading-[0.76] tracking-[-0.025em] sm:text-[92px] lg:text-[108px]"
          >
            <span className="block">{name[0]}</span>
            <span className="block">{name[1]}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="order-first justify-self-end sm:order-none sm:justify-self-center"
          >
            <div className="relative h-[104px] w-[132px] overflow-hidden rounded-t-[54px] rounded-b-[18px] bg-accent sm:h-[112px] sm:w-[142px]">
              <Image
                src={`${basePath}/portrait-figma.jpg`}
                alt={t.name}
                width={240}
                height={184}
                priority
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="flex items-center gap-3 text-[10px] uppercase leading-none tracking-[0.015em] sm:justify-self-end sm:pb-1"
          >
            <LiveClock />
            <span>{t.location}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
