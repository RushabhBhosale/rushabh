"use client";

import Link from "next/link";
import { ArrowUpRight, Compass, Navigation } from "lucide-react";
import SwitchyardCarLink from "./SwitchyardCarLink";

export default function SwitchyardBanner() {
  return (
    <section className="switchyard-callout w-full max-w-6xl mx-auto px-4 sm:px-6 my-10 sm:my-14" aria-label="Interactive Experience Callout">
      <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-gradient-to-br from-card via-card/90 to-muted/30 p-5 sm:p-8 lg:p-10 shadow-lg">
        {/* Decorative Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-2 sm:mb-3">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>The interactive experience</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight mb-2.5 sm:mb-3 text-balance">
              A different way to explore.{" "}
              <span className="text-primary italic font-serif">The Switchyard.</span>
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Take the scenic route through my work. Drive between project stations in an interactive world built for a little curiosity.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-mono text-muted-foreground">
              <span className="px-2 py-0.5 rounded bg-muted border border-border/50">
                WebGL Tracks
              </span>
              <span className="px-2 py-0.5 rounded bg-muted border border-border/50">
                5 Station Junctions
              </span>
              <span className="px-2 py-0.5 rounded bg-muted border border-border/50">
                Audio &amp; Keyboard Controls
              </span>
            </div>
          </div>

          {/* Right Side: Orbit Car & Direct Launch Button cleanly separated with responsive spacing */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full lg:w-auto shrink-0 justify-center sm:justify-start lg:justify-end pt-2 sm:pt-0">
            <div className="relative w-[100px] h-[100px] sm:w-[112px] sm:h-[112px] flex items-center justify-center shrink-0">
              <SwitchyardCarLink className="is-inline" />
            </div>

            <Link
              href="/switchyard"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:opacity-95 active:scale-[0.98] transition-all duration-150 shadow-md w-full sm:w-auto text-center min-h-[44px]"
            >
              <Navigation className="w-4 h-4" aria-hidden="true" />
              <span>Enter The Switchyard</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
