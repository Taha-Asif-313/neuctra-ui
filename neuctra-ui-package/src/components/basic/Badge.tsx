"use client";

import React, { memo, CSSProperties } from "react";
import clsx from "clsx";

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

    onClick,
  }) => {
    const sizes = {
      sm: "px-3 py-0.5 text-xs",
      md: "px-4 py-1 text-xs",
      lg: "px-5 py-1.5 text-sm",
    };

    const variants = {
      solid: "bg-primary text-white",
      outline: "border border-primary text-primary bg-transparent",
      soft: "bg-primary/10 text-primary",
    };

    return (
      <span
        onClick={onClick}
        style={style}
        className={clsx(
          className,
          "relative inline-flex items-center justify-center font-medium gap-1",
          "transition-all duration-200 select-none",

          variants[variant], // ✅ single source of truth

          rounded ? "rounded-full" : "rounded-md",
          sizes[size],

          onClick &&
            "cursor-pointer " +
              (variant === "solid"
                ? "hover:bg-accent/80"
                : variant === "outline"
                  ? "hover:bg-primary/10"
                  : "hover:bg-primary/20"),
        )}
      >
        {/* Dot */}
        {notificationDot && (
          <span
            style={dotStyle}
            className={clsx(
              dotClassName,
              "absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive",
              pulse && "animate-ping",
            )}
          />
        )}

        {/* Count */}
        {count !== undefined && (
          <span
            style={countStyle}
            className={clsx(
              countClassName,
              "absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 text-[10px]",
              "flex items-center justify-center rounded-full",
              "bg-destructive text-white",
            )}
          >
            {count}
          </span>
        )}

        {/* Icon Left */}
        {icon && iconPosition === "left" && (
          <span
            style={iconStyle}
            className={clsx(iconClassName, "flex items-center")}
          >
            {icon}
          </span>
        )}

        {/* Text */}
        {text && <span>{text}</span>}

        {/* Icon Right */}
        {icon && iconPosition === "right" && (
          <span
            style={iconStyle}
            className={clsx(iconClassName, "flex items-center")}
          >
            {icon}
          </span>
        )}
      </span>
    );
  },
);

Badge.displayName = "Badge";
