import Link from "next/link";
import { blogPosts } from "./index";

const BlogsPage = () => {
  return (
    <main className="max-w-4xl mx-auto md:px-6 md:py-16">
      <ul className="grid gap-6 sm:gap-8">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blogs/${post.slug}`}
              className="block group border border-border rounded-xl p-4 sm:p-6 bg-background hover:shadow-md hover:scale-[1.01] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2">
                <h2 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition">
                  {post.title}
                </h2>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded w-max">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-snug">
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
