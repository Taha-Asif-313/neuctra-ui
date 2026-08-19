"use client";

import React, {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/cn";

export interface PopoverProps {
  /** Element that toggles the popover. */
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  disabled?: boolean;
  className?: string;
  /** The wrapper around `trigger` that handles open/close interactions. */
  triggerClassName?: string;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

const POSITIONS = {
  top: { start: "bottom-full left-0 mb-2", center: "bottom-full left-1/2 -translate-x-1/2 mb-2", end: "bottom-full right-0 mb-2" },
  bottom: { start: "top-full left-0 mt-2", center: "top-full left-1/2 -translate-x-1/2 mt-2", end: "top-full right-0 mt-2" },
  left: { start: "right-full top-0 mr-2", center: "right-full top-1/2 -translate-y-1/2 mr-2", end: "right-full bottom-0 mr-2" },
  right: { start: "left-full top-0 ml-2", center: "left-full top-1/2 -translate-y-1/2 ml-2", end: "left-full bottom-0 ml-2" },
} as const;

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(
    {
      trigger,
      children,
      position = "bottom",
      align = "center",
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      closeOnClickOutside = true,
      closeOnEscape = true,
      disabled = false,
      className,
      triggerClassName,
      contentClassName,
      contentStyle,
    },
    ref,
  ) {
    const panelId = useId();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [internalOpen, setInternalOpen] = useState(defaultOpen);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    // Ref-routed setter so document listeners never hold a stale onOpenChange.
    const setOpenRef = useRef((next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    });
    setOpenRef.current = (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    useEffect(() => {
      if (!open) return;

      const onMouseDown = (e: MouseEvent) => {
        if (!closeOnClickOutside) return;
        if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
          setOpenRef.current(false);
        }
      };
      const onKeyDown = (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === "Escape") setOpenRef.current(false);
      };

      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [open, closeOnClickOutside, closeOnEscape]);

    return (
      <div
        ref={(el) => {
          rootRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        className={cn("relative inline-flex", className)}
      >
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={() => !disabled && setOpenRef.current(!open)}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpenRef.current(!open);
            }
          }}
          className={cn(
            "inline-flex rounded-lg",
            disabled && "cursor-not-allowed opacity-50",
            triggerClassName,
          )}
        >
          {trigger}
        </div>

        {open && (
          <div
            id={panelId}
            role="dialog"
            className={cn(
              "absolute z-50 min-w-48 rounded-xl border border-border bg-popover p-4",
              "text-sm text-popover-foreground shadow-xl",
              "animate-in fade-in",
              POSITIONS[position]?.[align] ?? POSITIONS.bottom.center,
              contentClassName,
            )}
            style={contentStyle}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);

Popover.displayName = "Popover";
