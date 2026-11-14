"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import VideoModal from "./VideoModal";

interface GameTitle {
  id: string;
  code: string;
  name: string;
  genre: string;
  status: string;
  timeline: string;
  platforms: string[];
  tagline: string;
  synopsis: string;
  mechanics: { label: string; detail: string }[];
  techSpecs: { label: string; value: string }[];
}

export default function TitlesSection() {
  const [activeTab, setActiveTab] = useState<string>("aberration");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const titles: GameTitle[] = [
    {
      id: "aberration",
      code: "01 // ALPHA FLAGSHIP",
      name: "PROJECT: ABERRATION",
      genre: "PSYCHOLOGICAL DEEP-SPACE SURVIVAL HORROR",
      status: "IN PRODUCTION // CLOSED ALPHA",
      timeline: "Q4 2026",
      platforms: ["STEAM (PC)", "PLAYSTATION 5", "XBOX SERIES X"],
      tagline: "The signal was never dead. It was merely waiting for a listener.",
      synopsis:
        "Stranded aboard the derelict orbital research vessel Thalassa-IV orbiting a dead pulsar. Life support is failing, localized gravity collapses unexpectedly, and an unclassifiable biomechanical entity stalks the corridors—navigating entirely by sonic emissions and player heart-rate cadence.",
      mechanics: [
        {
          label: "BIOMETRIC ACOUSTIC SENSITIVITY",
          detail: "Entities react to physical noise levels captured via player microphone and controller acoustics.",
        },
        {
          label: "ZERO-G PRESSURE TORQUE",
          detail: "Manual pneumatic bulkheads require physical leverage and spatial torque to equalize explosive decompression.",
        },
        {
          label: "PROCEDURAL METAMORPHOSIS",
          detail: "Corridor layouts subtly deform and reorient when unobserved, weaponizing spatial dread.",
        },
      ],
      techSpecs: [
        { label: "ENGINE", value: "UNREAL ENGINE 5.5 CUSTOM" },
        { label: "TARGET FIDELITY", value: "4K / 60FPS NATIVE" },
        { label: "AUDIO PIPELINE", value: "7.1 BINAURAL DSP" },
        { label: "PHYSICS", value: "FLUID DECOMPRESSION SIM" },
      ],
    },
    {
      id: "null-protocol",
      code: "02 // SYSTEMIC STEALTH",
      name: "NULL PROTOCOL",
      genre: "TACTICAL BIOMECHANICAL INFILTRATION",
      status: "SYSTEMS PROTOTYPE",
      timeline: "2027",
      platforms: ["STEAM // PC EXCLUSIVE"],
      tagline: "Silence is your weapon. Flesh is the anomaly.",
      synopsis:
        "Deep within the submerged permafrost pits of New Kolyma, an abandoned subterranean reactor array has initiated an autonomous defense cycle. Command a severed cybernetic proxy navigating complex industrial ventilation networks without tripping thermal alarms.",
      mechanics: [
        {
          label: "THERMAL EMISSION REGULATION",
          detail: "Internal coolant levels must be vented into cold zones. Overheating reveals coordinates to sentries.",
        },
        {
          label: "KINETIC PROXY MODDING",
          detail: "Salvage servos, pneumatic pistons, and optical sensors from deactivated defense chassis.",
        },
        {
          label: "DIEGETIC CRT COMPILATION",
          detail: "Interface directly with retro-industrial terminal hardware via manual electrical wire bridging.",
        },
      ],
      techSpecs: [
        { label: "ENGINE", value: "MOROS RIG ENGINE" },
        { label: "RENDERER", value: "HYBRID HARDWARE DXR" },
        { label: "AI PIPELINE", value: "DYNAMIC THREAT MESH" },
        { label: "PHYSICS", value: "TACTILE RIGID-BODY" },
      ],
    },
    {
      id: "vespera",
      code: "03 // SPATIAL RESEARCH",
      name: "VESPERA CRUCIBLE",
      genre: "NON-EUCLIDEAN ARCHITECTURAL MYSTERY",
      status: "R&D PROTOTYPE",
      timeline: "2027-2028",
      platforms: ["TBA PLATFORMS"],
      tagline: "Geometries that fracture the human mind.",
      synopsis:
        "An expedition team penetrates an impossible obsidian mega-monolith discovered four miles beneath the Antarctic ice plate. Space curves recursively upon itself: walking forward through four right angles returns you to where you began, yet altered.",
      mechanics: [
        {
          label: "TOPOLOGICAL FOLDS",
          detail: "Traversing non-Euclidean thresholds that fold 3D space recursively without loading seams.",
        },
        {
          label: "LIGHT POLARIZATION",
          detail: "Monochromatic light sources reveal invisible geometries while awakening dormant obsidian organisms.",
        },
        {
          label: "GRANULAR DISSOLUTION",
          detail: "Acoustic reflections decay into eerie harmonic sub-bass drones that signal architectural reconfiguration.",
        },
      ],
      techSpecs: [
        { label: "ENGINE", value: "CUSTOM SPATIAL WARP SHADER" },
        { label: "LIGHTING", value: "SPECTRAL RAY-TRACING" },
        { label: "SOUND DESIGN", value: "GRANULAR HARMONIC DRONES" },
        { label: "RESEARCH", value: "THEORETICAL TOPOLOGY MATH" },
      ],
    },
  ];

  const current = titles.find((t) => t.id === activeTab) || titles[0];

  return (
    <section
      id="aberration"
      className="relative py-20 sm:py-28 border-b border-[#FF3348]/15 bg-[#09090C] bg-tech-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[10px] sm:text-xs tracking-widest text-[#FF3348] uppercase mb-2">
              <span className="w-5 h-px bg-[#FF3348]" />
              <span>{"02 // PRODUCTION SLATE"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-[#F7F2F3] uppercase">
              FEATURED TITLES
            </h2>
          </div>
          <p className="font-mono text-xs text-[#B8AEB1] max-w-sm leading-relaxed">
            Constructed with diegetic interfaces, physical acoustics, and zero focus-group compromises.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8">
          {titles.map((title) => {
            const isActive = title.id === activeTab;
            return (
              <button
                key={title.id}
                onClick={() => setActiveTab(title.id)}
                className={`relative p-4 sm:p-5 font-mono text-left transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? "bg-[#17090D] border-[#FF3348] text-[#F7F2F3] shadow-[0_0_25px_rgba(255,51,72,0.15)]"
                    : "bg-[#151115] border-white/10 text-[#B8AEB1] hover:border-[#FF3348]/40 hover:text-[#F7F2F3]"
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-0 w-full h-0.5 bg-[#FF3348]" />
                )}
                <div className="text-[10px] text-[#FF3348] font-bold tracking-widest uppercase mb-1">
                  {title.code}
                </div>
                <div className="font-bold text-sm sm:text-base tracking-wide truncate">
                  {title.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Title Spotlight Showcase */}
        <div className="bg-[#151115] border border-[#FF3348]/30 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Corner Notch Indicators */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF3348]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF3348]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Narrative / Mechanics */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="px-3 py-1 bg-[#17090D] border border-[#FF3348]/50 text-[#FF3348] font-bold tracking-widest uppercase">
                  {current.status}
                </span>
                <span className="text-[#B8AEB1] tracking-wider">
                  LAUNCH: {current.timeline}
                </span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-black tracking-tight text-[#F7F2F3] uppercase leading-none">
                  {current.name}
                </h3>
                <p className="font-mono text-xs text-[#FF3348] tracking-widest uppercase mt-2 font-bold">
                  {current.genre}
                </p>
              </div>

              <blockquote className="border-l-2 border-[#FF3348] pl-4 italic font-mono text-sm sm:text-base text-[#F7F2F3] opacity-90 leading-snug">
                “{current.tagline}”
              </blockquote>

              <p className="font-mono text-xs sm:text-sm text-[#B8AEB1] leading-relaxed font-light">
                {current.synopsis}
              </p>

              {/* Systems & Mechanics */}
              <div className="space-y-2.5 pt-4 border-t border-white/5">
                <div className="font-mono text-[10px] sm:text-[11px] text-[#FF3348] tracking-widest uppercase font-bold">
                  {"// SIGNATURE INTERACTIVE SYSTEMS"}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {current.mechanics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-[#09090C] border border-white/5 p-3 sm:p-4 flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF3348] mt-1.5 shrink-0" />
                      <div>
                        <div className="font-mono text-xs font-bold text-[#F7F2F3] tracking-wide">
                          {m.label}
                        </div>
                        <div className="font-mono text-xs text-[#B8AEB1] leading-relaxed mt-0.5">
                          {m.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platforms and CTA */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-[#B8AEB1]/60 tracking-widest uppercase block mr-1">
                    PLATFORMS:
                  </span>
                  {current.platforms.map((p, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#09090C] border border-white/10 font-mono text-[10px] text-[#F7F2F3] tracking-wider"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="w-full sm:w-auto px-5 py-3 bg-[#FF3348] text-[#09090C] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#F7F2F3] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>WATCH TEASER</span>
                  </button>
                  <a
                    href="#transmission"
                    className="w-full sm:w-auto text-center px-5 py-3 bg-[#17090D] border border-[#FF3348]/40 text-[#F7F2F3] font-mono text-xs uppercase tracking-widest hover:border-[#FF3348] transition-colors"
                  >
                    ALPHA ACCESS
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Visual HUD Schematic Viewport */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="relative aspect-square w-full bg-[#09090C] border border-[#FF3348]/30 flex flex-col items-center justify-center p-6 scanlines overflow-hidden">
                {/* Radar Grid Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 border border-[#FF3348]/15 rounded-full" />
                  <div className="absolute w-44 h-44 border border-[#FF3348]/25 rounded-full" />
                  <div className="absolute w-24 h-24 border border-[#FF3348]/35 rounded-full" />
                  <div className="absolute w-full h-px bg-[#FF3348]/15" />
                  <div className="absolute h-full w-px bg-[#FF3348]/15" />
                </div>

                {/* Radar Sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF3348]/15 via-transparent to-transparent animate-spin origin-center duration-10000 pointer-events-none" />

                {/* Central Emblem */}
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-20 h-20 mx-auto border-2 border-[#FF3348] flex items-center justify-center bg-[#17090D]/90 rotate-45 shadow-[0_0_25px_rgba(255,51,72,0.25)]">
                    <div className="w-10 h-10 border border-[#F7F2F3] flex items-center justify-center">
                      <div className="w-3.5 h-3.5 bg-[#FF3348]" />
                    </div>
                  </div>

                  <div className="font-mono text-xs font-bold text-[#F7F2F3] tracking-widest uppercase">
                    SECTOR SCHEMATIC: {current.id.toUpperCase()}
                  </div>
                  <div className="font-mono text-[10px] text-[#FF3348] tracking-widest">
                    {"ENCRYPTED TELEMETRY STREAM"}
                  </div>
                </div>

                {/* HUD Corners */}
                <div className="absolute top-3 left-3 font-mono text-[9px] text-[#B8AEB1]/60">
                  LATENCY: 0.12ms
                </div>
                <div className="absolute top-3 right-3 font-mono text-[9px] text-[#FF3348]">
                  FEED: ACTIVE
                </div>
                <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#B8AEB1]/60">
                  DIAG: VERIFIED
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#B8AEB1]/60">
                  FRAMEWORK: v0.94
                </div>
              </div>

              {/* Tech Specs Grid */}
              <div className="bg-[#09090C] border border-[#FF3348]/20 p-4 font-mono text-xs">
                <div className="text-[10px] text-[#FF3348] font-bold tracking-widest uppercase mb-2">
                  {"// SPECIFICATIONS"}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {current.techSpecs.map((spec, i) => (
                    <div key={i} className="p-2 bg-[#151115] border border-white/5">
                      <div className="text-[9px] text-[#B8AEB1]/60 tracking-wider">
                        {spec.label}
                      </div>
                      <div className="text-[#F7F2F3] font-bold text-[11px] truncate">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={`RED MOROS // ${current.name} CINEMATIC TEASER`}
      />
    </section>
  );
}
