"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Controlled pressed state; when set, the toggle no longer manages its own state. */
  pressed?: boolean;
  /** Initial pressed state for uncontrolled usage. */
  defaultPressed?: boolean;
  /** Called with the next pressed state whenever the toggle is clicked. */
  onPressedChange?: (pressed: boolean) => void;
  /** Visual style: borderless (`default`) or bordered (`outline`). */
  variant?: "default" | "outline";
  /** Size variant controlling height, padding and icon sizing. */
  size?: "sm" | "md" | "lg";
}

// Heights match ToggleGroup, so a standalone Toggle sits flush next to a
// group in the same toolbar.
const SIZES = {
  sm: "h-8 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-9 px-3 text-sm [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-11 px-4 text-base [&_svg]:h-5 [&_svg]:w-5",
} as const;

/** Two-state button (e.g. bold in a text editor, filter chips). */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(
    {
      pressed,
      defaultPressed = false,
      onPressedChange,
      variant = "default",
      size = "md",
      className,
      children,
      onClick,
      disabled,
      ...rest
    },
    ref,
  ) {
    const [internal, setInternal] = useState(defaultPressed);
    const isPressed = pressed !== undefined ? pressed : internal;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        disabled={disabled}
        onClick={(e) => {
          onClick?.(e);
          if (pressed === undefined) setInternal(!isPressed);
          onPressedChange?.(!isPressed);
        }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          SIZES[size] ?? SIZES.md,
          variant === "outline" && "border border-border",
          isPressed
            ? "bg-accent text-foreground"
            : "bg-transparent text-muted-foreground hover:bg-accent/60 hover:text-foreground",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Toggle.displayName = "Toggle";
