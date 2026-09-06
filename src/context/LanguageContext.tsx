"use client";

import { createContext, useContext } from "react";
import type { Lang } from "@/data/content";

type Ctx = { lang: Lang };

const LanguageContext = createContext<Ctx>({ lang: "en" });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{ lang: "en" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
