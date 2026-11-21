"use client";

import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { Button, type ButtonProps } from "./Button";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** An action revealed by swiping a SwipeActions row. */
export interface SwipeAction {
  /** Visible label, also used as the accessible name. */
  label: string;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Called when the action is activated. */
  onClick?: () => void;
  /** Styles the action as destructive. Shorthand for `color: "destructive"`. */
  destructive?: boolean;
  /** Fill color of the action button. */
  color?: "neutral" | "primary" | "success" | "warning" | "destructive";
}

export type SwipeActionsSide = "left" | "right";

export interface SwipeActionsProps {
  /** Foreground row content. */
  children: React.ReactNode;
  /** Actions revealed when swiping right. */
  left?: SwipeAction[];
  /** Actions revealed when swiping left. */
  right?: SwipeAction[];
  /** Horizontal travel in pixels required to reveal the rail. */
  threshold?: number;
  /** Controlled open side; `null` keeps the row closed. */
  open?: SwipeActionsSide | null;
  /** Initial open side in uncontrolled mode. */
  defaultOpen?: SwipeActionsSide | null;
  /** Fired whenever the row opens or closes. */
  onOpenChange?: (side: SwipeActionsSide | null) => void;
  /** Disables swiping and hides the actions. */
  disabled?: boolean;
  /** Additional classes for the outer container. */
  className?: string;
  /** Inline styles for the outer container. */
  style?: React.CSSProperties;
  /** Additional classes for the sliding foreground surface. */
  contentClassName?: string;
  /** Additional classes for each action rail. */
  railClassName?: string;
  /** Additional classes for every action button. */
  actionClassName?: string;
}

/** Pixels of movement before a gesture is treated as a swipe, not a tap. */
const DRAG_SLOP = 8;

/** Maps an action color onto a Button variant (neutral is a muted fill with foreground text). */
const actionVariants: Record<
  NonNullable<SwipeAction["color"]>,
  { variant: NonNullable<ButtonProps["variant"]>; className?: string }
> = {
  neutral: { variant: "secondary", className: "text-foreground hover:bg-muted/80" },
  primary: { variant: "default" },
  success: { variant: "success" },
  warning: { variant: "warning" },
  destructive: { variant: "destructive" },
};

export const SwipeActions = forwardRef<HTMLDivElement, SwipeActionsProps>(
  function SwipeActions(
    {
      children,
      left = [],
      right = [],
      threshold = 56,
      open: openProp,
      defaultOpen = null,
      onOpenChange,
      disabled = false,
      className,
      style,
      contentClassName,
      railClassName,
      actionClassName,
    },
    ref,
  ) {
    const [openSide, setOpenSide] = useControllableState<SwipeActionsSide | null>({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [dragOffset, setDragOffset] = useState<number | null>(null);
    const [railWidths, setRailWidths] = useState({ left: 0, right: 0 });
    const rootRef = useRef<HTMLDivElement | null>(null);
    const leftRef = useRef<HTMLDivElement | null>(null);
    const rightRef = useRef<HTMLDivElement | null>(null);
    const suppressClick = useRef(false);
    const drag = useRef<{
      startX: number;
      startY: number;
      base: number;
      pointerId: number;
      active: boolean;
    } | null>(null);

    // Measure rails after layout (and when actions change) instead of reading
    // offsetWidth during render, which returned 0 on the first open.
    useIsomorphicLayoutEffect(() => {
      setRailWidths({
        left: leftRef.current?.offsetWidth ?? 0,
        right: rightRef.current?.offsetWidth ?? 0,
      });
    }, [left.length, right.length]);

    const restingOffset =
      openSide === "left" ? railWidths.left : openSide === "right" ? -railWidths.right : 0;
    const offset = dragOffset ?? restingOffset;

    // Close on outside pointer down or Escape while open.
    useEffect(() => {
      if (!openSide) return;
      const onPointerDown = (event: PointerEvent) => {
        if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
          setOpenSide(null);
        }
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpenSide(null);
      };
      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [openSide, setOpenSide]);

    const canSwipe = !disabled && (left.length > 0 || right.length > 0);

    const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!canSwipe || (event.pointerType === "mouse" && event.button !== 0)) return;
      drag.current = {
        startX: event.clientX,
        startY: event.clientY,
        base: restingOffset,
        pointerId: event.pointerId,
        active: false,
      };
    };

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      const state = drag.current;
      if (!state || state.pointerId !== event.pointerId) return;
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;
      if (!state.active) {
        if (Math.abs(dx) < DRAG_SLOP) return;
        // Mostly vertical movement is a scroll; let the browser have it.
        if (Math.abs(dy) > Math.abs(dx)) {
          drag.current = null;
          return;
        }
        // Capture only once a horizontal swipe is confirmed, so taps still
        // reach buttons and links inside the row.
        state.active = true;
        event.currentTarget.setPointerCapture?.(event.pointerId);
      }
      const next = state.base + dx;
      setDragOffset(Math.max(-railWidths.right, Math.min(railWidths.left, next)));
    };

    const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
      const state = drag.current;
      if (!state || state.pointerId !== event.pointerId) return;
      drag.current = null;
      if (!state.active) return;
      suppressClick.current = true;
      const final = Math.max(
        -railWidths.right,
        Math.min(railWidths.left, state.base + (event.clientX - state.startX)),
      );
      setDragOffset(null);
      if (final >= threshold && left.length) setOpenSide("left");
      else if (final <= -threshold && right.length) setOpenSide("right");
      else setOpenSide(null);
    };

    const renderRail = (side: SwipeActionsSide, actions: SwipeAction[]) => {
      // Keep a rail hidden unless it is being revealed: otherwise its fill
      // bleeds through the antialiased rounded corners of a closed row, and
      // its buttons stay reachable by pointer behind the content.
      const revealed = side === "left" ? offset > 0 : offset < 0;
      return (
        <div
          ref={side === "left" ? leftRef : rightRef}
          className={cn(
            "absolute inset-y-0 flex",
            side === "left" ? "left-0" : "right-0",
            // Opacity (not visibility) so the buttons stay focusable: Tab
            // into a rail is what opens it for keyboard users.
            "transition-opacity duration-200 motion-reduce:transition-none",
            !revealed && "pointer-events-none opacity-0",
            railClassName,
          )}
        >
          {actions.map((action, index) => {
            const color = action.color ?? (action.destructive ? "destructive" : "neutral");
            const look = actionVariants[color] ?? actionVariants.neutral;
            return (
              <Button
                key={`${action.label}-${index}`}
                variant={look.variant}
                size="xs"
                disabled={disabled}
                onFocus={() => setOpenSide(side)}
                onClick={() => {
                  action.onClick?.();
                  setOpenSide(null);
                }}
                iconBefore={action.icon}
                contentClassName="flex-col gap-1"
                className={cn(
                  "h-auto min-h-0 min-w-16 rounded-none px-3 font-medium hover:opacity-100",
                  "focus-visible:ring-inset focus-visible:ring-offset-0",
                  look.className,
                  actionClassName,
                )}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      );
    };

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        style={style}
        onBlur={(event) => {
          // Close once focus leaves the row entirely (e.g. tabbing past it).
          if (openSide && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setOpenSide(null);
          }
        }}
        className={cn(
          "relative overflow-hidden rounded-xl border border-border bg-card",
          className,
        )}
      >
        {!disabled && left.length > 0 && renderRail("left", left)}
        {!disabled && right.length > 0 && renderRail("right", right)}

        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(event) => {
            // Swallow the click that ends a swipe, and use a tap on an open
            // row to close it rather than triggering row content.
            if (suppressClick.current) {
              suppressClick.current = false;
              event.preventDefault();
              event.stopPropagation();
              return;
            }
            if (openSide) {
              event.preventDefault();
              event.stopPropagation();
              setOpenSide(null);
            }
          }}
          style={{ transform: `translateX(${offset}px)` }}
          className={cn(
            "relative z-10 touch-pan-y select-none bg-card text-card-foreground",
            dragOffset === null &&
              "transition-transform duration-200 ease-out motion-reduce:transition-none",
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);

SwipeActions.displayName = "SwipeActions";
