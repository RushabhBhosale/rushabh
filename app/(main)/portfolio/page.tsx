import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experience } from "@/utils/experience";
import { eduation } from "@/utils/education";
import { projects } from "@/utils/projects";
import { skillCategories, skills } from "@/utils/skills";
import {
  Briefcase,
  Code,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const PortfolioPage = () => {
  return (
    <main className="min-h-screen w-full bg-background text-foreground relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-10 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Status Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-sm font-medium shadow-sm"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for work
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="text-center space-y-6 mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                Rushabh Bhosale
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground/90">
              Full-Stack Developer & UI Architect
            </p>
          </div>

          {/* Description */}
          <p className="text-center text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-10">
            Crafting pixel-perfect, performant web experiences with React,
            Next.js, and TypeScript. Specializing in beautiful interfaces that
            prioritize user experience, accessibility, and scalable
            architecture.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link href="mailto:bhosalerushabh0@gmail.com">
              <Button
                size="lg"
                className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Mail className="w-4 h-4" /> Get in Touch
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/rushabh-bhosale-software-developer/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <Send className="w-4 h-4" /> LinkedIn
              </Button>
            </Link>
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2">
                <Download className="w-4 h-4" /> Resume
              </Button>
            </Link>
          </div>

          {/* Info Pills */}
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Mumbai, India · Remote-friendly</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border backdrop-blur-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span>2+ years experience</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>10+ projects shipped</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <nav className="flex flex-wrap gap-2 justify-center mt-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Code className="w-6 h-6" />,
              title: "Product-Minded Builder",
              body: "Transform concepts into production-ready features with rapid iterations and user-focused design thinking.",
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: "End-to-End Delivery",
              body: "Full-stack expertise across frontend, backend, DevOps, and SEO to ship fast and iterate safely.",
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Performance Obsessed",
              body: "Building lightning-fast, accessible interfaces with exceptional UX and search engine optimization.",
            },
          ].map((item, idx) => (
            <div
              key={item.title}
              className="group relative p-8 rounded-2xl border border-border bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
                Technical Arsenal
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Skills & Expertise
              </h2>
            </div>
          </div>
        </div>

        {/* Skill Categories with Progress Bars */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {Object.entries(skillCategories).map(([category, items]) => (
            <div
              key={category}
              className="p-6 rounded-2xl border border-border bg-gradient-to-br from-background to-muted/20 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold mb-6 pb-3 border-b border-border">
                {category}
              </h3>
              <div className="space-y-5">
                {items.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-primary font-bold tabular-nums">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Tags */}
        <div className="p-8 rounded-2xl border border-border bg-muted/20">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="bg-background/50 text-foreground border-border/50 hover:border-primary/50 hover:bg-primary/5 px-4 py-1.5 text-sm transition-all cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Experience */}
          <div className="p-8 rounded-2xl border border-border bg-gradient-to-br from-background to-muted/20">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
                    Professional Journey
                  </p>
                  <h2 className="text-2xl font-bold">Experience</h2>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {experience.map((role, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 border-l-2 border-border/50 hover:border-primary/50 transition-colors"
                >
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="text-lg font-semibold text-foreground">
                        {role.title}
                      </h4>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {role.time}
                      </span>
                    </div>
                    <p className="text-sm text-primary font-semibold">
                      {role.role}
                    </p>
                    {role.desc && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {role.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-8 rounded-2xl border border-border bg-gradient-to-br from-background to-muted/20">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-chart-2/10 text-chart-2">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
                    Academic Background
                  </p>
                  <h2 className="text-2xl font-bold">Education</h2>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {eduation.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 border-l-2 border-border/50 hover:border-chart-2/50 transition-colors"
                >
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-chart-2 ring-4 ring-background" />
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="text-lg font-semibold text-foreground">
                        {edu.name}
                      </h4>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {edu.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {edu.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
                Featured Work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold">Projects</h2>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="group relative rounded-2xl border border-border bg-gradient-to-br from-background to-muted/20 p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:border-primary/50"
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary hover:bg-primary/5 hover:text-primary transition-all text-sm font-medium"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary hover:bg-primary/5 hover:text-primary transition-all text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-12 sm:p-16 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Open to opportunities</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Let&apos;s Build Something Amazing
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Ready to collaborate on innovative web applications, dashboards,
              or digital experiences. Let&apos;s create something exceptional
              together.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="mailto:bhosalerushabh0@gmail.com">
                <Button
                  size="lg"
                  className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Mail className="w-4 h-4" /> Email Me
                </Button>
              </Link>
              <Link
                href="https://www.linkedin.com/in/rushabh-bhosale-software-developer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 shadow-md hover:shadow-lg transition-shadow"
                >
                  <Send className="w-4 h-4" /> Connect on LinkedIn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
