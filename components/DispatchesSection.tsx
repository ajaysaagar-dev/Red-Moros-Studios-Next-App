"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface Dispatch {
  id: string;
  logId: string;
  title: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
}

export default function DispatchesSection() {
  const [selectedDispatch, setSelectedDispatch] = useState<Dispatch | null>(null);

  const dispatches: Dispatch[] = [
    {
      id: "log-042",
      logId: "LOG // 042",
      title: "THE PHYSICS OF CLAUSTROPHOBIA: SIMULATING HULL DECOMPRESSION",
      author: "DR. K. VANCE",
      role: "PRINCIPAL SYSTEMS ARCHITECT",
      date: "OCT 2026",
      readTime: "6 MIN READ",
      category: "PHYSICS & ACOUSTICS",
      excerpt:
        "How we simulated localized air density falloff so that sound waves progressively shed high-frequency clarity as cabin pressure drops into vacuum silence.",
      content:
        "When an airlock seal fails on Thalassa-IV, the threat is not merely sudden decompression. It is the insidious decay of auditory perception. In traditional games, vacuum is often represented by a simplistic low-pass filter. For Aberration, we engineered a physical acoustic wave attenuation solver where sound propagation is directly tied to the atmospheric particle density in the local physics grid cell. As air rushes through a breached hull, footsteps lose their crisp transients, breathing grows muffled and isolated inside the helmet, and the external world vanishes into terrifying, suffocating silence.",
    },
    {
      id: "log-039",
      logId: "LOG // 039",
      title: "RAY-MARCHED CRIMSON: REAL-TIME VOLUMETRIC SCATTERING IN UE5",
      author: "M. ALTHAUS",
      role: "LEAD SHADER & LIGHTING ARTIST",
      date: "SEP 2026",
      readTime: "8 MIN READ",
      category: "RENDERING & GRAPHICS",
      excerpt:
        "Engineering our signature monochromatic red volumetric scattering without sacrificing our native 4K 60FPS target console performance.",
      content:
        "Standard deferred volumetric fog often produces noticeable blockiness or heavy temporal ghosting when interacting with high-contrast crimson illumination. Our bespoke pass isolates light wavelengths in the 650–700nm spectrum, applying an anisotropic phase function that mimics particulate moisture and industrial steam. By interleaving our ray samples across four temporal sub-frames and reconstructing with bilateral depth-aware filtering, we achieved filmic density with a microscopic GPU cost of 1.1ms at native 4K resolution.",
    },
    {
      id: "log-033",
      logId: "LOG // 033",
      title: "HOSTILITY WITHOUT SCRIPTS: ADAPTIVE ENTITY PREDATION",
      author: "R. TAKAHASHI",
      role: "AI & SYSTEMS PROGRAMMER",
      date: "AUG 2026",
      readTime: "5 MIN READ",
      category: "NEURAL BEHAVIOR",
      excerpt:
        "Why predetermined patrol routes ruin horror, and how our entities triangulate player panic by analyzing footstep cadence and breathing hesitation.",
      content:
        "Predictability is the death of suspense. The moment a player learns an enemy's patrol path, terror collapses into a timing puzzle. The Aberration entity does not patrol. It listens. It maintains a persistent mental map of auditory anomalies across the vessel's ventilation ducts. If a player sprints, pauses abruptly in fear, or relies heavily on their tactile emergency flashlight, the entity calculates a predictive intercept vector through secondary maintenance chutes. It will purposefully wait in darkness until you feel safe before triggering the ambient lights.",
    },
  ];

  return (
    <section
      id="dispatches"
      className="relative py-20 sm:py-28 border-b border-[#FF3348]/15 bg-[#09090C] bg-tech-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#FF3348] uppercase mb-3">
              <span className="w-6 h-px bg-[#FF3348]" />
              <span>{"04 // TRANSMISSIONS & RESEARCH"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-[#F7F2F3] uppercase">
              FIELD DISPATCHES
            </h2>
          </div>
          <p className="font-mono text-xs text-[#B8AEB1] max-w-sm leading-relaxed">
            Unfiltered development notes, technical architectural breakdowns, and design theory from our Montreal, Berlin, and Tokyo engineering teams.
          </p>
        </div>

        {/* Articles List / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dispatches.map((item) => (
            <article
              key={item.id}
              className="bg-[#151115] border border-[#FF3348]/20 p-8 flex flex-col justify-between group hover:border-[#FF3348]/70 hover:bg-[#17090D]/50 transition-all duration-300"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between font-mono text-[10px] text-[#B8AEB1]/70 pb-4 border-b border-white/5 mb-6">
                  <span className="text-[#FF3348] font-bold tracking-widest">
                    {item.logId}
                  </span>
                  <span className="tracking-wider">{item.date}</span>
                </div>

                <div className="inline-block px-2 py-0.5 bg-[#09090C] border border-white/10 font-mono text-[9px] text-[#FF3348] tracking-widest uppercase mb-4">
                  {item.category}
                </div>

                <h3 className="text-lg font-mono font-bold tracking-tight text-[#F7F2F3] uppercase leading-snug mb-4 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="font-mono text-xs text-[#B8AEB1] leading-relaxed mb-6 font-light">
                  {item.excerpt}
                </p>
              </div>

              {/* Author and Read Action */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="font-mono text-[10px]">
                  <div className="text-[#F7F2F3] font-bold">{item.author}</div>
                  <div className="text-[#B8AEB1]/60 text-[9px]">{item.role}</div>
                </div>

                <button
                  onClick={() => setSelectedDispatch(item)}
                  className="p-2 border border-white/10 group-hover:border-[#FF3348] text-[#B8AEB1] group-hover:text-[#FF3348] transition-colors cursor-pointer"
                  title="Read Full Dispatch"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Dispatch Modal / Drawer */}
      {selectedDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#09090C] border border-[#FF3348]/40 p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
            {/* Corner Notches */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FF3348]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FF3348]" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
              <span className="text-[#FF3348] font-bold tracking-widest">
                {selectedDispatch.logId} {"// DISPATCH ARCHIVE"}
              </span>
              <button
                onClick={() => setSelectedDispatch(null)}
                className="text-[#B8AEB1] hover:text-[#FF3348] transition-colors cursor-pointer uppercase text-xs"
              >
                [CLOSE ESC]
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="text-[10px] font-mono text-[#FF3348] uppercase tracking-widest">
                {selectedDispatch.category} • {selectedDispatch.date} • {selectedDispatch.readTime}
              </div>
              <h3 className="text-2xl sm:text-3xl font-mono font-black text-[#F7F2F3] uppercase tracking-tight">
                {selectedDispatch.title}
              </h3>
              <div className="font-mono text-xs text-[#B8AEB1]/80">
                BY {selectedDispatch.author} {"//"} {selectedDispatch.role}
              </div>
            </div>

            <div className="font-mono text-sm text-[#B8AEB1] leading-relaxed space-y-4 border-t border-white/5 pt-6">
              <p className="text-base text-[#F7F2F3] leading-relaxed font-light">
                {selectedDispatch.content}
              </p>
              <p className="text-xs text-[#B8AEB1]/70 leading-relaxed">
                All architectural systems and proprietary shaders referenced in this document are property of Red Moros Studios. For licensing or academic inquiries regarding our research whitepapers, contact our engineering division.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedDispatch(null)}
                className="px-6 py-2.5 bg-[#17090D] border border-[#FF3348] text-[#F7F2F3] font-mono text-xs uppercase tracking-widest hover:bg-[#FF3348] hover:text-[#09090C] transition-colors"
              >
                CLOSE DISPATCH
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
