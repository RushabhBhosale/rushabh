// Every project on the site lives here. Screenshots live in /public/work/<slug>/ and
// were captured from the live sites; swap or add files there and list them in `shots`.
// Projects without screenshots fall back to a generated poster.

export type Discipline = "Web" | "Mobile" | "Desktop" | "Automation";

export type Shots = {
  /** Desktop screenshots, shown in a browser frame. The first one is the cover. */
  desktop?: string[];
  /** A phone-sized screenshot, shown in a phone frame. */
  mobile?: string;
  /** Several phone screenshots for an app with no desktop view; shown fanned out together. */
  phones?: string[];
  /** App store graphics (artwork that already includes a device); shown as rounded
   *  cards, fanned out on the cover and in a grid on the case study. */
  cards?: string[];
  /** Cover composition. "devices" puts the first phone shot in front of the first
   *  desktop shot; otherwise the first desktop shot (or the phones) is the cover. */
  cover?: "devices";
  /** A drawn stand-in for work whose real screens are private. */
  mock?: "ble" | "care";
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
  /** App store listings. */
  stores?: { label: string; href: string }[];
  shots?: Shots;
  /** Background behind the framed screenshots. */
  color: string;
  /** Placeholder poster colours when there are no shots: [background, glow]. */
  tone: [string, string];
  featured?: boolean;
  /** A caveat shown with the facts, e.g. why the visuals are illustrations. */
  note?: string;
  /** What I did, one line each. */
  contributions?: string[];
  /** How the system fits together, drawn as a chain of steps or a hub with spokes. */
  flow?: { title: string; kind: "chain" | "hub"; nodes: { label: string; note: string }[] };
  challenges?: { title: string; problem: string; solution: string }[];
  /** Feature areas of a larger product. */
  modules?: { title: string; items: string }[];
};

export const work: Work[] = [
  {
    slug: "peracto-hrms",
    title: "Peracto HRMS",
    line: "Workforce management, unified.",
    summary:
      "A multi-module HR platform for employees, attendance, leave, projects, payroll, performance and visitors — on web and mobile.",
    detail:
      "Full-stack work across a Next.js, React and TypeScript web app, a Node.js and MongoDB backend served over REST APIs, and a Flutter app for attendance, leave and everyday employee tasks. Every module carries its own business workflow, under role-based access control across the platform.",
    discipline: "Web",
    category: "Enterprise SaaS — HR",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Flutter", "REST APIs"],
    role: "Full-stack developer",
    live: "https://hrms.peractoinfotech.com/",
    shots: {
      desktop: ["/work/peracto-hrms/desktop-1.jpg", "/work/peracto-hrms/desktop-2.jpg", "/work/peracto-hrms/desktop-3.jpg"],
      phones: ["/work/peracto-hrms/mobile-1.jpg", "/work/peracto-hrms/mobile-2.jpg", "/work/peracto-hrms/mobile-3.jpg"],
      cover: "devices",
    },
    color: "#3a4c8f",
    tone: ["#16181f", "#7d93ff"],
    featured: true,
    note: "Screens are from my own employee account, on the web app and the Flutter app.",
    modules: [
      { title: "Employee management", items: "Profiles, onboarding, documents, role-based access control and employee archiving." },
      { title: "Attendance & leave", items: "Punch in/out, attendance tracking, leave requests, approval workflows and attendance reports." },
      { title: "Projects", items: "Project assignments, client and vendor management, and employee work tracking." },
      { title: "Finance & payroll", items: "Salary management, expense tracking, reimbursements, invoices and TDS." },
      { title: "Performance", items: "Employee KRAs, performance evaluations and question banks." },
      { title: "Visitor management", items: "A reception module for clients, vendors, guests and deliveries." },
      { title: "Reports & analytics", items: "Attendance, project, leave, salary and employee performance reports." },
      { title: "Mobile app", items: "A Flutter app for attendance, leave and essential employee workflows." },
    ],
    contributions: [
      "Developed and maintained the web platform with Next.js, React and TypeScript.",
      "Built backend features in Node.js and MongoDB, exposed through REST APIs.",
      "Implemented role-based access control across the platform’s modules.",
      "Built attendance, leave and approval workflows.",
      "Built finance, payroll, performance and visitor management modules.",
      "Built reporting across attendance, projects, leave, salary and performance.",
      "Developed the Flutter mobile app for attendance, leave and core employee workflows.",
    ],
    flow: {
      title: "One backend, two clients",
      kind: "hub",
      nodes: [
        { label: "Node.js REST APIs", note: "Business logic & workflows" },
        { label: "Web app", note: "Next.js · React · TypeScript" },
        { label: "Mobile app", note: "Flutter" },
        { label: "MongoDB", note: "Records for every module" },
        { label: "Access control", note: "Permissions by role" },
      ],
    },
    challenges: [
      {
        title: "Many modules, one product",
        problem: "HR, attendance, projects, finance, performance and reception each have their own workflows, yet they all concern the same people and organisation.",
        solution: "Each area is built as a module on one shared stack, with reports that span attendance, projects, leave, salary and performance.",
      },
      {
        title: "Who sees what",
        problem: "HR and salary data is sensitive, and every role needs a different view of it.",
        solution: "Role-based access control governs what each user can see and do across modules.",
      },
      {
        title: "Workflows, not just records",
        problem: "Leave and attendance move through requests and approvals rather than sitting as static records.",
        solution: "Punch in/out, leave requests and approval workflows, feeding attendance and leave reports.",
      },
      {
        title: "Work happens off the desk",
        problem: "Employees need to punch in and apply for leave from wherever they are.",
        solution: "A Flutter app focused on attendance, leave and essential employee workflows, alongside the web platform.",
      },
    ],
  },
  {
    slug: "activex",
    title: "ActiveX",
    line: "From a smart scale to a health report.",
    summary: "A cross-platform app that connects to Bluetooth body composition devices and turns each measurement into a health report.",
    detail:
      "Custom Capacitor plugins bridge the devices’ native Android and iOS SDKs into an Ionic + Angular app — handling BLE discovery, connection and measurement, then processing body fat, muscle mass, BMI, BMR, visceral fat and body water into detailed, exportable reports for users and clinics.",
    discipline: "Mobile",
    category: "HealthTech — BLE & IoT",
    stack: ["Ionic", "Angular", "TypeScript", "Capacitor", "Kotlin", "Java", "Swift", "BLE"],
    role: "Mobile application developer",
    stores: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.iosx.activex" }],
    shots: {
      phones: ["/work/activex/mobile-1.jpg", "/work/activex/mobile-2.jpg", "/work/activex/mobile-3.jpg"],
    },
    color: "#1f8a73",
    tone: ["#12201c", "#4fd1b0"],
    featured: true,
    note: "Professional work. The code is private; the screens are from the app’s Google Play listing.",
    contributions: [
      "Integrated Bluetooth body composition devices using their native Android and iOS SDKs.",
      "Built custom Capacitor plugins to bridge those native SDKs into the Ionic app.",
      "Implemented BLE device discovery, connection management and measurement workflows.",
      "Processed health metrics: body fat %, muscle mass, BMI, BMR, visceral fat and body water.",
      "Built detailed body composition reports with PDF export.",
      "Implemented device management and clinic-specific workflows.",
      "Improved Android compatibility, including support for 16 KB memory page sizes.",
    ],
    flow: {
      title: "BLE measurement workflow",
      kind: "chain",
      nodes: [
        { label: "Smart device", note: "Body composition over BLE" },
        { label: "Native SDKs", note: "Kotlin / Java · Swift" },
        { label: "Capacitor plugins", note: "Custom native bridge" },
        { label: "Ionic + Angular", note: "Discovery, connection, measuring" },
        { label: "Health report", note: "Metrics & PDF export" },
      ],
    },
    challenges: [
      {
        title: "One app, two native SDKs",
        problem: "The devices are driven through native Android and iOS SDKs, while the app itself is built with Ionic and Angular.",
        solution: "Custom Capacitor plugins written in Kotlin, Java and Swift wrap each SDK and expose a single TypeScript interface to the app.",
      },
      {
        title: "Bluetooth, start to finish",
        problem: "A reading depends on finding the right device, holding the connection, and seeing the measurement through.",
        solution: "BLE discovery, connection management and a guided measurement workflow, alongside device management for each setup.",
      },
      {
        title: "Readings people can act on",
        problem: "Raw measurements mean little to users or healthcare professionals on their own.",
        solution: "Metrics are processed into detailed body composition reports, with PDF export and clinic-specific workflows.",
      },
      {
        title: "Keeping pace with Android",
        problem: "Newer Android devices use 16 KB memory pages, which native code has to support.",
        solution: "Compatibility work across the Android build, including 16 KB page-size support.",
      },
    ],
  },
  {
    slug: "healthnovo",
    title: "Healthnovo",
    line: "Connected care, on every phone.",
    summary: "A healthcare app connecting patients and doctors through video consultations, payments and timely notifications.",
    detail:
      "Ongoing development and modernisation of a cross-platform React Native app: upgrading dependencies, maintaining native Android and iOS configuration, and integrating Firebase Cloud Messaging, Agora video consultations and Razorpay payments on top of the platform’s REST APIs.",
    discipline: "Mobile",
    category: "Healthcare platform",
    stack: ["React Native", "JavaScript", "Firebase", "Agora SDK", "Razorpay", "Android", "iOS", "REST APIs"],
    role: "Full-stack / mobile developer",
    live: "https://healthnovoindia.com/",
    stores: [
      { label: "HN Plus — Google Play", href: "https://play.google.com/store/apps/details?id=com.healthnovoindia.healthnovoplus" },
      { label: "HN Care — Google Play", href: "https://play.google.com/store/apps/details?id=com.healthnovoindia.healthnovodoc" },
    ],
    shots: {
      cards: [
        "/work/healthnovo/card-1.jpg",
        "/work/healthnovo/card-2.jpg",
        "/work/healthnovo/card-3.jpg",
        "/work/healthnovo/card-4.jpg",
        "/work/healthnovo/card-5.jpg",
        "/work/healthnovo/card-6.jpg",
      ],
    },
    color: "#2f6fb0",
    tone: ["#121a24", "#7cc242"],
    featured: true,
    note: "Professional work. The code is private; the screens are from the HN Plus and HN Care Google Play listings.",
    contributions: [
      "Developed and maintained the cross-platform app in React Native.",
      "Integrated Firebase Cloud Messaging for push notifications.",
      "Worked on video consultations with the Agora SDK.",
      "Integrated Razorpay for payment processing.",
      "Implemented native Android and iOS configuration.",
      "Migrated and upgraded React Native dependencies for compatibility and maintainability.",
      "Worked with REST APIs across the app’s healthcare workflows.",
    ],
    flow: {
      title: "How the integrations fit",
      kind: "hub",
      nodes: [
        { label: "React Native app", note: "Android · iOS" },
        { label: "Firebase Cloud Messaging", note: "Push notifications" },
        { label: "Agora SDK", note: "Video consultations" },
        { label: "Razorpay", note: "Payments" },
        { label: "REST APIs", note: "Healthcare workflows" },
      ],
    },
    challenges: [
      {
        title: "Modernising a working app",
        problem: "An established React Native codebase whose older dependencies made compatibility and upkeep harder.",
        solution: "Migrated and upgraded React Native dependencies to improve compatibility and maintainability across Android and iOS.",
      },
      {
        title: "Two platforms, one feature set",
        problem: "Each integration needs its own native setup on Android and on iOS.",
        solution: "Implemented and maintained the native Android and iOS configuration behind every integration.",
      },
      {
        title: "Consultations over video",
        problem: "Patients and doctors need to meet face to face without leaving the app.",
        solution: "Worked on in-app video consultation built on the Agora SDK.",
      },
      {
        title: "Payments and notifications",
        problem: "Paying for care and staying informed both have to work reliably inside the app.",
        solution: "Integrated Razorpay for payments and Firebase Cloud Messaging for push notifications.",
      },
    ],
  },
  {
    slug: "rajesh-renewed",
    title: "Rajesh Renewed",
    line: "Premium laptops, second time round.",
    summary:
      "An online store for certified refurbished laptops and accessories, with checkout, order tracking and a full admin console.",
    detail:
      "A Next.js storefront and management console on MongoDB. Shoppers browse by price band, category and brand, choose a configuration, and pay through Razorpay or cash on delivery; admins run the catalogue, inventory, orders, invoices and transactions from one dashboard.",
    discipline: "Web",
    category: "E-commerce",
    stack: ["Next.js", "TypeScript", "MongoDB", "Razorpay", "Tailwind CSS", "Zustand", "Zod", "Nodemailer"],
    role: "Design & development",
    live: "https://rajesh-ecom.vercel.app/",
    github: "https://github.com/RushabhBhosale/rajesh-ecom",
    shots: {
      desktop: [
        "/work/rajesh-renewed/desktop-1.jpg",
        "/work/rajesh-renewed/desktop-2.jpg",
        "/work/rajesh-renewed/desktop-3.jpg",
      ],
      mobile: "/work/rajesh-renewed/mobile.jpg",
    },
    color: "#30343c",
    tone: ["#16171b", "#e8572a"],
    featured: true,
    modules: [
      { title: "Storefront", items: "Landing deals, price-band shortcuts, shop-by-category and brand rails, About and Contact." },
      { title: "Catalogue", items: "Search and filters by price, category, brand and condition, with sorting." },
      { title: "Product pages", items: "Gallery with lightbox, configuration variants, colours, highlights and related products." },
      { title: "Cart & checkout", items: "A persisted cart, 18% GST, Razorpay or cash on delivery, and email confirmations." },
      { title: "Orders & returns", items: "Order history with live status, and return requests once an order ships." },
      { title: "Admin console", items: "Dashboard charts, products, categories, inventory, orders, invoices and transactions." },
    ],
    flow: {
      title: "From cart to confirmed order",
      kind: "chain",
      nodes: [
        { label: "Cart", note: "Persisted on the device" },
        { label: "Checkout", note: "Validated with Zod · GST added" },
        { label: "Razorpay", note: "Or cash on delivery" },
        { label: "Verification", note: "Signature checked on the server" },
        { label: "Order", note: "Transaction logged · email sent" },
      ],
    },
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
    shots: {
      phones: ["/work/expense-tracker/mobile-1.jpg", "/work/expense-tracker/mobile-2.jpg", "/work/expense-tracker/mobile-3.jpg"],
    },
    color: "#1d7a6c",
    tone: ["#161d1f", "#3fb8a6"],
    featured: true,
  },
  {
    slug: "ai-travel-planner",
    title: "Wayfare",
    line: "Somewhere new, planned in seconds.",
    summary: "A mobile travel planner: discover destinations, build itineraries with AI, and keep every trip in one place.",
    detail:
      "Search or browse destinations by season and vibe, ask AI for a day-by-day itinerary, and track each trip’s days, saved places, budget and weather forecast — with a map view of every planned stop.",
    discipline: "Mobile",
    category: "AI product",
    stack: ["React Native", "Expo", "NativeWind", "TanStack Query", "Clerk", "React Native Maps"],
    role: "Design & development",
    github: "https://github.com/RushabhBhosale/travel-app",
    shots: {
      phones: ["/work/ai-travel/mobile-1.jpg", "/work/ai-travel/mobile-2.jpg", "/work/ai-travel/mobile-3.jpg"],
    },
    color: "#3d6a4a",
    tone: ["#1a1d18", "#9cc36a"],
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
    slug: "travel-archive",
    title: "Just Roaming",
    line: "Six journeys, kept on film.",
    summary: "A travel archive of photos and short stories from six journeys across India.",
    detail:
      "A drifting wall of photographs you can drag through, filtered by trip. Each journey opens as its own film — a full-bleed title, the trip in short, then a horizontal gallery with captions — all with smooth, scroll-driven motion.",
    discipline: "Web",
    category: "Visual archive",
    stack: ["Next.js", "Framer Motion", "Lenis", "Tailwind CSS"],
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
