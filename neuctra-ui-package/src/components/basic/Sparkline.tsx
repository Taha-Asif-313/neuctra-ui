"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface SparklineProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "children" | "fill"> {
  /** Sequence of numbers to plot. Non-finite values are skipped. */
  data: number[];
  /** SVG width in pixels (ignored for layout when `responsive` is true). */
  width?: number;
  /** SVG height in pixels. */
  height?: number;
  /** Semantic color of the line, area and end point. */
  tone?: "primary" | "muted" | "success" | "destructive" | "warning" | "info";
  /** Line thickness in pixels. */
  strokeWidth?: number;
  /** Fills the area under the line with a translucent tone. */
  fill?: boolean;
  /** Draws a dot on the last data point. */
  showLastPoint?: boolean;
  /** Stretches the chart to the width of its container. */
  responsive?: boolean;
  /** Lower bound of the y-axis; defaults to the smallest value. */
  min?: number;
  /** Upper bound of the y-axis; defaults to the largest value. */
  max?: number;
  /** Accessible name announced by screen readers. */
  ariaLabel?: string;
  /** Styles the line path. */
  lineClassName?: string;
  /** Styles the area path (when `fill` is true). */
  areaClassName?: string;
  /** Styles the last-point dot (when `showLastPoint` is true). */
  pointClassName?: string;
}

/*
 * The tone is set as the SVG's text color and every mark paints with
 * currentColor, so the line follows the semantic token of the active theme.
 */
const TONES = {
  primary: "text-primary",
  muted: "text-muted-foreground",
  success: "text-success",
  destructive: "text-destructive",
  warning: "text-warning",
  info: "text-info",
} as const;

export const Sparkline = forwardRef<SVGSVGElement, SparklineProps>(
  function Sparkline(
    {
      data,
      width = 120,
      height = 40,
      tone = "primary",
      strokeWidth = 2,
      fill = false,
      showLastPoint = false,
      responsive = false,
      min: minProp,
      max: maxProp,
      ariaLabel = "Trend chart",
      className,
      style,
      lineClassName,
      areaClassName,
      pointClassName,
      ...rest
    },
    ref,
  ) {
    const pointRadius = strokeWidth + 1;
    const padding = showLastPoint ? pointRadius + 1 : strokeWidth / 2 + 1;
    const values = (data ?? []).filter((value) => Number.isFinite(value));
    const min = minProp ?? (values.length ? Math.min(...values) : 0);
    const max = maxProp ?? (values.length ? Math.max(...values) : 1);
    const range = max - min;
    const usableWidth = Math.max(width - padding * 2, 1);
    const usableHeight = Math.max(height - padding * 2, 1);

    const points = values.map((value, index) => {
      const x =
        padding +
        (values.length === 1 ? usableWidth / 2 : (index / (values.length - 1)) * usableWidth);
      // A flat series sits in the middle instead of hugging the bottom edge.
      const ratio = range === 0 ? 0.5 : (value - min) / range;
      const y = padding + usableHeight - Math.min(1, Math.max(0, ratio)) * usableHeight;
      return [x, y] as const;
    });

    // A single value still renders as a short flat segment.
    const linePoints =
      points.length === 1
        ? [
            [padding, points[0][1]] as const,
            [width - padding, points[0][1]] as const,
          ]
        : points;

    const line = linePoints
      .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
      .join(" ");
    const baseline = height - padding;
    const area = linePoints.length
      ? `${line} L${linePoints[linePoints.length - 1][0].toFixed(2)},${baseline} L${linePoints[0][0].toFixed(2)},${baseline} Z`
      : "";
    const lastPoint = points[points.length - 1];

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        width={responsive ? "100%" : width}
        height={height}
        preserveAspectRatio={responsive ? "none" : undefined}
        role="img"
        aria-label={ariaLabel}
        className={cn("block shrink-0 overflow-visible", TONES[tone] ?? TONES.primary, className)}
        style={style}
        {...rest}
      >
        {fill && linePoints.length > 0 && (
          <path
            d={area}
            fill="currentColor"
            stroke="none"
            className={cn("opacity-15", areaClassName)}
          />
        )}
        {linePoints.length > 0 && (
          <path
            d={line}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className={lineClassName}
          />
        )}
        {showLastPoint && lastPoint && !responsive && (
          <circle
            cx={lastPoint[0]}
            cy={lastPoint[1]}
            r={pointRadius}
            fill="currentColor"
            className={cn("stroke-background", pointClassName)}
            strokeWidth={1.5}
          />
        )}
      </svg>
    );
  },
);

Sparkline.displayName = "Sparkline";
