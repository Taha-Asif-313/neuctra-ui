"use client";

import React, { forwardRef } from "react";

import { cn } from "../../lib/cn";

export type VisuallyHiddenElement =
  | "span"
  | "div"
  | "p"
  | "label"
  | "legend"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
  /** Content kept available to screen readers but hidden visually. */
  children: React.ReactNode;
  /** Element used for the hidden wrapper. */
  as?: VisuallyHiddenElement;
  /** Associates a hidden `<label>` with a control; only used when `as="label"`. */
  htmlFor?: string;
  /** Reveals the content while it, or something inside it, has keyboard focus. */
  focusable?: boolean;
  /** Additional classes merged onto the visually-hidden styles. */
  className?: string;
  /** Inline styles for the hidden wrapper. */
  style?: React.CSSProperties;
}

export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  function VisuallyHidden(
    { children, as = "span", htmlFor, focusable = false, className, style, ...rest },
    ref,
  ) {
    const Component = as as React.ElementType;

    return (
      <Component
        ref={ref}
        htmlFor={as === "label" ? htmlFor : undefined}
        className={cn(
          "sr-only",
          focusable && "focus-within:not-sr-only focus:not-sr-only",
          className,
        )}
        style={style}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
VisuallyHidden.displayName = "VisuallyHidden";
