import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RiGithubFill } from "react-icons/ri";

export type ProjectItem = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  tech: string;
  techList: string[];
  image: string;
  github?: string;
  live?: string;
  caseStudy?: string;
};

export const featuredProjects: ProjectItem[] = [
  {
    id: "animesparks",
    title: "AnimeSparks",
    tagline: "Editorial platform with Sanity CMS, Next.js, and strong organic SEO.",
    category: "WEB / PUBLISHING",
    tech: "Next.js · Sanity · Tailwind",
    techList: ["Next.js", "Sanity", "Tailwind"],
    image: "/projects/animesparks.png",
    github: "https://github.com/RushabhBhosale/blog",
    live: "https://www.animesparks.blog/",
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    tagline: "Android app that automatically intercepts and parses bank SMS into spending insights.",
    category: "MOBILE / ANDROID",
    tech: "React Native · SMS API · SQLite",
    techList: ["React Native", "Android SMS", "SQLite"],
    image: "/projects/expense-tracking.svg",
    github: "https://github.com/RushabhBhosale/memory",
    caseStudy: "/blogs/expense-tracker-sms-automation",
  },
  {
    id: "clipnote",
    title: "ClipNote",
    tagline: "Lightweight desktop clipboard history manager with instant fuzzy search and snippet pinning.",
    category: "DESKTOP / PRODUCTIVITY",
    tech: "React · TypeScript · Tailwind",
    techList: ["React", "TypeScript", "Tailwind"],
    image: "/projects/blog.png",
    github: "https://github.com/RushabhBhosale/clipnote",
    live: "https://clipnote-rb.vercel.app/",
  },
];

export default function FeaturedProjects() {
  return (
    <section id="work" className="home-work" aria-labelledby="work-heading">
      <div className="home-work-intro">
        <div className="section-line mono"><span>01 / SELECTED WORK</span><span>WEB · MOBILE · DESKTOP</span></div>
        <h2 id="work-heading">Made to be<br /><em>useful.</em></h2>
        <p>A selection of web platforms, mobile apps, and everyday tools I’ve designed and built.</p>
        <Link href="/projects" className="home-text-link">All projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="home-projects">
        {featuredProjects.map((project, index) => (
          <article key={project.id} className="home-project">
            {index === 0 && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-preview" aria-label={`Visit ${project.title}`}>
                <Image src={project.image} alt="AnimeSparks website preview" fill sizes="(max-width: 767px) 90vw, (max-width: 1023px) 55vw, 680px" className="object-cover object-top" />
              </a>
            )}
            <div className="home-project-category"><span>0{index + 1}</span>{project.category}</div>
            <h3>{project.title}</h3>
            <p>{project.tagline}</p>
            <div className="project-technologies">{project.techList.map(tech => <span key={tech}>{tech}</span>)}</div>
            <div className="project-actions">
              {project.caseStudy ? (
                <Link href={project.caseStudy} className="home-text-link">Read the build story <ArrowUpRight size={16} aria-hidden="true" /></Link>
              ) : project.live ? (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="home-text-link">Visit project <ArrowUpRight size={16} aria-hidden="true" /></a>
              ) : null}
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-source" aria-label={`${project.title} source code on GitHub`}><RiGithubFill size={17} aria-hidden="true" /> Source</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
