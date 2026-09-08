import Link from "next/link";
import Journey from "@/components/switchyard/Journey";
import { experience } from "@/utils/experience";
import { blogPosts } from "../blogs/index";

export default function Home() {
  return (
    <div className="switchyard">
      <Journey />
      <section
        id="experiments"
        className="experiments section-pad"
        aria-labelledby="experiments-heading"
      >
        <div className="section-line mono">
          <span>03 / THE SIDE ROUTES</span>
          <span>SMALL TOOLS. OPEN QUESTIONS.</span>
        </div>
        <div className="editorial-heading">
          <h2 id="experiments-heading">
            Follow the
            <br />
            <em>what if.</em>
          </h2>
          <p>
            Some ideas become products.
            <br />
            Others make the next idea possible.
            <br />I keep both.
          </p>
        </div>
        <div className="experiment-list">
          <Link href="/tools/site-inspector">
            <span className="mono">01 / INSPECT</span>
            <h3>Site Inspector</h3>
            <p>
              Look beneath the page. Frameworks, fonts, colors, assets, and SEO.
            </p>
            <span className="route-arrow">↗</span>
          </Link>
          <Link href="/blogs/automated-blog-n8n-ai">
            <span className="mono">02 / AUTOMATE</span>
            <h3>
              Less repetition.
              <br />
              More possibility.
            </h3>
            <p>
              Automation tools and an n8n publishing workflow, from topic to
              article.
            </p>
            <span className="route-arrow">↗</span>
          </Link>
          <a href="https://trip-new.vercel.app/">
            <span className="mono">03 / REMEMBER</span>
            <h3>Travel Memory Archive</h3>
            <p>
              Five journeys across India, told through stories and photographs.
            </p>
            <span className="route-arrow">↗</span>
          </a>
          <Link href="/projects">
            <span className="mono">04 / EXPLORE</span>
            <h3>The rest of the work</h3>
            <p>
              A movie watchlist, an AI travel planner, and more independent
              builds.
            </p>
            <span className="route-arrow">↗</span>
          </Link>
        </div>
      </section>
      <section
        id="writing"
        className="writing section-pad"
        aria-labelledby="writing-heading"
      >
        <div className="section-line mono">
          <span>04 / DISPATCHES</span>
          <Link href="/blogs" className="text-link">
            ALL WRITING ↗
          </Link>
        </div>
        <div className="editorial-heading">
          <h2 id="writing-heading">
            Notes from
            <br />
            <em>the making.</em>
          </h2>
          <p>
            What worked. What broke.
            <br />
            What I learned along the way.
          </p>
        </div>
        <div className="dispatches">
          {blogPosts.slice(0, 3).map((post, i) => (
            <Link href={`/blogs/${post.slug}`} key={post.slug}>
              <div className="dispatch-date mono">
                <span>0{i + 1}</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </div>
              <div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
              <span className="route-arrow">↗</span>
            </Link>
          ))}
        </div>
        <p className="writing-note">
          Building is how I think. <em>Writing is how I understand.</em>
        </p>
      </section>
      <section
        id="experience"
        className="history section-pad"
        aria-labelledby="history-heading"
      >
        <div className="section-line mono">
          <span>05 / ROUTE HISTORY</span>
          <a href="/Rushabh%20Resume.pdf" className="text-link">
            FULL RÉSUMÉ ↗
          </a>
        </div>
        <div className="history-layout">
          <div className="history-intro">
            <h2 id="history-heading">
              The work
              <br />
              behind
              <br />
              <em>the work.</em>
            </h2>
            <p>
              I’m Rushabh, a software developer in Mumbai. My route started in
              media and search, and led to building products across web, mobile,
              and desktop.
            </p>
            <Link href="/about" className="text-link">
              MORE ABOUT ME ↗
            </Link>
          </div>
          <ol className="history-stops">
            {experience.map((job, i) => (
              <li key={job.title}>
                <span className="history-dot" />
                <span className="mono">
                  {job.time}
                  {i === 0 && <b> CURRENT</b>}
                </span>
                <h3>{job.title}</h3>
                <span className="history-role">{job.role}</span>
                <p>{job.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
