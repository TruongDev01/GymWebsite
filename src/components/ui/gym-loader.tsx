"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GymLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function GymLoader({ className, size = "md" }: GymLoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-[3px]",
    lg: "w-20 h-20 border-4",
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer spinning square */}
      <div className={cn(
        "absolute rounded-none border-[var(--color-primary)] border-t-transparent animate-[spin_1.5s_linear_infinite]",
        sizeClasses[size]
      )} />
      {/* Inner counter-spinning square */}
      <div className={cn(
        "absolute rounded-none border-[var(--color-primary)]/50 border-b-transparent animate-[spin_2s_linear_infinite_reverse]",
        sizeClasses[size],
        "scale-75"
      )} />
      {/* Center core */}
      <div className={cn("bg-[var(--color-primary)] rounded-none animate-pulse",
        size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-3 h-3" : "w-5 h-5"
      )} />
    </div>
  );
}
