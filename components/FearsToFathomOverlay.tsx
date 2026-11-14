"use client";

import React, { useEffect, useRef, useState } from "react";

interface FearsToFathomOverlayProps {
  children?: React.ReactNode;
}

export default function FearsToFathomOverlay({ children }: FearsToFathomOverlayProps) {
  const grainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [vcrTime, setVcrTime] = useState("11:48:22 PM");

  // VCR Clock ticker
  useEffect(() => {
    let seconds = 22;
    let minutes = 48;
    const interval = setInterval(() => {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
      setVcrTime(`11:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} PM`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Highly optimized procedural film grain noise loop (Precomputed buffers for 0% CPU footprint)
  useEffect(() => {
    const canvas = grainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    // Small resolution for retro grain + maximum performance
    const w = (canvas.width = 256);
    const h = (canvas.height = 192);

    // Precompute 8 noise frames once on mount to eliminate real-time Math.random() overhead
    const FRAME_COUNT = 8;
    const precomputedFrames: ImageData[] = [];

    for (let f = 0; f < FRAME_COUNT; f++) {
      const imgData = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(imgData.data.buffer);
      const len = buffer32.length;
      for (let i = 0; i < len; i++) {
        const val = (Math.random() * 255) | 0;
        const alpha = (Math.random() * 40 + 16) | 0; // Gritty atmospheric grain
        buffer32[i] = (alpha << 24) | (val << 16) | (val << 8) | val;
      }
      precomputedFrames.push(imgData);
    }

    let animId: number;
    let lastTime = 0;
    let frameIdx = 0;

    const render = (time: number) => {
      // Don't render when tab is in background
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Cycle at authentic 24fps film cadence (~41.6ms interval)
      if (time - lastTime > 41) {
        lastTime = time;
        ctx.putImageData(precomputedFrames[frameIdx], 0, 0);
        frameIdx = (frameIdx + 1) % FRAME_COUNT;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#141416] text-[#F7F2F3] overflow-x-hidden select-none">
      
      {/* 1. DYNAMIC FILM GRAIN LAYER (FEARS TO FATHOM NOISE - GPU COMPOSITED) */}
      <canvas
        ref={grainCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-40 mix-blend-screen opacity-70 transform-gpu translate-z-0"
        style={{ imageRendering: "pixelated" }}
      />

      {/* 2. SECONDARY FINE GRAIN & COLOR NOISE OVERLAY */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-40 mix-blend-overlay transform-gpu translate-z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: "3px 3px",
        }}
      />

      {/* 3. RETRO VHS INTERLACED SCANLINES */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-35 transform-gpu translate-z-0"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0px, rgba(0, 0, 0, 0.45) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* 4. ANALOG CURVED VIGNETTE & LENS WARPING SHADOW */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 transform-gpu translate-z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 55%, rgba(10, 10, 12, 0.75) 85%, rgba(5, 5, 6, 0.96) 100%)",
        }}
      />

      {/* 5. FAINT HORIZONTAL VHS TRACKING JITTER LINE */}
      <div className="fixed inset-x-0 h-[2px] bg-white/[0.08] pointer-events-none z-40 vhs-tracking-bar transform-gpu translate-z-0" />

      {/* 6. VCR ON-SCREEN DISPLAY (FEARS TO FATHOM OSD) */}
      <div className="fixed inset-0 pointer-events-none z-30 p-4 sm:p-8 flex flex-col justify-between font-mono text-xs sm:text-sm text-white/80 select-none transform-gpu translate-z-0">
        
        {/* Top VCR status */}
        <div className="flex items-center justify-between tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#FF3348]">PLAY ▶</span>
            <span className="text-[11px] sm:text-xs text-white/70">SP</span>
          </div>
          <div className="text-[11px] sm:text-xs text-white/70 tracking-wider">
            {vcrTime}
          </div>
        </div>

        {/* Bottom VCR tape status */}
        <div className="flex items-end justify-between tracking-widest text-[10px] sm:text-xs text-white/60 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
          <div>
            {"OCT. 24 1998"}
          </div>
          <div className="text-[#FF3348] font-bold">
            {"RED MOROS"}
          </div>
        </div>

      </div>

      {/* 7. MAIN CONTENT WITH HARDWARE ACCELERATION */}
      <div className="relative z-10 filter contrast-[106%] brightness-[97%]">
        {children}
      </div>

    </div>
  );
}
