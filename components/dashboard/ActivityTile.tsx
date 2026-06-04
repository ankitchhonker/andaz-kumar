"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { generateActivityData } from "@/lib/utils";
import { BentoCard } from "@/components/ui/BentoCard";

const LEVEL_COLORS = [
  "bg-white/5",
  "bg-accent-cyan/20",
  "bg-accent-cyan/40",
  "bg-accent-cyan/70",
  "bg-accent-cyan",
];

export function ActivityTile() {
  const activityData = useMemo(() => generateActivityData(), []);

  const totalContributions = activityData.reduce((acc, d) => acc + d.count, 0);
  const activedays = activityData.filter((d) => d.count > 0).length;

  // Split into weeks (columns of 7)
  const weeks: typeof activityData[] = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  return (
    <BentoCard className="relative overflow-hidden" glowColor="cyan">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent-cyan" />
            <h2 className="font-display font-semibold text-white text-sm">
              Learning Activity
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>
              <span className="text-white font-medium">{totalContributions}</span> sessions
            </span>
            <span>
              <span className="text-white font-medium">{activedays}</span> active days
            </span>
          </div>
        </div>

        {/* Contribution graph */}
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((day, dIdx) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: wIdx * 0.015 + dIdx * 0.005,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    title={`${day.date}: ${day.count} sessions`}
                    className={`w-3 h-3 rounded-sm cursor-pointer hover:ring-1 hover:ring-accent-cyan/50 transition-all duration-100 ${LEVEL_COLORS[day.level]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-4 justify-end">
          <span className="text-[11px] text-slate-600">Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
          ))}
          <span className="text-[11px] text-slate-600">More</span>
        </div>
      </div>
    </BentoCard>
  );
}
