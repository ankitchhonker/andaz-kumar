"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlowColor = "cyan" | "violet" | "emerald" | "amber" | "rose";

const GLOW_STYLES: Record<GlowColor, string> = {
  cyan: "rgba(0,212,255,0.12)",
  violet: "rgba(139,92,246,0.12)",
  emerald: "rgba(16,185,129,0.12)",
  amber: "rgba(245,158,11,0.12)",
  rose: "rgba(244,63,94,0.12)",
};

const BORDER_HOVER: Record<GlowColor, string> = {
  cyan: "rgba(0,212,255,0.35)",
  violet: "rgba(139,92,246,0.35)",
  emerald: "rgba(16,185,129,0.35)",
  amber: "rgba(245,158,11,0.35)",
  rose: "rgba(244,63,94,0.35)",
};

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: GlowColor;
}

export function BentoCard({ children, className, glowColor = "cyan" }: BentoCardProps) {
  return (
    <motion.article
      className={cn(
        "relative rounded-2xl bg-bg-card border border-bg-border overflow-hidden cursor-default",
        className
      )}
      whileHover={{
        scale: 1.015,
        borderColor: BORDER_HOVER[glowColor],
        boxShadow: `0 0 30px ${GLOW_STYLES[glowColor]}, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{
        // Ensure hardware acceleration — avoid layout shifts
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      {children}
    </motion.article>
  );
}
