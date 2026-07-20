"use client";

import { useLang } from "@/context/LanguageContext";
import { content, projects } from "@/data/content";
import { Reveal } from "./Reveal";

export function Works() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section id="works" className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <Reveal>
        <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-neutral-400">
          {t.worksTitle}
        </h2>
      </Reveal>

      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {projects.map((p, i) => {
          const Row = (
            <div className="group flex items-center justify-between gap-4 py-6 transition-colors hover:bg-neutral-50">
              <div className="flex min-w-0 items-baseline gap-4">
                <span className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                  {p.title}
                </span>
                <span className="hidden text-sm text-neutral-400 sm:inline">
                  {p.tag[lang]}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-neutral-400">
                <span className="text-sm tabular-nums">{p.year}</span>
                {p.href && (
                  <span className="text-neutral-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                )}
              </div>
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
    </section>
  );
}
