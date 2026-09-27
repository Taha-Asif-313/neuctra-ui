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
  /** Image source URL. When omitted, the fallback content is rendered instead. */
  src?: string;
  /** Alternative text for accessibility; also used to build the clickable aria-label. */
  alt?: string;
  /** Native title attribute, shown as a tooltip on hover. */
  title?: string;

  // Layout
  /** Width of the wrapper; accepts a number/string or a responsive object. */
  width?: Responsive<number | string>;
  /** Height of the wrapper; accepts a number/string or a responsive object. */
  height?: Responsive<number | string>;
  /** Fixed width/height ratio applied via CSS aspect-ratio. */
  aspectRatio?: number;

  // Styling
  /** Border radius of the wrapper. */
  radius?: number | string;
  /** Custom CSS border value for the wrapper. */
  border?: string;
  /** Adds a soft drop shadow around the wrapper. */
  shadow?: boolean;
  /** Opacity applied to the `<img>` element. */
  opacity?: number;
  /** CSS object-fit applied to the `<img>` element. */
  objectFit?: React.CSSProperties["objectFit"];

  // Overlay
  /** Content rendered on top of the image, e.g. a caption or badge. */
  overlay?: React.ReactNode;
  /** Background color/CSS value behind the overlay content. */
  overlayColor?: string;

  // Interaction
  /** Makes the wrapper a keyboard-accessible button (role="button", Enter/Space support). */
  clickable?: boolean;
  /** Click handler; also triggered by Enter/Space when `clickable` is set. */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

  // States
  /** Content shown instead of the `<img>` when `src` is not provided; defaults to "No Image". */
  fallback?: React.ReactNode;

  // Behavior
  /** Native `<img>` loading behavior. */
  loading?: "lazy" | "eager";

  // 🔥 Full Customization
  /** Classes applied to the wrapper element. */
  className?: string;
  /** Classes applied to the `<img>` element. */
  imageClassName?: string;
  /** Classes applied to the overlay container. */
  overlayClassName?: string;
  /** Classes applied to the fallback container. */
  fallbackClassName?: string;

  /** Inline styles merged into the wrapper element's styles. */
  style?: React.CSSProperties;
  /** Inline styles merged into the `<img>` element's styles. */
  imageStyle?: React.CSSProperties;
  /** Inline styles merged into the overlay container's styles. */
  overlayStyle?: React.CSSProperties;
  /** Inline styles merged into the fallback container's styles. */
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
      overlayColor = "color-mix(in srgb, var(--background) 60%, transparent)",

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
        boxShadow: shadow ? "0 4px 12px color-mix(in srgb, var(--foreground) 15%, transparent)" : undefined,
        backgroundColor: "var(--background)",
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
      color: "var(--primary-foreground)",
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
      color: "var(--muted-foreground)",
      backgroundColor: "var(--muted)",
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