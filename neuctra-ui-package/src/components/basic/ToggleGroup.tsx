"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface ToggleGroupOption {
  /** Unique value identifying this option. */
  value: string;
  /** Visible label rendered next to the icon. */
  label?: React.ReactNode;
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  /** Disables just this option. */
  disabled?: boolean;
  /** Accessible name when the option is icon-only. */
  ariaLabel?: string;
}

export interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Options rendered as segmented buttons. */
  options: ToggleGroupOption[];
  /** "single" behaves like a segmented control; "multiple" like toolbar toggles. */
  type?: "single" | "multiple";
  /** Controlled value: a string in `"single"` mode, a string array in `"multiple"` mode. */
  value?: string | string[];
  /** Initial value for uncontrolled usage. */
  defaultValue?: string | string[];
  /** Called with the new value whenever the selection changes. In `"single"` mode, clicking the active option clears the selection to `""`. */
  onChange?: (value: string | string[]) => void;
  /** Size variant controlling item height, padding and icon sizing. */
  size?: "sm" | "md" | "lg";
  /** Stretches the group to fill its container, giving each option equal width. */
  fullWidth?: boolean;
  /** Disables every option in the group. */
  disabled?: boolean;
  /** Each option's `<button>`. */
  itemClassName?: string;
  /** Wrapper around an option's icon. */
  iconClassName?: string;
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
      itemClassName,
      iconClassName,
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
                itemClassName,
              )}
            >
              {option.icon && (
                <span
                  aria-hidden="true"
                  className={cn("shrink-0", iconClassName)}
                >
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
