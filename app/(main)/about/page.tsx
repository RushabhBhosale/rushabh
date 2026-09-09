import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, MapPin } from "lucide-react";
import { experience } from "@/utils/experience";
import { eduation } from "@/utils/education";
import { skillCategories } from "@/utils/skills";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — Rushabh Bhosale",
  description: "Get to know Rushabh Bhosale: software developer based in Mumbai, with experience across web, mobile, desktop, and SEO.",
};

export default function About() {
  return (
    <div className={`switchyard ${styles.page}`}>
      <div className={styles.container}>
        <section className={styles.intro} aria-labelledby="about-heading">
          <div className={styles.sectionLabel}>
            <span>About me / Behind the work</span>
            <span className={styles.location}><MapPin size={13} aria-hidden="true" /> Mumbai, India</span>
          </div>
          <header className={styles.personalHeading}>
            <h1 id="about-heading">A little context<span>.</span></h1>
            <p>The person, the path, and the perspective behind my work.</p>
          </header>
          <div className={styles.biography}>
            <div className={styles.author}>
              <Image src="/me.png" alt="Rushabh Bhosale" width={76} height={76} priority className={styles.authorPhoto} />
              <div><strong>Rushabh Bhosale</strong><span>Software developer</span><span>Mumbai, India</span></div>
            </div>
            <div className={styles.biographyCopy}>
              <p className={styles.lead}>I’m Rushabh. I build web, mobile, and desktop products — and enjoy figuring out how all the pieces fit together.</p>
              <p>I enjoy taking an idea all the way through: interface, backend, deployment, and the details that make it useful.</p>
              <div className={styles.biographyLinks}>
                <Link href="/home#contact" className={styles.textLink}>Let’s connect <ArrowUpRight size={16} aria-hidden="true" /></Link>
                <a href="/Rushabh%20Resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.textLink}><FileText size={15} aria-hidden="true" /> Download résumé <ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.story} aria-labelledby="perspective-heading">
          <div><span className={styles.eyebrow}>01 / Perspective</span><h2 id="perspective-heading">More than<br /><em>the code.</em></h2></div>
          <div className={styles.storyCopy}>
            <p>My background in media and SEO shapes how I think about software. Performance, clear communication, and helping people find what they need are part of the same job.</p>
            <p>I also run AnimeSparks and write about what I learn while building.</p>
            <Link href="/blogs" className={styles.textLink}>Read my writing <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className={styles.experience} aria-labelledby="experience-heading">
          <div className={styles.experienceIntro}>
            <span className={styles.eyebrow}>02 / Experience</span>
            <h2 id="experience-heading">The work<br /><em>along the way.</em></h2>
            <p>From media and search to building software across platforms.</p>
          </div>
          <ol className={styles.timeline}>
            {experience.map((job) => (
              <li key={job.title}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <div className={styles.jobMeta}><span>{job.time}</span>{job.time.includes("Present") && <span className={styles.current}>Current</span>}</div>
                <h3>{job.title}</h3>
                <span className={styles.role}>{job.role}</span>
                <p>{job.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className={styles.backgroundGrid}>
          <section aria-labelledby="skills-heading">
            <span className={styles.eyebrow}>03 / Skills</span>
            <h2 id="skills-heading">The tools follow<br /><em>the problem.</em></h2>
            <div className={styles.skills}>
              {Object.entries(skillCategories).map(([category, skills]) => (
                <div key={category} className={styles.skillCategory}>
                  <h3>{category}</h3>
                  <ul>{skills.map(skill => <li key={skill.name}>{skill.name}</li>)}</ul>
                </div>
              ))}
            </div>
          </section>
          <section aria-labelledby="education-heading">
            <span className={styles.eyebrow}>04 / Education</span>
            <h2 id="education-heading">Before<br /><em>the code.</em></h2>
            <ol className={styles.education}>
              {eduation.map((school) => (
                <li key={school.name}>
                  <span className={styles.schoolDate}>{school.time}</span>
                  <h3>{school.name}</h3>
                  <p>{school.sub}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
