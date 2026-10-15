import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "./index";
import { formatDate } from "@/utils/content";

export const metadata: Metadata = {
  title: "Writing — Rushabh Bhosale",
  description:
    "Build stories, practical fixes, and lessons from Rushabh Bhosale’s work on web apps, mobile development, and automation.",
};

const details: Record<string, { category: string; readTime: string }> = {
  "expense-tracker-sms-automation": { category: "Mobile development", readTime: "8 min" },
  "nativewind-not-working": { category: "Debugging", readTime: "5 min" },
  "movie-watchlist-app": { category: "Build story", readTime: "6 min" },
  "automated-blog-n8n-ai": { category: "Automation", readTime: "8 min" },
};

export default function BlogsPage() {
  return (
    <div className="page">
      <header className="page-hero section">
        <div className="page-hero__meta mono">
          <span>(Writing)</span>
          <span className="dim">Build stories, fixes &amp; lessons</span>
          <span>{String(blogPosts.length).padStart(2, "0")} articles</span>
        </div>
        <h1 className="page-hero__title display" data-lines>
          Writing
        </h1>
        <p className="page-hero__lede" data-reveal>
          Notes from <span className="serif">the making</span> — things I’ve learned while turning ideas into software.
        </p>
      </header>

      <section className="section">
        <ul className="articles">
          {blogPosts.map((post, i) => {
            const d = details[post.slug];
            return (
              <li key={post.slug} data-reveal>
                <Link href={`/blogs/${post.slug}`} className="article-row" data-cursor="Read">
                  <span className="article-row__num mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="article-row__main">
                    <span className="article-row__title">{post.title}</span>
                    <span className="article-row__desc dim">{post.description}</span>
                  </span>
                  <span className="article-row__meta mono">
                    <span>{d?.category}</span>
                    <time dateTime={post.date} className="dim">
                      {formatDate(post.date)}
                    </time>
                    <span className="dim">{d?.readTime} read</span>
                  </span>
                  <span className="article-row__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
