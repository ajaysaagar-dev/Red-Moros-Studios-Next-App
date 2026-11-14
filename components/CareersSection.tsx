"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";

interface Role {
  id: string;
  code: string;
  title: string;
  discipline: string;
  location: string;
  type: string;
  experience: string;
  description: string;
}

export default function CareersSection() {
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [applied, setApplied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    coverNote: "",
  });

  const roles: Role[] = [
    {
      id: "phys-eng",
      code: "POS-01",
      title: "SENIOR SYSTEMS & PHYSICS ARCHITECT",
      discipline: "LOW-LEVEL ENGINE PROGRAMMING",
      location: "MONTRÉAL // HYBRID OR REMOTE",
      type: "FULL-TIME",
      experience: "6+ YEARS C++ / UE5 CORE",
      description:
        "Architecting our bespoke decompression, zero-g kinematic solvers, and low-latency tickrate pipelines inside a customized Unreal Engine 5 fork. Heavy emphasis on SIMD optimizations, thread synchronization, and deterministic physical feedback.",
    },
    {
      id: "light-art",
      code: "POS-02",
      title: "LEAD CINEMATIC LIGHTING & SHADER ARTIST",
      discipline: "TECHNICAL ART & ILLUMINATION",
      location: "TOKYO // HYBRID OR REMOTE",
      type: "FULL-TIME",
      experience: "5+ YEARS HLSL / LUMEN / RAY-TRACING",
      description:
        "Directing the oppressive visual identity of our productions. Mastering volumetric red diffusion, photometric camera profiling, dynamic penumbra shadows, and post-process grain shaders that produce authentic 35mm film dread.",
    },
    {
      id: "dsp-audio",
      code: "POS-03",
      title: "PRINCIPAL AUDIO PROGRAMMER (BINAURAL & DSP)",
      discipline: "ACOUSTIC ENGINEERING & SOUND DESIGN",
      location: "BERLIN // REMOTE",
      type: "FULL-TIME",
      experience: "4+ YEARS C++ / DSP / METASOUNDS / WWISE",
      description:
        "Developing real-time acoustic impulse response tracing, vacuum acoustic attenuation models, and procedural granular synthesis systems. You will turn sound from background dressing into the primary survival mechanic.",
    },
    {
      id: "level-arch",
      code: "POS-04",
      title: "TECHNICAL LEVEL ARCHITECT",
      discipline: "ENVIRONMENTAL STORYTELLING & SPATIAL DESIGN",
      location: "GLOBAL // REMOTE",
      type: "FULL-TIME",
      experience: "4+ YEARS LEVEL DESIGN / UE5",
      description:
        "Sculpting brutalist, claustrophobic industrial interiors and impossible non-Euclidean layouts. Translating high-concept psychological tension into tactile spatial pacing, lighting choreography, and mechanical puzzles.",
    },
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
  };

  return (
    <section
      id="careers"
      className="relative py-20 sm:py-28 border-b border-[#FF3348]/15 bg-[#09090C] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#FF3348] uppercase mb-3">
              <span className="w-6 h-px bg-[#FF3348]" />
              <span>{"05 // THE FOUNDRY RECRUITMENT"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-[#F7F2F3] uppercase">
              JOIN THE FOUNDRY
            </h2>
          </div>
          <p className="font-mono text-xs text-[#B8AEB1] max-w-sm leading-relaxed">
            We are a tight, autonomous assembly of engineers, artists, and acoustic specialists. No corporate bureaucracy. Absolute creative ownership.
          </p>
        </div>

        {/* Roles List */}
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-[#151115] border border-[#FF3348]/20 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:border-[#FF3348]/70 hover:bg-[#17090D]/50 transition-all duration-200"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="text-[#FF3348] font-bold tracking-widest">
                    {role.code}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-[#B8AEB1] tracking-wider uppercase">
                    {role.discipline}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-[#FF3348]/80">{role.location}</span>
                </div>

                <h3 className="text-xl font-mono font-bold text-[#F7F2F3] uppercase tracking-wide group-hover:text-white transition-colors">
                  {role.title}
                </h3>

                <p className="font-mono text-xs text-[#B8AEB1] leading-relaxed line-clamp-2">
                  {role.description}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden sm:block text-right font-mono text-xs">
                  <div className="text-[#F7F2F3] font-bold">{role.type}</div>
                  <div className="text-[#B8AEB1]/60 text-[10px]">{role.experience}</div>
                </div>

                <button
                  onClick={() => {
                    setActiveRole(role);
                    setApplied(false);
                  }}
                  className="px-5 py-3 bg-[#17090D] border border-[#FF3348]/50 text-[#F7F2F3] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#FF3348] hover:text-[#09090C] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>SUBMIT DOSSIER</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Culture Highlights Strip */}
        <div className="mt-12 p-6 bg-[#09090C] border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-[#B8AEB1]">
          <div className="space-y-1">
            <span className="text-[#FF3348] font-bold tracking-widest block uppercase">
              {"// EQUITY & AUTONOMY"}
            </span>
            <p className="text-[11px] leading-relaxed">
              Every core member holds real studio equity and revenue-share participation. You own the fruits of your obsession.
            </p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
            <span className="text-[#FF3348] font-bold tracking-widest block uppercase">
              {"// NO CRUNCH DICTATES"}
            </span>
            <p className="text-[11px] leading-relaxed">
              We engineer focused, surgical production schedules. Atmospheric mastery requires acute focus, not exhausted burnout.
            </p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
            <span className="text-[#FF3348] font-bold tracking-widest block uppercase">
              {"// GLOBAL TELEPRESENCE"}
            </span>
            <p className="text-[11px] leading-relaxed">
              Fully remote workstations with hardware stipends for dual-workstation setups, reference audio monitors, and VR devkits.
            </p>
          </div>
        </div>
      </div>

      {/* Role Application Modal */}
      {activeRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#09090C] border border-[#FF3348]/40 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
              <span className="text-[#FF3348] font-bold tracking-widest uppercase">
                COMM CANDIDACY {"//"} {activeRole.code}
              </span>
              <button
                onClick={() => setActiveRole(null)}
                className="text-[#B8AEB1] hover:text-[#FF3348] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applied ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <CheckCircle2 className="w-12 h-12 text-[#FF3348] mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-[#F7F2F3] uppercase tracking-wide">
                  DOSSIER TRANSMITTED
                </h4>
                <p className="text-xs text-[#B8AEB1] max-w-sm mx-auto leading-relaxed">
                  Your encrypted application has been logged by Red Moros Talent Core. If your technical profile matches our frequency, an engineer will establish contact.
                </p>
                <button
                  onClick={() => setActiveRole(null)}
                  className="mt-4 px-6 py-2.5 bg-[#17090D] border border-[#FF3348] text-[#F7F2F3] text-xs uppercase tracking-widest"
                >
                  DISMISS TERMINAL
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-[#FF3348] uppercase tracking-widest font-bold">
                    ROLE TARGET
                  </div>
                  <div className="text-lg font-bold text-[#F7F2F3] uppercase mt-0.5">
                    {activeRole.title}
                  </div>
                  <div className="text-[11px] text-[#B8AEB1]/70">{activeRole.location}</div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] text-[#B8AEB1] tracking-widest uppercase block">
                    CALLSIGN / LEGAL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full bg-[#151115] border border-white/15 px-3 py-2 text-[#F7F2F3] focus:border-[#FF3348] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#B8AEB1] tracking-widest uppercase block">
                    SECURE COMM EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@domain.com"
                    className="w-full bg-[#151115] border border-white/15 px-3 py-2 text-[#F7F2F3] focus:border-[#FF3348] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#B8AEB1] tracking-widest uppercase block">
                    PORTFOLIO / GITHUB / ARTSTATION / REEL URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    placeholder="https://artstation.com/your-reel"
                    className="w-full bg-[#151115] border border-white/15 px-3 py-2 text-[#F7F2F3] focus:border-[#FF3348] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#B8AEB1] tracking-widest uppercase block">
                    BRIEF TECHNICAL STATEMENT & EXPERTISE
                  </label>
                  <textarea
                    rows={3}
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    placeholder="Highlight relevant physics pipelines, rendering experience, or shipping history..."
                    className="w-full bg-[#151115] border border-white/15 px-3 py-2 text-[#F7F2F3] focus:border-[#FF3348] focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveRole(null)}
                    className="text-[#B8AEB1] hover:text-[#F7F2F3] uppercase text-xs"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FF3348] text-[#09090C] font-bold uppercase tracking-widest hover:bg-[#F7F2F3] transition-colors"
                  >
                    TRANSMIT APPLICATION
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
