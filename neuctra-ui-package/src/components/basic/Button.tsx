"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/* 🧩 Types                                                                  */
/* -------------------------------------------------------------------------- */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional so icon-only buttons are possible — pair with `aria-label`. */
  children?: React.ReactNode;

  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;

  loading?: boolean;
  loadingText?: string;

  fullWidth?: boolean;

  variant?: "default" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** 🔥 Full Customization */
  contentClassName?: string;
  iconClassName?: string;
  loaderClassName?: string;
  textClassName?: string;

  contentStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  loaderStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

/* -------------------------------------------------------------------------- */
/* 🔘 Button                                                                 */
/* -------------------------------------------------------------------------- */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      iconBefore,
      iconAfter,
      loading = false,
      loadingText = "Loading...",
      fullWidth = false,
      variant = "default",
      size = "sm",
      disabled,

      className,
      contentClassName,
      iconClassName,
      loaderClassName,
      textClassName,

      style,
      contentStyle,
      iconStyle,
      loaderStyle,
      textStyle,

      type = "button",
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    /* 📏 Sizes */
    const sizeClasses = {
      xs: "px-3 py-1.5 text-xs min-h-[28px] rounded-md",
      sm: "px-4 py-2 text-sm min-h-[32px] rounded-md",
      md: "px-6 py-2.5 text-[15px] min-h-[40px] rounded-lg",
      lg: "px-8 py-3 text-base min-h-[48px] rounded-xl",
      xl: "px-10 py-3.5 text-lg min-h-[56px] rounded-2xl",
    } as const;

    /* ↔️ Gap between icon and label, scaled with the size */
    const gapClasses = {
      xs: "gap-1.5",
      sm: "gap-2",
      md: "gap-2",
      lg: "gap-2.5",
      xl: "gap-3",
    } as const;

    /* 🌀 Spinner stroke, so it doesn't look solid at xs */
    const loaderBorder = {
      xs: "border",
      sm: "border-2",
      md: "border-2",
      lg: "border-2",
      xl: "border-[3px]",
    } as const;

    /* 🎨 VARIANTS (SHADCN STYLE) */
    const variantClasses: Record<
      NonNullable<ButtonProps["variant"]>,
      string
    > = {
      default: "bg-primary text-primary-foreground hover:opacity-90",
      outline:
        "border border-border bg-background text-foreground hover:bg-accent",
      ghost: "bg-transparent text-foreground hover:bg-accent",
    };

    /* 🔘 Icon sizes */
    const iconSizes = {
      xs: 14,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 28,
    } as const;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          sizeClasses[size] ?? sizeClasses.md,
          variantClasses[variant] ?? variantClasses.default,
          fullWidth && "w-full",
          isDisabled && "opacity-60 cursor-not-allowed",
          className,
        )}
        style={style}
        {...rest}
      >
        {/* 🔥 CONTENT WRAPPER */}
        <span
          className={cn(
            "inline-flex items-center",
            gapClasses[size] ?? gapClasses.md,
            contentClassName,
          )}
          style={contentStyle}
        >
          {loading ? (
            <>
              {/* Loader */}
              <span
                aria-hidden="true"
                className={cn(
                  "border-current border-t-transparent rounded-full animate-spin",
                  loaderBorder[size] ?? loaderBorder.md,
                  loaderClassName,
                )}
                style={{
                  width: iconSizes[size],
                  height: iconSizes[size],
                  flexShrink: 0,
                  ...loaderStyle,
                }}
              />

              {/* Loading Text */}
              <span
                className={cn(
                  "whitespace-nowrap text-current",
                  textClassName,
                )}
                style={textStyle}
              >
                {loadingText}
              </span>
            </>
          ) : (
            <>
              {iconBefore && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex items-center justify-center shrink-0 text-current",
                    // Size the SVG itself, not just its wrapper — otherwise a
                    // default 24px lucide icon spills out of a 14px xs box.
                    "[&_svg]:w-full [&_svg]:h-full",
                    iconClassName,
                  )}
                  style={{
                    width: iconSizes[size],
                    height: iconSizes[size],
                    ...iconStyle,
                  }}
                >
                  {iconBefore}
                </span>
              )}

              {children !== undefined && children !== null && (
                <span
                  className={cn("whitespace-nowrap text-current", textClassName)}
                  style={textStyle}
                >
                  {children}
                </span>
              )}

              {iconAfter && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex items-center justify-center shrink-0 text-current",
                    "[&_svg]:w-full [&_svg]:h-full",
                    iconClassName,
                  )}
                  style={{
                    width: iconSizes[size],
                    height: iconSizes[size],
                    ...iconStyle,
                  }}
                >
                  {iconAfter}
                </span>
              )}
            </>
          )}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";
