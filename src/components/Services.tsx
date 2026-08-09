"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { content, services } from "@/data/content";
import { bindShortWords } from "@/lib/typography";
import { Reveal } from "./Reveal";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const serviceVisuals = [
  { src: "case-mycar-pay.jpg", type: "image" },
  { src: "case-bbs.png", type: "image" },
  { src: "case-logofolio.png", type: "image" },
  { src: "case-mycar-samsung.mp4", type: "video" },
];

function ServiceVisual({ active }: { active: number }) {
  const visual = serviceVisuals[active];
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#111318]">
      <AnimatePresence mode="wait" initial={false}>
        {visual.type === "video" ? (
          <motion.video key={visual.src} autoPlay muted loop playsInline preload="metadata"
            initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }} className="absolute inset-0 h-full w-full object-cover">
            <source src={`${basePath}/${visual.src}`} type="video/mp4" />
          </motion.video>
        ) : (
          <motion.div key={visual.src} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="absolute inset-0">
            <Image src={`${basePath}/${visual.src}`} alt="" fill sizes="(max-width: 639px) 100vw, 42vw" className="object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}

export function Services() {
  const { lang } = useLang();
  const t = content[lang];
  const [active, setActive] = useState(0);
  const intro = lang === "en"
    ? "Strategy, identity and digital experiences — shaped into clear visual systems."
    : "Strategiia, aıdentika jäne tsifrlyq täjiribe — aıqyn vizualdy jüiege aynalady.";

  return (
    <section id="services" className="theme-surface px-4 py-20 sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-[1200px] lg:max-w-none">
        <Reveal>
          <div className="mb-10 sm:mb-14">
            <h2 className="font-hero text-[48px] font-semibold leading-none tracking-[-0.045em] sm:text-[64px]">
              {bindShortWords(t.servicesTitle)}
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(250px,.55fr)] lg:gap-12">
          <div>
            <p className="mb-9 max-w-[440px] text-[17px] font-normal leading-[1.2] sm:text-[21px]">
              {bindShortWords(intro)}
            </p>
            <div className="border-t border-[var(--line)]">
              {services[lang].map((service, index) => (
                <Reveal key={service.title} delay={index * 0.035}>
                  <button type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className={`group grid w-full grid-cols-[34px_1fr] items-center gap-3 border-b border-[var(--line)] py-5 text-left transition-colors sm:grid-cols-[46px_1fr] sm:py-6 ${active === index ? "text-[var(--ink)]" : "text-[var(--muted)]"}`}>
                    <span className="text-[11px] tabular-nums">0{index + 1}</span>
                    <span className="font-hero text-[32px] font-medium leading-[.94] tracking-[-.04em] transition-transform duration-300 group-hover:translate-x-2 sm:text-[clamp(40px,4vw,58px)]">
                      {bindShortWords(service.title)}
                    </span>
                    <span className="col-start-2 max-w-[520px] text-[13px] font-normal leading-[1.3] text-[var(--muted)] sm:text-[15px]">
                      {bindShortWords(service.desc)}
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="w-full max-w-[320px] justify-self-end lg:sticky lg:top-24" delay={0.08}>
            <ServiceVisual active={active} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
