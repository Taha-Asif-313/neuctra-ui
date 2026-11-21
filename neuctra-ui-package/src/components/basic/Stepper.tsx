"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

export interface StepperStep {
  /** Step title. */
  label: React.ReactNode;
  /** Muted line rendered under the title. */
  description?: React.ReactNode;
  /** Custom marker content shown instead of the step number (hidden once the step is done, replaced by a checkmark). */
  icon?: React.ReactNode;
}

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Step definitions, in order. */
  steps: StepperStep[];
  /** Index of the current step (0-based). Steps before it render as done. */
  activeStep: number;
  /** Makes completed steps clickable for navigation. */
  onStepClick?: (index: number) => void;
  /** Layout direction of the step list. */
  orientation?: "horizontal" | "vertical";
  /** Marker and text scale. */
  size?: "sm" | "md";
  /**
   * Which step labels a horizontal stepper shows under its markers.
   * `"auto"` shows every label from the `sm` breakpoint up, and on narrow screens shows only
   * the markers plus the active step's label on its own line, so four or more steps fit a phone.
   * `"all"` always shows every label (the strip scrolls when it overflows); `"active"` always uses the compact layout.
   */
  labelVisibility?: "auto" | "all" | "active";

  // 🔥 Full Customization
  /** Wraps each individual step (indicator + content). */
  itemClassName?: string;
  /** The circular step indicator/dot. */
  dotClassName?: string;
  /** The `<button>` wrapping a clickable (completed) dot. */
  dotButtonClassName?: string;
  /** The connector line between steps. */
  connectorClassName?: string;
  /** Wraps a step's label + description. */
  contentClassName?: string;
  /** Styles a step's label text. */
  labelClassName?: string;
  /** Styles a step's description text. */
  descriptionClassName?: string;
}

const SIZES = {
  sm: { dot: "h-7 w-7 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5", label: "text-xs", desc: "text-[11px]", itemMinWidth: "min-w-20", itemMinWidthSm: "sm:min-w-20" },
  md: { dot: "h-9 w-9 text-sm [&_svg]:h-4 [&_svg]:w-4", label: "text-sm", desc: "text-xs", itemMinWidth: "min-w-24", itemMinWidthSm: "sm:min-w-24" },
} as const;

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  function Stepper(
    {
      steps,
      activeStep,
      onStepClick,
      orientation = "horizontal",
      size = "md",
      labelVisibility = "auto",
      className,
      itemClassName,
      dotClassName,
      dotButtonClassName,
      connectorClassName,
      contentClassName,
      labelClassName,
      descriptionClassName,
      ...rest
    },
    ref,
  ) {
    const sizes = SIZES[size] ?? SIZES.md;
    const vertical = orientation === "vertical";
    const activeItemRef = useRef<HTMLDivElement | null>(null);
    const stripRef = useRef<HTMLDivElement | null>(null);

    // Many steps (or long labels) overflow a fixed-width row — the strip
    // scrolls horizontally instead of squishing every item unreadably (see
    // Tabs' identical .tab-scroll-strip technique). Keep the active step in
    // view as it changes, since it can otherwise scroll off either edge.
    useEffect(() => {
      if (vertical) return;
      const strip = stripRef.current;
      const item = activeItemRef.current;
      if (!strip || !item) return;
      // Scroll only the strip itself. scrollIntoView() also scrolled the
      // page vertically, which yanked the document to the stepper on mount.
      if (strip.scrollWidth <= strip.clientWidth) return;
      const target = item.offsetLeft - (strip.clientWidth - item.offsetWidth) / 2;
      strip.scrollTo?.({ left: Math.max(0, target), behavior: "smooth" });
    }, [activeStep, vertical]);

    const renderDot = (index: number, step: StepperStep) => {
      const done = index < activeStep;
      const active = index === activeStep;
      const clickable = Boolean(onStepClick) && done;

      const dot = (
        <span
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border-2 font-semibold transition-colors",
            sizes.dot,
            done && "border-primary bg-primary text-primary-foreground",
            active && "border-primary bg-primary/10 text-primary",
            !done && !active && "border-border bg-transparent text-muted-foreground",
            dotClassName,
          )}
        >
          {done ? <Check /> : step.icon ?? index + 1}
        </span>
      );

      if (!clickable) return dot;
      return (
        <button
          type="button"
          onClick={() => onStepClick?.(index)}
          aria-label={
            typeof step.label === "string" ? `Go to step: ${step.label}` : `Go to step ${index + 1}`
          }
          className={cn(
            "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            dotButtonClassName,
          )}
        >
          {dot}
        </button>
      );
    };

    if (vertical) {
      return (
        <div ref={ref} className={cn("flex flex-col", className)} {...rest}>
          {steps.map((step, i) => {
            const done = i < activeStep;
            const active = i === activeStep;
            const isLast = i === steps.length - 1;

            return (
              <div key={i} className={cn("flex gap-3", itemClassName)}>
                <div className="flex flex-col items-center">
                  {renderDot(i, step)}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "my-1 w-0.5 flex-1 min-h-6 rounded-full",
                        done ? "bg-primary" : "bg-border",
                        connectorClassName,
                      )}
                    />
                  )}
                </div>
                <div
                  className={cn(
                    "min-w-0 pb-6 pt-1",
                    isLast && "pb-0",
                    contentClassName,
                  )}
                >
                  <p
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "font-medium",
                      sizes.label,
                      active || done ? "text-foreground" : "text-muted-foreground",
                      labelClassName,
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p
                      className={cn(
                        "mt-0.5 text-muted-foreground",
                        sizes.desc,
                        descriptionClassName,
                      )}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...rest}>
        <style>{`
          .stepper-scroll-strip {
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
          }
          .stepper-scroll-strip::-webkit-scrollbar { display: none; }
        `}</style>
        <div ref={stripRef} className="stepper-scroll-strip relative flex w-full items-start">
          {steps.map((step, i) => {
            const done = i < activeStep;
            const active = i === activeStep;
            const isLast = i === steps.length - 1;

            return (
              <React.Fragment key={i}>
                <div
                  ref={active ? activeItemRef : undefined}
                  className={cn(
                    "flex shrink-0 flex-col items-center gap-2 text-center",
                    labelVisibility === "all"
                      ? sizes.itemMinWidth
                      : labelVisibility === "auto" && sizes.itemMinWidthSm,
                    itemClassName,
                  )}
                >
                  {renderDot(i, step)}
                  <div
                    className={cn(
                      "min-w-0 px-1",
                      labelVisibility === "auto" && "sr-only sm:not-sr-only",
                      labelVisibility === "active" && "sr-only",
                      contentClassName,
                    )}
                  >
                    <p
                      aria-current={active ? "step" : undefined}
                      title={typeof step.label === "string" ? step.label : undefined}
                      className={cn(
                        "truncate font-medium",
                        sizes.label,
                        active || done ? "text-foreground" : "text-muted-foreground",
                        labelClassName,
                      )}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p
                        title={typeof step.description === "string" ? step.description : undefined}
                        className={cn(
                          "mt-0.5 hidden truncate text-muted-foreground sm:block",
                          sizes.desc,
                          descriptionClassName,
                        )}
                      >
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>

                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-4 h-0.5 min-w-4 flex-1 rounded-full",
                      labelVisibility === "all" ? "mx-2" : labelVisibility === "auto" ? "mx-1.5 sm:mx-2" : "mx-1.5",
                      size === "sm" && "mt-3.5",
                      done ? "bg-primary" : "bg-border",
                      connectorClassName,
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        {labelVisibility !== "all" && steps[activeStep] && (
          // Compact layout: the active step's label sits on its own line
          // under the markers. Hidden from assistive tech because the
          // per-step labels (sr-only / hidden below sm) already carry it.
          <p
            aria-hidden="true"
            className={cn(
              "mt-3 truncate text-center font-medium text-foreground",
              sizes.label,
              labelVisibility === "auto" && "sm:hidden",
              labelClassName,
            )}
          >
            <span className="text-muted-foreground tabular-nums">
              {activeStep + 1}/{steps.length}
            </span>{" "}
            {steps[activeStep].label}
          </p>
        )}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";
