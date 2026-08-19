"use client";

import React, { memo, CSSProperties } from "react";
import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/*                                🧩 Types                                    */
/* -------------------------------------------------------------------------- */

export interface BadgeProps {
  text?: string;

  variant?: "solid" | "outline" | "soft";

  icon?: React.ReactNode;
  iconPosition?: "left" | "right";

  size?: "sm" | "md" | "lg";

  rounded?: boolean;

  notificationDot?: boolean;
  dotColor?: string;
  count?: number | string;
  pulse?: boolean;

  className?: string;
  style?: CSSProperties;
  dotClassName?: string;
  dotStyle?: CSSProperties;
  countClassName?: string;
  countStyle?: CSSProperties;
  iconClassName?: string;
  iconStyle?: CSSProperties;
  textClassName?: string;
  textStyle?: CSSProperties;

  onClick?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                🏷 Badge                                    */
/* -------------------------------------------------------------------------- */

export const Badge: React.FC<BadgeProps> = memo(
  ({
    text,
    icon,
    iconPosition = "left",
    variant = "solid",
    size = "sm",
    rounded = true,

    notificationDot = false,
    count,
    pulse = false,

    className,
    style,
    dotClassName,
    dotStyle,
    countClassName,
    countStyle,
    iconClassName,
    iconStyle,
    textClassName,
    textStyle,

    onClick,
  }) => {
    const sizes = {
      sm: "px-2.5 py-0.5 text-[11px] gap-1",
      md: "px-3 py-1 text-xs gap-1.5",
      lg: "px-4 py-1.5 text-sm gap-2",
    } as const;

    // The icon slot has to scale with the size too — otherwise a `lg` badge
    // renders the same icon box as an `sm` one.
    const iconSizes = {
      sm: "w-3 h-3",
      md: "w-3.5 h-3.5",
      lg: "w-4 h-4",
    } as const;

    const variants = {
      // text-primary-foreground, not text-white — a light --primary (the
      // README's own example is a bright green) fails contrast against white.
      solid: "bg-primary text-primary-foreground",
      outline: "border border-primary text-primary bg-transparent",
      soft: "bg-primary/10 text-primary",
    } as const;

    const isInteractive = Boolean(onClick);

    return (
      <span
        onClick={onClick}
        // A clickable badge has to be reachable and operable by keyboard.
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        style={style}
        className={cn(
          "relative inline-flex items-center justify-center font-medium",
          "transition-all duration-200 select-none",

          variants[variant] ?? variants.solid,

          rounded ? "rounded-full" : "rounded-md",
          sizes[size] ?? sizes.sm,

          isInteractive &&
            "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
              // Hover stays within the variant's own color ramp.
              (variant === "solid"
                ? "hover:bg-primary/90"
                : variant === "outline"
                  ? "hover:bg-primary/10"
                  : "hover:bg-primary/20"),

          className,
        )}
      >
        {/* Dot — suppressed when a count is shown, since both sit in the same
            corner and would overlap. */}
        {notificationDot && count === undefined && (
          <span
            aria-hidden="true"
            style={dotStyle}
            className={cn(
              "absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive",
              // animate-ping scales the dot to 2x and fades it out, so on its
              // own the dot vanishes. Render the ping as a sibling ring and
              // keep a solid dot underneath.
              pulse &&
                "before:absolute before:inset-0 before:rounded-full before:bg-destructive before:animate-ping motion-reduce:before:animate-none",
              dotClassName,
            )}
          />
        )}

        {/* Count */}
        {count !== undefined && (
          <span
            role="status"
            style={countStyle}
            className={cn(
              "absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 text-[10px]",
              "flex items-center justify-center rounded-full",
              "bg-destructive text-destructive-foreground",
              countClassName,
            )}
          >
            {count}
          </span>
        )}

        {/* Icon Left */}
        {icon && iconPosition === "left" && (
          <span
            aria-hidden="true"
            style={iconStyle}
            className={cn(
              "flex items-center shrink-0 [&_svg]:w-full [&_svg]:h-full",
              iconSizes[size] ?? iconSizes.sm,
              iconClassName,
            )}
          >
            {icon}
          </span>
        )}

        {/* Text */}
        {text && (
          <span style={textStyle} className={cn(textClassName)}>
            {text}
          </span>
        )}

        {/* Icon Right */}
        {icon && iconPosition === "right" && (
          <span
            aria-hidden="true"
            style={iconStyle}
            className={cn(
              "flex items-center shrink-0 [&_svg]:w-full [&_svg]:h-full",
              iconSizes[size] ?? iconSizes.sm,
              iconClassName,
            )}
          >
            {icon}
          </span>
        )}
      </span>
    );
  },
);

Badge.displayName = "Badge";
