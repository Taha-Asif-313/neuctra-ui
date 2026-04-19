"use client";

import React from "react";
import clsx from "clsx";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  center?: boolean;

  /** Custom styles (framework independent) */
  style?: React.CSSProperties;

  className?: string;
  children?: React.ReactNode;
}

/** Max width mapping (Tailwind-friendly but optional) */
const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "w-full",
};

/** Padding mapping */
const paddingMap: Record<NonNullable<ContainerProps["padding"]>, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-12",
};

/**
 * 🧱 Container Component
 * - Works with Tailwind OR plain CSS
 * - Controls width & horizontal spacing only
 * - Layout should be handled via className or style
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = "full",
      padding = "none",
      center = true,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = clsx(
      className,
      "w-full box-border",
      sizeMap[size],
      paddingMap[padding],
      center && "mx-auto",
    );

    return (
      <div ref={ref} className={classes} style={{ ...style }} {...rest}>
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";

export default Container;
