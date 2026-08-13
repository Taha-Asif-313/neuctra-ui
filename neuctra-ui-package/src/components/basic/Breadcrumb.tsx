"use client";

import React, { forwardRef } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/cn";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  /** SPA navigation hook — called instead of full page loads when provided. */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export interface BreadcrumbProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  /** Collapse the middle into an ellipsis when there are more items than this. */
  maxItems?: number;
  size?: "sm" | "md";
}

const SIZES = {
  sm: { text: "text-xs", icon: "[&_svg]:h-3 [&_svg]:w-3", sep: "h-3 w-3" },
  md: { text: "text-sm", icon: "[&_svg]:h-3.5 [&_svg]:w-3.5", sep: "h-3.5 w-3.5" },
} as const;

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    { items, separator, maxItems, size = "md", className, ...rest },
    ref,
  ) {
    const sizes = SIZES[size] ?? SIZES.md;

    // Keep the first item and the trailing (maxItems - 1); an ellipsis marks
    // the collapsed middle.
    let visible: (BreadcrumbItem | "ellipsis")[] = items;
    if (maxItems && maxItems >= 2 && items.length > maxItems) {
      visible = [
        items[0],
        "ellipsis",
        ...items.slice(items.length - (maxItems - 1)),
      ];
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("min-w-0", className)}
        {...rest}
      >
        <ol className={cn("flex flex-wrap items-center gap-1.5", sizes.text)}>
          {visible.map((item, i) => {
            if (item === "ellipsis") {
              return (
                <li
                  key="ellipsis"
                  className="flex items-center gap-1.5 text-muted-foreground"
                >
                  <MoreHorizontal
                    aria-hidden="true"
                    className={sizes.sep}
                  />
                  <ChevronRight aria-hidden="true" className={cn(sizes.sep, "opacity-60")} />
                </li>
              );
            }

            const isLast = i === visible.length - 1;
            const content = (
              <>
                {item.icon && (
                  <span aria-hidden="true" className={cn("shrink-0", sizes.icon)}>
                    {item.icon}
                  </span>
                )}
                <span className="truncate">{item.label}</span>
              </>
            );

            return (
              <li
                key={`${i}-${typeof item.label === "string" ? item.label : "item"}`}
                className="flex min-w-0 items-center gap-1.5"
              >
                {isLast ? (
                  <span
                    aria-current="page"
                    className="flex min-w-0 items-center gap-1.5 font-medium text-foreground"
                  >
                    {content}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className={cn(
                      "flex min-w-0 items-center gap-1.5 rounded text-muted-foreground transition-colors",
                      "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={cn(
                      "flex min-w-0 items-center gap-1.5 rounded text-muted-foreground transition-colors",
                      "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                  >
                    {content}
                  </button>
                )}

                {!isLast && (
                  <span aria-hidden="true" className="shrink-0 text-muted-foreground/60">
                    {separator ?? <ChevronRight className={sizes.sep} />}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";
