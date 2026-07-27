"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { projects, type Project } from "@/data/content";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./ArrowIcon";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const visualClasses = [
  "case-mycar",
  "case-logofolio",
  "case-bbs",
  "case-kartell",
  "case-agro",
  "case-pay",
];

const imageCovers: Partial<Record<number, string>> = {
  1: "case-logofolio.png",
  2: "case-bbs.png",
  5: "case-mycar-pay.png",
};

function ProjectArtwork({
  index,
  title,
}: {
  index: number;
  title: string;
}) {
  if (index === 0) {
    return (
      <video
        aria-label={`${title} project cover`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src={`${basePath}/case-mycar-samsung.mp4`}
          type="video/mp4"
        />
      </video>
    );
  }

  const imageCover = imageCovers[index];

  if (imageCover) {
    return (
      <Image
        src={`${basePath}/${imageCover}`}
        alt={`${title} project cover`}
        fill
        sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1280px) calc(100vw - 228px), 1044px"
        className="object-cover"
      />
    );
  }

  if (index === 3) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-[#fff8ef]">
        <div className="absolute left-[12%] top-[15%] size-[32%] rounded-full border border-white/55" />
        <div className="absolute bottom-[9%] right-[13%] size-[42%] rounded-full bg-black/15" />
        <p className="relative text-4xl tracking-[-0.06em] sm:text-8xl">KARTELL</p>
      </div>
    );
  }

  if (index === 4) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-[#e5ffbd]">
        <div className="text-center">
          <p className="font-display text-7xl leading-none sm:text-[150px]">A</p>
          <p className="text-[8px] tracking-[0.34em] sm:text-xs">Agro logomark</p>
        </div>
      </div>
    );
  }

  return null;
}

function ProjectCase({
  project,
  index,
  lang,
}: {
  project: Project;
  index: number;
  lang: "kk" | "en";
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 1.02", "start 0.38"],
  });
  const easedProgress = useTransform(
    scrollYProgress,
    (value) => 1 - Math.pow(1 - value, 2.2),
  );
  const y = useTransform(easedProgress, [0, 1], ["82%", "0%"]);
  const rotateX = useTransform(easedProgress, [0, 1], [68, 0]);
  const z = useTransform(easedProgress, [0, 1], [-140, 0]);
  const scale = useTransform(
    easedProgress,
    [0, 0.72, 1],
    [1.18, 1.02, 1],
  );
  const opacity = useTransform(easedProgress, [0, 0.65, 1], [0.68, 1, 1]);

  const artwork = (
    <div
      className={`project-card ${visualClasses[index]} aspect-video transition-[filter] duration-700 ease-out group-hover:brightness-[1.05]`}
    >
      <ProjectArtwork index={index} title={project.title} />
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="group grid gap-3 sm:grid-cols-[82px_minmax(0,1fr)_82px] sm:items-center sm:gap-5"
    >
      <div className="flex items-center justify-between text-[9px] leading-none sm:block sm:text-[10px]">
        <span>[{String(index + 1).padStart(2, "0")}]</span>
        <span className="ml-1">{project.year}</span>
        <span className="text-[var(--muted)] sm:hidden">{project.tag[lang]}</span>
      </div>

      <div className="project-motion-stage">
        <motion.div
          className="project-motion-card"
          style={reduceMotion ? undefined : { y, rotateX, z, scale, opacity }}
        >
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — Behance`}
              className="block"
            >
              {artwork}
            </a>
          ) : (
            artwork
          )}
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-[9px] leading-none sm:block sm:text-right sm:text-[10px]">
        <span className="text-[var(--muted)] sm:hidden">{project.title}</span>
        <span className="inline-flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {project.href ? (
            <>
              Behance
              <ArrowIcon className="size-3" />
            </>
          ) : (
            "Case soon"
          )}
        </span>
      </div>
    </div>
  );
}

export function Works() {
  const { lang } = useLang();

  return (
    <section
      id="works"
      className="theme-surface px-4 pb-24 pt-10 sm:px-8 sm:pb-36 lg:px-6 lg:pt-20"
    >
      <h2 className="sr-only">{lang === "kk" ? "Жобалар" : "Selected works"}</h2>
      <div className="mx-auto max-w-[1200px] space-y-14 sm:space-y-24 lg:max-w-none">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.04}>
            <ProjectCase project={project} index={index} lang={lang} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
