"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Convergence() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "path",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 95%",
              end: "bottom 45%",
              scrub: 0.5,
            },
          },
        );
        gsap.fromTo(
          "circle",
          { scale: 0, transformOrigin: "50% 50%" },
          {
            scale: 1,
            duration: 0.4,
            scrollTrigger: { trigger: ref.current, start: "bottom 75%" },
          },
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <div ref={ref} className="convergence" aria-hidden="true">
      <svg viewBox="0 0 1200 180" preserveAspectRatio="none">
        {[
          "M0 10C300 10 350 170 600 170",
          "M0 90C300 90 420 170 600 170",
          "M1200 10C900 10 850 170 600 170",
          "M1200 90C900 90 780 170 600 170",
          "M600 0V180",
        ].map((d) => (
          <path key={d} d={d} pathLength="1" strokeDasharray="1" />
        ))}
        <circle cx="600" cy="170" r="5" />
      </svg>
    </div>
  );
}
