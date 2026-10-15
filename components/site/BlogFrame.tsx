"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* The index renders as-is; every MDX article gets the reading layout and a progress rule. */
export default function BlogFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bar = useRef<HTMLSpanElement>(null);
  const isIndex = pathname === "/blogs";

  useEffect(() => {
    if (isIndex || !bar.current) return;
    const tween = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true } },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isIndex, pathname]);

  if (isIndex) return <>{children}</>;

  return (
    <div className="article">
      <span className="article__progress" ref={bar} aria-hidden="true" />
      <div className="article__head mono">
        <Link href="/blogs" className="u-link">
          ← All writing
        </Link>
        <span className="dim">Rushabh Bhosale — Notes</span>
      </div>
      <div className="prose-rb">{children}</div>
    </div>
  );
}
