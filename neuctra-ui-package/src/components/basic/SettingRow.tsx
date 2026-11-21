"use client";

import React, { forwardRef, useId } from "react";

import { cn } from "../../lib/cn";

export interface SettingRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Primary label for the setting. */
  label: React.ReactNode;
  /** Optional helper text beneath the label. */
  description?: React.ReactNode;
  /** The interactive control, e.g. a Switch or Select. */
  control: React.ReactNode;
  /** Id of the control, linked to the label with `htmlFor`. When omitted, the control is wrapped in a group labelled by the row. */
  htmlFor?: string;
  /** Optional leading icon shown before the label. */
  icon?: React.ReactNode;
  /** Dims the row and blocks interaction with the control. */
  disabled?: boolean;
  /** Draws a bottom border, removed automatically on the last row. */
  divider?: boolean;
  /** Vertical rhythm and text size of the row. */
  size?: "sm" | "md" | "lg";
  /** Stacks the control under the text on narrow screens instead of keeping it on the right. */
  stackOnMobile?: boolean;
  /** Additional classes for the row root. */
  className?: string;
  /** Inline styles for the row root. */
  style?: React.CSSProperties;
  /** Additional classes for the leading icon wrapper. */
  iconClassName?: string;
  /** Additional classes for the label. */
  labelClassName?: string;
  /** Additional classes for the description. */
  descriptionClassName?: string;
  /** Additional classes for the control wrapper. */
  controlClassName?: string;
}

const sizeConfig = {
  sm: { root: "py-2.5 gap-4", stackGap: "gap-2.5 sm:gap-4", stackIndent: "pl-11 sm:pl-0", label: "text-sm", desc: "text-xs", icon: "h-8 w-8 [&_svg]:h-4 [&_svg]:w-4" },
  md: { root: "py-3.5 gap-6", stackGap: "gap-3 sm:gap-6", stackIndent: "pl-12 sm:pl-0", label: "text-sm", desc: "text-xs", icon: "h-9 w-9 [&_svg]:h-4 [&_svg]:w-4" },
  lg: { root: "py-4 gap-6", stackGap: "gap-3 sm:gap-6", stackIndent: "pl-13 sm:pl-0", label: "text-base", desc: "text-sm", icon: "h-10 w-10 [&_svg]:h-5 [&_svg]:w-5" },
} as const;

export const SettingRow = forwardRef<HTMLDivElement, SettingRowProps>(
  function SettingRow(
    {
      label,
      description,
      control,
      htmlFor,
      icon,
      disabled = false,
      divider = false,
      size = "md",
      stackOnMobile = false,
      className,
      style,
      iconClassName,
      labelClassName,
      descriptionClassName,
      controlClassName,
      ...rest
    },
    ref,
  ) {
    const baseId = useId();
    const labelId = `${baseId}-label`;
    const descriptionId = `${baseId}-description`;
    const s = sizeConfig[size] ?? sizeConfig.md;

    const labelClasses = cn(
      "block font-medium text-foreground",
      s.label,
      labelClassName,
    );

    return (
      <div
        ref={ref}
        aria-disabled={disabled || undefined}
        className={cn(
          "flex w-full justify-between",
          stackOnMobile
            ? "flex-col items-start sm:flex-row sm:items-center"
            : "items-center",
          s.root,
          // Stacked rows need a tighter vertical gap than the side-by-side one.
          stackOnMobile && s.stackGap,
          divider && "border-b border-border last:border-b-0",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        style={style}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {icon && (
            <span
              aria-hidden="true"
              className={cn(
                "flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
                s.icon,
                iconClassName,
              )}
            >
              {icon}
            </span>
          )}
          <div className="min-w-0 space-y-1">
            {htmlFor ? (
              <label id={labelId} htmlFor={htmlFor} className={labelClasses}>
                {label}
              </label>
            ) : (
              <span id={labelId} className={labelClasses}>
                {label}
              </span>
            )}
            {description && (
              <p
                id={descriptionId}
                className={cn(
                  "text-muted-foreground",
                  s.desc,
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            )}
          </div>
        </div>
        <div
          // Without a `htmlFor` target the control has no programmatic
          // label, so the wrapper names it after the row instead.
          role={htmlFor ? undefined : "group"}
          aria-labelledby={htmlFor ? undefined : labelId}
          aria-describedby={description ? descriptionId : undefined}
          className={cn(
            "flex shrink-0 items-center",
            // When stacked, line the control up with the text, not the icon.
            stackOnMobile && icon && s.stackIndent,
            disabled && "pointer-events-none",
            controlClassName,
          )}
        >
          {control}
        </div>
      </div>
    );
  },
);
SettingRow.displayName = "SettingRow";
