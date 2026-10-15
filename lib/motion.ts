import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
    __rbBooted?: boolean;
    __rbHeld?: boolean;
  }
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Something (the preloader or a page transition) is covering the screen.
   Entrance animations wait for `release()` so they play where people can see them. */
export function isHeld() {
  if (typeof window === "undefined") return false;
  if (window.__rbHeld === undefined) {
    window.__rbHeld = document.documentElement.dataset.loader === "on";
  }
  return window.__rbHeld;
}

export function hold() {
  window.__rbHeld = true;
}

export function release() {
  window.__rbHeld = false;
  window.dispatchEvent(new Event("rb:ready"));
}

export function whenReady(cb: () => void) {
  if (!isHeld()) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("rb:ready", handler, { once: true });
  return () => window.removeEventListener("rb:ready", handler);
}

export function scrollToTop(immediate = false) {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
}

export function scrollToTarget(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { offset: 0 });
  else el.scrollIntoView({ behavior: "smooth" });
}
