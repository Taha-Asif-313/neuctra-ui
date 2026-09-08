"use client";

import React, { forwardRef } from "react";

import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/* 🧩 Types                                                                  */
/* -------------------------------------------------------------------------- */

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon displayed inside the button */
  icon: React.ReactNode;

  /** Visual style of the icon button */
  variant?:
    | "default"
    | "soft"
    | "outline"
    | "ghost"
    | "secondary"
    | "destructive"
    | "success"
    | "warning"
    | "info"
    | "link";

  /** Size of the icon button */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** Optional tooltip / accessible label */
  "aria-label"?: string;

  /** Full customization */
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
}

/* -------------------------------------------------------------------------- */
/* 🔘 IconButton                                                             */
/* -------------------------------------------------------------------------- */

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      variant = "default",
      size = "sm",
      disabled,
      className,
      iconClassName,
      iconStyle,
      type = "button",
      ...rest
    },
    ref,
  ) {
    const sizeClasses = {
      xs: "size-7 rounded-md",
      sm: "size-8 rounded-md",
      md: "size-10 rounded-lg",
      lg: "size-12 rounded-xl",
      xl: "size-14 rounded-2xl",
    } as const;

    const iconSizes = {
      xs: 14,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 28,
    } as const;

    const variantClasses: Record<
      NonNullable<IconButtonProps["variant"]>,
      string
    > = {
      default: "bg-primary text-foreground hover:opacity-90",

      soft: "bg-primary/10 text-primary hover:bg-primary/15",

      outline:
        "border border-border bg-background text-foreground hover:bg-accent",

      ghost: "bg-transparent text-foreground hover:bg-accent",

      secondary: "bg-muted text-muted-foreground hover:opacity-90",

      destructive:
        "bg-destructive text-destructive-foreground hover:opacity-90",

      success: "bg-success text-success-foreground hover:opacity-90",

      warning: "bg-warning text-warning-foreground hover:opacity-90",

      info: "bg-info text-info-foreground hover:opacity-90",

      link: "bg-transparent text-primary hover:underline hover:opacity-90",
    };

    const isDisabled = disabled;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "inline-flex shrink-0 items-center justify-center",
          "transition-all duration-200",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-ring",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
          sizeClasses[size] ?? sizeClasses.sm,
          variantClasses[variant] ?? variantClasses.default,
          isDisabled && "cursor-not-allowed opacity-60",
          className,
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex shrink-0 items-center justify-center",
            "[&_svg]:h-full [&_svg]:w-full",
            iconClassName,
          )}
          style={{
            width: iconSizes[size],
            height: iconSizes[size],
            ...iconStyle,
          }}
        >
          {icon}
        </span>
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
