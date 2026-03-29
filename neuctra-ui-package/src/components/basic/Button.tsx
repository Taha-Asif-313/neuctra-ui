"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/* 🧩 Types                                                                  */
/* -------------------------------------------------------------------------- */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;

  loading?: boolean;
  loadingText?: string;

  fullWidth?: boolean;

  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";

  weight?: React.CSSProperties["fontWeight"];
  primaryColor?: string;

  className?: string;
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
      primaryColor = "#3b82f6",
      disabled,
      className,
      type = "button",
      style,
      ...rest
    },
    ref
  ) {
    const isDisabled = disabled || loading;
    const color = primaryColor;

    /* 📏 Sizes */
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    } as const;

    /* 🎨 Variants */
    const variantStyles: Record<
      NonNullable<ButtonProps["variant"]>,
      React.CSSProperties
    > = {
      default: {
        backgroundColor: color,
        color: "#fff",
      },
      outline: {
        border: `1px solid ${color}`,
        color,
        backgroundColor: "transparent",
      },
      ghost: {
        color,
        backgroundColor: "transparent",
      },
    };

    /* 🔘 Icon sizes */
    const iconSizes = {
      sm: 16,
      md: 20,
      lg: 24,
    } as const;

    const iconStyle: React.CSSProperties = {
      width: iconSizes[size],
      height: iconSizes[size],
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0, // ✅ prevents icon collapse
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-lg",
          "transition-all duration-200",
          sizeClasses[size],
          fullWidth && "w-full",
          isDisabled && "opacity-60 cursor-not-allowed pointer-events-none",
          className
        )}
        style={{
          fontWeight: weight,
          ...variantStyles[variant],
          ...style,
        }}
        {...rest}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span
              className="border-2 border-current border-t-transparent rounded-full animate-spin"
              style={{
                width: iconSizes[size],
                height: iconSizes[size],
                flexShrink: 0,
              }}
            />
            <span>{loadingText}</span>
          </span>
        ) : (
          <>
            {iconBefore && <span style={iconStyle}>{iconBefore}</span>}

            <span className="whitespace-nowrap">{children}</span>

            {iconAfter && <span style={iconStyle}>{iconAfter}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";