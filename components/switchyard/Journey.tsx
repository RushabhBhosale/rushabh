"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import RouteWorld from "./RouteWorld";
import OpeningSequence from "./OpeningSequence";
import WorldMap from "./WorldMap";
import ProductSurface from "./ProductSurface";
import useJourneyController from "./useJourneyController";
import { stations } from "@/utils/switchyard";
import {
  CONVERGENCE,
  HISTORY,
  LANDMARKS,
  SKILL_DISTRICTS,
} from "./world-path";

const steps = [
  {
    label: "PROJECT",
    copy: "Keep the project’s framework, files, and Git context together. Start with what you are building.",
  },
  {
    label: "SERVICE",
    copy: "See what is running. Start and stop the services that belong to the project.",
  },
  {
    label: "SESSION",
    copy: "Save the working context so the next session begins with less setup.",
  },
  {
    label: "WORKFLOW",
    copy: "Connect repeatable work. Keep the attention on the product, with less time spent getting ready.",
  },
];
export default function Journey() {
  const root = useRef<HTMLDivElement>(null);
  const [routesOpen,setRoutesOpen]=useState(false);
  const [inspectId, setInspectId] = useState<string | null>(null);
  const {
    plan,
    waypoint,
    step,
    district,
    leave,
    visitDistrict,
    travelBy,
    enhanced,
    enter,
    jump,
    inspect,
    virtualHeight,
  } = useJourneyController(root);
  const station=stations[plan?.index ?? 0];
  const skill=SKILL_DISTRICTS[district];
  const inactive = (id: string) => waypoint !== id;
  useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setRoutesOpen(false);};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[]);
  const landmark = LANDMARKS.find((l) => l.id === inspectId) ?? null;
  useEffect(() => {
    if (!landmark) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInspectId(null);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [landmark]);
  return (
    <div
      ref={root}
      className="journey pinned-journey"
      data-enhanced={enhanced ? "true" : "false"}
      data-active-waypoint={waypoint}
      style={enhanced ? { height: `${virtualHeight}svh` } : undefined}
    >
      <div className="journey-stage">
        <RouteWorld />
        <OpeningSequence />
        <svg className="route-tether" aria-hidden="true">
          <path />
          <circle r="3" />
        </svg>
        <div className="world-labels" aria-hidden="true">
          {SKILL_DISTRICTS.map((d) => (
            <div
              key={d.id}
              className="world-label mono"
              data-dist={d.distance}
              data-side={d.side}
              data-h={d.id === "typelogic" ? 7.5 : 5.2}
            >
              <span className="world-label-title">{d.label}</span>
              <span className="world-label-sub">{d.sub}</span>
              <span className="world-label-techs">{d.techs.join(" · ")}</span>
            </div>
          ))}
          {HISTORY.map((h) => (
            <div
              key={h.label}
              className="history-label mono"
              data-dist={h.distance}
              data-side={0}
              data-h={7.4}
            >
              <span className="world-label-title">{h.label}</span>
              <span className="world-label-sub">{h.sub}</span>
            </div>
          ))}
          <div
            className="history-label convergence-label mono"
            data-dist={CONVERGENCE.distance}
            data-side={0}
            data-h={8.8}
          >
            <span className="world-label-title">ALL ROUTES LEAD SOMEWHERE</span>
            <span className="convergence-line">{CONVERGENCE.label}</span>
          </div>
        </div>
        <div className="landmark-layer">
          {LANDMARKS.map((l) => (
            <button
              key={l.id}
              type="button"
              className="landmark-label mono"
              data-dist={l.distance}
              data-side={l.side}
              data-h={3.6}
              onClick={() => setInspectId(l.id)}
              aria-label={`Inspect ${l.label}`}
            >
              <span className="landmark-code">◇ {l.code}</span>
              <span className="landmark-name">{l.label}</span>
            </button>
          ))}
        </div>
        {landmark && (
          <div
            className="landmark-panel"
            role="dialog"
            aria-modal="false"
            aria-label={`${landmark.label} details`}
          >
            <div className="section-line mono">
              <span>
                {landmark.code} — {landmark.sub}
              </span>
              <button type="button" onClick={() => setInspectId(null)}>
                CLOSE ×
              </button>
            </div>
            <h3>{landmark.label}</h3>
            <p>{landmark.description}</p>
            <p className="mono landmark-stack">{landmark.stack.join(" · ")}</p>
            <div className="landmark-links">
              {landmark.href && (
                <a href={landmark.href} target="_blank" rel="noreferrer">
                  Visit ↗
                </a>
              )}
              <a href={landmark.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          </div>
        )}
        <div className="journey-overlay" aria-label="Spatial journey">
          <div
            className="waypoint stage-hero"
            data-waypoint="entry"
            inert={inactive("entry")}
            aria-hidden={inactive("entry")}
          >
            <div className="entry-stage">
              <div className="entry-coordinate mono">
                <span>
                  <i className="signal" /> INDEPENDENT MIND. CONNECTED WORK.
                </span>
                <span>PORTFOLIO / 2026</span>
              </div>
              <h1 className="hero-name">
                <span className="hero-first">RUSHABH</span>
                <span className="hero-last">
                  BHOSALE
                  <span className="name-dot" aria-hidden="true">
                    ✳
                  </span>
                </span>
              </h1>
              <div className="hero-description">
                <span className="mono">
                  SOFTWARE DEVELOPER
                  <br />
                  MUMBAI, INDIA · 19.07° N
                </span>
                <p>
                  I move ideas into
                  <br />
                  <em>things people use.</em>
                </p>
                <span className="hero-platforms">
                  Web. Mobile. Desktop.
                  <br />
                  Different routes. Same instinct.
                </span>
              </div>
              <div className="entry-bottom mono">
                <button onClick={() => jump("stackport")} className="text-link">
                  EXPLORE THE WORK <span>↗</span>
                </button>
                <span className="entry-scroll">
                  SCROLL TO TRAVEL · CHOOSE YOUR ROUTE BELOW
                </span>
                <a href="/Rushabh%20Resume.pdf" className="text-link">
                  RÉSUMÉ ↗
                </a>
              </div>
            </div>
          </div>
          <div
            className="waypoint stage-origin"
            data-waypoint="origin"
            inert={inactive("origin")}
            aria-hidden={inactive("origin")}
          >
            <span className="mono waypoint-label">01 / ORIGIN</span>
            <h2>
              THINGS
              <br />
              PEOPLE
              <br />
              <em>USE.</em>
            </h2>
            <div className="origin-note">
              <p>
                I’m Rushabh, a software developer in Mumbai. I follow ideas into
                web, mobile, and desktop products.
              </p>
              <p>
                Building. Experimenting.
                <br />
                Shipping. Learning. Writing.
              </p>
            </div>
            <span className="mono waypoint-cue">
              FOLLOW THE ROUTE FORWARD ↓
            </span>
          </div>
          <div
            className="waypoint stage-junction"
            data-waypoint="stackport"
            inert={inactive("stackport")}
            aria-hidden={inactive("stackport")}
          >
            <div className="junction-space-label mono" aria-hidden="true">
              <i /> MAIN / 001
            </div>
            <div className="junction-decision destination-panel">
              <span className="mono waypoint-label">SELECTED WORK / 05 ROUTES</span>
              <h2 className="junction-title">Ideas, made<br/><em>useful.</em></h2>
              <p className="destination-description">Independent products for the way we build, create, and make sense of things.</p>
              <nav className="project-route-list" aria-label="Project destinations">
                {stations.map((item,i)=><button key={item.id} onClick={()=>enter(i)} aria-label={`Enter ${item.name} route`}><span className="mono">0{i+1}</span><span><strong>{item.name}</strong><small>{item.platform}</small></span><span aria-hidden="true">↗</span></button>)}
              </nav>
              <p className="destination-hint">Choose a project to take its route. Scroll to continue.</p>
            </div>
          </div>
          <div
            className="waypoint stage-project"
            data-waypoint="project"
            data-step={step}
            inert={inactive("project")}
            aria-hidden={inactive("project")}
          >
            <div className="section-line mono">
              <span>RB / 00{(plan?.index ?? 0)+1} — {station.name.toUpperCase()}</span>
              <span>
                {step === 3
                  ? "MERGE JUNCTION AHEAD"
                  : "FOLLOW THE IDEA THROUGH"}
              </span>
            </div>
            <div className="stage-project-layout">
              <div className="project-copy">
                <span className="mono project-category">{station.platform}</span>
                <h2>{station.name}</h2>
                <p className="project-headline">{station.line}</p>
                <p className="destination-description">{station.description}</p>
                {plan?.index===0 ? <><nav className="project-step-controls" aria-label="StackPort product stages">{steps.map((s,i)=><button key={s.label} onClick={()=>inspect(i)} aria-current={step===i?'step':undefined}><span className="mono">0{i+1}</span>{s.label}</button>)}</nav><p className="step-copy">{steps[step].copy}</p></> : <p className="step-copy">{station.detail}</p>}
                <div className="project-links"><a href={station.href} className="text-link project-walkthrough">{station.action} ↗</a>{station.github&&<a href={station.github} className="text-link">Source ↗</a>}</div>
                <button className="rejoin-button" onClick={leave}>Rejoin the main route <span>↗</span></button>
              </div>
              <ProductSurface key={station.id} station={station} />
            </div>
            <div className="stage-merge mono">
              <span>
                {step === 3
                  ? "↳ YOUR ROUTE CURVES BACK INTO THE MAIN LINE"
                  : "SCROLL TO EXPLORE"}
              </span>
              <span>SCROLL TO EXPLORE · CHANGE ROUTES ANYTIME</span>
            </div>
          </div>
          <div
            className="waypoint stage-district"
            data-waypoint="district"
            inert={inactive("district")}
            aria-hidden={inactive("district")}
          >
            <div className="capabilities-panel destination-panel">
              <span className="mono waypoint-label">THE TOOLKIT / {String(district+1).padStart(2,'0')} OF 06</span>
              <h2>Built by<br/><em>doing.</em></h2>
              <div className="skill-focus" key={skill.id}><span className="mono">{skill.sub}</span><h3>{skill.label}</h3><div className="skill-tags">{skill.techs.map(tech=><span key={tech}>{tech}</span>)}</div></div>
              <nav className="skill-destinations" aria-label="Skill categories">{SKILL_DISTRICTS.map((d,i)=><button key={d.id} aria-current={district===i?'location':undefined} onClick={()=>visitDistrict(i)}>{['Frontend','Type & logic','Backend','Mobile','Automation','Publishing'][i]}<span>↗</span></button>)}</nav>
              <p className="destination-hint">Choose a discipline to visit its part of the world.</p>
            </div>
          </div>
          <div
            className="waypoint stage-next"
            data-waypoint="next"
            inert={inactive("next")}
            aria-hidden={inactive("next")}
          >
            <span className="mono waypoint-label">
              {plan ? "MAIN ROUTE / REJOINED" : "MAIN ROUTE / CONTINUING"}
            </span>
            <h2>
              BRING ME THE<br/>NEXT <em>HARD THING.</em>
            </h2>
            <p>Have something worth building? Let’s talk.</p>
            <nav
              className="stage-direct-links"
              aria-label="Continue exploring the portfolio"
            >
              <Link href="/projects">All work ↗</Link>
              <Link href="/about">Experience ↗</Link>
              <Link href="/blogs">Writing ↗</Link>
              <Link href="/contact">Contact ↗</Link>
            </nav>
          </div>
        </div>
        {enhanced && <div className="journey-controls" aria-label="Journey controls">
          <div className="travel-controls"><button onClick={()=>travelBy(-1)} aria-label="Move backward">←</button><button onClick={()=>travelBy(1)} aria-label="Move forward">→</button></div>
          <button onClick={leave} aria-pressed={waypoint!=='project'}>Main route</button>
          <button onClick={()=>setRoutesOpen(v=>!v)} aria-expanded={routesOpen} aria-controls="route-picker">Projects <span>⌃</span></button>
          <button onClick={()=>{setRoutesOpen(false);jump('district');}}>Skills</button>
          {routesOpen&&<nav id="route-picker" className="route-picker" aria-label="Switch project route"><span className="mono">TAKE A DIFFERENT ROUTE</span>{stations.map((s,i)=><button key={s.id} aria-current={plan?.index===i&&waypoint==='project'?'location':undefined} onClick={()=>{enter(i);setRoutesOpen(false);}}><span className="mono">0{i+1}</span>{s.name}<span>↗</span></button>)}</nav>}
        </div>}
        {enhanced && (
          <WorldMap visited={!!plan} current={waypoint} onNavigate={jump} onProject={enter} />
        )}
        <div className="journey-fallback">
          <span className="mono">THE SWITCHYARD / DIRECT ACCESS</span>
          <h1>
            Rushabh
            <br />
            Bhosale.
          </h1>
          <p>I build web, mobile, and desktop products.</p>
          <p>
            Explore the work, background, and writing through the direct index.
          </p>
          <nav aria-label="Accessible portfolio index">
            <Link href="/projects">Projects ↗</Link>
            <Link href="/about">About & experience ↗</Link>
            <Link href="/blogs">Writing ↗</Link>
            <Link href="/contact">Contact ↗</Link>
            <a href="/Rushabh%20Resume.pdf">Résumé ↗</a>
          </nav>
        </div>
      </div>
    </div>
  );
}
