"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import { HeroTile } from "./HeroTile";
import { StreakTile } from "./StreakTile";
import { CourseCard } from "./CourseCard";
import { ActivityTile } from "./ActivityTile";
import { StatTile } from "./StatTile";

interface BentoGridProps {
  courses: Course[];
}

// Stagger container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export function BentoGrid({ courses }: BentoGridProps) {
  const totalProgress = courses.length > 0
    ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)
    : 0;

  return (
    <section className="p-5 lg:p-8 min-h-screen">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero tile — spans 2 cols on large screens */}
        <motion.div
          variants={tileVariants}
          className="col-span-1 md:col-span-2 lg:col-span-2"
        >
          <HeroTile />
        </motion.div>

        {/* Streak tile */}
        <motion.div variants={tileVariants}>
          <StreakTile streak={14} />
        </motion.div>

        {/* Stat tiles */}
        <motion.div variants={tileVariants}>
          <StatTile label="Avg Progress" value={`${totalProgress}%`} trend="+8%" color="cyan" />
        </motion.div>
        <motion.div variants={tileVariants}>
          <StatTile label="Active Courses" value={String(courses.length)} trend="2 new" color="violet" />
        </motion.div>
        <motion.div variants={tileVariants}>
          <StatTile label="Hours This Week" value="12.4h" trend="+3.2h" color="emerald" />
        </motion.div>

        {/* Course tiles */}
        {courses.map((course) => (
          <motion.div key={course.id} variants={tileVariants}>
            <CourseCard course={course} />
          </motion.div>
        ))}

        {/* Activity tile — spans full width */}
        <motion.div
          variants={tileVariants}
          className="col-span-1 md:col-span-2 lg:col-span-3"
        >
          <ActivityTile />
        </motion.div>
      </motion.div>
    </section>
  );
}
