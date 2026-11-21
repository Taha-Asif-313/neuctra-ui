"use client";

import React, { forwardRef, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { useFocusTrap } from "../../lib/useFocusTrap";
import { useScrollLock } from "../../lib/useScrollLock";
import { Button } from "./Button";

/** One selectable action in an ActionSheet. */
export interface ActionSheetAction {
  /** Visible action label. */
  label: string;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Optional secondary line shown under the label. */
  description?: string;
  /** Called when the action is chosen; the sheet then closes. */
  onClick?: () => void;
  /** Styles the action as destructive. */
  destructive?: boolean;
  /** Disables the action. */
  disabled?: boolean;
}

export interface ActionSheetProps {
  /** Controlled open state; omit to let the sheet manage it internally. */
  open?: boolean;
  /** Initial open state in uncontrolled mode. */
  defaultOpen?: boolean;
  /** Called whenever the sheet should open or close, controlled or not. */
  onOpenChange?: (open: boolean) => void;
  /** Optional heading shown above the actions; also the dialog's accessible name. */
  title?: string;
  /** Optional supporting text below the title. */
  description?: string;
  /** Actions listed in the sheet. */
  actions: ActionSheetAction[];
  /** Label for the dismiss button. */
  cancelLabel?: string;
  /** Hides the separate Cancel button. */
  hideCancel?: boolean;
  /** Close the sheet when the overlay is clicked. */
  closeOnOverlayClick?: boolean;
  /** Close the sheet with the Escape key. */
  closeOnEscape?: boolean;
  /** Styles the bottom panel. */
  className?: string;
  /** Inline styles for the bottom panel. */
  style?: React.CSSProperties;
  /** Styles the dimmed overlay behind the panel. */
  overlayClassName?: string;
  /** Styles the title + description block. */
  headerClassName?: string;
  /** Styles the title heading. */
  titleClassName?: string;
  /** Styles the description text. */
  descriptionClassName?: string;
  /** Styles the list wrapping the action buttons. */
  actionsClassName?: string;
  /** Applied to every action button. */
  actionClassName?: string;
  /** Styles the Cancel button. */
  cancelClassName?: string;
}

/** Bottom sheet of contextual actions, centered and capped on wider screens. */
export const ActionSheet = forwardRef<HTMLDivElement, ActionSheetProps>(
  function ActionSheet(
    {
      open,
      defaultOpen = false,
      onOpenChange,
      title,
      description,
      actions,
      cancelLabel = "Cancel",
      hideCancel = false,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      className,
      style,
      overlayClassName,
      headerClassName,
      titleClassName,
      descriptionClassName,
      actionsClassName,
      actionClassName,
      cancelClassName,
    },
    ref,
  ) {
    const [isOpen, setOpen] = useControllableState<boolean>({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [mounted, setMounted] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const reduceMotion = useReducedMotion();
    const baseId = useId();
    const titleId = `${baseId}-title`;
    const descriptionId = `${baseId}-description`;

    useEffect(() => setMounted(true), []);
    useScrollLock(isOpen);
    useFocusTrap(panelRef, isOpen);

    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, closeOnEscape, setOpen]);

    const close = () => setOpen(false);

    // Portaled to <body> so a transformed ancestor can't become the
    // containing block of the fixed overlay (see Dropdown.tsx).
    if (!mounted) return null;

    return createPortal(
      <AnimatePresence>
        {isOpen && (
          <div key="action-sheet-root" className="fixed inset-0 z-50">
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              onClick={closeOnOverlayClick ? close : undefined}
              className={cn(
                "absolute inset-0 bg-background/80 backdrop-blur-sm",
                overlayClassName,
              )}
            />

            <motion.div
              ref={(node) => {
                panelRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) ref.current = node;
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              aria-label={title ? undefined : "Actions"}
              aria-describedby={description ? descriptionId : undefined}
              tabIndex={-1}
              initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
              style={style}
              className={cn(
                "absolute inset-x-0 bottom-0 flex max-h-[calc(100dvh-2rem)] flex-col",
                "rounded-t-2xl border border-b-0 border-border bg-background text-foreground shadow-2xl outline-none",
                "pb-[env(safe-area-inset-bottom)]",
                "sm:inset-x-auto sm:bottom-4 sm:left-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:rounded-2xl sm:border-b",
                className,
              )}
            >
              <div className="flex shrink-0 justify-center pb-1 pt-3">
                <span aria-hidden="true" className="h-1 w-10 rounded-full bg-muted" />
              </div>

              {(title || description) && (
                <div className={cn("shrink-0 px-6 pb-3 pt-2 text-center", headerClassName)}>
                  {title && (
                    <h2
                      id={titleId}
                      className={cn("text-base font-semibold text-foreground", titleClassName)}
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id={descriptionId}
                      className={cn("mt-1 text-sm text-secondary", descriptionClassName)}
                    >
                      {description}
                    </p>
                  )}
                </div>
              )}

              <div
                className={cn(
                  "min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 pb-3",
                  actionsClassName,
                )}
              >
                {actions.map((action, index) => (
                  <button
                    key={`${action.label}-${index}`}
                    type="button"
                    disabled={action.disabled}
                    onClick={() => {
                      if (action.disabled) return;
                      action.onClick?.();
                      close();
                    }}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                      action.destructive
                        ? "text-destructive hover:bg-destructive/10"
                        : "text-foreground hover:bg-accent",
                      action.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
                      actionClassName,
                    )}
                  >
                    {action.icon && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "inline-flex shrink-0 [&_svg]:h-4 [&_svg]:w-4",
                          !action.destructive && "text-muted-foreground",
                        )}
                      >
                        {action.icon}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{action.label}</span>
                      {action.description && (
                        <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                          {action.description}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>

              {!hideCancel && (
                <div className="shrink-0 border-t border-border p-3">
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    onClick={close}
                    className={cn("min-h-11 text-sm font-medium", cancelClassName)}
                  >
                    {cancelLabel}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body,
    );
  },
);

ActionSheet.displayName = "ActionSheet";
