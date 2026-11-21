"use client";

import React, { forwardRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Divider } from "./Divider";

/** An action shown in a {@link BulkActionBar}. */
export interface BulkAction {
  /** Unique id used as the React key. */
  id: string;
  /** Visible action label. */
  label: React.ReactNode;
  /** Leading icon. */
  icon?: React.ReactNode;
  /** Fired when the action is pressed. */
  onClick: () => void;
  /** Disables this action. */
  disabled?: boolean;
  /** Shows a spinner and blocks the action while true. */
  loading?: boolean;
  /** Styles the action as destructive (e.g. Delete). */
  destructive?: boolean;
}

export interface BulkActionBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of currently selected items. The bar hides when this is 0. */
  count: number;
  /** Actions available for the selection. */
  actions: BulkAction[];
  /** Fired when the selection is cleared (clear button or Escape inside the bar). */
  onClear: () => void;
  /** Text after the count, e.g. "items". */
  selectedLabel?: React.ReactNode;
  /** Total number of selectable items. Shows "3 of 24 selected". */
  total?: number;
  /** Shows a "Select all" link while `count < total`. */
  onSelectAll?: () => void;
  /** `"fixed"` floats the bar at the bottom of the viewport; `"inline"` renders it in place, e.g. above a table. */
  position?: "fixed" | "inline";
  /** Height of the bar and its buttons. */
  size?: "sm" | "md";
  /** Accessible label for the toolbar. */
  ariaLabel?: string;
  /** Accessible label for the clear button. */
  clearLabel?: string;
  /** Additional classes for the count text. */
  countClassName?: string;
  /** Additional classes for every action button. */
  actionClassName?: string;
  /** Additional classes for the clear button. */
  clearButtonClassName?: string;
}

const sizeConfig = {
  sm: { root: "gap-1 px-2 py-1.5", button: "xs" as const, action: "px-2", text: "text-xs" },
  md: { root: "gap-1.5 px-3 py-2", button: "sm" as const, action: "px-2.5", text: "text-sm" },
} as const;

const FOCUSABLE = "button:not(:disabled)";

export const BulkActionBar = forwardRef<HTMLDivElement, BulkActionBarProps>(
  function BulkActionBar(
    {
      count,
      actions,
      onClear,
      selectedLabel = "selected",
      total,
      onSelectAll,
      position = "fixed",
      size = "md",
      ariaLabel = "Bulk actions",
      clearLabel = "Clear selection",
      className,
      style,
      countClassName,
      actionClassName,
      clearButtonClassName,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const reduceMotion = useReducedMotion();
    const s = sizeConfig[size] ?? sizeConfig.md;
    const fixed = position === "fixed";
    const visible = count > 0;

    // role="toolbar" implies arrow-key movement between its buttons, plus
    // Escape as a quick way to drop the selection.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (event.key === "Escape") {
        event.preventDefault();
        onClear();
        return;
      }
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      const buttons = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>(FOCUSABLE),
      );
      const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
      if (current === -1) return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? buttons.length - 1
            : event.key === "ArrowRight"
              ? (current + 1) % buttons.length
              : (current - 1 + buttons.length) % buttons.length;
      buttons[next]?.focus();
    };

    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            key="bulk-action-bar"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: fixed ? 16 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: fixed ? 16 : -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              fixed
                ? "pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
                : "w-full",
            )}
          >
            <div
              ref={ref}
              role="toolbar"
              aria-label={ariaLabel}
              onKeyDown={handleKeyDown}
              className={cn(
                "flex max-w-full flex-wrap items-center rounded-xl border border-border",
                s.root,
                fixed
                  ? "pointer-events-auto max-w-[calc(100vw-2rem)] bg-popover text-popover-foreground shadow-lg"
                  : "bg-card text-card-foreground",
                className,
              )}
              style={style}
              {...rest}
            >
              <span
                aria-live="polite"
                className={cn(
                  "whitespace-nowrap px-1.5 font-medium tabular-nums text-muted-foreground",
                  s.text,
                  countClassName,
                )}
              >
                <span className="text-foreground">{count}</span>
                {total !== undefined && <> of {total}</>} {selectedLabel}
              </span>
              {onSelectAll && total !== undefined && count < total && (
                <Button
                  type="button"
                  variant="link"
                  size={s.button}
                  onClick={onSelectAll}
                  className="px-1.5"
                >
                  Select all {total}
                </Button>
              )}
              {actions.length > 0 && (
                <Divider
                  orientation="vertical"
                  spacing="none"
                  className="mx-1 hidden h-5 min-h-0 self-center sm:inline-block"
                />
              )}
              {/* Below sm the actions drop to their own full-width line under
                  the count, instead of wrapping one button at a time. */}
              {actions.length > 0 && (
                <div className="order-last flex basis-full flex-wrap items-center gap-1 sm:order-none sm:basis-auto">
                  {actions.map((action) => (
                    <Button
                      key={action.id}
                      type="button"
                      variant="ghost"
                      size={s.button}
                      disabled={action.disabled}
                      loading={action.loading}
                      loadingText={typeof action.label === "string" ? action.label : undefined}
                      onClick={action.onClick}
                      iconBefore={action.icon}
                      className={cn(
                        "shrink-0 focus-visible:ring-offset-0",
                        s.action,
                        action.destructive &&
                          "text-destructive hover:bg-destructive/10 hover:text-destructive",
                        actionClassName,
                      )}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
              <Divider
                orientation="vertical"
                spacing="none"
                className="mx-1 hidden h-5 min-h-0 self-center sm:inline-block"
              />
              <IconButton
                variant="ghost"
                size={s.button}
                aria-label={clearLabel}
                onClick={onClear}
                icon={<X />}
                className={cn(
                  "ml-auto text-muted-foreground hover:text-accent-foreground focus-visible:ring-offset-0 sm:ml-0",
                  clearButtonClassName,
                )}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

BulkActionBar.displayName = "BulkActionBar";
