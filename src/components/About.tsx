"use client";

import { useLang } from "@/context/LanguageContext";
import { content } from "@/data/content";
import { Reveal } from "./Reveal";

export function About() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section id="about" className="theme-surface px-4 py-24 sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-[1200px] border-t border-[var(--line)] pt-5">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-0">
          <h2 className="font-display text-7xl leading-none sm:text-8xl">
            {lang === "en" ? "About" : "Мен туралы"}
          </h2>
          <p className="text-[12px] uppercase leading-[1.35] text-[var(--muted)] sm:col-span-2 sm:max-w-[490px] sm:justify-self-end">
            {t.about}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
