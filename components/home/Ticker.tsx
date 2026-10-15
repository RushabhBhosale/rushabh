"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/* Endless strip whose speed and direction follow the scroll. */
export default function Ticker({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    const loop = gsap.to(el, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    let direction = 1;
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        direction = self.direction;
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 6);
        gsap.to(loop, { timeScale: direction * boost, duration: 0.2, overwrite: true });
        gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
      },
    });
    return () => {
      st.kill();
      loop.kill();
    };
  }, []);

  const row = (hidden: boolean) => (
    <div className="ticker__row" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="ticker__item">
          {t}
          <span className="ticker__star" aria-hidden="true">
            ✳
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="ticker mono">
      <div className="ticker__track" ref={track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
