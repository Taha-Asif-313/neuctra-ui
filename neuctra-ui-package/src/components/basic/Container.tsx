import React from "react";
import clsx from "clsx";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps {
  size?: ContainerSize;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  center?: boolean;
  className?: string;
  children: React.ReactNode;
}

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "w-full",
};

const paddingMap: Record<NonNullable<ContainerProps["padding"]>, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-12",
};

/**
 * 🧱 Container Component
 * Fully responsive, Tailwind-first layout wrapper
 */
export const Container: React.FC<ContainerProps> = ({
  size = "lg",
  padding = "md",
  center = true,
  className = "",
  children,
}) => {
  const classes = clsx(
    "w-full box-border",
    sizeMap[size],
    paddingMap[padding],
    center && "mx-auto",
    className
  );

  return <div className={classes}>{children}</div>;
};

export default Container;