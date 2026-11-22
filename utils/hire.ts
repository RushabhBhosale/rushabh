import { getProduct, inr } from "./pricing";

const price = (id: string) => inr(getProduct(id)!.from);

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
  /** Id from utils/pricing.ts; adds a price box and an Offer to the schema. */
  product?: string;
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
    product: "business-website",
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
    product: "web-app",
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
    product: "mobile-app",
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
    product: "web-app",
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
    product: "automation",
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
    product: "business-website",
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
  {
    slug: "ecommerce-website-developer-navi-mumbai",
    title: "E-commerce website developer in Navi Mumbai",
    metaTitle: `E-commerce Website Developer in Navi Mumbai | From ${price("ecommerce")}`,
    description: `Custom online store with Razorpay payments, order emails and an admin panel, from ${price("ecommerce")}. Freelance e-commerce developer in Navi Mumbai serving Mumbai and India.`,
    answer: `Rushabh Bhosale builds custom e-commerce websites in Navi Mumbai, with product catalogue, cart, Razorpay payments, order emails and an admin panel, starting from ${price("ecommerce")}.`,
    paragraphs: [
      "A store needs more than a product grid. It needs reliable checkout, order tracking for you and your customers, and a way to manage products without calling a developer. I build all three.",
      "My own e-commerce project is a Next.js store with MongoDB, Razorpay, Zustand for the cart, Zod validation and Nodemailer for order emails, with an admin area for products and orders.",
      "Pages are server-rendered with clean metadata and product structured data, so your products can appear in Google results.",
    ],
    builds: [
      { title: "Catalogue and search", text: "Categories, product pages, variants and fast search." },
      { title: "Checkout and payments", text: "Cart, address capture and Razorpay with UPI, cards and netbanking." },
      { title: "Admin panel", text: "Add products, manage orders and see sales without touching code." },
      { title: "Order emails", text: "Confirmation and status emails sent automatically." },
    ],
    stack: ["Next.js", "TypeScript", "MongoDB", "Razorpay", "Tailwind CSS", "Zustand", "Zod", "Nodemailer"],
    proof: ["rajesh-renewed", "healthnovo", "peracto-hrms"],
    service: "E-commerce website development",
    product: "ecommerce",
    keywords: ["ecommerce website developer Navi Mumbai", "online store developer Mumbai", "Razorpay integration developer India", "Next.js ecommerce developer", "build online store India cost"],
    faqs: [
      { q: "How much does an e-commerce website cost?", a: `A custom online store with catalogue, cart, Razorpay checkout, order emails and an admin panel starts from ${price("ecommerce")}. The final price depends on the number of products, variants, integrations such as shipping, and custom features. You get a written quote before work starts.` },
      { q: "How long does it take to build an online store?", a: "A standard store typically takes one to two weeks, depending on how quickly product data and feedback arrive." },
      { q: "Can customers pay by UPI and cards?", a: "Yes. I integrate Razorpay, which supports UPI, cards and netbanking." },
      { q: "Can I manage products myself?", a: "Yes. The admin panel lets you add and edit products and manage orders without a developer." },
      { q: "Do you also build stores for clients outside Navi Mumbai?", a: "Yes. I work with brands across Mumbai and India, in person in Navi Mumbai and Mumbai and remotely elsewhere." },
    ],
  },
  {
    slug: "landing-page-developer-navi-mumbai",
    title: "Landing page developer in Navi Mumbai",
    metaTitle: `Landing Page Developer in Navi Mumbai | From ${price("landing-page")}`,
    description: `Fast, ad-ready landing pages that turn visitors into enquiries, from ${price("landing-page")}. Built with Next.js by a freelance developer in Navi Mumbai.`,
    answer: `Rushabh Bhosale builds fast, mobile-first landing pages in Navi Mumbai for Google Ads, Instagram campaigns and service launches, starting from ${price("landing-page")}.`,
    paragraphs: [
      "A landing page has one job: get a visitor to act. I keep the page focused, quick to load on mobile networks, and wired to a form or WhatsApp button so enquiries reach you immediately.",
      "Each page gets proper titles, descriptions, a share image and Google Analytics events so you can see which button or campaign brings people in.",
    ],
    builds: [
      { title: "Campaign pages", text: "One focused page per ad group or offer." },
      { title: "Enquiry capture", text: "Forms and WhatsApp click-to-chat, with every enquiry tracked." },
      { title: "Speed", text: "Lightweight pages that load fast on mobile." },
      { title: "Tracking", text: "Analytics events for form submits, calls and WhatsApp clicks." },
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Google Analytics", "Framer Motion"],
    proof: ["travel-archive", "one-more-episode", "animesparks"],
    service: "Landing page development",
    product: "landing-page",
    keywords: ["landing page developer Navi Mumbai", "landing page design Mumbai", "ad landing page developer India", "cheap landing page India"],
    faqs: [
      { q: "How much does a landing page cost?", a: `A single landing page starts from ${price("landing-page")}. Custom animation, multiple language versions or integrations can add to that, and I confirm the total in writing first.` },
      { q: "How fast can you deliver?", a: "Typically one to two working days once I have your content and branding." },
      { q: "Can you connect it to WhatsApp?", a: "Yes. I add a click-to-chat button and track every click." },
      { q: "Will it work for Google Ads?", a: "Yes. Pages are built for speed and clarity, which helps conversion and ad quality. I can add conversion tracking." },
    ],
  },
  {
    slug: "admin-panel-crm-developer-india",
    title: "Admin panel and CRM developer in India",
    metaTitle: `Admin Panel & CRM Developer in India | From ${price("admin-panel")}`,
    description: `Replace spreadsheets with a secure admin panel or custom CRM, from ${price("admin-panel")}. Built with React, Node.js and MongoDB by a developer in Navi Mumbai.`,
    answer: `Rushabh Bhosale builds secure admin panels and custom CRMs in India with logins, user roles, searchable records and reports, starting from ${price("admin-panel")}.`,
    paragraphs: [
      "If your business runs on Excel sheets and WhatsApp messages, an admin panel puts everything in one place: orders, leads, customers, staff or inventory, with the right people seeing the right things.",
      "I build dashboards on React, Node.js and MongoDB. At work I contribute to an enterprise HR management platform, so role-based access, records and reports are familiar territory.",
    ],
    builds: [
      { title: "Logins and roles", text: "Admins, staff and clients each see only what they should." },
      { title: "Records and search", text: "Create, edit, filter and export data." },
      { title: "Reports", text: "Totals and charts for the numbers you check daily." },
      { title: "Notifications", text: "Email or WhatsApp alerts when something needs attention." },
    ],
    stack: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "REST APIs"],
    proof: ["peracto-hrms", "rajesh-renewed", "expense-tracker"],
    service: "Admin panel and CRM development",
    product: "admin-panel",
    keywords: ["admin panel developer India", "custom CRM developer Mumbai", "replace Excel with software", "dashboard developer Navi Mumbai"],
    faqs: [
      { q: "How much does an admin panel cost?", a: `A basic admin panel with login, roles, records and exports starts from ${price("admin-panel")}. A full CRM with workflows, reports and integrations costs more, and I quote it in writing after understanding your process.` },
      { q: "Can it replace my Excel sheets?", a: "Yes. I can import your existing data and rebuild the workflow so your team enters it once in one place." },
      { q: "Is the data secure?", a: "Access is controlled by logins and roles, and passwords are never stored in plain text." },
      { q: "Can staff use it on their phones?", a: "Yes. Dashboards are built to work on mobile screens." },
    ],
  },
  {
    slug: "web-app-mvp-developer-india",
    title: "Web app and MVP developer in India",
    metaTitle: `Web App & MVP Developer in India | From ${price("web-app")}`,
    description: `Turn your idea into a working product. Custom web apps and startup MVPs on React, Next.js, Node.js and MongoDB, from ${price("web-app")}, by a developer in Navi Mumbai.`,
    answer: `Rushabh Bhosale builds custom web apps and startup MVPs in India on React, Next.js, Node.js and MongoDB, starting from ${price("web-app")}, with a written scope before any work begins.`,
    paragraphs: [
      "An MVP should prove one idea quickly, not build everything. I start by writing down what the first version must do, then build exactly that, end to end: interface, API, database, login and deployment.",
      "I’ve built and shipped independent products including a content platform, a developer tool that analyses any website, and a scroll-driven viewing journal, alongside professional work on enterprise software.",
    ],
    builds: [
      { title: "Scoping", text: "A written plan of what version one includes and what waits." },
      { title: "Full build", text: "Frontend, backend, database and authentication." },
      { title: "Integrations", text: "Payments, email, maps and third-party APIs." },
      { title: "Launch", text: "Deployment, domain and monitoring." },
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Playwright", "Cloudflare"],
    proof: ["site-inspector", "animesparks", "one-more-episode", "peracto-hrms"],
    service: "Custom web application and MVP development",
    product: "web-app",
    keywords: ["MVP developer India", "web app developer Mumbai", "startup developer Navi Mumbai", "custom web application development India", "hire developer for startup idea"],
    faqs: [
      { q: "How much does an MVP cost?", a: `Web apps and MVPs start from ${price("web-app")}. The price depends on the number of screens, user roles and integrations. I give a fixed written quote after scoping.` },
      { q: "How long does it take?", a: "Typically two to four weeks for a first version, depending on scope." },
      { q: "Do I own the code?", a: "Yes. The code and accounts are handed over to you at the end of the project." },
      { q: "Can you also build the mobile app later?", a: "Yes. I build React Native apps, so the mobile version can reuse your API." },
    ],
  },
  {
    slug: "seo-aeo-geo-services-india",
    title: "SEO, AEO and GEO services in India",
    metaTitle: `SEO, AEO & GEO Services in India | From ${price("seo-aeo-geo")}/month`,
    description: `Technical SEO plus answer-engine (AEO) and AI-search (GEO) optimisation so Google, ChatGPT and Perplexity can find and quote your business. From ${price("seo-aeo-geo")} a month.`,
    answer: `Rushabh Bhosale offers technical SEO, answer engine optimisation (AEO) and generative engine optimisation (GEO) for Indian businesses, starting from ${price("seo-aeo-geo")} a month, so that Google, AI Overviews, ChatGPT and Perplexity can understand and quote their websites.`,
    paragraphs: [
      "SEO gets your pages indexed and ranking. AEO structures them so a search engine can lift a direct answer. GEO makes your business easy for AI assistants to identify, describe and recommend. They overlap, and I handle them together.",
      "I started in SEO, and I apply it to my own publication, AnimeSparks, using Search Console data. The case study shows what changed and what still falls short.",
      "No honest provider can promise a ranking or a recommendation from ChatGPT. What I can do is fix the technical foundations, structure your answers clearly, add schema, and measure the results.",
    ],
    builds: [
      { title: "Technical SEO", text: "Crawlability, speed, canonicals, sitemaps and indexing fixes." },
      { title: "AEO", text: "Direct-answer sections, FAQs and question-led page structure." },
      { title: "GEO", text: "Clear entity facts, schema markup, crawler access and consistent profiles." },
      { title: "Reporting", text: "Search Console and tracking, with a plain-language monthly summary." },
    ],
    stack: ["Technical SEO", "Schema.org JSON-LD", "Google Search Console", "Bing Webmaster Tools", "Next.js", "Astro"],
    proof: ["animesparks", "site-inspector", "blog-automation"],
    service: "SEO, answer engine and generative engine optimisation",
    product: "seo-aeo-geo",
    keywords: ["SEO services India", "AEO services", "GEO services India", "generative engine optimisation India", "AI search optimisation", "rank in ChatGPT", "SEO Navi Mumbai"],
    faqs: [
      { q: "What are AEO and GEO?", a: "AEO (answer engine optimisation) structures content so search engines and voice assistants can quote a direct answer. GEO (generative engine optimisation) makes a business easy for AI tools such as ChatGPT, Gemini and Perplexity to identify and recommend." },
      { q: "How much do your SEO, AEO and GEO services cost?", a: `They start from ${price("seo-aeo-geo")} a month. The first month includes an audit, and the price depends on the size of the website.` },
      { q: "Can you get my business recommended by ChatGPT?", a: "I can’t guarantee it, and nobody honestly can. I can make your site crawlable, add structured data and clear facts, and improve your external profiles, which raises the likelihood." },
      { q: "How long before I see results?", a: "Technical fixes can show up in weeks. Ranking and AI visibility generally take a few months to build." },
    ],
  },
];

export const getHire = (slug: string) => hirePages.find((p) => p.slug === slug);
