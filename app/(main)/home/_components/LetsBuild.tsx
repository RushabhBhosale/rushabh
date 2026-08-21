import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LetsBuild = () => {
  return (
    <section className="mt-20 mb-8 px-4 text-center w-full">
      <h2 className="font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-secondary-foreground to-[#808080aa] text-[clamp(3rem,8vw,8rem)]">
        LET&apos;S BUILD
      </h2>
      <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
        Code. Design. Deploy. Let&apos;s make it happen.
      </p>
      <div className="mt-8 flex justify-center gap-3 flex-wrap">
        <Link href="/contact">
          <Button size="lg">Start a Project</Button>
        </Link>
        <Link href="/projects">
          <Button size="lg" variant="secondary">
            View Portfolio
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LetsBuild;
