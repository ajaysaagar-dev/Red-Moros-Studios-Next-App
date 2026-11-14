"use client";

import React from "react";
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";
import { Briefcase } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#FF0000]/20 bg-[#09090C]/95 backdrop-blur-md">

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Typography */}
        <Link href="/" className="flex items-center group">
          <div className="flex flex-col">
            <span className="font-mono text-base sm:text-lg font-black tracking-[0.2em] text-white uppercase leading-none group-hover:text-[#FF0000] transition-colors">
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
      </div>
    </header>
  );
}
