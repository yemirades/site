"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { socials } from "@/data/content";
import { PortfolioRail } from "./PortfolioRail";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const copy = {
  en: {
    title: "About me",
    story:
      "Hi, I’m Mirat, a designer based in Almaty. Outside of work, I’m passionate about running and have completed two full marathons. I’m also a devoted fan of FC Internazionale Milano (Forza Inter!). My favorite city is Istanbul (not Constantinople) — the only place I’ve visited outside Kazakhstan so far, but one that left a lasting impression on me.",
  },
  kk: {
    title: "Men turaly",
    story:
      "Sälem, men Miratpyn, Almatyda tūratyn dizainermın. Jūmystan tys uaqytta jüginudi jaqsy köremin jäne eki tolyq marafondy ayaqtadym. Sonymen qatar FC Internazionale Milano klubynyñ adal jan-küierimin (Forza Inter!). Süiktı qalam — Istanbul (Konstantinopol emes). Äzirge Qazaqstannan tys bolğan jalğyz jerım, biraq ol mağan erekşe äser qaldyrdy.",
  },
} as const;

const mediaCards = [
  { id: "run-video", kind: "video", src: "about-run-video.mp4", poster: "about-run-video-poster.jpg", alt: "Mirat at the Istanbul Half Marathon" },
  { id: "istanbul", kind: "image", src: "about-istanbul.jpg", alt: "Mirat in Istanbul" },
  { id: "marathon", kind: "image", src: "about-marathon.jpg", alt: "Mirat running the Almaty Half Marathon" },
  { id: "inter", kind: "image", src: "about-inter.jpg", alt: "FC Internazionale Milano at Mirat’s workspace" },
  { id: "coffee", kind: "image", src: "about-coffee.jpg", alt: "Turkish coffee and water" },
  { id: "bread", kind: "image", src: "about-bread.jpg", alt: "Fresh bread in Almaty" },
  { id: "pixel-portrait", kind: "image", src: "about-pixel-portrait.png", alt: "Pixel portrait of Mirat" },
] as const;

function DisplayControls() {
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
    </div>
  );
}

export function About() {
  const { lang } = useLang();
  const text = copy[lang];
  const playgroundRef = useRef<HTMLDivElement>(null);
  const topLayer = useRef(mediaCards.length);
  const [layers, setLayers] = useState<Record<string, number>>(
    Object.fromEntries(mediaCards.map((card, index) => [card.id, index + 1])),
  );

  const bringToFront = (id: string) => {
    topLayer.current += 1;
    setLayers((current) => ({ ...current, [id]: topLayer.current }));
  };

  return (
    <main className="about-page">
      <PortfolioRail active="about" />

      <div className="about-shell">
        <header className="about-topbar">
          <Link href="/">Mirat Yerbolatov</Link>
          <DisplayControls />
        </header>

        <section className="about-story" aria-label={text.title}>
          <p className="about-copy">{text.story}</p>
        </section>

        <section className="about-playground" ref={playgroundRef} aria-label="Personal photo playground">
          {mediaCards.map((card) => (
            <motion.div
              key={card.id}
              className={`about-card about-card--${card.id}`}
              drag
              dragConstraints={playgroundRef}
              dragElastic={0.04}
              dragMomentum={false}
              onPointerDown={() => bringToFront(card.id)}
              onFocus={() => bringToFront(card.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  bringToFront(card.id);
                }
              }}
              whileDrag={{ scale: 1.025 }}
              style={{ zIndex: layers[card.id] }}
              role="button"
              tabIndex={0}
              aria-label={`${card.alt}. Drag to move or activate to bring forward.`}
            >
              {card.kind === "video" ? (
                <video
                  className="about-card-media"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={`${basePath}/${card.poster}`}
                  aria-hidden="true"
                >
                  <source src={`${basePath}/${card.src}`} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={`${basePath}/${card.src}`}
                  alt=""
                  fill
                  sizes="(max-width: 860px) 58vw, 34vw"
                  className="about-card-media"
                  draggable={false}
                />
              )}
            </motion.div>
          ))}
        </section>

        <footer className="about-footer">
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
