"use client";

import { useState } from "react";
import SkillsBento from "./SkillsBento";
import ExperienceRoute from "./ExperienceRoute";
import { Cpu, History } from "lucide-react";

export default function CapabilitiesAndRoute() {
  const [activeTab, setActiveTab] = useState<"skills" | "experience">("skills");

  return (
    <section className="home-capabilities w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* ========================================================================= */}
      {/* DESKTOP VIEW (100% UNCHANGED — SAME IN WEB)                               */}
      {/* Side-by-Side 6-col / 6-col Dual Spread                                     */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-6">
          <SkillsBento />
        </div>
        <div className="lg:col-span-6">
          <ExperienceRoute />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET VIEW (DIFFERENT ON MOBILE — NATIVE SEGMENTED TOGGLE)      */}
      {/* ========================================================================= */}
      <div className="block lg:hidden">
        {/* Native Segmented Control */}
        <div className="p-1 rounded-xl bg-muted/50 border border-border/70 flex items-center mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("skills")}
            aria-pressed={activeTab === "skills"}
            aria-controls="home-capability-panel"
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === "skills"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Skills</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("experience")}
            aria-pressed={activeTab === "experience"}
            aria-controls="home-capability-panel"
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === "experience"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <History className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Experience</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div id="home-capability-panel" className="transition-opacity duration-200">
          {activeTab === "skills" ? <SkillsBento /> : <ExperienceRoute />}
        </div>
      </div>
    </section>
  );
}
