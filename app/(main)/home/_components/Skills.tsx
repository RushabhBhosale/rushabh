import React from "react";

const skills = [
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Kotlin",
  "Java",
  "Angular",
  "Ionic",
  "NextAuth",
  "Javascript",
  "Git & GitHub",
];

const SkillsSection = () => {
  return (
    <section className="mt-32 px-4 text-center w-full">
      <h2 className="text-4xl font-bold tracking-tight text-foreground mb-6">
        Skills & Tech Stack
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg mb-10">
        Tools and technologies I work with regularly — from building sleek UIs
        to powerful APIs.
      </p>
      <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-muted rounded-full text-xs md:text-sm font-medium tracking-widest text-white
                 shadow-[0_0_8px_rgba(255,255,255,0.2)] ring-1 ring-white/10 backdrop-blur-sm
                 md:shadow-none md:ring-0 md:backdrop-blur-0"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
