import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EMAIL, PHONE, PHONE_HREF } from "@/lib/site";
import { BUSINESS_ID, PERSON_ID, abs, breadcrumb, jsonLd } from "@/lib/seo";
import { getHire, hirePages } from "@/utils/hire";
import { getWork } from "@/utils/work";

export function generateStaticParams() {
  return hirePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getHire(slug);
  if (!p) return {};
  return {
    title: { absolute: p.metaTitle },
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: `/hire/${p.slug}` },
    openGraph: { title: p.metaTitle, description: p.description, url: abs(`/hire/${p.slug}`), type: "website" },
  };
}

export default async function HirePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getHire(slug);
  if (!p) notFound();
  const url = abs(`/hire/${p.slug}`);
  const proof = p.proof.map((s) => getWork(s)).filter((w): w is NonNullable<typeof w> => !!w);
  const others = hirePages.filter((o) => o.slug !== p.slug);

  const schema = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: p.metaTitle,
      description: p.description,
      inLanguage: "en-IN",
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": `${url}#service` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: p.service,
      serviceType: p.service,
      description: p.answer,
      provider: { "@id": BUSINESS_ID },
      areaServed: [
        { "@type": "City", name: "Navi Mumbai" },
        { "@type": "City", name: "Mumbai" },
        { "@type": "Country", name: "India" },
      ],
      url,
    },
    { ...breadcrumb([{ name: "Home", path: "/home" }, { name: "Hire", path: "/hire" }, { name: p.title, path: `/hire/${p.slug}` }]), "@id": `${url}#breadcrumb` },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: p.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="page hire">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />

      <header className="page-hero section">
        <div className="page-hero__meta mono">
          <span>(Hire)</span>
          <span className="dim">
            <Link href="/hire" className="u-link">
              All services
            </Link>
          </span>
          <span>Navi Mumbai, IN</span>
        </div>
        <h1 className="page-hero__title hire__title" data-lines>
          {p.title}
        </h1>
        <div className="seo-copy">
          <p data-reveal className="hire__answer">
            {p.answer}
          </p>
          {p.paragraphs.map((t) => (
            <p key={t} data-reveal>
              {t}
            </p>
          ))}
        </div>
      </header>

      <section className="section hire__block" aria-labelledby="builds">
        <div className="label-row mono">
          <span>(01) What you get</span>
        </div>
        <h2 className="hire__h2" id="builds">
          What I build
        </h2>
        <ul className="hire__grid">
          {p.builds.map((b) => (
            <li key={b.title} data-reveal>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </li>
          ))}
        </ul>
        <ul className="hire__stack mono">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="section hire__block" aria-labelledby="proof">
        <div className="label-row mono">
          <span>(02) Proof</span>
        </div>
        <h2 className="hire__h2" id="proof">
          Relevant projects
        </h2>
        <ul className="channels">
          {proof.map((w, i) => (
            <li key={w.slug} data-reveal>
              <Link href={`/work/${w.slug}`} className="channel">
                <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
                <span className="channel__label">{w.title}</span>
                <span className="channel__value mono">{w.summary}</span>
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
          <span>(03) Questions</span>
        </div>
        <h2 className="hire__h2" id="faq">
          Frequently asked questions
        </h2>
        <dl className="hire__faq">
          {p.faqs.map((f) => (
            <div key={f.q} data-reveal>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section hire__block hire__cta" aria-labelledby="start">
        <h2 className="hire__h2" id="start">
          Start a project
        </h2>
        <p className="seo-copy hire__cta-copy">
          Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, call <a href={PHONE_HREF}>{PHONE}</a>, or use the{" "}
          <Link href="/contact">contact page</Link>. See the <Link href="/about">about page</Link> for my background.
        </p>
        <ul className="hire__more mono">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/hire/${o.slug}`} className="u-link">
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
