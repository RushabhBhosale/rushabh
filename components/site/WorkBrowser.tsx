"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import Shot from "./Shot";
import { disciplines, indexOf, type Discipline, type Work } from "@/utils/work";

/* Discipline filters above a two-column grid of framed screenshots. */
export default function WorkBrowser({ items }: { items: Work[] }) {
  const [filter, setFilter] = useState<Discipline | "All">("All");
  const toolbar = useRef<HTMLDivElement>(null);

  const shown = useMemo(() => (filter === "All" ? items : items.filter((w) => w.discipline === filter)), [filter, items]);
  const counts = (d: Discipline | "All") => (d === "All" ? items.length : items.filter((w) => w.discipline === d).length);

  const choose = (d: Discipline | "All") => {
    setFilter(d);
    // Bring the grid back into view if you filtered from further down.
    const top = toolbar.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.__lenis?.scrollTo(toolbar.current!, { offset: -100 });
  };

  return (
    <section className="work-browser section" aria-label="Projects">
      <div className="toolbar" ref={toolbar}>
        <div className="toolbar__filters" role="group" aria-label="Filter by discipline">
          {(["All", ...disciplines] as const).map((d) => (
            <button
              key={d}
              type="button"
              className="chip"
              aria-pressed={filter === d}
              onClick={() => choose(d)}
              disabled={counts(d) === 0}
            >
              {d}
              <sup className="mono">{counts(d)}</sup>
            </button>
          ))}
        </div>
        <span className="mono dim">
          Showing {String(shown.length).padStart(2, "0")} of {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <ul className="wgrid" key={filter}>
        {shown.map((w, i) => (
          <li key={w.slug} className="wgrid__item" style={{ animationDelay: `${i * 0.06}s` }}>
            <Link href={`/work/${w.slug}`} className="wgrid__card" data-cursor="View">
              <span className="wgrid__media">
                <Shot work={w} bleed sizes="(max-width: 860px) 100vw, 50vw" priority={i < 2} />
              </span>
              <span className="wgrid__cap">
                <span className="wgrid__title">
                  <span className="mono dim">({indexOf(w.slug)})</span> {w.title}
                </span>
                <span className="mono dim">
                  {w.discipline}
                  {w.year ? ` — ${w.year}` : ""}
                </span>
              </span>
              <span className="wgrid__line">{w.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
