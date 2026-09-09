"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SkillsMarquee from "./SkillsMarquee";
import { ArrowDown, ArrowUpRight, Check, Copy, FileText, MapPin } from "lucide-react";

export default function HeroSection() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const handleCopyEmail = async () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText("bhosalerushabh0@gmail.com");
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
    resetTimer.current = setTimeout(() => setCopyStatus("idle"), 3000);
  };

  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="hero-topline">
        <span className="hero-location"><MapPin size={13} aria-hidden="true" /> Mumbai, India</span>
        <span className="hero-availability"><span aria-hidden="true" /> Available for builds</span>
      </div>

      <div className="hero-layout">
        <div className="hero-copy">
          <p className="home-eyebrow">Full-stack software developer</p>
          <h1 id="hero-heading">Rushabh<br />Bhosale<span className="hero-period">.</span></h1>
          <p className="hero-tagline">Thoughtful software.<br /><em>Built for everyday life.</em></p>
          <p className="home-hero-description">I build web platforms, mobile apps, and developer tools — with a focus on clear interfaces and reliable engineering.</p>
          <div className="hero-actions">
            <a href="#work" className="home-button home-button-primary">Explore my work <ArrowDown size={16} aria-hidden="true" /></a>
            <a href="/Rushabh%20Resume.pdf" target="_blank" rel="noopener noreferrer" className="home-button home-button-secondary"><FileText size={16} aria-hidden="true" /> Résumé <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
          <div className="hero-email-row">
            <a href="mailto:bhosalerushabh0@gmail.com">bhosalerushabh0@gmail.com</a>
            <button type="button" onClick={handleCopyEmail} aria-label="Copy email address" title="Copy email address">
              {copyStatus === "copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
            </button>
            <span className="hero-copy-status" role="status">{copyStatus === "copied" ? "Copied!" : copyStatus === "error" ? "Couldn’t copy. Use the email link." : ""}</span>
          </div>
        </div>

        <figure className="hero-portrait">
          <div className="hero-portrait-image">
            <Image src="/me.png" alt="Rushabh Bhosale" fill priority sizes="(max-width: 767px) 64px, (max-width: 1100px) 38vw, 390px" className="object-cover object-top" />
            <span className="portrait-caption">THE PERSON BEHIND THE PIXELS</span>
          </div>
          <figcaption>
            <div><strong>Engineer by trade.</strong><span>Curious by nature.</span></div>
            <span className="portrait-monogram" aria-hidden="true">rb.</span>
          </figcaption>
        </figure>
      </div>

      <SkillsMarquee />
    </section>
  );
}
