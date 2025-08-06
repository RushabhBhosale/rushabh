import { Button } from "@/components/ui/button";
import React from "react";

const LetsBuild = () => {
  return (
    <section className="mt-24 px-4 text-center w-full">
      <h2 className="font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-secondary-foreground to-[#808080aa] text-[clamp(4rem,10vw,10rem)]">
        LET&apos;S BUILD
      </h2>
      <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
        Code. Design. Deploy. Together. Whether it&apos;s websites, mobile apps,
        or full-stack magic — let&apos;s make it happen.
      </p>
      <div className="mt-10 flex justify-center gap-4 flex-wrap">
        <Button size="lg">Start a Project</Button>
        <Button size="lg" variant="secondary">
          View Portfolio
        </Button>
      </div>
    </section>
  );
};

export default LetsBuild;
