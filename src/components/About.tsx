"use client";

import { useLang } from "@/context/LanguageContext";
import { content } from "@/data/content";
import { Reveal } from "./Reveal";

export function About() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section id="about" className="mx-auto max-w-4xl px-4 py-28 sm:py-36">
      <Reveal>
        <p className="text-2xl font-medium leading-snug tracking-tight text-neutral-900 sm:text-4xl sm:leading-snug">
          {t.about}
        </p>
      </Reveal>
    </section>
  );
}
