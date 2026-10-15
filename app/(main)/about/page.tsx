import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { experience } from "@/utils/experience";
import { eduation } from "@/utils/education";
import { skillCategories } from "@/utils/skills";
import { RESUME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Rushabh Bhosale",
  description:
    "Rushabh Bhosale is a software developer in Mumbai with a background in media and SEO, building across web, mobile, and desktop.",
};

export default function About() {
  return (
    <div className="page about">
      <header className="page-hero section">
        <div className="page-hero__meta mono">
          <span>(About)</span>
          <span className="dim">The person behind the index</span>
          <span>Mumbai, IN</span>
        </div>
        <h1 className="about__statement" data-lines>
          I’m Rushabh — a developer from Mumbai who studied media, then fell for <span className="serif">making things</span>{" "}
          that actually work.
        </h1>
      </header>

      <section className="about-bio section">
        <figure className="about-bio__portrait" data-reveal>
          <span className="about-bio__frame">
            <span className="about-bio__img" data-parallax="-8">
              <Image src="/me.png" alt="Portrait of Rushabh Bhosale" fill sizes="(max-width: 800px) 90vw, 40vw" priority />
            </span>
          </span>
          <figcaption className="mono dim">Rushabh Bhosale — Software developer</figcaption>
        </figure>
        <div className="about-bio__copy">
          <p className="about-bio__lead" data-reveal>
            I build web, mobile, and desktop products — and enjoy figuring out how all the pieces fit together.
          </p>
          <p data-reveal>
            I like taking an idea all the way through: interface, backend, deployment, and the details that make it
            useful. My background in media and SEO shapes how I think about software — performance, clear communication,
            and helping people find what they need are part of the same job.
          </p>
          <p data-reveal>
            Outside my day job I run <a href="https://www.animesparks.blog/" target="_blank" rel="noopener noreferrer" className="u-link">AnimeSparks</a>{" "}
            and write about what I learn while building.
          </p>
          <div className="about-bio__links mono" data-reveal>
            <Link href="/contact" className="u-link">
              Get in touch <span className="arrow">↗</span>
            </Link>
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="u-link">
              Résumé (PDF) <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="about-block section" aria-labelledby="exp-title">
        <div className="label-row mono">
          <span>(01) Experience</span>
          <span>From media and search to software</span>
        </div>
        <h2 className="section-title" id="exp-title" data-lines>
          The <span className="serif">road</span> so far
        </h2>
        <ol className="xp">
          {experience.map((job) => (
            <li key={job.title} className="xp__row" data-reveal>
              <span className="xp__time mono">{job.time}</span>
              <span className="xp__company">
                {job.title}
                {job.time.includes("Present") && <span className="xp__now mono"><span className="signal-dot" /> Now</span>}
              </span>
              <span className="xp__role">{job.role}</span>
              <span className="xp__desc dim">{job.desc}</span>
              <span className="xp__rule" data-draw aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section className="about-block section" aria-labelledby="skills-title">
        <div className="label-row mono">
          <span>(02) Toolkit</span>
          <span>The tools follow the problem</span>
        </div>
        <h2 className="section-title" id="skills-title" data-lines>
          Tool<span className="serif">kit</span>
        </h2>
        <div className="kit">
          {Object.entries(skillCategories).map(([cat, skills]) => (
            <div key={cat} className="kit__col" data-reveal>
              <h3 className="mono dim">{cat}</h3>
              <ul>
                {skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="kit__col" data-reveal>
            <h3 className="mono dim">Also</h3>
            <ul>
              {["Technical SEO", "n8n automation", "Sanity CMS", "Git & GitHub"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-block section" aria-labelledby="edu-title">
        <div className="label-row mono">
          <span>(03) Education</span>
          <span>Before the code</span>
        </div>
        <ol className="xp xp--edu">
          {eduation.map((e) => (
            <li key={e.name} className="xp__row" data-reveal>
              <span className="xp__time mono">{e.time}</span>
              <span className="xp__company">{e.name}</span>
              <span className="xp__role">{e.sub}</span>
              <span className="xp__rule" data-draw aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
