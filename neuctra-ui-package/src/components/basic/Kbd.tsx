"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: "sm" | "md";
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { children, size = "md", className, ...rest },
  ref,
) {
  return (
    <kbd
      ref={ref}
      className={cn(
        // align-middle: an inline-flex box otherwise sits on the text
        // baseline and hangs visibly low next to the surrounding words.
        "inline-flex items-center justify-center align-middle whitespace-nowrap select-none",
        "rounded-md border border-border bg-muted font-mono font-medium leading-none text-muted-foreground",
        // Key-cap depth: a solid bottom shadow instead of border-b-2, which in
        // the same color as the other borders just looked lopsided.
        "shadow-[0_2px_0_0_var(--border)]",
        size === "sm" ? "min-w-5 h-5 px-1 text-[10px]" : "min-w-6 h-6 px-1.5 text-xs",
        className,
      )}
      {...rest}
    >
      {children}
    </kbd>
  );
});

Kbd.displayName = "Kbd";
