"use client";

import React from "react";
import clsx from "clsx";

type HTMLElementTag = keyof HTMLElementTagNameMap;

export type TextProps<T extends HTMLElementTag = "span"> = {
  /** Element/tag to render (e.g. "p", "span", "h1", "a"). Defaults to "p". */
  as?: T;
  /** Content rendered inside the element. */
  children: React.ReactNode;

  /** CSS text-transform to apply. */
  transform?: "uppercase" | "lowercase" | "capitalize";

  /** Renders the text in italics. */
  italic?: boolean;
  /** Adds an underline decoration. */
  underline?: boolean;
  /** Adds a line-through (strikethrough) decoration. */
  strikethrough?: boolean;
  /** Truncates overflowing text to a single line with an ellipsis. */
  truncate?: boolean;

  /** Named theme color, or any custom Tailwind/CSS class string. */
  color?: "default" | "muted" | "primary" | string;

  /** Additional classes merged onto the rendered element. */
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