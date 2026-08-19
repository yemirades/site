"use client";

import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { content, email, projects, services, socials, type Project } from "@/data/content";
import { bindShortWords } from "@/lib/typography";
import { LiveClock } from "./LiveClock";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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

const projectCompanies: Record<string, { label: string; image?: string }> = {
  "Mycar Autoservice": { label: "Mycar", image: "client-mycar.svg" },
  "BBS Visual Identity": { label: "BBS" },
  "Kartell E-commerce": { label: "Kartell" },
  "Mycar Pay Landing": { label: "Mycar Pay", image: "client-mycar.svg" },
};

function Controls() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="index-controls" aria-label="Display controls">
      <button type="button" onClick={toggleTheme} aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}><span aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span></button>
      <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
      <button type="button" onClick={() => setLang("kk")} aria-pressed={lang === "kk"}>KZ</button>
    </div>
  );
}

function ProjectMedia({ project, thumb = false }: { project: Project; thumb?: boolean }) {
  const visual = projectVisuals[project.title];
  const className = thumb ? "index-thumb-media" : "index-project-media";
  if (visual?.video) {
    return <video autoPlay muted loop playsInline preload={thumb ? "metadata" : "auto"} poster={`${basePath}/${visual.poster}`} className={className} aria-label={`${project.title} project video`}><source src={`${basePath}/${visual.video}`} type="video/mp4" /></video>;
  }
  return <Image src={`${basePath}/${visual?.image ?? "case-bbs.png"}`} alt={thumb ? "" : `${project.title} project image`} fill sizes={thumb ? "100px" : "(max-width: 720px) 66vw, 64vw"} className={className} />;
}

function ProjectCompanyLogo({ project }: { project: Project }) {
  const company = projectCompanies[project.title] ?? { label: project.title };
  return (
    <div className="index-company-mark" aria-label={company.label}>
      {company.image ? (
        <Image src={`${basePath}/${company.image}`} alt={company.label} width={136} height={49} className="client-logo" />
      ) : (
        <span>{company.label}</span>
      )}
      {project.title === "Mycar Pay Landing" ? <small>Pay</small> : null}
    </div>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  const { lang } = useLang();
  const description = descriptions[lang][project.title as keyof (typeof descriptions)[typeof lang]];
  return (
    <article className="index-project">
      <div className="index-project-thumb"><ProjectCompanyLogo project={project} /></div>
      <div className="index-project-content">
        <div className="index-meta-row">
          <p>{project.title}</p>
          {project.href ? <a href={project.href} target="_blank" rel="noopener noreferrer">{lang === "en" ? "full case" : "tolıq keis"}</a> : <span>{lang === "en" ? "case soon" : "jaqynda"}</span>}
          <p>{project.year}</p>
        </div>
        <p className="index-description">{description}</p>
        <a href={project.href || "#contacts"} target={project.href ? "_blank" : undefined} rel={project.href ? "noopener noreferrer" : undefined} className="index-project-visual"><ProjectMedia project={project} /></a>
      </div>
    </article>
  );
}

function EditorialSections() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <>
      <section className="index-editorial" id="approach"><p className="index-editorial-label">{t.approachTitle}</p><p className="index-editorial-lead">{t.approachText}</p></section>
      <section className="index-editorial" id="services">
        <p className="index-editorial-label">{t.servicesTitle}</p>
        <div className="index-list">{services[lang].map((service, index) => <div className="index-list-row" key={service.title}><span>0{index + 1}</span><p>{service.title}</p><p>{service.desc}</p></div>)}</div>
      </section>
      <section className="index-contact" id="contacts"><div className="index-contact-photo"><Image src={`${basePath}/contact-photo.png`} alt="Mirat Erbolatūly" fill sizes="160px" className="object-cover grayscale" /></div><div><p className="index-contact-lead">{t.contactsLead}</p><a href={`mailto:${email}`}>{t.contactsCta}</a></div></section>
    </>
  );
}

export function PortfolioIndex() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <main className="portfolio-index">
      <aside className="index-profile">
        <div className="index-profile-top"><a href="#top" aria-label="Mirat — home" className="index-logo"><Image src={`${basePath}/hero-logo.gif`} alt="" width={80} height={80} unoptimized priority className="theme-sensitive-mark" /></a><Controls /></div>
        <div className="index-intro" id="top"><p className="index-name">{t.name}</p><p>{bindShortWords(t.about)}</p></div>
        <div className="index-hero-video"><video autoPlay muted loop playsInline preload="auto" className="hero-video" aria-label={lang === "en" ? "Video portrait of Mirat" : "Mirattyñ video-portreti"}><source src={`${basePath}/hero-video.mp4`} type="video/mp4" /></video></div>
        <div className="index-profile-bottom"><nav aria-label="Social links">{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label.toLowerCase()}</a>)}<a href="https://drive.google.com/file/d/1l_eRFFkcoUDwDZu8Ee2tsMENqswY1ls1/view?usp=sharing" target="_blank" rel="noopener noreferrer">cv</a></nav><div className="index-clock"><LiveClock /><span>{t.location}</span></div></div>
      </aside>
      <section className="index-feed" aria-label={lang === "en" ? "Projects" : "Jobalar"}>{projects.map((project) => <ProjectEntry key={project.title} project={project} />)}<EditorialSections /></section>
    </main>
  );
}
