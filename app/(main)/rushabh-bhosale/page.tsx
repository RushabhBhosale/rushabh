import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Rushabh Bhosale | Software Developer",
  description:
    "Rushabh Bhosale is a software developer specializing in React, Next.js, TypeScript, and full stack web development. Explore projects, experience, and ways to connect.",
};

export default function RushabhBhosalePage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold heading text-foreground">
          Rushabh Bhosale
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Rushabh Bhosale is a software developer specializing in React,
          Next.js, TypeScript, and full stack web development. This site is my
          portfolio where I share projects, experience, and writing.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Key skills include React, Next.js (App Router), JavaScript,
          TypeScript, Tailwind CSS, Node.js, Express, MongoDB, REST APIs, and
          SEO friendly web architecture.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Featured work includes AnimeSparks, a modern editorial blog built with
          Next.js and Sanity.
        </p>
      </div>

      <Card className="bg-card/80 border border-border backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/projects"
              className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3 hover:border-primary transition-colors"
            >
              <div>
                <p className="text-sm text-muted-foreground">Projects</p>
                <p className="font-semibold text-card-foreground">
                  Work samples and case studies
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3 hover:border-primary transition-colors"
            >
              <div>
                <p className="text-sm text-muted-foreground">About</p>
                <p className="font-semibold text-card-foreground">
                  Background and experience
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3 hover:border-primary transition-colors"
            >
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-semibold text-card-foreground">
                  Email and social links
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
            <Link
              href="/projects"
              className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3 hover:border-primary transition-colors"
            >
              <div>
                <p className="text-sm text-muted-foreground">Featured</p>
                <p className="font-semibold text-card-foreground">
                  AnimeSparks and more
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground text-center">
        If you&apos;re here from AnimeSparks, you can check it out here:{" "}
        <a
          href="https://www.animesparks.blog"
          className="text-primary hover:underline"
        >
          https://www.animesparks.blog
        </a>
      </p>
    </section>
  );
}
