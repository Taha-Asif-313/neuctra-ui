"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "../../lib/cn";
import { IconButton } from "./IconButton";
import { Divider } from "./Divider";

type ToolbarSize = "sm" | "md" | "lg";

// `icon` is the IconButton size whose glyph scale (14/16/20px) matches; `item`
// keeps the toolbar's own, slightly tighter button box.
const sizeConfig = {
  sm: { icon: "xs", item: "size-8 rounded-md", bar: "gap-0.5 p-1", divider: "h-4" },
  md: { icon: "sm", item: "size-9 rounded-md", bar: "gap-1 p-1", divider: "h-5" },
  lg: { icon: "md", item: "size-10 rounded-md", bar: "gap-1 p-1.5", divider: "h-6" },
} as const;

export interface FloatingToolbarItemProps {
  /** Icon element rendered inside the button. */
  icon: React.ReactNode;
  /** Accessible label and native tooltip for the action. */
  label: string;
  /** Called when the item is activated. */
  onSelect: () => void;
  /** Disables the action. */
  disabled?: boolean;
  /** Marks a toggle action as on (sets `aria-pressed`). */
  active?: boolean;
  /** Styles the action as destructive. */
  danger?: boolean;
  /** Draws a vertical divider before this item. */
  separatorBefore?: boolean;
  /** Button size; the toolbar passes its own `size` down. */
  size?: ToolbarSize;
  /** Tab index; the toolbar manages it for roving focus. */
  tabIndex?: number;
  /** Additional classes for the item button. */
  className?: string;
  /** Inline styles for the item button. */
  style?: React.CSSProperties;
}

export const FloatingToolbarItem = forwardRef<
  HTMLButtonElement,
  FloatingToolbarItemProps
>(function FloatingToolbarItem(
  {
    icon,
    label,
    onSelect,
    disabled = false,
    active,
    danger = false,
    size = "md",
    tabIndex,
    className,
    style,
  },
  ref,
) {
  const config = sizeConfig[size] ?? sizeConfig.md;
  return (
    <IconButton
      ref={ref}
      variant="ghost"
      size={config.icon}
      icon={icon}
      disabled={disabled}
      onClick={onSelect}
      aria-label={label}
      aria-pressed={active === undefined ? undefined : active}
      title={label}
      tabIndex={tabIndex}
      data-toolbar-item=""
      className={cn(
        "transition-colors focus-visible:ring-offset-0 disabled:opacity-50",
        config.item,
        danger
          ? "text-destructive hover:bg-destructive/10"
          : "text-popover-foreground hover:bg-accent",
        active && !danger && "bg-accent text-accent-foreground",
        className,
      )}
      style={style}
    />
  );
});
FloatingToolbarItem.displayName = "FloatingToolbarItem";

export interface FloatingToolbarProps {
  /** Ordered actions shown in the bar. */
  items: FloatingToolbarItemProps[];
  /** Shows or hides the bar with a short fade/slide. */
  open?: boolean;
  /** Fixed viewport coordinates; omit for a bottom-centered bar. Ignored when `inline`. */
  position?: { top?: number; left?: number };
  /** Renders the bar in normal document flow (no portal, no fixed positioning). */
  inline?: boolean;
  /** Button size. */
  size?: ToolbarSize;
  /** Accessible name for the toolbar. */
  ariaLabel?: string;
  /** Extra content rendered after the items (e.g. a selection count). */
  children?: React.ReactNode;
  /** Additional classes for the floating bar. */
  className?: string;
  /** Inline styles for the floating bar. */
  style?: React.CSSProperties;
  /** Applied to every item button. */
  itemClassName?: string;
  /** Applied to every divider created by `separatorBefore`. */
  separatorClassName?: string;
}

export const FloatingToolbar = forwardRef<HTMLDivElement, FloatingToolbarProps>(
  function FloatingToolbar(
    {
      items,
      open = true,
      position,
      inline = false,
      size = "md",
      ariaLabel = "Floating toolbar",
      children,
      className,
      style,
      itemClassName,
      separatorClassName,
    },
    ref,
  ) {
    const [mounted, setMounted] = useState(false);
    const [focusIndex, setFocusIndex] = useState(0);
    const barRef = useRef<HTMLDivElement | null>(null);
    const reduceMotion = useReducedMotion();
    const config = sizeConfig[size] ?? sizeConfig.md;

    useEffect(() => {
      setMounted(true);
    }, []);

    // Roving tab stop: one Tab enters the toolbar, arrows move inside it.
    const enabledIndexes = items
      .map((item, index) => (item.disabled ? -1 : index))
      .filter((index) => index >= 0);
    const tabStop = enabledIndexes.includes(focusIndex)
      ? focusIndex
      : enabledIndexes[0] ?? -1;

    const focusItem = (index: number) => {
      setFocusIndex(index);
      const buttons = barRef.current?.querySelectorAll<HTMLButtonElement>(
        "[data-toolbar-item]",
      );
      buttons?.[index]?.focus();
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!enabledIndexes.length) return;
      const current = enabledIndexes.indexOf(tabStop);
      let next: number | null = null;
      if (event.key === "ArrowRight") {
        next = enabledIndexes[(current + 1) % enabledIndexes.length];
      } else if (event.key === "ArrowLeft") {
        next =
          enabledIndexes[(current - 1 + enabledIndexes.length) % enabledIndexes.length];
      } else if (event.key === "Home") {
        next = enabledIndexes[0];
      } else if (event.key === "End") {
        next = enabledIndexes[enabledIndexes.length - 1];
      }
      if (next !== null) {
        event.preventDefault();
        focusItem(next);
      }
    };

    const hasTop = position?.top !== undefined;
    const hasLeft = position?.left !== undefined;
    const centered = !inline && !hasLeft;

    const bar = (
      <AnimatePresence>
        {open && (
          <motion.div
            key="floating-toolbar"
            ref={(node) => {
              barRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            role="toolbar"
            aria-label={ariaLabel}
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
            className={cn(
              "flex max-w-[calc(100vw-2rem)] items-center overflow-x-auto rounded-xl border border-border bg-popover text-popover-foreground",
              config.bar,
              inline ? "relative w-fit" : "fixed z-50 shadow-lg",
              centered && "left-1/2 -translate-x-1/2",
              className,
            )}
            style={
              inline
                ? style
                : {
                    top: position?.top,
                    bottom: hasTop ? undefined : 24,
                    left: position?.left,
                    ...style,
                  }
            }
          >
            {items.map((item, index) => (
              <React.Fragment key={`${item.label}-${index}`}>
                {item.separatorBefore && index > 0 && (
                  <Divider
                    orientation="vertical"
                    spacing="none"
                    className={cn(
                      "mx-1 shrink-0 self-center",
                      config.divider,
                      separatorClassName,
                    )}
                  />
                )}
                <FloatingToolbarItem
                  {...item}
                  size={item.size ?? size}
                  tabIndex={index === tabStop ? 0 : -1}
                  className={cn(itemClassName, item.className)}
                  onSelect={() => {
                    setFocusIndex(index);
                    item.onSelect();
                  }}
                />
              </React.Fragment>
            ))}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );

    if (inline) return bar;
    if (!mounted || typeof document === "undefined") return null;
    return createPortal(bar, document.body);
  },
);
FloatingToolbar.displayName = "FloatingToolbar";
