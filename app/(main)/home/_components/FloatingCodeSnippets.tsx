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

const seededPosition = (index: number, offset: number) => {
  const value = Math.sin(index * 12.9898 + offset) * 43758.5453;
  return `${((value - Math.floor(value)) * 90).toFixed(4)}%`;
};

const FloatingCodeSnippets = () => {
  return (
    <>
      {Array.from({ length: 100 }).map((_, i) => {
        const top = seededPosition(i, 4.23);
        const left = seededPosition(i, 9.71);
        const phrase = phrases[i % phrases.length];

        return (
          <div
            key={i + "-"}
            className="absolute text-[10px] font-mono opacity-10 hidden lg:block pointer-events-none animate-float transition-all duration-700 ease-in-out"
            style={{
              top,
              left,
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
