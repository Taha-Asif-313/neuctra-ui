"use client";

import React from "react";
import clsx from "clsx";

type HTMLElementTag = keyof HTMLElementTagNameMap;

type Breakpoints = {
  base?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
};

type Responsive<T> = T | Breakpoints;

type TextProps<T extends HTMLElementTag = "p"> = {
  as?: T;
  children: React.ReactNode;

  /** Tailwind size key or custom value (px, rem, etc) */
  size?: Responsive<string>;
  weight?: Responsive<number | string>;
  align?: Responsive<"left" | "center" | "right">;
  transform?: Responsive<"uppercase" | "lowercase" | "capitalize">;

  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  truncate?: boolean | number;

  darkMode?: boolean;
  color?: "default" | "muted" | "primary" | string;

  className?: string;
  style?: React.CSSProperties;
} & Omit<React.ComponentPropsWithoutRef<T>, "style" | "className">;

/* ------------------ MAPS ------------------ */

const sizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const weightMap: Record<number, string> = {
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold",
};

const transformMap = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};

const colorMap: Record<string, string> = {
  default: "text-black dark:text-white",
  muted: "text-gray-500 dark:text-gray-400",
  primary: "text-blue-600 dark:text-blue-400",
};

/* ------------------ RESOLVER ------------------ */

function resolveResponsive<T>(
  value: Responsive<T> | undefined,
  map?: Record<any, string>,
  fallbackProp?: keyof React.CSSProperties,
): { className: string; style: React.CSSProperties } {
  if (!value) return { className: "", style: {} };

  if (typeof value !== "object") {
    const cls = map?.[value as any];
    return {
      className: cls || "",
      style: !cls && fallbackProp ? { [fallbackProp]: value } : {},
    };
  }

  const classes: string[] = [];
  const styles: React.CSSProperties = {};

  Object.entries(value).forEach(([bp, val]) => {
    const cls = map?.[val as any];
    if (cls) {
      classes.push(bp === "base" ? cls : `${bp}:${cls}`);
    } else if (bp === "base" && fallbackProp) {
      styles[fallbackProp] = val as any;
    }
  });

  return { className: classes.join(" "), style: styles };
}

/* ------------------ COMPONENT ------------------ */

export function Text<T extends HTMLElementTag = "p">({
  as,
  children,
  size = "md",
  weight = 400,
  align = "left",
  transform,
  italic,
  underline,
  strikethrough,
  truncate,
  darkMode = false,
  color = "default",
  className,
  style,
  ...rest
}: TextProps<T>) {
  const Element = (as || "span") as any;

  // ✅ pass fallbackProp="fontSize" to allow custom px/rem sizes
  const sizeRes = resolveResponsive(size, sizeMap, "fontSize");
  const alignRes = resolveResponsive(align, alignMap);
  const weightRes = resolveResponsive(weight, weightMap, "fontWeight");
  const transformRes = resolveResponsive(transform, transformMap);

  const isAnchor = Element === "a";

  const truncateStyles =
    typeof truncate === "number"
      ? {
          display: "-webkit-box",
          WebkitLineClamp: truncate,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }
      : truncate
        ? {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }
        : {};

  const resolvedColor = colorMap[color] || color;

  return (
    <Element
      className={clsx(
        sizeRes.className,
        alignRes.className,
        weightRes.className,
        transformRes.className,
        italic && "italic",
        strikethrough && "line-through",
        underline && !isAnchor && "underline",
        isAnchor && "text-blue-600 hover:opacity-80 underline",
        resolvedColor,
        className,
      )}
      style={{
        ...truncateStyles,
        ...sizeRes.style,
        ...alignRes.style,
        ...weightRes.style,
        ...transformRes.style,
        ...style,
      }}
      {...(isAnchor && { rel: "noopener noreferrer" })}
      {...rest}
    >
      {children}
    </Element>
  );
}

export default Text;
