"use client";

import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { socials } from "@/data/content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Nav() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const social = Object.fromEntries(socials.map((item) => [item.label, item.href]));

  const links = [
    { href: "#works", label: "Works" },
    { href: social.Telegram, label: "Telegram", external: true },
    { href: social.Instagram, label: "Instagram", external: true },
    { href: social.LinkedIn, label: "LinkedIn", external: true },
    { href: "#contacts", label: "CV ↗" },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-8 sm:pt-5">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[1fr_auto_1fr] items-start gap-2">
        <a
          href="#top"
          aria-label="Yemirades — home"
          className="pointer-events-auto flex w-fit items-center gap-2 text-[10px] uppercase leading-none tracking-[0.02em]"
        >
          <span className="relative block size-7 overflow-hidden rounded-full bg-[#21142f] sm:size-8">
            <Image
              src={`${basePath}/portrait-figma.jpg`}
              alt=""
              fill
              priority
              sizes="32px"
              className="object-cover object-top"
            />
          </span>
          <span className="hidden sm:inline">@Yemirades</span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto flex items-center gap-2 rounded-[7px] bg-[var(--pill)] px-2.5 py-2 text-[8px] uppercase leading-none tracking-[0.01em] text-[var(--pill-ink)] shadow-[0_1px_0_rgba(127,127,127,.18)] sm:gap-4 sm:px-4 sm:text-[11px]"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="whitespace-nowrap opacity-80 transition-opacity hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="pointer-events-auto flex justify-self-end gap-1.5">
          <div className="flex rounded-[7px] bg-[var(--pill)] p-[3px] text-[8px] uppercase leading-none text-[var(--pill-ink)] sm:text-[10px]">
            {(["en", "ru"] as const).map((language) => (
              <button
                key={language}
                onClick={() => setLang(language)}
                aria-pressed={lang === language}
                className={`rounded-[5px] px-1.5 py-[5px] uppercase transition-colors sm:px-2 ${
                  lang === language
                    ? "bg-[var(--page)] text-[var(--ink)]"
                    : "opacity-55 hover:opacity-100"
                }`}
              >
                {language}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              lang === "ru"
                ? `Включить ${theme === "dark" ? "светлую" : "тёмную"} тему`
                : `Switch to ${theme === "dark" ? "light" : "dark"} theme`
            }
            title={theme === "dark" ? "Light theme" : "Dark theme"}
            className="flex size-[30px] items-center justify-center rounded-[7px] bg-[var(--pill)] text-[var(--pill-ink)] transition-transform hover:rotate-12 sm:size-8"
          >
            <span aria-hidden="true" className="text-[13px] leading-none">
              {theme === "dark" ? "☼" : "◐"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
