import React, { useState } from "react";
import { Circle, User } from "lucide-react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
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
  onClick?: () => void;
}

interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  style?: React.CSSProperties;
  spacing?: "tight" | "normal" | "loose";
  direction?: "left" | "right";
}

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
};

const statusSizeMap = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  "2xl": 16,
};

const fontSizeMap = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
};

const getVariantStyles = (variant: AvatarProps["variant"]) => {
  switch (variant) {
    case "square":
      return "0px";
    case "rounded":
      return "8px";
    case "circular":
    default:
      return "50%";
  }
};

const getStatusPositionStyle = (
  position: AvatarProps["statusPosition"],
  statusSize: number
): React.CSSProperties => {
  const offset = 1; // Increased negative offset to position further outside the avatar
  switch (position) {
    case "top-left":
      return { top: offset, left: offset };
    case "top-right":
      return { top: offset, right: offset };
    case "bottom-left":
      return { bottom: offset, left: offset };
    case "bottom-right":
    default:
      return { bottom: offset, right: offset };
  }
};

const getSpacingOffset = (spacing: AvatarGroupProps["spacing"], dimension: number) => {
  switch (spacing) {
    case "tight":
      return -(dimension * 0.5);
    case "loose":
      return -(dimension * 0.15);
    case "normal":
    default:
      return -(dimension * 0.35);
  }
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User Avatar",
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
  
  const dimension = sizeMap[size];
  const statusSize = statusSizeMap[size];
  const fontSize = fontSizeMap[size];
  const borderRadius = getVariantStyles(variant);

  const initials = fallback || alt.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);

  let statusColor = "";
  let statusLabel = "";
  if (isOnline) {
    statusColor = "#10b981"; // emerald-500
    statusLabel = "Online";
  } else if (isOffline) {
    statusColor = "#6b7280"; // gray-500
    statusLabel = "Offline";
  }

  const hasStatus = isOnline || isOffline;
  const showImage = src && !imageError;
  const isClickable = !!onClick;

  return (
    <div
      style={{
        position: "relative",
        width: dimension,
        height: dimension,
        borderRadius,
        overflow: "visible", // Changed from "hidden" to show status dots outside
        display: "inline-block",
        flexShrink: 0,
        cursor: isClickable ? "pointer" : "default",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered && isClickable ? "scale(1.05)" : "scale(1)",
        boxShadow: ring ? `0 0 0 3px ${ringColor}20, 0 0 0 1px ${ringColor}` : 
                   isHovered && isClickable ? "0 8px 25px -8px rgba(0, 0, 0, 0.3)" : 
                   "0 1px 3px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
      className={className}
      aria-label={alt}
      role={isClickable ? "button" : "img"}
      tabIndex={isClickable ? 0 : -1}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {showImage ? (
        <div style={{ borderRadius, overflow: "hidden", width: "100%", height: "100%" }}>
          <img
            src={src}
            alt={alt}
            width={dimension}
            height={dimension}
            loading="lazy"
            onError={() => setImageError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transition: "opacity 0.2s ease-in-out",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize,
            fontWeight: "600",
            borderRadius,
            position: "relative",
          }}
        >
          {initials ? (
            <span style={{ userSelect: "none" }}>{initials}</span>
          ) : (
            <User size={dimension * 0.5} strokeWidth={1.5} />
          )}
        </div>
      )}
      
      {hasStatus && (
        <div
          className={statusClassName}
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
          aria-label={statusLabel}
          title={statusLabel}
        />
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = "md",
  className = "",
  style,
  spacing = "normal",
  direction = "left",
}) => {
  const dimension = sizeMap[size];
  const fontSize = fontSizeMap[size];
  const visibleAvatars = avatars.slice(0, max);
  const extraCount = avatars.length - max;
  const spacingOffset = getSpacingOffset(spacing, dimension);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: direction === "right" ? "row-reverse" : "row",
        ...style,
      }}
      className={className}
      aria-label={`Avatar group with ${avatars.length} members`}
      role="group"
    >
      {visibleAvatars.map((avatarProps, i) => {
        const isFirst = direction === "left" ? i === 0 : i === visibleAvatars.length - 1;
        const zIndex = direction === "left" ? visibleAvatars.length - i : i + 1;
        
        return (
          <div
            key={i}
            style={{
              marginLeft: direction === "left" && !isFirst ? spacingOffset : 0,
              marginRight: direction === "right" && !isFirst ? spacingOffset : 0,
              position: "relative",
              zIndex,
              transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="group-hover:translate-x-1"
            onMouseEnter={(e) => {
              const element = e.currentTarget;
              element.style.transform = `translateY(-2px) ${direction === 'right' ? 'translateX(4px)' : 'translateX(-4px)'}`;
              element.style.zIndex = '100';
            }}
            onMouseLeave={(e) => {
              const element = e.currentTarget;
              element.style.transform = 'translateY(0) translateX(0)';
              element.style.zIndex = zIndex.toString();
            }}
          >
            <div
              style={{
                border: "3px solid white",
                borderRadius: getVariantStyles(avatarProps.variant || "circular"),
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Avatar
                {...avatarProps}
                size={size}
                style={{
                  boxShadow: "none",
                }}
              />
            </div>
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
            fontSize: fontSize * 0.9,
            fontWeight: "600",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "3px solid white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            userSelect: "none",
            cursor: "default",
            flexShrink: 0,
            position: "relative",
            zIndex: 0,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          aria-label={`${extraCount} more members`}
          title={`${extraCount} more members`}
          onMouseEnter={(e) => {
            const element = e.currentTarget;
            element.style.transform = 'translateY(-2px) scale(1.05)';
            element.style.background = 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)';
          }}
          onMouseLeave={(e) => {
            const element = e.currentTarget;
            element.style.transform = 'translateY(0) scale(1)';
            element.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
          }}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
};

