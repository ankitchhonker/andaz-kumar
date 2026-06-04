"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.nav
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative h-full bg-bg-elevated border-r border-bg-border flex flex-col overflow-hidden"
      aria-label="Main navigation"
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-bg-border flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="font-display font-700 text-lg text-white whitespace-nowrap tracking-tight"
            >
              LearnOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <ul className="flex-1 px-2 py-4 space-y-1 list-none" role="list">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 group",
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                )}
              >
                {/* Active background with layoutId for smooth transitions */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-accent-violet/10 rounded-xl border border-accent-cyan/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover background */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-150"
                  />
                )}

                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0 relative z-10",
                    isActive ? "text-accent-cyan" : ""
                  )}
                  strokeWidth={isActive ? 2 : 1.5}
                />

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10 text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Collapse toggle */}
      <div className="px-2 py-4 border-t border-bg-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs"
              >
                Collapse
              </motion.span>
            </>
          )}
        </button>
      </div>
    </motion.nav>
  );
}
