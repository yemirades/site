"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { content, services } from "@/data/content";
import { Reveal } from "./Reveal";

export function Services() {
  const { lang } = useLang();
  const t = content[lang];
  const [activeService, setActiveService] = useState(0);
  const intro =
    lang === "en"
      ? "Product interfaces, websites and visual systems built through clarity, purpose and close collaboration."
      : "Айқындыққа, мақсатқа және тығыз ынтымақтастыққа негізделген өнім интерфейстері, сайттар мен визуалды жүйелер.";

  return (
    <section id="services" className="theme-surface px-4 py-24 sm:px-8 sm:py-32 lg:px-10">
      <div className="mx-auto min-w-0 max-w-[1200px] border-t border-[var(--line)] pt-5 lg:max-w-none">
        <Reveal className="min-w-0">
          <h2 className="max-w-[820px] font-hero text-[42px] font-semibold leading-[0.9] tracking-[-0.045em] sm:text-[64px]">
            {t.servicesTitle}
          </h2>
        </Reveal>

        <div className="mt-16 grid min-w-0 gap-14 sm:mt-20 sm:grid-cols-[minmax(180px,0.75fr)_minmax(0,1.7fr)] sm:gap-16">
          <Reveal>
            <div className="max-w-[280px]">
              <p className="text-[14px] font-medium leading-[1.15] sm:text-[16px]">
                {intro}
              </p>
              <p className="mt-8 text-[11px] text-[var(--muted)]">
                Communication → Collaboration → Clarity
              </p>
            </div>
          </Reveal>

          <div className="min-w-0">
            {services[lang].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <article
                  className="border-t border-[var(--line)]"
                  onMouseEnter={() => setActiveService(i)}
                  onFocus={() => setActiveService(i)}
                >
                  <button
                    type="button"
                    aria-expanded={activeService === i}
                    onClick={() => setActiveService(i)}
                    className={`flex w-full items-baseline gap-4 py-3 text-left transition-[color,opacity] duration-300 sm:gap-6 ${
                      activeService === i
                        ? "text-[var(--ink)] opacity-100"
                        : "text-[var(--muted)] opacity-35 hover:text-[#ff6135] hover:opacity-100"
                    }`}
                  >
                    <span className="w-7 shrink-0 text-[10px] tabular-nums">
                      0{i + 1}
                    </span>
                    <h3 className="min-w-0 text-[38px] font-medium leading-[0.92] tracking-[-0.045em] sm:text-[clamp(44px,5.6vw,76px)]">
                      {s.title}
                    </h3>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      gridTemplateRows:
                        activeService === i ? "1fr" : "0fr",
                      opacity: activeService === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="grid"
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pl-11 text-[13px] leading-[1.3] text-[var(--muted)] sm:pl-[52px] sm:text-[15px]">
                        {s.desc}
                      </p>
                    </div>
                  </motion.div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
