export type Lang = "ru" | "en";

export type Project = {
  title: string;
  year: string;
  href?: string;
  tag: Record<Lang, string>;
};

export const projects: Project[] = [
  {
    title: "Mycar x Samsung",
    year: "2025",
    tag: { ru: "Кампания", en: "Campaign" },
  },
  {
    title: "Logofolio",
    year: "2021 — 2025",
    href: "https://www.behance.net/gallery/235337833/",
    tag: { ru: "Логотипы", en: "Logos" },
  },
  {
    title: "BBS Visual Identity",
    year: "2024",
    href: "https://www.behance.net/gallery/211315577/",
    tag: { ru: "Айдентика", en: "Identity" },
  },
  {
    title: "KARTELL E-commerce",
    year: "2024",
    href: "https://www.behance.net/gallery/196883003/",
    tag: { ru: "Веб-дизайн", en: "Web Design" },
  },
  {
    title: "Agro Logomark",
    year: "2026",
    tag: { ru: "Логотип", en: "Logomark" },
  },
  {
    title: "Mycar Pay Landing",
    year: "2025",
    href: "https://mycarpay.kz/",
    tag: { ru: "Лендинг", en: "Landing" },
  },
];

export const services: Record<Lang, { title: string; desc: string }[]> = {
  ru: [
    { title: "Веб-дизайн", desc: "Понятные и функциональные сайты и лендинги." },
    { title: "Брендинг", desc: "Визуальная идентика и фирменный стиль." },
    { title: "Логотипы", desc: "Логотипы и знаки для брендов." },
    { title: "Дизайн для маркетинга", desc: "Креативы и коммуникация для кампаний." },
  ],
  en: [
    { title: "Web Design", desc: "Clear and functional websites and landings." },
    { title: "Branding", desc: "Visual identity and brand systems." },
    { title: "Logos", desc: "Logotypes and marks for brands." },
    { title: "Marketing Design", desc: "Creatives and communication for campaigns." },
  ],
};

export const socials = [
  { label: "Behance", href: "https://www.behance.net/miratyerbolatov" },
  { label: "Instagram", href: "https://www.instagram.com/yemirades/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mirat-yerbolatov-241906115/" },
  { label: "Telegram", href: "https://t.me/yemirades" },
];

export const email = "m.yerbolatov@mycar.digital";

export const content: Record<
  Lang,
  {
    nav: { about: string; works: string; services: string; contacts: string };
    name: string;
    role: string;
    location: string;
    about: string;
    worksTitle: string;
    servicesTitle: string;
    contactsTitle: string;
    contactsCta: string;
    contactsLead: string;
  }
> = {
  ru: {
    nav: { about: "Обо мне", works: "Проекты", services: "Услуги", contacts: "Контакты" },
    name: "Мират Ерболат",
    role: "Мультидисциплинарный дизайнер",
    location: "Алматы, Казахстан",
    about:
      "Сәлем! Я мультидисциплинарный дизайнер с бэкграундом в маркетинге. Создаю понятные и функциональные сайты и бренд-айдентику. Сейчас работаю в Mycar Group.",
    worksTitle: "Проекты",
    servicesTitle: "Услуги",
    contactsTitle: "Контакты",
    contactsCta: "Написать мне",
    contactsLead: "Есть проект или идея? Давайте обсудим.",
  },
  en: {
    nav: { about: "About", works: "Works", services: "Services", contacts: "Contacts" },
    name: "Mirat Yerbolat",
    role: "Multidisciplinary Designer",
    location: "Almaty, Qazaqstan",
    about:
      "Sälem! I'm a multidisciplinary designer with a marketing background, focused on building clear and functional websites and brand identities. Currently working at Mycar Group.",
    worksTitle: "Works",
    servicesTitle: "Services",
    contactsTitle: "Contacts",
    contactsCta: "Get in touch",
    contactsLead: "Got a project or an idea? Let's talk.",
  },
};
