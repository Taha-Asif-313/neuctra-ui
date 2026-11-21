"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface ScrollAreaProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Scrollable content. */
  children: React.ReactNode;
  /** Fixed viewport height; numbers are pixels. */
  height?: number | string;
  /** Maximum viewport height; numbers are pixels. */
  maxHeight?: number | string;
  /** Maximum viewport width; numbers are pixels. */
  maxWidth?: number | string;
  /** Which scrollbars may appear. */
  scrollbars?: "both" | "x" | "y" | "none";
  /** Thickness of the styled scrollbars. */
  size?: "sm" | "md";
  /** Draws the card frame (border, radius, background). Set false for a bare scroller. */
  bordered?: boolean;
  /**
   * Makes the viewport keyboard-focusable so arrow keys and Page Up/Down can
   * scroll it. Disable only when the content already has focusable controls.
   */
  focusable?: boolean;
  /** Accessible name; when set the viewport is exposed as a labelled region. */
  ariaLabel?: string;
  /** Ref to the scrollable viewport element, e.g. to read scrollTop. */
  viewportRef?: React.Ref<HTMLDivElement>;
  /** Scroll handler attached to the viewport. */
  onViewportScroll?: React.UIEventHandler<HTMLDivElement>;
  /** Additional classes for the outer frame. */
  className?: string;
  /** Additional classes for the scrollable viewport. */
  viewportClassName?: string;
  /** Inline styles for the outer frame. */
  style?: React.CSSProperties;
  /** Inline styles for the scrollable viewport. */
  viewportStyle?: React.CSSProperties;
}

const sizeConfig = {
  sm: "[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5",
  md: "[&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar]:w-2.5",
} as const;

const SCROLLBAR_STYLES =
  "[scrollbar-width:thin] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/50";

const OVERFLOW = {
  both: "overflow-auto",
  x: "overflow-x-auto overflow-y-hidden",
  y: "overflow-y-auto overflow-x-hidden",
  none: "overflow-hidden",
} as const;

const toCssSize = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea(
    {
      children,
      height,
      maxHeight,
      maxWidth,
      scrollbars = "both",
      size = "md",
      bordered = true,
      focusable = true,
      ariaLabel,
      viewportRef,
      onViewportScroll,
      className,
      viewportClassName,
      style,
      viewportStyle,
      ...rest
    },
    ref,
  ) {
    const scrollable = scrollbars !== "none";

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          "relative overflow-hidden",
          bordered && "rounded-xl border border-border bg-card text-card-foreground",
          className,
        )}
        {...rest}
      >
        <div
          ref={viewportRef}
          role={ariaLabel ? "region" : undefined}
          aria-label={ariaLabel}
          tabIndex={scrollable && focusable ? 0 : undefined}
          onScroll={onViewportScroll}
          style={{
            height: toCssSize(height),
            maxHeight: toCssSize(maxHeight),
            maxWidth: toCssSize(maxWidth),
            ...viewportStyle,
          }}
          className={cn(
            "relative h-full w-full overscroll-contain",
            OVERFLOW[scrollbars] ?? OVERFLOW.both,
            scrollable && SCROLLBAR_STYLES,
            scrollable && (sizeConfig[size] ?? sizeConfig.md),
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
            bordered && "rounded-xl",
            viewportClassName,
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);

ScrollArea.displayName = "ScrollArea";
