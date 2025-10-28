import React, { useState, useEffect, useMemo } from "react";

type ScreenSize = "sm" | "md" | "lg";

interface FlexboxProps {
  // direction can be a single value or responsive object with 3 breakpoints
  direction?: "row" | "column" | Partial<Record<ScreenSize, "row" | "column">>;

  // simple flexbox alignment
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";

  gap?: number | string; // px or any CSS length unit
  padding?: number | string;
  backgroundColor?: string;
  width?: string;
  maxWidth?: string;
  height?: string;

  style?: React.CSSProperties;
  children: React.ReactNode;
}

const getScreenSize = (width: number): ScreenSize => {
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  return "lg";
};

export const Flexbox: React.FC<FlexboxProps> = ({
  direction = "row",
  align = "center",
  justify = "space-between",
  gap = 16,
  padding = 20,
  backgroundColor = "transparent",
  width = "100%",
  maxWidth = "100%",
  height = "auto",
  style,
  children,
}) => {
const [screenSize, setScreenSize] = useState<ScreenSize>("lg"); // default for SSR

useEffect(() => {
  // Set initial screen size on client
  setScreenSize(getScreenSize(window.innerWidth));

  // Listen for resize
  const onResize = () => setScreenSize(getScreenSize(window.innerWidth));
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);

  // Resolve direction based on screen size if responsive, else use fixed
  const resolvedDirection = useMemo(() => {
    if (typeof direction === "string") return direction;
    return direction[screenSize] ?? "row";
  }, [direction, screenSize]);

  const styles: React.CSSProperties = useMemo(
    () => ({
      display: "flex",
      flexDirection: resolvedDirection,
      alignItems: align,
      justifyContent: justify,
      gap: typeof gap === "number" ? `${gap}px` : gap,
      padding: typeof padding === "number" ? `${padding}px` : padding,
      backgroundColor,
      width,
      maxWidth,
      height,
      boxSizing: "border-box",
      ...style,
    }),
    [
      resolvedDirection,
      align,
      justify,
      gap,
      padding,
      backgroundColor,
      width,
      maxWidth,
      height,
      style,
    ]
  );

  return <div style={styles}>{children}</div>;
};
