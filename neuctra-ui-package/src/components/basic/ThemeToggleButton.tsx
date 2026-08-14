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
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full",
        "text-foreground transition-colors duration-200 hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {/* Only one icon is ever visible: it rotates and scales in as the other
          rotates and scales out, instead of sliding a thumb along a track. */}
      <Sun
        size={18}
        aria-hidden="true"
        className={cn(
          "absolute text-warning transition-all duration-300",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
        )}
      />
      <Moon
        size={18}
        aria-hidden="true"
        className={cn(
          "absolute text-info transition-all duration-300",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
    </button>
  );
};

export default ThemeToggleButton;
