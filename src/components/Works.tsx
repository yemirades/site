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

const projectVisuals: Record<
  string,
  { className: string; image?: string; video?: string; poster?: string }
> = {
  "Mycar Autoservice": {
    className: "case-agro",
    video: "case-mycar-autoservice.mp4",
    poster: "case-mycar-autoservice.png",
  },
  "BBS Visual Identity": {
    className: "case-bbs",
    video: "case-bbs.mp4",
    poster: "case-bbs.png",
  },
  "Kartell E-commerce": {
    className: "case-kartell",
    image: "case-kartell.png",
  },
  "Mycar Pay Landing": {
    className: "case-pay",
    image: "case-mycar-pay.jpg",
  },
};

function ProjectArtwork({ title }: { title: string }) {
  const visual = projectVisuals[title];

  if (visual?.video) {
    return (
      <video
        aria-label={`${title} animated project cover`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={`${basePath}/${visual.poster}`}
        className="project-artwork absolute inset-0 h-full w-full object-cover"
      >
        <source src={`${basePath}/${visual.video}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (visual?.image) {
    return (
      <Image
        src={`${basePath}/${visual.image}`}
        alt={`${title} project cover`}
        fill
        sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1280px) calc(100vw - 228px), 1044px"
        className="project-artwork object-cover"
      />
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
      className={`project-card ${projectVisuals[project.title]?.className ?? ""} aspect-video`}
    >
      <ProjectArtwork title={project.title} />
    </div>
  );

  const caseLink = project.href ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-1 transition-transform duration-300 hover:-translate-y-0.5 hover:translate-x-0.5"
    >
      Behance
      <ArrowIcon className="size-3" />
    </a>
  ) : (
    <span>Case soon</span>
  );

  const caseMeta = (
    <div className="type-text mt-3 flex items-center justify-between gap-4 sm:mt-4">
      <p>{project.title}</p>
      <div className="flex shrink-0 items-center gap-3">
        <span className="tag-pill border border-[var(--line)] px-2 py-1 text-[9px] leading-none lowercase sm:text-[11px]">
          {project.tag[lang]}
        </span>
      </div>
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="group grid gap-3 sm:grid-cols-[120px_minmax(0,1fr)_120px] sm:items-center sm:gap-5"
    >
      <div className="type-text flex items-center justify-between sm:flex sm:justify-end">
        <span>({String(index + 1).padStart(2, "0")})</span>
        <span className="ml-1">{project.year}</span>
        <span className="lowercase text-[var(--muted)] sm:hidden">{project.tag[lang]}</span>
      </div>

      <div className="project-motion-stage lg:w-[92%] lg:max-w-[900px] lg:justify-self-center">
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
          {caseMeta}
        </motion.div>
      </div>

      <div className="type-text hidden sm:flex sm:justify-start">
        {caseLink}
      </div>
    </div>
  );
}

export function Works() {
  const { lang } = useLang();

  return (
    <section
      id="works"
      className="theme-surface px-4 pb-24 pt-14 sm:px-8 sm:pb-36 lg:px-10"
    >
      <h2 className="sr-only font-hero">
        {lang === "kk" ? "Jobalar" : "Selected works"}
      </h2>
      <div className="mx-auto max-w-[1200px] space-y-14 sm:space-y-24 lg:w-full lg:max-w-none">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.04}>
            <ProjectCase project={project} index={index} lang={lang} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
