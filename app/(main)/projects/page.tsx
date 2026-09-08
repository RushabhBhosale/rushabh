import Link from "next/link";
import { projects } from "@/utils/projects";
import { stations } from "@/utils/switchyard";
import ProductSurface from "@/components/switchyard/ProductSurface";

export const metadata = { title: "Work — Rushabh Bhosale" };
export default function ProjectsPage() {
  return (
    <div className="switchyard archive-page section-pad">
      <div className="section-line mono">
        <span>THE WORK / COMPLETE INDEX</span>
        <Link href="/home#work" className="text-link">
          TAKE THE SPATIAL ROUTE ↗
        </Link>
      </div>
      <div className="editorial-heading">
        <h1>
          Ideas, made
          <br />
          <em>useful.</em>
        </h1>
        <p>
          Web, mobile, desktop, and the tools in between. An index of things
          I’ve built.
        </p>
      </div>
      {stations.map((s, i) => (
        <article className="project-panel" key={s.id} id={s.id}>
          <div className="project-copy">
            <span className="mono station-label">
              0{i + 1} / {s.platform}
            </span>
            <h2>{s.name}</h2>
            <p className="project-line">{s.line}</p>
            <p className="project-description">{s.description}</p>
            <p className="project-detail">{s.detail}</p>
            <div className="project-links">
              <Link href={s.href} className="text-link">
                {s.action} ↗
              </Link>
              {s.github && (
                <a href={s.github} className="source-link">
                  Source ↗
                </a>
              )}
            </div>
          </div>
          <ProductSurface station={s} />
        </article>
      ))}
      <h2 className="archive-subheading">More routes to explore.</h2>
      <div className="archive-list">
        {projects
          .filter(
            (p) => !["AnimeSparks", "Expense Tracking App"].includes(p.title),
          )
          .map((p) => (
            <article key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div>
                {p.live && (
                  <a href={p.live} className="text-link">
                    Visit project ↗
                  </a>
                )}
                {p.github && (
                  <a href={p.github} className="text-link">
                    Source ↗
                  </a>
                )}
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}
