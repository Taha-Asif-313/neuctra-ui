import React, { useState, useEffect, useMemo, CSSProperties } from "react";

type ScreenSize = "sm" | "md" | "lg";

type ResponsiveProp<T> = T | Partial<Record<ScreenSize, T>>;

interface ContainerProps {
  display?: ResponsiveProp<"block" | "flex" | "grid" | "inline-block">;
  flexDirection?: ResponsiveProp<
    "row" | "column" | "row-reverse" | "column-reverse"
  >;
  justifyContent?: ResponsiveProp<
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
  >;
  alignItems?: ResponsiveProp<
    "flex-start" | "center" | "flex-end" | "stretch" | "baseline"
  >;
  gridTemplateColumns?: ResponsiveProp<string>;
  gridTemplateRows?: ResponsiveProp<string>;
  gap?: ResponsiveProp<string>;
  rowGap?: ResponsiveProp<string>;
  columnGap?: ResponsiveProp<string>;
  width?: ResponsiveProp<string>;
  maxWidth?: ResponsiveProp<string>;
  height?: ResponsiveProp<string>;
  padding?: ResponsiveProp<string>;
  margin?: ResponsiveProp<string>;
  textAlign?: ResponsiveProp<"left" | "center" | "right">;
  backgroundColor?: string;
  border?: ResponsiveProp<string>;
  borderRadius?: ResponsiveProp<string>;
  boxShadow?: ResponsiveProp<string>;
  overflow?: ResponsiveProp<"visible" | "hidden" | "scroll" | "auto">;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

function resolveResponsive<T>(
  prop: ResponsiveProp<T> | undefined,
  screenSize: ScreenSize,
  defaultValue?: T
): T | undefined {
  if (prop == null) return defaultValue;
  if (typeof prop !== "object") return prop as T;
  return (prop as Partial<Record<ScreenSize, T>>)[screenSize] ?? defaultValue;
}

const getScreenSize = (width: number): ScreenSize => {
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  return "lg";
};

export const Container: React.FC<ContainerProps> = ({
  display = { sm: "block", md: "flex", lg: "grid" },
  flexDirection = { sm: "column", md: "row", lg: "row" },
  justifyContent = { sm: "flex-start", md: "center", lg: "space-between" },
  alignItems = { sm: "stretch", md: "center", lg: "center" },
  gridTemplateColumns = { sm: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" },
  gridTemplateRows = { sm: "auto", md: "auto", lg: "auto" },
  gap = { sm: "10px", md: "20px", lg: "30px" },
  rowGap,
  columnGap,
  width = { sm: "100%", md: "90%", lg: "80%" },
  maxWidth = { sm: "100%", md: "800px", lg: "1200px" },
  height = { sm: "auto", md: "auto", lg: "auto" },
  padding = { sm: "10px", md: "20px", lg: "40px" },
  margin = { sm: "0 auto", md: "0 auto", lg: "0 auto" },
  textAlign = { sm: "left", md: "center", lg: "center" },
  backgroundColor = "#fff",
  border = { sm: "none", md: "1px solid #ddd", lg: "2px solid #ccc" },
  borderRadius = { sm: "0", md: "8px", lg: "12px" },
  boxShadow = {
    sm: "none",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 6px 10px rgba(0,0,0,0.15)",
  },
  overflow = { sm: "visible", md: "hidden", lg: "auto" },
  children,
  className,
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

  const resolvedStyles = useMemo<CSSProperties>(() => {
    const resolvedDisplay = resolveResponsive(display, screenSize, "block");
    const resolvedFlexDirection = resolveResponsive(
      flexDirection,
      screenSize,
      undefined
    );
    const resolvedJustifyContent = resolveResponsive(
      justifyContent,
      screenSize,
      undefined
    );
    const resolvedAlignItems = resolveResponsive(
      alignItems,
      screenSize,
      undefined
    );
    const resolvedGridTemplateColumns = resolveResponsive(
      gridTemplateColumns,
      screenSize,
      undefined
    );
    const resolvedGridTemplateRows = resolveResponsive(
      gridTemplateRows,
      screenSize,
      undefined
    );
    const resolvedGap = resolveResponsive(gap, screenSize, undefined);
    const resolvedRowGap = resolveResponsive(rowGap, screenSize, undefined);
    const resolvedColumnGap = resolveResponsive(
      columnGap,
      screenSize,
      undefined
    );
    const resolvedWidth = resolveResponsive(width, screenSize, "100%");
    const resolvedMaxWidth = resolveResponsive(maxWidth, screenSize, undefined);
    const resolvedHeight = resolveResponsive(height, screenSize, undefined);
    const resolvedPadding = resolveResponsive(padding, screenSize, undefined);
    const resolvedMargin = resolveResponsive(margin, screenSize, undefined);
    const resolvedTextAlign = resolveResponsive(
      textAlign,
      screenSize,
      undefined
    );
    const resolvedBorder = resolveResponsive(border, screenSize, undefined);
    const resolvedBorderRadius = resolveResponsive(
      borderRadius,
      screenSize,
      undefined
    );
    const resolvedBoxShadow = resolveResponsive(
      boxShadow,
      screenSize,
      undefined
    );
    const resolvedOverflow = resolveResponsive(overflow, screenSize, undefined);

    return {
      display: resolvedDisplay,
      ...(resolvedFlexDirection && { flexDirection: resolvedFlexDirection }),
      ...(resolvedJustifyContent && { justifyContent: resolvedJustifyContent }),
      ...(resolvedAlignItems && { alignItems: resolvedAlignItems }),
      ...(resolvedGridTemplateColumns && {
        gridTemplateColumns: resolvedGridTemplateColumns,
      }),
      ...(resolvedGridTemplateRows && {
        gridTemplateRows: resolvedGridTemplateRows,
      }),
      ...(resolvedGap && { gap: resolvedGap }),
      ...(resolvedRowGap && { rowGap: resolvedRowGap }),
      ...(resolvedColumnGap && { columnGap: resolvedColumnGap }),
      width: resolvedWidth,
      ...(resolvedMaxWidth && { maxWidth: resolvedMaxWidth }),
      ...(resolvedHeight && { height: resolvedHeight }),
      ...(resolvedPadding && { padding: resolvedPadding }),
      ...(resolvedMargin && { margin: resolvedMargin }),
      ...(resolvedTextAlign && { textAlign: resolvedTextAlign }),
      backgroundColor,
      ...(resolvedBorder && { border: resolvedBorder }),
      ...(resolvedBorderRadius && { borderRadius: resolvedBorderRadius }),
      ...(resolvedBoxShadow && { boxShadow: resolvedBoxShadow }),
      ...(resolvedOverflow && { overflow: resolvedOverflow }),
      boxSizing: "border-box",
      ...style,
    };
  }, [
    screenSize,
    display,
    flexDirection,
    justifyContent,
    alignItems,
    gridTemplateColumns,
    gridTemplateRows,
    gap,
    rowGap,
    columnGap,
    width,
    maxWidth,
    height,
    padding,
    margin,
    textAlign,
    backgroundColor,
    border,
    borderRadius,
    boxShadow,
    overflow,
    style,
  ]);

  return (
    <div className={className} style={resolvedStyles}>
      {children}
    </div>
  );
};
