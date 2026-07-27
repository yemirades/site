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
    size: "w-[118px] sm:w-[156px]",
  },
  {
    name: "Mycar",
    src: "client-mycar.svg",
    width: 136,
    height: 49,
    size: "w-[84px] sm:w-[105px]",
  },
  {
    name: "Astana Motors",
    src: "client-astana-motors.svg",
    width: 144,
    height: 46,
    size: "w-[92px] sm:w-[114px]",
  },
  {
    name: "SDL School",
    src: "client-sdl-school.svg",
    width: 146,
    height: 43,
    size: "w-[98px] sm:w-[122px]",
  },
  {
    name: "Client logo",
    src: "client-round-mark.png",
    width: 79,
    height: 79,
    size: "w-[38px] sm:w-[48px]",
  },
  {
    name: "Mūğalim",
    src: "client-mugalim.svg",
    width: 246,
    height: 57,
    size: "w-[132px] sm:w-[164px]",
  },
  {
    name: "Client symbol",
    src: "client-symbol.svg",
    width: 58,
    height: 57,
    size: "w-[32px] sm:w-[40px]",
  },
];

function LogoSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="clients-logo-set" aria-hidden={duplicate || undefined}>
      {clients.map((client) => (
        <div
          key={client.src}
          className={`flex h-11 shrink-0 items-center justify-center sm:h-[60px] ${client.size}`}
        >
          <Image
            src={`${basePath}/${client.src}`}
            alt={duplicate ? "" : client.name}
            width={client.width}
            height={client.height}
            className="h-auto max-h-11 w-full object-contain sm:max-h-[60px]"
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
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:max-w-none lg:px-6">
        <h2
          id="clients-title"
          className="max-w-[760px] font-display text-[42px] font-normal leading-[0.9] tracking-[-0.03em] sm:text-[64px]"
        >
          {lang === "kk" ? (
            <>
              <span className="block sm:inline">бірге жұмыс істегеніме</span>{" "}
              <span className="block sm:inline">қуаныштымын</span>
            </>
          ) : (
            <>
              <span className="block sm:inline">had a pleasure</span>{" "}
              <span className="block sm:inline">to work with</span>
            </>
          )}
        </h2>
      </div>

      <div className="clients-marquee mt-12 sm:mt-14" aria-label="Client logos">
        <div className="clients-marquee-track">
          <LogoSet />
          <LogoSet duplicate />
        </div>
      </div>
    </section>
  );
}
