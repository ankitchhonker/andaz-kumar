"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";

interface StreakTileProps {
  streak: number;
}

export function StreakTile({ streak }: StreakTileProps) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const completedDays = [true, true, true, true, true, false, false]; // Mon-Fri done

  return (
    <BentoCard className="min-h-[200px]" glowColor="amber">
      <div className="p-6 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">
              Daily Streak
            </p>
            <div className="flex items-baseline gap-2">
              <motion.span
                className="font-display text-5xl font-bold text-white"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
              >
                {streak}
              </motion.span>
              <span className="text-slate-400 text-sm">days</span>
            </div>
          </div>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"
          >
            <Flame className="w-6 h-6 text-amber-400" />
          </motion.div>
        </div>

        {/* Weekly calendar dots */}
        <div className="space-y-2">
          <p className="text-xs text-slate-500">This week</p>
          <div className="flex gap-2">
            {days.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                    completedDays[i]
                      ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                      : "bg-bg-card border border-bg-border text-slate-600"
                  }`}
                >
                  {completedDays[i] ? "✓" : ""}
                </motion.div>
                <span className="text-[10px] text-slate-600">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
