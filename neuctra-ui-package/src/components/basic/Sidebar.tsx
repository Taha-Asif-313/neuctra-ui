"use client";

import React, { forwardRef, useId } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { IconButton } from "./IconButton";
import { Badge } from "./Badge";
import { Tooltip } from "./Tooltip";

export interface SidebarItem {
  /** Stable id reported through `onSelect`. */
  id: string;
  /** Visible item label. */
  label: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Optional trailing badge, e.g. a count. */
  badge?: React.ReactNode;
  /** When set, the item renders as a link; otherwise as a button. */
  href?: string;
  /** Called when this item is selected, before the root `onSelect`. */
  onSelect?: (id: string) => void;
  /** Renders the item as non-interactive. */
  disabled?: boolean;
}

export interface SidebarSection {
  /** Optional heading above the section's items. */
  title?: string;
  /** Items in this section. */
  items: SidebarItem[];
}

export interface SidebarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  /** Grouped navigation entries. */
  sections: SidebarSection[];
  /** Id of the currently active item. */
  activeId?: string;
  /** Called with the id of a selected item. */
  onSelect?: (id: string) => void;
  /** Shows a collapse toggle in the header. */
  collapsible?: boolean;
  /** Controlled collapsed state. */
  collapsed?: boolean;
  /** Initial collapsed state in uncontrolled mode. */
  defaultCollapsed?: boolean;
  /** Called whenever the collapsed state changes. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Brand or workspace content shown at the top; hidden while collapsed. */
  header?: React.ReactNode;
  /** Content pinned to the bottom of the sidebar. */
  footer?: React.ReactNode;
  /** Accessible name for the navigation landmark. */
  ariaLabel?: string;
  /** Styles the top bar holding `header` and the collapse toggle. */
  headerClassName?: string;
  /** Styles the scrollable list area. */
  contentClassName?: string;
  /** Styles each section wrapper. */
  sectionClassName?: string;
  /** Styles each section heading. */
  sectionTitleClassName?: string;
  /** Styles every item link/button. */
  itemClassName?: string;
  /** Styles the active item (applied after `itemClassName`). */
  activeItemClassName?: string;
  /** Styles item icon wrappers. */
  iconClassName?: string;
  /** Styles item badges. */
  badgeClassName?: string;
  /** Styles the collapse toggle button. */
  toggleClassName?: string;
  /** Styles the footer area. */
  footerClassName?: string;
}

/** Vertical navigation landmark with grouped items and optional collapsing. */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    sections,
    activeId,
    onSelect,
    collapsible = false,
    collapsed: controlledCollapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    header,
    footer,
    ariaLabel = "Sidebar",
    headerClassName,
    contentClassName,
    sectionClassName,
    sectionTitleClassName,
    itemClassName,
    activeItemClassName,
    iconClassName,
    badgeClassName,
    toggleClassName,
    footerClassName,
    className,
    style,
    ...rest
  },
  ref,
) {
  const listId = useId();
  const [collapsed, setCollapsed] = useControllableState<boolean>({
    value: controlledCollapsed,
    defaultValue: defaultCollapsed,
    onChange: onCollapsedChange,
  });
  const showTop = collapsible || Boolean(header);

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn(
        "flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-border bg-card text-card-foreground",
        "transition-[width] duration-200 motion-reduce:transition-none",
        collapsed && "w-16",
        className,
      )}
      style={style}
      {...rest}
    >
      {showTop && (
        <div
          className={cn(
            "flex min-h-14 shrink-0 items-center gap-2 border-b border-border px-3 py-2",
            collapsed ? "justify-center" : "justify-between",
            headerClassName,
          )}
        >
          {header && !collapsed && (
            <div className="min-w-0 flex-1 truncate">{header}</div>
          )}
          {collapsible && (
            <IconButton
              variant="ghost"
              size="sm"
              icon={collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              aria-controls={listId}
              className={cn(
                "rounded-lg text-muted-foreground hover:text-accent-foreground focus-visible:ring-offset-0",
                !header && !collapsed && "ml-auto",
                toggleClassName,
              )}
            />
          )}
        </div>
      )}

      <div
        id={listId}
        className={cn("min-h-0 flex-1 overflow-y-auto px-2 py-3", contentClassName)}
      >
        {sections.map((section, sectionIndex) => (
          <div
            key={`${section.title ?? "section"}-${sectionIndex}`}
            className={cn(sectionIndex > 0 && "mt-5", sectionClassName)}
          >
            {section.title &&
              (collapsed ? (
                <span className="sr-only">{section.title}</span>
              ) : (
                <p
                  className={cn(
                    "mb-1.5 truncate px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    sectionTitleClassName,
                  )}
                >
                  {section.title}
                </p>
              ))}

            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = item.id === activeId;
                // Collapsed rows show their label in a Tooltip instead.
                const tooltip =
                  collapsed &&
                  (typeof item.label === "string" ||
                    typeof item.label === "number")
                    ? String(item.label)
                    : undefined;
                const classes = cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  collapsed && "justify-center px-0",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  item.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
                  itemClassName,
                  active && activeItemClassName,
                );
                const select = () => {
                  if (item.disabled) return;
                  item.onSelect?.(item.id);
                  onSelect?.(item.id);
                };
                const content = (
                  <>
                    {item.icon && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "inline-flex shrink-0 [&_svg]:h-4 [&_svg]:w-4",
                          iconClassName,
                        )}
                      >
                        {item.icon}
                      </span>
                    )}
                    {/* Collapsed rows keep their label for screen readers. */}
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate",
                        collapsed && "sr-only",
                      )}
                    >
                      {item.label}
                    </span>
                    {!collapsed &&
                      item.badge != null &&
                      item.badge !== false &&
                      (typeof item.badge === "string" ||
                      typeof item.badge === "number" ? (
                        <Badge
                          text={String(item.badge)}
                          variant="soft"
                          size="sm"
                          className={cn(
                            "shrink-0 px-1.5 tabular-nums",
                            active
                              ? "bg-primary/15 text-primary"
                              : "bg-muted text-muted-foreground",
                            badgeClassName,
                          )}
                        />
                      ) : (
                        <span className={cn("inline-flex shrink-0", badgeClassName)}>
                          {item.badge}
                        </span>
                      ))}
                  </>
                );

                const control = item.href ? (
                  <a
                    href={item.disabled ? undefined : item.href}
                    role={item.disabled ? "link" : undefined}
                    aria-current={active ? "page" : undefined}
                    aria-disabled={item.disabled || undefined}
                    onClick={(event) => {
                      if (item.disabled) {
                        event.preventDefault();
                        return;
                      }
                      select();
                    }}
                    className={classes}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled={item.disabled}
                    aria-current={active ? "page" : undefined}
                    onClick={select}
                    className={classes}
                  >
                    {content}
                  </button>
                );

                return (
                  <li key={item.id}>
                    {tooltip ? (
                      <Tooltip
                        content={tooltip}
                        position="right"
                        className="flex w-full"
                      >
                        {control}
                      </Tooltip>
                    ) : (
                      control
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {footer && (
        <div
          className={cn(
            "shrink-0 border-t border-border p-3",
            collapsed && "flex justify-center",
            footerClassName,
          )}
        >
          {footer}
        </div>
      )}
    </nav>
  );
});

Sidebar.displayName = "Sidebar";
