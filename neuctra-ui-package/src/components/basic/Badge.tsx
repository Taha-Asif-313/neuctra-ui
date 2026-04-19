"use client";

import React, { memo, CSSProperties } from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/*                                🧩 Types                                    */
/* -------------------------------------------------------------------------- */

export interface BadgeProps {
  text?: string;

  icon?: React.ReactNode;
  iconPosition?: "left" | "right";

  /** Custom color */
  primaryColor?: string;

  /** 📏 Sizes */
  size?: "sm" | "md" | "lg";

  /** Shape */
  rounded?: boolean;

  /** Notification */
  notificationDot?: boolean;
  dotColor?: string;
  count?: number | string;
  pulse?: boolean;

  /** 🎨 Customization */
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

    size = "md",
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
    /** 📏 Sizes */
    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-xs",
      lg: "px-4 py-1.5 text-sm",
    };

    return (
      <span
        onClick={onClick}
        style={style}
        className={clsx(
          "relative inline-flex items-center justify-center gap-1 font-medium",
          "transition-all duration-200 select-none",
          "bg-accent text-primary-foreground border border-border",

          // shape
          rounded ? "rounded-full" : "rounded-md",

          // size
          sizes[size],

          // hover (shadcn-like subtle)
          onClick && "cursor-pointer hover:bg-accent/80",

          className,
        )}
      >
        {/* 🔴 Dot */}
        {notificationDot && (
          <span
            style={dotStyle}
            className={clsx(
              "absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive",
              pulse && "animate-ping",
              dotClassName,
            )}
          />
        )}

        {/* 🔢 Count */}
        {count !== undefined && (
          <span
            style={countStyle}
            className={clsx(
              "absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 text-[10px]",
              "flex items-center justify-center rounded-full",
              "bg-destructive text-primary-foreground",
              countClassName,
            )}
          >
            {count}
          </span>
        )}

        {/* Icon Left */}
        {icon && iconPosition === "left" && (
          <span
            style={iconStyle}
            className={clsx("flex items-center", iconClassName)}
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
            className={clsx("flex items-center", iconClassName)}
          >
            {icon}
          </span>
        )}
      </span>
    );
  },
);

Badge.displayName = "Badge";