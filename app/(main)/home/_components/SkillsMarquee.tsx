"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { toolkitSkills } from "@/utils/skills";

export default function SkillsMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="toolkit-marquee" data-paused={paused}>
      <span id="toolkit-heading" className="home-eyebrow">My everyday toolkit</span>
      <div className="toolkit-window">
        <div className="toolkit-track">
          <ul className="toolkit-group" aria-labelledby="toolkit-heading">
            {toolkitSkills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
          <ul className="toolkit-group" aria-hidden="true">
            {toolkitSkills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
        </div>
      </div>
      <button
        type="button"
        className="toolkit-pause"
        onClick={() => setPaused(value => !value)}
        aria-label={paused ? "Resume skills marquee" : "Pause skills marquee"}
        title={paused ? "Resume scrolling" : "Pause scrolling"}
      >
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>
    </div>
  );
}
