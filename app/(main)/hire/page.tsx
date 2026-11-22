import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_ID, abs, breadcrumb, jsonLd } from "@/lib/seo";
import { hirePages } from "@/utils/hire";
import { PRICES_UPDATED, inr, offerFor, priceLabel, products, getProduct } from "@/utils/pricing";
import { blogPosts } from "../blogs/index";
import { EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Hire a Freelance Developer in Navi Mumbai | Websites from ${inr(getProduct("landing-page")!.from)} | Rushabh Bhosale` },
  description: `Freelance full stack developer in Navi Mumbai: landing pages from ${inr(getProduct("landing-page")!.from)}, websites from ${inr(getProduct("business-website")!.from)}, stores from ${inr(getProduct("ecommerce")!.from)}, web and mobile apps, automation and SEO, AEO and GEO. Prices and live work.`,
  alternates: { canonical: "/hire" },
};

const faqs = [
  {
    q: "Who is Rushabh Bhosale?",
    a: "Rushabh Bhosale is a full stack software developer based in Navi Mumbai, India. He builds websites, online stores, web apps, React Native mobile apps and automations, and takes freelance projects from clients in Navi Mumbai, Mumbai, Thane and across India.",
  },
  {
    q: "What can you build?",
    a: "Landing pages, business websites, e-commerce stores, admin panels and CRMs, custom web apps and MVPs, Android and iOS apps, AI and n8n automations, plus SEO, AEO and GEO work for existing websites.",
  },
  {
    q: "How much does it cost?",
    a: `Starting prices are ${products.map((p) => `${p.name.toLowerCase()} ${priceLabel(p)}`).join(", ")}. You get a written quote before work begins. See the pricing page for details.`,
  },
  {
    q: "Where are you based and can we meet?",
    a: "I’m based in Navi Mumbai. I meet clients in person in Navi Mumbai, Mumbai and Thane, and work remotely with clients elsewhere in India and abroad.",
  },
  {
    q: "How do I start?",
    a: `Email ${EMAIL}, message on WhatsApp, or use the contact page. Describe what you need and I’ll reply with questions, a written scope and a price.`,
  },
];

const guides = blogPosts.filter((b) =>
  ["website-cost-in-india", "mobile-app-cost-in-india", "hire-freelance-developer-navi-mumbai"].includes(b.slug),
);

export default function HireIndex() {
  const url = abs("/hire");
  const schema = [
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: "Hire Rushabh Bhosale — services and prices",
      inLanguage: "en-IN",
      dateModified: PRICES_UPDATED,
      about: { "@id": BUSINESS_ID },
      mainEntity: { "@id": `${url}#services` },
    },
    {
      "@type": "ItemList",
      "@id": `${url}#services`,
      name: "Services by Rushabh Bhosale",
      itemListElement: hirePages.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: abs(`/hire/${p.slug}`),
        name: p.title,
      })),
    },
    ...products.map((p) => ({
      "@type": "Service",
      name: p.name,
      description: p.short,
      provider: { "@id": BUSINESS_ID },
      areaServed: [{ "@type": "City", name: "Navi Mumbai" }, { "@type": "Country", name: "India" }],
      offers: offerFor(p, abs(`/hire/${p.page}`)),
    })),
    breadcrumb([{ name: "Home", path: "/home" }, { name: "Hire", path: "/hire" }]),
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div className="page hire">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <header className="page-hero section">
        <div className="page-hero__meta mono">
          <span>(Hire)</span>
          <span className="dim">Services &amp; prices</span>
          <span>Navi Mumbai, IN</span>
        </div>
        <h1 className="page-hero__title hire__title" data-lines>
          Hire a developer
        </h1>
        <div className="seo-copy">
          <p data-reveal className="hire__answer">
            I’m Rushabh Bhosale, a freelance full stack developer in Navi Mumbai. I build websites from{" "}
            {inr(getProduct("landing-page")!.from)}, online stores from {inr(getProduct("ecommerce")!.from)}, web and
            mobile apps, and automations for businesses in Navi Mumbai, Mumbai, Thane and across India.
          </p>
          <p data-reveal>
            Every project starts with a written scope and fixed price. I work directly with you, so there is no account
            manager between you and the code. <Link href="/pricing">See full pricing</Link> or{" "}
            <Link href="/contact">get a quote</Link>.
          </p>
        </div>
      </header>

      <section className="section hire__block" aria-labelledby="prices">
        <div className="label-row mono">
          <span>(01) Prices</span>
          <span className="dim">Updated {PRICES_UPDATED}</span>
        </div>
        <h2 className="hire__h2" id="prices">
          What it costs
        </h2>
        <ul className="pricing__grid">
          {products.map((p) => (
            <li key={p.id} className="pricing__card" data-reveal>
              <h3>{p.name}</h3>
              <div className="pricing__amount">
                <small>from </small>
                {inr(p.from)}
                {p.perMonth && <small> /month</small>}
              </div>
              <p>{p.short}</p>
              <p className="mono">{p.timeline}</p>
              <Link href={`/hire/${p.page}`} className="u-link mono">
                Details ↗
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section hire__block" aria-labelledby="all">
        <div className="label-row mono">
          <span>(02) All services</span>
        </div>
        <h2 className="hire__h2" id="all">
          Find the right fit
        </h2>
        <ul className="channels">
          {hirePages.map((p, i) => {
            const prod = p.product ? getProduct(p.product) : undefined;
            return (
              <li key={p.slug} data-reveal>
                <Link href={`/hire/${p.slug}`} className="channel">
                  <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="channel__label">{p.title}</span>
                  <span className="channel__value mono">{prod ? priceLabel(prod) : p.stack.slice(0, 4).join(" · ")}</span>
                  <span className="channel__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section hire__block" aria-labelledby="guides">
        <div className="label-row mono">
          <span>(03) Guides</span>
        </div>
        <h2 className="hire__h2" id="guides">
          Read before you hire anyone
        </h2>
        <ul className="channels">
          {guides.map((g, i) => (
            <li key={g.slug} data-reveal>
              <Link href={`/blogs/${g.slug}`} className="channel">
                <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
                <span className="channel__label">{g.title}</span>
                <span className="channel__value mono">{g.description}</span>
                <span className="channel__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section hire__block" aria-labelledby="faq">
        <div className="label-row mono">
          <span>(04) Questions</span>
        </div>
        <h2 className="hire__h2" id="faq">
          Frequently asked questions
        </h2>
        <dl className="hire__faq">
          {faqs.map((f) => (
            <div key={f.q} data-reveal>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
