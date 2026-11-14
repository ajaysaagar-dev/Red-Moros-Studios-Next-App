"use client";

import React, { useState, useEffect } from "react";
import { X, Play, Pause, RotateCcw } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  title = "RED MOROS STUDIOS // IN-ENGINE TEASER REEL",
}: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(30);
  const [timecode, setTimecode] = useState("00:00:42:15");

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.35));
        const seconds = Math.floor((Date.now() / 1000) % 60);
        const frames = Math.floor((Date.now() / 40) % 24);
        setTimecode(
          `00:01:${seconds.toString().padStart(2, "0")}:${frames
            .toString()
            .padStart(2, "0")}`
        );
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#09090C] border border-[#FF3348]/40 shadow-[0_0_50px_rgba(255,51,72,0.15)] flex flex-col overflow-hidden">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#151115] border-b border-[#FF3348]/20 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF3348] animate-ping" />
            <span className="text-[#FF3348] font-bold tracking-wider">{title}</span>
            <span className="hidden sm:inline text-[#B8AEB1]/40">|</span>
            <span className="hidden sm:inline text-[#B8AEB1]/60">IN-ENGINE FOOTAGE // COMING SOON</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#B8AEB1] hover:text-[#FF3348] hover:bg-[#17090D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-[#050507] overflow-hidden flex items-center justify-center">
          {/* Background Crimson Atmosphere & Vignette */}
          <div className="absolute inset-0 bg-radial from-[#17090D] via-[#09090C]/80 to-[#050507] opacity-90" />

          {/* Cinematic Scene HUD */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 text-center select-none">
            {/* Visual Crosshair HUD */}
            <div className="absolute inset-4 sm:inset-8 border border-[#FF3348]/10 pointer-events-none flex flex-col justify-between">
              <div className="flex justify-between p-2 font-mono text-[9px] sm:text-[10px] text-[#FF3348]/60">
                <span>[IN-ENGINE PASS]</span>
                <span>4K BEST VISUALS</span>
              </div>
              {/* Center reticle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-28 h-20 sm:h-28 border border-[#FF3348]/20 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#FF3348]" />
                <div className="absolute top-0 w-full h-0.5 bg-[#FF3348]/30" />
                <div className="absolute left-0 h-full w-0.5 bg-[#FF3348]/30" />
              </div>
              <div className="flex justify-between p-2 font-mono text-[9px] sm:text-[10px] text-[#B8AEB1]/60">
                <span>RED MOROS STUDIOS</span>
                <span>STATUS: COMING SOON</span>
              </div>
            </div>

            {/* Cinematic Center Text Overlay */}
            <div className="space-y-3 sm:space-y-4 max-w-lg z-20 px-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17090D]/80 border border-[#FF3348]/50 text-[10px] sm:text-[11px] font-mono text-[#FF3348] tracking-widest uppercase">
                STORY-DRIVEN PSYCHOLOGICAL HORROR THRILLER
              </div>
              <h3 className="font-mono text-xl sm:text-3xl font-black tracking-widest text-[#F7F2F3] uppercase">
                BEST-IN-CLASS VISUAL FIDELITY
              </h3>
              <p className="font-mono text-xs text-[#B8AEB1] tracking-wide max-w-sm mx-auto leading-relaxed font-light">
                Full gameplay reveal trailer and official release date arriving soon.
              </p>
            </div>

            {/* Audio frequency bars */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-6 opacity-60">
              {[30, 60, 75, 40, 90, 25, 65, 80, 95, 55, 35, 70, 45, 85, 30, 50].map(
                (h, idx) => (
                  <div
                    key={idx}
                    className="w-1 bg-[#FF3348] transition-all duration-150"
                    style={{
                      height: isPlaying ? `${(h * (0.4 + (idx % 3) * 0.2)).toFixed(0)}%` : "15%",
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="p-3 sm:p-4 bg-[#151115] border-t border-[#FF3348]/20 flex flex-col gap-2.5">
          {/* Progress bar */}
          <div className="relative w-full h-1 bg-black cursor-pointer group">
            <div
              className="h-full bg-[#FF3348] relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#F7F2F3] border border-[#A60019]" />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-xs font-mono text-[#B8AEB1]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-[#17090D] border border-[#FF3348]/40 text-[#F7F2F3] hover:border-[#FF3348] transition-colors"
              >
                {isPlaying ? <Pause className="w-3 h-3 text-[#FF3348]" /> : <Play className="w-3 h-3 text-[#FF3348]" />}
                <span className="text-[11px]">{isPlaying ? "PAUSE" : "PLAY"}</span>
              </button>

              <button
                onClick={() => setProgress(0)}
                className="hover:text-[#F7F2F3] transition-colors p-1"
                title="Restart"
              >
                <RotateCcw className="w-3 h-3" />
              </button>

              <span className="hidden sm:inline font-mono text-[10px] text-[#FF3348] tracking-widest">
                TIMECODE: {timecode}
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-2.5 py-1 border border-white/10 hover:border-[#FF3348] text-[#F7F2F3] text-[11px] transition-colors"
            >
              CLOSE [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
