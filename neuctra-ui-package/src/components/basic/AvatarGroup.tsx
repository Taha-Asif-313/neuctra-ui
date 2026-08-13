"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Avatar elements (or any circular content). */
  children: React.ReactNode;
  /** Show at most this many; the rest collapse into a "+N" counter. */
  max?: number;
  size?: "sm" | "md" | "lg";
  /** Overlap amount between items. */
  spacing?: "tight" | "normal";
}

const COUNTER_SIZES = {
  sm: "h-8 w-8 text-[10px]",
  md: "h-10 w-10 text-xs",
  lg: "h-12 w-12 text-sm",
} as const;

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    { children, max, size = "md", spacing = "normal", className, ...rest },
    ref,
  ) {
    const items = React.Children.toArray(children);
    const visible = max && max > 0 ? items.slice(0, max) : items;
    const overflow = items.length - visible.length;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          spacing === "tight" ? "-space-x-3" : "-space-x-2",
          className,
        )}
        {...rest}
      >
        {visible.map((child, i) => (
          <span
            key={i}
            // Ring separates overlapping avatars from each other.
            className="relative inline-flex rounded-full ring-2 ring-background"
            style={{ zIndex: visible.length - i }}
          >
            {child}
          </span>
        ))}

        {overflow > 0 && (
          <span
            aria-label={`${overflow} more`}
            className={cn(
              "relative z-0 inline-flex items-center justify-center rounded-full",
              "bg-muted font-semibold text-muted-foreground ring-2 ring-background",
              COUNTER_SIZES[size] ?? COUNTER_SIZES.md,
            )}
          >
            +{overflow}
          </span>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";
