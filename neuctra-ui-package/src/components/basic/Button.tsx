"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/*                                🧩 Types                                    */
/* -------------------------------------------------------------------------- */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;

  loading?: boolean;
  loadingText?: string;

  fullWidth?: boolean;

  /** 🎨 Theme */
  primaryTheme?: boolean;
  primaryColor?: string;

  /** 📏 Sizes */
  size?: "sm" | "md" | "lg";

  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                               🔘 Button                                    */
/* -------------------------------------------------------------------------- */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      iconBefore,
      iconAfter,
      loading = false,
      loadingText = "Loading...",
      fullWidth = false,

      primaryTheme = true,
      primaryColor = "#3b82f6",

      size = "md",

      disabled,
      className,
      ...props
    },
    ref
  ) => {
    /** 📏 Sizes */
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    /** 🎨 Theme styles */
    const themeClasses = primaryTheme
      ? "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 focus:ring-[var(--primary)]/30"
      : "";

    /** 🎨 Dynamic fallback for non-primary theme */
    const dynamicStyle = !primaryTheme
      ? {
          backgroundColor: primaryColor,
          color: "#fff",
        }
      : {};

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={!primaryTheme ? dynamicStyle : undefined}
        className={clsx(
          "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-1",
          sizeClasses[size],
          themeClasses,
          fullWidth && "w-full",
          (disabled || loading) && "opacity-60 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {iconBefore && (
              <span className="flex items-center justify-center">{iconBefore}</span>
            )}
            <span>{children}</span>
            {iconAfter && (
              <span className="flex items-center justify-center">{iconAfter}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";