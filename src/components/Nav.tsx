"use client";

import { useLang } from "@/context/LanguageContext";
import { socials } from "@/data/content";

export function Nav() {
  const { lang, setLang } = useLang();
  const telegram = socials.find((item) => item.label === "Telegram");
  const instagram = socials.find((item) => item.label === "Instagram");
  const behance = socials.find((item) => item.label === "Behance");

  const links = [
    { href: "#works", label: "Works" },
    { href: telegram?.href ?? "#contacts", label: "Telegram", external: true },
    { href: instagram?.href ?? "#contacts", label: "Instagram", external: true },
    { href: behance?.href ?? "#works", label: "Behance", external: true },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-6">
      <div className="mx-auto flex max-w-[960px] items-start justify-between">
        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto flex items-center gap-3 rounded-[7px] bg-black px-3 py-2 text-[10px] uppercase leading-none tracking-[0.02em] text-white sm:gap-4 sm:text-[11px]"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className={`${l.label === "Behance" ? "hidden sm:inline" : ""} opacity-80 transition-opacity hover:opacity-100`}
            >
              {l.label}{l.external && l.label === "Behance" ? " ↗" : ""}
            </a>
          ))}
        </nav>

        <div className="pointer-events-auto flex rounded-[7px] bg-black p-[3px] text-[10px] uppercase leading-none text-white sm:text-[11px]">
          {(["en", "ru"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`rounded-[5px] px-2 py-[5px] uppercase transition-colors ${
                lang === l ? "bg-white text-black" : "text-white/75 hover:text-white"
              }`}
            >
              {l === "ru" ? "ru" : "en"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
