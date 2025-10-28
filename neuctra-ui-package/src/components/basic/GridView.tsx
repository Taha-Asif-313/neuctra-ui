import React, { useState, useEffect, useMemo } from "react";

type ScreenSize = "sm" | "md" | "lg";

interface GridViewProps {
  columns?: number | Partial<Record<ScreenSize, number>>;
  gap?: string; // e.g. "16px"
  padding?: string;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyItems?: "start" | "center" | "end" | "stretch";
  backgroundColor?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const getScreenSize = (width: number): ScreenSize => {
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  return "lg";
};

export const GridView: React.FC<GridViewProps> = ({
  columns = { sm: 1, md: 2, lg: 3 },
  gap = "16px",
  padding = "20px",
  alignItems = "stretch",
  justifyItems = "stretch",
  backgroundColor = "transparent",
  width = "100%",
  maxWidth = "100%",
  height = "auto",
  children,
  style,
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

  // Resolve columns count depending on screen size
  const resolvedColumns = useMemo(() => {
    if (typeof columns === "number") return columns;
    return columns[screenSize] ?? 1;
  }, [columns, screenSize]);

  const styles: React.CSSProperties = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${resolvedColumns}, 1fr)`,
      gap,
      padding,
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
      alignItems,
      justifyItems,
      backgroundColor,
      width,
      maxWidth,
      height,
      style,
    ]
  );

  return <div style={styles}>{children}</div>;
};
