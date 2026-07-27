import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fontsource/stint-ultra-condensed/400.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SmoothScroll } from "@/components/SmoothScroll";

const pitagonSansMono = localFont({
  src: "./fonts/PitagonSansMono-Medium.ttf",
  variable: "--font-pitagon-sans-mono",
  weight: "500",
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
      className={`${pitagonSansMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-mono">
        <SmoothScroll />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
