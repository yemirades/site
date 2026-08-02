"use client";

import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { bindShortWords } from "@/lib/typography";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const clients = [
  {
    name: "Mycar",
    src: "client-mycar.svg",
    width: 136,
    height: 49,
    size: "w-[82px] sm:w-[100px] lg:w-[124px]",
  },
  {
    name: "Astana Motors",
    src: "client-astana-motors.svg",
    width: 144,
    height: 46,
    size: "w-[94px] sm:w-[116px] lg:w-[142px]",
  },
  {
    name: "BI Group",
    src: "client-bi-group.svg",
    width: 200,
    height: 51,
    size: "w-[112px] sm:w-[136px] lg:w-[156px]",
  },
  {
    name: "Client logo",
    src: "client-round-mark.png",
    width: 79,
    height: 79,
    size: "w-[42px] sm:w-[50px] lg:w-[62px]",
  },
  {
    name: "Daryn Online",
    src: "client-daryn-online.svg",
    width: 160,
    height: 54,
    size: "w-[112px] sm:w-[142px] lg:w-[170px]",
  },
  {
    name: "Mūğalim",
    src: "client-mugalim.svg",
    width: 246,
    height: 57,
    size: "w-[116px] sm:w-[144px] lg:w-[174px]",
  },
  {
    name: "SDL School",
    src: "client-sdl-school.svg",
    width: 146,
    height: 43,
    size: "w-[96px] sm:w-[116px] lg:w-[138px]",
  },
  {
    name: "Client symbol",
    src: "client-symbol.svg",
    width: 58,
    height: 57,
    size: "w-[32px] sm:w-[42px] lg:w-[54px]",
  },
];

function CornerMarks() {
  const cornerClass = "absolute size-3 border-[var(--line)]";

  return (
    <>
      <span
        aria-hidden="true"
        className={`${cornerClass} left-0 top-0 border-l border-t`}
      />
      <span
        aria-hidden="true"
        className={`${cornerClass} right-0 top-0 border-r border-t`}
      />
      <span
        aria-hidden="true"
        className={`${cornerClass} bottom-0 left-0 border-b border-l`}
      />
      <span
        aria-hidden="true"
        className={`${cornerClass} bottom-0 right-0 border-b border-r`}
      />
    </>
  );
}

export function Clients() {
  const { lang } = useLang();

  return (
    <section
      aria-labelledby="clients-title"
      className="theme-surface overflow-hidden px-3 py-16 sm:px-8 sm:py-20 lg:px-10"
    >
      <div className="mx-auto max-w-[1200px] lg:w-[90%] lg:max-w-[1600px]">
        <h2
          id="clients-title"
          className="max-w-[760px] font-display text-[42px] font-normal leading-[0.9] tracking-[-0.03em] sm:text-[64px]"
        >
          {lang === "kk" ? (
            <>
              <span className="block sm:inline">{bindShortWords("бірге жұмыс істегеніме")}</span>{" "}
              <span className="block sm:inline">қуаныштымын</span>
            </>
          ) : (
            <>
              <span className="block sm:inline">{bindShortWords("had a pleasure")}</span>{" "}
              <span className="block sm:inline">{bindShortWords("to work with")}</span>
            </>
          )}
        </h2>

        <div
          className="mt-12 grid grid-cols-2 sm:mt-14 lg:grid-cols-4"
          aria-label="Client logos"
        >
          {clients.map((client) => (
            <div
              key={client.src}
              className="relative flex h-[132px] items-center justify-center sm:h-[168px] lg:h-[220px]"
            >
              <CornerMarks />
              <div className={client.size}>
                <Image
                  src={`${basePath}/${client.src}`}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className="client-logo h-auto w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
