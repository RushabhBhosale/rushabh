"use client";

import { useEffect, useRef, useState } from "react";
import { stations } from "@/utils/switchyard";
import { LANDMARKS, SKILL_DISTRICTS } from "./world-path";
import type { Waypoint } from "./journey-model";

export const REGIONS = [
  { code: "00", name: "Entry", waypoint: "entry" },
  { code: "01", name: "Origin", waypoint: "origin" },
  { code: "02", name: "Capabilities", waypoint: "capabilities" },
  { code: "03", name: "Work network", waypoint: "work" },
  { code: "04", name: "Route history", waypoint: "history" },
  { code: "05", name: "Origin point", waypoint: "education" },
  { code: "06", name: "Dispatches", waypoint: "dispatches" },
  { code: "07", name: "Current position", waypoint: "current" },
  { code: "08", name: "Convergence", waypoint: "contact" },
] as const;

const SKILL_NAMES = [
  "Frontend",
  "Type / logic",
  "Backend / data",
  "Mobile",
  "Tooling",
  "Publishing",
] as const;

type Props = {
  current: Waypoint;
  projectIndex: number | null;
  onTravel: (direction: number) => void;
  onMain: () => void;
  onJump: (waypoint: Waypoint) => void;
  onProject: (index: number) => void;
  onSkill: (index: number) => void;
  onLandmark: (id: string) => void;
};

export default function JourneyNavigation({
  current,
  projectIndex,
  onTravel,
  onMain,
  onJump,
  onProject,
  onSkill,
  onLandmark,
}: Props) {
  const [routesOpen, setRoutesOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const indexButton = useRef<HTMLButtonElement>(null);
  const regionKey = current === "project" ? "work" : current;
  const region = REGIONS.find((item) => item.waypoint === regionKey) ?? REGIONS[0];

  useEffect(() => {
    if (indexOpen) dialog.current?.showModal();
    else if (dialog.current?.open) {
      dialog.current.close();
      indexButton.current?.focus();
    }
  }, [indexOpen]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setRoutesOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const navigate = (waypoint: Waypoint) => {
    setIndexOpen(false);
    setRoutesOpen(false);
    onJump(waypoint);
  };

  return (
    <>
      <aside className="journey-hud" aria-label="Journey position">
        <div className="hud-location">
          <span className="mono">RB / SWITCHYARD</span>
          <strong>{region.code}</strong>
          <span>{region.name}</span>
        </div>
        <button
          ref={indexButton}
          className="hud-index mono"
          onClick={() => setIndexOpen(true)}
        >
          INDEX <span>I</span>
        </button>
        <nav className="journey-progress" aria-label="Journey regions">
          {REGIONS.map((item) => (
            <button
              key={item.code}
              data-active={item.waypoint === regionKey}
              onClick={() => navigate(item.waypoint)}
              aria-label={`Go to ${item.name}`}
            >
              <i />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="journey-controls" aria-label="Journey controls">
        <div className="travel-controls">
          <button onClick={() => onTravel(-1)} aria-label="Move backward">←</button>
          <button onClick={() => onTravel(1)} aria-label="Move forward">→</button>
        </div>
        <button onClick={onMain} aria-pressed={current !== "project"}>Main route</button>
        <button
          onClick={() => setRoutesOpen((open) => !open)}
          aria-expanded={routesOpen}
          aria-controls="route-picker"
        >
          Projects <span>⌃</span>
        </button>
        <button onClick={() => navigate("capabilities")}>Skills</button>
        {routesOpen ? (
          <nav id="route-picker" className="route-picker" aria-label="Switch project route">
            <span className="mono">TAKE A DIFFERENT ROUTE</span>
            {stations.map((station, index) => (
              <button
                key={station.id}
                aria-current={projectIndex === index && current === "project" ? "location" : undefined}
                onClick={() => {
                  onProject(index);
                  setRoutesOpen(false);
                }}
              >
                <span className="mono">0{index + 1}</span>
                {station.name}
                <span>↗</span>
              </button>
            ))}
          </nav>
        ) : null}
      </div>

      <dialog
        ref={dialog}
        className="journey-index"
        aria-labelledby="journey-index-title"
        onCancel={() => setIndexOpen(false)}
      >
        <div className="index-heading">
          <div>
            <span className="mono">FAST ACCESS / FULL TOPOLOGY</span>
            <h2 id="journey-index-title">Routes</h2>
          </div>
          <button onClick={() => setIndexOpen(false)} aria-label="Close index">CLOSE ×</button>
        </div>
        <div className="index-grid">
          <nav className="index-regions" aria-label="Main journey">
            <span className="mono index-label">MAIN JOURNEY</span>
            {REGIONS.slice(1).map((item) => (
              <button key={item.code} onClick={() => navigate(item.waypoint)}>
                <span className="mono">{item.code}</span>{item.name}<span>↗</span>
              </button>
            ))}
          </nav>
          <div className="index-groups">
            <nav aria-label="Capabilities index">
              <span className="mono index-label">CAPABILITIES</span>
              {SKILL_DISTRICTS.map((skill, index) => (
                <button key={skill.id} onClick={() => { setIndexOpen(false); onSkill(index); }}>
                  {SKILL_NAMES[index]}<span>↗</span>
                </button>
              ))}
            </nav>
            <nav aria-label="Featured work index">
              <span className="mono index-label">FEATURED WORK / ●</span>
              {stations.map((station, index) => (
                <button key={station.id} onClick={() => { setIndexOpen(false); onProject(index); }}>
                  {station.name}<span>↗</span>
                </button>
              ))}
            </nav>
            <nav aria-label="Secondary work index">
              <span className="mono index-label">SECONDARY WORK / ◇</span>
              {LANDMARKS.map((landmark) => (
                <button key={landmark.id} onClick={() => { setIndexOpen(false); onLandmark(landmark.id); }}>
                  {landmark.label}<span>↗</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </dialog>
    </>
  );
}
