"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/* 🧩 Types                                                                  */
/* -------------------------------------------------------------------------- */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;

  loading?: boolean;
  loadingText?: string;

  fullWidth?: boolean;

  variant?: "default" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";

  /** 🔥 Full Customization */
  className?: string;
  contentClassName?: string;
  iconClassName?: string;
  loaderClassName?: string;
  textClassName?: string;

  style?: React.CSSProperties;
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
        aria-disabled={isDisabled}
        className={clsx(
          className,
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && "w-full",
          isDisabled && "opacity-60 cursor-not-allowed pointer-events-none",
          "inline-flex items-center justify-center transition-all duration-200",
        )}
        style={{
          ...style,
        }}
        {...rest}
      >
        {/* 🔥 CONTENT WRAPPER */}
        <span
          className={clsx(contentClassName, "inline-flex items-center gap-2")}
          style={contentStyle}
        >
          {loading ? (
            <>
              {/* Loader */}
              <span
                className={clsx(
                  loaderClassName,
                  "border-2 border-current border-t-transparent rounded-full animate-spin",
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
                className={clsx(
                  textClassName,
                  "whitespace-nowrap text-foreground",
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
                  className={clsx(
                    iconClassName,
                    "inline-flex items-center justify-center shrink-0",
                    "text-current",
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

              <span
                className={clsx(
                  textClassName,
                  "whitespace-nowrap text-current",
                )}
                style={textStyle}
              >
                {children}
              </span>

              {iconAfter && (
                <span
                  className={clsx(
                    iconClassName,
                    "inline-flex items-center justify-center shrink-0",
                    "text-current",
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
