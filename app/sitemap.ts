import type { MetadataRoute } from "next";
import { blogPosts } from "./(main)/blogs/index";
import { SITE_URL } from "@/lib/seo";
import { hirePages } from "@/utils/hire";
import { work } from "@/utils/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, lastModified: Date = now): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    priority,
  });

  return [
    page("/home", 1),
    page("/hire", 0.9),
    ...hirePages.map((p) => page(`/hire/${p.slug}`, 0.9)),
    page("/about", 0.8),
    page("/work", 0.8),
    ...work.map((w) => page(`/work/${w.slug}`, 0.7)),
    page("/blogs", 0.7),
    ...blogPosts.map((b) => page(`/blogs/${b.slug}`, 0.6, new Date(b.date))),
    page("/contact", 0.8),
    page("/rushabh-bhosale", 0.6),
    page("/tools/site-inspector", 0.4),
  ];
}
