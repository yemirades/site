"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { PortfolioRail } from "./PortfolioRail";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type FontCategory = "Sans serif" | "Display" | "Monospace";

type FontItem = {
  id: string;
  family: string;
  style: string;
  weight: string;
  category: FontCategory;
  fontClass: string;
  note: string;
};

const fonts: FontItem[] = [
  {
    id: "01",
    family: "Lebowski by Pragmatica KZ",
    style: "Regular",
    weight: "400",
    category: "Display",
    fontClass: "font-preview--lebowski",
    note: "Full Kazakh Cyrillic",
  },
  {
    id: "02",
    family: "Inter Display",
    style: "Regular",
    weight: "400",
    category: "Sans serif",
    fontClass: "font-preview--inter-regular",
    note: "Full Kazakh Cyrillic",
  },
  {
    id: "03",
    family: "Inter Display",
    style: "Semi Bold",
    weight: "600",
    category: "Sans serif",
    fontClass: "font-preview--inter-semibold",
    note: "Full Kazakh Cyrillic",
  },
  {
    id: "04",
    family: "Giorgio Sans LCG",
    style: "Heavy",
    weight: "900",
    category: "Display",
    fontClass: "font-preview--giorgio",
    note: "Full Kazakh Cyrillic",
  },
  {
    id: "05",
    family: "Pitagon Sans Mono",
    style: "Medium",
    weight: "500",
    category: "Monospace",
    fontClass: "font-preview--pitagon",
    note: "Full Kazakh Cyrillic",
  },
];

const sampleText = "Өнер алды — қызыл тіл.";

function ThemeControl() {
  const { theme, toggleTheme } = useTheme();

  return (
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
  );
}

export function FontCatalog() {
  const [query, setQuery] = useState("");
  const [previewText, setPreviewText] = useState(sampleText);
  const [category, setCategory] = useState("all");
  const [weight, setWeight] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const visibleFonts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return fonts.filter((font) => {
      const matchesQuery =
        !normalizedQuery ||
        `${font.family} ${font.style} ${font.category}`
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === "all" || font.category === category;
      const matchesWeight = weight === "all" || font.weight === weight;
      const matchesFavorite = !favoritesOnly || favorites.includes(font.id);

      return matchesQuery && matchesCategory && matchesWeight && matchesFavorite;
    });
  }, [category, favorites, favoritesOnly, query, weight]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <main className="fonts-page">
      <PortfolioRail active="fonts" />

      <div className="fonts-shell">
        <header className="fonts-header" id="top">
          <div className="fonts-topbar">
            <Link href="/" className="fonts-back-link">
              yemirades / qfonts
            </Link>
            <div className="index-controls fonts-theme-control" aria-label="Display controls">
              <ThemeControl />
            </div>
          </div>

          <div className="fonts-hero">
            <h1>Kazakh<br />typefaces</h1>
            <div className="fonts-hero-copy">
              <p>
                Қазақ кириллицасын қолдайтын қаріптердің шағын әрі мұқият тексерілген жинағы.
              </p>
              <p>{fonts.length.toString().padStart(2, "0")} typefaces / first edition</p>
            </div>
          </div>
        </header>

        <section className="fonts-catalog" aria-labelledby="fonts-catalog-title">
          <div className="fonts-section-heading">
            <h2 id="fonts-catalog-title">Typefaces</h2>
            <span>{visibleFonts.length.toString().padStart(2, "0")}</span>
          </div>

          <div className="fonts-filters" aria-label="Typeface controls">
            <label className="fonts-typing">
              <span>Type tester</span>
              <input
                type="text"
                value={previewText}
                onChange={(event) => setPreviewText(event.target.value)}
                placeholder="Type something"
                spellCheck={false}
              />
            </label>

            <button
              type="button"
              className="fonts-favorite-filter"
              aria-pressed={favoritesOnly}
              aria-label="Show favorites"
              onClick={() => setFavoritesOnly((current) => !current)}
            >
              <span aria-hidden="true">{favoritesOnly ? "★" : "☆"}</span>
            </button>

            <label className="fonts-search">
              <span className="sr-only">Search typefaces</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search typefaces"
              />
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="10.5" cy="10.5" r="5.75" />
                <path d="m15 15 4.25 4.25" />
              </svg>
            </label>

            <label className="fonts-select">
              <span className="sr-only">Category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="all">All categories</option>
                <option value="Sans serif">Sans serif</option>
                <option value="Display">Display</option>
                <option value="Monospace">Monospace</option>
              </select>
              <span aria-hidden="true">↓</span>
            </label>

            <label className="fonts-select">
              <span className="sr-only">Weight</span>
              <select value={weight} onChange={(event) => setWeight(event.target.value)}>
                <option value="all">All weights</option>
                <option value="400">Regular · 400</option>
                <option value="500">Medium · 500</option>
                <option value="600">Semi Bold · 600</option>
                <option value="900">Heavy · 900</option>
              </select>
              <span aria-hidden="true">↓</span>
            </label>
          </div>

          <div className="fonts-list" aria-live="polite">
            {visibleFonts.map((font) => {
              const isFavorite = favorites.includes(font.id);

              return (
                <article className="font-card" key={font.id}>
                  <div className="font-card-meta">
                    <p><span>{font.id}</span>{font.family}</p>
                    <p>{font.style} · {font.weight}</p>
                    <p>{font.category}</p>
                    <button
                      type="button"
                      aria-label={isFavorite ? `Remove ${font.family} from favorites` : `Add ${font.family} to favorites`}
                      aria-pressed={isFavorite}
                      onClick={() => toggleFavorite(font.id)}
                    >
                      <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
                    </button>
                  </div>

                  <p className={`font-card-sample ${font.fontClass}`}>{previewText || "\u00a0"}</p>

                  <div className="font-card-foot">
                    <p>Ә Ғ Қ Ң Ө Ұ Ү Һ І</p>
                    <p>{font.note}</p>
                  </div>
                </article>
              );
            })}

            {visibleFonts.length === 0 ? (
              <div className="fonts-empty">
                <p>No typefaces found.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                    setWeight("all");
                    setFavoritesOnly(false);
                  }}
                >
                  Reset filters
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <footer className="fonts-footer">
          <p>Work in progress.</p>
          <p>Licenses and source links will be added in the next edition.</p>
          <Link href="/">← Home</Link>
        </footer>
      </div>
    </main>
  );
}
