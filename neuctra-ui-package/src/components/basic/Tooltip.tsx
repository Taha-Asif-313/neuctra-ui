"use client";

import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

// Gap between the trigger and the bubble, and the minimum distance the
// bubble is kept from the viewport edge (see the positioning effect below).
const GAP = 8;
const VIEWPORT_MARGIN = 8;

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
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const bubbleRef = useRef<HTMLSpanElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );

  const show = () => {
    if (disabled) return;
    timer.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
    setCoords(null);
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

  // Position the bubble with measured, viewport-clamped fixed coordinates
  // instead of a CSS-only absolute offset. A trigger near the edge of a
  // narrow/max-width container would otherwise let the centered bubble
  // extend past the viewport edge; nothing clips that overflow, so it grew
  // the page's scrollWidth and produced a spurious horizontal scrollbar.
  // Clamping here makes that overflow structurally impossible.
  useLayoutEffect(() => {
    if (!visible) return;
    const trigger = wrapperRef.current;
    const bubble = bubbleRef.current;
    if (!trigger || !bubble) return;

    const triggerRect = trigger.getBoundingClientRect();
    const bubbleRect = bubble.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top = 0;
    let left = 0;

    switch (position) {
      case "bottom":
        top = triggerRect.bottom + GAP;
        left = triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
        break;
      case "left":
        top = triggerRect.top + triggerRect.height / 2 - bubbleRect.height / 2;
        left = triggerRect.left - bubbleRect.width - GAP;
        break;
      case "right":
        top = triggerRect.top + triggerRect.height / 2 - bubbleRect.height / 2;
        left = triggerRect.right + GAP;
        break;
      case "top":
      default:
        top = triggerRect.top - bubbleRect.height - GAP;
        left = triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
        break;
    }

    left = Math.min(
      Math.max(left, VIEWPORT_MARGIN),
      vw - bubbleRect.width - VIEWPORT_MARGIN,
    );
    top = Math.min(
      Math.max(top, VIEWPORT_MARGIN),
      vh - bubbleRect.height - VIEWPORT_MARGIN,
    );

    setCoords({ top, left });
  }, [visible, position, content]);

  return (
    <span
      ref={wrapperRef}
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
          ref={bubbleRef}
          id={tooltipId}
          role="tooltip"
          className={cn(
            "pointer-events-none fixed z-50 w-max max-w-60 rounded-md px-2.5 py-1.5",
            // break-words: a long unbroken token (URL, hash) wraps instead of
            // stretching the bubble past max-w.
            "bg-foreground text-background text-xs font-medium shadow-lg wrap-break-word",
            "animate-in fade-in",
            !coords && "invisible",
            contentClassName,
          )}
          style={coords ? { top: coords.top, left: coords.left } : undefined}
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
