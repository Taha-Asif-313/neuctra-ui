import React from "react";
import clsx from "clsx";

type ScreenSize = "sm" | "md" | "lg";
type ResponsiveValue<T> = T | Partial<Record<ScreenSize, T>>;

export interface GridProps {
  columns?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6>;
  gap?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12>;
  padding?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12>;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyItems?: "start" | "center" | "end" | "stretch";
  className?: string;
  children: React.ReactNode;
}

/**
 * Converts responsive prop to Tailwind class string
 */
const toResponsiveClass = <T extends string | number>(
  prefix: string,
  value?: ResponsiveValue<T>
) => {
  if (value == null) return "";
  if (typeof value !== "object") return `${prefix}-${value}`;
  return Object.entries(value)
    .map(([bp, val]) => `${bp}:${prefix}-${val}`)
    .join(" ");
};

export const GridView: React.FC<GridProps> = ({
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 4,
  padding = 4,
  alignItems = "stretch",
  justifyItems = "stretch",
  className,
  children,
}) => {
  const classes = clsx(
    "grid",
    toResponsiveClass("grid-cols", columns),
    toResponsiveClass("gap", gap),
    toResponsiveClass("p", padding),
    alignItems !== "stretch" ? `items-${alignItems}` : "items-stretch",
    justifyItems !== "stretch" ? `justify-items-${justifyItems}` : "justify-items-stretch",
    className
  );

  return <div className={classes}>{children}</div>;
};