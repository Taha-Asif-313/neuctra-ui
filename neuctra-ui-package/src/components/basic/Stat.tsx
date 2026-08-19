"use client";

import React, { forwardRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "../../lib/cn";

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ReactNode;
  /** Direction of the change indicator. */
  trend?: "up" | "down" | "neutral";
  /** e.g. "+12.5%" — rendered next to the trend arrow. */
  trendValue?: React.ReactNode;
  /** Small helper line under the value (e.g. "vs last month"). */
  description?: React.ReactNode;
  /** Renders the stat inside a bordered card surface. */
  bordered?: boolean;

  /** 🔥 Full Customization */
  headerClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
  valueClassName?: string;
  footerClassName?: string;
  trendClassName?: string;
  trendIconClassName?: string;
  descriptionClassName?: string;
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat(
  {
    label,
    value,
    icon,
    trend,
    trendValue,
    description,
    bordered = true,
    className,
    headerClassName,
    labelClassName,
    iconClassName,
    valueClassName,
    footerClassName,
    trendClassName,
    trendIconClassName,
    descriptionClassName,
    ...rest
  },
  ref,
) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div
      ref={ref}
      className={cn(
        "min-w-0",
        bordered && "rounded-xl border border-border bg-card p-5",
        className,
      )}
      {...rest}
    >
      <div className={cn("flex items-start justify-between gap-3", headerClassName)}>
        <p
          className={cn(
            "text-xs font-medium uppercase tracking-wide text-muted-foreground",
            labelClassName,
          )}
        >
          {label}
        </p>
        {icon && (
          <span
            aria-hidden="true"
            className={cn(
              "shrink-0 rounded-lg bg-primary/10 p-2 text-primary [&_svg]:h-4 [&_svg]:w-4",
              iconClassName,
            )}
          >
            {icon}
          </span>
        )}
      </div>

      <p
        className={cn(
          "mt-2 truncate text-2xl font-bold tabular-nums text-foreground",
          valueClassName,
        )}
      >
        {value}
      </p>

      {(trend || description) && (
        <div
          className={cn(
            "mt-2 flex flex-wrap items-center gap-2 text-xs",
            footerClassName,
          )}
        >
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-medium",
                trend === "up" && "bg-success/10 text-success",
                trend === "down" && "bg-destructive/10 text-destructive",
                trend === "neutral" && "bg-muted text-muted-foreground",
                trendClassName,
              )}
            >
              <TrendIcon aria-hidden="true" className={cn("h-3 w-3", trendIconClassName)} />
              {trendValue}
            </span>
          )}
          {description && (
            <span className={cn("text-muted-foreground", descriptionClassName)}>
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

Stat.displayName = "Stat";
