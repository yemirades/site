"use client";

import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { content, email, projects, socials, type Project } from "@/data/content";
import { LiveClock } from "./LiveClock";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const releaseLabel = "23.08.2026 · 19:31";

const projectVisuals: Record<string, { image?: string; video?: string; poster?: string }> = {
  "Mycar Autoservice": { image: "case-mycar-autoservice.png" },
  "BBS Visual Identity": { video: "case-bbs.mp4", poster: "case-bbs.png" },
  "Kartell E-commerce": { image: "case-kartell.png" },
  "Mycar Pay Landing": { image: "case-mycar-pay.jpg" },
};

const descriptions = {
  en: {
    "Mycar Autoservice": "A mobile service experience designed around fast booking, clear status updates and confident everyday car care.",
    "BBS Visual Identity": "A visual identity built as a precise modular system for a contemporary business platform.",
    "Kartell E-commerce": "An e-commerce redesign focused on product clarity, editorial rhythm and effortless discovery.",
    "Mycar Pay Landing": "A landing page that translates a complex payment product into a clear and trustworthy digital story.",
  },
  kk: {
    "Mycar Autoservice": "Jıldam jazylu, tüsınıktı märtebe jäne senımdı kölık kütımine qurylğan mobıldi servis täjirıbesı.",
    "BBS Visual Identity": "Zamanaūi biznes platformağa arnalğan däl jäne moduldık vizualdy jüie.",
    "Kartell E-commerce": "Önım aıqyndyğyna, redaktsıialyq ritmge jäne oñai tañdauğa bağıttalğan e-commerce redizain.",
    "Mycar Pay Landing": "Kürdelı tölem önımın tüsınıktı jäne senımdı tsifrly oqiğağa aynaldyratyn landiñ.",
  },
} as const;

function Controls() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="index-controls" aria-label="Display controls">
      <button
        className="index-theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        aria-pressed={theme === "dark"}
      >
        <span className="index-theme-thumb" aria-hidden="true" />
        <span className="index-theme-symbol" aria-hidden="true">
          <Image src={`${basePath}/${theme === "dark" ? "light.svg" : "dark.svg"}`} alt="" width={18} height={18} />
        </span>
      </button>
      <button
        className="index-language-toggle"
        type="button"
        onClick={() => setLang(lang === "en" ? "kk" : "en")}
        aria-label={lang === "en" ? "Qazaqşa nusqağa auysu" : "Switch to English"}
      >
        {lang === "en" ? "KZ" : "EN"}
      </button>
    </div>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const visual = projectVisuals[project.title];
  if (visual?.video) {
    return <video autoPlay muted loop playsInline preload="auto" poster={`${basePath}/${visual.poster}`} className="index-project-media" aria-label={`${project.title} project video`}><source src={`${basePath}/${visual.video}`} type="video/mp4" /></video>;
  }
  return <Image src={`${basePath}/${visual?.image ?? "case-bbs.png"}`} alt={`${project.title} project image`} fill sizes="(max-width: 720px) 100vw, 60vw" className="index-project-media" />;
}

function ProjectEntry({ project }: { project: Project }) {
  const { lang } = useLang();
  const description = descriptions[lang][project.title as keyof (typeof descriptions)[typeof lang]];
  return (
    <article className="index-project">
      <div className="index-project-content">
        <a href={project.href || "#contacts"} target={project.href ? "_blank" : undefined} rel={project.href ? "noopener noreferrer" : undefined} className="index-project-visual"><ProjectMedia project={project} /></a>
        <div className="index-meta-row">
          <p>{project.title}</p>
          {project.href ? <a href={project.href} target="_blank" rel="noopener noreferrer">{lang === "en" ? "full case" : "tolıq keis"}</a> : <span>{lang === "en" ? "case soon" : "jaqynda"}</span>}
          <p>{project.year}</p>
        </div>
        <p className="index-description">{description}</p>
      </div>
    </article>
  );
}

function EditorialSections() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <>
      <section className="index-editorial" id="about"><p className="index-editorial-lead">{t.approachText}</p></section>
      <section className="index-contact" id="contacts"><div className="index-contact-photo"><Image src={`${basePath}/contact-photo.png`} alt="Mirat Yerbolatov" fill sizes="160px" className="object-cover grayscale" /></div><div><p className="index-contact-lead">{t.contactsLead}</p><a href={`mailto:${email}`}>{t.contactsCta}</a></div></section>
    </>
  );
}

export function PortfolioIndex() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <main className="portfolio-index">
      <aside className="index-profile">
        <div className="index-profile-top"><Controls /></div>
        <nav className="index-social-nav" aria-label="Social links">{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label.toLowerCase()}</a>)}<a href="https://drive.google.com/file/d/1l_eRFFkcoUDwDZu8Ee2tsMENqswY1ls1/view?usp=sharing" target="_blank" rel="noopener noreferrer">cv</a></nav>
        <div className="index-intro" id="top"><p className="index-name"><span>Mirat</span><span>Yerbolatov</span></p><p className="index-bio">{lang === "en" ? <><span>Sälem! I’m a product designer</span><span>with a background in graphic design.</span><span>Currently working at Mycar Group.</span></> : <><span>Sälem! Men önim dizainerimin,</span><span>grafikalyq dizain täjiribem bar.</span><span>Qazir Mycar Group-ta jūmys isteimin.</span></>}</p></div>
        <div className="index-hero-video"><video autoPlay muted loop playsInline preload="auto" className="hero-video" aria-label={lang === "en" ? "Video portrait of Mirat" : "Mirattyñ video-portreti"}><source src={`${basePath}/hero-video.mp4`} type="video/mp4" /></video></div>
        <div className="index-clock"><LiveClock /><span>{t.location}</span></div>
      </aside>
      <nav className="index-rail" aria-label={lang === "en" ? "Portfolio sections" : "Portfolio bölimderi"}>
        <a href="#cases" className="index-rail-logo" aria-label={lang === "en" ? "Cases" : "Keister"}><Image src={`${basePath}/hero-logo.gif`} alt="" width={80} height={80} unoptimized priority className="theme-sensitive-mark" /></a>
        <div className="index-rail-links"><a href="#cases">cases</a><a href="#cases">gallery</a><a href="#about">about me</a></div>
        <time className="index-rail-release" dateTime="2026-08-23T19:31:00+05:00">release {releaseLabel}</time>
      </nav>
      <section className="index-feed" id="cases" aria-label={lang === "en" ? "Projects" : "Jobalar"}>{projects.map((project) => <ProjectEntry key={project.title} project={project} />)}<EditorialSections /></section>
    </main>
  );
}
