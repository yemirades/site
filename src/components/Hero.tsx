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

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-16 h-[42vh] max-h-[420px] min-h-[260px] w-auto"
      >
        <Image
          src={`${basePath}/portrait.svg`}
          alt={t.name}
          width={420}
          height={420}
          priority
          className="h-full w-auto object-contain [mask-image:linear-gradient(to_bottom,black_60%,transparent_98%)]"
        />
      </motion.div>

      {/* Name + role */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="-mt-6 text-center"
      >
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {t.name}
        </h1>
        <p className="mt-1 text-lg text-neutral-400 sm:text-xl">{t.role}</p>
      </motion.div>

      {/* Footer meta */}
      <div className="absolute bottom-6 flex items-center gap-4 text-sm text-neutral-400">
        <span>{t.location}</span>
        <LiveClock />
      </div>
    </section>
  );
}
