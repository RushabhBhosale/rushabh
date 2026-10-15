export const capabilities = [
  {
    title: "Web platforms",
    description:
      "Fast, search-friendly products and publishing systems — from the interface to the API behind it.",
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Angular"],
  },
  {
    title: "Mobile apps",
    description:
      "Cross-platform apps that feel native, with real native modules when the platform demands it.",
    stack: ["React Native", "Ionic", "Kotlin / Android SDK", "SQLite"],
  },
  {
    title: "Backend & APIs",
    description:
      "Data models, REST APIs and the plumbing that keeps products honest and reliable.",
    stack: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    title: "Automation & search",
    description:
      "Workflows that remove busywork, and the SEO and content structure that help people find the result.",
    stack: ["n8n", "AI workflows", "Technical SEO", "Sanity CMS"],
  },
];

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
