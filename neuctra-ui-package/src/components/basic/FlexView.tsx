import React from "react";
import clsx from "clsx";

type ScreenSize = "sm" | "md" | "lg";
type ResponsiveValue<T> = T | Partial<Record<ScreenSize, T>>;

interface FlexViewProps {
  direction?: ResponsiveValue<"row" | "column" | "row-reverse" | "column-reverse">;
  align?: ResponsiveValue<"start" | "end" | "center" | "stretch" | "baseline">;
  justify?: ResponsiveValue<"start" | "end" | "center" | "between" | "around" | "evenly">;
  wrap?: ResponsiveValue<"nowrap" | "wrap" | "wrap-reverse">;
  gap?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12>;
  padding?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12>;
  margin?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12>;
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

export const FlexView: React.FC<FlexViewProps> = ({
  direction = { sm: "column", md: "row" },
  align = "center",
  justify = "between",
  wrap = "wrap",
  gap,
  padding,
  margin,
  className,
  children,
}) => {
  const classes = clsx(
    "flex",
    toResponsiveClass("flex", direction),
    toResponsiveClass("items", align),
    toResponsiveClass("justify", justify),
    toResponsiveClass("flex", wrap), // wrap classes: flex-wrap, flex-nowrap, flex-wrap-reverse
    gap ? toResponsiveClass("gap", gap) : "",
    padding ? toResponsiveClass("p", padding) : "",
    margin ? toResponsiveClass("m", margin) : "",
    className
  );

  return <div className={classes}>{children}</div>;
};