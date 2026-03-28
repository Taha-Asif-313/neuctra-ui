"use client";

import React, { useMemo } from "react";

interface ImageProps {
  src?: string;
  alt?: string;
  title?: string;
  /** Tailwind width/height classes or numbers */
  width?: string | number;
  height?: string | number;
  /** Tailwind rounded classes */
  rounded?: string;
  borderColor?: string;
  borderWidth?: string | number;
  shadow?: boolean;
  opacity?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  overlayText?: string;
  overlayColor?: string;
  svgIcon?: React.ReactNode;
  responsive?: boolean;
  p?: string;
  m?: string;
  /** Hover Effects */
  hoverScale?: number;
  hoverRotate?: number;
  hoverOpacity?: number;
  hoverShadow?: boolean;
  transitionDuration?: string;
  overflow?: "hidden" | "scroll" | "auto" | "visible" | "x" | "y";
  /** Custom Tailwind classes */
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement | HTMLImageElement>) => void;
  onLoad?: () => void;
  onError?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = "Image",
  title,
  width = "w-full",
  height = "h-auto",
  rounded = "rounded-lg",
  borderColor = "transparent",
  borderWidth = "0",
  shadow = false,
  opacity = 1,
  objectFit = "cover",
  overlayText,
  overlayColor = "rgba(0,0,0,0.5)",
  svgIcon,
  responsive = false,
  p,
  m,
  hoverScale = 1.05,
  hoverRotate = 0,
  hoverOpacity,
  hoverShadow = false,
  transitionDuration = "300ms",
  overflow = "hidden",
  className = "",
  style,
  onClick,
  onLoad,
  onError,
}) => {
  /** Base Tailwind classes */
  const baseClasses = useMemo(() => {
    const classes = [
      "relative inline-block transition-all",
      shadow ? "shadow-md" : "",
      rounded,
      p ?? "",
      m ?? "",
      responsive ? "w-full h-auto" : "",
      className,
    ];
    return classes.join(" ");
  }, [shadow, rounded, p, m, responsive, className]);

  /** Inline styles for custom widths, hover, borders, etc. */
  const inlineStyles: React.CSSProperties = useMemo(
    () => ({
      width: typeof width === "number" ? width : undefined,
      height: typeof height === "number" ? height : undefined,
      objectFit,
      opacity,
      borderColor,
      borderWidth,
      transition: `all ${transitionDuration} ease`,
      ...style,
    }),
    [width, height, objectFit, opacity, borderColor, borderWidth, transitionDuration, style]
  );

  /** Overflow handling */
  const overflowStyles: React.CSSProperties = useMemo(() => {
    switch (overflow) {
      case "x":
        return { overflowX: "hidden" };
      case "y":
        return { overflowY: "hidden" };
      default:
        return { overflow };
    }
  }, [overflow]);

  /** Hover effects */
  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    if (hoverOpacity !== undefined) e.currentTarget.style.opacity = hoverOpacity.toString();
    e.currentTarget.style.transform = `scale(${hoverScale}) rotate(${hoverRotate}deg)`;
    if (hoverShadow) e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.opacity = opacity.toString();
    e.currentTarget.style.transform = "scale(1) rotate(0deg)";
    if (hoverShadow) e.currentTarget.style.boxShadow = "";
  };

  return (
    <div
      role="img"
      aria-label={alt}
      title={title || alt}
      onClick={onClick}
      className={baseClasses}
      style={{ position: "relative", cursor: onClick ? "pointer" : "default", ...overflowStyles }}
    >
      {/* SVG fallback */}
      {svgIcon ? (
        <div className="w-full h-full flex items-center justify-center">{svgIcon}</div>
      ) : (
        <img
          src={src}
          alt={alt}
          title={title || alt}
          loading="lazy"
          style={inlineStyles}
          className="block"
          onLoad={onLoad}
          onError={onError}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      {/* Overlay */}
      {overlayText && (
        <div
          style={{ backgroundColor: overlayColor }}
          className="absolute inset-0 flex items-center justify-center text-white font-bold text-center p-4"
        >
          {overlayText}
        </div>
      )}
    </div>
  );
};