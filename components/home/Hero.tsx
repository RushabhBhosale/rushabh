"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocalTime from "@/components/site/LocalTime";
import { experience } from "@/utils/experience";
import { prefersReducedMotion, scrollToTarget, whenReady } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const split = (word: string) =>
  word.split("").map((ch, i) => (
    <span className="ch" key={i}>
      {ch}
    </span>
  ));

/* Staggered editorial name: RUSHABH sits left with the intro beside it, BHOSALE sits
   right with a portrait slot in front. On phones both lines run full width and the
   portrait moves above them. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const name = useRef<HTMLHeadingElement>(null);

  // Size the name so its longest line takes a fixed share of the width — but never so
  // tall that it pushes the intro, status and scroll badge out of the first screen.
  useEffect(() => {
    const el = name.current;
    const stage = el?.closest<HTMLElement>(".hero__stage");
    if (!el || !stage) return;
    const fit = () => {
      const phone = window.matchMedia("(max-width: 860px)").matches;
      el.style.setProperty("--fit", "100px");
      const widest = Math.max(...Array.from(el.querySelectorAll<HTMLElement>(".hero__word"), (l) => l.scrollWidth));
      if (widest <= 0) return;
      let size = (100 * el.clientWidth * (phone ? 1 : 0.77)) / widest;
      // Two lines at line-height 0.8 plus their masks take about 1.74× the font size.
      if (!phone) size = Math.min(size, stage.clientHeight / 1.74);
      el.style.setProperty("--fit", `${size}px`);
      ScrollTrigger.refresh();
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".ch");
    const reduce = prefersReducedMotion();
    let ctx: gsap.Context | undefined;

    const cancel = whenReady(() => {
      ctx = gsap.context(() => {
        if (reduce) return;
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(chars, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 1.5, stagger: 0.04 })
          .fromTo(
            ".hero__portrait, .hero__portrait-m",
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
            0.35,
          )
          .fromTo(".hero__portrait img, .hero__portrait-m img", { scale: 1.35 }, { scale: 1, duration: 1.8 }, 0.35)
          .fromTo("[data-hero-fade]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.07 }, 0.6);

        // Lines drift apart as you leave the hero.
        const scroll = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero__line--1", { xPercent: -10, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero__line--2", { xPercent: 8, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero__portrait img", { yPercent: 18, scale: 1.15, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero__inner", { opacity: 0.15, ease: "none", scrollTrigger: { ...scroll, start: "30% top" } });
      }, el);
    });

    // Letters thin out as the pointer passes over them.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      chars.forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        const t = gsap.utils.clamp(0, 1, d / (r.height * 1.4));
        gsap.to(c, { "--wght": 200 + 600 * t, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      });
    };
    const onLeave = () => gsap.to(chars, { "--wght": 800, duration: 0.9, ease: "power3.out", overwrite: "auto" });
    const nameEl = name.current;
    if (fine && !reduce) {
      nameEl?.addEventListener("pointermove", onMove);
      nameEl?.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancel();
      ctx?.revert();
      nameEl?.removeEventListener("pointermove", onMove);
      nameEl?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" ref={root} aria-labelledby="hero-name">
      <div className="hero__inner">
        <div className="hero__meta mono">
          <span data-hero-fade>(Portfolio / ©{new Date().getFullYear()})</span>
          <span data-hero-fade className="hero__meta-mid">
            Full-stack developer
          </span>
          <span data-hero-fade>19.07° N, 72.87° E</span>
        </div>

        <span className="hero__portrait-m" aria-hidden="true">
          <Image src="/me.png" alt="" fill sizes="(max-width: 860px) 92vw, 0px" />
        </span>

        <div className="hero__stage">
          <div className="hero__block">
            <h1 className="hero__name display" id="hero-name" ref={name} aria-label="Rushabh Bhosale">
              <span className="hero__line hero__line--1" aria-hidden="true">
                <span className="hero__word">{split("Rushabh")}</span>
              </span>
              <span className="hero__line hero__line--2" aria-hidden="true">
                <span className="hero__portrait">
                  <Image src="/me.png" alt="" fill priority sizes="(max-width: 860px) 0px, 22vw" />
                </span>
                <span className="hero__word">{split("Bhosale")}</span>
              </span>
            </h1>

            <div className="hero__aside">
              <span className="mono dim" data-hero-fade>
                (Intro)
              </span>
              <p data-hero-fade>
                I design and build web platforms, mobile apps and automations —{" "}
                <span className="serif">with a bias for shipping.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="hero__foot">
          <div className="hero__status mono" data-hero-fade>
            <span>
              <span className="signal-dot" /> Open to new projects
            </span>
            <span className="dim">
              Mumbai — <LocalTime /> IST
            </span>
          </div>
          <span className="hero__now mono dim" data-hero-fade>
            Currently — {experience[0].role} at {experience[0].title}
          </span>
          <button
            type="button"
            className="hero__badge"
            data-hero-fade
            onClick={() => scrollToTarget("#approach")}
            aria-label="Scroll to the introduction"
          >
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <path id="hero-badge-path" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
              </defs>
              <text>
                <textPath href="#hero-badge-path" textLength="236" lengthAdjust="spacing">
                  Scroll to explore ✳ Scroll to explore ✳
                </textPath>
              </text>
            </svg>
            <span className="hero__badge-arrow" aria-hidden="true">
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
