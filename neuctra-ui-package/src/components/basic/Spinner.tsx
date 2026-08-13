"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Accessible label announced to screen readers. */
  label?: string;
  /** Stroke color class; defaults to the current text color. */
  colorClassName?: string;
}

const SIZES = {
  xs: "w-3 h-3 border-2",
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-[3px]",
  xl: "w-12 h-12 border-4",
} as const;

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    { size = "md", label = "Loading…", colorClassName, className, ...rest },
    ref,
  ) {
    return (
      <span
        ref={ref}
        role="status"
        className={cn("inline-flex items-center justify-center", className)}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-block rounded-full border-current border-t-transparent animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]",
            SIZES[size] ?? SIZES.md,
            colorClassName ?? "text-primary",
          )}
        />
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);

Spinner.displayName = "Spinner";
