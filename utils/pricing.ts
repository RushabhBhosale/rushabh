// Single source of truth for prices. Every price on the site (pricing page, service pages, FAQ answers,
// schema.org offers, llms.txt) reads from here — edit a number once and it changes everywhere.
// All prices are "starting from", in INR, and exclude domain registration and third-party fees.

export const PRICES_UPDATED = "2026-11-22";
export const EXTRA_PAGE = 799;

export type Product = {
  id: string;
  name: string;
  /** One line that says what it is, written to be quoted. */
  short: string;
  from: number;
  /** Set for subscriptions: the price is per month. */
  perMonth?: boolean;
  timeline: string;
  bestFor: string;
  includes: string[];
  /** Slug of the /hire page that sells it. */
  page: string;
};

export const products: Product[] = [
  {
    id: "landing-page",
    name: "Landing page",
    short: "A single fast page built to turn ad clicks and Google searches into enquiries.",
    from: 2999,
    timeline: "1–2 working days",
    bestFor: "Ad campaigns, a service launch, or a first web presence",
    includes: ["Mobile-first single page", "Enquiry form and WhatsApp button", "Basic on-page SEO and share image", "Google Analytics set up"],
    page: "landing-page-developer-navi-mumbai",
  },
  {
    id: "business-website",
    name: "Business website",
    short: "A 5-page responsive website with SEO set up from the start, so customers can find and contact you.",
    from: 6999,
    timeline: "2–4 working days",
    bestFor: "Local businesses, clinics, consultants and small companies",
    includes: [
      "Up to 5 pages (extra pages ₹799 each)",
      "Mobile-first design that loads quickly",
      "Titles, descriptions, sitemap and structured data",
      "Contact form, WhatsApp and Google Maps",
      "Google Search Console and Analytics connected",
    ],
    page: "freelance-developer-navi-mumbai",
  },
  {
    id: "ecommerce",
    name: "E-commerce store",
    short: "A custom online store with catalogue, cart, Razorpay payments, order emails and an admin panel.",
    from: 20000,
    timeline: "1–2 weeks",
    bestFor: "Brands selling products online",
    includes: ["Product catalogue and search", "Cart and checkout", "Razorpay payments", "Order emails", "Admin panel for products and orders"],
    page: "ecommerce-website-developer-navi-mumbai",
  },
  {
    id: "admin-panel",
    name: "Admin panel or CRM",
    short: "A secure dashboard that replaces spreadsheets with logins, roles, records and reports.",
    from: 7999,
    timeline: "3–7 working days",
    bestFor: "Teams running on Excel or WhatsApp",
    includes: ["Login and user roles", "Create, edit and search records", "Filters and exports", "Basic reports"],
    page: "admin-panel-crm-developer-india",
  },
  {
    id: "web-app",
    name: "Web app or MVP",
    short: "A custom web application built end to end on React, Next.js, Node.js and MongoDB.",
    from: 30000,
    timeline: "2–4 weeks",
    bestFor: "Startups validating a product, or businesses with a custom workflow",
    includes: ["Product scoping and a written plan", "Frontend, backend and database", "Authentication", "Deployment"],
    page: "web-app-mvp-developer-india",
  },
  {
    id: "mobile-app",
    name: "Mobile app (Android and iOS)",
    short: "A cross-platform React Native app for Android and iOS from one codebase.",
    from: 40000,
    timeline: "3–6 weeks",
    bestFor: "Startups and businesses that need an app on both stores",
    includes: ["One codebase for Android and iOS", "API integration", "Push notifications", "Build and store submission support"],
    page: "mobile-app-developer-mumbai",
  },
  {
    id: "automation",
    name: "AI or n8n automation",
    short: "A workflow that removes repetitive work: publishing, data entry, notifications or reporting.",
    from: 4999,
    timeline: "1–3 working days per workflow",
    bestFor: "Anyone doing the same task by hand every week",
    includes: ["Workflow design", "n8n or custom Node.js build", "Testing with your real data", "Handover notes"],
    page: "ai-automation-developer-india",
  },
  {
    id: "seo-aeo-geo",
    name: "SEO, AEO and GEO",
    short: "Monthly technical SEO that also makes a website easy for Google, AI Overviews, ChatGPT and Perplexity to quote.",
    from: 4999,
    perMonth: true,
    timeline: "Monthly, with a first audit in week one",
    bestFor: "Existing websites that are not getting found",
    includes: ["Technical audit and fixes", "Direct-answer content structure and FAQs", "Schema markup", "Search Console reporting"],
    page: "seo-aeo-geo-services-india",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

/** ₹6,999 — Indian digit grouping. */
export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const priceLabel = (p: Product) => `from ${inr(p.from)}${p.perMonth ? " a month" : ""}`;

/** schema.org Offer for a product; "from" prices use minPrice. */
export const offerFor = (p: Product, url: string) => ({
  "@type": "Offer",
  url,
  priceCurrency: "INR",
  availability: "https://schema.org/InStock",
  priceSpecification: {
    "@type": p.perMonth ? "UnitPriceSpecification" : "PriceSpecification",
    minPrice: p.from,
    price: p.from,
    priceCurrency: "INR",
    ...(p.perMonth ? { unitCode: "MON", unitText: "month" } : {}),
  },
});
