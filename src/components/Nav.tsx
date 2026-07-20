"use client";

import { useLang } from "@/context/LanguageContext";
import { content } from "@/data/content";

export function Nav() {
  const { lang, setLang } = useLang();
  const t = content[lang];

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#works", label: t.nav.works },
    { href: "#services", label: t.nav.services },
    { href: "#contacts", label: t.nav.contacts },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white transition-transform hover:scale-105"
          aria-label="Home"
        >
          MY
        </a>

        {/* Pill nav */}
        <nav className="hidden rounded-full bg-neutral-900/95 px-2 py-2 text-sm text-neutral-300 backdrop-blur md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Language toggle */}
        <div className="flex rounded-full bg-neutral-900 p-1 text-sm">
          {(["ru", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1 transition-colors ${
                lang === l ? "bg-white text-neutral-900" : "text-neutral-400"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="mt-3 flex justify-center gap-1 rounded-full bg-neutral-900/95 px-2 py-2 text-xs text-neutral-300 backdrop-blur md:hidden">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-white"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
