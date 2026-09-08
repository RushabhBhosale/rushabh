import Image from "next/image";
import type { Station } from "@/utils/switchyard";

export default function ProductSurface({ station }: { station: Station }) {
  return (
    <figure className={`product-surface surface-${station.surface}`}>
      {station.surface === "stackport" && (
        <div
          className="stack-study"
          aria-label="StackPort product study: projects, services, and sessions in one workspace"
        >
          <div className="study-top">
            <span>STACKPORT</span>
            <span>THE LOCAL WORKSPACE</span>
          </div>
          <div className="stack-word">
            Ready
            <br />
            <i>when you are.</i>
          </div>
          <div className="stack-layers">
            <span>
              01 / PROJECTS <b>↗</b>
            </span>
            <span>
              02 / SERVICES <b>↗</b>
            </span>
            <span>
              03 / SESSIONS <b>↗</b>
            </span>
          </div>
        </div>
      )}
      {station.surface === "clipnote" && (
        <div
          className="clip-study"
          aria-label="ClipNote product study: capture, find, and reuse copied content"
        >
          <div className="study-top">
            <span>CLIPNOTE</span>
            <span>KEEP A GOOD THING.</span>
          </div>
          <div className="clip-paper paper-back">
            A thought.
            <br />A link.
            <br />A little later.
          </div>
          <div className="clip-paper paper-front">
            <span>WORTH KEEPING / 001</span>
            <strong>
              Copy.
              <br />
              Find.
              <br />
              <i>Again.</i>
            </strong>
            <span>YOUR CLIPBOARD, WITH A MEMORY.</span>
          </div>
        </div>
      )}
      {station.surface === "anime" && (
        <div className="anime-study">
          <div className="study-top">
            <span>ANIMESPARKS</span>
            <span>STORIES / CULTURE / OBSESSION</span>
          </div>
          <span className="anime-word" aria-hidden="true">
            Beyond
            <br />
            <i>the frame.</i>
          </span>
          <div className="anime-image">
            <Image
              src="/projects/animesparks.png"
              alt="AnimeSparks homepage showing anime features, reviews, and editorial navigation"
              fill
              sizes="(max-width: 800px) 90vw, 58vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
      {station.surface === "headline" && (
        <div className="headline-study">
          <div className="study-top">
            <span>INDEPENDENT PUBLISHING</span>
            <span>BY RUSHABH BHOSALE</span>
          </div>
          <div className="headline-masthead">
            Headline<span>Thread</span>
          </div>
          <div className="headline-rule" />
          <strong>
            There’s more
            <br />
            to the story.
          </strong>
          <div className="headline-bottom">
            <span>CONTEXT BEFORE NOISE.</span>
            <span>WEB / EDITORIAL</span>
          </div>
        </div>
      )}
      {station.surface === "expense" && (
        <div className="expense-study">
          <div className="study-top">
            <span>EXPENSE TRACKER</span>
            <span>BUILT FOR EVERYDAY LIFE</span>
          </div>
          <div className="expense-type">
            Make sense
            <br />
            of every <i>₹.</i>
          </div>
          <div className="expense-pipeline">
            <span>Bank SMS</span>
            <b>↓</b>
            <span>Parse + review</span>
            <b>↓</b>
            <span className="ledger">Your ledger ↗</span>
          </div>
        </div>
      )}
      <figcaption>
        {station.surface === "anime"
          ? "Existing product screenshot"
          : "Typographic product study"}
        <span>{station.platform.split(" / ")[0]}</span>
      </figcaption>
    </figure>
  );
}
