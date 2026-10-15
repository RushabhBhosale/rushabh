import Image from "next/image";
import type { CSSProperties } from "react";
import Poster from "./Poster";
import { siteLabel, type Work } from "@/utils/work";

type View = "desktop" | "mobile" | "art";

/* A project screenshot presented on the project's colour: desktop shots sit in a
   browser frame, phone shots in a phone frame, illustrations on their own. `bleed`
   lets a desktop frame run off the bottom edge, the way studio sites crop them. */
export default function Shot({
  work,
  view,
  src,
  bleed = false,
  sizes = "(max-width: 860px) 100vw, 50vw",
  priority = false,
  className = "",
}: {
  work: Work;
  /** Which kind of shot to show; defaults to the best one the project has. */
  view?: View;
  /** A specific image for this slot (e.g. the second desktop shot). */
  src?: string;
  bleed?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const shots = work.shots ?? {};
  const kind: View | undefined =
    view ?? (shots.desktop?.length ? "desktop" : shots.art ? "art" : shots.mobile ? "mobile" : undefined);
  const image =
    src ?? (kind === "desktop" ? shots.desktop?.[0] : kind === "mobile" ? shots.mobile : kind === "art" ? shots.art : undefined);

  const style = { "--tile": work.color } as CSSProperties;

  if (!kind || !image) {
    return (
      <span className={`shot shot--poster ${className}`} style={style} data-shot>
        <Poster work={work} className="poster--bare" showTitle={false} sizes={sizes} />
      </span>
    );
  }

  return (
    <span className={`shot shot--${kind} ${bleed ? "shot--bleed" : ""} ${className}`} style={style} data-shot>
      {kind === "desktop" && (
        <span className="shot__browser">
          <span className="shot__bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span className="shot__url">{siteLabel(work)}</span>
          </span>
          <span className="shot__screen">
            <Image src={image} alt={`${work.title} — screenshot`} fill sizes={sizes} priority={priority} />
          </span>
        </span>
      )}
      {kind === "mobile" && (
        <span className="shot__phone">
          <span className="shot__screen">
            <Image src={image} alt={`${work.title} on mobile`} fill sizes="(max-width: 860px) 60vw, 22vw" priority={priority} />
          </span>
        </span>
      )}
      {kind === "art" && (
        <span className="shot__art">
          <Image src={image} alt={`${work.title} — illustration`} fill sizes={sizes} priority={priority} />
        </span>
      )}
    </span>
  );
}
