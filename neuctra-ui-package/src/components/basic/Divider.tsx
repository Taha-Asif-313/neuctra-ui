"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  /** Optional centered label — horizontal orientation only. */
  label?: React.ReactNode;
  dashed?: boolean;
  /** Vertical spacing (horizontal) or horizontal spacing (vertical). */
  spacing?: "none" | "sm" | "md" | "lg";

  /** 🔥 Full Customization (labeled horizontal variant only) */
  lineClassName?: string;
  labelClassName?: string;
}

const H_SPACING = { none: "my-0", sm: "my-2", md: "my-4", lg: "my-8" } as const;
const V_SPACING = { none: "mx-0", sm: "mx-2", md: "mx-4", lg: "mx-8" } as const;

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider(
    {
      orientation = "horizontal",
      label,
      dashed = false,
      spacing = "md",
      className,
      lineClassName,
      labelClassName,
      ...rest
    },
    ref,
  ) {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            "inline-block self-stretch w-px min-h-4 bg-border",
            dashed && "bg-transparent border-l border-dashed border-border",
            V_SPACING[spacing],
            className,
          )}
          {...rest}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn(
            "flex items-center gap-3 text-xs text-muted-foreground",
            H_SPACING[spacing],
            className,
          )}
          {...rest}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-px flex-1 bg-border",
              dashed && "bg-transparent border-t border-dashed border-border",
              lineClassName,
            )}
          />
          <span className={cn("shrink-0", labelClassName)}>{label}</span>
          <span
            aria-hidden="true"
            className={cn(
              "h-px flex-1 bg-border",
              dashed && "bg-transparent border-t border-dashed border-border",
              lineClassName,
            )}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          "h-px w-full bg-border",
          dashed && "bg-transparent border-t border-dashed border-border",
          H_SPACING[spacing],
          className,
        )}
        {...rest}
      />
    );
  },
);

Divider.displayName = "Divider";
