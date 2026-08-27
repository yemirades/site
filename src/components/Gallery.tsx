"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { PortfolioRail } from "./PortfolioRail";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type GalleryItem = {
  id: string;
  title: string;
  year: string;
  src: string;
  media: "image" | "video";
  poster?: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "01",
    title: "Don’t quit",
    year: "2026",
    src: "gallery/dont-quit-2026.mp4",
    media: "video",
    poster: "gallery/dont-quit-2026-poster.png",
  },
  {
    id: "02",
    title: "Confucius",
    year: "2025",
    src: "gallery/confucius-2025.mp4",
    media: "video",
    poster: "gallery/confucius-2025-poster.png",
  },
  {
    id: "03",
    title: "Kyrgyz proverb",
    year: "2025",
    src: "gallery/kyrgyz-proverb-2025.webp",
    media: "image",
  },
  {
    id: "04",
    title: "Mustafa Öztürk",
    year: "2025",
    src: "gallery/mustafa-ozturk-2025.webp",
    media: "image",
  },
  {
    id: "05",
    title: "Ted Lasso (fan poster)",
    year: "2025",
    src: "gallery/ted-lasso-2025.webp",
    media: "image",
  },
  {
    id: "06",
    title: "Oppenheimer",
    year: "2023",
    src: "gallery/oppenheimer-2023.webp",
    media: "image",
  },
  {
    id: "07",
    title: "Don’t worry",
    year: "2022",
    src: "gallery/dont-worry-2022.webp",
    media: "image",
  },
  {
    id: "08",
    title: "Leo Tolstoy",
    year: "2022",
    src: "gallery/leo-tolstoy-2022.webp",
    media: "image",
  },
  {
    id: "09",
    title: "Menimen Bol (music poster)",
    year: "2022",
    src: "gallery/menimen-bol-2022.webp",
    media: "image",
  },
];

function DisplayControls() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="index-controls gallery-controls" aria-label="Display controls">
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

function Poster({ item, enlarged = false }: { item: GalleryItem; enlarged?: boolean }) {
  return (
    <div className={`gallery-poster${enlarged ? " gallery-poster--enlarged" : ""}`}>
      {item.media === "video" ? (
        <video
          className="gallery-poster-video"
          autoPlay
          muted
          loop
          playsInline
          controls={enlarged}
          preload={enlarged ? "auto" : "metadata"}
          poster={item.poster ? `${basePath}/${item.poster}` : undefined}
          aria-label={item.title}
        >
          <source src={`${basePath}/${item.src}`} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={`${basePath}/${item.src}`}
          alt={item.title}
          fill
          sizes={enlarged ? "90vw" : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"}
          className="gallery-poster-image"
        />
      )}
    </div>
  );
}

export function Gallery() {
  const { lang } = useLang();
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  const copy = lang === "en"
    ? {
        eyebrow: "Selected graphic experiments, posters and visual notes",
        count: `${galleryItems.length} works`,
        open: "Open",
        close: "Close preview",
      }
    : {
        eyebrow: "Tañdauly grafikalyq täjiribeler, posterler jäne vizualdy jazbalar",
        count: `${galleryItems.length} jūmys`,
        open: "Aşu",
        close: "Qaralymdy jabu",
      };

  return (
    <main className="gallery-page">
      <PortfolioRail active="gallery" />

      <div className="gallery-shell">
        <header className="gallery-header">
          <div className="gallery-mobile-nav">
            <Link href="/">Mirat Yerbolatov</Link>
          </div>
          <div className="gallery-heading-row">
            <h1>Gallery</h1>
            <DisplayControls />
          </div>
          <div className="gallery-intro">
            <p>{copy.eyebrow}</p>
            <p>{copy.count}</p>
          </div>
        </header>

        <section className="gallery-grid" aria-label="Gallery works">
          {galleryItems.map((item) => (
            <article className="gallery-item" key={item.id}>
              <button
                type="button"
                className="gallery-poster-button"
                onClick={() => setSelected(item)}
                aria-label={`${copy.open}: ${item.title}, ${item.year}`}
              >
                <Poster item={item} />
              </button>
              <div className="gallery-item-meta">
                <h2>{item.title}</h2>
                <time>{item.year}</time>
              </div>
            </article>
          ))}
        </section>
      </div>

      {selected ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title}, ${selected.year}`}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelected(null);
          }}
        >
          <div className="gallery-lightbox-topbar">
            <p>{selected.title}</p>
            <p>{selected.year}</p>
            <button ref={closeButtonRef} type="button" onClick={() => setSelected(null)}>
              <span>{copy.close}</span>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="gallery-lightbox-artwork">
            <Poster item={selected} enlarged />
          </div>
        </div>
      ) : null}
    </main>
  );
}
