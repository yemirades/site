"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { socials } from "@/data/content";
import { ArrowIcon } from "./ArrowIcon";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Nav() {
  const { lang, setLang } = useLang();
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-5">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[1fr_auto] items-start gap-2 sm:grid-cols-[140px_auto_140px]">
        <a
          href="#top"
          aria-label="Yemirades — home"
          className="pointer-events-auto flex w-fit items-center gap-[10px] text-[14px] font-semibold leading-[1.25] tracking-[-0.02em]"
        >
          <span className="relative block size-9 overflow-hidden rounded-full bg-[#21142f]">
            <Image
              src={`${basePath}/portrait-figma.jpg`}
              alt=""
              fill
              priority
              sizes="36px"
              className="object-cover object-top"
            />
          </span>
          <span className="hidden sm:inline">@yemirades</span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto hidden items-center justify-self-center bg-[var(--pill)] p-1 text-[14px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--pill-ink)] sm:flex"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-0.5 whitespace-nowrap px-2 py-1 transition-opacity hover:opacity-55"
            >
              {link.label.toLowerCase()}
              {link.arrow ? <ArrowIcon /> : null}
            </a>
          ))}
        </nav>

        <div className="pointer-events-auto flex justify-self-end gap-1.5">
          <div className="flex bg-[var(--pill)] p-1 text-[14px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--pill-ink)]">
            {([
              { value: "en", label: "EN" },
              { value: "kk", label: "KZ" },
            ] as const).map((language) => (
              <button
                key={language.value}
                onClick={() => setLang(language.value)}
                aria-pressed={lang === language.value}
                className={`px-2 py-1 transition-colors ${
                  lang === language.value
                    ? "bg-[var(--page)] text-[var(--ink)]"
                    : "opacity-55 hover:opacity-100"
                }`}
              >
                {language.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative flex size-9 items-center justify-center bg-[var(--pill)] text-[var(--pill-ink)] sm:hidden"
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
        className={`pointer-events-auto absolute inset-x-4 top-[60px] overflow-hidden bg-[var(--pill)] text-[var(--pill-ink)] shadow-[0_16px_50px_rgba(0,0,0,.22)] transition-[opacity,transform,visibility] duration-300 sm:hidden ${
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
              className="flex items-center justify-between border-b border-current/20 py-3 text-[12px] last:border-b-0"
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
