import type { Metadata } from "next";
import localFont from "next/font/local";
import { FontCatalog } from "@/components/FontCatalog";

const interCatalog = localFont({
  src: [
    { path: "../fonts/InterDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/InterDisplay-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-catalog-inter",
});

const giorgioCatalog = localFont({
  src: "../fonts/GiorgioSansLCG-Heavy.otf",
  display: "swap",
  weight: "900",
  variable: "--font-catalog-giorgio",
});

const pitagonCatalog = localFont({
  src: "../fonts/PitagonSansMono-Medium.ttf",
  display: "swap",
  weight: "500",
  variable: "--font-catalog-pitagon",
});

const lebowskiCatalog = localFont({
  src: "../fonts/Lebowski-by-Pragmatica-KZ-Regular.otf",
  display: "swap",
  weight: "400",
  variable: "--font-catalog-lebowski",
});

export const metadata: Metadata = {
  title: "Kazakh typefaces — Yemirades",
  description: "A curated collection of typefaces supporting Kazakh Cyrillic.",
  alternates: { canonical: "/qfonts/" },
};

export default function QFontsPage() {
  return (
    <div className={`${interCatalog.variable} ${giorgioCatalog.variable} ${pitagonCatalog.variable} ${lebowskiCatalog.variable}`}>
      <FontCatalog />
    </div>
  );
}
