"use client";

import React, { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

export interface StepperStep {
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  steps: StepperStep[];
  /** Index of the current step (0-based). Steps before it render as done. */
  activeStep: number;
  /** Makes completed steps clickable for navigation. */
  onStepClick?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md";
}

const SIZES = {
  sm: { dot: "h-7 w-7 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5", label: "text-xs", desc: "text-[11px]" },
  md: { dot: "h-9 w-9 text-sm [&_svg]:h-4 [&_svg]:w-4", label: "text-sm", desc: "text-xs" },
} as const;

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  function Stepper(
    {
      steps,
      activeStep,
      onStepClick,
      orientation = "horizontal",
      size = "md",
      className,
      ...rest
    },
    ref,
  ) {
    const sizes = SIZES[size] ?? SIZES.md;
    const vertical = orientation === "vertical";

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
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {dot}
        </button>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          vertical ? "flex flex-col" : "flex w-full items-start",
          className,
        )}
        {...rest}
      >
        {steps.map((step, i) => {
          const done = i < activeStep;
          const active = i === activeStep;
          const isLast = i === steps.length - 1;

          if (vertical) {
            return (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {renderDot(i, step)}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "my-1 w-0.5 flex-1 min-h-6 rounded-full",
                        done ? "bg-primary" : "bg-border",
                      )}
                    />
                  )}
                </div>
                <div className={cn("min-w-0 pb-6 pt-1", isLast && "pb-0")}>
                  <p
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "font-medium",
                      sizes.label,
                      active || done ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className={cn("mt-0.5 text-muted-foreground", sizes.desc)}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          }

          return (
            <React.Fragment key={i}>
              <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                {renderDot(i, step)}
                <div className="min-w-0">
                  <p
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "font-medium",
                      sizes.label,
                      active || done ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className={cn("mt-0.5 text-muted-foreground", sizes.desc)}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mx-2 mt-4 h-0.5 flex-1 rounded-full",
                    size === "sm" && "mt-3.5",
                    done ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";
