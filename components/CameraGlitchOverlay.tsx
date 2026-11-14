"use client";

import React, { useState, useEffect, useRef } from "react";
import { Zap, Volume2, VolumeX } from "lucide-react";

interface CameraGlitchOverlayProps {
  children?: React.ReactNode;
}

export default function CameraGlitchOverlay({ children }: CameraGlitchOverlayProps) {
  const [timecode, setTimecode] = useState("00:04:18:09");
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchActiveManual, setGlitchActiveManual] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);

  // Timecode clock running at ~24 fps
  useEffect(() => {
    let frame = 12;
    let sec = 18;
    let min = 4;

    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
        }
      }
      setTimecode(
        `00:${min.toString().padStart(2, "0")}:${sec
          .toString()
          .padStart(2, "0")}:${frame.toString().padStart(2, "0")}`
      );
    }, 41.6);

    return () => clearInterval(interval);
  }, []);

  // Periodic random camera glitch shudder
  useEffect(() => {
    const triggerRandomGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, 350);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        triggerRandomGlitch();
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Manual glitch trigger
  const handleManualGlitch = () => {
    setGlitchActiveManual(true);
    setTimeout(() => {
      setGlitchActiveManual(false);
    }, 600);
  };

  // Tape hiss / analog audio toggle
  const toggleAudio = () => {
    if (audioEnabled) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.3);
        setTimeout(() => {
          try {
            audioCtxRef.current?.close();
          } catch {}
          audioCtxRef.current = null;
          setAudioEnabled(false);
        }, 300);
      } else {
        setAudioEnabled(false);
      }
    } else {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Create pink noise for subtle tape hiss
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2) * 0.04;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        noiseNodeRef.current = whiteNoise;

        // Bandpass filter for old tape head response
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.Q.setValueAtTime(1.2, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.035, ctx.currentTime);
        gainNodeRef.current = gain;

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        whiteNoise.start();

        setAudioEnabled(true);
      } catch (err) {
        console.warn("Audio unavailable:", err);
      }
    }
  };

  const isDistorted = isGlitching || glitchActiveManual;

  return (
    <div className={`relative min-h-screen bg-[#1E1E1E] text-[#F7F2F3] overflow-x-hidden ${isDistorted ? "screen-glitch" : ""}`}>
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none scanlines-crt opacity-85" />

      {/* Camera Vignette Shadow Overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none camera-vignette opacity-90" />

      {/* Periodic VHS Tracking Bar Glitch */}
      <div className="fixed inset-x-0 h-12 bg-white/[0.04] backdrop-invert-[0.15] blur-[1px] pointer-events-none z-40 vhs-tracking-bar" />

      {/* Extreme Glitch Slice (When Triggered) */}
      {isDistorted && (
        <>
          <div className="fixed inset-0 z-50 pointer-events-none mix-blend-color-dodge bg-[#FF0000]/15 animate-pulse" />
          <div className="fixed top-1/3 inset-x-0 h-16 bg-white/[0.08] backdrop-invert pointer-events-none z-50 transform -skew-x-2" />
          <div className="fixed bottom-1/4 inset-x-0 h-8 bg-[#FF3348]/20 pointer-events-none z-50 transform skew-x-3" />
        </>
      )}

      {/* CAMERA HUD LAYER */}
      <div className="fixed inset-0 z-30 pointer-events-none p-3 sm:p-6 lg:p-10 flex flex-col justify-between font-mono select-none">
        {/* TOP HUD ROW */}
        <div className="flex items-start justify-between text-[11px] sm:text-xs tracking-widest">
          {/* Top Left: Blinking REC + Shutter */}
          <div className="flex flex-col gap-1 pointer-events-auto">
            <div className="flex items-center gap-2 font-black text-[#FF0000] text-sm sm:text-base">
              <span className="w-3 h-3 rounded-full bg-[#FF0000] rec-pulse" />
              <span className="tracking-widest">REC ●</span>
              <span className="text-[10px] sm:text-xs text-[#F7F2F3] font-normal tracking-wider ml-1">
                [4K 60FPS]
              </span>
            </div>
            <div className="text-[10px] text-[#B8AEB1]/80 pl-5">
              SHUTTER: 1/48s // F1.4
            </div>
          </div>

          {/* Top Center: Viewfinder Crosshair */}
          <div className="hidden md:flex flex-col items-center opacity-40">
            <span className="text-[10px] tracking-widest text-[#F7F2F3]">
              + CAM-01 [OPTICAL STABILIZER ACTIVE] +
            </span>
          </div>

          {/* Top Right: Battery + Tape + Controls */}
          <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className="p-1.5 bg-[#17090D]/80 border border-[#FF3348]/30 hover:border-[#FF3348] text-[#F7F2F3] text-[10px] transition-colors flex items-center gap-1.5 cursor-pointer"
              title={audioEnabled ? "Mute Tape Hiss" : "Enable Tape Hiss"}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#FF3348]" />
                  <span className="hidden sm:inline text-[#FF3348]">TAPE HISS: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#B8AEB1]" />
                  <span className="hidden sm:inline">AUDIO: OFF</span>
                </>
              )}
            </button>

            {/* Manual Glitch Trigger */}
            <button
              onClick={handleManualGlitch}
              className="px-2.5 py-1 bg-[#17090D]/80 border border-[#FF3348]/40 hover:border-[#FF3348] hover:bg-[#FF3348] hover:text-[#09090C] text-[10px] font-bold text-[#FF3348] transition-all flex items-center gap-1 cursor-pointer"
              title="Click to force camera glitch distortion"
            >
              <Zap className="w-3 h-3" />
              <span>GLITCH</span>
            </button>

            {/* Battery Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#F7F2F3]">
              <span>BAT [▮▮▮▯]</span>
            </div>
          </div>
        </div>

        {/* CENTER VIEW-FRAME RETICLES */}
        <div className="relative w-full flex-1 flex items-center justify-center pointer-events-none">
          {/* 4 Corner Camera Viewfinder Brackets */}
          <div className="absolute top-4 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FF3348]/60" />
          <div className="absolute top-4 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FF3348]/60" />
          <div className="absolute bottom-4 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FF3348]/60" />
          <div className="absolute bottom-4 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF3348]/60" />

          {/* Center Subtle Crosshair */}
          <div className="w-6 h-6 border border-white/10 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-[#FF3348]/60" />
          </div>
        </div>

        {/* BOTTOM HUD ROW */}
        <div className="flex items-end justify-between text-[10px] sm:text-xs tracking-widest text-[#B8AEB1]">
          {/* Bottom Left: Timecode */}
          <div className="flex flex-col gap-0.5">
            <div className="font-mono text-sm sm:text-base font-bold text-[#F7F2F3] tracking-widest flex items-center gap-2">
              <span className="text-[#FF3348]">TC</span>
              <span className={isDistorted ? "text-[#FF0000]" : ""}>{timecode}</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-[#B8AEB1]/60">
              ISO: 3200 // WB: 5600K RAW
            </div>
          </div>

          {/* Bottom Center: Sound Levels */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-[#B8AEB1]/60">
            <span>CH1 [▇▇▇▇▇  ]</span>
            <span>CH2 [▇▇▇▇    ]</span>
          </div>

          {/* Bottom Right: Playback Mode */}
          <div className="flex flex-col items-end gap-0.5">
            <div className="font-mono text-xs sm:text-sm font-bold text-[#F7F2F3] tracking-widest">
              PLAY ▶ <span className="text-[#FF3348]">SP</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-[#B8AEB1]/60">
              TAPE 01 // RED MOROS
            </div>
          </div>
        </div>
      </div>

      {/* Main Website Children Inside Camera Viewport */}
      <div className={`relative z-10 transition-transform duration-75 ${isDistorted ? "translate-x-0.5 -translate-y-0.5 filter blur-[0.4px]" : ""}`}>
        {children}
      </div>
    </div>
  );
}
