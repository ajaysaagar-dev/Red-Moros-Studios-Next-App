"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Briefcase, Shield } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#09090C] border-t border-[#FF0000]/20 py-12 sm:py-16 overflow-hidden cv-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-8">
        
        {/* Brand & Narrative */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="space-y-2 text-left">
            <Link href="/" className="inline-block group">
              <div className="font-mono text-base font-black tracking-[0.2em] text-white uppercase group-hover:text-[#FF0000] transition-colors">
                RED MOROS <span className="text-[#FF0000]">STUDIOS</span>
              </div>
            </Link>
            <p className="font-mono text-xs text-[#B8AEB1] max-w-md leading-relaxed font-light">
              A story-driven psychological horror thriller game experience with best visuals. Coming Soon.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <Link
              href="/careers"
              className="text-[#B8AEB1] hover:text-[#FF0000] transition-colors flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#FF0000]" />
              <span>CAREERS</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#151115] border border-white/10 hover:border-[#FF0000] text-white font-mono text-xs transition-colors cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#FF0000]" />
            </button>
          </div>
        </div>

        {/* Legal Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#B8AEB1]/60">
          <div>
            © 2026 RED MOROS STUDIOS INC. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
}
