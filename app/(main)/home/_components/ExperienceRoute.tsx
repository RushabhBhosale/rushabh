"use client";

import Link from "next/link";
import { experience } from "@/utils/experience";

export default function ExperienceRoute() {
  return (
    <div className="flex flex-col text-left w-full">
      {/* Section Line Header */}
      <div className="section-line mono mb-3 pb-2 border-b border-border/40">
        <span>03 / ROUTE HISTORY</span>
        <a
          href="/Rushabh%20Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors text-primary"
        >
          RÉSUMÉ PDF ↗
        </a>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-balance">
          Experience &amp; Stops.
          <br />
          <em className="font-serif italic font-normal text-primary">The path.</em>
        </h2>
      </div>

      {/* Clean Timeline */}
      <div className="relative pl-6 sm:pl-7 border-l border-border/70 space-y-6 sm:space-y-7">
        {experience.map((item, index) => {
          const isCurrent = index === 0;
          return (
            <div key={item.title} className="relative group">
              {/* Route stop node dot */}
              <span
                className={`absolute -left-[31px] sm:-left-[35px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background transition-colors ${
                  isCurrent
                    ? "bg-primary ring-4 ring-primary/20"
                    : "bg-muted-foreground/50 group-hover:bg-foreground"
                }`}
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-2 mb-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {isCurrent && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                      Current
                    </span>
                  )}
                </div>
                <time className="text-[11px] font-mono text-muted-foreground shrink-0">
                  {item.time}
                </time>
              </div>

              <span className="text-xs font-mono text-primary font-medium block mb-1">
                {item.role}
              </span>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-3 border-t border-border/40">
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>More about my background</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
