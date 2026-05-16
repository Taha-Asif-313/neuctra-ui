"use client";

import React from "react";
import clsx from "clsx";

type HTMLElementTag = keyof HTMLElementTagNameMap;

export type TextProps<T extends HTMLElementTag = "span"> = {
  as?: T;
  children: React.ReactNode;

  transform?: "uppercase" | "lowercase" | "capitalize";

  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  truncate?: boolean;

  color?: "default" | "muted" | "primary" | string;

  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "className">;

/* ------------------ MAPS ------------------ */

const transformMap = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};

const colorMap: Record<string, string> = {
  default: "text-foreground",
  primary: "text-primary",
  muted: "text-muted-foreground",
};

/* ------------------ COMPONENT ------------------ */

export function Text<T extends HTMLElementTag = "span">({
  as,
  children,
  transform,
  italic,
  underline,
  strikethrough,
  truncate,
  color = "default",
  className,
  ...rest
}: TextProps<T>) {
  const Element = (as || "p") as any;
  const isAnchor = Element === "a";

  return (
    <Element
      className={clsx(
        className,

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