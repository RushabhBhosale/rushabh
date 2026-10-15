"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { EMAIL } from "@/lib/site";

/* Endless "Let's talk" strip. Hovering slows it right down and floods it with signal. */
export default function FooterMarquee() {
  const track = useRef<HTMLSpanElement>(null);
  const link = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = track.current;
    const a = link.current;
    if (!el || !a || prefersReducedMotion()) return;
    const loop = gsap.to(el, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
    const slow = () => gsap.to(loop, { timeScale: 0.2, duration: 0.8, ease: "power3.out" });
    const fast = () => gsap.to(loop, { timeScale: 1, duration: 0.8, ease: "power3.out" });
    a.addEventListener("pointerenter", slow);
    a.addEventListener("pointerleave", fast);
    return () => {
      a.removeEventListener("pointerenter", slow);
      a.removeEventListener("pointerleave", fast);
      loop.kill();
    };
  }, []);

  const group = (hidden: boolean) => (
    <span className="footer__marquee-group" aria-hidden={hidden || undefined}>
      <span>Let’s talk</span>
      <span className="footer__star">✳</span>
      <span className="footer__outline">Let’s talk</span>
      <span className="footer__star">✳</span>
    </span>
  );

  return (
    <a href={`mailto:${EMAIL}`} className="footer__marquee display" ref={link} data-cursor="Say hi">
      <span className="sr-only">Email Rushabh — let’s talk</span>
      <span className="footer__marquee-track" ref={track} aria-hidden="true">
        {group(false)}
        {group(true)}
      </span>
    </a>
  );
}
