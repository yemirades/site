"use client";

import { useLang } from "@/context/LanguageContext";
import { content, projects } from "@/data/content";
import { Reveal } from "./Reveal";

export function Works() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section id="works" className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[960px]">
        <Reveal>
          <div className="mb-16 grid items-end gap-6 border-t border-black pt-5 sm:grid-cols-3">
            <h2 className="font-display text-8xl leading-none sm:text-[112px]">
              {t.worksTitle}
            </h2>
            <p className="text-[10px] uppercase leading-[1.3] sm:col-span-2 sm:justify-self-end">
              Selected projects / 2021—2026
            </p>
          </div>
        </Reveal>

        <div className="border-b border-black">
        {projects.map((p, i) => {
          const Row = (
            <div className="group grid min-h-24 grid-cols-[32px_1fr_auto] items-center gap-3 border-t border-black py-4 transition-colors duration-300 hover:bg-accent hover:px-4 hover:text-white sm:grid-cols-[52px_1fr_160px_24px] sm:gap-5">
              <span className="self-start pt-2 text-[10px] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <span className="block font-display text-[42px] leading-[0.88] tracking-[-0.015em] sm:text-[62px]">
                  {p.title}
                </span>
                <span className="mt-2 block text-[9px] uppercase sm:hidden">
                  {p.tag[lang]}
                </span>
              </div>
              <span className="hidden text-[10px] uppercase leading-tight sm:block">
                {p.tag[lang]}<br />{p.year}
              </span>
              <span className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                {p.href ? "↗" : "—"}
              </span>
            </div>
          );

          return (
            <Reveal key={p.title} delay={i * 0.05}>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer">
                  {Row}
                </a>
              ) : (
                Row
              )}
            </Reveal>
          );
        })}
        </div>
      </div>
    </section>
  );
}
