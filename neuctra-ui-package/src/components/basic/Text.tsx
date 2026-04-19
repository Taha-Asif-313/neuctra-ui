"use client";

import React from "react";
import clsx from "clsx";

type HTMLElementTag = keyof HTMLElementTagNameMap;

export type TextProps<T extends HTMLElementTag = "p"> = {
  as?: T;
  children: React.ReactNode;

  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  weight?: 400 | 500 | 600 | 700;
  align?: "left" | "center" | "right";
  transform?: "uppercase" | "lowercase" | "capitalize";

  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  truncate?: boolean;

  color?: "default" | "muted" | "primary" | string;

  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "className">;

/* ------------------ MAPS ------------------ */

const sizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const weightMap = {
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold",
};

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const transformMap = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};

const colorMap: Record<string, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
};

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
  color = "default",
  className,
  ...rest
}: TextProps<T>) {
  const Element = (as || "span") as any;
  const isAnchor = Element === "a";

  return (
    <Element
      className={clsx(
        className,
        sizeMap[size],
        weightMap[weight],
        alignMap[align],
        transform && transformMap[transform],

        italic && "italic",
        underline && "underline",
        strikethrough && "line-through",

        truncate && "truncate",

        isAnchor && "text-primary hover:opacity-80 underline",

        colorMap[color] || color,
      )}
      {...(isAnchor && { rel: "noopener noreferrer" })}
      {...rest}
    >
      {children}
    </Element>
  );
}

export default Text;
