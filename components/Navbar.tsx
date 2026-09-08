"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggler from "./ThemeToggler";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const links = [
    { label: "Work", href: "/home#work" },
    { label: "Writing", href: "/home#writing" },
    { label: "About", href: "/home#experience" },
    { label: "Contact", href: "/home#contact" },
  ];
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!navigation.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return (
    <header className="sy-header" ref={navigation}>
      <Link
        href="/home"
        aria-label="Rushabh Bhosale home"
        className="sy-brand"
        onClick={() => setOpen(false)}
      >
        <svg
          width="28"
          height="30"
          viewBox="0 0 28 30"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 28V2h8c12 0 12 14 0 14H4m9 0 11 12M4 22 24 2"
            stroke="currentColor"
            strokeWidth="2.5"
          />
        </svg>
        <span>
          RUSHABH
          <br />
          BHOSALE
        </span>
      </Link>
      <span className="header-coordinate mono">
        THE SWITCHYARD <span> / </span> A DEVELOPER’S PORTFOLIO
      </span>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((l, i) => (
          <Link href={l.href} key={l.label}>
            <small>0{i + 1}</small>
            {l.label}
          </Link>
        ))}
      </nav>
      {pathname !== "/home" && <ThemeToggler />}
      <button
        className="mobile-menu-button mono"
        ref={button}
        aria-expanded={open}
        aria-controls="mobile-routes"
        onClick={() => setOpen(!open)}
      >
        {open ? "CLOSE −" : "ROUTES +"}
      </button>
      {open && (
        <nav
          id="mobile-routes"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map((l, i) => (
            <Link href={l.href} key={l.label} onClick={() => setOpen(false)}>
              <span className="mono">0{i + 1}</span>
              {l.label}
              <span>↗</span>
            </Link>
          ))}
          <a href="/Rushabh%20Resume.pdf">Download résumé ↗</a>
        </nav>
      )}
    </header>
  );
}
