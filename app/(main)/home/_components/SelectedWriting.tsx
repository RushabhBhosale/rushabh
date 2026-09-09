"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/app/(main)/blogs";

export default function SelectedWriting() {
  return (
    <section
      className="writing-section w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20"
      aria-labelledby="writing-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column (4 cols): Sticky Editorial Intro on Desktop */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col text-left">
          <div className="section-line mono mb-3 pb-2 border-b border-border/40">
            <span>04 / DISPATCHES</span>
            <span>WRITING</span>
          </div>

          <h2
            id="writing-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 text-balance"
          >
            Engineering Notes.
            <br />
            <em className="font-serif italic font-normal text-primary">In the open.</em>
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
            Technical writing on native Android SMS automation, AI pipelines with n8n, and cross-platform UI engineering.
          </p>

          <Link
            href="/blogs"
            className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1.5"
          >
            <span>Read all articles</span>
            <span>→</span>
          </Link>
        </div>

        {/* Right Column (8 cols): Editorial Dispatch Stream */}
        <div className="lg:col-span-8 divide-y divide-border/40 border-y border-border/40">
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4 sm:py-5 hover:bg-muted/15 px-2.5 sm:px-3 rounded-lg transition-colors"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-primary font-semibold shrink-0">
                  0{index + 1}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-muted-foreground shrink-0 pl-7 sm:pl-0">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <ArrowUpRight
                  className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
