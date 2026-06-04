"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";

interface StatTileProps {
  label: string;
  value: string;
  trend: string;
  color: "cyan" | "violet" | "emerald" | "amber" | "rose";
}

const COLOR_MAP = {
  cyan: { text: "text-accent-cyan", bg: "bg-accent-cyan/10", border: "border-accent-cyan/20" },
  violet: { text: "text-accent-violet", bg: "bg-accent-violet/10", border: "border-accent-violet/20" },
  emerald: { text: "text-accent-emerald", bg: "bg-accent-emerald/10", border: "border-accent-emerald/20" },
  amber: { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  rose: { text: "text-accent-rose", bg: "bg-accent-rose/10", border: "border-accent-rose/20" },
};

export function StatTile({ label, value, trend, color }: StatTileProps) {
  const colors = COLOR_MAP[color];

  return (
    <BentoCard glowColor={color}>
      <div className="p-5 h-full flex flex-col justify-between min-h-[120px]">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">{label}</p>
        <div>
          <motion.p
            className={`font-display text-3xl font-bold ${colors.text}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          >
            {value}
          </motion.p>
          <div className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs ${colors.bg} border ${colors.border} ${colors.text}`}>
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
