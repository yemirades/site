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
          name: "Name",
          email: "Email",
          budget: "Budget",
          message: "Message",
          submit: "Send inquiry",
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
    <section id="contacts" className="bg-[var(--inverse)] px-4 py-20 text-[var(--inverse-ink)] transition-colors duration-300 sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-[1200px] lg:max-w-none">
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-0">
          <Reveal>
            <p className="text-[10px]">{t.contactsTitle}</p>
          </Reveal>

          <div className="sm:col-span-2">
            <Reveal>
              <p className="max-w-[620px] font-display text-[70px] leading-[0.82] tracking-[-0.02em] sm:text-[110px]">
                {t.contactsLead}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={`mailto:${email}`}
                className="mt-10 inline-flex items-center gap-1 border-b border-current pb-1 text-[11px] transition-opacity hover:opacity-60"
              >
                {t.contactsCta}
                <ArrowIcon className="size-3.5" />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-current pt-6 sm:mt-28 sm:grid-cols-3 sm:gap-0">
          <Reveal>
            <h2 className="font-hero text-[34px] leading-[0.9] tracking-[-0.035em] sm:text-[48px]">
              {formCopy.title}
            </h2>
          </Reveal>

          <Reveal className="sm:col-span-2" delay={0.06}>
            <form onSubmit={handleSubmit} className="grid gap-8" noValidate={false}>
              <div className="grid gap-8 sm:grid-cols-3 sm:gap-5">
                {[
                  { name: "name", label: formCopy.name, type: "text" },
                  { name: "email", label: formCopy.email, type: "email" },
                  { name: "budget", label: formCopy.budget, type: "text" },
                ].map((field) => (
                  <label key={field.name} className="grid gap-3 text-[11px]">
                    <span>{field.label}</span>
                    <input
                      required
                      name={field.name}
                      type={field.type}
                      autoComplete={
                        field.name === "name"
                          ? "name"
                          : field.name === "email"
                            ? "email"
                            : "off"
                      }
                      className="min-w-0 border-0 border-b border-current bg-transparent px-0 pb-3 text-[18px] outline-none transition-colors placeholder:text-current/35 focus:border-[#ff6135] sm:text-[22px]"
                    />
                  </label>
                ))}
              </div>

              <label className="grid gap-3 text-[11px]">
                <span>{formCopy.message}</span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="min-h-28 resize-y border-0 border-b border-current bg-transparent px-0 pb-3 text-[18px] leading-[1.2] outline-none transition-colors placeholder:text-current/35 focus:border-[#ff6135] sm:text-[22px]"
                />
              </label>

              <button
                type="submit"
                className="w-fit border-b border-current pb-1 text-[12px] transition-colors hover:text-[#ff6135]"
              >
                {formCopy.submit} ↗
              </button>
            </form>
          </Reveal>
        </div>

        <div className="mt-28 grid gap-8 border-t border-current pt-5 text-[10px] opacity-80 sm:grid-cols-3 sm:items-end sm:gap-0">
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
    </section>
  );
}
