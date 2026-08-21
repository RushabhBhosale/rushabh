"use client";

import React from "react";
import { RiGithubFill } from "react-icons/ri";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { projects } from "@/utils/projects";

const Projects = () => {
  return (
    <section className="w-full max-w-6xl px-4 sm:px-6 mt-20 mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-foreground tracking-tight">
        Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group rounded-xl overflow-hidden border border-border/60 bg-card transition-all duration-300 hover:shadow-lg hover:border-border"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover brightness-[0.25] group-hover:brightness-[0.4] transition-all duration-500"
              />

              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 p-2 rounded-lg transition-all duration-200"
                  >
                    <RiGithubFill size={16} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 p-2 rounded-lg transition-all duration-200"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
