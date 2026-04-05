"use client";

import React, { memo } from "react";
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

  className?: string;
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

    primaryColor = "var(--primary)",

    size = "md",
    rounded = true,

    notificationDot = false,
    dotColor = "#ef4444",
    count,
    pulse = false,

    className,
    onClick,
  }) => {
    /** 📏 Sizes */
    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-xs",
      lg: "px-4 py-1.5 text-sm",
    };

    const dynamicStyle = {
      backgroundColor: primaryColor,
      color: "#fff",
    };

    return (
      <span
        onClick={onClick}
        style={dynamicStyle}
        className={clsx(
          "relative inline-flex items-center justify-center gap-1 font-medium",
          "transition-all duration-200 select-none",
          rounded ? "rounded-full" : "rounded-md",
          sizes[size],
          onClick && "cursor-pointer hover:opacity-90",
          className
        )}
      >
        {/* 🔴 Dot */}
        {notificationDot && (
          <span
            style={{ backgroundColor: dotColor }}
            className={clsx(
              "absolute -top-1 -right-1 w-2 h-2 rounded-full",
              pulse && "animate-ping"
            )}
          />
        )}

        {/* 🔢 Count */}
        {count !== undefined && (
          <span
            style={{ backgroundColor: dotColor }}
            className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 text-[10px] flex items-center justify-center rounded-full text-white"
          >
            {count}
          </span>
        )}

        {/* Icon Left */}
        {icon && iconPosition === "left" && (
          <span className="flex items-center">{icon}</span>
        )}

        {/* Text */}
        {text && <span>{text}</span>}

        {/* Icon Right */}
        {icon && iconPosition === "right" && (
          <span className="flex items-center">{icon}</span>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";