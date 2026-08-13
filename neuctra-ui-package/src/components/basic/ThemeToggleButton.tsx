"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../../lib/cn";

export type ThemeToggleContext = {
  isDark: boolean;
  toggleTheme: () => void;
};

export type ThemeToggleProps = {
  context: ThemeToggleContext;
  className?: string;
};

export const ThemeToggleButton: React.FC<ThemeToggleProps> = ({
  context,
  className = "",
}) => {
  const { isDark, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      className={cn(
        // Fully token-driven, so the toggle matches any user-defined theme in
        // both modes (it previously hardcoded zinc/yellow/white).
        "relative flex h-6 w-12 items-center rounded-full border p-0.5 transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDark ? "border-border bg-input" : "border-border bg-muted",
        className,
      )}
    >
      {/* Track icons sit on the side OPPOSITE the thumb, so they are actually
          visible. Sun/Moon are pictorial: warning (amber) and info (blue)
          tokens keep them recognizable while still theme-controlled. */}
      <Sun
        size={10}
        aria-hidden="true"
        className={cn(
          "absolute left-1.5 transition-all duration-300",
          isDark ? "opacity-100 scale-100 text-warning" : "opacity-0 scale-0",
        )}
      />
      <Moon
        size={10}
        aria-hidden="true"
        className={cn(
          "absolute right-1.5 transition-all duration-300",
          isDark ? "opacity-0 scale-0" : "opacity-100 scale-100 text-muted-foreground",
        )}
      />

      {/* Thumb */}
      <span
        aria-hidden="true"
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full shadow-md",
          "transform transition-all duration-300",
          "bg-background border border-border",
          isDark ? "translate-x-6" : "translate-x-0",
        )}
      >
        {isDark ? (
          <Moon size={9} className="text-info" />
        ) : (
          <Sun size={9} className="text-warning" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggleButton;
