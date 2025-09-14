"use client";

import Image from "next/image";
import Link from "next/link";

const DailySparks = () => {
  return (
    <section className="w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch border border-muted rounded-2xl overflow-hidden bg-muted/10">
        <Link
          href="https://dailysparks.in/?utm_source=rushabh.in&utm_medium=referral&utm_campaign=portfolio_card"
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-56 sm:h-72 md:h-auto min-h-[220px] block"
        >
          <Image
            src="/projects/dailysparks.png"
            alt="DailySparks – Tech, Anime & Travel blog"
            fill
            priority
            className="object-cover md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/60 to-transparent" />
        </Link>

        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <span className="text-xs tracking-widest uppercase text-primary font-semibold mb-2">
            Blog Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            DailySparks
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base">
            DailySparks is where I publish blogs on Tech, Anime, and Travel — a
            mix of guides, reviews, and personal insights
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="https://dailysparks.in/?utm_source=rushabh.in&utm_medium=referral&utm_campaign=primary_cta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Visit DailySparks
            </a>
            <a
              href="https://dailysparks.in/blog?utm_source=rushabh.in&utm_medium=referral&utm_campaign=secondary_cta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background hover:bg-muted/50 transition"
            >
              Read Blogs
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

export default DailySparks;
