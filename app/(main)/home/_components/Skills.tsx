import { skills } from "@/utils/skills";
import React from "react";

const SkillsSection = () => {
  return (
    <section className="mt-20 px-4 text-center w-full">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
        Skills & Tech Stack
      </h2>
      <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base mb-8">
        Tools and technologies I work with regularly.
      </p>
      <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3.5 py-1.5 bg-muted rounded-full text-xs font-medium tracking-wide text-muted-foreground dark:text-white/90 ring-1 ring-white/10"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
