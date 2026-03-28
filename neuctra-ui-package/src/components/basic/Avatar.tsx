"use client";

import React, { useState, CSSProperties } from "react";
import { User } from "lucide-react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "responsive";
type AvatarVariant = "circular" | "rounded" | "square";
type StatusPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  isOnline?: boolean;
  isOffline?: boolean;
  ring?: boolean;
  ringColor?: string;
  fallback?: string;
  onClick?: () => void;
  statusPosition?: StatusPosition;
  className?: string;
  statusClassName?: string;
  style?: CSSProperties;
  statusStyle?: CSSProperties;
}

// --- Base maps ---
const sizeMap: Record<Exclude<AvatarSize, "responsive">, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
};

const fontSizeMap: Record<Exclude<AvatarSize, "responsive">, string> = {
  xs: "text-[10px]",
  sm: "text-[12px]",
  md: "text-[14px]",
  lg: "text-[16px]",
  xl: "text-[18px]",
  "2xl": "text-[20px]",
};

const dimensionMap: Record<Exclude<AvatarSize, "responsive">, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-14 h-14",
  "2xl": "w-16 h-16",
};

const variantMap: Record<AvatarVariant, string> = {
  circular: "rounded-full",
  rounded: "rounded-lg",
  square: "rounded-none",
};

const statusPositionMap: Record<StatusPosition, string> = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

// --- Avatar Component ---
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User avatar",
  size = "md",
  variant = "circular",
  isOnline = false,
  isOffline = false,
  fallback,
  ring = false,
  ringColor = "#3b82f6",
  onClick,
  statusPosition = "bottom-right",
  className = "",
  statusClassName = "",
  style,
  statusStyle,
}) => {
  const [imageError, setImageError] = useState(false);
  const clickable = !!onClick;

  const initials =
    fallback ||
    alt
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const statusColor = isOnline ? "bg-green-500" : isOffline ? "bg-gray-400" : "";

  // Width/height for inline styles
  const dimensionPx = sizeMap[size as Exclude<AvatarSize, "responsive">];

  return (
    <div
      role={clickable ? "button" : "img"}
      tabIndex={clickable ? 0 : -1}
      aria-label={alt}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-hidden ${dimensionMap[size as Exclude<AvatarSize, "responsive">]} ${variantMap[variant]} transition-all duration-200 ${
        clickable ? "cursor-pointer hover:scale-105" : ""
      } ${ring ? "ring-2" : ""} ${className}`}
      style={{
        ...style,
        ...(ring ? { boxShadow: `0 0 0 2px ${ringColor}` } : {}),
      }}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover ${variantMap[variant]} transition-opacity duration-300`}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center bg-gradient-to-tr from-purple-500 to-blue-500 text-white font-semibold ${fontSizeMap[size as Exclude<AvatarSize, "responsive">]} ${variantMap[variant]}`}
        >
          {initials || <User className="text-white" />}
        </div>
      )}

      {(isOnline || isOffline) && (
        <span
          aria-label={isOnline ? "Online" : "Offline"}
          title={isOnline ? "Online" : "Offline"}
          className={`absolute ${statusPositionMap[statusPosition]} ${statusColor} border-2 border-white rounded-full shadow-sm ${statusClassName}`}
          style={{
            width: dimensionPx / 3,
            height: dimensionPx / 3,
            ...statusStyle,
          }}
        />
      )}
    </div>
  );
};