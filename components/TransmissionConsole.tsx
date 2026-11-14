"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Bell } from "lucide-react";

export default function TransmissionConsole() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="notify"
      className="relative py-14 sm:py-24 border-b border-[#FF0000]/20 bg-[#09090C]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Box Container */}
        <div className="bg-[#151115] border border-[#FF0000]/40 shadow-[0_0_50px_rgba(255,0,0,0.15)] relative p-5 sm:p-12">
          {/* Corner Highlights */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF0000]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF0000]" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF0000]" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF0000]" />

          <div className="space-y-6 text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17090D] border border-[#FF0000]/50 text-[#FF0000] font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              <Bell className="w-3.5 h-3.5" />
              <span>STAY INFORMED // COMING SOON</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-4xl font-mono font-black text-white uppercase tracking-tight">
                BE THE FIRST TO WITNESS THE REVEAL
              </h3>
              <p className="font-mono text-xs sm:text-sm text-[#B8AEB1] max-w-lg mx-auto leading-relaxed font-light">
                Enter your email to receive the official gameplay trailer, platform release dates, and exclusive teaser drops directly to your inbox.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-[#09090C] border border-[#FF0000]/50 space-y-2 font-mono text-xs">
                <CheckCircle2 className="w-8 h-8 text-[#FF0000] mx-auto animate-bounce" />
                <div className="text-base text-white font-bold uppercase tracking-wide">
                  YOU ARE ON THE LIST
                </div>
                <p className="text-[#B8AEB1] text-xs max-w-sm mx-auto font-light">
                  Thank you. We will reach out to <span className="text-white font-semibold">{email}</span> as soon as the official announcement drops.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto pt-2">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-[#09090C] border border-white/20 px-4 py-3.5 text-xs font-mono text-[#F7F2F3] focus:border-[#FF0000] focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3.5 bg-[#FF0000] text-[#09090C] font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                  >
                    <span>{loading ? "SAVING..." : "NOTIFY ME"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[10px] font-mono text-[#B8AEB1]/60 tracking-wider">
                  NO SPAM. ONLY OFFICIAL REVEALS AND ANNOUNCEMENTS.
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
