"use client";

import { useLang } from "@/context/LanguageContext";
import { content, services } from "@/data/content";
import { Reveal } from "./Reveal";

export function Services() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <Reveal>
        <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-neutral-400">
          {t.servicesTitle}
        </h2>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {services[lang].map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-neutral-900 sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                {s.title}
              </h3>
              <p className="mt-2 text-neutral-500">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
