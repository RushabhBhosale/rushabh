import React from "react";
import { blogPosts } from "../../blogs";
import Link from "next/link";

const Blogs = () => {
  return (
    <section className="w-full max-w-6xl px-6 py-16 mx-auto my-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Latest Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogPosts?.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group border border-border rounded-xl p-6 bg-muted dark:bg-muted/30 shadow-2xl/10"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-muted-foreground text-sm mt-1">
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
