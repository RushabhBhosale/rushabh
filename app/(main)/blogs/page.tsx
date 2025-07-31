import Link from "next/link";
import { blogPosts } from "./index";

const BlogsPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">All Blog Posts</h1>
      <ul className="space-y-6">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blogs/${post.slug}`}
              className="block group border border-border rounded-xl p-6 hover:bg-muted/40 transition"
            >
              <h2 className="text-xl font-semibold group-hover:text-primary transition">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm mt-2 text-muted-foreground">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default BlogsPage;
