"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/utils/projects";

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl xl:mx-auto lg:mx-4 md:mx-8 mx-4 mb-20 space-y-12">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold heading text-card-foreground">
          Projects
        </h2>
        <p className="text-muted-foreground text-sm max-w-md">
          A few things I’ve built recently — combining tech, design, and a
          sprinkle of obsession.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="bg-card/80 border border-border backdrop-blur-sm flex flex-col overflow-hidden"
          >
            <div className="relative h-48 w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4 flex flex-col flex-1 justify-between space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <div className="flex gap-3 mt-auto">
                {project.github && (
                  <Link href={project.github} target="_blank">
                    <Button variant="outline" size="sm">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </Button>
                  </Link>
                )}
                {project.live && (
                  <Link href={project.live} target="_blank">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
