import type { CSSProperties } from "react";
import type { SearchReport as Report } from "@/utils/work";

const pad = (n: number) => String(n).padStart(2, "0");
const compact = (n: number) => (n >= 10000 ? `${Math.round(n / 1000)}k` : n.toLocaleString("en-GB"));
const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

/* Month labels sit under the first week that starts in that month. */
function monthTicks(weeks: Report["weeks"]) {
  return weeks.flatMap(([start], i) => {
    const month = start.slice(5, 7);
    if (i > 0 && weeks[i - 1][0].slice(5, 7) === month) return [];
    const label = new Date(`${start}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    return [{ label, left: (i / weeks.length) * 100 }];
  });
}

function WeekBars({ title, weeks, metric }: { title: string; weeks: Report["weeks"]; metric: 1 | 2 }) {
  const values = weeks.map((w) => w[metric]);
  const max = Math.max(...values);
  const peak = values.indexOf(max);
  const unit = metric === 1 ? "clicks" : "impressions";

  return (
    <div className="sr-chart">
      <div className="sr-chart__head mono">
        <span>{title}</span>
        <span className="dim">Peak {compact(max)}</span>
      </div>
      <div
        className="sr-chart__bars"
        role="img"
        aria-label={`${title}: ${compact(values[0])} in the week of ${shortDate(weeks[0][0])}, peaking at ${compact(max)} in the week of ${shortDate(weeks[peak][0])}, then ${compact(values[values.length - 1])} in the week of ${shortDate(weeks[weeks.length - 1][0])}.`}
      >
        {weeks.map(([start], i) => (
          <i
            key={start}
            className={i === peak ? "is-peak" : undefined}
            style={{ height: `${Math.max((values[i] / max) * 100, 0.8)}%` }}
            title={`Week of ${shortDate(start)}: ${values[i].toLocaleString("en-GB")} ${unit}`}
          />
        ))}
      </div>
    </div>
  );
}

/* Search Console numbers for a project still in progress: the climb, then what's wrong with it. */
export default function SearchReport({ report, tile }: { report: Report; tile: string }) {
  const { weeks } = report;
  const lastWeek = weeks[weeks.length - 1][0];

  return (
    <div className="sr" style={{ "--tile": tile } as CSSProperties}>
      <section className="cs__block" data-reveal>
        <h2 className="cs__h mono">
          <span>(Search Console)</span>
          <span className="dim">Ongoing · updated {report.updated}</span>
        </h2>
        <p className="sr__verdict">{report.verdict}</p>
        <p className="sr__intro">{report.intro}</p>

        <dl className="sr__stats">
          {report.months.map((m) => (
            <div key={m.label}>
              <dt className="mono dim">{m.label}</dt>
              <dd>{m.to}</dd>
              <dd className="mono dim">from {m.from} in January</dd>
            </div>
          ))}
        </dl>
        <p className="sr__note dim">{report.totals}</p>
      </section>

      <section className="cs__block" data-reveal>
        <h2 className="cs__h mono">
          <span>(Progress)</span>
          <span className="dim">
            Weekly, {shortDate(weeks[0][0])} – {shortDate(lastWeek)}
          </span>
        </h2>
        <figure className="sr__charts">
          <WeekBars title="Impressions per week" weeks={weeks} metric={2} />
          <WeekBars title="Clicks per week" weeks={weeks} metric={1} />
          <div className="sr-chart__axis mono dim" aria-hidden="true">
            {monthTicks(weeks).map((t) => (
              <span key={t.label} style={{ left: `${t.left}%` }}>
                {t.label}
              </span>
            ))}
          </div>
          <figcaption className="sr__note dim">
            {report.spike} Source: Google Search Console, web search, {report.period}.
          </figcaption>
        </figure>
      </section>

      {report.queries && (
        <section className="cs__block" data-reveal>
          <h2 className="cs__h mono">
            <span>(Top searches)</span>
            <span className="dim">{report.period}</span>
          </h2>
          <div className="sr-table">
            <table>
              <thead className="mono dim">
                <tr>
                  <th scope="col">Query</th>
                  <th scope="col">Clicks</th>
                  <th scope="col">Impressions</th>
                  <th scope="col">Position</th>
                </tr>
              </thead>
              <tbody>
                {report.queries.map((q) => (
                  <tr key={q.query}>
                    <th scope="row">{q.query}</th>
                    <td>{q.clicks}</td>
                    <td>{q.impressions}</td>
                    <td>{q.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {report.playbook && (
        <section className="cs__block" data-reveal>
          <h2 className="cs__h mono">
            <span>(How I use SEO)</span>
            <span className="dim">{pad(report.playbook.length)}</span>
          </h2>
          <ol className="cs__list">
            {report.playbook.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </section>
      )}

      <section className="cs__block" data-reveal>
        <h2 className="cs__h mono">
          <span>(Next up)</span>
          <span className="dim">{pad(report.gaps.length)}</span>
        </h2>
        <div className="cs__challenges">
          {report.gaps.map((g, i) => (
            <article key={g.title} className="cs__challenge">
              <span className="mono dim">{pad(i + 1)}</span>
              <h3>{g.title}</h3>
              <dl>
                <div>
                  <dt className="mono dim">Where it stands</dt>
                  <dd className="dim">{g.problem}</dd>
                </div>
                <div>
                  <dt className="mono dim">What’s next</dt>
                  <dd>{g.next}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
