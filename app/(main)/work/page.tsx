import type { Metadata } from "next";
import WorkBrowser from "@/components/site/WorkBrowser";
import { work } from "@/utils/work";

export const metadata: Metadata = {
  title: "Work — Rushabh Bhosale",
  description:
    "An index of things Rushabh Bhosale has built: web platforms, mobile apps, desktop tools, and automations.",
};

export default function WorkPage() {
  return (
    <div className="page">
      <header className="page-hero section">
        <div className="page-hero__meta mono">
          <span>(Index)</span>
          <span className="dim">Web, mobile, desktop &amp; the tools in between</span>
          <span>Updated {new Date().getFullYear()}</span>
        </div>
        <h1 className="page-hero__title display" data-lines>
          Work<sup className="mono">({String(work.length).padStart(2, "0")})</sup>
        </h1>
        <p className="page-hero__lede" data-reveal>
          Ideas, made <span className="serif">useful.</span> Products I’ve designed, built and shipped — mostly
          because the problem wouldn’t leave me alone.
        </p>
      </header>
      <WorkBrowser items={work} />
    </div>
  );
}
