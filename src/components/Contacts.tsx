"use client";

import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { content, email, socials } from "@/data/content";
import { bindShortWords } from "@/lib/typography";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";

const experience = [
  { company: "Mycar", logo: "mycarrrrr.png", roles: [{ en: "Product designer", kk: "Önim dizaineri", dates: "06/2025 - now" }, { en: "Graphic designer", kk: "Grafikalyq dizainer", dates: "08/2023 - 06/2025" }] },
  { company: "Kaizen", logo: "kaizennnn.png", roles: [{ en: "Graphic & Web designer", kk: "Grafikalyq jäne Web dizainer", dates: "01/2023 - 08/2023" }] },
  { company: "Payda", logo: "paydaaaa.png", roles: [{ en: "Graphic designer", kk: "Grafikalyq dizainer", dates: "11/2021 - 02/2023" }] },
  { company: "Bugin Holding", logo: "bhhhh.png", roles: [{ en: "Graphic designer", kk: "Grafikalyq dizainer", dates: "11/2021 - 02/2023" }] },
];

export function Contacts() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <>
      <section id="contacts" className="theme-surface px-4 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-[1200px] lg:max-w-none">
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-0">
            <Reveal>
              <h2 className="font-hero text-[44px] font-semibold leading-none tracking-[-.045em] sm:text-[60px]">
                {lang === "en" ? "Experience" : "Täjiribe"}
              </h2>
            </Reveal>
            <div className="border-t border-[var(--line)] sm:col-span-2">
              {experience.map((item, index) => (
                <Reveal key={item.company} delay={index * .04}>
                  <article className={`grid gap-5 border-b border-[var(--line)] py-5 sm:grid-cols-3 sm:gap-6 sm:py-6 ${index === 0 ? "sm:pt-0" : ""}`}>
                    <div className="flex items-start gap-4 self-start">
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden sm:h-11 sm:w-11"><Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${item.logo}`} alt="" fill sizes="44px" className="object-cover" /></span>
                      <h3 className="text-[17px] !font-medium leading-[1.2] tracking-[-.025em] sm:text-[18px]">{item.company}</h3>
                    </div>
                    <div className="grid gap-3 sm:col-span-2">
                      {item.roles.map((role) => (
                        <div key={role.dates} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 sm:gap-8">
                          <p className="text-[17px] !font-medium leading-[1.2] tracking-[-.025em] sm:text-[18px]">{role[lang]}</p>
                          <p className="whitespace-nowrap text-[17px] !font-normal leading-[1.2] tabular-nums text-[var(--muted)] sm:text-[18px]">{role.dates}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#97ff27] px-4 py-12 text-black sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-[1200px] lg:max-w-none">
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-0">
            <Reveal className="flex items-start">
              <div className="relative aspect-square w-[132px] overflow-hidden sm:w-[160px]">
                <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/contact-photo.png`} alt="Mirat Erbolatūly" fill sizes="160px" className="object-cover grayscale" />
              </div>
            </Reveal>
            <div className="sm:col-span-2">
              <Reveal><p className="max-w-[760px] font-display text-[48px] leading-[0.94] sm:text-[76px]">{bindShortWords(t.contactsLead)}</p></Reveal>
              <Reveal delay={0.08}><a href={`mailto:${email}`} className="mt-8 inline-flex min-h-11 items-center bg-black px-5 text-[12px] font-semibold text-[#97ff27] transition-colors hover:bg-white hover:text-black">{bindShortWords(t.contactsCta)}</a></Reveal>
            </div>
          </div>
          <div className="mt-14 grid gap-8 border-t border-black/35 pt-5 text-[14px] sm:mt-20 sm:grid-cols-3 sm:items-end sm:gap-0">
            <div className="flex flex-wrap gap-x-5 gap-y-2 sm:col-span-2">{socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-55">{s.label}</a>)}</div>
            <div className="flex items-center gap-3 sm:justify-self-end"><LiveClock /><span>{bindShortWords(t.location)}</span></div>
          </div>
        </div>
      </footer>
    </>
  );
}
