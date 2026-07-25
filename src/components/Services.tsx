"use client";

import { useLang } from "@/context/LanguageContext";
import { content, services } from "@/data/content";
import { Reveal } from "./Reveal";

export function Services() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section id="services" className="theme-surface px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto min-w-0 max-w-[1200px] border-t border-[var(--line)] pt-5">
        <div className="grid min-w-0 gap-14 sm:grid-cols-3 sm:gap-0">
          <Reveal className="min-w-0">
            <h2 className="min-w-0 font-display text-[72px] leading-[0.8] sm:text-[100px]">
              {t.servicesTitle}
            </h2>
          </Reveal>

          <div className="min-w-0 sm:col-span-2 sm:pl-8">
            {services[lang].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <div className="grid min-w-0 grid-cols-[32px_minmax(0,1fr)] gap-4 border-t border-[var(--line)] py-5 first:border-t-0 sm:grid-cols-[48px_minmax(0,1fr)_minmax(0,1fr)]">
                  <span className="text-[10px] tabular-nums">0{i + 1}</span>
                  <h3 className="min-w-0 text-[12px] uppercase leading-tight">{s.title}</h3>
                  <p className="col-start-2 mt-2 min-w-0 text-[10px] uppercase leading-[1.35] text-[var(--muted)] sm:col-start-3 sm:mt-0">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
