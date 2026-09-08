import Link from "next/link";
import { blogPosts } from "./index";
export const metadata = { title: "Writing — Rushabh Bhosale" };
export default function BlogsPage() {
  return (
    <div className="switchyard writing writing-index">
      <div className="section-line mono">
        <span>DISPATCHES / THE COMPLETE INDEX</span>
      </div>
      <div className="editorial-heading">
        <h1>
          Notes from
          <br />
          <em>the making.</em>
        </h1>
      </div>
      <div className="dispatches">
        {blogPosts.map((post, i) => (
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
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
            <span className="route-arrow">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
