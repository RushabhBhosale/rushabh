import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shot from "@/components/site/Shot";
import { getNextWork, getWork, indexOf, siteLabel, work } from "@/utils/work";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  return {
    title: `${w.title} — Rushabh Bhosale`,
    description: `${w.line} ${w.summary}`,
  };
}

const isExternal = (href: string) => href.startsWith("http");
const pad = (n: number) => String(n).padStart(2, "0");

/* Case study: the facts stay pinned on the left while the screenshots scroll by. */
export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();
  const next = getNextWork(slug);
  const desktop = w.shots?.desktop ?? [];
  const phones = w.shots?.phones ?? [];
  const cards = w.shots?.cards ?? [];

  const links = [
    w.live && { label: isExternal(w.live) ? "Visit website" : "Open the tool", href: w.live },
    ...(w.stores ?? []),
    w.github && { label: "Source code", href: w.github },
    w.story && { label: "Read the build story", href: w.story },
  ]
    .filter(Boolean)
    .map((l, i) => ({ ...(l as { label: string; href: string }), primary: i === 0 }));

  const facts = [
    { k: "Role", v: w.role },
    { k: "Type", v: `${w.discipline} — ${w.category}` },
    w.year && { k: "Year", v: w.year },
    w.live && isExternal(w.live) && { k: "Live", v: siteLabel(w) },
    w.note && { k: "Note", v: w.note },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <article className="cs">
      <div className="cs__layout section">
        <aside className="cs__aside">
          <div className="cs__sticky">
            <div className="cs__top mono">
              <Link href="/work" className="u-link">
                ← All work
              </Link>
              <span className="dim">
                {indexOf(slug)} / {pad(work.length)}
              </span>
            </div>

            <h1 className="cs__title" data-lines>
              {w.title}
            </h1>
            <p className="cs__line serif" data-reveal>
              {w.line}
            </p>
            <p className="cs__summary" data-reveal>
              {w.summary}
            </p>
            <p className="cs__detail" data-reveal>
              {w.detail}
            </p>

            <dl className="cs__facts" data-reveal>
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="mono dim">{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
              <div>
                <dt className="mono dim">Stack</dt>
                <dd className="cs__chips mono">
                  {w.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </dd>
              </div>
            </dl>

            {links.length > 0 && (
              <div className="cs__links" data-reveal>
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`cs__link mono ${l.primary ? "cs__link--primary" : ""}`}
                    {...(isExternal(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="roll">
                      <span data-text={l.label}>{l.label}</span>
                    </span>
                    <span className="arrow">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </aside>

        <div className="cs__media">
          <figure className="cs__figure" data-reveal>
            <Shot work={w} sizes="(max-width: 860px) 100vw, 62vw" priority />
          </figure>

          {(w.shots?.mobile || phones.length > 0) && desktop[1] && (
            <div className="cs__pair">
              <figure className="cs__figure cs__figure--tall" data-reveal>
                <Shot work={w} view={w.shots?.mobile ? "mobile" : "phones"} />
              </figure>
              <figure className="cs__figure cs__figure--tall" data-reveal>
                <Shot work={w} view="desktop" src={desktop[1]} bleed sizes="(max-width: 860px) 100vw, 31vw" />
              </figure>
            </div>
          )}

          {desktop[2] && (
            <figure className="cs__figure" data-reveal>
              <Shot work={w} view="desktop" src={desktop[2]} sizes="(max-width: 860px) 100vw, 62vw" />
            </figure>
          )}

          {phones.length > 1 && (
            <div className="cs__trio">
              {phones.map((p) => (
                <figure key={p} className="cs__figure cs__figure--phone" data-reveal>
                  <Shot work={w} view="mobile" src={p} />
                </figure>
              ))}
            </div>
          )}

          {cards.length > 1 && (
            <div className="cs__trio">
              {cards.map((c) => (
                <figure key={c} className="cs__figure cs__figure--phone" data-reveal>
                  <Shot work={w} view="card" src={c} />
                </figure>
              ))}
            </div>
          )}

          {w.modules && (
            <section className="cs__block" data-reveal>
              <h2 className="cs__h mono">
                <span>(Key features)</span>
                <span className="dim">{pad(w.modules.length)} modules</span>
              </h2>
              <div className="cs__modules">
                {w.modules.map((m, i) => (
                  <div key={m.title}>
                    <span className="mono dim">{pad(i + 1)}</span>
                    <b>{m.title}</b>
                    <span className="dim">{m.items}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {w.contributions && (
            <section className="cs__block" data-reveal>
              <h2 className="cs__h mono">
                <span>(What I did)</span>
                <span className="dim">{pad(w.contributions.length)}</span>
              </h2>
              <ol className="cs__list">
                {w.contributions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ol>
            </section>
          )}

          {w.flow && (
            <section className="cs__block" data-reveal>
              <h2 className="cs__h mono">
                <span>({w.flow.kind === "chain" ? "Workflow" : "Architecture"})</span>
                <span className="dim">{w.flow.title}</span>
              </h2>
              <figure className="cs__flow" style={{ "--tile": w.color } as CSSProperties}>
                <ol className={w.flow.kind === "chain" ? "cs__chain" : "cs__hub"}>
                  {w.flow.nodes.map((n, i) => (
                    <li key={n.label} className="cs__flow-node">
                      {w.flow!.kind === "chain" && <span className="mono">{pad(i + 1)}</span>}
                      <b>{n.label}</b>
                      <span>{n.note}</span>
                    </li>
                  ))}
                </ol>
              </figure>
            </section>
          )}

          {w.challenges && (
            <section className="cs__block" data-reveal>
              <h2 className="cs__h mono">
                <span>(Challenges &amp; solutions)</span>
                <span className="dim">{pad(w.challenges.length)}</span>
              </h2>
              <div className="cs__challenges">
                {w.challenges.map((c, i) => (
                  <article key={c.title} className="cs__challenge">
                    <span className="mono dim">{pad(i + 1)}</span>
                    <h3>{c.title}</h3>
                    <dl>
                      <div>
                        <dt className="mono dim">Challenge</dt>
                        <dd className="dim">{c.problem}</dd>
                      </div>
                      <div>
                        <dt className="mono dim">Solution</dt>
                        <dd>{c.solution}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <section className="cs-next section" aria-label="Next project">
        <Link href={`/work/${next.slug}`} className="cs-next__link" data-cursor="Next">
          <span className="cs-next__text">
            <span className="mono dim">
              Next project — {indexOf(next.slug)} <span className="arrow">↗</span>
            </span>
            <span className="cs-next__title">{next.title}</span>
            <span className="cs-next__line serif">{next.line}</span>
          </span>
          <span className="cs-next__media">
            <Shot work={next} sizes="(max-width: 860px) 100vw, 40vw" />
          </span>
        </Link>
      </section>
    </article>
  );
}
