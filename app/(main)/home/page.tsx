import React from "react";
import Hero from "./_components/Hero";
import LetsBuild from "./_components/LetsBuild";
import SkillsSection from "./_components/Skills";
import Blogs from "./_components/Blogs";
import Projects from "./_components/Projects";
import About from "./_components/About";
import DailySparks from "./_components/DailySparks";
import ToolsSection from "./_components/Tools";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-start w-full">
      <Hero />
      <SkillsSection />
      <About />
      <DailySparks />
      <ToolsSection />
      <Blogs />
      <Projects />
      <LetsBuild />
    </main>
  );
};

export default Home;
