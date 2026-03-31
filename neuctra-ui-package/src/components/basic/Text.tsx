"use client";

import React from "react";
import clsx from "clsx";

type HTMLElementTag = keyof HTMLElementTagNameMap;

type TextProps<T extends HTMLElementTag = "p"> = {
  as?: T;
  children: React.ReactNode;

  /** Minimal styling */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string;
  weight?: React.CSSProperties["fontWeight"];
  align?: React.CSSProperties["textAlign"];

  /** Text styles */
  transform?: "uppercase" | "lowercase" | "capitalize";
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;

  truncate?: boolean;

  className?: string;
  style?: React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLElementTagNameMap[T]>, "style">;

const sizeClasses: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const transformClasses = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};

export function Text<T extends HTMLElementTag = "p">({
  as,
  children,
  size = "md",
  weight = 400,
  align = "left",

  transform,
  italic = false,
  underline = false,
  strikethrough = false,

  truncate = false,

  className,
  style,
  ...rest
}: TextProps<T>) {
  const Element = (as || "p") as T;

  // Special default classes if it's a link
  const isLink = Element === "a";

  return React.createElement(
    Element,
    {
      className: clsx(
        sizeClasses[size] || "",
        transform && transformClasses[transform],
        italic && "italic",
        strikethrough && "line-through",
        truncate && "truncate",
        isLink ? "text-blue-600 hover:text-blue-800 underline" : underline && "underline",
        className
      ),
      style: {
        fontWeight: weight,
        textAlign: align,
        ...style,
      },
      ...rest,
    },
    children
  );
}

export default Text;