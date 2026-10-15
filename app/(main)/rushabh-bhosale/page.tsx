import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rushabh Bhosale | Software Developer",
  description:
    "Rushabh Bhosale is a software developer specializing in React, Next.js, TypeScript, and full stack web development. Explore projects, experience, and ways to connect.",
};

const routes = [
  { label: "Work", note: "Projects and case studies", href: "/work" },
  { label: "About", note: "Background and experience", href: "/about" },
  { label: "Writing", note: "Build stories and fixes", href: "/blogs" },
  { label: "Contact", note: "Email and social links", href: "/contact" },
];

export default function RushabhBhosalePage() {
  return (
    <div className="page">
      <header className="page-hero section">
        <div className="page-hero__meta mono">
          <span>(Hello)</span>
          <span className="dim">Software developer — Mumbai</span>
          <span>rushabh.in</span>
        </div>
        <h1 className="page-hero__title display" data-lines>
          Rushabh Bhosale
        </h1>
        <div className="seo-copy">
          <p data-reveal>
            Rushabh Bhosale is a software developer specializing in React, Next.js, TypeScript, and full stack web
            development. This site is my portfolio, where I share projects, experience, and writing.
          </p>
          <p data-reveal>
            Key skills include React, Next.js (App Router), JavaScript, TypeScript, Tailwind CSS, Node.js, Express,
            MongoDB, REST APIs, React Native, and SEO-friendly web architecture.
          </p>
          <p data-reveal>
            Featured work includes AnimeSparks, an editorial blog built with Next.js and Sanity. If you’re here from
            AnimeSparks,{" "}
            <a href="https://www.animesparks.blog" className="u-link">
              head back to it here
            </a>
            .
          </p>
        </div>
      </header>
      <section className="section">
        <ul className="channels">
          {routes.map((r, i) => (
            <li key={r.href} data-reveal>
              <Link href={r.href} className="channel">
                <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
                <span className="channel__label">{r.label}</span>
                <span className="channel__value mono">{r.note}</span>
                <span className="channel__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
