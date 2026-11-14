"use client";

import React from "react";
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";
import { Briefcase } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#FF0000]/20 bg-[#09090C]/95 backdrop-blur-md">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Typography */}
        <Link href="/" className="flex items-center group shrink-0">
          <div className="flex flex-col">
            <span className="font-mono text-sm sm:text-lg font-black tracking-[0.18em] sm:tracking-[0.2em] text-white uppercase leading-none group-hover:text-[#FF0000] transition-colors">
              RED MOROS
            </span>
            <span className="font-mono text-[7px] sm:text-[9px] tracking-[0.35em] sm:tracking-[0.4em] text-[#FFF700] font-bold uppercase mt-0.5 sm:mt-1 leading-none">
              STUDIOS
            </span>
          </div>
        </Link>

        {/* Right Navigation & Audio */}
        <div className="flex items-center gap-3 sm:gap-6 font-mono tracking-wider">
          <Link
            href="/"
            className="text-[#B8AEB1] hover:text-white hover:border-b hover:border-[#FF0000] py-1 transition-colors text-[11px] sm:text-xs"
          >
            HOME
          </Link>
          <Link
            href="/careers"
            className="text-[#B8AEB1] hover:text-white hover:border-b hover:border-[#FF0000] py-1 transition-colors flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs"
          >
            <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF0000]" />
            <span>CAREERS</span>
          </Link>
          <AudioPlayer />
        </div>
      </div>
    </header>
  );
}
