"use client";

import React, { forwardRef, useId, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "../../lib/cn";

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current rating. Supports fractions when readOnly (e.g. 4.3). */
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Number of stars. */
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  disabled?: boolean;
  /** Clicking the current value again resets the rating to 0. */
  allowClear?: boolean;
  label?: string;
  /** Show the numeric value next to the stars. */
  showValue?: boolean;
  /** Color class of filled stars; defaults to the theme's warning (amber). */
  colorClassName?: string;
  /** Applied to every star icon, in addition to size/color/state classes. */
  starClassName?: string;
  /** The unfilled star color/class. */
  emptyStarClassName?: string;
  /** The clickable wrapper around each star, in interactive mode. */
  starWrapperClassName?: string;
  /** The numeric value shown when `showValue` is set. */
  valueClassName?: string;
}

const SIZES = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" } as const;

export const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    value,
    defaultValue = 0,
    onChange,
    max = 5,
    size = "md",
    readOnly = false,
    disabled = false,
    allowClear = true,
    label = "Rating",
    showValue = false,
    colorClassName = "text-warning",
    starClassName,
    emptyStarClassName,
    starWrapperClassName,
    valueClassName,
    className,
    ...rest
  },
  ref,
) {
  const groupName = useId();
  const [internal, setInternal] = useState(defaultValue);
  const [hovered, setHovered] = useState<number | null>(null);

  const current = value !== undefined ? value : internal;
  const active = hovered ?? current;
  const starSize = SIZES[size] ?? SIZES.md;

  const select = (next: number) => {
    if (readOnly || disabled) return;
    const resolved = allowClear && next === current ? 0 : next;
    if (value === undefined) setInternal(resolved);
    onChange?.(resolved);
  };

  /* Read-only display supports fractional values via a clipped overlay. */
  if (readOnly) {
    const percent = Math.min(Math.max(current / max, 0), 1) * 100;
    return (
      <div
        ref={ref}
        role="img"
        aria-label={`${label}: ${current} out of ${max}`}
        className={cn("inline-flex items-center gap-2", className)}
        {...rest}
      >
        <span className="relative inline-flex" aria-hidden="true">
          <span className={cn("flex gap-0.5 text-muted-foreground/40", emptyStarClassName)}>
            {Array.from({ length: max }, (_, i) => (
              <Star key={i} className={cn(starSize, starClassName)} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span
            className={cn("absolute inset-0 flex gap-0.5 overflow-hidden", colorClassName)}
            style={{ width: `${percent}%` }}
          >
            {Array.from({ length: max }, (_, i) => (
              <Star
                key={i}
                className={cn(starSize, "shrink-0", starClassName)}
                fill="currentColor"
                strokeWidth={0}
              />
            ))}
          </span>
        </span>
        {showValue && (
          <span className={cn("text-sm font-medium tabular-nums text-foreground", valueClassName)}>
            {current}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={label}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "inline-flex items-center gap-2",
        disabled && "opacity-50",
        className,
      )}
      {...rest}
    >
      <span className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const filled = starValue <= active;
          return (
            <label
              key={starValue}
              onMouseEnter={() => !disabled && setHovered(starValue)}
              className={cn(!disabled && "cursor-pointer", starWrapperClassName)}
            >
              <input
                type="radio"
                name={groupName}
                value={starValue}
                checked={current === starValue}
                onChange={() => select(starValue)}
                disabled={disabled}
                className="sr-only peer"
                aria-label={`${starValue} of ${max}`}
              />
              <Star
                aria-hidden="true"
                className={cn(
                  starSize,
                  "transition-colors",
                  filled ? colorClassName : cn("text-muted-foreground/40", emptyStarClassName),
                  "peer-focus-visible:rounded peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                  starClassName,
                )}
                fill={filled ? "currentColor" : "none"}
                strokeWidth={filled ? 0 : 1.5}
              />
            </label>
          );
        })}
      </span>
      {showValue && (
        <span className={cn("text-sm font-medium tabular-nums text-foreground", valueClassName)}>
          {current}
        </span>
      )}
    </div>
  );
});

Rating.displayName = "Rating";
