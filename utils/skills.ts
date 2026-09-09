export const skillCategories = {
  Frontend: [
    { name: "React / Next.js", level: 85 },
    { name: "Angular", level: 60 },
    { name: "TypeScript", level: 70 },
    { name: "Tailwind CSS", level: 92 },
  ],
  Backend: [
    { name: "Node.js", level: 75 },
    { name: "Express.js", level: 70 },
    { name: "MongoDB", level: 80 },
  ],
  "Mobile & Tools": [
    { name: "React Native", level: 80 },
    { name: "Ionic", level: 75 },
    { name: "Java / Kotlin", level: 45 },
    { name: "Swift", level: 25 },
  ],
};

export const skills = [
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

export const skillMatrix = [
  {
    category: "Frontend",
    tag: "01",
    color: "bg-emerald-400",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Mobile Apps",
    tag: "02",
    color: "bg-sky-400",
    skills: ["React Native", "Android SDK", "Ionic", "SQLite"],
  },
  {
    category: "Backend",
    tag: "03",
    color: "bg-amber-400",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    category: "Tools & SEO",
    tag: "04",
    color: "bg-purple-400",
    skills: ["Technical SEO", "Sanity CMS", "Git & GitHub", "n8n Automation"],
  },
];

// Combine the portfolio skill lists without repeating aliases or grouped labels.
export const toolkitSkills = Array.from(new Set([
  ...skillMatrix.flatMap((category) => category.skills),
  ...skills,
  ...Object.values(skillCategories).flatMap((category) =>
    category.flatMap((skill) => skill.name.split(" / ")),
  ),
].map((skill) => {
  if (skill === "React") return "React.js";
  if (skill === "Javascript") return "JavaScript";
  return skill;
})));
