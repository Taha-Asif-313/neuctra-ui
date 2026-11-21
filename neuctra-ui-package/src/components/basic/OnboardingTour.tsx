"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { useScrollLock } from "../../lib/useScrollLock";
import { useFocusTrap } from "../../lib/useFocusTrap";
import { useControllableState } from "../../lib/useControllableState";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

export interface TourStep {
  /** CSS selector of the element to highlight. When nothing matches, the card is centered. */
  target: string;
  /** Step heading. */
  title: React.ReactNode;
  /** Step body copy. */
  content: React.ReactNode;
  /** Preferred side of the target for the tooltip card; flips when there is no room. */
  placement?: "top" | "bottom" | "left" | "right";
}

export interface OnboardingTourProps {
  /** Ordered steps of the tour. */
  steps: TourStep[];
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state in uncontrolled mode. */
  defaultOpen?: boolean;
  /** Called whenever the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Controlled index of the current step. */
  step?: number;
  /** Fired when the current step changes. */
  onStepChange?: (step: number) => void;
  /** Called after the final step is finished. */
  onFinish?: () => void;
  /** Dims the page and cuts out a highlighted window around the current target. */
  spotlight?: boolean;
  /** Space in pixels between the target and the spotlight edge. */
  spotlightPadding?: number;
  /** Shows a Skip button that closes the tour. */
  showSkip?: boolean;
  /** Shows a Back button (disabled on the first step). */
  showBack?: boolean;
  /** Shows the step progress dots. */
  showProgress?: boolean;
  /** Closes the tour with the Escape key. */
  closeOnEscape?: boolean;
  /** Closes the tour when the dimmed backdrop is clicked. */
  closeOnOverlayClick?: boolean;
  /** Overrides the button labels. */
  labels?: { next?: string; back?: string; skip?: string; finish?: string; close?: string };
  /** Styles the floating tooltip card. */
  className?: string;
  /** Inline styles for the floating tooltip card. */
  style?: React.CSSProperties;
  /** Styles the dimmed backdrop. */
  overlayClassName?: string;
  /** Styles the spotlight ring around the target. */
  spotlightClassName?: string;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const CARD_WIDTH = 320;
const GAP = 12;
const VIEWPORT_MARGIN = 8;

/** Step-by-step product tour anchored to real elements on the page. */
export const OnboardingTour = forwardRef<HTMLDivElement, OnboardingTourProps>(
  function OnboardingTour(
    {
      steps,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      step: controlledStep,
      onStepChange,
      onFinish,
      spotlight = true,
      spotlightPadding = 4,
      showSkip = true,
      showBack = true,
      showProgress = true,
      closeOnEscape = true,
      closeOnOverlayClick = false,
      labels,
      className,
      style,
      overlayClassName,
      spotlightClassName,
    },
    ref,
  ) {
    const [open, setOpen] = useControllableState<boolean>({
      value: controlledOpen,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [stepIndex, setStepIndex] = useControllableState<number>({
      value: controlledStep,
      defaultValue: 0,
      onChange: onStepChange,
    });
    const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
    const [cardPos, setCardPos] = useState<{ top: number; left: number } | null>(null);

    const baseId = useId();
    const titleId = `${baseId}-title`;
    const descriptionId = `${baseId}-description`;
    const cardRef = useRef<HTMLDivElement | null>(null);
    const reduceMotion = useReducedMotion();

    useScrollLock(open);
    useFocusTrap(cardRef, open);

    const safeIndex = Math.min(Math.max(stepIndex, 0), Math.max(steps.length - 1, 0));
    const step = steps[safeIndex];
    const isLast = safeIndex === steps.length - 1;

    // Restart from the first step each time an uncontrolled tour opens.
    const prevOpen = useRef(open);
    useEffect(() => {
      if (open && !prevOpen.current && controlledStep === undefined) setStepIndex(0);
      prevOpen.current = open;
    }, [open, controlledStep, setStepIndex]);

    const close = useCallback(() => setOpen(false), [setOpen]);
    const goNext = useCallback(() => {
      if (isLast) {
        onFinish?.();
        setOpen(false);
      } else {
        setStepIndex(safeIndex + 1);
      }
    }, [isLast, onFinish, safeIndex, setOpen, setStepIndex]);
    const goBack = useCallback(() => {
      if (safeIndex > 0) setStepIndex(safeIndex - 1);
    }, [safeIndex, setStepIndex]);

    // Ref-routed handlers so the document listener never goes stale.
    const handlers = useRef({ close, goNext, goBack });
    handlers.current = { close, goNext, goBack };

    useEffect(() => {
      if (!open) return;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && closeOnEscape) handlers.current.close();
        // Arrow keys move between steps, unless focus is in a text field.
        const target = event.target as HTMLElement | null;
        if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
        if (event.key === "ArrowRight") handlers.current.goNext();
        else if (event.key === "ArrowLeft") handlers.current.goBack();
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, closeOnEscape]);

    const measure = useCallback(() => {
      if (!open || !step) {
        setTargetRect(null);
        return;
      }
      const element = document.querySelector<HTMLElement>(step.target);
      if (!element) {
        setTargetRect(null);
        return;
      }
      const rect = element.getBoundingClientRect();
      setTargetRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    }, [open, step]);

    // Bring the target into view on each step, then measure it.
    useLayoutEffect(() => {
      if (!open || !step) return;
      const element = document.querySelector<HTMLElement>(step.target);
      element?.scrollIntoView?.({
        block: "center",
        inline: "nearest",
        behavior: reduceMotion ? "auto" : "smooth",
      });
      measure();
    }, [open, step, measure, reduceMotion]);

    useEffect(() => {
      if (!open) return;
      window.addEventListener("resize", measure);
      window.addEventListener("scroll", measure, true);
      return () => {
        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", measure, true);
      };
    }, [open, measure]);

    // Position the card from its measured size (not a guessed height), flip to
    // the opposite side when the preferred one has no room, and clamp to the
    // viewport so the card never goes off-screen on small devices.
    useLayoutEffect(() => {
      if (!open) {
        setCardPos(null);
        return;
      }
      const card = cardRef.current;
      if (!card) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // offset* sizes ignore the entry scale transform, unlike getBoundingClientRect.
      const cw = card.offsetWidth;
      const ch = card.offsetHeight;

      if (!targetRect) {
        setCardPos({ top: Math.max(VIEWPORT_MARGIN, (vh - ch) / 2), left: Math.max(VIEWPORT_MARGIN, (vw - cw) / 2) });
        return;
      }

      const pad = spotlight ? spotlightPadding : 0;
      const t = {
        top: targetRect.top - pad,
        left: targetRect.left - pad,
        bottom: targetRect.top + targetRect.height + pad,
        right: targetRect.left + targetRect.width + pad,
      };
      const fits = {
        bottom: t.bottom + GAP + ch <= vh - VIEWPORT_MARGIN,
        top: t.top - GAP - ch >= VIEWPORT_MARGIN,
        right: t.right + GAP + cw <= vw - VIEWPORT_MARGIN,
        left: t.left - GAP - cw >= VIEWPORT_MARGIN,
      };
      const opposite = { top: "bottom", bottom: "top", left: "right", right: "left" } as const;
      let placement = step?.placement ?? "bottom";
      if (!fits[placement] && fits[opposite[placement]]) placement = opposite[placement];

      let top: number;
      let left: number;
      if (placement === "top" || placement === "bottom") {
        top = placement === "bottom" ? t.bottom + GAP : t.top - GAP - ch;
        left = targetRect.left + targetRect.width / 2 - cw / 2;
      } else {
        left = placement === "right" ? t.right + GAP : t.left - GAP - cw;
        top = targetRect.top + targetRect.height / 2 - ch / 2;
      }

      setCardPos({
        top: Math.min(Math.max(top, VIEWPORT_MARGIN), vh - ch - VIEWPORT_MARGIN),
        left: Math.min(Math.max(left, VIEWPORT_MARGIN), vw - cw - VIEWPORT_MARGIN),
      });
    }, [open, targetRect, step, spotlight, spotlightPadding]);

    if (!step) return null;

    const pad = spotlightPadding;
    const showCutout = spotlight && targetRect;

    return (
      <AnimatePresence>
        {open && (
          <React.Fragment key="tour">
            {/* Backdrop: a plain dim layer, or a cut-out window around the target. */}
            <motion.div
              key="tour-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
              aria-hidden="true"
              onClick={closeOnOverlayClick ? close : undefined}
              className={cn("fixed inset-0 z-40", !showCutout && "bg-background/80", overlayClassName)}
            >
              {showCutout && (
                <div
                  className={cn(
                    "absolute rounded-lg ring-2 ring-primary transition-all duration-200 motion-reduce:transition-none",
                    spotlightClassName,
                  )}
                  style={{
                    top: targetRect.top - pad,
                    left: targetRect.left - pad,
                    width: targetRect.width + pad * 2,
                    height: targetRect.height + pad * 2,
                    boxShadow: "0 0 0 9999px color-mix(in srgb, var(--background) 80%, transparent)",
                  }}
                />
              )}
            </motion.div>

            <motion.div
              key="tour-card"
              ref={(element) => {
                cardRef.current = element;
                if (typeof ref === "function") ref(element);
                else if (ref)
                  (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              tabIndex={-1}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              style={{
                position: "fixed",
                top: cardPos?.top ?? 0,
                left: cardPos?.left ?? 0,
                width: CARD_WIDTH,
                maxWidth: `calc(100vw - ${VIEWPORT_MARGIN * 2}px)`,
                visibility: cardPos ? "visible" : "hidden",
                ...style,
              }}
              className={cn(
                "z-50 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-xl",
                "focus-visible:outline-none",
                className,
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground" aria-live="polite">
                    Step {safeIndex + 1} of {steps.length}
                  </p>
                  <h2 id={titleId} className="mt-1 text-sm font-semibold text-popover-foreground">
                    {step.title}
                  </h2>
                </div>
                <IconButton
                  variant="ghost"
                  size="xs"
                  icon={<X />}
                  onClick={close}
                  aria-label={labels?.close ?? "Close tour"}
                  iconStyle={{ width: 16, height: 16 }}
                  className="-mr-1 -mt-1 text-muted-foreground hover:text-accent-foreground"
                />
              </div>
              <div id={descriptionId} className="mt-1.5 text-sm leading-relaxed text-secondary">
                {step.content}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-x-2 gap-y-3">
                {showProgress && steps.length > 1 ? (
                  <div aria-hidden="true" className="flex items-center gap-1">
                    {steps.map((_, index) => (
                      <span
                        key={index}
                        className={cn(
                          "h-1.5 rounded-full transition-all motion-reduce:transition-none",
                          index === safeIndex ? "w-4 bg-primary" : "w-1.5 bg-muted",
                        )}
                      />
                    ))}
                  </div>
                ) : (
                  <span />
                )}
                <div className="ml-auto flex items-center gap-2 [&>button]:whitespace-nowrap">
                  {showSkip && !isLast && (
                    <Button variant="ghost" size="sm" onClick={close}>
                      {labels?.skip ?? "Skip"}
                    </Button>
                  )}
                  {showBack && (
                    <Button variant="outline" size="sm" disabled={safeIndex === 0} onClick={goBack}>
                      {labels?.back ?? "Back"}
                    </Button>
                  )}
                  <Button size="sm" onClick={goNext}>
                    {isLast ? (labels?.finish ?? "Finish") : (labels?.next ?? "Next")}
                  </Button>
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    );
  },
);

OnboardingTour.displayName = "OnboardingTour";
