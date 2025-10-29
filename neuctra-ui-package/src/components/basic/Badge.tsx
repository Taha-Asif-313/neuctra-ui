import React, { CSSProperties, ReactNode, memo } from "react";

export interface BadgeProps {
  text?: string;
  color?: string; // background
  textColor?: string;
  borderColor?: string;
  borderWidth?: string;

  icon?: ReactNode;
  iconPosition?: "left" | "right";

  rounded?: boolean;
  borderRadius?: string;

  fontSize?: string;
  fontWeight?: number | string;

  horizontalPadding?: string;
  verticalPadding?: string;
  margin?: string;
  shadow?: string;

  notificationDot?: boolean;
  dotColor?: string;
  count?: number | string;
  pulse?: boolean;

  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = memo(
  ({
    text,
    color = "#2563eb",
    textColor = "#fff",
    borderColor = "#2563eb",
    borderWidth = "0",

    icon,
    iconPosition = "left",

    rounded = false,
    borderRadius,
    fontSize = "13px",
    fontWeight = 500,
    horizontalPadding = "10px",
    verticalPadding = "4px",
    margin = "0",
    shadow = "0 1px 3px rgba(0,0,0,0.1)",

    notificationDot = false,
    dotColor = "#ef4444",
    count,
    pulse = false,

    style,
    className = "",
    onClick,
  }) => {
    const baseStyle: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color,
      color: textColor,
      border: `${borderWidth} solid ${borderColor}`,
      borderRadius: borderRadius || (rounded ? "9999px" : "6px"),
      padding: `${verticalPadding} ${horizontalPadding}`,
      fontSize,
      fontWeight,
      margin,
      boxShadow: shadow,
      position: "relative",
      cursor: onClick ? "pointer" : "default",
      userSelect: "none",
      lineHeight: 1,
      transition: "all 0.2s ease",
      ...style,
    };

    const dotStyle: CSSProperties = {
      position: "absolute",
      top: "-4px",
      right: "-4px",
      height: "8px",
      width: "8px",
      backgroundColor: dotColor,
      borderRadius: "50%",
      animation: pulse ? "pulseAnim 1.2s infinite" : undefined,
    };

    const countStyle: CSSProperties = {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      backgroundColor: dotColor,
      color: "#fff",
      borderRadius: "50%",
      minWidth: "18px",
      height: "18px",
      fontSize: "11px",
      padding: "0 5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1,
    };

    const iconStyle: CSSProperties = {
      display: "flex",
      alignItems: "center",
      margin:
        icon && text
          ? iconPosition === "left"
            ? "0 6px 0 0"
            : "0 0 0 6px"
          : 0,
    };

    return (
      <span style={baseStyle} className={className} onClick={onClick}>
        {/* Dot */}
        {notificationDot && <span style={dotStyle} />}

        {/* Count */}
        {typeof count !== "undefined" && <span style={countStyle}>{count}</span>}

        {/* Icon Left */}
        {icon && iconPosition === "left" && <span style={iconStyle}>{icon}</span>}

        {/* Text */}
        {text && <span>{text}</span>}

        {/* Icon Right */}
        {icon && iconPosition === "right" && <span style={iconStyle}>{icon}</span>}

        {/* Pulse Animation */}
        <style>
          {`
            @keyframes pulseAnim {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.5); opacity: 0.5; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}
        </style>
      </span>
    );
  }
);
