"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { stations } from "@/utils/switchyard";
import { branchEnd, branchStart, LANDMARKS, worldState } from "./world-path";
import type { Waypoint } from "./journey-model";

type Props = {
  visited: boolean;
  current: Waypoint;
  onNavigate: (destination: Waypoint) => void;
  onProject: (index: number) => void;
};

const MAIN_STOPS = [
  { distance: 0, label: "ENTRY", destination: "entry" },
  { distance: 24, label: "ORIGIN", destination: "origin" },
  { distance: 65, label: "CAPABILITIES", destination: "capabilities" },
  { distance: 128, label: "WORK", destination: "work" },
  { distance: 178, label: "HISTORY", destination: "history" },
  { distance: 196, label: "EDUCATION", destination: "education" },
  { distance: 210, label: "DISPATCHES", destination: "dispatches" },
  { distance: 223, label: "CURRENT", destination: "current" },
  { distance: 233, label: "CONTACT", destination: "contact" },
] as const;

export default function WorldMap({ current, onNavigate, onProject }: Props) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const dot = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key.toLowerCase() === "m" && !event.metaKey && !event.ctrlKey && !event.altKey && !target.closest("input,textarea,select,[contenteditable=true]")) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  useEffect(() => {
    worldState.map = open ? 1 : 0;
    if (open) dialog.current?.showModal();
    else if (dialog.current?.open) { dialog.current.close(); opener.current?.focus(); }
    if (!open) return;
    let frame = 0;
    const draw = () => {
      const x = 30 + (worldState.distance / 235) * 740;
      const y = worldState.branch >= 0 ? 150 - Math.sin(Math.PI * worldState.branchProgress) * 62 : 150;
      dot.current?.setAttribute("cx", String(x));
      dot.current?.setAttribute("cy", String(y));
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [open]);

  const navigate = (destination: Waypoint) => { setOpen(false); onNavigate(destination); };

  return <>
    <button ref={opener} className="world-map-button mono" aria-haspopup="dialog" onClick={() => setOpen(true)}>MAP <span>M</span></button>
    <dialog ref={dialog} className="world-map" aria-labelledby="world-map-title" onCancel={() => setOpen(false)}>
      <div className="map-surface">
        <div className="section-line mono"><h2 id="world-map-title">THE SWITCHYARD / FULL TOPOLOGY</h2><button onClick={() => setOpen(false)} aria-label="Close route map">CLOSE ×</button></div>
        <p className="map-caption">One authored world.<br/><em>Every destination visible.</em></p>
        <svg className="slice-map full-map" viewBox="0 0 800 205" role="img" aria-label="Full portfolio route map with main regions, featured branches, secondary landmarks and current position.">
          <path className="map-main-line" d="M30 150H770" />
          {stations.map((station, index) => {
            const start = 30 + (branchStart(index) / 235) * 740;
            const end = 30 + (branchEnd(index) / 235) * 740;
            return <g key={station.id} className="map-featured-route"><path d={`M${start} 150 C${start + 5} 110 ${end - 5} 82 ${end} 150`} /><circle cx={(start + end) / 2} cy="93" r="4"/><text x={(start + end) / 2} y="76" textAnchor="middle">0{index + 1}</text></g>;
          })}
          {LANDMARKS.map((landmark) => { const x = 30 + (landmark.distance / 235) * 740; return <path key={landmark.id} className="map-landmark" d={`M${x} 158 l5 5 -5 5 -5 -5 Z`} />; })}
          {MAIN_STOPS.map((stop, index) => { const x = 30 + (stop.distance / 235) * 740; const active = (current === "project" ? "work" : current) === stop.destination; return <g key={stop.destination}><circle cx={x} cy="150" r="4" className={active ? "current" : ""}/><text x={x} y={index % 2 ? 194 : 184} textAnchor="middle">{stop.label}</text></g>; })}
          <circle ref={dot} r="6" className="runner" />
        </svg>
        <div className="map-projects">{stations.map((station, index) => <button key={station.id} onClick={() => { setOpen(false); onProject(index); }}><span className="mono">● 0{index + 1}</span>{station.name}<span>↗</span></button>)}</div>
        <div className="map-destinations">{MAIN_STOPS.slice(1).map((stop) => <button key={stop.destination} onClick={() => navigate(stop.destination)}>{stop.label}<span>↗</span></button>)}</div>
        <p className="mono map-legend">● FEATURED ROUTE · ◇ LANDMARK · ━ MAIN JOURNEY · LIME = CURRENT</p>
        <nav className="map-index" aria-label="Fast portfolio index"><span className="mono">DIRECT INDEX</span><Link href="/projects">All work ↗</Link><Link href="/about">About ↗</Link><Link href="/blogs">Writing ↗</Link><Link href="/contact">Contact ↗</Link></nav>
      </div>
    </dialog>
  </>;
}
