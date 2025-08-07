import React from "react";

const About = () => {
  return (
    <section className="px-6 mt-24 text-center text-base text-muted-foreground">
      <p>
        Just a software dev who builds clean, fast, and fun web/mobile
        experiences.
      </p>
      <p className="mt-2">
        When I’m not coding, I’m probably watching anime, planning my next trip,
        or working on side projects that may or may not ship
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
