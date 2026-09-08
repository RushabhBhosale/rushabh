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
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
