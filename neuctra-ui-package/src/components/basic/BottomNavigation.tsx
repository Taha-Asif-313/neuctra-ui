"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { Badge } from "./Badge";

/** A single destination in a BottomNavigation. */
export interface BottomNavigationItem {
  /** Stable id of the destination. */
  id: string;
  /** Visible label under the icon. */
  label: string;
  /** Leading icon node. */
  icon: React.ReactNode;
  /** Optional badge; numbers and strings are shown, true shows a dot. */
  badge?: string | number | boolean;
  /** Prevents selecting the item. */
  disabled?: boolean;
}

export interface BottomNavigationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Destinations shown in the bar. */
  items: BottomNavigationItem[];
  /** Id of the active item (controlled). */
  activeId?: string;
  /** Initially active id in uncontrolled mode; defaults to the first item. */
  defaultActiveId?: string;
  /** Called with the id of a selected item. */
  onChange?: (id: string) => void;
  /**
   * CSS positioning of the bar. `"fixed"` pins it to the viewport bottom,
   * `"absolute"` pins it to the nearest positioned ancestor, `"sticky"` sticks
   * it to the bottom of its scroll container, `"static"` keeps it in flow.
   */
  position?: "fixed" | "absolute" | "sticky" | "static";
  /** Shows text labels under icons; when false labels stay screen-reader only. */
  showLabels?: boolean;
  /** Numeric badges above this value render as `max+`. */
  maxBadgeCount?: number;
  /** Accessible label for the navigation landmark. */
  ariaLabel?: string;
  /** Additional classes for the nav element. */
  className?: string;
  /** Inline styles for the nav element. */
  style?: React.CSSProperties;
  /** Styles every item button. */
  itemClassName?: string;
  /** Styles the active item button (applied after `itemClassName`). */
  activeItemClassName?: string;
  /** Styles the icon pill. */
  iconClassName?: string;
  /** Styles the text label. */
  labelClassName?: string;
  /** Styles the badge. */
  badgeClassName?: string;
}

const POSITION = {
  fixed: "fixed inset-x-0 bottom-0 z-40",
  absolute: "absolute inset-x-0 bottom-0 z-40",
  sticky: "sticky bottom-0 z-40",
  static: "relative",
} as const;

export const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
  function BottomNavigation(
    {
      items,
      activeId,
      defaultActiveId,
      onChange,
      position = "fixed",
      showLabels = true,
      maxBadgeCount = 99,
      ariaLabel = "Primary",
      className,
      style,
      itemClassName,
      activeItemClassName,
      iconClassName,
      labelClassName,
      badgeClassName,
      ...rest
    },
    ref,
  ) {
    const [current, setCurrent] = useControllableState<string>({
      value: activeId,
      defaultValue: defaultActiveId ?? items[0]?.id ?? "",
      onChange,
    });

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        style={style}
        className={cn(
          POSITION[position] ?? POSITION.fixed,
          "w-full border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur",
          className,
        )}
        {...rest}
      >
        <ul className="flex">
          {items.map((item) => {
            const active = item.id === current;
            const isDot = item.badge === true;
            const showBadge =
              item.badge !== undefined &&
              item.badge !== false &&
              item.badge !== 0 &&
              item.badge !== "";
            const badgeText =
              typeof item.badge === "number" && item.badge > maxBadgeCount
                ? `${maxBadgeCount}+`
                : String(item.badge);

            return (
              <li key={item.id} className="flex min-w-0 flex-1">
                <button
                  type="button"
                  disabled={item.disabled}
                  aria-current={active ? "page" : undefined}
                  onClick={() => {
                    if (!item.disabled && !active) setCurrent(item.id);
                  }}
                  className={cn(
                    "group relative flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-1 py-2 text-xs font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                    item.disabled && "cursor-not-allowed opacity-50 hover:text-muted-foreground",
                    itemClassName,
                    active && activeItemClassName,
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative inline-flex items-center justify-center rounded-full px-4 py-1 transition-colors [&_svg]:h-5 [&_svg]:w-5",
                      active
                        ? "bg-primary/10"
                        : !item.disabled && "group-hover:bg-accent",
                      iconClassName,
                    )}
                  >
                    {item.icon}
                    {showBadge &&
                      (isDot ? (
                        <span
                          className={cn(
                            "absolute right-1.5 top-0 h-2 w-2 rounded-full bg-destructive ring-2 ring-background",
                            badgeClassName,
                          )}
                        />
                      ) : (
                        <Badge
                          text={badgeText}
                          size="sm"
                          className={cn(
                            "absolute right-1.5 top-0 h-4 min-w-4 translate-x-1/2 px-1 py-0 text-[10px] font-semibold leading-none tabular-nums",
                            "bg-destructive text-destructive-foreground ring-2 ring-background",
                            badgeClassName,
                          )}
                        />
                      ))}
                  </span>
                  <span
                    className={cn(
                      "w-full truncate text-center",
                      !showLabels && "sr-only",
                      labelClassName,
                    )}
                  >
                    {item.label}
                  </span>
                  {showBadge && (
                    <span className="sr-only">
                      {isDot ? ", new activity" : `, ${badgeText} new`}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  },
);

BottomNavigation.displayName = "BottomNavigation";
