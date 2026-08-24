import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Gallery — Mirat Yerbolatov",
  description: "A selection of posters, graphic experiments and visual studies by Mirat Yerbolatov.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return <Gallery />;
}
