"use client";

import React, { forwardRef, useMemo } from "react";

/* -------------------------------------------------------------------------- */
/* 🧩 Types                                                                  */
/* -------------------------------------------------------------------------- */

type Responsive<T> =
  | T
  | {
      base?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
    };

export interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  title?: string;

  /** Layout */
  width?: Responsive<number | string>;
  height?: Responsive<number | string>;
  aspectRatio?: number;

  /** Styling */
  radius?: number | string;
  border?: string;
  shadow?: boolean;
  opacity?: number;
  objectFit?: React.CSSProperties["objectFit"];

  /** Overlay */
  overlay?: React.ReactNode;
  overlayColor?: string;

  /** Interaction */
  clickable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

  /** States */
  fallback?: React.ReactNode;

  /** Behavior */
  loading?: "lazy" | "eager";

  /** 🔥 Full Customization */
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  fallbackClassName?: string;

  style?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  fallbackStyle?: React.CSSProperties;
}

/* -------------------------------------------------------------------------- */
/* 🛠 Utility                                                                 */
/* -------------------------------------------------------------------------- */

const resolveResponsive = <T,>(
  value: Responsive<T> | undefined
): T | undefined => {
  if (!value) return undefined;
  if (typeof value !== "object" || !("base" in value)) return value as T;
  return value.base;
};

/* -------------------------------------------------------------------------- */
/* 🖼 Image Component                                                         */
/* -------------------------------------------------------------------------- */

export const Image = forwardRef<HTMLDivElement, ImageProps>(
  (props, ref) => {
    const {
      src,
      alt = "",
      title,
      width = "100%",
      height,
      aspectRatio,
      radius,
      border,
      shadow,
      opacity = 1,
      objectFit = "cover",

      overlay,
      overlayColor = "rgba(0,0,0,0.4)",

      clickable,
      onClick,

      fallback,
      loading = "lazy",

      className,
      imageClassName,
      overlayClassName,
      fallbackClassName,

      style,
      imageStyle,
      overlayStyle,
      fallbackStyle,

      ...rest
    } = props;

    const resolvedWidth = resolveResponsive(width);
    const resolvedHeight = resolveResponsive(height);

    /* Wrapper styles */
    const wrapperStyles: React.CSSProperties = useMemo(
      () => ({
        width: resolvedWidth,
        height: resolvedHeight,
        aspectRatio,
        borderRadius: radius,
        border,
        overflow: "hidden",
        position: "relative",
        display: "inline-block",
        cursor: clickable ? "pointer" : undefined,
        boxShadow: shadow ? "0 4px 12px rgba(0,0,0,0.15)" : undefined,
        ...style,
      }),
      [
        resolvedWidth,
        resolvedHeight,
        aspectRatio,
        radius,
        border,
        shadow,
        clickable,
        style,
      ]
    );

    /* Image styles */
    const imageStyles: React.CSSProperties = {
      width: "100%",
      height: "100%",
      objectFit,
      opacity,
      display: "block",
      ...imageStyle,
    };

    /* Overlay styles */
    const overlayStyles: React.CSSProperties = {
      position: "absolute",
      inset: 0,
      background: overlayColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      ...overlayStyle,
    };

    /* Fallback styles */
    const fallbackStyles: React.CSSProperties = {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      ...fallbackStyle,
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!clickable) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.(e as any);
      }
    };

    return (
      <div
        ref={ref}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-label={alt}
        title={title}
        onClick={clickable ? onClick : undefined}
        onKeyDown={handleKeyDown}
        style={wrapperStyles}
        className={className}
        {...rest}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={loading}
            style={imageStyles}
            className={imageClassName}
          />
        ) : (
          <div style={fallbackStyles} className={fallbackClassName}>
            {fallback || "No Image"}
          </div>
        )}

        {overlay && (
          <div style={overlayStyles} className={overlayClassName}>
            {overlay}
          </div>
        )}
      </div>
    );
  }
);

Image.displayName = "Image";