import React, { useMemo } from "react";

/** 🎯 Limit to only HTML elements to avoid SVG union explosion */
type HTMLElementTag = keyof HTMLElementTagNameMap;

type TextProps<T extends HTMLElementTag = "p"> = {
  as?: T;
  children: React.ReactNode;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string;
  weight?: React.CSSProperties["fontWeight"];
  align?: React.CSSProperties["textAlign"];
  transform?: React.CSSProperties["textTransform"];
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  truncate?: boolean;
  selectable?: boolean;
  hoverable?: boolean;
  darkMode?: boolean;
  baseColor?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
} & Omit<React.HTMLAttributes<HTMLElementTagNameMap[HTMLElementTag]>, "color" | "style">;

/** 🎨 Utility: generate lighter/darker shades */
function adjustColor(color: string, amount: number): string {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (hex) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(hex, 16) + amount)).toString(16)
        ).slice(-2)
      )
  );
}

/** 🌈 Default color palettes */
const defaultColors = {
  light: {
    default: "#111",
    primary: "#2563eb",
    secondary: "#64748b",
    success: "#16a34a",
    danger: "#dc2626",
    white: "#ffffff",
    muted: "#6b7280",
  },
  dark: {
    default: "#f8fafc",
    primary: "#60a5fa",
    secondary: "#94a3b8",
    success: "#22c55e",
    danger: "#f87171",
    white: "#ffffff",
    muted: "#9ca3af",
  },
};

/** 💬 Main Component (HTML-only tags) */
export function Text<T extends HTMLElementTag = "p">({
  as,
  children,
  color = "default",
  size = "md",
  weight = "normal",
  align = "left",
  transform = "none",
  italic = false,
  underline = false,
  strikethrough = false,
  truncate = false,
  selectable = true,
  hoverable = false,
  onClick,
  darkMode = false,
  baseColor,
  className = "",
  style = {},
  ...rest
}: TextProps<T>) {
  // element type as provided (constrained to HTML tags)
  const Element = (as || ("p" as T)) as T;

  /** 🎨 Dynamic color palette generation */
  const theme = useMemo(() => {
    if (!baseColor) return defaultColors[darkMode ? "dark" : "light"];

    const lightMode = {
      default: "#111",
      primary: baseColor,
      secondary: adjustColor(baseColor, -50),
      success: adjustColor(baseColor, -30),
      danger: "#dc2626",
      white: "#ffffff",
      muted: "#6b7280",
    };
    const darkModeTheme = {
      default: "#f8fafc",
      primary: adjustColor(baseColor, 80),
      secondary: adjustColor(baseColor, 120),
      success: adjustColor(baseColor, 100),
      danger: "#f87171",
      white: "#ffffff",
      muted: "#9ca3af",
    };
    return darkMode ? darkModeTheme : lightMode;
  }, [baseColor, darkMode]);

  /** 📏 Font sizes */
  const sizes: Record<string, string> = {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
  };

  /** 💅 Computed styles */
  const computedStyle: React.CSSProperties = {
    color: (theme as any)[color] || color,
    fontSize: sizes[size] || size,
    fontWeight: weight,
    textAlign: align,
    textTransform: transform,
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : strikethrough ? "line-through" : "none",
    userSelect: selectable ? "text" : "none",
    overflow: truncate ? "hidden" : undefined,
    whiteSpace: truncate ? "nowrap" : undefined,
    textOverflow: truncate ? "ellipsis" : undefined,
    cursor: onClick ? "pointer" : "default",
    transition: "all 0.25s ease-in-out",
    ...style,
  };

  /** 🧠 Hover events (narrow to HTMLElement at runtime) */
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!hoverable) return;
    const target = e.currentTarget;
    if (target instanceof HTMLElement) {
      target.style.opacity = "0.8";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!hoverable) return;
    const target = e.currentTarget;
    if (target instanceof HTMLElement) {
      target.style.opacity = "1";
    }
  };

  /**
   * Build props object. We cast only once to the correct intrinsic props type.
   * This prevents TypeScript from having to compute giant unions for event types.
   */
  const props = {
    className,
    style: computedStyle,
    onClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...rest,
  } as React.ComponentPropsWithoutRef<T>;

  // Use React.createElement to avoid JSX generic complexity
  return React.createElement(Element as any, props, children);
}

export default Text;
