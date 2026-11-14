"use client";

import React, { useState } from "react";
import VideoModal from "./VideoModal";
import Link from "next/link";
import { ArrowUpRight, Play, Briefcase } from "lucide-react";

export default function CameraHero() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#09090C]">
      {/* MASSIVE CINEMATIC CRIMSON RADIAL BLOOM EXACTLY AS IN REF.SVG */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[130vw] h-[100vh] max-w-[2000px] pointer-events-none opacity-80"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(255, 0, 0, 0.6) 0%, rgba(153, 0, 0, 0.2) 48%, rgba(9, 9, 12, 0) 80%)",
        }}
      />

      {/* Subtle Technical Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: THE ICONIC RED MOROS STUDIOS + COMING SOON... */}
          <div className="lg:col-span-7 flex flex-col justify-center select-none text-left">
            
            {/* Top Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
              <span className="font-mono text-[10px] sm:text-xs text-[#FF0000] tracking-[0.3em] uppercase font-bold">
                {"RED MOROS STUDIOS // UNANNOUNCED PROJECT"}
              </span>
            </div>

            {/* Giant Monolithic Brand Headline matching ref.svg */}
            <div className="flex flex-col tracking-tighter leading-[0.88]">
              {/* Row 1: "RED" in White + "STUDIOS" in Yellow (#FFF700) */}
              <div className="flex items-baseline gap-3 sm:gap-6 flex-wrap">
                <span className="font-mono text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight uppercase">
                  RED
                </span>
                <span className="font-mono text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#FFF700] tracking-[0.15em] uppercase font-bold">
                  STUDIOS
                </span>
              </div>

              {/* Row 2: "MOROS" in Massive Blood Red (#FF0000) */}
              <div className="mt-1 sm:mt-2">
                <span className="font-mono text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#FF0000] tracking-tight uppercase drop-shadow-[0_0_35px_rgba(255,0,0,0.5)]">
                  MOROS
                </span>
              </div>

              {/* Row 3: "COMING SOON..." Outlined in Red with Stencil Glow */}
              <div className="mt-4 sm:mt-5">
                <span 
                  className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[0.2em] uppercase text-transparent select-none inline-block"
                  style={{
                    WebkitTextStroke: "1.5px #FF0000",
                    textShadow: "0 0 20px rgba(255, 0, 0, 0.5)",
                  }}
                >
                  COMING SOON...
                </span>
              </div>
            </div>

            {/* Sub-text explicitly matching user request */}
            <p className="font-mono text-xs sm:text-sm md:text-base text-[#B8AEB1] font-light max-w-lg mt-6 leading-relaxed">
              A story-driven psychological horror thriller game experience with best visuals.
            </p>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6">
              <Link
                href="/careers"
                className="group relative px-6 py-3.5 bg-[#FF0000] text-[#09090C] font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]"
              >
                <Briefcase className="w-4 h-4" />
                <span>EXPLORE CAREERS</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <button
                onClick={() => setShowreelOpen(true)}
                className="group px-6 py-3.5 bg-[#17090D] border border-[#FF0000]/50 text-[#F7F2F3] font-mono font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 hover:border-[#FF0000] hover:bg-[#FF0000]/20 cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full border border-[#FF0000] flex items-center justify-center group-hover:bg-[#FF0000] transition-colors">
                  <Play className="w-2 h-2 fill-current text-[#FF0000] group-hover:text-[#09090C] ml-0.5" />
                </div>
                <span>WATCH SHOWREEL</span>
              </button>
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

              {/* Category Marker */}
              <div className="font-mono text-[10px] sm:text-xs text-[#FFF700] tracking-widest uppercase font-bold flex items-center lg:justify-end gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFF700]" />
                <span>GENRE & DIRECTION</span>
              </div>

              {/* The exact typography stack from ref.svg (fill="#F96769") */}
              <div className="space-y-1 font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-[#F96769] tracking-widest uppercase leading-tight">
                <div>A STORY-DRIVEN</div>
                <div>PSYCHOLOGICAL</div>
                <div>HORROR</div>
                <div>THRILLER</div>
                <div className="text-white">EXPERIENCE.</div>
              </div>

              {/* Best visuals highlight */}
              <div className="pt-4 border-t border-white/10 font-mono text-[11px] sm:text-xs text-[#B8AEB1] flex flex-col gap-1">
                <div className="text-[#FF0000] font-bold tracking-wider uppercase">
                  BEST-IN-CLASS VISUALS
                </div>
                <div className="text-[10px] text-[#B8AEB1]/80 leading-relaxed font-light">
                  Atmospheric photorealistic lighting, dynamic shadow physics, and unsettling psychological fidelity.
                </div>
              </div>

              {/* Status */}
              <div className="pt-2 flex items-center justify-between font-mono text-[9px] text-[#B8AEB1]/50 border-t border-white/5">
                <span>RED MOROS STUDIOS</span>
                <span className="text-[#FF0000]">COMING SOON</span>
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
