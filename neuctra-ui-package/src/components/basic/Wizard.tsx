"use client";

import React, { forwardRef, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "./Button";
import { Stepper } from "./Stepper";
import { useControllableState } from "../../lib/useControllableState";

/** One page of a {@link Wizard}. */
export interface WizardStep {
  /** Title shown in the stepper and above the content. */
  title: React.ReactNode;
  /** Optional line under the step title. */
  description?: React.ReactNode;
  /** Content rendered while this step is active. */
  content: React.ReactNode;
  /** Return false (or a promise resolving to false) to block leaving the step. */
  validate?: () => boolean | Promise<boolean>;
}

export interface WizardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Steps rendered in order. */
  steps: WizardStep[];
  /** Controlled active step index. */
  activeStep?: number;
  /** Initial step index in uncontrolled mode. */
  defaultActiveStep?: number;
  /** Fired whenever the active step changes. */
  onStepChange?: (step: number) => void;
  /** Fired when the final step is completed successfully. May return a promise; the finish button shows a spinner until it settles. */
  onFinish?: () => void | Promise<void>;
  /** Layout of the stepper: across the top, or as a sidebar on wide screens. */
  orientation?: "horizontal" | "vertical";
  /** Scale of the stepper, padding and footer buttons. */
  size?: "sm" | "md";
  /** Label for the forward button on non-final steps. */
  nextLabel?: React.ReactNode;
  /** Label for the backward button. */
  backLabel?: React.ReactNode;
  /** Label for the button on the final step. */
  finishLabel?: React.ReactNode;
  /** Shows the "Step 2 of 4" counter in the footer. */
  showStepCount?: boolean;
  /** Lets users jump back to completed steps by clicking them in the stepper. */
  allowStepClick?: boolean;
  /** Which labels the horizontal stepper shows. `"auto"` keeps only the markers plus the active step's label on narrow screens. See Stepper's `labelVisibility`. */
  stepperLabelVisibility?: "auto" | "all" | "active";
  /** Additional classes for the stepper wrapper. */
  stepperClassName?: string;
  /** Additional classes for the step content area. */
  contentClassName?: string;
  /** Additional classes for the step title. */
  titleClassName?: string;
  /** Additional classes for the step description. */
  descriptionClassName?: string;
  /** Additional classes for the footer bar. */
  footerClassName?: string;
}

const sizeConfig = {
  sm: { pad: "p-4", footer: "px-4 py-3", title: "text-base", desc: "text-xs", button: "xs" as const },
  md: { pad: "p-5", footer: "px-5 py-3", title: "text-lg", desc: "text-sm", button: "sm" as const },
} as const;

export const Wizard = forwardRef<HTMLDivElement, WizardProps>(
  function Wizard(
    {
      steps,
      activeStep,
      defaultActiveStep = 0,
      onStepChange,
      onFinish,
      orientation = "horizontal",
      size = "md",
      nextLabel = "Next",
      backLabel = "Back",
      finishLabel = "Finish",
      showStepCount = true,
      allowStepClick = true,
      stepperLabelVisibility = "auto",
      className,
      style,
      stepperClassName,
      contentClassName,
      titleClassName,
      descriptionClassName,
      footerClassName,
      ...rest
    },
    ref,
  ) {
    const [current, setCurrent] = useControllableState<number>({
      value: activeStep,
      defaultValue: defaultActiveStep,
      onChange: onStepChange,
    });
    const [busy, setBusy] = useState(false);
    const busyRef = useRef(false);
    const mountedRef = useRef(true);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const previousIndex = useRef<number | null>(null);
    const headingId = useId();
    const s = sizeConfig[size] ?? sizeConfig.md;

    const index = Math.min(Math.max(current, 0), Math.max(steps.length - 1, 0));
    const step = steps[index];
    const isLast = index === steps.length - 1;

    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }, []);

    // Move focus to the new step's heading after navigation (but not on the
    // first render), so keyboard and screen reader users land on the new
    // content instead of staying on a footer button.
    useEffect(() => {
      if (previousIndex.current !== null && previousIndex.current !== index) {
        headingRef.current?.focus({ preventScroll: true });
      }
      previousIndex.current = index;
    }, [index]);

    // A ref guard (not just state) blocks double-clicks that land before the
    // next render, and the mounted check avoids setState after unmount when
    // an async validate/onFinish resolves late.
    const run = async (task: () => Promise<void>) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setBusy(true);
      try {
        await task();
      } catch {
        // A rejected validation or finish handler keeps the user in place.
      } finally {
        busyRef.current = false;
        if (mountedRef.current) setBusy(false);
      }
    };

    const go = (target: number) =>
      run(async () => {
        if (target > index && step?.validate) {
          const valid = await step.validate();
          if (!valid) return;
        }
        setCurrent(Math.min(Math.max(target, 0), steps.length - 1));
      });

    const finish = () =>
      run(async () => {
        if (step?.validate) {
          const valid = await step.validate();
          if (!valid) return;
        }
        await onFinish?.();
      });

    if (!step) return null;

    const vertical = orientation === "vertical";

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-border bg-card text-card-foreground",
          className,
        )}
        style={style}
        {...rest}
      >
        <div className={cn(vertical && "md:flex")}>
          <div
            className={cn(
              s.pad,
              vertical
                ? "border-b border-border md:w-64 md:shrink-0 md:border-b-0 md:border-r"
                : "border-b border-border",
              stepperClassName,
            )}
          >
            <Stepper
              steps={steps.map((entry) => ({
                label: entry.title,
                description: vertical ? entry.description : undefined,
              }))}
              activeStep={index}
              orientation={orientation}
              size={size}
              labelVisibility={stepperLabelVisibility}
              onStepClick={
                allowStepClick
                  ? (target) => {
                      if (target < index) void go(target);
                    }
                  : undefined
              }
            />
          </div>

          <section
            aria-labelledby={headingId}
            className={cn("min-w-0 flex-1", s.pad, contentClassName)}
          >
            <div className="mb-4 space-y-1">
              <h3
                id={headingId}
                ref={headingRef}
                tabIndex={-1}
                aria-live="polite"
                className={cn(
                  "rounded-md font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  s.title,
                  titleClassName,
                )}
              >
                {step.title}
              </h3>
              {step.description && (
                <p
                  className={cn(
                    "leading-relaxed text-muted-foreground",
                    s.desc,
                    descriptionClassName,
                  )}
                >
                  {step.description}
                </p>
              )}
            </div>
            <div className="text-sm text-foreground">{step.content}</div>
          </section>
        </div>

        <div
          className={cn(
            "flex items-center justify-between gap-3 border-t border-border",
            s.footer,
            footerClassName,
          )}
        >
          <Button
            type="button"
            variant="outline"
            size={s.button}
            disabled={index === 0 || busy}
            onClick={() => void go(index - 1)}
            iconBefore={<ArrowLeft aria-hidden="true" />}
          >
            {backLabel}
          </Button>
          {showStepCount && (
            <span className="hidden text-xs tabular-nums text-muted-foreground sm:inline">
              Step {index + 1} of {steps.length}
            </span>
          )}
          {isLast ? (
            <Button
              type="button"
              size={s.button}
              loading={busy}
              loadingText={typeof finishLabel === "string" ? finishLabel : undefined}
              onClick={() => void finish()}
              iconBefore={<Check aria-hidden="true" />}
            >
              {finishLabel}
            </Button>
          ) : (
            <Button
              type="button"
              size={s.button}
              loading={busy}
              loadingText={typeof nextLabel === "string" ? nextLabel : undefined}
              onClick={() => void go(index + 1)}
              iconAfter={<ArrowRight aria-hidden="true" />}
            >
              {nextLabel}
            </Button>
          )}
        </div>
      </div>
    );
  },
);

Wizard.displayName = "Wizard";
