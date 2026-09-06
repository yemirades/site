"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { email, socials } from "@/data/content";
import { PortfolioRail } from "./PortfolioRail";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const copy = {
  en: {
    title: "About me",
    kicker: "Personal notes · Almaty, Qazaqstan",
    story:
      "Hi, I’m Mirat, a designer based in Almaty. Outside of work, I’m passionate about running and have completed two full marathons. I’m also a devoted fan of FC Internazionale Milano (Forza Inter!). My favorite city is Istanbul (not Constantinople) — the only place I’ve visited outside Kazakhstan so far, but one that left a lasting impression on me.",
    contact: "Say hello",
  },
  kk: {
    title: "Men turaly",
    kicker: "Jeke jazbalar · Almaty, Qazaqstan",
    story:
      "Sälem, men Miratpyn, Almatyda tūratyn dizainermın. Jūmystan tys uaqytta jüginudi jaqsy köremin jäne eki tolyq marafondy ayaqtadym. Sonymen qatar FC Internazionale Milano klubynyñ adal jan-küierimin (Forza Inter!). Süiktı qalam — Istanbul (Konstantinopol emes). Äzirge Qazaqstannan tys bolğan jalğyz jerım, biraq ol mağan erekşe äser qaldyrdy.",
    contact: "Sälem aitu",
  },
} as const;

function DisplayControls() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="index-controls about-controls" aria-label="Display controls">
      <button
        className="index-theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        aria-pressed={theme === "dark"}
      >
        <span className="index-theme-thumb" aria-hidden="true" />
        <span className="index-theme-symbol" aria-hidden="true">
          <Image
            src={`${basePath}/${theme === "dark" ? "light.svg" : "dark.svg"}`}
            alt=""
            width={18}
            height={18}
          />
        </span>
      </button>
      <button
        className="index-language-toggle"
        type="button"
        onClick={() => setLang(lang === "en" ? "kk" : "en")}
        aria-label={lang === "en" ? "Qazaqşa nusqağa auysu" : "Switch to English"}
      >
        {lang === "en" ? "KZ" : "EN"}
      </button>
    </div>
  );
}

export function About() {
  const { lang } = useLang();
  const text = copy[lang];

  return (
    <main className="about-page">
      <PortfolioRail active="about" />

      <div className="about-shell">
        <header className="about-header">
          <div className="about-mobile-nav">
            <Link href="/">Mirat Yerbolatov</Link>
          </div>
          <div className="about-heading-row">
            <h1>{text.title}</h1>
            <DisplayControls />
          </div>
        </header>

        <section className="about-story" aria-label={text.title}>
          <p className="about-kicker">{text.kicker}</p>
          <p className="about-copy">{text.story}</p>
        </section>

        <footer className="about-footer">
          <a href={`mailto:${email}`}>{text.contact}</a>
          <nav aria-label="Social links">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label.toLowerCase()}
              </a>
            ))}
          </nav>
        </footer>
      </div>
    </main>
  );
}
