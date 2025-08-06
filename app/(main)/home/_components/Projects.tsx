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
    image: "/projects/watchlist.png",
    github: "https://github.com/RushabhBhosale/Movies",
    live: "https://watchlist.rushabh.in/",
  },
  {
    title: "AI Travel Planner",
    description:
      "Explore destinations, generate itineraries, and visualize trips using AI & maps.",
    image: "/bg.avif",
    github: "https://github.com/RushabhBhosale/travel-app",
  },
  {
    title: "Ecommerce Sofa Website",
    description:
      "Modern furniture store with smooth UI, cart system, and Firebase-powered checkout. Type anything to login",
    image: "/projects/sofa.png",
    github: "https://github.com/RushabhBhosale/Firebase-react-ecommerce",
    live: "https://bejewelled-yeot-744c49.netlify.app/",
  },
  {
    title: "Ecommerce Clothing Website",
    description:
      "Stylish apparel shop built with React. Features filtering, cart, and responsive design.",
    image: "/projects/clothing.png",
    github: "https://github.com/RushabhBhosale/ecommerce",
    live: "https://best-ecommerce.netlify.app/",
  },
  {
    title: "N8N Blog Automation",
    description:
      "Type a topic in the n8n workflow it create a blog and post it within 10-15 minutes",
    image: "/projects/blog.png",
    github: "https://github.com/RushabhBhosale/ecommerce",
    live: "https://best-ecommerce.netlify.app/",
  },
];

const Projects = () => {
  return (
    <section className="w-full max-w-6xl px-6 mb-16 mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground tracking-tight">
        Latest Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="relative group rounded-2xl overflow-hidden border border-muted bg-muted/10 transition-shadow min-h-60"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover scale-110 md:group-hover:scale-100 blur-sm md:group-hover:blur-none brightness-[0.4] md:group-hover:brightness-50 transition-all duration-500 z-0"
            />

            <div className="absolute inset-0 flex items-center justify-center text-center p-6 z-10 transition-opacity duration-300 md:group-hover:opacity-0">
              <div>
                <h3 className="text-2xl font-semibold text-white drop-shadow-sm">
                  {project.title}
                </h3>
                <p className="text-sm text-white/90 font-medium mt-2">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300 flex gap-4">
              <a
                href={project.github}
                target="_blank"
                className="text-white hover:text-primary flex items-center gap-1 text-sm transition-colors"
              >
                <RiGithubFill size={18} /> GitHub
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  className="text-white hover:text-primary flex items-center gap-1 text-sm transition-colors"
                >
                  <ExternalLink size={18} /> Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
