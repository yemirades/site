"use client";

import { useLang } from "@/context/LanguageContext";
import { projects } from "@/data/content";
import { Reveal } from "./Reveal";

const visualClasses = [
  "case-mycar",
  "case-logofolio",
  "case-bbs",
  "case-kartell",
  "case-agro",
  "case-pay",
];

function ProjectArtwork({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8 text-white">
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.24em] opacity-65 sm:text-xs">Campaign / 2025</p>
          <p className="mt-3 text-3xl font-medium tracking-[-0.05em] sm:text-7xl">MYCAR × SAMSUNG</p>
          <div className="mx-auto mt-6 h-px w-20 bg-white/60 sm:w-36" />
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 text-[#111]">
        {[
          ["Y", "SERIF"],
          ["M", "GROTESK"],
          ["A", "DISPLAY"],
          ["25", "MARKS"],
        ].map(([mark, caption]) => (
          <div key={caption} className="flex items-center justify-between border border-black/35 p-4 sm:p-7">
            <span className="font-display text-5xl leading-none sm:text-8xl">{mark}</span>
            <span className="self-end text-[7px] uppercase sm:text-[10px]">{caption}</span>
          </div>
        ))}
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="absolute inset-0 flex items-center text-white">
        <div className="hidden h-full w-[42%] items-end p-8 sm:flex">
          <div className="h-[72%] w-[58%] rounded-t-full bg-gradient-to-t from-[#183fff] to-[#020516] opacity-80" />
        </div>
        <div className="ml-auto w-full p-7 sm:w-[58%] sm:p-10">
          <p className="text-xs font-semibold sm:text-lg">⬡ BBS</p>
          <p className="mt-8 max-w-[390px] text-2xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl">
            we create <span className="text-[#254dff]">maximum value</span> for our clients
          </p>
        </div>
      </div>
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
          <p className="text-[8px] uppercase tracking-[0.34em] sm:text-xs">Agro logomark</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center text-white">
      <div className="rounded-full border border-white/35 px-8 py-5 backdrop-blur-sm sm:px-16 sm:py-9">
        <p className="text-3xl font-medium tracking-[-0.06em] sm:text-7xl">mycar pay</p>
      </div>
    </div>
  );
}

export function Works() {
  const { lang } = useLang();

  return (
    <section id="works" className="theme-surface px-4 pb-24 sm:px-8 sm:pb-36">
      <h2 className="sr-only">{lang === "kk" ? "Жобалар" : "Selected works"}</h2>
      <div className="mx-auto max-w-[1200px] space-y-14 sm:space-y-24">
        {projects.map((project, index) => {
          const card = (
            <div className="group grid gap-3 sm:grid-cols-[82px_minmax(0,1fr)_82px] sm:items-center sm:gap-5">
              <div className="flex items-center justify-between text-[9px] uppercase leading-none sm:block sm:text-[10px]">
                <span>[{String(index + 1).padStart(2, "0")}]</span>
                <span className="ml-1">{project.year}</span>
                <span className="text-[var(--muted)] sm:hidden">{project.tag[lang]}</span>
              </div>

              <div
                className={`project-card ${visualClasses[index]} aspect-[1.48/1] rounded-[5px] transition-transform duration-700 ease-out group-hover:scale-[0.995] sm:aspect-[2.05/1] sm:rounded-[9px]`}
              >
                <ProjectArtwork index={index} />
              </div>

              <div className="flex items-center justify-between text-[9px] uppercase leading-none sm:block sm:text-right sm:text-[10px]">
                <span className="text-[var(--muted)] sm:hidden">{project.title}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  {project.href ? "Behance ↗" : "Case soon"}
                </span>
              </div>
            </div>
          );

          return (
            <Reveal key={project.title} delay={index * 0.04}>
              {project.href ? (
                <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — Behance`}>
                  {card}
                </a>
              ) : (
                card
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
