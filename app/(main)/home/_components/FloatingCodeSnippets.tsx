"use client";
import React from "react";

const phrases = [
  `const user = "Rushabh";`,
  `// React Developer`,
  `return "frontend magic"`,
  `Anime for life`,
  `Travel Japan`,
  `import skills from 'life';`,
  `console.log("Success 🚀");`,
  `<Component />`,
  `useEffect(() => {}, []);`,
  `theme: "dark",`,
  `skills.push("Next.js")`,
  `#Tailwind FTW`,
  `npm i motivation`,
  `function build() {}`,
  `let code = life();`,
  `@media (you: interested)`,
  `flex + grid = ❤️`,
  `deploy("vercel")`,
  `export default Dream`,
];

const FloatingCodeSnippets = () => {
  return (
    <>
      {Array.from({ length: 100 }).map((_, i) => {
        const top = Math.random() * 90;
        const left = Math.random() * 90;
        const phrase = phrases[i % phrases.length];

        return (
          <div
            key={i + "-"}
            className="absolute text-[10px] font-mono opacity-10 hidden lg:block pointer-events-none animate-float transition-all duration-700 ease-in-out"
            style={{
              top: `${top}%`,
              left: `${left}%`,
            }}
          >
            {phrase}
          </div>
        );
      })}
    </>
  );
};

export default FloatingCodeSnippets;
