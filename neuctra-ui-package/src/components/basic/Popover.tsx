"use client";

import React, {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
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

// Gap between the trigger and the panel, and the minimum distance the panel
// is kept from the viewport edge (see the positioning effect below).
const GAP = 8;
const VIEWPORT_MARGIN = 8;

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
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [coords, setCoords] = useState<{ top: number; left: number } | null>(
      null,
    );

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

    // Position the panel with measured, viewport-clamped fixed coordinates
    // instead of a CSS-only absolute offset (see Tooltip.tsx for the same
    // technique). A trigger near the edge of a narrow/max-width container
    // would otherwise let the panel extend past the viewport edge; nothing
    // clips that overflow, so it grew the page's scrollWidth and produced a
    // spurious horizontal scrollbar. Clamping here makes that structurally
    // impossible.
    useLayoutEffect(() => {
      if (!open) {
        setCoords(null);
        return;
      }
      const trigger = triggerRef.current;
      const panel = panelRef.current;
      if (!trigger || !panel) return;

      const triggerRect = trigger.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = triggerRect.top - panelRect.height - GAP;
          left =
            align === "start"
              ? triggerRect.left
              : align === "end"
                ? triggerRect.right - panelRect.width
                : triggerRect.left + triggerRect.width / 2 - panelRect.width / 2;
          break;
        case "left":
          left = triggerRect.left - panelRect.width - GAP;
          top =
            align === "start"
              ? triggerRect.top
              : align === "end"
                ? triggerRect.bottom - panelRect.height
                : triggerRect.top + triggerRect.height / 2 - panelRect.height / 2;
          break;
        case "right":
          left = triggerRect.right + GAP;
          top =
            align === "start"
              ? triggerRect.top
              : align === "end"
                ? triggerRect.bottom - panelRect.height
                : triggerRect.top + triggerRect.height / 2 - panelRect.height / 2;
          break;
        case "bottom":
        default:
          top = triggerRect.bottom + GAP;
          left =
            align === "start"
              ? triggerRect.left
              : align === "end"
                ? triggerRect.right - panelRect.width
                : triggerRect.left + triggerRect.width / 2 - panelRect.width / 2;
          break;
      }

      left = Math.min(
        Math.max(left, VIEWPORT_MARGIN),
        vw - panelRect.width - VIEWPORT_MARGIN,
      );
      top = Math.min(
        Math.max(top, VIEWPORT_MARGIN),
        vh - panelRect.height - VIEWPORT_MARGIN,
      );

      setCoords({ top, left });
    }, [open, position, align, children]);

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
          ref={triggerRef}
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
            ref={panelRef}
            id={panelId}
            role="dialog"
            className={cn(
              "fixed z-50 min-w-48 rounded-xl border border-border bg-popover p-4",
              "text-sm text-popover-foreground shadow-xl",
              "animate-in fade-in",
              !coords && "invisible",
              contentClassName,
            )}
            style={{ ...(coords ? { top: coords.top, left: coords.left } : {}), ...contentStyle }}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);

Popover.displayName = "Popover";
