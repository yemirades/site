import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScroll } from "@/components/SmoothScroll";

const pitagonSansMono = localFont({
  src: "./fonts/PitagonSansMono-Medium.ttf",
  display: "swap",
  variable: "--font-pitagon",
  weight: "500",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yemirades.com"),
  title: "Mirat Erbolatūly — Multidisciplinary Designer",
  description:
    "Portfolio of Mirat Erbolatūly — multidisciplinary designer focused on websites and brand identities.",
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={`${pitagonSansMono.variable} h-full antialiased`}>
      <body className="min-h-full font-mono">
        <SmoothScroll />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
