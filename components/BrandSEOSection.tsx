"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Terminal, Shield, Sparkles, ExternalLink } from "lucide-react";

export default function BrandSEOSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      aria-label="Red Moros Studios Overview"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 border-t border-[#FF0000]/15"
    >
      {/* Visual Header / Summary Bar */}
      <div className="bg-[#110D12] border border-[#FF0000]/30 p-5 sm:p-7 relative transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.05)]">
        {/* Corner Accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#FF0000]" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#FF0000]" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#FF0000]" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#FF0000]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FF0000]" />
              <h2 className="font-mono text-xs sm:text-sm font-black tracking-[0.25em] text-[#FF0000] uppercase">
                STUDIO DOSSIER // RED MOROS STUDIOS (REDMOROS)
              </h2>
            </div>
            <p className="font-mono text-xs sm:text-sm text-[#E0D8D9] font-light max-w-2xl leading-relaxed">
              Official archive of <strong className="font-bold text-white">Red Moros Studios</strong> (also known as <strong className="font-bold text-white">RedMoros</strong>, <strong className="font-bold text-white">Red Moros</strong>, and <strong className="font-bold text-white">RedMorosStudios</strong>). Independent developers of story-driven psychological horror thriller game experiences.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 self-start md:self-center px-4 py-2 bg-[#1A1218] border border-[#FF0000]/40 hover:border-[#FF0000] text-white font-mono text-xs tracking-wider transition-colors cursor-pointer"
            aria-expanded={isOpen}
            aria-controls="studio-dossier-content"
          >
            <span>{isOpen ? "COLLAPSE INTEL" : "EXPAND INTEL & ALIASES"}</span>
            {isOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#FF0000]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#FF0000]" />
            )}
          </button>
        </div>

        {/* Collapsible / Rich SEO Content */}
        <div
          id="studio-dossier-content"
          className={`${
            isOpen ? "block mt-6 pt-6 border-t border-white/10" : "hidden md:block md:mt-4 md:pt-4 md:border-t md:border-white/5"
          } space-y-6 font-mono text-xs`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#B8AEB1]">
            {/* Column 1: Studio Identity */}
            <div className="space-y-2">
              <div className="text-[#FFF700] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-[#FFF700]" />
                <span>STUDIO IDENTITY & ALIASES</span>
              </div>
              <p className="leading-relaxed font-light">
                <strong className="text-white">Red Moros Studios</strong> operates across all major channels under the designations:
              </p>
              <ul className="list-disc list-inside space-y-1 text-white/90 text-[11px]">
                <li><span className="text-[#FF0000]">Red Moros</span> (Primary Moniker)</li>
                <li><span className="text-[#FF0000]">RedMoros</span> (Compressed Identity)</li>
                <li><span className="text-[#FF0000]">Red Moros Studios</span> (Full Studio Name)</li>
                <li><span className="text-[#FF0000]">RedMorosStudios</span> (Digital & Social Handle)</li>
              </ul>
            </div>

            {/* Column 2: Flagship Titles */}
            <div className="space-y-2">
              <div className="text-[#FFF700] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#FFF700]" />
                <span>CURRENT IN-DEVELOPMENT TITLE</span>
              </div>
              <p className="leading-relaxed font-light">
                <strong className="text-white">UNKNOWN 13</strong> — A first-person psychological horror thriller game experience exploring claustrophobic narrative design, visceral tension, and photorealistic environmental fidelity.
              </p>
              <div className="text-[11px] text-[#B8AEB1]">
                Target Platform: PC / Windows • Engine: Unreal Engine • Genre: Psychological Horror Thriller
              </div>
            </div>

            {/* Column 3: Transmission & Careers */}
            <div className="space-y-2">
              <div className="text-[#FFF700] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-[#FFF700]" />
                <span>COMMUNICATIONS & CAREERS</span>
              </div>
              <p className="leading-relaxed font-light">
                We are actively looking for talented technical artists, 3D environment designers, and narrative developers to join <strong className="text-white">Red Moros Studios</strong>.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-1 text-[#FF0000] hover:text-white transition-colors text-xs font-bold underline underline-offset-4"
              >
                <span>EXPLORE RED MOROS CAREERS</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Quick Keywords Cloud for Crawler Indexing */}
          <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2 text-[10px] text-[#B8AEB1]/60">
            <span className="text-[#FF0000]">INDEX TAGS:</span>
            <span>Red Moros</span>
            <span>•</span>
            <span>RedMoros</span>
            <span>•</span>
            <span>Red Moros Studios</span>
            <span>•</span>
            <span>RedMorosStudios</span>
            <span>•</span>
            <span>Red Moros Studio</span>
            <span>•</span>
            <span>Unknown 13 Horror Game</span>
            <span>•</span>
            <span>Psychological Horror Game Studio</span>
            <span>•</span>
            <span>Story-Driven Thriller Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
