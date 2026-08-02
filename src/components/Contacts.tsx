"use client";

import type { FormEvent } from "react";
import { useLang } from "@/context/LanguageContext";
import { content, email, socials } from "@/data/content";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";
import { ArrowIcon } from "./ArrowIcon";

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
        className="theme-surface px-4 py-20 sm:px-8 sm:py-28 lg:px-10"
      >
        <div className="mx-auto max-w-[1200px] lg:max-w-none">
          <Reveal>
            <h2 className="font-hero text-[48px] leading-[0.9] sm:text-[72px]">
              {formCopy.title}
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <form
              onSubmit={handleSubmit}
              className="mt-10 grid gap-3 sm:mt-14 sm:gap-4"
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
                    className="min-h-16 w-full rounded-[14px] border-0 bg-[var(--soft)] px-5 text-[18px] outline-none transition-[box-shadow,background-color] placeholder:text-[var(--muted)] focus:shadow-[inset_0_0_0_2px_#ff6135] sm:min-h-20 sm:px-6 sm:text-[22px]"
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
                  className="min-h-52 w-full resize-y rounded-[14px] border-0 bg-[var(--soft)] px-5 py-5 text-[18px] leading-[1.2] outline-none transition-[box-shadow,background-color] placeholder:text-[var(--muted)] focus:shadow-[inset_0_0_0_2px_#ff6135] sm:min-h-64 sm:px-6 sm:py-6 sm:text-[22px]"
                />
              </label>

              <button
                type="submit"
                className="inquiry-submit min-h-16 w-full bg-[var(--soft)] px-5 text-[18px] font-semibold transition-colors hover:bg-[#ff6135] hover:text-black sm:min-h-20 sm:text-[22px]"
              >
                {formCopy.submit}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#ff6135] px-4 py-20 text-black sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-[1200px] lg:max-w-none">
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-0">
            <Reveal>
              <p className="text-[10px]">{t.contactsTitle}</p>
            </Reveal>

            <div className="sm:col-span-2">
              <Reveal>
                <p className="max-w-[760px] font-display text-[58px] leading-[0.86] sm:text-[100px]">
                  {t.contactsLead}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <a
                  href={`mailto:${email}`}
                  className="mt-10 inline-flex items-center gap-1 border-b border-current pb-1 text-[12px] transition-opacity hover:opacity-60"
                >
                  {t.contactsCta}
                  <ArrowIcon className="size-3.5" />
                </a>
              </Reveal>
            </div>
          </div>

          <div className="mt-24 grid gap-8 border-t border-black/45 pt-5 text-[10px] sm:mt-32 sm:grid-cols-3 sm:items-end sm:gap-0">
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
                  <ArrowIcon className="size-3" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 sm:justify-self-end">
              <LiveClock />
              <span>{t.location}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
