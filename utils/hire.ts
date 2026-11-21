// Service / location landing pages. Each one answers a search someone would actually type
// ("freelance react developer in navi mumbai") and links to real projects from utils/work.ts.
// Keep claims grounded in work.ts and experience.ts — AI search engines cross-check them.

export type HirePage = {
  slug: string;
  /** The h1 and the breadcrumb label. */
  title: string;
  /** <title> — keep under ~60 characters. */
  metaTitle: string;
  /** Meta description — 140–160 characters, mentions the place and the skill. */
  description: string;
  /** One direct sentence that answers the query; written to be quoted by AI answers. */
  answer: string;
  paragraphs: string[];
  /** What the client gets, one line each. */
  builds: { title: string; text: string }[];
  stack: string[];
  /** Slugs from utils/work.ts to cite as evidence. */
  proof: string[];
  faqs: { q: string; a: string }[];
  /** Service name for schema.org. */
  service: string;
  keywords: string[];
};

export const hirePages: HirePage[] = [
  {
    slug: "freelance-developer-navi-mumbai",
    title: "Freelance software developer in Navi Mumbai",
    metaTitle: "Freelance Software Developer in Navi Mumbai | Rushabh Bhosale",
    description:
      "Hire Rushabh Bhosale, an independent full stack developer in Navi Mumbai. React, Next.js, Node.js and React Native for startups and businesses across Mumbai and India.",
    answer:
      "Rushabh Bhosale is an independent full stack software developer based in Navi Mumbai who builds websites, web applications and mobile apps for startups and businesses in Mumbai, Thane, Navi Mumbai and across India.",
    paragraphs: [
      "I work directly with founders and business owners, so you talk to the person writing the code. That keeps projects quick to start, easy to change and free of account-manager layers.",
      "I’m based in Navi Mumbai, so meeting in person in Vashi, Nerul, Belapur, Kharghar, Airoli, Thane or Mumbai is straightforward. Most of my work is also done remotely with clients elsewhere in India and abroad.",
      "By day I’m a software developer at Peracto Infotech, where I build cross-platform apps with React Native, Ionic, Angular and the MERN stack. My independent projects, listed below, cover e-commerce, publishing, travel and developer tools.",
    ],
    builds: [
      { title: "Business websites and web apps", text: "Fast, search-friendly sites and dashboards built with React and Next.js." },
      { title: "Mobile apps", text: "Android and iOS apps from one React Native codebase, with native modules when needed." },
      { title: "Backends and APIs", text: "Node.js, Express and MongoDB services, payment integrations and admin panels." },
      { title: "Automation", text: "n8n and AI workflows that remove repetitive operational work." },
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "React Native", "Tailwind CSS"],
    proof: ["rajesh-renewed", "healthnovo", "animesparks", "peracto-hrms"],
    service: "Freelance full stack software development",
    keywords: [
      "freelance software developer Navi Mumbai",
      "hire developer Navi Mumbai",
      "freelance developer Vashi",
      "freelance developer Kharghar",
      "freelance developer Nerul",
      "individual developer Navi Mumbai",
    ],
    faqs: [
      {
        q: "Are you available for freelance projects in Navi Mumbai?",
        a: "Yes. I take on freelance web, mobile and automation projects from Navi Mumbai, Mumbai, Thane and elsewhere in India. Email or WhatsApp me with a short description and I’ll reply with questions and a rough approach.",
      },
      {
        q: "Can we meet in person?",
        a: "Yes, for clients in Navi Mumbai, Mumbai and Thane. Most projects run well remotely too, with calls and a shared task board.",
      },
      {
        q: "What kinds of projects do you build?",
        a: "Business websites, e-commerce stores, web dashboards, cross-platform mobile apps, REST APIs and workflow automations. Examples are listed on this page and in the work section.",
      },
      {
        q: "How do I hire you?",
        a: "Send a short brief through the contact page, by email or on WhatsApp. We agree scope, timeline and price before any work starts.",
      },
    ],
  },
  {
    slug: "react-nextjs-developer-mumbai",
    title: "React and Next.js developer in Mumbai",
    metaTitle: "React & Next.js Developer in Mumbai | Rushabh Bhosale",
    description:
      "Hire a React and Next.js developer in Mumbai and Navi Mumbai. Fast, SEO-friendly web apps, e-commerce stores and dashboards in TypeScript by Rushabh Bhosale.",
    answer:
      "Rushabh Bhosale is a React and Next.js developer in Navi Mumbai who builds fast, search-friendly websites, e-commerce stores and web applications in TypeScript for clients in Mumbai and across India.",
    paragraphs: [
      "Next.js with the App Router is my default for anything that has to load quickly and be found on Google: marketing sites, stores, SaaS dashboards and content platforms.",
      "I write TypeScript, style with Tailwind CSS, and connect to Node.js and MongoDB backends or your existing APIs. Pages are server-rendered or statically generated so search engines and AI crawlers can read them.",
      "I’ve shipped a Next.js e-commerce store with Razorpay payments, an HR management platform, a scroll-driven viewing journal and a travel archive, so I’m comfortable with both product UI and heavy animation.",
    ],
    builds: [
      { title: "E-commerce stores", text: "Catalogues, carts, Razorpay payments, order emails and an admin panel." },
      { title: "SaaS dashboards", text: "Authenticated apps with tables, forms, roles and REST API integration." },
      { title: "Marketing and portfolio sites", text: "Fast pages with clean metadata, sitemaps and structured data." },
      { title: "Redesigns and rebuilds", text: "Moving a slow or dated site to Next.js without losing its search rankings." },
    ],
    stack: ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Zustand", "Zod", "Framer Motion", "GSAP"],
    proof: ["rajesh-renewed", "peracto-hrms", "one-more-episode", "travel-archive"],
    service: "React and Next.js web development",
    keywords: [
      "React developer Mumbai",
      "Next.js developer Mumbai",
      "hire React developer Navi Mumbai",
      "Next.js freelancer India",
      "TypeScript developer Mumbai",
    ],
    faqs: [
      {
        q: "Why choose Next.js for my website?",
        a: "Next.js renders pages on the server or at build time, which makes sites fast and easy for Google and AI search tools to read. It also lets one codebase serve both the website and its API.",
      },
      {
        q: "Can you build an online store with Razorpay?",
        a: "Yes. I built a Next.js e-commerce store with Razorpay payments, MongoDB, order emails and an admin area, and I’ve integrated Razorpay in a mobile app too.",
      },
      {
        q: "Can you improve my existing React site?",
        a: "Yes. I can audit performance and SEO, fix the biggest problems first, and migrate to Next.js where it makes sense.",
      },
      {
        q: "Do you work with TypeScript?",
        a: "Yes, TypeScript is my default for both frontend and backend code.",
      },
    ],
  },
  {
    slug: "mobile-app-developer-mumbai",
    title: "React Native mobile app developer in Mumbai",
    metaTitle: "Mobile App Developer in Mumbai (React Native) | Rushabh Bhosale",
    description:
      "Hire a React Native mobile app developer in Mumbai and Navi Mumbai. One codebase for Android and iOS, with payments, video calls, maps and Bluetooth when you need them.",
    answer:
      "Rushabh Bhosale is a React Native mobile app developer in Navi Mumbai who builds Android and iOS apps from a single codebase, including payments, video consultations, maps, AI features and Bluetooth device integration.",
    paragraphs: [
      "I build cross-platform apps with React Native and Expo, and with Ionic and Angular where a team already uses them. One codebase means a lower budget and faster releases than building two separate native apps.",
      "When the platform demands it, I write native modules in Kotlin or Java. I’ve done this for Bluetooth Low Energy body-composition devices and for an Android SMS pipeline.",
      "At Peracto Infotech I build cross-platform apps professionally. Independent apps include a healthcare platform with video consultations and Razorpay payments, an AI travel planner and an expense tracker that reads bank SMS.",
    ],
    builds: [
      { title: "Consumer and startup apps", text: "Onboarding, authentication, push notifications, maps and in-app payments." },
      { title: "Healthcare and device apps", text: "Video consultations, Bluetooth device pairing and health reports." },
      { title: "Android automation", text: "Native modules, background tasks and on-device parsing." },
      { title: "Store release", text: "Builds, signing and submission to Google Play and the App Store." },
    ],
    stack: ["React Native", "Expo", "Ionic", "Angular", "Kotlin", "Firebase", "TanStack Query", "SQLite"],
    proof: ["healthnovo", "ai-travel-planner", "expense-tracker", "activex"],
    service: "React Native cross-platform mobile app development",
    keywords: [
      "mobile app developer Mumbai",
      "React Native developer Mumbai",
      "Android app developer Navi Mumbai",
      "iOS app developer Mumbai",
      "hire app developer Navi Mumbai",
    ],
    faqs: [
      {
        q: "Do you build both Android and iOS apps?",
        a: "Yes. React Native lets me ship both from one codebase. I can also write native Android code in Kotlin or Java for features that need it.",
      },
      {
        q: "Can you add payments or video calls to an app?",
        a: "Yes. I’ve built a healthcare app with Razorpay payments and Agora video consultations, with Firebase for notifications.",
      },
      {
        q: "Can you connect an app to Bluetooth devices?",
        a: "Yes. I’ve built an app that pairs with Bluetooth Low Energy body-composition devices and turns each reading into a report.",
      },
      {
        q: "Will you publish the app to the stores?",
        a: "Yes. I handle builds, signing and submission to Google Play and the App Store.",
      },
    ],
  },
  {
    slug: "full-stack-developer-india",
    title: "Full stack MERN developer in India",
    metaTitle: "Full Stack MERN Developer in India | Rushabh Bhosale",
    description:
      "Hire a full stack MERN developer in India. Rushabh Bhosale builds MongoDB, Express, React and Node.js products end to end, from API design to deployment.",
    answer:
      "Rushabh Bhosale is a full stack developer in Navi Mumbai, India, who builds complete products on the MERN stack — MongoDB, Express, React and Node.js — plus Next.js, from database design and REST APIs to deployment.",
    paragraphs: [
      "I handle the whole product: data models, REST APIs, authentication, payments, the web interface and the deployment. That avoids hand-offs between separate frontend and backend vendors.",
      "I’ve worked on the MERN stack professionally since 2023, first at Techkendr on full stack Next.js applications and now at Peracto Infotech, building cross-platform apps and enterprise software.",
      "I work with clients across India and overseas. Remote collaboration over calls, WhatsApp and a shared task board is routine for me.",
    ],
    builds: [
      { title: "End-to-end web products", text: "MongoDB models, Express or Next.js API routes, and the React interface on top." },
      { title: "Admin panels and internal tools", text: "Role-based dashboards, reports and data entry screens." },
      { title: "Integrations", text: "Payments, email, SMS, maps and third-party APIs." },
      { title: "Deployment", text: "Vercel, Cloudflare and Node hosting, with environment and database setup." },
    ],
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Next.js", "TypeScript", "REST APIs", "Cloudflare"],
    proof: ["peracto-hrms", "rajesh-renewed", "animesparks", "expense-tracker"],
    service: "Full stack MERN web development",
    keywords: [
      "full stack developer India",
      "MERN stack developer India",
      "hire Node.js developer India",
      "freelance full stack developer India",
      "MongoDB developer India",
    ],
    faqs: [
      {
        q: "Do you work with clients outside Mumbai?",
        a: "Yes. I work with clients across India and abroad. I’m in the IST time zone and agree meeting times that suit both sides.",
      },
      {
        q: "What does MERN stand for?",
        a: "MongoDB, Express.js, React and Node.js — a JavaScript stack that uses one language across the database layer, the API and the interface.",
      },
      {
        q: "Can you take over an existing codebase?",
        a: "Yes. I start with a review of the code and the biggest risks, then agree a plan for fixes and new features.",
      },
      {
        q: "Do you also handle hosting?",
        a: "Yes. I set up deployment on platforms such as Vercel and Cloudflare, along with the database and environment configuration.",
      },
    ],
  },
  {
    slug: "ai-automation-developer-india",
    title: "AI and n8n automation developer in India",
    metaTitle: "AI & n8n Automation Developer in India | Rushabh Bhosale",
    description:
      "Hire an AI workflow and n8n automation developer in India. Rushabh Bhosale automates content, data and operations with n8n, LLM APIs and custom Node.js code.",
    answer:
      "Rushabh Bhosale is a developer in Navi Mumbai who builds AI workflows and business automations with n8n, LLM APIs such as OpenRouter and custom Node.js code, for clients in India and worldwide.",
    paragraphs: [
      "I build automations that remove repetitive work: publishing, data collection, notifications and reporting. The aim is a workflow your team can understand and maintain, not a black box.",
      "My n8n blog engine researches keywords, drafts an article through an LLM, formats it and publishes it in 10–15 minutes. The same approach applies to lead handling, content pipelines and internal reports.",
      "Where a workflow tool isn’t enough, I add custom Node.js code or a small API, and I keep a human review step wherever accuracy matters.",
    ],
    builds: [
      { title: "Content pipelines", text: "Research, drafting, formatting and publishing with human review." },
      { title: "Data and lead workflows", text: "Collect, clean and route data between forms, sheets, CRMs and email." },
      { title: "LLM features in products", text: "AI itinerary planning, classification and summarisation inside apps." },
      { title: "Custom automation APIs", text: "Node.js services for the cases a no-code tool can’t handle." },
    ],
    stack: ["n8n", "OpenRouter", "LLM APIs", "Node.js", "Next.js", "Playwright", "Markdown"],
    proof: ["blog-automation", "ai-travel-planner", "expense-tracker", "site-inspector"],
    service: "AI workflow and n8n automation development",
    keywords: [
      "n8n developer India",
      "AI automation developer India",
      "workflow automation Mumbai",
      "LLM integration developer India",
      "hire n8n developer",
    ],
    faqs: [
      {
        q: "What is n8n?",
        a: "n8n is a workflow automation tool that connects apps and APIs. It can be self-hosted, and it works well alongside custom code and LLM APIs.",
      },
      {
        q: "Can you automate content publishing with AI?",
        a: "Yes. My own blog workflow researches keywords, drafts an article, formats it and publishes it in 10–15 minutes. I recommend a human review step before anything goes live.",
      },
      {
        q: "Can you add AI features to an existing app?",
        a: "Yes. I’ve built AI itinerary generation into a React Native travel app, and I can add similar features to web or mobile products.",
      },
      {
        q: "Do you work with clients outside India?",
        a: "Yes. Automation work is fully remote-friendly.",
      },
    ],
  },
  {
    slug: "seo-friendly-website-developer-mumbai",
    title: "SEO-friendly website developer in Mumbai",
    metaTitle: "SEO-Friendly Website Developer in Mumbai | Rushabh Bhosale",
    description:
      "Hire a developer who builds fast, SEO-friendly websites in Mumbai and Navi Mumbai. Next.js with technical SEO, structured data and Search Console tracking.",
    answer:
      "Rushabh Bhosale is a Navi Mumbai web developer with an SEO background who builds fast, server-rendered websites with clean metadata, sitemaps and structured data so they can be found on Google and by AI search tools.",
    paragraphs: [
      "I started in SEO, with an internship at Finplus and digital marketing at SNK Web Solutions, before moving into software development. That means I build sites with search in mind from the first line of code.",
      "I run AnimeSparks, an independent publication that I improve using real Google Search Console data. The case study shows the numbers and what I changed.",
      "For your site, I handle the technical side: rendering, page speed, metadata, canonical URLs, sitemaps, structured data and crawler access. I’ll tell you plainly what’s in my control and what depends on content and links.",
    ],
    builds: [
      { title: "Technical SEO audit", text: "Crawlability, speed, metadata, indexing and structured data." },
      { title: "SEO-first Next.js sites", text: "Server-rendered pages, sitemaps, canonical URLs and schema markup." },
      { title: "Migrations", text: "Moving to a new stack while keeping URLs and rankings with redirects." },
      { title: "Search Console tracking", text: "Setting up reporting so you can see what works." },
    ],
    stack: ["Next.js", "Astro", "Technical SEO", "Schema.org JSON-LD", "Google Search Console", "Cloudflare"],
    proof: ["animesparks", "site-inspector", "travel-archive", "rajesh-renewed"],
    service: "SEO-friendly web development and technical SEO",
    keywords: [
      "SEO friendly website developer Mumbai",
      "technical SEO developer Mumbai",
      "Next.js SEO developer India",
      "website developer Navi Mumbai",
    ],
    faqs: [
      {
        q: "Can you guarantee Google rankings?",
        a: "No one honestly can. I can make sure the technical foundations are right — speed, crawlability, metadata and structured data — and track results in Search Console.",
      },
      {
        q: "Do you do SEO as well as development?",
        a: "My focus is the technical SEO that is built into the site itself: structure, speed, metadata and structured data.",
      },
      {
        q: "Will AI search tools be able to find my site?",
        a: "I make pages crawlable, add structured data, and allow AI search crawlers in robots.txt. Whether a tool recommends a site also depends on its content and reputation.",
      },
      {
        q: "Can you migrate my site without losing traffic?",
        a: "Yes. I map every old URL to a new one with permanent redirects and monitor indexing after launch.",
      },
    ],
  },
];

export const getHire = (slug: string) => hirePages.find((p) => p.slug === slug);
