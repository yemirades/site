"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
    <div className="relative aspect-square w-full overflow-hidden bg-[#111318]">
      {visual.type === "video" ? (
        <video key={visual.src} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover">
          <source src={`${basePath}/${visual.src}`} type="video/mp4" />
        </video>
      ) : (
        <div key={visual.src} className="absolute inset-0">
          <Image src={`${basePath}/${visual.src}`} alt="" fill sizes="(max-width: 639px) 100vw, 42vw" className="object-cover" />
        </div>
      )}
    </div>
  );
}

export function Services() {
  const { lang } = useLang();
  const t = content[lang];
  const [active, setActive] = useState(0);
  const serviceRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");

    const updateActiveService = () => {
      if (!media.matches) return;
      const focusLine = window.innerHeight * .48;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      serviceRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - focusLine);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActive(closestIndex);
    };

    updateActiveService();
    window.addEventListener("scroll", updateActiveService, { passive: true });
    window.addEventListener("resize", updateActiveService);
    return () => {
      window.removeEventListener("scroll", updateActiveService);
      window.removeEventListener("resize", updateActiveService);
    };
  }, []);

  return (
    <section id="services" className="theme-surface px-4 py-20 sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-[1200px] lg:max-w-none">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-0">
          <div className="flex min-w-0 flex-col lg:pr-10">
            <Reveal>
              <h2 className="font-hero text-[48px] font-semibold leading-none tracking-[-0.045em] sm:text-[64px]">
                {bindShortWords(t.servicesTitle)}
              </h2>
            </Reveal>
            <Reveal className="mt-auto hidden w-[58%] max-w-[240px] lg:block" delay={0.08}>
              <ServiceVisual active={active} />
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <div className="border-t border-[var(--line)]">
              {services[lang].map((service, index) => (
                <Reveal key={service.title} delay={index * 0.035}>
                  <button ref={(node) => { serviceRefs.current[index] = node; }} data-service-index={index}
                    type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}
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

          <Reveal className="w-[46%] max-w-[170px] justify-self-start lg:hidden" delay={0.08}>
            <ServiceVisual active={active} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
