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
      <div className="relative z-10 container mx-auto px-6 md:py-12 py-0">
        <div className="text-center mb-20">
          <div className="inline-block p-1 bg-primary/20 rounded-full mb-6">
            <Badge variant="secondary" className="bg-transparent text-primary">
              <Code className="w-4 h-4 mr-2" />
              Available for work
            </Badge>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-muted-foreground to-primary bg-clip-text text-transparent mb-6 tracking-tight heading">
            Rushabh Bhosale
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 sans">
            Software developer with a creative edge. I build responsive apps,
            websites, and design clean UIs. I make what I need, and learn fast.
          </p>

          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span>Software Developer at Peracto Infotech</span>
          </div>
        </div>

        <Card className="bg-card/80 border border-border backdrop-blur-sm mb-20 overflow-hidden">
          <CardContent className="px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-chart-4/20 rounded-md">
                <Code className="w-4 h-4 text-chart-4" />
              </div>
              <h2 className="text-xl font-bold text-card-foreground heading">
                Skills & Technologies
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <div
                  key={category}
                  className="space-y-4 p-6 bg-muted/20 rounded-xl border border-border/50"
                >
                  <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                    {category}
                  </h3>
                  <div className="space-y-3">
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
                        <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-primary/80 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-border/50">
              <div className="flex flex-wrap gap-3 justify-center">
                {["Git & Github", "Figma", "Redux", "Zustand"].map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-primary/5 text-muted-foreground border-primary/20 px-4 py-2 cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-card/80 backdrop-blur-sm shadow-2xl/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-card-foreground heading">
                  Experience
                </h2>
              </div>

              <div className="space-y-4">
                {experience.map((job, i) => (
                  <div
                    key={i}
                    className={`border-l-2 border-${
                      job.color === "primary" ? "primary" : "border"
                    } pl-5 relative text-sm leading-relaxed`}
                  >
                    <div
                      className={`absolute -left-2 top-0 w-3 h-3 ${
                        job.color === "primary" ? "bg-primary" : "bg-muted"
                      } rounded-full`}
                    ></div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-card-foreground">
                        {job.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {job.time}
                      </span>
                    </div>
                    <p
                      className={`text-${
                        job.color === "primary" ? "primary" : "muted-foreground"
                      } text-xs mb-1`}
                    >
                      {job.role}
                    </p>
                    {job.desc && (
                      <p className="text-muted-foreground text-xs sans">
                        {job.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="bg-card/80 backdrop-blur-sm shadow-2xl/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-chart-2/20 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-chart-2" />
                </div>
                <h2 className="text-xl font-bold text-card-foreground heading">
                  Education
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-relaxed">
                {eduation.map((edu, i) => (
                  <div
                    key={i}
                    className={`border-l-2 ${
                      edu.color ? `border-${edu.color}` : "border-border"
                    } pl-5 relative`}
                  >
                    <div
                      className={`absolute -left-2 top-0 w-3 h-3 ${
                        edu.color ? `bg-${edu.color}` : "bg-muted"
                      } rounded-full`}
                    ></div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-card-foreground">
                        {edu.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {edu.time}
                      </span>
                    </div>
                    <p
                      className={`text-${
                        edu.color ? `${edu.color}` : "muted-foreground"
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
