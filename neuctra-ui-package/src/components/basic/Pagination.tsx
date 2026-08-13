"use client";

import React, { forwardRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/cn";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Current page, 1-based. */
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  /** How many pages to show on each side of the current page. */
  siblingCount?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const SIZES = {
  sm: "h-7 min-w-7 px-1 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-9 min-w-9 px-1.5 text-sm [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-11 min-w-11 px-2 text-base [&_svg]:h-5 [&_svg]:w-5",
} as const;

/** Builds the visible page list: 1 … siblings around current … last. */
const buildRange = (
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis-l" | "ellipsis-r")[] => {
  // Everything fits without ellipses.
  const maxVisible = siblingCount * 2 + 5;
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const start = Math.max(page - siblingCount, 1);
  const end = Math.min(page + siblingCount, totalPages);
  const showLeftEllipsis = start > 2;
  const showRightEllipsis = end < totalPages - 1;

  const middle: number[] = [];
  for (
    let i = showLeftEllipsis ? start : 1;
    i <= (showRightEllipsis ? end : totalPages);
    i++
  ) {
    middle.push(i);
  }

  return [
    ...(showLeftEllipsis ? [1, "ellipsis-l" as const] : []),
    ...middle,
    ...(showRightEllipsis ? ["ellipsis-r" as const, totalPages] : []),
  ];
};

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      page,
      totalPages,
      onPageChange,
      siblingCount = 1,
      size = "md",
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) {
    if (totalPages < 1) return null;

    const clampedPage = Math.min(Math.max(page, 1), totalPages);
    const items = buildRange(clampedPage, totalPages, Math.max(siblingCount, 0));
    const sizeClasses = SIZES[size] ?? SIZES.md;

    const go = (next: number) => {
      if (disabled) return;
      const target = Math.min(Math.max(next, 1), totalPages);
      if (target !== clampedPage) onPageChange?.(target);
    };

    const baseButton = cn(
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-40",
      sizeClasses,
    );

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        // flex-wrap: long ranges fold to a second row on narrow screens
        // instead of overflowing the container.
        className={cn("flex flex-wrap items-center gap-1", className)}
        {...rest}
      >
        <button
          type="button"
          aria-label="Previous page"
          disabled={disabled || clampedPage <= 1}
          onClick={() => go(clampedPage - 1)}
          className={cn(baseButton, "text-muted-foreground hover:bg-accent hover:text-foreground")}
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        {items.map((item) =>
          typeof item !== "number" ? (
            <span
              key={item}
              aria-hidden="true"
              className={cn(
                "inline-flex items-center justify-center text-muted-foreground",
                sizeClasses,
              )}
            >
              <MoreHorizontal />
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === clampedPage ? "page" : undefined}
              disabled={disabled}
              onClick={() => go(item)}
              className={cn(
                baseButton,
                "tabular-nums",
                item === clampedPage
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="Next page"
          disabled={disabled || clampedPage >= totalPages}
          onClick={() => go(clampedPage + 1)}
          className={cn(baseButton, "text-muted-foreground hover:bg-accent hover:text-foreground")}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
