import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import Link from "next/link";

const components: MDXComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      className="text-2xl md:text-4xl text-primary font-bold mt-5 mb-3"
      {...props}
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="text-xl md:text-3xl font-semibold mt-5 mb-3" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="text-lg md:text-2xl font-semibold mt-4 mb-2" {...props} />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4 className="text-base md:text-xl font-medium mt-4 mb-2" {...props} />
  ),
  h5: (props: ComponentProps<"h5">) => (
    <h5 className="text-sm md:text-lg font-medium mt-3 mb-1" {...props} />
  ),
  h6: (props: ComponentProps<"h6">) => (
    <h6 className="text-sm font-medium mt-3 mb-1" {...props} />
  ),

  p: (props: ComponentProps<"p">) => (
    <p className="text-sm md:text-base leading-relaxed mb-4" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <Link
      href=""
      {...props}
      className="text-blue-500 hover:underline dark:text-blue-400 text-sm md:text-base"
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="list-disc ml-5 mb-4 text-sm md:text-base" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="list-decimal ml-5 mb-4 text-sm md:text-base" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li className="mb-1" {...props} />,

  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-gray-400 pl-4 italic text-gray-600 dark:text-gray-300 my-4 text-sm md:text-base"
      {...props}
    />
  ),

  code: (props: ComponentProps<"code">) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 text-pink-600 px-1 py-0.5 rounded text-xs md:text-sm"
      {...props}
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="bg-black text-white text-xs md:text-sm rounded-md p-3 md:p-4 overflow-x-auto mb-4"
      {...props}
    />
  ),

  img: (props: ComponentProps<"img">) => (
    <img
      {...props}
      className="rounded-lg my-4 border border-zinc-700 w-full max-w-2xl mx-auto"
      alt={props.alt || "image"}
    />
  ),

  hr: () => (
    <hr className="my-6 border-t border-gray-300 dark:border-gray-600" />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
