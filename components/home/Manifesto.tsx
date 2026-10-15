"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Token = string | { pill: "web" | "mobile" | "flow" | "media" } | { em: string };

/* The statement, word by word. Pills are tiny animated pictures of the thing named. */
const TOKENS: Token[] = [
  "I", "build", { pill: "web" }, "web", "platforms,", { pill: "mobile" }, "mobile", "apps", "&",
  { pill: "flow" }, "automations", "that", "quietly", "do", "the", { em: "boring" }, "work.",
  "I", "studied", { pill: "media" }, "media", "—", "so", "I", "care", "how", "things", "read,",
  "rank", "and", "feel,", "not", "just", "how", "they", { em: "run." },
];

function Pill({ kind }: { kind: "web" | "mobile" | "flow" | "media" }) {
  return (
    <span className={`pill pill--${kind}`} aria-hidden="true">
      {kind === "web" && (
        <>
          <span className="pill__bar">
            <i />
            <i />
            <i />
          </span>
          <span className="pill__lines">
            <i />
            <i />
            <i />
          </span>
        </>
      )}
      {kind === "mobile" && (
        <span className="pill__phone">
          <span className="pill__feed">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </span>
      )}
      {kind === "flow" && (
        <svg viewBox="0 0 100 50" className="pill__flow">
          <path d="M18 25 H50 M50 25 C62 25 66 13 82 13 M50 25 C62 25 66 37 82 37" />
          <circle cx="18" cy="25" r="6" />
          <circle cx="50" cy="25" r="6" />
          <circle cx="82" cy="13" r="5" />
          <circle cx="82" cy="37" r="5" />
          <circle className="pill__packet" r="3">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M18 25 H50 C62 25 66 13 82 13" />
          </circle>
        </svg>
      )}
      {kind === "media" && (
        <span className="pill__wave">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} style={{ animationDelay: `${i * -0.13}s` }} />
          ))}
        </span>
      )}
    </span>
  );
}

export default function Manifesto() {
  const text = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = text.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".mw"),
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        el.querySelectorAll(".pill"),
        { scale: 0.2, rotate: -12 },
        {
          scale: 1,
          rotate: 0,
          stagger: 0.4,
          ease: "back.out(2)",
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 50%", scrub: 0.6 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto section" id="approach" aria-labelledby="approach-title">
      <div className="label-row mono">
        <span id="approach-title">(01) Approach</span>
        <span>Web — Mobile — Automation</span>
      </div>
      <p className="manifesto__text" ref={text}>
        {TOKENS.map((t, i) => (
          <Fragment key={i}>
            {typeof t === "string" ? (
              <span className="mw">{t}</span>
            ) : "pill" in t ? (
              <span className="mw mw--pill">
                <Pill kind={t.pill} />
              </span>
            ) : (
              <span className="mw serif">{t.em}</span>
            )}{" "}
          </Fragment>
        ))}
      </p>
    </section>
  );
}
