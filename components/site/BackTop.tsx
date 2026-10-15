"use client";

import { scrollToTop } from "@/lib/motion";

export default function BackTop() {
  return (
    <button type="button" className="u-link mono" onClick={() => scrollToTop()}>
      Back to top ↑
    </button>
  );
}
