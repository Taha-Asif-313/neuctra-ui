"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface ToggleGroupOption {
  value: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Accessible name when the option is icon-only. */
  ariaLabel?: string;
}

export interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: ToggleGroupOption[];
  /** "single" behaves like a segmented control; "multiple" like toolbar toggles. */
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
}

const SIZES = {
  sm: "h-8 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-9 px-3 text-sm [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-11 px-4 text-base [&_svg]:h-5 [&_svg]:w-5",
} as const;

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup(
    {
      options,
      type = "single",
      value,
      defaultValue,
      onChange,
      size = "md",
      fullWidth = false,
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) {
    const [internal, setInternal] = useState<string | string[]>(
      defaultValue ?? (type === "multiple" ? [] : ""),
    );
    const current = value !== undefined ? value : internal;

    const isSelected = (v: string) =>
      type === "multiple"
        ? Array.isArray(current) && current.includes(v)
        : current === v;

    const select = (v: string) => {
      let next: string | string[];
      if (type === "multiple") {
        const list = Array.isArray(current) ? current : [];
        next = list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
      } else {
        next = current === v ? "" : v;
      }
      if (value === undefined) setInternal(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex items-stretch overflow-hidden rounded-lg border border-border bg-transparent",
          fullWidth && "flex w-full",
          disabled && "opacity-50",
          className,
        )}
        {...rest}
      >
        {options.map((option, i) => {
          const selected = isSelected(option.value);
          const itemDisabled = disabled || option.disabled;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              aria-label={option.ariaLabel}
              disabled={itemDisabled}
              onClick={() => select(option.value)}
              className={cn(
                "inline-flex items-center justify-center gap-2 font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:opacity-50",
                SIZES[size] ?? SIZES.md,
                fullWidth && "flex-1",
                i > 0 && "border-l border-border",
                selected
                  ? "bg-primary/10 text-primary"
                  : "bg-transparent text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
            >
              {option.icon && (
                <span aria-hidden="true" className="shrink-0">
                  {option.icon}
                </span>
              )}
              {option.label}
            </button>
          );
        })}
      </div>
    );
  },
);

ToggleGroup.displayName = "ToggleGroup";
