import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false as const,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      { protocol: "https" as const, hostname: "source.unsplash.com" },
    ],
  },
  // Routes retired in the redesign.
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/portfolio", destination: "/home", permanent: true },
      { source: "/switchyard", destination: "/home", permanent: true },
    ];
  },
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
