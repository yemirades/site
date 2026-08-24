"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const releaseLabel = "23.08.2026 · 19:40";

type PortfolioRailProps = {
  active: "cases" | "gallery";
};

export function PortfolioRail({ active }: PortfolioRailProps) {
  const { lang } = useLang();

  return (
    <nav
      className="index-rail"
      aria-label={lang === "en" ? "Portfolio sections" : "Portfolio bölimderi"}
    >
      <Link
        href="/#cases"
        className="index-rail-logo"
        aria-label={lang === "en" ? "Cases" : "Keister"}
      >
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
        <Link href="/#cases" aria-current={active === "cases" ? "page" : undefined}>cases</Link>
        <Link href="/gallery" aria-current={active === "gallery" ? "page" : undefined}>gallery</Link>
        <Link href="/#about">about me</Link>
      </div>
      <time className="index-rail-release" dateTime="2026-08-23T19:40:00+05:00">
        release {releaseLabel}
      </time>
    </nav>
  );
}
