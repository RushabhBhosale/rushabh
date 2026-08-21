"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Code, Briefcase, GraduationCap } from "lucide-react";
import Cta from "@/components/Cta";
import { skillCategories } from "@/utils/skills";
import { experience } from "../../../utils/experience";
import { eduation } from "@/utils/education";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Subtle background accents */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-chart-4/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-8 border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span className="text-xs font-medium text-primary tracking-wider">Available for work</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-muted-foreground to-primary bg-clip-text text-transparent mb-8 tracking-tight heading">
            About Rushabh Bhosale
          </h1>

          <div className="space-y-6 text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-10 sans">
            <p className="text-balance">
              Hi, I'm Rushabh Bhosale, a software developer who builds modern web
              apps with React, Next.js, TypeScript, Node.js, and MongoDB. I care
              about clean UX, fast performance, and SEO first architecture.
            </p>
            <p className="text-balance">
              I've worked across frontend and backend and enjoy shipping real
              products end to end, from UI to APIs to deployment. I also run
              AnimeSparks, an editorial blog built with Next.js and Sanity, where
              I publish anime reviews and analysis.
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80">
              If you're looking to collaborate or hire, the fastest way to reach
              me is via email or LinkedIn.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-medium">Mumbai, India</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="p-2.5 bg-chart-4/20 rounded-lg">
                <Code className="w-5 h-5 text-chart-4" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-card-foreground heading">
                Skills & Technologies
              </h2>
            </div>
            <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto">
              Technologies I work with daily
            </p>
          </div>

          <Card className="bg-card/80 border border-border/50 backdrop-blur-sm shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {Object.entries(skillCategories).map(([category, skills]) => (
                  <div
                    key={category}
                    className="group space-y-5 p-6 bg-muted/10 rounded-2xl border border-border/30 transition-all duration-300 hover:bg-muted/15"
                  >
                    <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300"></div>
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {skills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-muted-foreground">
                              {skill.name}
                            </span>
                            <span className="text-xs text-primary font-semibold">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-border/50 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-primary/80 rounded-full transition-all duration-300 group-hover:bg-primary"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-border/30">
                <div className="flex flex-wrap gap-3 justify-center">
                  {["Git & Github", "Figma", "Redux", "Zustand"].map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="bg-primary/5 text-muted-foreground border-primary/20 px-4 py-2 cursor-default transition-all duration-300 hover:bg-primary/10 hover:border-primary/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experience & Education */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Experience */}
          <Card className="bg-card/80 border border-border/50 backdrop-blur-sm shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/20 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-card-foreground heading">
                  Experience
                </h2>
              </div>

              <div className="space-y-6">
                {experience.map((job, i) => (
                  <div
                    key={i}
                    className={`border-l-2 border-${
                      job.color === "primary" ? "primary" : "border"
                    }/50 pl-6 relative group text-sm leading-relaxed`}
                  >
                    <div
                      className={`absolute -left-2 top-0 w-3 h-3 ${
                        job.color === "primary" ? "bg-primary" : "bg-muted"
                      } rounded-full group-hover:scale-125 transition-transform duration-300`}
                    ></div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-card-foreground">
                        {job.title}
                      </h3>
                      <span className="text-xs text-muted-foreground/70">
                        {job.time}
                      </span>
                    </div>
                    <p
                      className={`text-${
                        job.color === "primary" ? "primary" : "muted-foreground"
                      } text-xs font-medium mb-1`}
                    >
                      {job.role}
                    </p>
                    {job.desc && (
                      <p className="text-muted-foreground/80 text-xs leading-relaxed sans">
                        {job.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="bg-card/80 border border-border/50 backdrop-blur-sm shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-chart-2/20 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-chart-2" />
                </div>
                <h2 className="text-2xl font-bold text-card-foreground heading">
                  Education
                </h2>
              </div>

              <div className="space-y-6 text-sm leading-relaxed">
                {eduation.map((edu, i) => (
                  <div
                    key={i}
                    className={`border-l-2 ${
                      edu.color ? `border-${edu.color}/50` : "border-border/50"
                    } pl-6 relative group`}
                  >
                    <div
                      className={`absolute -left-2 top-0 w-3 h-3 ${
                        edu.color ? `bg-${edu.color}` : "bg-muted"
                      } rounded-full group-hover:scale-125 transition-transform duration-300`}
                    ></div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-card-foreground">
                        {edu.name}
                      </h3>
                      <span className="text-xs text-muted-foreground/70">
                        {edu.time}
                      </span>
                    </div>
                    <p
                      className={`text-${
                        edu.color ? `${edu.color}/80` : "muted-foreground/80"
                      } text-xs`}
                    >
                      {edu.sub}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <Cta page={true} />
      </div>
    </div>
  );
}