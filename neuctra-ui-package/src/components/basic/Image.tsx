import React from "react";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  borderColor?: string;
  borderStyle?: "solid" | "dashed" | "dotted" | "double" | "none";
  borderWidth?: string;
  shadow?: boolean;
  boxShadow?: string;
  opacity?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  overlayText?: string;
  overlayColor?: string;
  svgIcon?: React.ReactNode;
  responsive?: boolean;
  padding?: string;
  margin?: string;
  lazyLoad?: boolean;
  hoverOpacity?: number;
  hoverShadow?: boolean;
  hoverScale?: number;
  hoverRotate?: number;
  transitionDuration?: string;
  overflow?: "hidden" | "scroll" | "auto" | "visible" | "x" | "y";
  className?: string;
  style?: React.CSSProperties;
 onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLImageElement>) => void;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = "Image",
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
  overlayColor = "rgba(0, 0, 0, 0.5)",
  svgIcon,
  responsive = false,
  padding,
  margin,
  lazyLoad = false,
  hoverOpacity,
  hoverShadow = false,
  hoverScale,
  hoverRotate,
  transitionDuration = "0.3s",
  overflow = "hidden",
  className,
  style,
  onClick,
}) => {
  const baseImageStyle: React.CSSProperties = {
    width: responsive ? "100%" : width,
    height: responsive ? "100%" : height,
    borderRadius,
    border: `${borderWidth} ${borderStyle} ${borderColor}`,
    objectFit,
    opacity,
    boxShadow: shadow
      ? boxShadow || "0 4px 12px rgba(0,0,0,0.15)"
      : "none",
    transition: `all ${transitionDuration} ease`,
    display: "block",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.opacity =
      hoverOpacity !== undefined
        ? hoverOpacity.toString()
        : baseImageStyle.opacity?.toString() || "1";
    e.currentTarget.style.boxShadow = hoverShadow
      ? "0 8px 20px rgba(0,0,0,0.3)"
      : baseImageStyle.boxShadow?.toString() || "none";
    e.currentTarget.style.transform = `scale(${hoverScale || 1}) rotate(${hoverRotate || 0}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.opacity = baseImageStyle.opacity?.toString() || "1";
    e.currentTarget.style.boxShadow = baseImageStyle.boxShadow?.toString() || "none";
    e.currentTarget.style.transform = "scale(1) rotate(0deg)";
  };

  const overflowStyles: React.CSSProperties = (() => {
    switch (overflow) {
      case "x":
        return { overflowX: "hidden" };
      case "y":
        return { overflowY: "hidden" };
      default:
        return { overflow };
    }
  })();

  return (
    <div
      role="img"
      aria-label={alt}
      onClick={onClick}
      className={className}
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
        ...style, // Allow external override
      }}
    >
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
          loading={lazyLoad ? "lazy" : "eager"}
          style={baseImageStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      {overlayText && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: overlayColor,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.25rem",
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
