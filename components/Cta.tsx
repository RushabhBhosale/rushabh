import React from "react";

const Cta = () => {
  return (
    <div className="mt-16 rounded-xl border border-neutral-800 bg-neutral-950 p-6 text-center shadow-lg">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
        Enjoyed this post?
      </h2>
      <p className="text-neutral-400 mb-4">
        If you’ve got a project or idea you’d like help with — I’m available for
        freelance work.
      </p>
      <a
        href="mailto:rushabh@example.com"
        className="inline-block rounded-lg bg-white px-5 py-2 font-medium text-black transition hover:bg-neutral-200"
      >
        Let’s Work Together →
      </a>
    </div>
  );
};

export default Cta;
