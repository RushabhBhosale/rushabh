"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion, whenReady } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* Page-wide scroll choreography, re-armed on every route:
   [data-reveal]   fades and rises in
   [data-lines]    splits into masked lines that slide up
   [data-draw]     rules that draw from left to right
   [data-parallax] drifts by the given amount (e.g. data-parallax="-12") */
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-lines]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.visibility = "visible";
      });
      return;
    }

    let ctx: gsap.Context | undefined;
    const splits: SplitText[] = [];

    const cancel = whenReady(() => {
      ctx = gsap.context(() => {
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 1.2, stagger: 0.09, ease: "expo.out" }),
        });

        document.querySelectorAll<HTMLElement>("[data-lines]").forEach((el) => {
          gsap.set(el, { visibility: "visible" });
          splits.push(
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110,
                  duration: 1.25,
                  stagger: 0.08,
                  ease: "expo.out",
                  scrollTrigger: { trigger: el, start: "top 88%", once: true },
                }),
            }),
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 1.4,
              ease: "expo.inOut",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax) || -10;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancel();
      splits.forEach((s) => s.revert());
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
