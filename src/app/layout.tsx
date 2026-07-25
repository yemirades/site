import type { Metadata } from "next";
import "@fontsource-variable/stack-sans-headline/wght.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SmoothScroll } from "@/components/SmoothScroll";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-mono">
        <SmoothScroll />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
