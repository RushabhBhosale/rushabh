import React from "react";
import { blogPosts } from "../../blogs";
import Link from "next/link";

const Blogs = () => {
  return (
    <section className="w-full max-w-6xl px-6 mt-20 mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Latest Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {blogPosts?.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group border border-border/60 rounded-xl p-5 bg-card hover:shadow-lg hover:border-border transition-all duration-300"
          >
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-xs mt-1">
              {new Date(post.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
