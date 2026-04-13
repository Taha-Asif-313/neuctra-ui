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

// Size maps with proper pixel values for status dots
const sizeMap: Record<Exclude<AvatarSize, "responsive">, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
};

const fontSizeMap: Record<Exclude<AvatarSize, "responsive">, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
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
  "top-left": "-top-0.5 -left-0.5",
  "top-right": "-top-0.5 -right-0.5",
  "bottom-left": "-bottom-0.5 -left-0.5",
  "bottom-right": "-bottom-0.5 -right-0.5",
};

// Get status dot size based on avatar size
const getStatusDotSize = (size: Exclude<AvatarSize, "responsive">): string => {
  const sizes: Record<Exclude<AvatarSize, "responsive">, string> = {
    xs: "w-2 h-2",
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
    xl: "w-4 h-4",
    "2xl": "w-4.5 h-4.5",
  };
  return sizes[size];
};

// Get status border width based on avatar size
const getStatusBorderWidth = (size: Exclude<AvatarSize, "responsive">): string => {
  const borders: Record<Exclude<AvatarSize, "responsive">, string> = {
    xs: "border",
    sm: "border",
    md: "border",
    lg: "border-2",
    xl: "border-[3px]",
    "2xl": "border-[3px]",
  };
  return borders[size];
};

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
  const resolvedSize = size === "responsive" ? "md" : size;

  const initials =
    fallback ||
    alt
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const statusColor = isOnline
    ? "bg-primary"
    : isOffline
      ? "bg-muted"
      : "";

  const statusDotSize = getStatusDotSize(resolvedSize);
  const statusBorderWidth = getStatusBorderWidth(resolvedSize);

  return (
    <div
      role={clickable ? "button" : "img"}
      tabIndex={clickable ? 0 : -1}
      aria-label={alt}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center 
        ${dimensionMap[resolvedSize]} 
        ${variantMap[variant]} 
        bg-background text-foreground
        transition-all duration-200 
        ${clickable ? "cursor-pointer hover:scale-105 active:scale-95" : ""} 
        ${ring ? "ring-2 ring-border ring-offset-2" : ""} 
        ${className}`}
      style={{
        ...style,
        ...(ring ? { ringColor: "hsl(var(--border))" } : {}),
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
          className={`w-full h-full object-cover ${variantMap[variant]}`}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center bg-muted text-foreground font-semibold 
            ${fontSizeMap[resolvedSize]} 
            ${variantMap[variant]}`}
        >
          {initials || <User className="w-1/2 h-1/2 text-muted-foreground" />}
        </div>
      )}

      {/* Status Dot - Now properly visible */}
      {(isOnline || isOffline) && (
        <span
          aria-label={isOnline ? "Online" : "Offline"}
          title={isOnline ? "Online" : "Offline"}
          className={`
            absolute 
            ${statusPositionMap[statusPosition]} 
            ${statusColor} 
            ${statusDotSize} 
            ${statusBorderWidth} 
            border-border 
            rounded-full 
            shadow-md 
            z-10
            ${statusClassName}
          `}
          style={{
            ...statusStyle,
          }}
        />
      )}
    </div>
  );
};

// Export additional helper for responsive sizing
export const getAvatarSize = (size: AvatarSize): number => {
  if (size === "responsive") return 40;
  return sizeMap[size];
};