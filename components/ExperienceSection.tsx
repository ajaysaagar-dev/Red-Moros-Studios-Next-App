"use client";

import React, { useState } from "react";
import { Eye, Film, Sparkles, Play } from "lucide-react";
import VideoModal from "./VideoModal";

export default function ExperienceSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const pillars = [
    {
      index: "01",
      title: "STORY-DRIVEN THRILLER",
      subtitle: "DEEP PSYCHOLOGICAL NARRATIVE",
      icon: Film,
      description:
        "An intensely personal, character-centric mystery where perception, memory, and reality unravel. Every quiet corridor and cryptic encounter deepens a layered narrative that refuses to hold your hand.",
    },
    {
      index: "02",
      title: "BEST-IN-CLASS VISUALS",
      subtitle: "CUTTING-EDGE GRAPHICAL REALISM",
      icon: Sparkles,
      description:
        "Engineered with state-of-the-art lighting pipelines, volumetric smoke and crimson scatter, and high-fidelity textures. Visual design is tuned to deliver an unforgettable cinematic experience.",
    },
    {
      index: "03",
      title: "PSYCHOLOGICAL HORROR",
      subtitle: "VISCERAL, UNRELENTING ATMOSPHERE",
      icon: Eye,
      description:
        "True dread is not built on cheap jump scares. We weaponize sound design, negative space, and psychological isolation to keep your senses on edge from the opening frame.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 border-b border-[#FF0000]/20 bg-[#09090C] overflow-hidden cv-auto">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] bg-[#990000]/20 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 sm:mb-16 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[10px] sm:text-xs tracking-widest text-[#FF0000] uppercase mb-2">
              <span className="w-5 h-px bg-[#FF0000]" />
              <span>{"THE GAME EXPERIENCE"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-white uppercase">
              ATMOSPHERIC HORROR
            </h2>
          </div>
          <div className="font-mono text-xs text-[#B8AEB1] max-w-sm leading-relaxed font-light">
            A story-driven psychological horror thriller engineered to deliver the best visuals and unforgettable cinematic immersion.
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.index}
                className="group relative bg-[#151115] border border-[#FF0000]/20 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#FF0000]/70 hover:bg-[#17090D]/80 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)]"
              >
                {/* Corner accents */}
                <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#FF0000]/40 group-hover:border-[#FF0000] transition-colors" />
                <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#FF0000]/40 group-hover:border-[#FF0000] transition-colors" />

                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                    <span className="font-mono text-xs text-[#FF0000] font-bold tracking-widest">
                      PILLAR {"//"} {pillar.index}
                    </span>
                    <Icon className="w-4 h-4 text-[#B8AEB1] group-hover:text-[#FF0000] transition-colors" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-mono font-bold tracking-wider text-white uppercase mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-[10px] font-mono text-[#FFF700] uppercase tracking-widest font-semibold mb-4">
                    {pillar.subtitle}
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-[#B8AEB1] leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 font-mono text-[9px] sm:text-[10px] text-[#B8AEB1]/60 tracking-widest uppercase">
                  STATUS: IN ACTIVE PRODUCTION
                </div>
              </div>
            );
          })}
        </div>

        {/* Cinematic Letterbox Teaser Banner */}
        <div className="relative bg-[#151115] border border-[#FF0000]/30 p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-left">
            <span className="px-2.5 py-1 bg-[#17090D] border border-[#FF0000]/50 text-[#FF0000] font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              COMING SOON
            </span>
            <h4 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight">
              A VISCERAL DESCENT INTO UNKNOWN TERROR.
            </h4>
            <p className="font-mono text-xs sm:text-sm text-[#B8AEB1] leading-relaxed font-light">
              Witness the atmospheric showreel previewing real-time in-engine lighting, dynamic acoustic shadows, and psychological tension.
            </p>
          </div>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full md:w-auto px-6 py-4 bg-[#FF0000] text-[#09090C] font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2.5 shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>PLAY SHOWREEL</span>
          </button>
        </div>

      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="RED MOROS STUDIOS // IN-ENGINE ATMOSPHERIC SHOWREEL"
      />
    </section>
  );
}
