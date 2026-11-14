"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const toggleAudio = () => {
    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(
          0.0001,
          audioCtxRef.current.currentTime,
          0.5
        );
        setTimeout(() => {
          try {
            oscRef.current?.stop();
            osc2Ref.current?.stop();
            noiseNodeRef.current?.stop();
            audioCtxRef.current?.close();
          } catch {}
          audioCtxRef.current = null;
          setIsPlaying(false);
        }, 500);
      } else {
        setIsPlaying(false);
      }
    } else {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.5);
        gainNodeRef.current = masterGain;

        // Lowpass filter for deep cinematic dark ambient drone
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(120, ctx.currentTime);
        filter.Q.setValueAtTime(3, ctx.currentTime);

        // Sub oscillator (55Hz - A1 note)
        const osc1 = ctx.createOscillator();
        osc1.type = "sawtooth";
        osc1.frequency.setValueAtTime(55, ctx.currentTime);
        oscRef.current = osc1;

        // Detuned sub oscillator (55.4Hz) for slow analog beating
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(55.6, ctx.currentTime);
        osc2Ref.current = osc2;

        // Connect oscillators
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        setIsPlaying(true);
      } catch (err) {
        console.warn("Web Audio not permitted or supported:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      try {
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
      } catch {}
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 text-xs font-mono tracking-wider border border-[#FF3348]/20 bg-[#151115]/80 hover:border-[#FF3348]/60 hover:bg-[#17090D] transition-all duration-200 cursor-pointer text-[#B8AEB1] hover:text-[#F7F2F3] shrink-0"
      title={isPlaying ? "Mute Atmospheric Drone" : "Initialize Atmospheric Audio Drone"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#FF3348] animate-pulse" />
          <span className="hidden sm:inline text-[11px] text-[#FF3348] font-bold">ATMOSPHERE: ACTIVE</span>
          <div className="flex items-end gap-0.5 h-2.5">
            <span className="w-0.5 bg-[#FF3348] h-full animate-[ping_1.2s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="w-0.5 bg-[#FF3348] h-2/3 animate-[pulse_1.5s_ease-in-out_infinite]" />
            <span className="w-0.5 bg-[#FF3348] h-4/5 animate-[pulse_0.9s_ease-in-out_infinite]" />
          </div>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#B8AEB1] group-hover:text-[#FF3348] transition-colors" />
          <span className="hidden sm:inline text-[11px]">AUDIO AMBIENCE // OFF</span>
          <span className="inline sm:hidden text-[10px]">SFX</span>
        </>
      )}
    </button>
  );
}
