import Link from "next/link";
import { experience } from "@/utils/experience";
import { eduation } from "@/utils/education";
import { skillCategories } from "@/utils/skills";

export const metadata = { title: "About — Rushabh Bhosale" };
export default function About() {
  return (
    <div className="switchyard archive-page section-pad">
      <div className="section-line mono">
        <span>THE PERSON / BEHIND THE WORK</span>
        <span>MUMBAI, INDIA</span>
      </div>
      <div className="editorial-heading">
        <h1>
          A curious mind.
          <br />
          <em>A builder’s instinct.</em>
        </h1>
      </div>
      <div className="about-statement">
        <p>
          I’m Rushabh Bhosale, a software developer building web, mobile, and
          desktop products. I enjoy taking an idea all the way through:
          interface, backend, deployment, and the details that make it useful.
        </p>
        <p>
          My background in media and SEO shapes how I think about software.
          Performance, clear communication, and helping people find what they
          need are part of the same job. I also run AnimeSparks and write about
          what I learn while building.
        </p>
        <Link href="/home#contact" className="text-link">
          LET’S CONNECT ↗
        </Link>
      </div>
      <div className="history-layout">
        <div className="history-intro">
          <h2>
            Professional
            <br />
            <em>route history.</em>
          </h2>
        </div>
        <ol className="history-stops">
          {experience.map((j) => (
            <li key={j.title}>
              <span className="history-dot" />
              <span className="mono">{j.time}</span>
              <h3>{j.title}</h3>
              <span className="history-role">{j.role}</span>
              <p>{j.desc}</p>
            </li>
          ))}
        </ol>
      </div>
      <h2 className="archive-subheading">The tools follow the problem.</h2>
      <div className="archive-list">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <article key={category}>
            <h3>{category}</h3>
            <p>{skills.map((s) => s.name).join(" · ")}</p>
          </article>
        ))}
      </div>
      <h2 className="archive-subheading">Before the code.</h2>
      <div className="archive-list">
        {eduation.map((e) => (
          <article key={e.name}>
            <span className="mono">{e.time}</span>
            <h3>{e.name}</h3>
            <p>{e.sub}</p>
          </article>
        ))}
      </div>
      <a href="/Rushabh%20Resume.pdf" className="text-link resume-link">
        DOWNLOAD RÉSUMÉ ↗
      </a>
    </div>
  );
}
