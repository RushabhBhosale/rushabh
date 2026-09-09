"use client";

import { skillMatrix } from "@/utils/skills";

export default function SkillsBento() {
  return (
    <div className="flex flex-col text-left w-full">
      {/* Section Line Header */}
      <div className="section-line mono mb-3 pb-2 border-b border-border/40">
        <span>02 / CAPABILITIES</span>
        <span>PRODUCTION READY</span>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-balance">
          Core Technologies.
          <br />
          <em className="font-serif italic font-normal text-primary">The toolkit.</em>
        </h2>
      </div>

      {/* Cardless Capability Matrix */}
      <div className="divide-y divide-border/40 border-y border-border/40">
        {skillMatrix.map((item) => (
          <div
            key={item.category}
            className="py-4 hover:bg-muted/15 px-2 rounded-lg transition-colors flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} aria-hidden="true" />
              <span className="mono text-[10px] text-muted-foreground">{item.tag}</span>
              <h3 className="text-sm font-bold text-foreground tracking-tight">
                {item.category}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-card border border-border/70 text-xs font-mono text-foreground hover:border-primary/60 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
