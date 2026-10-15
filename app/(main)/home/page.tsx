import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import Manifesto from "@/components/home/Manifesto";
import ProjectStrip from "@/components/site/ProjectStrip";
import { featuredWork, work } from "@/utils/work";
import { experience } from "@/utils/experience";
import { blogPosts } from "../blogs/index";
import { capabilities, formatDate } from "@/utils/content";

export const metadata: Metadata = {
  title: "Rushabh Bhosale — Software Developer | Portfolio",
  description:
    "Portfolio of Rushabh Bhosale. Full-stack software developer in Mumbai building web platforms, mobile apps, and automations with React, Next.js, React Native, TypeScript, and Node.js.",
};

export default function HomePage() {
  const current = experience[0];

  return (
    <>
      <Hero />

      <Ticker
        items={[
          "Open to freelance & full-time roles",
          "Based in Mumbai — working worldwide",
          "Next.js · React Native · Node.js",
          "Currently building at " + current.title,
        ]}
      />

      <Manifesto />

      <section className="work-section section" id="work" aria-labelledby="work-title">
        <div className="label-row mono">
          <span>(02) Selected work</span>
          <span className="strip-hint">Drag or scroll</span>
        </div>
        <div className="section-head">
          <h2 className="section-title" id="work-title" data-lines>
            Selected <span className="serif">work</span>
          </h2>
          <Link href="/work" className="mono u-link section-head__link">
            Full index <span className="arrow">↗</span>
          </Link>
        </div>
        <ProjectStrip items={featuredWork} more={{ label: "All projects", href: "/work", count: work.length }} />
      </section>

      <section className="caps section" aria-labelledby="caps-title">
        <div className="label-row mono">
          <span>(03) Capabilities</span>
          <span>The tools follow the problem</span>
        </div>
        <div className="section-head">
          <h2 className="section-title" id="caps-title" data-lines>
            What I <span className="serif">do</span>
          </h2>
        </div>
        <ol className="caps__list">
          {capabilities.map((c, i) => (
            <li key={c.title} className="caps__row" data-reveal>
              <span className="caps__num mono">0{i + 1}</span>
              <h3 className="caps__title">{c.title}</h3>
              <p className="caps__desc">{c.description}</p>
              <ul className="caps__stack mono">
                {c.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="now section" aria-label="Currently">
        <div className="now__inner" data-reveal>
          <span className="mono dim">(04) Currently</span>
          <p className="now__text">
            {current.role} at <span className="serif">{current.title}</span> — building cross-platform apps with React
            Native, Angular Ionic and the MERN stack. <span className="dim">Since {current.time.split(" – ")[0]}.</span>
          </p>
          <Link href="/about" className="mono u-link">
            More about me <span className="arrow">↗</span>
          </Link>
        </div>
      </section>

      <section className="notes section" aria-labelledby="notes-title">
        <div className="label-row mono">
          <span>(05) Writing</span>
          <span>Notes from the making</span>
        </div>
        <div className="section-head">
          <h2 className="section-title" id="notes-title" data-lines>
            Field <span className="serif">notes</span>
          </h2>
          <Link href="/blogs" className="mono u-link section-head__link">
            All writing <span className="arrow">↗</span>
          </Link>
        </div>
        <ul className="notes__list">
          {blogPosts.slice(0, 3).map((post) => (
            <li key={post.slug} data-reveal>
              <Link href={`/blogs/${post.slug}`} className="note-row">
                <time className="mono dim" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                <span className="note-row__title">{post.title}</span>
                <span className="note-row__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
