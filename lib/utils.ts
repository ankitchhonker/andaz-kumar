import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ActivityDay } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();

  for (let i = 119; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const rand = Math.random();
    const count = rand < 0.3 ? 0 : Math.floor(rand * 8);
    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;
    days.push({
      date: date.toISOString().split("T")[0],
      count,
      level: level as ActivityDay["level"],
    });
  }
  return days;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
