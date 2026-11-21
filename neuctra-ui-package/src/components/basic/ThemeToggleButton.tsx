"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../../lib/cn";
import { useOptionalTheme } from "./ThemeProvider";

/**
 * Theme state accepted by `ThemeToggleButton`. Both shapes work:
 * `{ isDark, toggleTheme }` (older generated ThemeContext files) and the value
 * of `useTheme()` from `@neuctra/ui` (`{ resolvedMode, toggle }`, which also
 * carries `isDark` / `toggleTheme`).
 */
export type ThemeToggleContext =
  | { isDark: boolean; toggleTheme: () => void }
  | { resolvedMode: "light" | "dark"; toggle: () => void };

export type ThemeToggleProps = {
  /**
   * Theme state and toggle callback. Optional: when omitted, the button reads
   * the nearest `<ThemeProvider>` from `@neuctra/ui`.
   */
  context?: ThemeToggleContext;
  /** Additional classes for the root toggle button. */
  className?: string;
  /** The sun icon (shown in dark mode). */
  sunClassName?: string;
  /** The moon icon (shown in light mode). */
  moonClassName?: string;
  /** Accessible label override; defaults to "Switch to light/dark mode". */
  "aria-label"?: string;
};

function normalize(context: ThemeToggleContext): { isDark: boolean; toggle: () => void } {
  if ("isDark" in context && typeof context.toggleTheme === "function") {
    return { isDark: context.isDark, toggle: context.toggleTheme };
  }
  if ("resolvedMode" in context && typeof context.toggle === "function") {
    return { isDark: context.resolvedMode === "dark", toggle: context.toggle };
  }
  throw new Error(
    "ThemeToggleButton: `context` must provide { isDark, toggleTheme } or { resolvedMode, toggle }.",
  );
}

export const ThemeToggleButton: React.FC<ThemeToggleProps> = ({
  context,
  className = "",
  sunClassName,
  moonClassName,
  "aria-label": ariaLabel,
}) => {
  const provided = useOptionalTheme();
  const source = context ?? provided;
  if (!source) {
    throw new Error(
      "ThemeToggleButton needs a theme: render it inside <ThemeProvider> from @neuctra/ui, or pass `context`.",
    );
  }
  const { isDark, toggle } = normalize(source);

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={ariaLabel ?? (isDark ? "Switch to light mode" : "Switch to dark mode")}
      aria-pressed={isDark}
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
          sunClassName,
        )}
      />
      <Moon
        size={18}
        aria-hidden="true"
        className={cn(
          "absolute text-info transition-all duration-300",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
          moonClassName,
        )}
      />
    </button>
  );
};

export default ThemeToggleButton;
