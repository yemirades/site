import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fontsource-variable/stack-sans-headline/wght.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScroll } from "@/components/SmoothScroll";

const giorgioSans = localFont({
  src: "./fonts/GiorgioSansLCG-Heavy.otf",
  display: "swap",
  variable: "--font-giorgio",
  weight: "800",
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
      data-theme="light"
      className={`${giorgioSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-mono">
        <SmoothScroll />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
