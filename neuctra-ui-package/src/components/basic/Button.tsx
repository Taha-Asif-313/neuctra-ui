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

  weight?: React.CSSProperties["fontWeight"];
  primaryColor?: string;

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
      size = "md",
      weight = 400,
      primaryColor = "var(--primary)",
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
      xs: "px-4 py-1 text-xs",
      sm: "px-5 py-1.5 text-sm",
      md: "px-6 py-2 text-[15px]",
      lg: "px-7 py-2.5 text-base",
    } as const;

    /* 🎨 VARIANTS (SHADCN STYLE) */
    const variantClasses: Record<
      NonNullable<ButtonProps["variant"]>,
      string
    > = {
      default:
        "bg-primary text-primary-foreground hover:opacity-90",
      outline:
        "border border-border bg-background text-foreground hover:bg-accent",
      ghost:
        "bg-transparent text-foreground hover:bg-accent",
    };

    /* 🔘 Icon sizes */
    const iconSizes = {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
    } as const;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={clsx(
          "inline-flex items-center justify-center rounded-lg transition-all duration-200",
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && "w-full",
          isDisabled && "opacity-60 cursor-not-allowed pointer-events-none",
          className,
        )}
        style={{
          fontWeight: weight,
          ...style,
        }}
        {...rest}
      >
        {/* 🔥 CONTENT WRAPPER */}
        <span
          className={clsx("inline-flex items-center gap-2", contentClassName)}
          style={contentStyle}
        >
          {loading ? (
            <>
              {/* Loader */}
              <span
                className={clsx(
                  "border-2 border-current border-t-transparent rounded-full animate-spin",
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
                className={clsx(
                  "whitespace-nowrap text-foreground",
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
                  className={clsx(
                    "inline-flex items-center justify-center flex-shrink-0",
                    "text-current",
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

              <span
                className={clsx(
                  "whitespace-nowrap text-current",
                  textClassName,
                )}
                style={textStyle}
              >
                {children}
              </span>

              {iconAfter && (
                <span
                  className={clsx(
                    "inline-flex items-center justify-center flex-shrink-0",
                    "text-current",
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