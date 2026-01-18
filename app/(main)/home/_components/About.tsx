import React from "react";

const About = () => {
  return (
    <section className="px-6 mt-24 text-center text-base text-muted-foreground">
      <p>
        I&apos;m Rushabh Bhosale, a software developer focused on clean UI, fast
        performance, and SEO friendly architecture across React and Next.js.
      </p>
      <p className="mt-2">
        I ship products end to end and currently run AnimeSparks, a modern
        editorial blog for anime and storytelling.
      </p>
      <p className="mt-4">
        <a
          href="/about"
          className="underline underline-offset-4 hover:text-white transition"
        >
          More about me →
        </a>
      </p>
    </section>
  );
};

export default About;
