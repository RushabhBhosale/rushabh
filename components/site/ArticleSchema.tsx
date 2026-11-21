import { PERSON_ID, abs, breadcrumb, jsonLd } from "@/lib/seo";
import { blogPosts } from "@/app/(main)/blogs/index";

/* Emits BlogPosting + breadcrumb JSON-LD for an MDX article, from the entry in blogs/index.ts. */
export default function ArticleSchema({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  const url = abs(`/blogs/${slug}`);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd([
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.title,
            description: post.description,
            url,
            mainEntityOfPage: url,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: "en-IN",
            image: abs("/me.png"),
            author: { "@id": PERSON_ID },
            publisher: { "@id": PERSON_ID },
          },
          breadcrumb([
            { name: "Home", path: "/home" },
            { name: "Writing", path: "/blogs" },
            { name: post.title, path: `/blogs/${slug}` },
          ]),
        ]),
      }}
    />
  );
}
