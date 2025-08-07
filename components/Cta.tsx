import Link from "next/link";
import React from "react";

type CtaProps = {
  page?: boolean;
};

const Cta = ({ page }: CtaProps) => {
  return (
    <div
      className={`rounded-xl mx-6 ${
        page ? "border-none" : "mt-16"
      }  bg-accent p-6 text-center shadow-lg`}
    >
      <h2
        className={`${
          page ? "hidden" : "block"
        } text-xl md:text-2xl text-accent-foreground font-semibold text mb-2`}
      >
        Enjoyed this post?
      </h2>
      <p className="text-neutral-400 mb-4">
        If you’ve got a project or idea you’d like help with — I’m available for
        freelance work.
      </p>
      <Link href="/contact">
        <div className="inline-block rounded-lg bg-primary text-primary-foreground px-5 py-2 font-medium transition hover:bg-neutral-200">
          Let’s Work Together →
        </div>
      </Link>
    </div>
  );
};

export default Cta;
