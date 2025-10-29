import React, { useMemo } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps {
  /** Predefined max-width based on common breakpoints */
  size?: ContainerSize;

  /** Padding (accepts number in px or CSS string, e.g., '2rem') */
  padding?: number | string;

  /** Margin (accepts number in px or CSS string, e.g., 'auto' or '16px 8px') */
  margin?: number | string;

  /** Background color (any valid CSS color) */
  backgroundColor?: string;

  /** Center the container horizontally (adds `margin: 0 auto`) */
  center?: boolean;

  /** Custom width override (defaults to container max width) */
  width?: string;

  /** Optional height */
  height?: string;

  /** Border radius (accepts number in px or CSS string) */
  borderRadius?: number | string;

  /** Additional inline styles */
  style?: React.CSSProperties;

  /** Tailwind or custom class names */
  className?: string;

  /** Container content */
  children: React.ReactNode;
}

/** Tailwind-like container widths */
const containerWidths: Record<ContainerSize, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  full: "100%",
};

/**
 * 🧱 Container Component
 * A flexible, responsive layout wrapper inspired by Tailwind's container.
 */
export const Container: React.FC<ContainerProps> = ({
  size = "lg",
  padding = 0,
  margin = "0 auto",
  backgroundColor = "transparent",
  center = true,
  width,
  height = "auto",
  borderRadius = 0,
  style,
  className = "",
  children,
}) => {
  const styles = useMemo<React.CSSProperties>(() => {
    const computedPadding =
      typeof padding === "number" ? `${padding}px` : padding;

    const computedMargin =
      center && margin === "0 auto" ? "0 auto" : margin;

    const computedBorderRadius =
      typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;

    return {
      maxWidth: width ?? containerWidths[size],
      margin: computedMargin,
      padding: computedPadding,
      backgroundColor,
      height,
      borderRadius: computedBorderRadius,
      boxSizing: "border-box",
      width: width ?? "100%",
      ...style,
    };
  }, [
    size,
    padding,
    margin,
    backgroundColor,
    width,
    height,
    borderRadius,
    center,
    style,
  ]);

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};

export default Container;
