import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import Link from "next/link";

const components: MDXComponents = {
  // Headings with better hierarchy and visual appeal
  h1: (props: ComponentProps<"h1">) => (
    <h1
      className="text-3xl md:text-5xl text-primary font-bold mt-8 mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight"
      {...props}
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="text-2xl md:text-4xl font-bold mt-12 mb-4 text-gray-900 dark:text-gray-100 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-primary after:to-primary/50 after:rounded-full"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="text-xl md:text-3xl font-semibold mt-10 mb-4 text-gray-800 dark:text-gray-200 border-l-4 border-primary pl-4 bg-gradient-to-r from-primary/5 to-transparent py-2"
      {...props}
    />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4
      className="text-lg md:text-2xl font-semibold mt-8 mb-3 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  h5: (props: ComponentProps<"h5">) => (
    <h5
      className="text-base md:text-xl font-medium mt-6 mb-2 text-gray-600 dark:text-gray-400"
      {...props}
    />
  ),
  h6: (props: ComponentProps<"h6">) => (
    <h6
      className="text-sm md:text-lg font-medium mt-4 mb-2 text-gray-500 dark:text-gray-500 uppercase tracking-wider"
      {...props}
    />
  ),

  // Enhanced paragraph with better readability
  p: (props: ComponentProps<"p">) => (
    <p
      className="text-base md:text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300 max-w-none"
      {...props}
    />
  ),

  // Styled links with hover effects
  a: (props: ComponentProps<"a">) => (
    <Link
      href=""
      {...props}
      className="text-primary hover:text-primary/80 dark:text-primary-light underline decoration-2 underline-offset-2 hover:decoration-primary/60 transition-all duration-200 font-medium"
    />
  ),

  // Enhanced lists with better spacing
  ul: (props: ComponentProps<"ul">) => (
    <ul
      className="list-none ml-0 mb-6 space-y-2 text-base md:text-lg"
      {...props}
    />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="list-none counter-reset-[item] ml-0 mb-6 space-y-2 text-base md:text-lg"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => (
    <li
      className="relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold before:text-xl leading-relaxed text-gray-700 dark:text-gray-300 [counter-increment:item] [&:has(ol)]:before:content-[counter(item)'.'] [&:has(ol)]:before:text-base [&:has(ol)]:before:font-semibold"
      {...props}
    />
  ),

  // Beautiful blockquote with better styling
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent pl-6 pr-4 py-2 italic text-gray-600 dark:text-gray-300 my-8 text-base md:text-lg rounded-r-lg relative before:content-[''] before:text-4xl before:text-primary/40 before:absolute before:-top-2 before:left-2 before:font-serif"
      {...props}
    />
  ),

  // Enhanced code styling
  code: (props: ComponentProps<"code">) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded-md text-sm md:text-base font-mono border border-gray-200 dark:border-gray-700"
      {...props}
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <div className="relative group">
      <pre
        className="bg-gray-900 dark:bg-gray-950 text-gray-100 text-sm md:text-base rounded-lg p-4 md:p-6 overflow-x-auto mb-6 border border-gray-700 shadow-lg"
        {...props}
      />
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-gray-400 hover:text-gray-200 text-sm bg-gray-800 px-2 py-1 rounded">
          Copy
        </button>
      </div>
    </div>
  ),

  // Enhanced image with better presentation
  img: (props: ComponentProps<"img">) => (
    <div className="my-8 group">
      <img
        {...props}
        className="rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-4xl mx-auto transition-transform duration-300 group-hover:scale-[1.02]"
        alt={props.alt || "image"}
      />
      {props.alt && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
          {props.alt}
        </p>
      )}
    </div>
  ),

  // Styled horizontal rule
  hr: () => (
    <div className="my-12 flex items-center justify-center">
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
      <div className="px-4">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
      </div>
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
    </div>
  ),

  // Enhanced table styling (bonus)
  table: (props: ComponentProps<"table">) => (
    <div className="overflow-x-auto my-8">
      <table
        className="w-full border-collapse bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
        {...props}
      />
    </div>
  ),
  thead: (props: ComponentProps<"thead">) => (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700"
      {...props}
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td
      className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
