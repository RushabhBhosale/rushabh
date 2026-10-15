"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hold, prefersReducedMotion, release, scrollToTarget, scrollToTop } from "@/lib/motion";
import { routeLabel } from "@/lib/site";

type Pending = { kind: "curtain" | "expand"; hash: string; clone?: HTMLElement };

/* Intercepts internal links: a curtain rises, the route changes underneath, the curtain
   leaves. Project rows instead dispatch `rb:expand` so their poster grows into the
   case-study hero. */
export default function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const idx = useRef<HTMLSpanElement>(null);
  const pending = useRef<Pending | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    const go = (url: URL, kind: Pending["kind"], clone?: HTMLElement) => {
      pending.current = { kind, hash: url.hash, clone };
      hold();
      router.push(url.pathname + url.search, { scroll: false });
    };

    // Columns rise in a wave, the destination's name slides up, then the route changes.
    const curtainTo = (url: URL) => {
      const el = curtain.current;
      if (!el || busy.current) return;
      busy.current = true;
      const { name, index } = routeLabel(url.pathname);
      if (word.current) word.current.textContent = name;
      if (idx.current) idx.current.textContent = `(${index})`;
      gsap.set(el, { visibility: "visible" });
      gsap
        .timeline({ onComplete: () => go(url, "curtain") })
        .fromTo(
          el.querySelectorAll(".curtain__col"),
          { yPercent: 100 },
          { yPercent: 0, duration: 0.7, stagger: 0.05, ease: "expo.inOut" },
        )
        .fromTo(word.current, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out" }, "-=0.3")
        .fromTo(idx.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, "<0.1")
        .fromTo(el.querySelector(".curtain__bar"), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.inOut" }, "<");
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.hasAttribute("download") || a.dataset.transition === "none") return;
      if (a.target && a.target !== "_self") return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      const url = new URL(href, window.location.href);
      if (/\.[a-z0-9]{2,4}$/i.test(url.pathname)) return; // files: résumé, images

      e.preventDefault();
      e.stopPropagation();

      if (url.pathname === window.location.pathname) {
        if (url.hash) scrollToTarget(url.hash);
        else scrollToTop();
        return;
      }
      if (prefersReducedMotion()) {
        router.push(url.pathname + url.search + url.hash);
        return;
      }
      curtainTo(url);
    };

    const onExpand = (e: Event) => {
      const detail = (e as CustomEvent<{ href: string; source?: HTMLElement | null; rect?: DOMRect }>).detail;
      const url = new URL(detail.href, window.location.href);
      if (busy.current) return;
      if (prefersReducedMotion()) {
        router.push(url.pathname);
        return;
      }
      const source = detail.source;
      const rect = detail.rect ?? source?.getBoundingClientRect();
      // Nothing visible to grow from (e.g. keyboard activation) — use the curtain.
      if (!source || !rect || rect.width < 2) {
        curtainTo(url);
        return;
      }
      busy.current = true;
      const clone = source.cloneNode(true) as HTMLElement;
      clone.classList.add("expand-clone");
      Object.assign(clone.style, {
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      });
      document.body.appendChild(clone);
      gsap.to(clone, {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        duration: 1,
        ease: "expo.inOut",
        onComplete: () => go(url, "expand", clone),
      });
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("rb:expand", onExpand);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("rb:expand", onExpand);
    };
  }, [router]);

  // The new route has rendered underneath — reset scroll and uncover it.
  useEffect(() => {
    const p = pending.current;
    if (!p) return;
    pending.current = null;

    scrollToTop(true);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (p.hash) setTimeout(() => scrollToTarget(p.hash), 400);
    });

    const done = () => {
      busy.current = false;
    };

    if (p.kind === "expand" && p.clone) {
      const clone = p.clone;
      release();
      gsap.to(clone, {
        opacity: 0,
        duration: 0.6,
        delay: 0.25,
        ease: "power2.out",
        onComplete: () => {
          clone.remove();
          done();
        },
      });
      return;
    }

    const el = curtain.current;
    if (!el) return;
    gsap
      .timeline({
        delay: 0.05,
        onComplete: () => {
          gsap.set(el, { visibility: "hidden" });
          done();
        },
      })
      .to(word.current, { yPercent: -110, duration: 0.55, ease: "expo.in" })
      .to([idx.current, el.querySelector(".curtain__bar")], { opacity: 0, duration: 0.3 }, "<")
      .add(release, "-=0.05")
      .to(el.querySelectorAll(".curtain__col"), { yPercent: -100, duration: 0.85, stagger: 0.05, ease: "expo.inOut" }, "-=0.1")
      .set(el.querySelector(".curtain__bar"), { opacity: 1, scaleX: 0 });
  }, [pathname]);

  return (
    <div className="curtain" ref={curtain} aria-hidden="true">
      <div className="curtain__cols">
        {Array.from({ length: 5 }, (_, i) => (
          <span className="curtain__col" key={i} />
        ))}
      </div>
      <div className="curtain__label">
        <span className="curtain__idx mono" ref={idx} />
        <span className="line-mask">
          <span className="curtain__word display" ref={word} />
        </span>
        <span className="curtain__bar" />
      </div>
    </div>
  );
}
