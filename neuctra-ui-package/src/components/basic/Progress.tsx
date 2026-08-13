"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 0–max. Omit (undefined) for an indeterminate bar. */
  value?: number;
  max?: number;
  variant?: "linear" | "circular";
  size?: "sm" | "md" | "lg";
  /** Show the percentage next to (linear) or inside (circular) the track. */
  showValue?: boolean;
  /** Accessible label for the progress bar. */
  label?: string;
  colorClassName?: string;
}

const LINEAR_SIZES = { sm: "h-1", md: "h-2", lg: "h-3" } as const;
const CIRCULAR_SIZES = { sm: 32, md: 48, lg: 64 } as const;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      value,
      max = 100,
      variant = "linear",
      size = "md",
      showValue = false,
      label,
      colorClassName,
      className,
      ...rest
    },
    ref,
  ) {
    const indeterminate = value === undefined || value === null;
    const clamped = indeterminate ? 0 : Math.min(Math.max(value, 0), max);
    const percent = indeterminate ? 0 : Math.round((clamped / max) * 100);

    const ariaProps = {
      role: "progressbar" as const,
      "aria-label": label,
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-valuenow": indeterminate ? undefined : clamped,
    };

    if (variant === "circular") {
      const box = CIRCULAR_SIZES[size] ?? CIRCULAR_SIZES.md;
      const stroke = size === "sm" ? 3 : 4;
      const radius = (box - stroke) / 2;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference * (1 - percent / 100);

      return (
        <div
          ref={ref}
          {...ariaProps}
          className={cn(
            "relative inline-flex items-center justify-center",
            className,
          )}
          {...rest}
        >
          <svg
            width={box}
            height={box}
            viewBox={`0 0 ${box} ${box}`}
            className={cn(indeterminate && "animate-spin")}
            aria-hidden="true"
          >
            <circle
              cx={box / 2}
              cy={box / 2}
              r={radius}
              fill="none"
              strokeWidth={stroke}
              className="stroke-muted"
            />
            <circle
              cx={box / 2}
              cy={box / 2}
              r={radius}
              fill="none"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={indeterminate ? circumference * 0.75 : offset}
              transform={`rotate(-90 ${box / 2} ${box / 2})`}
              className={cn(
                "transition-[stroke-dashoffset] duration-300",
                colorClassName ?? "stroke-primary",
              )}
            />
          </svg>
          {showValue && !indeterminate && (
            <span
              className={cn(
                "absolute font-semibold tabular-nums text-foreground",
                size === "lg" ? "text-xs" : "text-[10px]",
              )}
            >
              {percent}%
            </span>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex w-full items-center gap-3", className)}
        {...rest}
      >
        <div
          {...ariaProps}
          className={cn(
            "w-full overflow-hidden rounded-full bg-muted",
            LINEAR_SIZES[size] ?? LINEAR_SIZES.md,
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-300",
              colorClassName ?? "bg-primary",
              indeterminate &&
                "w-1/3 animate-[progress-indeterminate_1.2s_ease-in-out_infinite] motion-reduce:animate-none",
            )}
            style={indeterminate ? undefined : { width: `${percent}%` }}
          />
        </div>
        {showValue && !indeterminate && (
          <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
            {percent}%
          </span>
        )}
      </div>
    );
  },
);

Progress.displayName = "Progress";
