"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { content, services } from "@/data/content";
import { bindShortWords } from "@/lib/typography";
import { Reveal } from "./Reveal";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const serviceImages = [
  "case-mycar-pay.jpg",
  "case-bbs.png",
  "case-logofolio.png",
];

function ServiceArtwork({ activeService }: { activeService: number }) {
  return (
    <div className="aspect-square w-full overflow-hidden bg-[var(--soft)]">
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
            <source src={`${basePath}/case-mycar-samsung.mp4`} type="video/mp4" />
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
              sizes="(max-width: 639px) 180px, 240px"
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Services() {
  const { lang } = useLang();
  const t = content[lang];
  const [activeService, setActiveService] = useState(0);
  const servicesListRef = useRef<HTMLDivElement | null>(null);
  const intro =
    lang === "en"
      ? "Product interfaces, websites and visual systems built through clarity, purpose and close collaboration."
      : "Aıqyndyqqa, maqsatqa jäne tyğyz yntymaqtastyqqa negizdelgen önim interfeisteri, saittar men vizualdy jüieler.";

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    let animationFrame = 0;

    const updateActiveService = () => {
      if (!mobile.matches) return;

      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const servicesList = servicesListRef.current;
        if (!servicesList) return;

        const activationLine = window.innerHeight * 0.72;
        const serviceStep = Math.max(112, window.innerHeight * 0.14);
        const scrollProgress = activationLine - servicesList.getBoundingClientRect().top;
        const nextService = Math.min(
          services[lang].length - 1,
          Math.max(0, Math.floor(scrollProgress / serviceStep)),
        );

        setActiveService((current) =>
          current === nextService ? current : nextService,
        );
      });
    };

    const syncMobileListeners = () => {
      window.removeEventListener("scroll", updateActiveService);
      window.removeEventListener("resize", updateActiveService);

      if (mobile.matches) {
        window.addEventListener("scroll", updateActiveService, {
          passive: true,
        });
        window.addEventListener("resize", updateActiveService);
        updateActiveService();
      }
    };

    syncMobileListeners();
    mobile.addEventListener("change", syncMobileListeners);

    return () => {
      cancelAnimationFrame(animationFrame);
      mobile.removeEventListener("change", syncMobileListeners);
      window.removeEventListener("scroll", updateActiveService);
      window.removeEventListener("resize", updateActiveService);
    };
  }, [lang]);

  return (
    <section id="services" className="theme-surface min-h-[100svh] px-4 py-14 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100svh-112px)] min-w-0 max-w-[1200px] items-center lg:max-w-none">
        <div className="grid w-full min-w-0 gap-8 sm:grid-cols-[minmax(180px,0.75fr)_minmax(0,1.7fr)] sm:gap-[30px]">
          <Reveal className="h-full">
            <div className="flex h-full flex-col items-start sm:max-w-[300px]">
              <h2 className="font-hero text-[42px] font-semibold leading-[0.9] tracking-[-0.045em] sm:text-[56px]">
                {bindShortWords(t.servicesTitle)}
              </h2>
              <p className="mt-5 min-w-0 text-[14px] font-medium leading-[1.15] sm:text-[16px]">
                {bindShortWords(intro)}
              </p>
              <div className="mt-auto hidden w-full max-w-[240px] sm:block">
                <ServiceArtwork activeService={activeService} />
              </div>
            </div>
          </Reveal>

          <div ref={servicesListRef} className="min-w-0">
            {services[lang].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <article
                  data-service-index={i}
                  className="border-t border-[var(--line)]"
                  onMouseEnter={() => setActiveService(i)}
                  onFocus={() => setActiveService(i)}
                >
                  <button
                    type="button"
                    aria-expanded={activeService === i}
                    onClick={() => setActiveService(i)}
                    className={`flex w-full items-baseline gap-2 py-3 text-left transition-[color,opacity] duration-300 sm:gap-6 ${
                      activeService === i
                        ? "text-[var(--ink)] opacity-100"
                        : "text-[var(--muted)] opacity-35 hover:text-[#8ce02b] hover:opacity-100"
                    }`}
                  >
                    <span className="w-6 shrink-0 text-[10px] tabular-nums sm:w-7">
                      0{i + 1}
                    </span>
                    <h3 className="min-w-0 font-hero text-[34px] font-medium leading-[0.94] tracking-[-0.035em] sm:text-[clamp(40px,4.8vw,64px)]">
                      {bindShortWords(s.title)}
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
                      <p className="pb-5 pl-8 text-[13px] leading-[1.3] text-[var(--muted)] sm:pl-[52px] sm:text-[15px]">
                        {bindShortWords(s.desc)}
                      </p>
                    </div>
                  </motion.div>
                </article>
              </Reveal>
            ))}

            <Reveal delay={0.08} className="mt-5 flex justify-start sm:hidden">
              <div className="w-[48%] max-w-[180px]">
                <ServiceArtwork activeService={activeService} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
