"use client";

import React from "react";

export default function TelemetryBar() {
  const metrics = [
    {
      value: "100%",
      label: "INDEPENDENT OWNERSHIP",
      sub: "ZERO EXTERNAL PUBLISHER CONTROL",
    },
    {
      value: "4K / 60",
      label: "TARGET HARDWARE FIDELITY",
      sub: "NATIVE CONSOLE & PC OPTIMIZATION",
    },
    {
      value: "03",
      label: "GLOBAL PRODUCTION NODES",
      sub: "MONTRÉAL // BERLIN // TOKYO",
    },
    {
      value: "0.0",
      label: "MONETIZATION COMPROMISES",
      sub: "NO LIVE-OPS // NO MICROTRANSACTIONS",
    },
  ];

  return (
    <div className="relative border-b border-[#FF3348]/15 bg-[#151115] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-1.5 border-l border-[#FF3348]/20 pl-6"
            >
              <div className="font-mono text-3xl sm:text-4xl font-black text-[#F7F2F3] tracking-tight">
                {m.value}
              </div>
              <div className="font-mono text-xs font-bold text-[#FF3348] tracking-widest uppercase">
                {m.label}
              </div>
              <div className="font-mono text-[10px] text-[#B8AEB1]/70 tracking-wider uppercase">
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
