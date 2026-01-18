import Link from "next/link";
import { Send } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FloatingCodeSnippets from "./FloatingCodeSnippets";

const Hero = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-hero-light dark:bg-hero-dark bg-no-repeat bg-cover bg-center transition-colors relative px-4 overflow-hidden min-h-[70vh] md:min-h-[80vh]">
      <FloatingCodeSnippets />

      <div className="w-full max-w-[720px] text-center relative z-10">
        <div className="hidden tracking-[4px] uppercase text-primary font-semibold mb-4">
          Software Developer building React, Next.js, and full stack web apps
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground my-4 leading-tight quote">
          Rushabh Bhosale
        </h1>

        <div className="relative mb-4 mx-auto w-40 h-24 sm:w-44 sm:h-28 rounded-3xl overflow-hidden border border-border shadow-sm">
          <Image
            src="/me.png"
            alt="Rushabh Bhosale"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary-600/5 to-transparent"></div>
        </div>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-6">
          I&apos;m Rushabh Bhosale, a software developer focused on clean UI,
          performance, and SEO friendly web experiences. I build production apps
          with React, Next.js, TypeScript, Node.js, and MongoDB.
        </p>

        <p
          className="
           bg-transparent px-8 py-6 rounded-full w-fit mx-auto
  text-sm
    text-[color:var(--primary)]
    drop-shadow-[0_0_8px_oklch(0.78_0.2_35)]
  "
        >
          Right Click to download resume
        </p>
        <div className="flex gap-3 flex-row justify-center mb-6">
          <Link href="/projects">
            <Button className="gap-x-2">
              View Projects <Send size={18} />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" className="gap-x-2">
              About Me
            </Button>
          </Link>
        </div>

        <div className="flex justify-center gap-8 text-center mt-8">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">2+</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Years Experience
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">10+</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Projects Built
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">∞</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Lines of Code
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
