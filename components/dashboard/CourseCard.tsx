"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, Network, FileCode, Layers, BookOpen, Database, Globe, Terminal, Cpu, Workflow
} from "lucide-react";
import type { Course } from "@/types";
import { BentoCard } from "@/components/ui/BentoCard";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Network, FileCode, Layers, BookOpen, Database, Globe, Terminal, Cpu, Workflow,
};

const GRADIENT_MAP = [
  "from-cyan-500/10 via-transparent to-transparent",
  "from-violet-500/10 via-transparent to-transparent",
  "from-emerald-500/10 via-transparent to-transparent",
  "from-rose-500/10 via-transparent to-transparent",
];

const PROGRESS_COLORS = [
  { bar: "from-accent-cyan to-cyan-300", glow: "rgba(0,212,255,0.4)" },
  { bar: "from-accent-violet to-purple-300", glow: "rgba(139,92,246,0.4)" },
  { bar: "from-emerald-400 to-green-300", glow: "rgba(16,185,129,0.4)" },
  { bar: "from-rose-400 to-pink-300", glow: "rgba(244,63,94,0.4)" },
];

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const Icon = ICON_MAP[course.icon_name] ?? BookOpen;
  const colorIdx = index % 4;
  const gradient = GRADIENT_MAP[colorIdx];
  const progressColor = PROGRESS_COLORS[colorIdx];

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedProgress(course.progress);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, course.progress]);

  return (
    <BentoCard
      className="group relative min-h-[176px] overflow-hidden"
      glowColor={["cyan", "violet", "emerald", "rose"][colorIdx] as any}
    >
      {/* Gradient mesh background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`} />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <article ref={ref} className="relative z-10 p-5 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${progressColor.glow.replace("0.4", "0.15")}`, border: `1px solid ${progressColor.glow.replace("0.4", "0.25")}` }}
            >
              <Icon className="w-5 h-5" style={{ color: progressColor.glow.replace("rgba(", "rgb(").replace(", 0.4)", ")") }} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-mono text-slate-500 tabular-nums">
              {course.progress}%
            </span>
          </div>

          <h3 className="font-display font-semibold text-sm text-white leading-snug line-clamp-2">
            {course.title}
          </h3>
        </div>

        {/* Animated progress bar */}
        <div className="mt-4 space-y-1.5">
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${progressColor.bar}`}
              initial={{ width: 0 }}
              animate={{ width: isInView ? `${course.progress}%` : "0%" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                boxShadow: isInView ? `0 0 8px ${progressColor.glow}` : "none",
              }}
            />
          </div>
          <p className="text-[11px] text-slate-500">
            {course.progress < 50 ? "In progress" : course.progress < 90 ? "Almost there!" : "Nearly complete!"}
          </p>
        </div>
      </article>
    </BentoCard>
  );
}
