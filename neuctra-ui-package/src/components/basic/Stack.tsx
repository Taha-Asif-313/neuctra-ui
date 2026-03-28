import React from "react";
import clsx from "clsx";

type ScreenSize = "sm" | "md" | "lg";
type ResponsiveValue<T> = T | Partial<Record<ScreenSize, T>>;

interface StackProps {
  direction?: ResponsiveValue<"vertical" | "horizontal">;
  gap?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12>;
  align?: ResponsiveValue<"start" | "center" | "end" | "stretch" | "baseline">;
  justify?: ResponsiveValue<"start" | "center" | "end" | "between" | "around" | "evenly">;
  wrap?: ResponsiveValue<"nowrap" | "wrap" | "wrap-reverse">;
  className?: string;
  children: React.ReactNode;
}

/**
 * Convert responsive prop to Tailwind class string
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

export const Stack: React.FC<StackProps> = ({
  direction = { sm: "vertical", md: "horizontal" },
  gap = 4,
  align = "center",
  justify = "start",
  wrap = "nowrap",
  className,
  children,
}) => {
  const classes = clsx(
    "flex",
    toResponsiveClass("flex", direction), // flex-col or flex-row
    toResponsiveClass("gap", gap),
    align !== "stretch" ? `items-${align}` : "items-stretch",
    justify !== "start" ? `justify-${justify}` : "justify-start",
    wrap !== "nowrap" ? `flex-${wrap}` : "flex-nowrap",
    className
  );

  return <div className={classes}>{children}</div>;
};

/** Shortcuts for horizontal & vertical stacks */
export const HStack: React.FC<StackProps> = (props) => (
  <Stack direction="horizontal" {...props} />
);

export const VStack: React.FC<StackProps> = (props) => (
  <Stack direction="vertical" {...props} />
);