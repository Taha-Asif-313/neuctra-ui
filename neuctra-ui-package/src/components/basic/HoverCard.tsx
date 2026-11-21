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
import { useControllableState } from "../../lib/useControllableState";

export interface HoverCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  /** Element that reveals the panel on hover or focus. */
  trigger: React.ReactNode;
  /** Panel content; takes precedence over `children` when both are provided. */
  content?: React.ReactNode;
  /** Panel content used when `content` is omitted. */
  children?: React.ReactNode;
  /** Delay before opening, in milliseconds. */
  openDelay?: number;
  /** Delay before closing, in milliseconds. */
  closeDelay?: number;
  /** Preferred side of the trigger; top/bottom flip automatically when there is no room. */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment of the panel along that side. */
  align?: "start" | "center" | "end";
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state in uncontrolled mode. */
  defaultOpen?: boolean;
  /** Fired whenever the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Prevents the card from opening. */
  disabled?: boolean;
  /** Styles the wrapper around the trigger. */
  triggerClassName?: string;
  /** Styles the floating panel. */
  contentClassName?: string;
  /** Inline styles for the floating panel, merged with its computed position. */
  contentStyle?: React.CSSProperties;
}

const GAP = 8;
const VIEWPORT_MARGIN = 8;

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  function HoverCard(
    {
      trigger,
      content,
      children,
      openDelay = 300,
      closeDelay = 150,
      side = "bottom",
      align = "center",
      open,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      triggerClassName,
      contentClassName,
      contentStyle,
      className,
      style,
      onMouseEnter,
      onMouseLeave,
      onFocusCapture,
      onBlurCapture,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const panelId = useId();
    const [isOpen, setOpen] = useControllableState<boolean>({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimers = () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      openTimer.current = null;
      closeTimer.current = null;
    };

    useEffect(() => clearTimers, []);

    // When the trigger is already focusable (a Button, link, input...), the
    // wrapper must not add a second tab stop and a nested role="button".
    const [nativeTrigger, setNativeTrigger] = useState(false);
    useLayoutEffect(() => {
      const el = triggerRef.current;
      setNativeTrigger(
        Boolean(
          el?.querySelector(
            'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])',
          ),
        ),
      );
    }, [trigger]);

    const scheduleOpen = () => {
      if (disabled) return;
      clearTimers();
      openTimer.current = setTimeout(() => setOpen(true), Math.max(0, openDelay));
    };
    const scheduleClose = () => {
      clearTimers();
      closeTimer.current = setTimeout(() => setOpen(false), Math.max(0, closeDelay));
    };

    // Escape works wherever focus is (hover-only users never focus the card).
    useEffect(() => {
      if (!isOpen) return;
      const onDocKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          clearTimers();
          setOpen(false);
        }
      };
      document.addEventListener("keydown", onDocKeyDown);
      return () => document.removeEventListener("keydown", onDocKeyDown);
    }, [isOpen, setOpen]);

    useLayoutEffect(() => {
      if (!isOpen) {
        setCoords(null);
        return;
      }
      const update = () => {
        const triggerEl = triggerRef.current;
        const panelEl = panelRef.current;
        if (!triggerEl || !panelEl) return;
        const t = triggerEl.getBoundingClientRect();
        const p = panelEl.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Flip vertically when the preferred side has no room but the other does.
        let resolved = side;
        if (side === "bottom" && t.bottom + GAP + p.height > vh - VIEWPORT_MARGIN && t.top - GAP - p.height >= VIEWPORT_MARGIN) {
          resolved = "top";
        } else if (side === "top" && t.top - GAP - p.height < VIEWPORT_MARGIN && t.bottom + GAP + p.height <= vh - VIEWPORT_MARGIN) {
          resolved = "bottom";
        }

        const alignX =
          align === "start"
            ? t.left
            : align === "end"
              ? t.right - p.width
              : t.left + t.width / 2 - p.width / 2;
        const alignY =
          align === "start"
            ? t.top
            : align === "end"
              ? t.bottom - p.height
              : t.top + t.height / 2 - p.height / 2;

        let top = 0;
        let left = 0;
        switch (resolved) {
          case "top":
            top = t.top - p.height - GAP;
            left = alignX;
            break;
          case "left":
            left = t.left - p.width - GAP;
            top = alignY;
            break;
          case "right":
            left = t.right + GAP;
            top = alignY;
            break;
          case "bottom":
          default:
            top = t.bottom + GAP;
            left = alignX;
            break;
        }

        setCoords({
          top: Math.min(Math.max(top, VIEWPORT_MARGIN), vh - p.height - VIEWPORT_MARGIN),
          left: Math.min(Math.max(left, VIEWPORT_MARGIN), vw - p.width - VIEWPORT_MARGIN),
        });
      };

      update();
      // Track the trigger while the page (or any scroll container) scrolls.
      window.addEventListener("resize", update);
      window.addEventListener("scroll", update, true);
      return () => {
        window.removeEventListener("resize", update);
        window.removeEventListener("scroll", update, true);
      };
    }, [isOpen, side, align, content, children]);

    return (
      <div
        ref={(element) => {
          rootRef.current = element;
          if (typeof ref === "function") ref(element);
          else if (ref) ref.current = element;
        }}
        className={cn("relative inline-flex", className)}
        style={style}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          scheduleOpen();
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          scheduleClose();
        }}
        onFocusCapture={(event) => {
          onFocusCapture?.(event);
          if (disabled) return;
          clearTimers();
          setOpen(true);
        }}
        onBlurCapture={(event) => {
          onBlurCapture?.(event);
          if (
            rootRef.current &&
            event.relatedTarget instanceof Node &&
            rootRef.current.contains(event.relatedTarget)
          ) {
            return;
          }
          scheduleClose();
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key === "Escape") {
            clearTimers();
            setOpen(false);
          }
        }}
        {...rest}
      >
        <div
          ref={triggerRef}
          role={nativeTrigger ? undefined : "button"}
          tabIndex={nativeTrigger ? undefined : disabled ? -1 : 0}
          aria-haspopup={nativeTrigger ? undefined : "dialog"}
          aria-expanded={nativeTrigger ? undefined : isOpen}
          aria-controls={!nativeTrigger && isOpen ? panelId : undefined}
          aria-disabled={!nativeTrigger && disabled ? true : undefined}
          className={cn(
            "inline-flex rounded-lg",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            disabled && "cursor-not-allowed opacity-50",
            triggerClassName,
          )}
        >
          {trigger}
        </div>
        {isOpen && (
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            className={cn(
              "fixed z-50 w-64 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-popover p-4",
              "text-sm text-popover-foreground shadow-xl",
              "animate-in fade-in motion-reduce:animate-none",
              !coords && "invisible",
              contentClassName,
            )}
            style={{
              ...(coords ? { top: coords.top, left: coords.left } : {}),
              ...contentStyle,
            }}
          >
            {content ?? children}
          </div>
        )}
      </div>
    );
  },
);

HoverCard.displayName = "HoverCard";
