import React, { useState } from "react";
import { User } from "lucide-react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "responsive";
  variant?: "circular" | "rounded" | "square";
  isOnline?: boolean;
  isOffline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  statusClassName?: string;
  statusStyle?: React.CSSProperties;
  statusPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  fallback?: string;
  ring?: boolean;
  ringColor?: string;
  ringSize?: number;
  onClick?: () => void;
}

interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarProps["size"];
  spacing?: "tight" | "normal" | "loose";
  direction?: "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
};

const fontSizeMap = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
};

const getVariantRadius = (variant?: string) =>
  variant === "square" ? "0px" : variant === "rounded" ? "10px" : "50%";

const getStatusPosition = (pos: AvatarProps["statusPosition"]) => {
  const base = 1;
  return {
    topLeft: { top: base, left: base },
    topRight: { top: base, right: base },
    bottomLeft: { bottom: base, left: base },
    bottomRight: { bottom: base, right: base },
  }[
    (pos || "bottom-right").replace("-", "") as
      | "topLeft"
      | "topRight"
      | "bottomLeft"
      | "bottomRight"
  ];
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User avatar",
  size = "md",
  variant = "circular",
  isOnline,
  isOffline,
  className = "",
  style,
  statusClassName,
  statusStyle,
  statusPosition = "bottom-right",
  fallback,
  ring,
  ringColor = "#3b82f6",
  ringSize = 2,
  onClick,
}) => {
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(false);

  const dimension = size === "responsive" ? "100%" : `${sizeMap[size]}px`;
  const fontSize =
    size === "responsive" ? "clamp(10px, 1vw, 18px)" : `${fontSizeMap[size]}px`;

  const initials =
    fallback ||
    alt
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const statusColor = isOnline
    ? "#10b981"
    : isOffline
    ? "#6b7280"
    : undefined;

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: dimension,
        height: dimension,
        borderRadius: getVariantRadius(variant),
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        transform: hover && onClick ? "scale(1.05)" : "none",
        boxShadow: ring
          ? `0 0 0 ${ringSize}px ${ringColor}`
          : hover && onClick
          ? "0 4px 12px rgba(0,0,0,0.15)"
          : "0 1px 3px rgba(0,0,0,0.1)",
        ...style,
      }}
      role={onClick ? "button" : "img"}
      tabIndex={onClick ? 0 : -1}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: getVariantRadius(variant),
            transition: "opacity 0.2s ease-in-out",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899, #f87171)",
            color: "#fff",
            fontWeight: 600,
            fontSize,
            userSelect: "none",
            borderRadius: getVariantRadius(variant),
          }}
        >
          {initials || <User size={18} />}
        </div>
      )}

      {statusColor && (
        <span
          className={statusClassName}
          style={{
            position: "absolute",
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: statusColor,
            border: "2px solid #fff",
            boxShadow: "0 0 4px rgba(0,0,0,0.15)",
            ...getStatusPosition(statusPosition),
            ...statusStyle,
          }}
        />
      )}
    </div>
  );
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = "md",
  spacing = "normal",
  direction = "left",
  className = "",
  style,
}) => {
const dimension = size === "responsive" ? "100%" : sizeMap[size as keyof typeof sizeMap] ?? 40;
  const offset =
    spacing === "tight"
      ? -dimension * 0.5
      : spacing === "loose"
      ? -dimension * 0.15
      : -dimension * 0.3;

  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: direction === "right" ? "row-reverse" : "row",
        alignItems: "center",
        ...style,
      }}
    >
      {visible.map((a, i) => (
        <div
          key={i}
          style={{
            marginLeft: direction === "left" && i > 0 ? offset : 0,
            marginRight: direction === "right" && i > 0 ? offset : 0,
            position: "relative",
            zIndex: visible.length - i,
            transition: "transform 0.2s ease",
          }}
        >
          <Avatar {...a} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          style={{
            width: dimension,
            height: dimension,
            borderRadius: "50%",
            background: "#f3f4f6",
            color: "#374151",
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid white",
            userSelect: "none",
            marginLeft: offset,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarGroup };
