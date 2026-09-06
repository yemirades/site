import type { Metadata } from "next";
import { About } from "@/components/About";

export const metadata: Metadata = {
  title: "About me — Mirat Yerbolatov",
  description: "A few personal notes about Mirat Yerbolatov, a designer based in Almaty.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return <About />;
}
