"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { INTRO_KEY, INTRO_TTL, worldState } from "./world-path";

export default function OpeningSequence() {
  useEffect(() => {
    const html = document.documentElement;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let timeline: gsap.core.Timeline | undefined;
    let done = false;
    let began = false;
    let safety = 0;
    const targets =
      ".hero-name, .entry-coordinate, .hero-description, .entry-bottom, .sy-header, .travel-statement";
    const finish = (remember = false) => {
      if (done) return;
      done = true;
      timeline?.kill();
      clearTimeout(safety);
      worldState.activation = 1;
      delete html.dataset.syOpening;
      html.dataset.syOpened = "true";
      gsap.set(targets, { clearProps: "clipPath,filter" });
      // Opening touches only these wrappers; scroll animation owns the name's children.
      gsap.set(".entry-coordinate, .entry-bottom, .sy-header", {
        clearProps: "opacity,visibility,transform",
      });
      gsap.set(".hero-name", { clearProps: "opacity,visibility" });
      document
        .querySelector(".journey")
        ?.setAttribute("data-opening", "complete");
      if (remember)
        try {
          sessionStorage.setItem(INTRO_KEY, String(Date.now()));
        } catch {}
      window.dispatchEvent(new Event("switchyard:opening-complete"));
    };
    const begin = () => {
      if (began || done) return;
      began = true;
      const canvas = document.querySelector<HTMLCanvasElement>(".route-canvas");
      if (
        media.matches ||
        location.hash ||
        scrollY > 40 ||
        !html.dataset.syOpening ||
        canvas?.dataset.ready !== "true"
      ) {
        finish();
        return;
      }
      let recent = false;
      try {
        const stamp = Number(sessionStorage.getItem(INTRO_KEY));
        recent = stamp > 0 && Date.now() - stamp < INTRO_TTL;
      } catch {}
      const duration = recent ? 0.8 : 2.2;
      html.dataset.syOpening = "running";
      document
        .querySelector(".journey")
        ?.setAttribute("data-opening", recent ? "return" : "first");
      worldState.activation = 0;
      timeline = gsap.timeline({ onComplete: () => finish(true) });
      timeline
        .to(
          worldState,
          { activation: 1, duration: duration * 0.78, ease: "none" },
          0,
        )
        .fromTo(
          ".hero-name",
          {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            filter: "none",
          },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: duration * 0.3,
            ease: "power3.out",
          },
          duration * 0.49,
        )
        .fromTo(
          ".entry-coordinate, .sy-header",
          { autoAlpha: 0, y: 6 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: duration * 0.045,
            duration: duration * 0.16,
          },
          duration * 0.73,
        )
        .fromTo(
          ".entry-bottom",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: duration * 0.15 },
          duration * 0.85,
        );
      // CSS gates body copy until its own late registration, not an overall screen fade.
      timeline.call(
        () => {
          html.dataset.syOpening = "labels";
        },
        [],
        duration * 0.73,
      );
      safety = window.setTimeout(() => finish(), 2800);
    };
    const interrupt = () => finish();
    const key = (event: KeyboardEvent) => {
      if (
        ["Tab", "Escape", "ArrowDown", "PageDown", " ", "End"].includes(
          event.key,
        )
      )
        finish();
    };
    const ready = () => begin();
    const scroll = () => {
      if (scrollY > 40) finish();
    };
    window.addEventListener("switchyard:world-ready", ready);
    window.addEventListener("switchyard:opening-timeout", interrupt);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("pointerdown", interrupt, { passive: true });
    window.addEventListener("keydown", key);
    window.addEventListener("scroll", scroll, { passive: true });
    media.addEventListener("change", interrupt);
    // World setup runs before this sibling effect. Failed WebGL should never hide content.
    begin();
    return () => {
      timeline?.kill();
      clearTimeout(safety);
      queueMicrotask(() => {
        if (!document.querySelector(".journey")) finish();
      });
      window.removeEventListener("switchyard:world-ready", ready);
      window.removeEventListener("switchyard:opening-timeout", interrupt);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      window.removeEventListener("keydown", key);
      window.removeEventListener("scroll", scroll);
      media.removeEventListener("change", interrupt);
    };
  }, []);
  return null;
}
