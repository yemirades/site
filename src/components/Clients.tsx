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
    size: "w-[110px] sm:w-[132px]",
  },
  {
    name: "Mycar",
    src: "client-mycar.svg",
    width: 136,
    height: 49,
    size: "w-[78px] sm:w-[96px]",
  },
  {
    name: "Astana Motors",
    src: "client-astana-motors.svg",
    width: 144,
    height: 46,
    size: "w-[86px] sm:w-[108px]",
  },
  {
    name: "SDL School",
    src: "client-sdl-school.svg",
    width: 146,
    height: 43,
    size: "w-[92px] sm:w-[112px]",
  },
  {
    name: "Client logo",
    src: "client-round-mark.png",
    width: 79,
    height: 79,
    size: "w-[36px] sm:w-[44px]",
  },
  {
    name: "Mūğalim",
    src: "client-mugalim.svg",
    width: 246,
    height: 57,
    size: "w-[116px] sm:w-[146px]",
  },
  {
    name: "Client symbol",
    src: "client-symbol.svg",
    width: 58,
    height: 57,
    size: "w-[30px] sm:w-[38px]",
  },
];

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

      <div
        className="mx-auto mt-12 grid max-w-[1200px] grid-cols-2 gap-3 px-3 sm:mt-14 sm:px-8 lg:grid-cols-4 lg:gap-5 lg:px-6"
        aria-label="Client logos"
      >
        {clients.map((client) => (
          <div
            key={client.src}
            className="flex h-[104px] items-center justify-center bg-[#101010] sm:h-[132px]"
          >
            <div className={client.size}>
              <Image
                src={`${basePath}/${client.src}`}
                alt={client.name}
                width={client.width}
                height={client.height}
                className="h-auto max-h-11 w-full object-contain sm:max-h-[52px]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
