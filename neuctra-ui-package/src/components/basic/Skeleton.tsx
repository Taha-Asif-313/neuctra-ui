"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: number | string;
  height?: number | string;
  /** For variant="text": number of stacked lines (last one is shorter). */
  lines?: number;
  /** Disable the pulse animation. */
  animated?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      variant = "text",
      width,
      height,
      lines = 1,
      animated = true,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const base = cn(
      "bg-muted",
      animated && "animate-pulse motion-reduce:animate-none",
    );

    if (variant === "text" && lines > 1) {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          className={cn("w-full space-y-2", className)}
          style={{ width, ...style }}
          {...rest}
        >
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn(
                base,
                "h-4 rounded",
                // Shorter last line reads as a paragraph, not a block.
                i === lines - 1 ? "w-3/5" : "w-full",
              )}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          base,
          variant === "circular" && "rounded-full",
          variant === "rectangular" && "rounded-lg",
          variant === "text" && "h-4 rounded",
          className,
        )}
        style={{
          width: width ?? (variant === "circular" ? 40 : "100%"),
          height:
            height ?? (variant === "circular" ? 40 : variant === "rectangular" ? 96 : undefined),
          ...style,
        }}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
