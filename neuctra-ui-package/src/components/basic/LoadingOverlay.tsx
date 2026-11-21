"use client";

import React, { forwardRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";
import { Spinner } from "./Spinner";

export interface LoadingOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Shows the scrim while true; `children` stay mounted either way. */
  active: boolean;
  /** Text announced to assistive tech and shown under the spinner. Pass an empty string to hide it. */
  label?: string;
  /** Optional secondary line shown under the label. */
  description?: string;
  /** Custom spinner node; pass `null` to show only the label. */
  spinner?: React.ReactNode;
  /** Size of the built-in spinner. */
  spinnerSize?: "sm" | "md" | "lg" | "xl";
  /** Blurs the covered content. */
  blur?: boolean;
  /** Covers the whole viewport instead of just this region. */
  fullScreen?: boolean;
  /** Makes covered content unreachable by Tab and pointer while active. */
  blockInteraction?: boolean;
  /** Region covered by the scrim. */
  children: React.ReactNode;
  /** Styles the scrim layer. */
  scrimClassName?: string;
  /** Styles the label/spinner stack inside the scrim. */
  contentClassName?: string;
  /** Styles the label text. */
  labelClassName?: string;
  /** Styles the description text. */
  descriptionClassName?: string;
}

/** Scrim that covers a region (or the viewport) while its content is loading. */
export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  function LoadingOverlay(
    {
      active,
      label = "Loading...",
      description,
      spinner,
      spinnerSize = "lg",
      blur = true,
      fullScreen = false,
      blockInteraction = true,
      children,
      scrimClassName,
      contentClassName,
      labelClassName,
      descriptionClassName,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const reduceMotion = useReducedMotion();
    const blocked = active && blockInteraction;

    return (
      <div
        ref={ref}
        aria-busy={active}
        className={cn("relative", className)}
        style={style}
        {...rest}
      >
        {/* display: contents keeps the consumer's layout while letting
            `inert` pull the covered controls out of the tab order. */}
        <div className="contents" inert={blocked ? true : undefined}>
          {children}
        </div>

        {/* Always mounted so the label change is announced; a live region
            inserted together with its text is often skipped by readers. */}
        <span role="status" aria-live="polite" className="sr-only">
          {active ? label || "Loading" : ""}
        </span>

        <AnimatePresence>
          {active && (
            <motion.div
              key="loading-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
              aria-hidden="true"
              className={cn(
                "inset-0 flex items-center justify-center bg-background/75",
                fullScreen ? "fixed z-50" : "absolute z-10 rounded-[inherit]",
                blur && "backdrop-blur-sm",
                scrimClassName,
              )}
            >
              <div
                className={cn(
                  "flex max-w-xs flex-col items-center gap-3 px-4 text-center",
                  contentClassName,
                )}
              >
                {spinner === undefined ? (
                  <Spinner size={spinnerSize} label="" className="text-primary" />
                ) : (
                  spinner
                )}
                {(label || description) && (
                  <div className="space-y-1">
                    {label && (
                      <p className={cn("text-sm font-medium text-foreground", labelClassName)}>
                        {label}
                      </p>
                    )}
                    {description && (
                      <p
                        className={cn(
                          "text-xs text-muted-foreground",
                          descriptionClassName,
                        )}
                      >
                        {description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

LoadingOverlay.displayName = "LoadingOverlay";
