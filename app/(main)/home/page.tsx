import React from "react";
import Hero from "./_components/Hero";
import LetsBuild from "./_components/LetsBuild";
import SkillsSection from "./_components/Skills";
import Blogs from "./_components/Blogs";
import Projects from "./_components/Projects";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-start w-full">
      <Hero />
      <SkillsSection />
      <Blogs />
      <Projects />
      <LetsBuild />
    </main>
  );
};

export default Home;
