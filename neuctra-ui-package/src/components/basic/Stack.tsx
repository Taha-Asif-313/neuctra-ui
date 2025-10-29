import React, { useState, useEffect, useMemo } from "react";

type ScreenSize = "sm" | "md" | "lg";
type ResponsiveValue<T> = T | Partial<Record<ScreenSize, T>>;

interface StackProps {
  direction?: ResponsiveValue<"vertical" | "horizontal">;
  gap?: ResponsiveValue<number | string>;
  align?: ResponsiveValue<"flex-start" | "flex-end" | "center" | "stretch" | "baseline">;
  justify?: ResponsiveValue<
    "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
  >;
  wrap?: ResponsiveValue<"nowrap" | "wrap" | "wrap-reverse">;
  padding?: ResponsiveValue<number | string>;
  margin?: ResponsiveValue<number | string>;
  width?: ResponsiveValue<string>;
  maxWidth?: ResponsiveValue<string>;
  height?: ResponsiveValue<string>;
  backgroundColor?: ResponsiveValue<string>;
  borderRadius?: ResponsiveValue<string>;
  border?: ResponsiveValue<string>;
  boxShadow?: ResponsiveValue<string>;
  overflow?: ResponsiveValue<"visible" | "hidden" | "auto" | "scroll">;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

const getScreenSize = (width: number): ScreenSize => {
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  return "lg";
};

const resolveResponsive = <T,>(
  prop: ResponsiveValue<T> | undefined,
  screen: ScreenSize,
  fallback?: T
): T | undefined => {
  if (prop == null) return fallback;
  if (typeof prop !== "object") return prop;
  return (prop as Partial<Record<ScreenSize, T>>)[screen] ?? fallback;
};

export const Stack: React.FC<StackProps> = ({
  direction = { sm: "vertical", md: "horizontal", lg: "horizontal" },
  gap = 12,
  align = "center",
  justify = "flex-start",
  wrap = "nowrap",
  padding,
  margin,
  width = "100%",
  maxWidth,
  height = "auto",
  backgroundColor = "transparent",
  borderRadius,
  border,
  boxShadow,
  overflow,
  className,
  style,
  children,
}) => {
  const [screen, setScreen] = useState<ScreenSize>("lg");

  useEffect(() => {
    const updateScreen = () => setScreen(getScreenSize(window.innerWidth));
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  const computedStyle = useMemo<React.CSSProperties>(() => {
    const toCssValue = (val?: string | number) =>
      typeof val === "number" ? `${val}px` : val;

    const resolvedDir = resolveResponsive(direction, screen, "vertical");
    const flexDir = resolvedDir === "vertical" ? "column" : "row";

    return {
      display: "flex",
      flexDirection: flexDir,
      alignItems: resolveResponsive(align, screen, "center"),
      justifyContent: resolveResponsive(justify, screen, "flex-start"),
      flexWrap: resolveResponsive(wrap, screen, "nowrap"),
      gap: toCssValue(resolveResponsive(gap, screen, 12)),
      padding: toCssValue(resolveResponsive(padding, screen, undefined)),
      margin: toCssValue(resolveResponsive(margin, screen, undefined)),
      width: resolveResponsive(width, screen, "100%"),
      maxWidth: resolveResponsive(maxWidth, screen, undefined),
      height: resolveResponsive(height, screen, undefined),
      backgroundColor: resolveResponsive(backgroundColor, screen, undefined),
      borderRadius: resolveResponsive(borderRadius, screen, undefined),
      border: resolveResponsive(border, screen, undefined),
      boxShadow: resolveResponsive(boxShadow, screen, undefined),
      overflow: resolveResponsive(overflow, screen, undefined),
      boxSizing: "border-box",
      ...style,
    };
  }, [
    direction,
    gap,
    align,
    justify,
    wrap,
    padding,
    margin,
    width,
    maxWidth,
    height,
    backgroundColor,
    borderRadius,
    border,
    boxShadow,
    overflow,
    style,
    screen,
  ]);

  return (
    <div className={className} style={computedStyle}>
      {children}
    </div>
  );
};



export const HStack: React.FC<StackProps> = (props) => {
  return <Stack direction="horizontal" {...props} />;
};

export const VStack: React.FC<StackProps> = (props) => {
  return <Stack direction="vertical" {...props} />;
};