"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* A label bubble that follows the pointer over anything marked [data-cursor="Label"].
   The native cursor stays everywhere else. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // A new page never starts with a stale label under the pointer.
  useEffect(() => {
    if (ref.current) gsap.to(ref.current, { scale: 0, opacity: 0, duration: 0.2 });
    window.dispatchEvent(new Event("rb:cursor-reset"));
  }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const label = el.querySelector<HTMLElement>("[data-label]")!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    let active: Element | null = null;

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as Element | null)?.closest?.("[data-cursor]") ?? null;
      if (target === active) return;
      active = target;
      if (target) {
        label.textContent = target.getAttribute("data-cursor");
        gsap.to(el, { scale: 1, opacity: 1, duration: 0.45, ease: "expo.out" });
      } else {
        gsap.to(el, { scale: 0, opacity: 0, duration: 0.35, ease: "power3.out" });
      }
    };
    const leave = () => {
      active = null;
      gsap.to(el, { scale: 0, opacity: 0, duration: 0.3 });
    };

    const reset = () => {
      active = null;
    };

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("rb:cursor-reset", reset);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("rb:cursor-reset", reset);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="mono" data-label />
    </div>
  );
}
