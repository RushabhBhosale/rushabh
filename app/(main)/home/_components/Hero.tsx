import Link from "next/link";
import { Send } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FloatingCodeSnippets from "./FloatingCodeSnippets";

const Hero = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-hero-light dark:bg-hero-dark bg-no-repeat bg-cover bg-center transition-colors relative px-4 overflow-hidden">
      <FloatingCodeSnippets />

      <div className="w-full max-w-[720px] text-center relative z-10">
        <div className="text-sm tracking-[4px] uppercase text-primary font-semibold mb-4">
          Software Developer
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground my-4 leading-tight quote">
          Hi, I'm Rushabh Bhosale <br /> $ git commit -m "Built something cool"
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
          Experienced Software Developer proficient with Next.js, React, Redux,
          and modern CSS frameworks like Tailwind CSS and Bootstrap. I also
          build mobile apps using React Native, Java, and Ionic.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row justify-center mb-6">
          <Link href="/">
            <Button className="gap-x-2">
              Contact Me <Send size={18} />
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="secondary" className="gap-x-2">
              Projects
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
