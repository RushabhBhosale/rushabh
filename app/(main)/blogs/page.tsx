import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { blogPosts } from "./index";
import styles from "./writing.module.css";

export const metadata: Metadata = {
  title: "Writing — Rushabh Bhosale",
  description: "Build stories, practical fixes, and lessons from Rushabh Bhosale’s work on web apps, mobile development, and automation.",
};

const articleDetails: Record<string, { category: string; readTime: string; image: string }> = {
  "expense-tracker-sms-automation": { category: "Mobile development", readTime: "8 min read", image: "/projects/expense-tracking.svg" },
  "nativewind-not-working": { category: "Debugging", readTime: "5 min read", image: "/native-wind.png" },
  "movie-watchlist-app": { category: "Build story", readTime: "6 min read", image: "/projects/watchlist.png" },
  "automated-blog-n8n-ai": { category: "Automation", readTime: "8 min read", image: "/n8n.png" },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export default function BlogsPage() {
  const [latest, ...remainingPosts] = blogPosts;
  const latestDetails = articleDetails[latest.slug];

  return (
    <div className={`switchyard ${styles.page}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.topline}><span>Writing / The notebook</span><span>{String(blogPosts.length).padStart(2, "0")} articles</span></div>
          <div className={styles.headingRow}>
            <h1>Notes from<br /><em>the making.</em></h1>
            <p>Build stories, practical fixes, and things I’ve learned while turning ideas into software.</p>
          </div>
        </header>

        <section aria-labelledby="latest-heading" className={styles.featuredSection}>
          <h2 id="latest-heading" className={styles.sectionLabel}>The latest article</h2>
          <Link href={`/blogs/${latest.slug}`} className={styles.featured}>
            <div className={styles.featuredCopy}>
              <span className={styles.category}>{latestDetails.category}</span>
              <h3>{latest.title}</h3>
              <p>{latest.description}</p>
              <div className={styles.articleMeta}><time dateTime={latest.date}>{formatDate(latest.date)}</time><span><Clock3 size={13} aria-hidden="true" /> {latestDetails.readTime}</span></div>
              <span className={styles.readLink}>Read the story <ArrowUpRight size={17} aria-hidden="true" /></span>
            </div>
            <div className={styles.featuredImage}>
              <Image src={latestDetails.image} alt="Illustrated expense tracker dashboard" fill priority sizes="(max-width: 700px) 90vw, 520px" className={styles.featuredPhoto} />
            </div>
          </Link>
        </section>

        <section className={styles.archive} aria-labelledby="archive-heading">
          <div className={styles.archiveHeading}><h2 id="archive-heading">More from the notebook</h2><span>{String(remainingPosts.length).padStart(2, "0")} articles</span></div>
          <div className={styles.articles}>
            {remainingPosts.map(post => {
              const details = articleDetails[post.slug];
              return (
                <article key={post.slug}>
                  <Link href={`/blogs/${post.slug}`} className={styles.article}>
                    <div className={styles.thumbnail}><Image src={details.image} alt="" fill sizes="(max-width: 700px) 80px, 180px" className={styles.thumbnailPhoto} /></div>
                    <div className={styles.articleCopy}>
                      <span className={styles.category}>{details.category}</span>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <div className={styles.articleMeta}><time dateTime={post.date}>{formatDate(post.date)}</time><span>{details.readTime}</span></div>
                    </div>
                    <ArrowUpRight className={styles.articleArrow} size={22} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
