"use client";

import { useLang } from "@/context/LanguageContext";
import { content, email, socials } from "@/data/content";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";

export function Contacts() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section id="contacts" className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <Reveal>
        <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-neutral-400">
          {t.contactsTitle}
        </h2>
      </Reveal>

      <Reveal>
        <p className="max-w-2xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          {t.contactsLead}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <a
          href={`mailto:${email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-white transition-transform hover:scale-[1.02]"
        >
          {t.contactsCta} <span>↗</span>
        </a>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {s.label}
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-6 text-sm text-neutral-400">
        <span>{t.location}</span>
        <LiveClock />
      </div>
    </section>
  );
}
