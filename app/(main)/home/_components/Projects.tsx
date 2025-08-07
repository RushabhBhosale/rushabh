"use client";

import React from "react";
import { RiGithubFill } from "react-icons/ri";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { projects } from "@/utils/projects";

const Projects = () => {
  return (
    <section className="w-full max-w-6xl px-4 sm:px-6 mb-16 mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-foreground tracking-tight">
        Latest Projects
      </h2>

      <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group rounded-xl sm:rounded-2xl overflow-hidden border border-muted bg-muted/10 transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative h-48 sm:h-56 md:h-64">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover brightness-[0.3] sm:brightness-[0.2] md:group-hover:brightness-50 transition-all duration-500"
              />

              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                <div className="flex-1 mt-16 text-center md:opacity-100 md:group-hover:opacity-0 md:transition-opacity md:duration-300">
                  <h3 className="text-lg sm:text-xl md:text-3xl font-semibold text-white drop-shadow-sm mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex justify-center gap-4 mt-4 md:absolute md:bottom-4 md:left-4 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 md:transition-all md:duration-300">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 backdrop-blur-sm text-white hover:text-primary hover:bg-white/30 flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95"
                  >
                    <RiGithubFill size={16} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">GitHub</span>
                    <span className="sm:hidden">Code</span>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm text-white hover:text-primary hover:bg-white/30 flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95"
                    >
                      <ExternalLink size={16} className="sm:w-4 sm:h-4" />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
