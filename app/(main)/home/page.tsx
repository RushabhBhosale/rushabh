import React from "react";
import Hero from "./_components/Hero";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-start w-full">
      <Hero />

      <section className="mt-24 px-4 text-center w-full">
        <h2 className="font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-[clamp(3rem,10vw,10rem)]">
          LET'S BUILD
        </h2>
        <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
          Code. Design. Deploy. Together. 🚀 Whether it's websites, mobile apps,
          or full-stack magic — let's make it happen.
        </p>
      </section>
    </main>
  );
};

export default Home;
