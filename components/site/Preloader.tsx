"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { release } from "@/lib/motion";

/* First visit of a session: an odometer counts up in uneven steps while a line of words
   cycles underneath, then the screen lifts away in columns — the same columns the page
   transitions use. Visibility is decided before paint by the inline script in <head>
   (html[data-loader="on"]), so it never flashes. */

const STEPS = [
  { value: 0, word: "Hello" },
  { value: 23, word: "Designing" },
  { value: 58, word: "Building" },
  { value: 86, word: "Shipping" },
  { value: 100, word: "Welcome" },
];

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!el || html.dataset.loader !== "on") return;

    const strips = Array.from(el.querySelectorAll<HTMLElement>("[data-strip]"));
    const words = el.querySelector<HTMLElement>("[data-words]")!;
    const bar = el.querySelector<HTMLElement>("[data-bar]")!;
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    // Each digit strip is a column of 0–9; moving it by -10% per digit shows the next one.
    const roll = (value: number, at: number, tl: gsap.core.Timeline) => {
      const d = String(value).padStart(3, "0").split("").map(Number);
      strips.forEach((strip, i) => {
        tl.to(strip, { yPercent: -10 * d[i], duration: 0.9, ease: "expo.inOut" }, at + (2 - i) * 0.06);
      });
    };

    const intro = gsap.timeline();
    intro.fromTo(
      el.querySelectorAll("[data-fade]"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "expo.out" },
    );

    STEPS.forEach((step, i) => {
      if (i === 0) return;
      const at = 0.35 + (i - 1) * 0.62;
      roll(step.value, at, intro);
      intro.to(words, { yPercent: (-100 / STEPS.length) * i, duration: 0.8, ease: "expo.inOut" }, at);
      intro.to(bar, { scaleX: step.value / 100, duration: 0.8, ease: "expo.inOut" }, at);
    });

    const counted = new Promise((resolve) => intro.eventCallback("onComplete", resolve));
    let outro: gsap.core.Timeline | undefined;
    let cancelled = false;

    // Don't lift until the display font is in, so the hero never reflows on reveal.
    Promise.all([counted, fontsReady]).then(() => {
      if (cancelled) return;
      outro = gsap
        .timeline()
        .to(el.querySelectorAll("[data-fade]"), { opacity: 0, y: -24, duration: 0.5, stagger: 0.04, ease: "power3.in" }, 0.15)
        .addLabel("lift")
        .to(el.querySelectorAll(".loader__col"), { yPercent: -100, duration: 1, stagger: 0.06, ease: "expo.inOut" }, "lift")
        .add(() => release(), "lift+=0.3")
        .add(() => {
          html.removeAttribute("data-loader");
          try {
            sessionStorage.setItem("rb-loaded", "1");
          } catch {}
        });
    });

    return () => {
      cancelled = true;
      intro.kill();
      outro?.kill();
    };
  }, []);

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__cols">
        {Array.from({ length: 5 }, (_, i) => (
          <span className="loader__col" key={i} />
        ))}
      </div>

      <div className="loader__top mono" data-fade>
        <span>Rushabh Bhosale</span>
        <span className="loader__mid">Portfolio — ©{new Date().getFullYear()}</span>
        <span>Mumbai, IN</span>
      </div>

      <div className="loader__center" data-fade>
        <span className="line-mask loader__words-mask">
          <span className="loader__words serif" data-words>
            {STEPS.map((s) => (
              <span key={s.word}>{s.word}</span>
            ))}
          </span>
        </span>
      </div>

      <div className="loader__bottom">
        <div className="loader__count display" data-fade>
          {[0, 1, 2].map((i) => (
            <span className="loader__digit" key={i}>
              <span className="loader__strip" data-strip>
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          ))}
          <span className="loader__pct mono">%</span>
        </div>
        <div className="loader__progress mono" data-fade>
          <span>Loading the index</span>
          <span className="loader__track">
            <span className="loader__bar" data-bar />
          </span>
        </div>
      </div>
    </div>
  );
}
