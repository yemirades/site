"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { socials } from "@/data/content";
import { ArrowIcon } from "./ArrowIcon";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Nav() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const social = Object.fromEntries(socials.map((item) => [item.label, item.href]));

  const links = [
    { href: "#works", label: "Works" },
    { href: social.Telegram, label: "Telegram", external: true },
    { href: social.Instagram, label: "Instagram", external: true },
    { href: social.LinkedIn, label: "LinkedIn", external: true },
    { href: "#contacts", label: "CV", arrow: true },
  ];

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6">
      <div className="mx-auto grid grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[1fr_auto_1fr]">
        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto hidden items-center justify-self-start gap-2 text-[13px] font-medium leading-none lg:col-start-1 lg:row-start-1 lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1 whitespace-nowrap rounded-[10px] bg-[var(--soft)] px-4 py-2.5 text-[var(--ink)] transition-[background-color,color,transform] hover:-translate-y-px"
            >
              {link.label}
              {link.arrow ? <ArrowIcon /> : null}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          aria-label="Mirat — home"
          className="pointer-events-auto col-start-1 row-start-1 flex w-fit items-center lg:col-start-2 lg:justify-self-center"
        >
          <Image
            src={`${basePath}/hero-logo.gif`}
            alt=""
            width={100}
            height={100}
            unoptimized
            priority
            loading="eager"
            className="theme-sensitive-mark size-8 object-contain sm:size-9"
          />
        </a>

        <div className="pointer-events-auto col-start-2 row-start-1 flex items-center justify-self-end gap-2 lg:col-start-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
            aria-pressed={theme === "dark"}
            className="menu-control flex size-10 items-center justify-center bg-[var(--soft)] text-[var(--ink)] transition-colors lg:size-9"
          >
            {theme === "light" ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-[17px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19.2 15.5A8 8 0 0 1 8.5 4.8 8 8 0 1 0 19.2 15.5Z" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-[17px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="3.5" />
                <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
              </svg>
            )}
          </button>

          <div className="flex h-10 items-center rounded-[10px] bg-[var(--soft)] p-1 text-[13px] font-medium leading-none text-[var(--ink)] lg:h-9">
            {([
              { value: "en", label: "EN" },
              { value: "kk", label: "KZ" },
            ] as const).map((language) => (
              <button
                key={language.value}
                onClick={() => setLang(language.value)}
                aria-pressed={lang === language.value}
                className={`language-control flex h-8 min-w-11 items-center justify-center px-3 transition-colors lg:h-7 ${
                  lang === language.value
                    ? "bg-[var(--ink)] text-[var(--page)]"
                    : "opacity-55 hover:opacity-100"
                }`}
              >
                {language.label}
              </button>
            ))}
          </div>

          <a
            href="#contacts"
            className="hidden whitespace-nowrap rounded-[10px] bg-[var(--ink)] px-5 py-2.5 text-[13px] font-medium leading-none text-[var(--page)] lg:inline-flex"
          >
            {lang === "en" ? "Contact" : "Байланыс"}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="menu-control relative flex size-10 items-center justify-center bg-[var(--soft)] text-[var(--ink)] lg:hidden"
          >
            <span
              aria-hidden="true"
              className={`absolute h-px w-3.5 bg-current transition-transform duration-300 ${
                menuOpen ? "rotate-45" : "-translate-y-[3px]"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-px w-3.5 bg-current transition-transform duration-300 ${
                menuOpen ? "-rotate-45" : "translate-y-[3px]"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`pointer-events-auto absolute inset-x-4 top-[68px] overflow-hidden rounded-[12px] border border-[var(--line)] bg-[var(--page)] text-[var(--ink)] shadow-[0_16px_50px_rgba(0,0,0,.16)] transition-[opacity,transform,visibility] duration-300 lg:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="px-4 py-3">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-current/15 py-3 text-[13px] last:border-b-0"
            >
              <span className="inline-flex items-center gap-1">
                {link.label}
                {link.arrow ? <ArrowIcon /> : null}
              </span>
              <span className="text-[9px] opacity-45">0{index + 1}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
