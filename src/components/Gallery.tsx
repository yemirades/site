"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type GalleryItem = {
  id: string;
  title: string;
  year: string;
  image?: string;
  composition: number;
};

// Add an image filename from /public to an item when the final artwork is ready.
const galleryItems: GalleryItem[] = [
  { id: "01", title: "Untitled Poster", year: "2026", composition: 1 },
  { id: "02", title: "Sound in Motion", year: "2026", composition: 2 },
  { id: "03", title: "Interface Studies", year: "2026", composition: 3 },
  { id: "04", title: "Afterimage", year: "2026", composition: 4 },
  { id: "05", title: "Form / Function", year: "2025", composition: 5 },
  { id: "06", title: "New Symbols", year: "2025", composition: 6 },
  { id: "07", title: "Everyday Systems", year: "2025", composition: 7 },
  { id: "08", title: "Moving Type", year: "2025", composition: 8 },
  { id: "09", title: "Visual Notes", year: "2024", composition: 9 },
  { id: "10", title: "Printed Matter", year: "2024", composition: 10 },
  { id: "11", title: "Archive Study", year: "2024", composition: 11 },
  { id: "12", title: "Open Edition", year: "2024", composition: 12 },
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
    <div
      className={`gallery-poster gallery-poster--${item.composition}${enlarged ? " gallery-poster--enlarged" : ""}`}
    >
      {item.image ? (
        <Image
          src={`${basePath}/${item.image}`}
          alt={item.title}
          fill
          sizes={enlarged ? "90vw" : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"}
          className="gallery-poster-image"
        />
      ) : (
        <>
          <span className="gallery-placeholder-mark" aria-hidden="true" />
          <span className="gallery-placeholder-label">IMAGE {item.id}</span>
        </>
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
        nav: "Portfolio sections",
      }
    : {
        eyebrow: "Tañdauly grafikalyq täjiribeler, posterler jäne vizualdy jazbalar",
        count: `${galleryItems.length} jūmys`,
        open: "Aşu",
        close: "Qaralymdy jabu",
        nav: "Portfolio bölimderi",
      };

  return (
    <main className="gallery-page">
      <nav className="index-rail" aria-label={copy.nav}>
        <Link href="/#cases" className="index-rail-logo" aria-label="Mirat Yerbolatov — home">
          <Image
            src={`${basePath}/hero-logo.gif`}
            alt=""
            width={80}
            height={80}
            unoptimized
            priority
            className="theme-sensitive-mark"
          />
        </Link>
        <div className="index-rail-links">
          <Link href="/#cases">cases</Link>
          <Link href="/gallery" aria-current="page">gallery</Link>
          <Link href="/#about">about me</Link>
        </div>
        <span className="index-rail-release">visual archive · 2024—2026</span>
      </nav>

      <div className="gallery-shell">
        <header className="gallery-header">
          <div className="gallery-mobile-nav">
            <Link href="/">Mirat Yerbolatov</Link>
            <Link href="/#cases">Cases</Link>
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
