"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { getGreeting } from "@/lib/utils";
import { BentoCard } from "@/components/ui/BentoCard";

export function HeroTile() {
  const greeting = getGreeting();

  return (
    <BentoCard className="relative min-h-[200px] overflow-hidden group" glowColor="cyan">
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.2) 0%, transparent 60%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full p-6 lg:p-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs font-mono text-accent-cyan uppercase tracking-widest">
              Learning Dashboard
            </span>
          </div>

          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight">
            {greeting},{" "}
            <span
              className="bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent"
            >
              Alex
            </span>
          </h1>

          <p className="mt-2 text-slate-400 text-sm max-w-md">
            You&apos;re on a roll — 3 lessons completed this week. Keep the momentum going.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button className="group/btn flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/20 transition-colors duration-150">
            Continue Learning
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-150" />
          </button>
          <button className="px-4 py-2 rounded-xl text-slate-400 text-sm font-medium hover:text-white transition-colors duration-150">
            View Schedule
          </button>
        </div>
      </div>
    </BentoCard>
  );
}
