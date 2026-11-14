"use client";

import React, { useState } from "react";
import HeroCanvas from "./HeroCanvas";
import VideoModal from "./VideoModal";
import { ArrowDownRight, Play } from "lucide-react";

export default function Hero() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center border-b border-[#FF3348]/15 overflow-hidden bg-tech-grid">
      {/* Ambient Burgundy Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] lg:w-[800px] h-[320px] sm:h-[500px] bg-gradient-to-br from-[#17090D] via-[#A60019]/15 to-transparent blur-3xl pointer-events-none opacity-80" />

      {/* Main Grid Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Iconic Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-left">
            
            {/* Coming Soon & Tag Strip */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#17090D] border border-[#FF3348] text-[#FF3348] font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(255,51,72,0.25)]">
                <span className="w-2 h-2 rounded-full bg-[#FF3348] animate-ping" />
                <span>COMING SOON</span>
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#B8AEB1] tracking-[0.2em] uppercase">
                {"// UNANNOUNCED PROJECT"}
              </span>
            </div>

            {/* Giant Iconic Headline */}
            <div className="space-y-3">
              <h1 className="font-mono text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-[#F7F2F3] leading-[0.94]">
                A STORY-DRIVEN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3348] via-[#FF3348] to-[#A60019]">
                  PSYCHOLOGICAL HORROR
                </span> <br />
                THRILLER EXPERIENCE.
              </h1>
              
              <p className="font-mono text-sm sm:text-base md:text-lg text-[#B8AEB1] font-light tracking-wide max-w-xl pt-2 leading-relaxed">
                Red Moros Studios is crafting an uncompromising cinematic journey engineered with industry-leading visual fidelity, oppressive atmospheric depth, and visceral storytelling.
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#notify"
                className="group relative px-6 py-4 bg-[#FF3348] text-[#09090C] font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#F7F2F3] hover:shadow-[0_0_30px_rgba(255,51,72,0.4)]"
              >
                <span>GET NOTIFIED ON REVEAL</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#F7F2F3]" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#09090C]" />
              </a>

              <button
                onClick={() => setShowreelOpen(true)}
                className="group px-6 py-4 bg-[#151115] border border-[#FF3348]/40 text-[#F7F2F3] font-mono font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:border-[#FF3348] hover:bg-[#17090D] cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full border border-[#FF3348] flex items-center justify-center group-hover:bg-[#FF3348] transition-colors">
                  <Play className="w-2 h-2 fill-current text-[#FF3348] group-hover:text-[#09090C] ml-0.5" />
                </div>
                <span>WATCH ATMOSPHERIC TEASER</span>
              </button>
            </div>

            {/* Key Pillars Badge Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/5 font-mono text-xs">
              <div>
                <span className="text-[9px] sm:text-[10px] text-[#FF3348] tracking-widest uppercase font-bold block">
                  GENRE
                </span>
                <span className="text-[#F7F2F3] text-xs sm:text-sm tracking-tight font-medium">
                  PSYCHOLOGICAL HORROR
                </span>
              </div>
              <div className="border-l border-white/5 pl-3 sm:pl-4">
                <span className="text-[9px] sm:text-[10px] text-[#FF3348] tracking-widest uppercase font-bold block">
                  DIRECTION
                </span>
                <span className="text-[#F7F2F3] text-xs sm:text-sm tracking-tight font-medium">
                  STORY-DRIVEN THRILLER
                </span>
              </div>
              <div className="border-l border-white/5 pl-3 sm:pl-4 col-span-2 sm:col-span-1">
                <span className="text-[9px] sm:text-[10px] text-[#FF3348] tracking-widest uppercase font-bold block">
                  GRAPHICAL STANDARD
                </span>
                <span className="text-[#F7F2F3] text-xs sm:text-sm tracking-tight font-medium">
                  BEST-IN-CLASS VISUALS
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Wireframe Obsidian Prism */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-square bg-[#151115]/80 border border-[#FF3348]/25 p-2 backdrop-blur-sm">
              {/* Corner Notches */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#FF3348]" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#FF3348]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#FF3348]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#FF3348]" />

              {/* Responsive 3D Canvas */}
              <HeroCanvas />

              {/* Bottom HUD Tag */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-[#B8AEB1]/60 border-t border-white/5 pt-2">
                <span className="text-[#FF3348]">RED MOROS // ARTIFACT</span>
                <span>TOUCH / HOVER INTERACTION</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Cinematic Reel Modal */}
      <VideoModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        title="RED MOROS STUDIOS // ATMOSPHERIC IN-ENGINE REEL"
      />
    </section>
  );
}
