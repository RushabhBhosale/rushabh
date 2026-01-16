"use client";

import Image from "next/image";
import Link from "next/link";

const AnimeSparks = () => {
  return (
    <section className="w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch border border-muted rounded-2xl overflow-hidden bg-muted/10">
        <Link
          href="https://www.animesparks.blog/?utm_source=rushabh.in&utm_medium=referral&utm_campaign=portfolio_card"
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-56 sm:h-72 md:h-auto min-h-[220px] block"
        >
          <Image
            src="/projects/animesparks.png"
            alt="AnimeSparks – anime and pop-culture editorial platform"
            fill
            priority
            className="object-cover md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/60 to-transparent" />
        </Link>

        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <span className="text-xs tracking-widest uppercase text-primary font-semibold mb-2">
            Editorial Platform
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            AnimeSparks
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base">
            AnimeSparks is a modern anime and pop-culture editorial platform
            focused on deep analysis, reviews, and thoughtful storytelling.
            Built with a strong SEO foundation, it delivers long-form content
            that explores characters, themes, and narratives beyond
            surface-level fandom.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="https://www.animesparks.blog/?utm_source=rushabh.in&utm_medium=referral&utm_campaign=primary_cta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Visit AnimeSparks
            </a>
            <a
              href="https://www.animesparks.blog/?utm_source=rushabh.in&utm_medium=referral&utm_campaign=secondary_cta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background hover:bg-muted/50 transition"
            >
              Read Stories
            </a>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background hover:bg-muted/50 transition"
            >
              Internal Posts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimeSparks;
