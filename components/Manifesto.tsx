"use client";

import React from "react";
import { Radio, Disc, ShieldCheck } from "lucide-react";

export default function Manifesto() {
  const tenets = [
    {
      index: "01",
      title: "ACOUSTIC OPPRESSION",
      icon: Radio,
      summary:
        "Sound is not accompaniment—it is architecture. Subsonic frequencies, spatial reverberation, and vacuum voids act as physical boundaries that govern player respiration.",
      metric: "7.1 BINAURAL / 0ms LATENCY",
    },
    {
      index: "02",
      title: "TACTILE INERTIA",
      icon: Disc,
      summary:
        "Modern games sanitize physical interaction. We engineer mechanical weight where mass has inertia, bulkheads demand torque to seal, and flesh yields to pressure.",
      metric: "CUSTOM PHYSX RUNTIME",
    },
    {
      index: "03",
      title: "UNCOMPROMISED AUTONOMY",
      icon: ShieldCheck,
      summary:
        "We operate without corporate committees or algorithmic homogenization. Every frame, shadow, and silence is tuned to evoke visceral, lingering psychological dread.",
      metric: "100% INDEPENDENT",
    },
  ];

  return (
    <section
      id="philosophy"
      className="relative py-20 sm:py-28 border-b border-[#FF3348]/15 bg-[#09090C] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#17090D] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Label */}
        <div className="flex items-center gap-2.5 font-mono text-[10px] sm:text-xs tracking-widest text-[#FF3348] uppercase mb-8">
          <span className="w-5 h-px bg-[#FF3348]" />
          <span>{"01 // EDITORIAL MANIFESTO"}</span>
        </div>

        {/* Hero Manifesto Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline mb-16 sm:mb-20">
          <div className="lg:col-span-8">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-mono font-black tracking-tight text-[#F7F2F3] uppercase leading-[1.1]">
              “WE REJECT COMFORT. WE CONSTRUCT WORLDS WHERE TENSION IS AN ART FORM,{" "}
              <span className="text-[#FF3348]">PHYSICS ARE VISCERAL</span>, AND DARKNESS IS NOT AN ABSENCE—IT IS A PRESENCE.”
            </h2>
          </div>
          <div className="lg:col-span-4 space-y-3 font-mono text-xs text-[#B8AEB1] leading-relaxed border-l border-[#FF3348]/20 pl-4 sm:pl-6">
            <p className="uppercase tracking-widest text-[#FF3348] font-bold">
              {"// STUDIO PHILOSOPHY"}
            </p>
            <p className="font-light">
              Founded by veterans of atmospheric storytelling and technical simulation. Red Moros Studios exists to push the frontier of interactive dread through technical precision and brutalist minimalism.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[10px] sm:text-[11px] text-[#F7F2F3]">
              <span className="w-1.5 h-1.5 bg-[#FF3348]" />
              <span>MONTRÉAL / BERLIN / TOKYO FOUNDRIES</span>
            </div>
          </div>
        </div>

        {/* 3 Structured Tenet Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {tenets.map((tenet) => {
            const Icon = tenet.icon;
            return (
              <div
                key={tenet.index}
                className="group relative bg-[#151115] border border-[#FF3348]/20 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#FF3348]/70 hover:bg-[#17090D]/60 hover:shadow-[0_0_25px_rgba(255,51,72,0.12)]"
              >
                {/* Corner Accents */}
                <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#FF3348]/40 group-hover:border-[#FF3348] transition-colors" />
                <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#FF3348]/40 group-hover:border-[#FF3348] transition-colors" />

                <div>
                  {/* Top Bar with Index & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4 sm:mb-6">
                    <span className="font-mono text-xs text-[#FF3348] font-bold tracking-widest">
                      TENET {"//"} {tenet.index}
                    </span>
                    <Icon className="w-4 h-4 text-[#B8AEB1] group-hover:text-[#FF3348] transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-mono font-bold tracking-wider text-[#F7F2F3] uppercase mb-3">
                    {tenet.title}
                  </h3>

                  {/* Text */}
                  <p className="font-mono text-xs sm:text-sm text-[#B8AEB1] leading-relaxed mb-6 font-light">
                    {tenet.summary}
                  </p>
                </div>

                {/* Bottom Technical Spec */}
                <div className="pt-4 border-t border-white/5 font-mono text-[9px] sm:text-[10px] text-[#FF3348]/80 tracking-widest uppercase">
                  {tenet.metric}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
