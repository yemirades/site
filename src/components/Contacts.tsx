"use client";

import { useLang } from "@/context/LanguageContext";
import { content, email, socials } from "@/data/content";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";
import { ArrowIcon } from "./ArrowIcon";

export function Contacts() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section id="contacts" className="bg-[var(--inverse)] px-4 py-20 text-[var(--inverse-ink)] transition-colors duration-300 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-0">
          <Reveal>
            <p className="text-[10px] uppercase">{t.contactsTitle}</p>
          </Reveal>

          <div className="sm:col-span-2">
            <Reveal>
              <p className="max-w-[620px] font-display text-[70px] leading-[0.82] tracking-[-0.02em] sm:text-[110px]">
                {t.contactsLead}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={`mailto:${email}`}
                className="mt-10 inline-flex items-center gap-1 border-b border-current pb-1 text-[11px] uppercase transition-opacity hover:opacity-60"
              >
                {t.contactsCta}
                <ArrowIcon className="size-3.5" />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-28 grid gap-8 border-t border-current pt-5 text-[10px] uppercase opacity-80 sm:grid-cols-3 sm:items-end sm:gap-0">
          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:col-span-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-opacity hover:opacity-55"
              >
                {s.label}
                <ArrowIcon className="size-3" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 sm:justify-self-end">
            <LiveClock />
            <span>{t.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
