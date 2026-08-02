"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { content, services } from "@/data/content";
import { Reveal } from "./Reveal";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const serviceImages = [
  "case-mycar-pay.png",
  "case-bbs.png",
  "case-logofolio.png",
];

export function Services() {
  const { lang } = useLang();
  const t = content[lang];
  const [activeService, setActiveService] = useState(0);
  const serviceRefs = useRef<(HTMLElement | null)[]>([]);
  const intro =
    lang === "en"
      ? "Product interfaces, websites and visual systems built through clarity, purpose and close collaboration."
      : "Айқындыққа, мақсатқа және тығыз ынтымақтастыққа негізделген өнім интерфейстері, сайттар мен визуалды жүйелер.";

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    let observer: IntersectionObserver | null = null;

    const observeServices = () => {
      observer?.disconnect();
      observer = null;

      if (!mobile.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          const activeEntry = entries.find((entry) => entry.isIntersecting);
          if (!activeEntry) return;

          const index = Number(
            (activeEntry.target as HTMLElement).dataset.serviceIndex,
          );
          if (!Number.isNaN(index)) setActiveService(index);
        },
        {
          rootMargin: "-30% 0px -55% 0px",
          threshold: 0,
        },
      );

      serviceRefs.current.forEach((service) => {
        if (service) observer?.observe(service);
      });
    };

    observeServices();
    mobile.addEventListener("change", observeServices);

    return () => {
      mobile.removeEventListener("change", observeServices);
      observer?.disconnect();
    };
  }, []);

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

              <div className="mt-12 hidden aspect-square w-full max-w-[240px] overflow-hidden bg-[var(--soft)] sm:block">
                <AnimatePresence mode="wait" initial={false}>
                  {activeService === 3 ? (
                    <motion.video
                      key="marketing-video"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.28 }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    >
                      <source
                        src={`${basePath}/case-mycar-samsung.mp4`}
                        type="video/mp4"
                      />
                    </motion.video>
                  ) : (
                    <motion.div
                      key={serviceImages[activeService]}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.28 }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={`${basePath}/${serviceImages[activeService]}`}
                        alt=""
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          <div className="min-w-0">
            {services[lang].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <article
                  ref={(node) => {
                    serviceRefs.current[i] = node;
                  }}
                  data-service-index={i}
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
                    <h3 className="min-w-0 font-hero text-[38px] font-medium leading-[0.92] tracking-[-0.035em] sm:text-[clamp(44px,5.6vw,76px)]">
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
