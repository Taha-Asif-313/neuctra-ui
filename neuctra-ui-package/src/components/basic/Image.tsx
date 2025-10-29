import React, { useMemo, useCallback } from "react";

interface ImageProps {
  /** Image source URL */
  src?: string;
  /** Alternative text (for SEO + accessibility) */
  alt?: string;
  /** Optional title attribute (SEO hint tooltip) */
  title?: string;
  /** Custom width and height */
  width?: string | number;
  height?: string | number;
  /** Border customization */
  borderRadius?: string | number;
  borderColor?: string;
  borderStyle?: "solid" | "dashed" | "dotted" | "double" | "none";
  borderWidth?: string | number;
  /** Shadow customization */
  shadow?: boolean;
  boxShadow?: string;
  /** Opacity and fit options */
  opacity?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  /** Overlay and icon layers */
  overlayText?: string;
  overlayColor?: string;
  svgIcon?: React.ReactNode;
  /** Layout and responsiveness */
  responsive?: boolean;
  padding?: string | number;
  margin?: string | number;
  /** Performance */
  lazyLoad?: boolean;
  /** Hover interactivity */
  hoverOpacity?: number;
  hoverShadow?: boolean;
  hoverScale?: number;
  hoverRotate?: number;
  transitionDuration?: string;
  /** Overflow handling */
  overflow?: "hidden" | "scroll" | "auto" | "visible" | "x" | "y";
  /** Class and style overrides */
  className?: string;
  style?: React.CSSProperties;
  /** Event handlers */
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLImageElement>) => void;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * ✅ Industry-Standard Image Component
 * - SEO & accessibility optimized
 * - Lazy loading & responsive
 * - Fully customizable styling
 * - Smooth hover transitions
 * - Overlay and SVG support
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt = "Image",
  title,
  width = "100%",
  height = "auto",
  borderRadius = "8px",
  borderColor = "transparent",
  borderStyle = "solid",
  borderWidth = "0px",
  shadow = false,
  boxShadow,
  opacity = 1,
  objectFit = "cover",
  overlayText,
  overlayColor = "rgba(0,0,0,0.5)",
  svgIcon,
  responsive = false,
  padding,
  margin,
  lazyLoad = true,
  hoverOpacity,
  hoverShadow = false,
  hoverScale = 1,
  hoverRotate = 0,
  transitionDuration = "0.3s",
  overflow = "hidden",
  className,
  style,
  onClick,
  onLoad,
  onError,
}) => {
  // ✅ Memoized base style for performance
  const baseStyle = useMemo<React.CSSProperties>(
    () => ({
      width: responsive ? "100%" : width,
      height: responsive ? "auto" : height,
      borderRadius,
      border: `${borderWidth} ${borderStyle} ${borderColor}`,
      objectFit,
      opacity,
      boxShadow: shadow
        ? boxShadow || "0 4px 12px rgba(0,0,0,0.15)"
        : "none",
      transition: `all ${transitionDuration} ease`,
      display: "block",
    }),
    [
      responsive,
      width,
      height,
      borderRadius,
      borderColor,
      borderStyle,
      borderWidth,
      objectFit,
      opacity,
      shadow,
      boxShadow,
      transitionDuration,
    ]
  );

  // ✅ Hover effects
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.currentTarget.style.opacity =
        hoverOpacity !== undefined ? hoverOpacity.toString() : "1";
      e.currentTarget.style.boxShadow = hoverShadow
        ? "0 8px 20px rgba(0,0,0,0.3)"
        : baseStyle.boxShadow || "none";
      e.currentTarget.style.transform = `scale(${hoverScale}) rotate(${hoverRotate}deg)`;
    },
    [hoverOpacity, hoverShadow, hoverScale, hoverRotate, baseStyle.boxShadow]
  );

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.opacity = baseStyle.opacity?.toString() || "1";
    e.currentTarget.style.boxShadow = baseStyle.boxShadow || "none";
    e.currentTarget.style.transform = "scale(1) rotate(0deg)";
  }, [baseStyle]);

  // ✅ Overflow control
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

  return (
    <div
      className={className}
      role="img"
      aria-label={alt}
      title={title || alt}
      onClick={onClick}
      style={{
        width: responsive ? "100%" : width,
        height: responsive ? "auto" : height,
        padding,
        margin,
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        display: "inline-block",
        transition: `all ${transitionDuration} ease`,
        ...overflowStyles,
        ...style,
      }}
    >
      {/* 🖼 SVG or Image */}
      {svgIcon ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {svgIcon}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          title={title || alt}
          loading={lazyLoad ? "lazy" : "eager"}
          style={baseStyle}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onLoad={onLoad}
          onError={onError}
          decoding="async"
          fetchPriority="high"
        />
      )}

      {/* 🩶 Optional Overlay Text */}
      {overlayText && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: overlayColor,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.1rem",
            textAlign: "center",
            padding: "1rem",
            boxSizing: "border-box",
          }}
        >
          {overlayText}
        </div>
      )}
    </div>
  );
};
