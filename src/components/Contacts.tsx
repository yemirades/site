"use client";

import type { FormEvent } from "react";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { content, email, socials } from "@/data/content";
import { bindShortWords } from "@/lib/typography";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";

export function Contacts() {
  const { lang } = useLang();
  const t = content[lang];
  const formCopy =
    lang === "en"
      ? {
          title: "Project inquiry",
          name: "Full name",
          email: "Your e-mail",
          budget: "Budget",
          message: "Your message",
          submit: "Submit",
          subject: "New project inquiry from the portfolio",
        }
      : {
          title: "Жобаға өтінім",
          name: "Аты-жөніңіз",
          email: "Пошта",
          budget: "Бюджет",
          message: "Хабарлама",
          submit: "Өтінімді жіберу",
          subject: "Портфолиодан жаңа жобаға өтінім",
        };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `${formCopy.name}: ${data.get("name") ?? ""}`,
      `${formCopy.email}: ${data.get("email") ?? ""}`,
      `${formCopy.budget}: ${data.get("budget") ?? ""}`,
      "",
      `${formCopy.message}:`,
      `${data.get("message") ?? ""}`,
    ].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      formCopy.subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <section
        id="contacts"
        className="theme-surface px-4 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10"
      >
        <div className="mx-auto grid max-w-[1200px] gap-10 sm:grid-cols-3 sm:gap-6 lg:max-w-none">
          <Reveal className="sm:col-span-1 sm:self-start">
            <h2 className="font-hero text-[38px] leading-[0.92] sm:text-[46px]">
              {bindShortWords(formCopy.title)}
            </h2>
          </Reveal>

          <Reveal className="sm:col-span-2" delay={0.06}>
            <form
              onSubmit={handleSubmit}
              className="grid gap-3"
              noValidate={false}
            >
              {[
                { name: "name", label: formCopy.name, type: "text" },
                { name: "email", label: formCopy.email, type: "email" },
                { name: "budget", label: formCopy.budget, type: "text" },
              ].map((field) => (
                <label key={field.name}>
                  <span className="sr-only">{field.label}</span>
                  <input
                    required
                    name={field.name}
                    type={field.type}
                    placeholder={field.label}
                    autoComplete={
                      field.name === "name"
                        ? "name"
                        : field.name === "email"
                          ? "email"
                          : "off"
                    }
                    className="min-h-14 w-full rounded-[14px] border-0 bg-[var(--soft)] px-5 text-[16px] outline-none transition-[box-shadow,background-color] placeholder:text-[var(--muted)] focus:shadow-[inset_0_0_0_2px_#8ce02b] sm:min-h-16 sm:text-[18px]"
                  />
                </label>
              ))}

              <label>
                <span className="sr-only">{formCopy.message}</span>
                <textarea
                  required
                  name="message"
                  rows={6}
                  placeholder={formCopy.message}
                  className="min-h-40 w-full resize-y rounded-[14px] border-0 bg-[var(--soft)] px-5 py-5 text-[16px] leading-[1.2] outline-none transition-[box-shadow,background-color] placeholder:text-[var(--muted)] focus:shadow-[inset_0_0_0_2px_#8ce02b] sm:min-h-48 sm:text-[18px]"
                />
              </label>

              <button
                type="submit"
                className="inquiry-submit min-h-14 w-full bg-[var(--ink)] px-5 text-[16px] font-semibold text-[var(--page)] transition-colors hover:bg-[#8ce02b] hover:text-black sm:min-h-16 sm:text-[18px]"
              >
                {formCopy.submit}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#8ce02b] px-4 py-12 text-black sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-[1200px] lg:max-w-none">
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-0">
            <Reveal className="flex flex-col items-start gap-8">
              <p className="text-[10px]">{bindShortWords(t.contactsTitle)}</p>
              <div className="relative aspect-square w-[132px] overflow-hidden sm:mt-auto sm:w-[160px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/contact-photo.png`}
                  alt="Mirat Erbolatūly"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="sm:col-span-2">
              <Reveal>
                <p className="max-w-[760px] font-display text-[48px] leading-[0.88] sm:text-[76px]">
                  {bindShortWords(t.contactsLead)}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <a
                  href={`mailto:${email}`}
                  className="mt-8 inline-flex min-h-11 items-center bg-black px-5 text-[12px] font-semibold text-[#8ce02b] transition-colors hover:bg-white hover:text-black"
                >
                  {bindShortWords(t.contactsCta)}
                </a>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 grid gap-8 border-t border-black/35 pt-5 text-[10px] sm:mt-20 sm:grid-cols-3 sm:items-end sm:gap-0">
            <div className="flex flex-wrap gap-x-5 gap-y-2 sm:col-span-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-opacity hover:opacity-55"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 sm:justify-self-end">
              <LiveClock />
              <span>{bindShortWords(t.location)}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
