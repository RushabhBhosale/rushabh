// Selected-work copy is grounded in the existing portfolio and local product sources.
// Product studies are illustrations, never presented as application screenshots.
export type Station = {
  id: string;
  name: string;
  platform: string;
  line: string;
  description: string;
  detail: string;
  href: string;
  action: string;
  github?: string;
  surface: "stackport" | "clipnote" | "anime" | "headline" | "expense";
};
export const stations: Station[] = [
  {
    id: "stackport",
    name: "StackPort",
    platform: "DESKTOP / DEVELOPER TOOLS",
    line: "Less setup. More building.",
    description:
      "A home for local projects, services, and the workflows that get them running.",
    detail:
      "Bring project context, service controls, Git status, and saved sessions into one desktop workspace.",
    href: "mailto:bhosalerushabh0@gmail.com?subject=Show%20me%20StackPort",
    action: "Ask for a walkthrough",
    surface: "stackport",
  },
  {
    id: "clipnote",
    name: "ClipNote",
    platform: "DESKTOP / PRODUCTIVITY",
    line: "Good ideas deserve a second copy.",
    description:
      "A lightweight clipboard manager for the things you keep coming back to.",
    detail:
      "Organize, transform, search, and reuse copied content without breaking your flow.",
    href: "https://clipnote-rb.vercel.app/",
    action: "Explore ClipNote",
    github: "https://github.com/RushabhBhosale/clipnote",
    surface: "clipnote",
  },
  {
    id: "animesparks",
    name: "AnimeSparks",
    platform: "WEB / INDEPENDENT PUBLISHING",
    line: "Built for the stories worth telling.",
    description:
      "An editorial home for anime reviews, analysis, and long-form storytelling.",
    detail:
      "Next.js and Sanity connect a publishing workflow with search-friendly, reader-focused pages.",
    href: "https://www.animesparks.blog/",
    action: "Visit AnimeSparks",
    github: "https://github.com/RushabhBhosale/blog",
    surface: "anime",
  },
  {
    id: "headline",
    name: "Headline Thread",
    platform: "WEB / EDITORIAL SYSTEMS",
    line: "From a headline to the whole story.",
    description:
      "An independent publication built around stories with context.",
    detail:
      "A Next.js and Sanity publishing system connecting articles, imagery, metadata, and discovery.",
    href: "https://www.headlinethread.co.in/",
    action: "Read Headline Thread",
    github: "https://github.com/RushabhBhosale/headline",
    surface: "headline",
  },
  {
    id: "expense",
    name: "Expense Tracker",
    platform: "MOBILE / ANDROID AUTOMATION",
    line: "Less entering. More understanding.",
    description:
      "Bank alerts become transactions you can review, rather than another task to remember.",
    detail:
      "Native SMS detection, careful parsing, local storage, and a review step before anything enters the ledger.",
    href: "/blogs/expense-tracker-sms-automation",
    action: "Read the build story",
    github: "https://github.com/RushabhBhosale/memory",
    surface: "expense",
  },
];
export const contactLinks = [
  { label: "Email", href: "mailto:bhosalerushabh0@gmail.com" },
  { label: "GitHub", href: "https://github.com/RushabhBhosale" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rushabh-bhosale-software-developer/",
  },
  { label: "Résumé", href: "/Rushabh%20Resume.pdf" },
];
