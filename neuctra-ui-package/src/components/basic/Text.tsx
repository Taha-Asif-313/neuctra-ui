import React, { CSSProperties, JSX, useMemo } from "react";

interface TextProps {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;

  // Style
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: "normal" | "bold" | "lighter" | "bolder" | number;
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  lineHeight?: string;
  letterSpacing?: string;
  maxWidth?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  boxShadow?: string;
  shadowColor?: string;
  wordBreak?: "normal" | "break-word" | "break-all" | "keep-all";

  // Text styles
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  selectable?: boolean;
  truncate?: boolean;

  // Hover & Active
  hoverColor?: string;
  hoverBgColor?: string;
  hoverTextDecoration?: "underline" | "line-through" | "none";
  activeColor?: string;
  activeBgColor?: string;
  transitionDuration?: string;

  // Interaction
  onClick?: () => void;

  // Link support
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
}

export const Text: React.FC<TextProps> = ({
  as: Tag = "p",
  children,
  className = "",
  href,
  target,
  rel,

  // Style
  color = "#333",
  bgColor,
  fontSize = "16px",
  fontWeight = "normal",
  textAlign = "left",
  textTransform = "none",
  lineHeight = "normal",
  letterSpacing = "normal",
  maxWidth,
  padding,
  margin,
  borderRadius,
  boxShadow,
  shadowColor = "rgba(0,0,0,0.1)",
  wordBreak = "normal",

  // Text styles
  italic = false,
  bold = false,
  underline = false,
  strikethrough = false,
  selectable = true,
  truncate = false,

  // Hover & Active
  hoverColor,
  hoverBgColor,
  hoverTextDecoration,
  activeColor,
  activeBgColor,
  transitionDuration = "0.25s",

  // Event
  onClick,
}) => {
  const textDecoration = useMemo(() => {
    const decorations = [];
    if (underline) decorations.push("underline");
    if (strikethrough) decorations.push("line-through");
    return decorations.join(" ") || "none";
  }, [underline, strikethrough]);

  const style: CSSProperties = {
    color,
    backgroundColor: bgColor || "transparent",
    fontSize,
    fontWeight: bold ? "bold" : fontWeight,
    textAlign,
    textTransform,
    lineHeight,
    letterSpacing,
    maxWidth,
    padding,
    margin,
    borderRadius,
    textDecoration,
    fontStyle: italic ? "italic" : "normal",
    wordBreak,
    boxShadow: boxShadow
      ? boxShadow
      : shadowColor
      ? `0 1px 4px ${shadowColor}`
      : undefined,
    cursor: onClick || href ? "pointer" : "default",
    userSelect: selectable ? "text" : "none",
    transition: `all ${transitionDuration} ease-in-out`,
    overflow: truncate ? "hidden" : undefined,
    whiteSpace: truncate ? "nowrap" : undefined,
    textOverflow: truncate ? "ellipsis" : undefined,
  };

  // Fix: Accept all elements by using Element instead of HTMLElement
  const handleMouseEnter = (e: React.MouseEvent<Element>) => {
    const el = e.currentTarget as HTMLElement;
    if (hoverColor) el.style.color = hoverColor;
    if (hoverBgColor) el.style.backgroundColor = hoverBgColor;
    if (hoverTextDecoration) el.style.textDecoration = hoverTextDecoration;
  };

  const handleMouseLeave = (e: React.MouseEvent<Element>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.color = color;
    el.style.backgroundColor = bgColor || "transparent";
    el.style.textDecoration = textDecoration;
  };

  const handleMouseDown = (e: React.MouseEvent<Element>) => {
    const el = e.currentTarget as HTMLElement;
    if (activeColor) el.style.color = activeColor;
    if (activeBgColor) el.style.backgroundColor = activeBgColor;
  };

  const handleMouseUp = (e: React.MouseEvent<Element>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.color = hoverColor || color;
    el.style.backgroundColor = hoverBgColor || bgColor || "transparent";
  };

  const commonProps = {
    className,
    style,
    onClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };

  if (Tag === "a" || href) {
    return (
      <a
        {...commonProps}
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
      >
        {children}
      </a>
    );
  }

  return <Tag {...commonProps}>{children}</Tag>;
};
