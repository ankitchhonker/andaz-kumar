"use client";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart3, Trophy, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { id: "analytics", label: "Stats", icon: BarChart3, href: "/dashboard/analytics" },
  { id: "achievements", label: "Awards", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="bg-bg-elevated/95 backdrop-blur-xl border-t border-bg-border px-2 py-2 safe-area-pb"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around list-none" role="list">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.id}>
              <Link
                href={item.href as Route}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-accent-cyan rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-accent-cyan" : "text-slate-400"
                  )}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-accent-cyan" : "text-slate-500"
                )}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
