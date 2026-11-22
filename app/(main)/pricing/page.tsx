import type { Metadata } from "next";
import Link from "next/link";
import CostCalculator from "@/components/site/CostCalculator";
import { BUSINESS_ID, abs, breadcrumb, jsonLd } from "@/lib/seo";
import { EXTRA_PAGE, PRICES_UPDATED, inr, offerFor, priceLabel, products } from "@/utils/pricing";
import { EMAIL } from "@/lib/site";

const lowest = (id: string) => inr(products.find((p) => p.id === id)!.from);

export const metadata: Metadata = {
  title: { absolute: `Website, App & SEO Pricing in India | From ${lowest("landing-page")} | Rushabh Bhosale` },
  description: `Transparent prices from a freelance developer in Navi Mumbai: landing pages from ${lowest("landing-page")}, websites from ${lowest("business-website")}, online stores from ${lowest("ecommerce")}, mobile apps from ${lowest("mobile-app")}.`,
  alternates: { canonical: "/pricing" },
};

const faqs = [
  {
    q: "How much does a website cost in India?",
    a: `With me, a landing page starts from ${lowest("landing-page")}, a 5-page business website from ${lowest("business-website")} (extra pages ${inr(EXTRA_PAGE)} each), an online store from ${lowest("ecommerce")}, and a custom web app from ${lowest("web-app")}. The final cost depends on pages, features and integrations, and I give a written quote first.`,
  },
  {
    q: "How much does a mobile app cost?",
    a: `A cross-platform React Native app for Android and iOS starts from ${lowest("mobile-app")}. Cost rises with the number of screens, backend work and integrations such as payments or video calls.`,
  },
  {
    q: "How much do SEO, AEO and GEO services cost?",
    a: `They start from ${lowest("seo-aeo-geo")} a month for an existing website, with a technical audit in the first month.`,
  },
  {
    q: "Are the prices fixed?",
    a: "They are starting prices. After you describe what you need I send a written scope and a fixed price, and nothing changes without your agreement.",
  },
  {
    q: "What is not included?",
    a: "Domain registration, hosting fees, paid plugins and third-party charges such as payment gateway fees are extra. I tell you the exact amounts in the quote.",
  },
  {
    q: "How do I pay?",
    a: "Payment is split into stages agreed in the quote, for example an advance to start and the balance on delivery. I accept UPI and bank transfer.",
  },
];

export default function PricingPage() {
  const url = abs("/pricing");
  const schema = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: "Website, app and SEO pricing — Rushabh Bhosale",
      dateModified: PRICES_UPDATED,
      inLanguage: "en-IN",
      mainEntity: { "@id": `${url}#services` },
    },
    {
      "@type": "ItemList",
      "@id": `${url}#services`,
      name: "Services and starting prices",
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: p.name,
          description: p.short,
          provider: { "@id": BUSINESS_ID },
          areaServed: { "@type": "Country", name: "India" },
          url: abs(`/hire/${p.page}`),
          offers: offerFor(p, abs(`/hire/${p.page}`)),
        },
      })),
    },
    breadcrumb([{ name: "Home", path: "/home" }, { name: "Pricing", path: "/pricing" }]),
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
          <span>(Pricing)</span>
          <span className="dim">Updated {PRICES_UPDATED}</span>
          <span>INR</span>
        </div>
        <h1 className="page-hero__title hire__title" data-lines>
          Pricing
        </h1>
        <div className="seo-copy">
          <p data-reveal className="hire__answer">
            Rushabh Bhosale’s prices start at {lowest("landing-page")} for a landing page, {lowest("business-website")} for a
            business website, {lowest("ecommerce")} for an online store, {lowest("mobile-app")} for a mobile app and{" "}
            {lowest("seo-aeo-geo")} a month for SEO, AEO and GEO.
          </p>
          <p data-reveal>
            Every project starts with a written scope and fixed price. These are starting points in Indian rupees; the
            final figure depends on what you need. Domain names and third-party fees are extra.
          </p>
        </div>
      </header>

      <section className="section hire__block">
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
              <ul className="hire__included">
                {p.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="mono">{p.timeline}</p>
              <Link href={`/hire/${p.page}`} className="u-link mono">
                Details and FAQ ↗
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section hire__block" aria-labelledby="calc">
        <div className="label-row mono">
          <span>(Estimate)</span>
        </div>
        <h2 className="hire__h2" id="calc">
          Estimate your project
        </h2>
        <CostCalculator />
      </section>

      <section className="section hire__block" aria-labelledby="faq">
        <h2 className="hire__h2" id="faq">
          Pricing questions
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

      <section className="section hire__block hire__cta">
        <h2 className="hire__h2">Get a written quote</h2>
        <p className="seo-copy hire__cta-copy">
          Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or use the <Link href="/contact">contact page</Link>. See{" "}
          <Link href="/hire">all services</Link> or read the guide to{" "}
          <Link href="/blogs/website-cost-in-india">website costs in India</Link>.
        </p>
      </section>
    </div>
  );
}
