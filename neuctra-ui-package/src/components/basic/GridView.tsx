import React, { useState, useEffect, useMemo } from "react";

type ScreenSize = "sm" | "md" | "lg";

export interface GridProps {
  columns?: number | Partial<Record<ScreenSize, number>>; // responsive column config
  gap?: number | string; // grid gap
  padding?: number | string;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyItems?: "start" | "center" | "end" | "stretch";
  backgroundColor?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  margin?: number | string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

const getScreenSize = (width: number): ScreenSize => {
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  return "lg";
};

export const GridView: React.FC<GridProps> = ({
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 16,
  padding = 0,
  alignItems = "stretch",
  justifyItems = "stretch",
  backgroundColor = "transparent",
  width = "100%",
  maxWidth = "100%",
  height = "auto",
  margin = 0,
  style,
  className = "",
  children,
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("lg");

  useEffect(() => {
    setScreenSize(getScreenSize(window.innerWidth));
    const onResize = () => setScreenSize(getScreenSize(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const resolvedColumns = useMemo(() => {
    if (typeof columns === "number") return columns;
    return columns[screenSize] ?? 1;
  }, [columns, screenSize]);

  const styles: React.CSSProperties = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${resolvedColumns}, 1fr)`,
      gap: typeof gap === "number" ? `${gap}px` : gap,
      padding: typeof padding === "number" ? `${padding}px` : padding,
      margin: typeof margin === "number" ? `${margin}px` : margin,
      alignItems,
      justifyItems,
      backgroundColor,
      width,
      maxWidth,
      height,
      boxSizing: "border-box",
      ...style,
    }),
    [
      resolvedColumns,
      gap,
      padding,
      margin,
      alignItems,
      justifyItems,
      backgroundColor,
      width,
      maxWidth,
      height,
      style,
    ]
  );

  return (
    <div style={styles} className={className}>
      {children}
    </div>
  );
};
