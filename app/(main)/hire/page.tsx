import type { Metadata } from "next";
import Link from "next/link";
import { abs, breadcrumb, jsonLd } from "@/lib/seo";
import { hirePages } from "@/utils/hire";

export const metadata: Metadata = {
  title: { absolute: "Hire a Developer in Navi Mumbai & Mumbai | Rushabh Bhosale" },
  description:
    "Hire Rushabh Bhosale, a freelance full stack developer in Navi Mumbai. Web apps, React Native mobile apps, Next.js websites, MERN products and AI automation across Mumbai and India.",
  alternates: { canonical: "/hire" },
};

export default function HireIndex() {
  const schema = [
    breadcrumb([{ name: "Home", path: "/home" }, { name: "Hire", path: "/hire" }]),
    {
      "@type": "CollectionPage",
      "@id": `${abs("/hire")}#page`,
      url: abs("/hire"),
      name: "Hire Rushabh Bhosale — services",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: hirePages.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: abs(`/hire/${p.slug}`),
          name: p.title,
        })),
      },
    },
  ];

  return (
    <div className="page hire">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <header className="page-hero section">
        <div className="page-hero__meta mono">
          <span>(Hire)</span>
          <span className="dim">Services</span>
          <span>Navi Mumbai, IN</span>
        </div>
        <h1 className="page-hero__title hire__title" data-lines>
          Hire a developer
        </h1>
        <div className="seo-copy">
          <p data-reveal>
            I’m Rushabh Bhosale, a freelance full stack developer in Navi Mumbai. I build websites, web apps, mobile apps
            and automations for startups and businesses in Navi Mumbai, Mumbai, Thane and across India. Pick the service
            closest to what you need.
          </p>
        </div>
      </header>
      <section className="section">
        <ul className="channels">
          {hirePages.map((p, i) => (
            <li key={p.slug} data-reveal>
              <Link href={`/hire/${p.slug}`} className="channel">
                <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
                <span className="channel__label">{p.title}</span>
                <span className="channel__value mono">{p.stack.slice(0, 4).join(" · ")}</span>
                <span className="channel__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
