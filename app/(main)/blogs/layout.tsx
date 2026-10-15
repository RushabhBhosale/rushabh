import BlogFrame from "@/components/site/BlogFrame";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogFrame>{children}</BlogFrame>;
}
