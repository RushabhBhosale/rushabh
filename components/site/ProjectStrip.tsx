"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Shot from "./Shot";
import { prefersReducedMotion } from "@/lib/motion";
import { indexOf, type Work } from "@/utils/work";

gsap.registerPlugin(ScrollTrigger);

/* A horizontal strip of tall project cards. On desktop it slides sideways as the page
   scrolls past, leans a little with your speed, and can be dragged. On touch screens
   it is a native swipeable row. */
export default function ProjectStrip({
  items,
  more,
}: {
  items: Work[];
  more?: { label: string; href: string; count: number };
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    vp.dataset.driven = "true";
    const xTo = gsap.quickTo(tr, "x", { duration: 0.9, ease: "power3" });
    const skewTo = gsap.quickTo(tr, "skewX", { duration: 0.6, ease: "power3" });

    let max = 0;
    let scrolled = 0;
    let dragged = 0;
    let last = 0;
    const measure = () => {
      max = Math.max(0, tr.scrollWidth - vp.clientWidth);
    };
    measure();

    const st = ScrollTrigger.create({
      trigger: vp,
      // Start once the strip is near the top, so you arrive on the first card.
      start: "top top+=180",
      end: "bottom top",
      onUpdate: (self) => {
        scrolled = self.progress * max;
      },
      onRefresh: measure,
    });

    const tick = () => {
      const target = -gsap.utils.clamp(0, max, scrolled + dragged);
      xTo(target);
      skewTo(gsap.utils.clamp(-3, 3, (target - last) * 0.06));
      last = target;
    };
    gsap.ticker.add(tick);

    // Drag: pointer movement offsets the scroll-driven position.
    let startX = 0;
    let startDrag = 0;
    let moved = 0;
    let down = false;
    const onDown = (e: PointerEvent) => {
      down = true;
      moved = 0;
      startX = e.clientX;
      startDrag = dragged;
      vp.dataset.dragging = "true";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      dragged = gsap.utils.clamp(-scrolled, max - scrolled, startDrag - dx * 1.4);
    };
    const onUp = () => {
      down = false;
      delete vp.dataset.dragging;
    };
    // A drag shouldn't open the card it started on. Listen on window (capture) so this
    // runs before the page-transition handler on document.
    const onClick = (e: MouseEvent) => {
      if (moved > 6 && vp.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
      }
      moved = 0;
    };
    const noImageDrag = (e: DragEvent) => e.preventDefault();

    vp.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("click", onClick, true);
    vp.addEventListener("dragstart", noImageDrag);
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(vp);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      ro.disconnect();
      vp.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("click", onClick, true);
      vp.removeEventListener("dragstart", noImageDrag);
      delete vp.dataset.driven;
      gsap.set(tr, { x: 0, skewX: 0 });
    };
  }, [items]);

  return (
    <div className="strip">
      <div className="strip__viewport" ref={viewport} data-cursor="Drag">
        <div className="strip__track" ref={track}>
          {items.map((w) => (
            <Link key={w.slug} href={`/work/${w.slug}`} className="strip__card" data-cursor="View" draggable={false}>
              <span className="strip__media">
                <Shot work={w} view={w.shots?.mobile ? "mobile" : undefined} sizes="(max-width: 860px) 80vw, 34vw" />
              </span>
              <span className="strip__cap">
                <span className="strip__title">
                  <span className="mono dim">({indexOf(w.slug)})</span> {w.title}
                </span>
                <span className="mono dim">{w.category}</span>
              </span>
            </Link>
          ))}
          {more && (
            <Link href={more.href} className="strip__card strip__card--more" data-cursor="Open" draggable={false}>
              <span className="strip__media strip__more">
                <span className="mono">({String(more.count).padStart(2, "0")})</span>
                <span className="strip__more-label">
                  {more.label} <span className="arrow">↗</span>
                </span>
              </span>
              <span className="strip__cap">
                <span className="strip__title">Full index</span>
                <span className="mono dim">Web, mobile &amp; tools</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
