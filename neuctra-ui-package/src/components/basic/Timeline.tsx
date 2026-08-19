"use client";

import React, { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

export interface TimelineItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Timestamp or meta text shown next to the title. */
  time?: React.ReactNode;
  icon?: React.ReactNode;
  status?: "done" | "active" | "pending";
}

export interface TimelineProps
  extends Omit<React.HTMLAttributes<HTMLOListElement>, "children"> {
  items: TimelineItem[];
  size?: "sm" | "md";

  /** Each `<li>` row. */
  itemClassName?: string;
  /** The vertical connector line between dots. */
  connectorClassName?: string;
  /** The status dot/icon bubble. */
  dotClassName?: string;
  /** Wrapper around the title/time/description block. */
  contentClassName?: string;
  /** Item title. */
  titleClassName?: string;
  /** Timestamp/meta text next to the title. */
  timeClassName?: string;
  /** Item description. */
  descriptionClassName?: string;
}

const DOT = {
  done: "bg-primary text-primary-foreground border-primary",
  active: "bg-primary/15 text-primary border-primary",
  pending: "bg-muted text-muted-foreground border-border",
} as const;

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  function Timeline(
    {
      items,
      size = "md",
      className,
      itemClassName,
      connectorClassName,
      dotClassName,
      contentClassName,
      titleClassName,
      timeClassName,
      descriptionClassName,
      ...rest
    },
    ref,
  ) {
    const compact = size === "sm";

    return (
      <ol ref={ref} className={cn("relative", className)} {...rest}>
        {items.map((item, i) => {
          const status = item.status ?? "pending";
          const isLast = i === items.length - 1;

          return (
            <li
              key={i}
              className={cn(
                "relative flex gap-4",
                !isLast && (compact ? "pb-6" : "pb-8"),
                itemClassName,
              )}
            >
              {/* Connector line */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-8 bottom-0 w-px bg-border",
                    // left = half the dot width, so the line runs through the
                    // dot's center at both sizes.
                    compact ? "left-3.5 top-7" : "left-4",
                    connectorClassName,
                  )}
                />
              )}

              {/* Dot */}
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 flex shrink-0 items-center justify-center rounded-full border",
                  compact ? "h-7 w-7 [&_svg]:h-3 [&_svg]:w-3" : "h-8 w-8 [&_svg]:h-3.5 [&_svg]:w-3.5",
                  DOT[status],
                  dotClassName,
                )}
              >
                {item.icon ?? (status === "done" ? <Check /> : (
                  <span
                    className={cn(
                      "rounded-full",
                      compact ? "h-1.5 w-1.5" : "h-2 w-2",
                      status === "active" ? "bg-primary" : "bg-muted-foreground/50",
                    )}
                  />
                ))}
              </span>

              {/* Content */}
              <div className={cn("min-w-0 flex-1 pt-1", contentClassName)}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <h4
                    className={cn(
                      "font-medium",
                      compact ? "text-sm" : "text-sm",
                      status === "pending"
                        ? "text-muted-foreground"
                        : "text-foreground",
                      titleClassName,
                    )}
                  >
                    {item.title}
                  </h4>
                  {item.time && (
                    <span
                      className={cn(
                        "text-xs text-muted-foreground",
                        timeClassName,
                      )}
                    >
                      {item.time}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p
                    className={cn(
                      "mt-1 text-xs leading-relaxed text-muted-foreground",
                      descriptionClassName,
                    )}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  },
);

Timeline.displayName = "Timeline";
