// Every project on the site lives here. Screenshots live in /public/work/<slug>/ and
// were captured from the live sites; swap or add files there and list them in `shots`.
// Projects without screenshots fall back to a generated poster.

export type Discipline = "Web" | "Mobile" | "Desktop" | "Automation";

export type Shots = {
  /** Desktop screenshots, shown in a browser frame. The first one is the cover. */
  desktop?: string[];
  /** A phone-sized screenshot, shown in a phone frame. */
  mobile?: string;
  /** A standalone illustration or image, shown without a frame. */
  art?: string;
};

export type Work = {
  slug: string;
  title: string;
  /** One-line hook shown under the title. */
  line: string;
  summary: string;
  detail: string;
  discipline: Discipline;
  /** Short label, e.g. "Developer tools". */
  category: string;
  stack: string[];
  role: string;
  year?: string;
  live?: string;
  github?: string;
  /** Long-form write-up on the blog, if one exists. */
  story?: string;
  shots?: Shots;
  /** Background behind the framed screenshots. */
  color: string;
  /** Placeholder poster colours when there are no shots: [background, glow]. */
  tone: [string, string];
  featured?: boolean;
};

export const work: Work[] = [
  {
    slug: "clipnote",
    title: "ClipNote",
    line: "Good ideas deserve a second copy.",
    summary: "A lightweight clipboard manager for the things you keep coming back to.",
    detail:
      "Organize, transform, search, and reuse copied content without breaking your flow. Format JSON, decode JWTs, parse URLs and keep a local, searchable history — built to stay out of the way until the moment you need it.",
    discipline: "Desktop",
    category: "Productivity",
    stack: ["Desktop app", "Search"],
    role: "Design & development",
    live: "https://clipnote-rb.vercel.app/",
    github: "https://github.com/RushabhBhosale/clipnote",
    shots: {
      desktop: ["/work/clipnote/desktop-1.jpg", "/work/clipnote/desktop-2.jpg", "/work/clipnote/desktop-3.jpg"],
      mobile: "/work/clipnote/mobile.jpg",
    },
    color: "#4b43b8",
    tone: ["#1c1a22", "#8a7cf0"],
    featured: true,
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    line: "Less entering. More understanding.",
    summary: "Bank alerts become transactions you can review, rather than another task to remember.",
    detail:
      "A native Kotlin SMS listener and deterministic parser turn bank messages into draft transactions. Everything is local-first, reviewed before it enters the ledger, and synced to a Next.js + MongoDB backend for analytics.",
    discipline: "Mobile",
    category: "Android automation",
    stack: ["React Native", "Kotlin", "Next.js API", "MongoDB"],
    role: "Design & development",
    year: "2026",
    github: "https://github.com/RushabhBhosale/memory",
    story: "/blogs/expense-tracker-sms-automation",
    shots: { art: "/projects/expense-tracking.svg" },
    color: "#1d7a6c",
    tone: ["#161d1f", "#3fb8a6"],
    featured: true,
  },
  {
    slug: "animesparks",
    title: "AnimeSparks",
    line: "Built for the stories worth telling.",
    summary: "An editorial home for anime reviews, analysis, and long-form storytelling.",
    detail:
      "Next.js and Sanity connect a publishing workflow with search-friendly, reader-focused pages. SEO-first structure, fast reading pages, and a CMS that keeps writing the main job.",
    discipline: "Web",
    category: "Independent publishing",
    stack: ["Next.js", "Sanity", "TypeScript", "Technical SEO"],
    role: "Founder, design & development",
    live: "https://www.animesparks.blog/",
    github: "https://github.com/RushabhBhosale/blog",
    shots: {
      desktop: [
        "/work/animesparks/desktop-1.jpg",
        "/work/animesparks/desktop-2.jpg",
        "/work/animesparks/desktop-3.jpg",
      ],
      mobile: "/work/animesparks/mobile.jpg",
    },
    color: "#b8361c",
    tone: ["#231817", "#ff5b24"],
    featured: true,
  },
  {
    slug: "movie-watchlist",
    title: "Movie Watchlist",
    line: "Every film, in its place.",
    summary: "Track your favourite movies, manage watch status, and get smart recommendations.",
    detail:
      "Categorised lists, notes and reviews, TMDB metadata, real-time status updates, and daily recommendations generated with an LLM — a minimal tracker without the ads and bloat.",
    discipline: "Web",
    category: "Personal product",
    stack: ["Next.js", "Tailwind CSS", "MongoDB", "TMDB API", "OpenRouter"],
    role: "Design & development",
    year: "2025",
    live: "https://movies-neon-eight-38.vercel.app/",
    github: "https://github.com/RushabhBhosale/Movies",
    story: "/blogs/movie-watchlist-app",
    shots: {
      desktop: [
        "/work/movie-watchlist/desktop-1.jpg",
        "/work/movie-watchlist/desktop-2.jpg",
        "/work/movie-watchlist/desktop-3.jpg",
      ],
      mobile: "/work/movie-watchlist/mobile.jpg",
    },
    color: "#2b4a6b",
    tone: ["#1f1719", "#e2577a"],
    featured: true,
  },
  {
    slug: "blog-automation",
    title: "n8n Blog Engine",
    line: "Type a topic. Get a published post.",
    summary: "An n8n workflow that researches, writes, and publishes a blog post in 10–15 minutes.",
    detail:
      "Keyword research through Google Suggest, title and ~800-word drafts through OpenRouter, markdown formatting, imagery, and publishing — the whole grind handed to a workflow.",
    discipline: "Automation",
    category: "AI workflow",
    stack: ["n8n", "OpenRouter", "Markdown", "Next.js"],
    role: "Workflow design",
    year: "2025",
    github: "https://github.com/RushabhBhosale/ecommerce",
    story: "/blogs/automated-blog-n8n-ai",
    shots: { desktop: ["/projects/blog.png"] },
    color: "#5d6b22",
    tone: ["#1c1b16", "#d4ff3a"],
  },
  {
    slug: "travel-archive",
    title: "Travel Memory Archive",
    line: "Five journeys, kept.",
    summary: "A visual travel archive of stories and photo galleries from five journeys across India.",
    detail:
      "An image-led archive that treats each trip as a chapter — galleries, short stories, and a calm reading pace.",
    discipline: "Web",
    category: "Visual archive",
    stack: ["Web", "Photo galleries"],
    role: "Design & development",
    live: "https://trip-new.vercel.app/",
    github: "https://github.com/RushabhBhosale/trip-new",
    shots: {
      desktop: [
        "/work/travel-archive/desktop-1.jpg",
        "/work/travel-archive/desktop-2.jpg",
        "/work/travel-archive/desktop-3.jpg",
      ],
      mobile: "/work/travel-archive/mobile.jpg",
    },
    color: "#8a6a3b",
    tone: ["#171c22", "#5aa0e6"],
  },
  {
    slug: "ai-travel-planner",
    title: "AI Travel Planner",
    line: "Somewhere new, planned in seconds.",
    summary: "Explore destinations, generate itineraries, and visualise trips using AI and maps.",
    detail:
      "Destination discovery, AI-generated day-by-day itineraries, and a map view that puts the whole trip in one place.",
    discipline: "Web",
    category: "AI product",
    stack: ["Next.js", "AI", "Maps"],
    role: "Design & development",
    github: "https://github.com/RushabhBhosale/travel-app",
    color: "#3d6a4a",
    tone: ["#1a1d18", "#9cc36a"],
  },
  {
    slug: "site-inspector",
    title: "Site Inspector",
    line: "Look under any website’s hood.",
    summary: "Paste a URL and see its frameworks, fonts, colours, assets, and SEO basics.",
    detail:
      "A headless browser renders the page server-side and reports what it is made of — frameworks, theme colours, font files, stylesheets, icons, and metadata — in one readable sheet.",
    discipline: "Web",
    category: "Developer tool",
    stack: ["Next.js API", "Playwright", "Chromium"],
    role: "Design & development",
    live: "/tools/site-inspector",
    shots: { desktop: ["/projects/site-inspector.png"] },
    color: "#3a3a37",
    tone: ["#1d1a17", "#ff8a4c"],
  },
];

export const featuredWork = work.filter((w) => w.featured);

export const disciplines: Discipline[] = ["Web", "Mobile", "Desktop", "Automation"];

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}

export function getNextWork(slug: string) {
  const i = work.findIndex((w) => w.slug === slug);
  return work[(i + 1) % work.length];
}

export const indexOf = (slug: string) => String(work.findIndex((w) => w.slug === slug) + 1).padStart(2, "0");

/** Domain shown in the browser frame's address bar. */
export const siteLabel = (w: Work) =>
  w.live?.startsWith("http") ? new URL(w.live).hostname.replace(/^www\./, "") : `rushabh.in${w.live ?? ""}`;
