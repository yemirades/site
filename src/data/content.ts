export type Lang = "kk" | "en";

export type Project = {
  title: string;
  year: string;
  href?: string;
  tag: Record<Lang, string>;
};

export const projects: Project[] = [
  {
    title: "Mycar Autoservice",
    year: "2026",
    tag: { kk: "Mobıldi", en: "Mobile" },
  },
  {
    title: "BBS Visual Identity",
    year: "2024",
    href: "https://www.behance.net/gallery/211315577/BBS-Visual-Identity",
    tag: { kk: "Brendiñ", en: "Branding" },
  },
  {
    title: "Kartell E-commerce",
    year: "2024",
    href: "https://www.behance.net/gallery/196883003/KARTELL-E-commerce-redesign",
    tag: { kk: "Web", en: "Web" },
  },
  {
    title: "Mycar Pay Landing",
    year: "2025",
    href: "https://mycarpay.kz/",
    tag: { kk: "Web", en: "Web" },
  },
];

export const services: Record<Lang, { title: string; desc: string }[]> = {
  kk: [
    { title: "Web Design", desc: "Tüsınıktı äri funktsionaldy saittar men landiñter." },
    { title: "Brendiñ", desc: "Vizualdy aıdentika jäne brend jüieleri." },
    { title: "Logotipter", desc: "Brendterge arnalğan logotipter men belgiler." },
    { title: "Marketingtik Design", desc: "Nauqandarğa arnalğan kreatiivter men kommunikatsiialar." },
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
    nav: { about: "Men turaly", works: "Jobalar", services: "Qyzmetter", contacts: "Bailanys" },
    name: "Mirat Erbolatūly",
    role: "Multidistsiplinarly dizainer",
    location: "Almaty, Qazaqstan",
    about:
      "Sälem! Men önim dizainerimin, grafikalyq dizain täjiribem bar. Qazir Mycar Group-ta jūmys isteimin.",
    worksTitle: "Jobalar",
    servicesTitle: "Qyzmetter",
    contactsTitle: "Bailanys",
    contactsCta: "Habarlasu",
    contactsLead: "Jobañyzdy talqylap, birge kofe isheik pe? Kettik!",
    approachTitle: "Täsil",
    approachText:
      "Men jūmysty aıqyndyqtan bastaimyn: aldımen kontekstı tüsınıp, paidalanushy men biznes maqsattaryn säıkestendıremin, sodan keıin kürdelı närsenı tüsınıktı, paidaly äri mänerlı önimge aynaldyramyn.",
  },
  en: {
    nav: { about: "About", works: "Works", services: "Services", contacts: "Contacts" },
    name: "Mirat Erbolatūly",
    role: "Multidisciplinary Designer",
    location: "Almaty, Qazaqstan",
    about:
      "Sälem! I’m a product designer with a background in graphic design. Currently working at Mycar Group.",
    worksTitle: "Works",
    servicesTitle: "Services",
    contactsTitle: "Contacts",
    contactsCta: "Get in touch",
    contactsLead: "Want to discuss your project or have a coffee? Let’s gooo!",
    approachTitle: "Approach",
    approachText:
      "I believe great design balances clear logic with strong visual expression, creating experiences that are intuitive, purposeful, and visually engaging.",
  },
};
