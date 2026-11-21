import { EMAIL, PHONE } from "./site";

export const SITE_URL = "https://rushabh.in";
export const PERSON_ID = `${SITE_URL}/#person`;
export const BUSINESS_ID = `${SITE_URL}/#service`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const PROFILES = [
  "https://github.com/RushabhBhosale",
  "https://www.linkedin.com/in/rushabh-bhosale-software-developer/",
  "https://stackoverflow.com/users/20900638/rushabh-bhosale",
];

/** Places Rushabh actively takes work from. Used for areaServed and the hire pages. */
export const AREAS_SERVED = [
  { "@type": "City", name: "Navi Mumbai" },
  { "@type": "City", name: "Mumbai" },
  { "@type": "City", name: "Thane" },
  { "@type": "AdministrativeArea", name: "Maharashtra" },
  { "@type": "Country", name: "India" },
];

export const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "React Native",
  "Ionic",
  "Angular",
  "Tailwind CSS",
  "REST APIs",
  "n8n automation",
  "Technical SEO",
  "Full Stack Development",
];

export const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** Person entity: the one fact every other page points back to. */
export const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Rushabh Bhosale",
  givenName: "Rushabh",
  familyName: "Bhosale",
  url: SITE_URL,
  image: `${SITE_URL}/me.png`,
  email: `mailto:${EMAIL}`,
  telephone: PHONE,
  jobTitle: "Full Stack Software Developer",
  description:
    "Freelance full stack software developer in Navi Mumbai, India. Builds web apps, mobile apps and automations with React, Next.js, React Native, Node.js and TypeScript.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Navi Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  homeLocation: { "@type": "Place", name: "Navi Mumbai, Maharashtra, India" },
  workLocation: { "@type": "Place", name: "Navi Mumbai, Maharashtra, India" },
  worksFor: { "@type": "Organization", name: "Peracto Infotech" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Guru Nanak Khalsa College of Arts, Science & Commerce",
  },
  knowsAbout: SKILLS,
  knowsLanguage: ["en", "hi", "mr"],
  sameAs: PROFILES,
};

/** The freelance practice, so "hire a developer in Navi Mumbai" has an entity to match. */
export const serviceNode = {
  "@type": "ProfessionalService",
  "@id": BUSINESS_ID,
  name: "Rushabh Bhosale — Freelance Software Developer",
  url: SITE_URL,
  image: `${SITE_URL}/me.png`,
  description:
    "Independent software developer in Navi Mumbai building websites, web applications, mobile apps and workflow automations for startups and businesses across Mumbai and India.",
  telephone: PHONE,
  email: EMAIL,
  priceRange: "$$",
  address: personNode.address,
  areaServed: AREAS_SERVED,
  founder: { "@id": PERSON_ID },
  employee: { "@id": PERSON_ID },
  sameAs: PROFILES,
  knowsAbout: SKILLS,
  availableLanguage: ["English", "Hindi", "Marathi"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software development services",
    itemListElement: [
      "Freelance full stack web development",
      "React and Next.js website and web app development",
      "React Native mobile app development",
      "Node.js and MongoDB backend and API development",
      "n8n and AI workflow automation",
      "Technical SEO for Next.js websites",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Rushabh Bhosale — Software Developer, Navi Mumbai",
  inLanguage: "en-IN",
  publisher: { "@id": PERSON_ID },
};

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const jsonLd = (nodes: object | object[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": Array.isArray(nodes) ? nodes : [nodes] }).replace(
    /</g,
    "\\u003c",
  );
