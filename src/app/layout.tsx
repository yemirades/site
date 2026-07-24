import type { Metadata } from "next";
import { Stint_Ultra_Condensed } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const stint = Stint_Ultra_Condensed({
  variable: "--font-stint",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const pitagon = localFont({
  src: "./fonts/PitagonSansMono-Medium.ttf",
  variable: "--font-pitagon",
  weight: "500",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mirat Yerbolat — Multidisciplinary Designer",
  description:
    "Portfolio of Mirat Yerbolat — multidisciplinary designer focused on websites and brand identities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${stint.variable} ${pitagon.variable} h-full antialiased`}
    >
      <body className="min-h-full font-mono">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
