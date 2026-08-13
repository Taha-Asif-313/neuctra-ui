"use client";

import React, { forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  label: React.ReactNode;
  variant?: "solid" | "soft" | "outline";
  color?: "primary" | "neutral" | "destructive" | "success";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  /** Renders a remove button and makes the chip dismissible. */
  onRemove?: () => void;
  disabled?: boolean;
}

const SIZES = {
  sm: { root: "h-6 px-2 text-[11px] gap-1", icon: "w-3 h-3", remove: "w-3 h-3" },
  md: { root: "h-7 px-2.5 text-xs gap-1.5", icon: "w-3.5 h-3.5", remove: "w-3.5 h-3.5" },
  lg: { root: "h-8 px-3 text-sm gap-2", icon: "w-4 h-4", remove: "w-4 h-4" },
} as const;

const COLORS = {
  primary: {
    solid: "bg-primary text-primary-foreground",
    soft: "bg-primary/10 text-primary",
    outline: "border border-primary text-primary",
  },
  neutral: {
    solid: "bg-foreground text-background",
    soft: "bg-muted text-foreground",
    outline: "border border-border text-foreground",
  },
  destructive: {
    solid: "bg-destructive text-destructive-foreground",
    soft: "bg-destructive/10 text-destructive",
    outline: "border border-destructive text-destructive",
  },
  success: {
    solid: "bg-success text-success-foreground",
    soft: "bg-success/10 text-success",
    outline: "border border-success text-success",
  },
} as const;

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  {
    label,
    variant = "soft",
    color = "primary",
    size = "md",
    icon,
    onRemove,
    disabled = false,
    className,
    ...rest
  },
  ref,
) {
  const sizes = SIZES[size] ?? SIZES.md;
  const palette = COLORS[color] ?? COLORS.primary;

  return (
    <span
      ref={ref}
      className={cn(
        // max-w-full lets the label actually truncate inside narrow parents.
        "inline-flex max-w-full items-center rounded-full font-medium select-none",
        sizes.root,
        palette[variant] ?? palette.soft,
        disabled && "opacity-50",
        className,
      )}
      {...rest}
    >
      {icon && (
        <span
          aria-hidden="true"
          className={cn("shrink-0 [&_svg]:w-full [&_svg]:h-full", sizes.icon)}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 truncate">{label}</span>
      {onRemove && (
        <button
          type="button"
          aria-label={typeof label === "string" ? `Remove ${label}` : "Remove"}
          disabled={disabled}
          onClick={onRemove}
          className={cn(
            "shrink-0 -mr-0.5 rounded-full opacity-70 transition-opacity",
            "hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            disabled && "cursor-not-allowed",
          )}
        >
          <X aria-hidden="true" className={sizes.remove} />
        </button>
      )}
    </span>
  );
});

Chip.displayName = "Chip";
