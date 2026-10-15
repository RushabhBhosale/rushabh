import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import Link from "next/link";

/* Article typography lives in styles/pages.css under `.prose-rb`;
   only links need behaviour here. */
const components: MDXComponents = {
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ),
  img: (props: ComponentProps<"img">) => (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...props} alt={props.alt || ""} />
      {props.alt && <figcaption>{props.alt}</figcaption>}
    </figure>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
