"use client";

import React, { useState } from "react";
import { Cpu, Activity, Waves, Network, Layers, RefreshCw } from "lucide-react";

interface TechModule {
  id: string;
  number: string;
  title: string;
  category: string;
  icon: React.ElementType;
  description: string;
  benchmarks: { label: string; value: string }[];
}

export default function TechSection() {
  const [activeBenchmark, setActiveBenchmark] = useState(false);
  const [benchmarkProgress, setBenchmarkProgress] = useState(0);

  const modules: TechModule[] = [
    {
      id: "audio",
      number: "01",
      title: "CHRONO-SPATIAL AUDIO DSP",
      category: "BINAURAL ACOUSTICS",
      icon: Waves,
      description:
        "Real-time impulse response modeling that simulates sound reflection across varying material densities: titanium bulkheads, shattered composite, and vacuum voids where sound abruptly dies.",
      benchmarks: [
        { label: "IMPULSE TRACING", value: "64 RAYS / CONCURRENT" },
        { label: "SUB-BASS LATENCY", value: "1.2ms DSP PASS" },
        { label: "VACUUM FALLOFF", value: "DYNAMIC COEFFICIENT" },
      ],
    },
    {
      id: "kinematics",
      number: "02",
      title: "SUB-DERMAL KINEMATICS",
      category: "PROCEDURAL RIGS",
      icon: Activity,
      description:
        "Physics-driven animation system where limb momentum, joint resistance, and muscle fatigue are calculated per-frame. Characters visibly struggle against inertia, depressurization, and cybernetic recoil.",
      benchmarks: [
        { label: "PHYSICS TICKRATE", value: "120Hz SUB-STEPPED" },
        { label: "JOINT TORQUE", value: "DIEGETIC RESISTANCE" },
        { label: "WEIGHT COEFFICIENT", value: "MASS-ACCURATE" },
      ],
    },
    {
      id: "volumetrics",
      number: "03",
      title: "VOLUMETRIC CRIMSON DIFFUSION",
      category: "PHOTOMETRIC SCATTERING",
      icon: Layers,
      description:
        "Bespoke temporal ray-marching shader tuned exclusively for deep atmospheric fog, suspended particulate matter, and monochromatic red light scattering with minimal GPU footprint.",
      benchmarks: [
        { label: "RENDER COST", value: "1.1ms AT NATIVE 4K" },
        { label: "SCATTER RESOLUTION", value: "FULL-RES JITTER" },
        { label: "SPECTRAL BLUR", value: "ANAMORPHIC" },
      ],
    },
    {
      id: "neural-ai",
      number: "04",
      title: "NON-LINEAR THREAT GRAPH",
      category: "BEHAVIORAL AI",
      icon: Network,
      description:
        "Hostile entities that abandon scripted patrol routes. Neural state machines process player noise, breathing cadence, and retreat vectors to systematically coordinate ambushes.",
      benchmarks: [
        { label: "HEURISTIC SEARCH", value: "A* NAV-MESH + VOID" },
        { label: "PANIC REACTION", value: "HEART-RATE ADAPTIVE" },
        { label: "PREDICTIVE AMBUSH", value: "MULTI-NODE TOPOLOGY" },
      ],
    },
  ];

  const runBenchmark = () => {
    setActiveBenchmark(true);
    setBenchmarkProgress(0);
    const interval = setInterval(() => {
      setBenchmarkProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  return (
    <section
      id="technology"
      className="relative py-20 sm:py-28 border-b border-[#FF3348]/15 bg-[#09090C] overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-[#17090D] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[10px] sm:text-xs tracking-widest text-[#FF3348] uppercase mb-2">
              <span className="w-5 h-px bg-[#FF3348]" />
              <span>{"03 // EXPERIMENTAL TECHNOLOGY"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-[#F7F2F3] uppercase">
              THE MOROS FRAMEWORK
            </h2>
          </div>
          <div className="font-mono text-xs text-[#B8AEB1] max-w-md leading-relaxed">
            Proprietary low-level systems for Unreal Engine 5 that redefine tactile dread and physical presence.
          </div>
        </div>

        {/* 4 Technical Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="bg-[#151115] border border-[#FF3348]/20 p-6 sm:p-8 relative flex flex-col justify-between group hover:border-[#FF3348]/60 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#FF3348] font-bold tracking-widest">
                        MOD {"//"} {mod.number}
                      </span>
                      <span className="text-white/20">/</span>
                      <span className="font-mono text-[10px] text-[#B8AEB1] tracking-widest uppercase">
                        {mod.category}
                      </span>
                    </div>
                    <Icon className="w-4 h-4 text-[#B8AEB1] group-hover:text-[#FF3348] transition-colors" />
                  </div>

                  <div className="space-y-3 mb-6">
                    <h3 className="text-lg sm:text-xl font-mono font-bold tracking-wider text-[#F7F2F3] uppercase">
                      {mod.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-[#B8AEB1] leading-relaxed font-light">
                      {mod.description}
                    </p>
                  </div>
                </div>

                {/* Sub-benchmarks */}
                <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-2 font-mono text-[9px] sm:text-[10px]">
                  {mod.benchmarks.map((b, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="text-[#B8AEB1]/60 tracking-wider truncate">
                        {b.label}
                      </div>
                      <div className="text-[#F7F2F3] font-bold tracking-tight text-[10px] sm:text-[11px] truncate">
                        {b.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Framework Diagnostic Benchmark Console */}
        <div className="bg-[#151115] border border-[#FF3348]/30 p-5 sm:p-8 relative">
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FF3348]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FF3348]" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div>
              <div className="font-mono text-[10px] text-[#FF3348] tracking-widest uppercase font-bold flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#FF3348]" />
                <span>{"INTEGRATED HARDWARE BENCHMARK CONSOLE"}</span>
              </div>
              <h4 className="text-base sm:text-lg font-mono font-bold text-[#F7F2F3] uppercase tracking-wider mt-1">
                RENDERING & DSP TELEMETRY
              </h4>
            </div>

            <button
              onClick={runBenchmark}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-[#17090D] border border-[#FF3348]/50 text-[#F7F2F3] font-mono text-xs uppercase tracking-widest hover:bg-[#FF3348] hover:text-[#09090C] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  activeBenchmark && benchmarkProgress < 100 ? "animate-spin" : ""
                }`}
              />
              <span>
                {activeBenchmark && benchmarkProgress < 100
                  ? `RUNNING [${benchmarkProgress}%]`
                  : "RUN TELEMETRY"}
              </span>
            </button>
          </div>

          {/* Telemetry Readout Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 font-mono text-xs">
            <div className="p-3 bg-[#09090C] border border-white/5">
              <span className="text-[9px] sm:text-[10px] text-[#B8AEB1]/60 tracking-widest block uppercase">
                TARGET FRAMETIME
              </span>
              <div className="text-sm sm:text-base text-[#F7F2F3] font-bold mt-1">
                16.6ms <span className="text-[9px] text-[#FF3348] font-normal">[60 FPS]</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-[#B8AEB1]/50 mt-0.5">LOCKED VSYNC</div>
            </div>

            <div className="p-3 bg-[#09090C] border border-white/5">
              <span className="text-[9px] sm:text-[10px] text-[#B8AEB1]/60 tracking-widest block uppercase">
                VRAM ALLOCATED
              </span>
              <div className="text-sm sm:text-base text-[#F7F2F3] font-bold mt-1">
                4.2 GB <span className="text-[9px] text-[#B8AEB1]/60 font-normal">/ 16 GB</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-[#B8AEB1]/50 mt-0.5">STREAMING POOL</div>
            </div>

            <div className="p-3 bg-[#09090C] border border-white/5">
              <span className="text-[9px] sm:text-[10px] text-[#B8AEB1]/60 tracking-widest block uppercase">
                AUDIO DSP BUFFER
              </span>
              <div className="text-sm sm:text-base text-[#FF3348] font-bold mt-1">
                64 SAMPLES <span className="text-[9px] text-[#F7F2F3] font-normal">[1.3ms]</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-[#B8AEB1]/50 mt-0.5">ZERO PHASING</div>
            </div>

            <div className="p-3 bg-[#09090C] border border-white/5">
              <span className="text-[9px] sm:text-[10px] text-[#B8AEB1]/60 tracking-widest block uppercase">
                DRAW CALL BUDGET
              </span>
              <div className="text-sm sm:text-base text-[#F7F2F3] font-bold mt-1">
                1,380 <span className="text-[9px] text-[#B8AEB1]/60 font-normal">/ 3.5K</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-[#B8AEB1]/50 mt-0.5">NANITE 2 PASS</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
