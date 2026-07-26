"use client";

import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const clients = [
  {
    name: "BI Group",
    src: "client-bi-group.svg",
    width: 200,
    height: 51,
  },
  {
    name: "Mycar",
    src: "client-mycar.svg",
    width: 136,
    height: 49,
  },
  {
    name: "Astana Motors",
    src: "client-astana-motors.svg",
    width: 144,
    height: 46,
  },
  {
    name: "SDL School",
    src: "client-sdl-school.svg",
    width: 146,
    height: 43,
  },
  {
    name: "Client logo",
    src: "client-round-mark.png",
    width: 79,
    height: 79,
  },
  {
    name: "Mūğalim",
    src: "client-mugalim.svg",
    width: 246,
    height: 57,
  },
  {
    name: "Client symbol",
    src: "client-symbol.svg",
    width: 58,
    height: 57,
  },
];

function LogoSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="clients-logo-set" aria-hidden={duplicate || undefined}>
      {clients.map((client) => (
        <div
          key={client.src}
          className="flex shrink-0 items-center justify-center"
          style={{ width: client.width, height: 79 }}
        >
          <Image
            src={`${basePath}/${client.src}`}
            alt={duplicate ? "" : client.name}
            width={client.width}
            height={client.height}
            className="h-auto max-h-[79px] w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function Clients() {
  const { lang } = useLang();

  return (
    <section
      aria-labelledby="clients-title"
      className="theme-surface overflow-hidden py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        <h2
          id="clients-title"
          className="max-w-[760px] text-[34px] font-medium leading-[0.9] tracking-[-0.03em] sm:text-[50px]"
        >
          {lang === "kk"
            ? "бірге жұмыс істегеніме қуаныштымын"
            : "had a pleasure to work with"}
        </h2>
      </div>

      <div className="clients-marquee mt-8" aria-label="Client logos">
        <div className="clients-marquee-track">
          <LogoSet />
          <LogoSet duplicate />
        </div>
      </div>
    </section>
  );
}
