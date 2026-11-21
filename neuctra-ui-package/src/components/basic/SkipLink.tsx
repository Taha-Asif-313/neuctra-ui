"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface SkipLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Id of the element that receives focus when the link is activated. */
  targetId?: string;
  /** Link text; defaults to "Skip to content". */
  children?: React.ReactNode;
  /**
   * How the revealed link is positioned. `"fixed"` pins it to the viewport's
   * top-left corner; `"absolute"` pins it to the nearest positioned ancestor.
   */
  position?: "fixed" | "absolute";
  /** Additional classes for the link. */
  className?: string;
  /** Inline styles for the link. */
  style?: React.CSSProperties;
}

const NATIVELY_FOCUSABLE = /^(A|BUTTON|INPUT|SELECT|TEXTAREA|SUMMARY)$/;

/** Keyboard-only shortcut that jumps focus past navigation to the main region. */
export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(
  function SkipLink(
    {
      targetId = "main-content",
      children = "Skip to content",
      position = "fixed",
      href,
      onClick,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      // Non-interactive targets (e.g. <main>) ignore focus() without a tabindex.
      if (
        !target.hasAttribute("tabindex") &&
        !NATIVELY_FOCUSABLE.test(target.tagName)
      ) {
        target.setAttribute("tabindex", "-1");
      }
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start" });
      window.history?.replaceState?.(null, "", `#${targetId}`);
    };

    return (
      <a
        ref={ref}
        href={href ?? `#${targetId}`}
        onClick={handleClick}
        className={cn(
          "sr-only focus:not-sr-only focus:left-4 focus:top-4 focus:z-50",
          position === "absolute" ? "focus:absolute" : "focus:fixed",
          "focus:inline-flex focus:items-center focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2",
          "focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
          className,
        )}
        style={style}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

SkipLink.displayName = "SkipLink";
