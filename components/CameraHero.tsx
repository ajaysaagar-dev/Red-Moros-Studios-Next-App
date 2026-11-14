"use client";

import React, { useState } from "react";
import VideoModal from "./VideoModal";

export default function CameraHero() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#09090C] py-8 sm:py-20 lg:py-28">
      {/* MASSIVE CINEMATIC CRIMSON RADIAL BLOOM EXACTLY AS IN REF.SVG */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] sm:w-[130vw] h-[100vh] max-w-[2000px] pointer-events-none opacity-80"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(255, 0, 0, 0.6) 0%, rgba(153, 0, 0, 0.2) 48%, rgba(9, 9, 12, 0) 80%)",
        }}
      />

      {/* Subtle Technical Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: THE ICONIC RED MOROS */}
          <div className="lg:col-span-7 flex flex-col justify-center select-none text-left">
            
            {/* Top Tag */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF0000] shrink-0" />
              <span className="font-mono text-[9px] sm:text-xs text-[#FF0000] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-bold">
                {"RED MOROS STUDIOS // Unknown 13 [Psychological Horror Game]"}
              </span>
            </div>

            {/* Giant Monolithic Brand Headline matching ref.svg */}
            <div className="flex flex-col tracking-tighter leading-[0.88]">
              {/* Row 1: "RED" in White */}
              <div className="flex items-baseline gap-3 sm:gap-6 flex-wrap">
                <span className="font-mono text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight uppercase">
                  RED
                </span>
              </div>

              {/* Row 2: "MOROS" in Massive Blood Red (#FF0000) */}
              <div className="mt-1 sm:mt-2">
                <span className="font-mono text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#FF0000] tracking-tight uppercase drop-shadow-[0_0_35px_rgba(255,0,0,0.5)]">
                  MOROS
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: THE EDITORIAL STACK FROM REF.SVG */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:items-end text-left lg:text-right select-none">
            <div className="p-6 sm:p-8 bg-[#151115]/90 border border-[#FF0000]/30 backdrop-blur-sm relative space-y-4 max-w-md w-full shadow-[0_0_30px_rgba(0,0,0,0.7)]">
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF0000]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF0000]" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF0000]" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF0000]" />

              {/* The exact typography stack from ref.svg (fill="#F96769") */}
              <div className="space-y-1 font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-[#F96769] tracking-widest uppercase leading-tight">
                <div>A STORY-DRIVEN</div>
                <div>PSYCHOLOGICAL</div>
                <div>HORROR</div>
                <div>THRILLER</div>
                <div className="text-white">EXPERIENCE.</div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Cinematic Reel Modal */}
      <VideoModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        title="RED MOROS STUDIOS // IN-ENGINE ATMOSPHERIC TEASER"
      />
    </section>
  );
}
