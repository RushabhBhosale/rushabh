"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RouteWorld from "./RouteWorld";
import ProductSurface from "./ProductSurface";
import { stations } from "@/utils/switchyard";

export default function Journey() {
  const root = useRef<HTMLDivElement>(null);
  const work = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 801px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)",
      () => {
        const element = root.current!;
        element.dataset.motion = "full";
        setEnhanced(true);
        const ctx = gsap.context(() => {
          const intro = gsap.timeline({
            scrollTrigger: {
              trigger: ".entry",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.65,
            },
          });
          intro
            .to(
              ".hero-first",
              { xPercent: -16, scale: 1.45, opacity: 0, duration: 0.36 },
              0,
            )
            .to(
              ".hero-last",
              { xPercent: 25, scale: 0.55, opacity: 0, duration: 0.4 },
              0,
            )
            .to(".hero-description", { y: -30, opacity: 0, duration: 0.2 }, 0)
            .fromTo(
              ".travel-statement",
              { autoAlpha: 0, z: -300, y: 70 },
              { autoAlpha: 1, z: 0, y: 0, duration: 0.28 },
              0.26,
            )
            .to(
              ".travel-statement",
              { autoAlpha: 0, scale: 1.12, duration: 0.16 },
              0.86,
            )
            .to(
              ".route-handoff",
              { scaleX: 1, opacity: 1, duration: 0.25 },
              0.75,
            );
          element.querySelectorAll(".travel-verbs span").forEach((verb, i) => {
            const at = 0.3 + i * 0.1;
            intro
              .fromTo(
                verb,
                { autoAlpha: 0, z: -200, x: 150 },
                { autoAlpha: 1, z: 0, x: 0, duration: 0.045 },
                at,
              )
              .to(
                verb,
                { autoAlpha: 0, z: 160, x: -100, duration: 0.04 },
                at + 0.06,
              );
          });
          trigger.current = ScrollTrigger.create({
            trigger: work.current,
            start: "top 74px",
            end: "bottom bottom",
            onUpdate: (self) =>
              setActive(
                Math.min(
                  stations.length - 1,
                  Math.floor(self.progress * stations.length),
                ),
              ),
          });
        }, root);
        ScrollTrigger.refresh();
        return () => {
          ctx.revert();
          trigger.current = null;
          delete element.dataset.motion;
          setEnhanced(false);
        };
      },
    );
    return () => media.revert();
  }, []);
  useEffect(() => {
    if (!enhanced || !root.current) return;
    const panel = root.current.querySelector(`[data-station="${active}"]`);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel?.querySelector(".product-surface") ?? null,
        { clipPath: "inset(0 46% 0 46%)", rotateY: -12, scale: 0.94 },
        {
          clipPath: "inset(0 0% 0 0%)",
          rotateY: 0,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "transform,clipPath",
        },
      );
      gsap.fromTo(
        panel?.querySelectorAll(".project-copy > *") ?? [],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.055, clearProps: "all" },
      );
    }, root);
    return () => ctx.revert();
  }, [active, enhanced]);
  const select = (index: number) => {
    const t = trigger.current;
    if (t)
      window.scrollTo({
        top: t.start + ((t.end - t.start) * (index + 0.22)) / stations.length,
        behavior: "instant",
      });
    else
      document
        .getElementById(stations[index].id)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
  };
  return (
    <div className="journey" ref={root}>
      <div className="spatial-chapters">
        <div className="world-layer">
          <div className="world-fallback" />
          <RouteWorld />
        </div>
        <section className="entry" aria-labelledby="identity">
          <div className="entry-stage">
            <div className="entry-coordinate mono">
              <span>
                <i className="signal" /> INDEPENDENT MIND. CONNECTED WORK.
              </span>
              <span>PORTFOLIO / 2026</span>
            </div>
            <h1 id="identity" className="hero-name">
              <span className="hero-first">RUSHABH</span>
              <span className="hero-last">
                BHOSALE
                <span className="name-dot" aria-hidden="true">
                  ✳
                </span>
              </span>
            </h1>
            <div className="hero-description">
              <span className="mono">
                SOFTWARE DEVELOPER
                <br />
                MUMBAI, INDIA · 19.07° N
              </span>
              <p>
                I move ideas into
                <br />
                <em>things people use.</em>
              </p>
              <span className="hero-platforms">
                Web. Mobile. Desktop.
                <br />
                Different routes. Same instinct.
              </span>
            </div>
            <div className="travel-statement">
              <span className="mono">01 / ENTER THE SYSTEM</span>
              <h2>
                Curiosity is
                <br />a <em>direction.</em>
              </h2>
              <div
                className="travel-verbs"
                aria-label="Building, experimenting, shipping, learning, writing"
              >
                {[
                  "BUILDING",
                  "EXPERIMENTING",
                  "SHIPPING",
                  "LEARNING",
                  "WRITING",
                ].map((v, i) => (
                  <span key={v}>
                    <small>0{i + 1}</small>
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <div className="entry-bottom mono">
              <a href="#work" className="text-link">
                EXPLORE THE WORK <span>↓</span>
              </a>
              <span className="entry-scroll">SCROLL TO MOVE FORWARD</span>
              <a
                href="/Rushabh%20Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                RÉSUMÉ ↗
              </a>
            </div>
            <div className="route-handoff" aria-hidden="true" />
          </div>
        </section>
        <section
          id="work"
          className="work"
          ref={work}
          aria-labelledby="work-heading"
        >
          <div className="work-stage">
            <div className="section-line mono">
              <h2 id="work-heading">02 / SELECTED JUNCTIONS</h2>
              <Link href="/projects" className="text-link">
                ALL PROJECTS ↗
              </Link>
            </div>
            <div className="work-intro">
              <p>
                Different routes.
                <br />
                <em>Real things.</em>
              </p>
              <span>
                Five projects. One instinct:
                <br />
                make something useful.
              </span>
            </div>
            <nav
              className="station-controls"
              aria-label="Selected project stations"
            >
              {stations.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => select(i)}
                  aria-current={enhanced && active === i ? "true" : undefined}
                  aria-controls={s.id}
                >
                  <span className="mono">0{i + 1}</span>
                  <span>{s.name}</span>
                  <i aria-hidden="true" />
                </button>
              ))}
            </nav>
            <div className="project-panels">
              {stations.map((s, i) => (
                <article
                  key={s.id}
                  id={s.id}
                  data-station={i}
                  className={`project-panel ${active === i ? "is-active" : ""}`}
                  inert={enhanced && active !== i}
                  aria-hidden={enhanced && active !== i ? true : undefined}
                >
                  <div className="project-copy">
                    <span className="mono station-label">
                      JUNCTION 0{i + 1} / {s.platform}
                    </span>
                    <h3>{s.name}</h3>
                    <p className="project-line">{s.line}</p>
                    <p className="project-description">{s.description}</p>
                    <p className="project-detail">{s.detail}</p>
                    <div className="project-links">
                      <Link href={s.href} className="text-link">
                        {s.action} <span>↗</span>
                      </Link>
                      {s.github && (
                        <a
                          href={s.github}
                          className="source-link"
                          aria-label={`${s.name} source on GitHub`}
                        >
                          Source ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <ProductSurface station={s} />
                </article>
              ))}
            </div>
            <div className="work-bottom mono">
              <span>IDEA → INTERFACE → EVERYDAY USE</span>
              <a href="#experiments" className="text-link">
                NEXT: THE SIDE ROUTES ↓
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
