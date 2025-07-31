"use client";

import React from "react";
import { RiGithubFill } from "react-icons/ri";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Movie Watchlist App",
    description:
      "Track your favorite movies, manage watch status, and get smart recommendations.",
    image: "/bg.avif",
    github: "https://github.com/youruser/movie-watchlist",
    live: "/projects/movie-watchlist",
  },
  {
    title: "AI Travel Dashboard",
    description:
      "Explore destinations, generate itineraries, and visualize trips using AI & maps.",
    image: "/bg.avif",
    github: "https://github.com/youruser/travel-dashboard",
    live: "/projects/travel-dashboard",
  },
  {
    title: "Trip Expense Splitter",
    description:
      "Split and track travel expenses with friends. UPI-ready, clean UI.",
    image: "/bg.avif",
    github: "https://github.com/youruser/trip-splitter",
    live: "/projects/trip-splitter",
  },
];

const Projects = () => {
  return (
    <section className="w-full max-w-6xl px-6 mb-12 mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="relative group rounded-xl overflow-hidden border border-border bg-zinc-900 w-full h-60 "
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0  dark:bg-black/70 transition-opacity duration-300 flex flex-col justify-between p-6">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-300 mt-2">
                  {project.description}
                </p>
              </div>
              <div className="flex gap-4 mt-4">
                <a
                  href={project.github}
                  target="_blank"
                  className="text-white hover:text-primary flex items-center gap-1"
                >
                  <RiGithubFill size={18} /> GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  className="text-white hover:text-primary flex items-center gap-1"
                >
                  <ExternalLink size={18} /> Live
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
