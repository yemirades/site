export type Lang = "kk" | "en";

export type Project = {
  title: string;
  year: string;
  href?: string;
  tag: Record<Lang, string>;
};

export const projects: Project[] = [
  {
    title: "BBS Visual Identity",
    year: "2024",
    href: "https://www.behance.net/gallery/211315577/",
    tag: { kk: "Брендинг", en: "Branding" },
  },
  {
    title: "Kartell E-commerce",
    year: "2024",
    href: "https://www.behance.net/gallery/196883003/",
    tag: { kk: "Веб", en: "Web" },
  },
  {
    title: "Mycar Autoservice",
    year: "2026",
    tag: { kk: "Мобильді", en: "Mobile" },
  },
  {
    title: "Mycar Pay Landing",
    year: "2025",
    href: "https://mycarpay.kz/",
    tag: { kk: "Веб", en: "Web" },
  },
];

export const services: Record<Lang, { title: string; desc: string }[]> = {
  kk: [
    { title: "Веб-дизайн", desc: "Түсінікті әрі функционалды сайттар мен лендингтер." },
    { title: "Брендинг", desc: "Визуалды айдентика және бренд жүйелері." },
    { title: "Логотиптер", desc: "Брендтерге арналған логотиптер мен белгілер." },
    { title: "Маркетингтік дизайн", desc: "Науқандарға арналған креативтер мен коммуникациялар." },
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
    approachTitle: string;
    approachText: string;
  }
> = {
  kk: {
    nav: { about: "Мен туралы", works: "Жобалар", services: "Қызметтер", contacts: "Байланыс" },
    name: "Мират Ерболатұлы",
    role: "Мультидисциплинарлы дизайнер",
    location: "Алматы, Қазақстан",
    about:
      "Сәлем! Мен маркетинг саласында тәжірибесі бар мультидисциплинарлы дизайнермін. Түсінікті әрі функционалды сайттар мен бренд айдентикасын жасаймын. Қазір Mycar Group-та жұмыс істеймін.",
    worksTitle: "Жобалар",
    servicesTitle: "Қалай көмектесе аламын?",
    contactsTitle: "Байланыс",
    contactsCta: "Хабарласу",
    contactsLead: "Жобаңыз немесе идеяңыз бар ма? Талқылайық.",
    approachTitle: "Тәсіл",
    approachText:
      "Мен жұмысты айқындықтан бастаймын: алдымен контексті түсініп, пайдаланушы мен бизнес мақсаттарын сәйкестендіремін, содан кейін күрделі нәрсені түсінікті, пайдалы әрі мәнерлі өнімге айналдырамын.",
  },
  en: {
    nav: { about: "About", works: "Works", services: "Services", contacts: "Contacts" },
    name: "Mirat Yerbolatuly",
    role: "Multidisciplinary Designer",
    location: "Almaty, Qazaqstan",
    about:
      "Sälem! I’m a product designer with a background in communication design. Currently working at Mycar Group.",
    worksTitle: "Works",
    servicesTitle: "How can I be helpful?",
    contactsTitle: "Contacts",
    contactsCta: "Get in touch",
    contactsLead: "Got a project or an idea? Let's talk.",
    approachTitle: "Approach",
    approachText:
      "I work from clarity to craft: first I understand the context, align user and business goals, then turn complexity into a focused, useful and expressive product.",
  },
};
