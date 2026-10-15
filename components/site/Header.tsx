"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import LocalTime from "./LocalTime";
import ThemeToggle from "./ThemeToggle";
import { EMAIL, nav, socials } from "@/lib/site";
import { work } from "@/utils/work";
import { blogPosts } from "@/app/(main)/blogs/index";

const counts: Record<string, number> = {
  "/work": work.length,
  "/blogs": blogPosts.length,
};

const pad = (n: number) => String(n).padStart(2, "0");

/* Full-width bar at the top of a page; once you scroll it condenses into a floating
   pill. A soft indicator slides behind whichever link you point at. */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A new page starts at the top; re-check once the transition has reset the scroll.
  useEffect(() => {
    const id = setTimeout(() => setCondensed(window.scrollY > 80), 60);
    return () => clearTimeout(id);
  }, [pathname]);

  // Sliding indicator: follows hover, rests on the current page.
  useEffect(() => {
    const wrap = links.current;
    const pill = indicator.current;
    if (!wrap || !pill) return;
    const moveTo = (el: HTMLElement | null, instant = false) => {
      if (!el) {
        gsap.to(pill, { opacity: 0, scale: 0.6, duration: 0.35, ease: "power3.out" });
        return;
      }
      gsap.to(pill, {
        x: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
        scale: 1,
        duration: instant ? 0 : 0.55,
        ease: "expo.out",
      });
    };
    const current = () => wrap.querySelector<HTMLElement>("[aria-current='page']");
    moveTo(current(), true);

    const over = (e: PointerEvent) => {
      const link = (e.target as Element).closest<HTMLElement>(".nav__link");
      if (link) moveTo(link);
    };
    const out = () => moveTo(current());
    wrap.addEventListener("pointerover", over);
    wrap.addEventListener("pointerleave", out);
    const ro = new ResizeObserver(() => moveTo(current(), true));
    ro.observe(wrap);
    return () => {
      wrap.removeEventListener("pointerover", over);
      wrap.removeEventListener("pointerleave", out);
      ro.disconnect();
    };
  }, [pathname, condensed]);

  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-menu-item]");
    if (open) {
      window.__lenis?.stop();
      gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" });
      gsap.fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.06, ease: "expo.out", delay: 0.35 });
    } else {
      window.__lenis?.start();
      gsap.to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "expo.inOut" });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="nav" data-condensed={condensed && !open} data-open={open}>
        <div className="nav__bar">
          <Link href="/home" className="nav__brand" aria-label="Rushabh Bhosale — home">
            <span className="nav__mark" aria-hidden="true">
              <span>R</span>
              <span>B</span>
            </span>
            <span className="nav__name">
              <span className="roll">
                <span data-text="Rushabh Bhosale">Rushabh Bhosale</span>
              </span>
              <span className="nav__role mono">Developer — Mumbai</span>
            </span>
          </Link>

          <nav className="nav__links" ref={links} aria-label="Main">
            <span className="nav__indicator" ref={indicator} aria-hidden="true" />
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav__link"
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              >
                <span className="roll">
                  <span data-text={link.label}>{link.label}</span>
                </span>
                {counts[link.href] !== undefined && <sup className="mono">{pad(counts[link.href])}</sup>}
              </Link>
            ))}
          </nav>

          <div className="nav__end">
            <span className="nav__time mono">
              <LocalTime /> IST
            </span>
            <ThemeToggle />
            <Link href="/contact" className="nav__cta">
              <span className="roll">
                <span data-text="Let’s talk">Let’s talk</span>
              </span>
              <span className="nav__cta-dot" aria-hidden="true" />
            </Link>
            <button
              ref={toggle}
              className="nav__menu"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="nav__burger" data-open={open} aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        className="menu"
        ref={menu}
        aria-hidden={!open}
        inert={!open}
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <nav className="menu__nav" aria-label="Menu">
          {[{ label: "Index", href: "/home" }, ...nav].map((link, i) => (
            <Link key={link.href} href={link.href} className="menu__link">
              <span className="line-mask">
                <span data-menu-item className="menu__link-inner">
                  <span className="mono menu__num">0{i + 1}</span>
                  <span className="display">{link.label}</span>
                  {counts[link.href] !== undefined && <sup className="mono menu__count">({pad(counts[link.href])})</sup>}
                </span>
              </span>
            </Link>
          ))}
        </nav>
        <div className="menu__foot mono">
          <div className="menu__meta">
            <span className="dim">Mumbai — <LocalTime /> IST</span>
            <a href={`mailto:${EMAIL}`} className="u-link">
              {EMAIL}
            </a>
          </div>
          <div className="menu__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="u-link">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
