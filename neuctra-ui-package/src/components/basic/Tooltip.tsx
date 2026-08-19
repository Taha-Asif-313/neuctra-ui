"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface TooltipProps {
  /** Tooltip text/content. */
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  /** Delay before showing, in ms. */
  delay?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  /** The small triangular pointer on the tooltip bubble. */
  arrowClassName?: string;
}

const POSITIONS = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
} as const;

const ARROWS = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-foreground border-x-transparent border-b-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-foreground border-x-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-l-foreground border-y-transparent border-r-transparent",
  right: "right-full top-1/2 -translate-y-1/2 border-r-foreground border-y-transparent border-l-transparent",
} as const;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  delay = 150,
  disabled = false,
  className,
  contentClassName,
  arrowClassName,
}) => {
  const tooltipId = useId();
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (disabled) return;
    timer.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  };

  // Clear the pending show-timer on unmount, and let Escape dismiss an open
  // tooltip (a WCAG 1.4.13 requirement).
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}

      {visible && !disabled && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 w-max max-w-60 rounded-md px-2.5 py-1.5",
            // break-words: a long unbroken token (URL, hash) wraps instead of
            // stretching the bubble past max-w.
            "bg-foreground text-background text-xs font-medium shadow-lg wrap-break-word",
            "animate-in fade-in",
            POSITIONS[position] ?? POSITIONS.top,
            contentClassName,
          )}
        >
          {content}
          <span
            aria-hidden="true"
            className={cn(
              "absolute border-4",
              ARROWS[position] ?? ARROWS.top,
              arrowClassName,
            )}
          />
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = "Tooltip";
