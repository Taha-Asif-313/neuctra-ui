import React, { CSSProperties, ReactNode } from "react";

interface BadgeProps {
  text?: string;
  color?: string;
  textColor?: string;
  borderColor?: string;

  icon?: ReactNode;
  iconPosition?: "left" | "right";

  rounded?: boolean;
  borderRadius?: string;
  borderWidth?: string;

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
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  color = "#2563eb",
  textColor = "#fff",
  borderColor = "#2563eb",

  icon,
  iconPosition = "left",

  rounded = false,
  borderRadius,
  borderWidth = "0",

  fontSize = "14px",
  fontWeight = 500,
  horizontalPadding = "10px",
  verticalPadding = "6px",
  margin = "0",
  shadow = "0 1px 4px rgba(0, 0, 0, 0.1)",

  notificationDot = false,
  dotColor = "#ef4444",
  count,
  pulse = false,

  style,
  onClick,
}) => {
  const badgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color,
    border: `${borderWidth} solid ${borderColor}`,
    borderRadius: borderRadius || (rounded ? "9999px" : "6px"),
    padding: `${verticalPadding} ${horizontalPadding}`,
    fontSize,
    fontWeight,
    margin,
    boxShadow: shadow,
    position: "relative",
    cursor: onClick ? "pointer" : "default",
    ...style,
  };

  const textStyle: CSSProperties = {
    color: textColor,
    display: "inline",
  };

  const iconStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    color: textColor,
  };

  const iconLeftStyle: CSSProperties = {
    ...iconStyle,
    marginRight: text ? "6px" : "0px",
  };

  const iconRightStyle: CSSProperties = {
    ...iconStyle,
    marginLeft: text ? "6px" : "0px",
  };

  const countStyle: CSSProperties = {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    backgroundColor: "#ef4444",
    color: "#fff",
    borderRadius: "50%",
    minWidth: "20px",
    height: "20px",
    fontSize: "12px",
    padding: "0 6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    zIndex: 1,
  };

  const dotStyle: CSSProperties = {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    height: "8px",
    width: "8px",
    backgroundColor: dotColor,
    borderRadius: "50%",
    zIndex: 1,
    animation: pulse ? "pulseAnim 1.2s infinite" : undefined,
  };

  return (
    <span style={badgeStyle} onClick={onClick}>
      {/* Notification Dot */}
      {notificationDot && <span style={dotStyle}></span>}

      {/* Notification Count */}
      {typeof count !== "undefined" && <span style={countStyle}>{count}</span>}

      {/* Icon Left */}
      {icon && iconPosition === "left" && (
        <span style={iconLeftStyle}>{icon}</span>
      )}

      {/* Text */}
      {text && <span style={textStyle}>{text}</span>}

      {/* Icon Right */}
      {icon && iconPosition === "right" && (
        <span style={iconRightStyle}>{icon}</span>
      )}

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
};
