import Image from "next/image";
import type { CSSProperties } from "react";
import { indexOf, type Work } from "@/utils/work";

/* Stand-in artwork for a project that has no screenshots yet.
   Everything is sized in container units, so the same poster reads correctly as a
   cursor preview, a grid card, or a full-screen case-study hero. */
export default function Poster({
  work,
  src,
  label,
  showTitle = true,
  className = "",
  priority = false,
  sizes = "(max-width: 800px) 100vw, 50vw",
}: {
  work: Work;
  /** Real image for this slot. */
  src?: string;
  /** Bottom-left caption on the placeholder. */
  label?: string;
  showTitle?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const image = src;
  const style = { "--tone": work.tone[0], "--glow": work.tone[1] } as CSSProperties;
  const num = indexOf(work.slug);

  return (
    <span className={`poster ${className}`} style={style} data-poster>
      {image ? (
        <Image src={image} alt="" fill sizes={sizes} priority={priority} className="poster__img" />
      ) : (
        <>
          <span className="poster__ring" />
          <span className="poster__num">{num}</span>
          <span className="poster__corner poster__corner--tl">RB — {num}</span>
          <span className="poster__corner poster__corner--tr">{work.category}</span>
          {showTitle && <span className="poster__title">{work.title}</span>}
          <span className="poster__corner poster__corner--bl">
            <span className="poster__swatch" /> {label ?? "Cover — coming soon"}
          </span>
          <span className="poster__corner poster__corner--br">
            {work.discipline}
            {work.year ? ` / ${work.year}` : ""}
          </span>
        </>
      )}
    </span>
  );
}
