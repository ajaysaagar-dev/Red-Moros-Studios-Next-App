"use client";

import React from "react";
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";
import { Briefcase } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#FF0000]/20 bg-[#09090C]/95 backdrop-blur-md">
      {/* Top micro telemetry bar */}
      <div className="hidden sm:flex items-center justify-between px-4 sm:px-6 lg:px-12 py-1.5 border-b border-white/[0.04] text-[10px] font-mono text-[#B8AEB1]/60 uppercase tracking-widest">
        <div className="flex items-center gap-2.5 text-[#FF0000]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
          <span>{"RED MOROS STUDIOS // RECRUITMENT & PORTAL"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#F96769] font-bold">{"STORY-DRIVEN PSYCHOLOGICAL HORROR THRILLER"}</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Crest & Monogram */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
            <div className="absolute inset-0 border border-[#FF0000] rotate-45 transition-transform duration-300 group-hover:rotate-90 bg-[#17090D]" />
            <div className="w-3.5 h-3.5 bg-[#FF0000] rotate-45 transition-transform duration-300 group-hover:scale-75" />
            <div className="absolute inset-0 bg-[#FF0000]/30 blur-sm rounded-full pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-base sm:text-lg font-black tracking-[0.2em] text-white uppercase leading-none">
              RED MOROS
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.4em] text-[#FFF700] font-bold uppercase mt-1 leading-none">
              STUDIOS
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 font-mono text-xs tracking-wider">
          <Link
            href="/"
            className="text-[#B8AEB1] hover:text-white hover:border-b hover:border-[#FF0000] py-1 transition-colors"
          >
            HOME
          </Link>
          <Link
            href="/careers"
            className="text-[#B8AEB1] hover:text-white hover:border-b hover:border-[#FF0000] py-1 transition-colors flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#FF0000]" />
            <span>CAREERS</span>
          </Link>
        </nav>

        {/* Right Section: Audio Player */}
        <div className="flex items-center gap-3">
          <AudioPlayer />
        </div>
      </div>
    </header>
  );
}
