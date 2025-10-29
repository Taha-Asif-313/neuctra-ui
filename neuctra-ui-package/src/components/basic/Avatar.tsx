import React, { useState } from "react";
import { User } from "lucide-react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "responsive";
type AvatarVariant = "circular" | "rounded" | "square";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
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
  onClick?: () => void;
}

interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarSize;
  className?: string;
  style?: React.CSSProperties;
  spacing?: "tight" | "normal" | "loose";
  direction?: "left" | "right";
}

// --- Base maps ---
const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
} as const;

const fontSizeMap = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
} as const;

const statusSizeMap = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  "2xl": 16,
} as const;

// --- Helpers ---
const getVariantStyles = (variant: AvatarVariant): string => {
  switch (variant) {
    case "square":
      return "0px";
    case "rounded":
      return "8px";
    default:
      return "50%";
  }
};

const getStatusPositionStyle = (
  position: AvatarProps["statusPosition"],
  offset: number
): React.CSSProperties => {
  switch (position) {
    case "top-left":
      return { top: 2, left: 2 };
    case "top-right":
      return { top: 2, right: 2 };
    case "bottom-left":
      return { bottom: 2, left: 2 };
    default:
      return { bottom: 2, right: 2 };
  }
};

const getSpacingOffset = (spacing: AvatarGroupProps["spacing"], dim: number) => {
  switch (spacing) {
    case "tight":
      return -(dim * 0.5);
    case "loose":
      return -(dim * 0.15);
    default:
      return -(dim * 0.35);
  }
};

// --- Avatar Component ---
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User avatar",
  size = "md",
  variant = "circular",
  isOnline = false,
  isOffline = false,
  className = "",
  style,
  statusClassName = "",
  statusStyle,
  statusPosition = "bottom-right",
  fallback,
  ring = false,
  ringColor = "#3b82f6",
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isResponsive = size === "responsive";
  const dimension = !isResponsive ? sizeMap[size as Exclude<AvatarSize, "responsive">] : undefined;
  const fontSize = !isResponsive ? fontSizeMap[size as Exclude<AvatarSize, "responsive">] : "clamp(10px, 2vw, 16px)";
  const statusSize = !isResponsive ? statusSizeMap[size as Exclude<AvatarSize, "responsive">] : 10;
  const borderRadius = getVariantStyles(variant);

  const initials = fallback || alt
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const statusColor = isOnline ? "#10b981" : isOffline ? "#6b7280" : "";
  const statusLabel = isOnline ? "Online" : isOffline ? "Offline" : "";

  const showImage = src && !imageError;
  const clickable = !!onClick;

  return (
    <div
      className={className}
      role={clickable ? "button" : "img"}
      tabIndex={clickable ? 0 : -1}
      aria-label={alt}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        position: "relative",
        width: isResponsive ? "100%" : dimension,
        height: isResponsive ? "100%" : dimension,
        borderRadius,
        overflow: "visible",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        cursor: clickable ? "pointer" : "default",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered && clickable ? "scale(1.05)" : "scale(1)",
        boxShadow: ring
          ? `0 0 0 3px ${ringColor}22, 0 0 0 1px ${ringColor}`
          : isHovered && clickable
          ? "0 6px 16px rgba(0, 0, 0, 0.15)"
          : "0 1px 3px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            fontSize,
            fontWeight: 600,
            borderRadius,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {initials || <User size={dimension ? dimension * 0.5 : 20} />}
        </div>
      )}

      {(isOnline || isOffline) && (
        <div
          className={statusClassName}
          aria-label={statusLabel}
          title={statusLabel}
          style={{
            position: "absolute",
            width: statusSize,
            height: statusSize,
            borderRadius: "50%",
            backgroundColor: statusColor,
            border: "2px solid white",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
            ...getStatusPositionStyle(statusPosition, statusSize),
            ...statusStyle,
          }}
        />
      )}
    </div>
  );
};

// --- AvatarGroup Component ---
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = "md",
  className = "",
  style,
  spacing = "normal",
  direction = "left",
}) => {
  const isResponsive = size === "responsive";
  const dimension = !isResponsive ? sizeMap[size as Exclude<AvatarSize, "responsive">] : 40;
  const fontSize = !isResponsive ? fontSizeMap[size as Exclude<AvatarSize, "responsive">] : "clamp(10px, 2vw, 14px)";
  const spacingOffset = getSpacingOffset(spacing, dimension);
  const visibleAvatars = avatars.slice(0, max);
  const extraCount = avatars.length - max;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: direction === "right" ? "row-reverse" : "row",
        flexWrap: "wrap",
        ...style,
      }}
      role="group"
      aria-label={`Avatar group with ${avatars.length} members`}
    >
      {visibleAvatars.map((avatar, i) => {
        const isFirst = direction === "left" ? i === 0 : i === visibleAvatars.length - 1;
        const zIndex = direction === "left" ? visibleAvatars.length - i : i + 1;

        return (
          <div
            key={i}
            style={{
              marginLeft: direction === "left" && !isFirst ? spacingOffset : 0,
              marginRight: direction === "right" && !isFirst ? spacingOffset : 0,
              zIndex,
              position: "relative",
              transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `translateY(-3px) scale(1.05)`;
              e.currentTarget.style.zIndex = "100";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.zIndex = zIndex.toString();
            }}
          >
            <Avatar {...avatar} size={size} />
          </div>
        );
      })}

      {extraCount > 0 && (
        <div
          style={{
            marginLeft: direction === "left" ? spacingOffset : 0,
            marginRight: direction === "right" ? spacingOffset : 0,
            width: dimension,
            height: dimension,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
            color: "#374151",
            fontSize,
            fontWeight: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "3px solid white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            userSelect: "none",
          }}
          title={`${extraCount} more members`}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
};
