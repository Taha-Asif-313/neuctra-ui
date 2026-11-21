"use client";

import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { Popover } from "./Popover";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";

/** One notification row in a {@link NotificationCenter}. */
export interface NotificationItemData {
  /** Stable id used for marking a single item as read. */
  id: string;
  /** Primary text. */
  title: React.ReactNode;
  /** Optional secondary text. */
  description?: React.ReactNode;
  /** Relative or absolute timestamp shown on the right. */
  timestamp?: React.ReactNode;
  /** Whether the notification has been read. */
  read?: boolean;
  /** Leading icon, usually a small lucide icon. */
  icon?: React.ReactNode;
  /** Image URL of the person behind the notification; renders a leading Avatar (takes precedence over `icon`). */
  avatarSrc?: string;
  /** Name of the person behind the notification; used for the Avatar's initials fallback. */
  avatarName?: string;
  /** Fired when the row is activated. */
  onClick?: () => void;
  /** Optional group heading; items with the same value are grouped. */
  group?: string;
}

export interface NotificationCenterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Notifications shown in the order provided (newest first is recommended). */
  items: NotificationItemData[];
  /** Replaces the default bell icon with custom, non-interactive trigger content (the wrapper is already a button). */
  trigger?: React.ReactNode;
  /** Overrides the computed number of unread notifications. */
  unreadCount?: number;
  /** Fired when one notification is activated. */
  onMarkRead?: (id: string) => void;
  /** Fired by the "Mark all read" action; the action is hidden without it. */
  onMarkAllRead?: () => void;
  /** Explicit group order; unlisted groups follow in first-seen order. Ungrouped items render first. */
  groups?: string[];
  /** Heading shown at the top of the panel. */
  title?: React.ReactNode;
  /** Content shown when `items` is empty. */
  emptyState?: React.ReactNode;
  /** Optional footer, e.g. a "View all" link. */
  footer?: React.ReactNode;
  /** Controlled open state of the panel. */
  open?: boolean;
  /** Initial open state in uncontrolled mode. */
  defaultOpen?: boolean;
  /** Fired whenever the panel opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Closes the panel after a notification is activated. */
  closeOnSelect?: boolean;
  /** Alignment of the panel relative to the trigger. */
  align?: "start" | "center" | "end";
  /** Styles the trigger wrapper (the focusable button). */
  triggerClassName?: string;
  /** Styles the floating panel. */
  panelClassName?: string;
  /** Styles every notification row. */
  itemClassName?: string;
}

/** Bell button with an unread badge that opens a grouped notification inbox. */
export const NotificationCenter = forwardRef<HTMLDivElement, NotificationCenterProps>(
  function NotificationCenter(
    {
      items,
      trigger,
      unreadCount,
      onMarkRead,
      onMarkAllRead,
      groups,
      title = "Notifications",
      emptyState,
      footer,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      closeOnSelect = false,
      align = "end",
      className,
      style,
      triggerClassName,
      panelClassName,
      itemClassName,
      ...rest
    },
    ref,
  ) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useControllableState<boolean>({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const unread = unreadCount ?? items.filter((item) => !item.read).length;
    const unreadLabel = `Notifications${unread > 0 ? `, ${unread} unread` : ""}`;

    const orderedGroups = useMemo(() => {
      const seen = Array.from(
        new Set(items.map((item) => item.group).filter(Boolean)),
      ) as string[];
      const explicit = (groups ?? []).filter((group) => seen.includes(group));
      return [...explicit, ...seen.filter((group) => !explicit.includes(group))];
    }, [items, groups]);
    const ungrouped = items.filter((item) => !item.group);

    // Move focus into the list on open, and back to the trigger when the panel
    // closes while focus was inside it (Escape, item select).
    const wasOpen = useRef(open);
    useEffect(() => {
      const root = rootRef.current;
      if (open && !wasOpen.current) {
        requestAnimationFrame(() => {
          listRef.current?.querySelector<HTMLElement>("button")?.focus();
        });
      } else if (!open && wasOpen.current && root) {
        const active = document.activeElement;
        if (!active || active === document.body || root.contains(active)) {
          root.querySelector<HTMLElement>('[aria-haspopup="dialog"]')?.focus();
        }
      }
      wasOpen.current = open;
    }, [open]);

    const onListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      const buttons = Array.from(
        listRef.current?.querySelectorAll<HTMLButtonElement>("button[data-notification]") ?? [],
      );
      if (!buttons.length) return;
      event.preventDefault();
      const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
      let next = 0;
      if (event.key === "ArrowDown") next = current < 0 ? 0 : (current + 1) % buttons.length;
      else if (event.key === "ArrowUp")
        next = current < 0 ? buttons.length - 1 : (current - 1 + buttons.length) % buttons.length;
      else if (event.key === "End") next = buttons.length - 1;
      buttons[next].focus();
    };

    const renderItem = (item: NotificationItemData) => (
      <button
        key={item.id}
        type="button"
        data-notification=""
        onClick={() => {
          onMarkRead?.(item.id);
          item.onClick?.();
          if (closeOnSelect) setOpen(false);
        }}
        className={cn(
          "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
          "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
          !item.read && "bg-primary/5",
          itemClassName,
        )}
      >
        {item.avatarSrc || item.avatarName ? (
          // Decorative here: the row text already names the actor.
          <span aria-hidden="true" className="mt-0.5 shrink-0">
            <Avatar size="sm" src={item.avatarSrc} alt={item.avatarName ?? ""} fallbackClassName="text-xs" />
          </span>
        ) : item.icon && (
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary [&_svg]:h-4 [&_svg]:w-4"
          >
            {item.icon}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-sm text-foreground",
                !item.read && "font-semibold",
              )}
            >
              {item.title}
            </span>
            {item.timestamp && (
              <span className="shrink-0 whitespace-nowrap text-[11px] text-muted-foreground">
                {item.timestamp}
              </span>
            )}
          </span>
          {item.description && (
            <span className="mt-0.5 line-clamp-2 block text-xs text-secondary">
              {item.description}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
            item.read ? "bg-transparent" : "bg-primary",
          )}
        />
        <span className="sr-only">{item.read ? ", read" : ", unread"}</span>
      </button>
    );

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("relative inline-flex", className)}
        style={style}
        {...rest}
      >
        <Popover
          position="bottom"
          align={align}
          open={open}
          onOpenChange={setOpen}
          triggerClassName={cn(
            "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            triggerClassName,
          )}
          contentClassName={cn(
            "w-80 max-w-[calc(100vw-2rem)] overflow-hidden p-0",
            panelClassName,
          )}
          trigger={
            trigger ?? (
              // A span, not a <button>: Popover's wrapper is already the
              // focusable role="button", and nesting buttons breaks keyboard
              // and screen reader behavior.
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent">
                <Bell aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">{unreadLabel}</span>
                {unread > 0 && (
                  <span aria-hidden="true" className="absolute -right-1.5 -top-1.5 flex">
                    <Badge
                      variant="solid"
                      size="sm"
                      text={unread > 99 ? "99+" : String(unread)}
                      className="h-4 min-w-4 px-1 py-0 text-[10px] font-semibold tabular-nums ring-2 ring-background"
                    />
                  </span>
                )}
              </span>
            )
          }
        >
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
            <span className="min-w-0 truncate text-sm font-semibold text-popover-foreground">{title}</span>
            {onMarkAllRead && unread > 0 && (
              <Button
                variant="ghost"
                size="xs"
                onClick={onMarkAllRead}
                iconBefore={<CheckCheck aria-hidden="true" className="h-3.5 w-3.5" />}
                className="-mr-1.5 shrink-0 whitespace-nowrap px-2 text-muted-foreground hover:text-foreground"
              >
                Mark all read
              </Button>
            )}
          </div>
          <div
            ref={listRef}
            onKeyDown={onListKeyDown}
            className="max-h-96 space-y-0.5 overflow-y-auto p-1.5"
          >
            {items.length === 0 ? (
              (emptyState ?? (
                <EmptyState
                  size="sm"
                  icon={<Bell aria-hidden="true" />}
                  title="You're all caught up"
                  description="New notifications will show up here."
                />
              ))
            ) : (
              <>
                {ungrouped.map(renderItem)}
                {orderedGroups.map((group) => (
                  <div key={group} role="group" aria-label={group}>
                    <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {group}
                    </p>
                    {items.filter((item) => item.group === group).map(renderItem)}
                  </div>
                ))}
              </>
            )}
          </div>
          {footer && <div className="border-t border-border p-1.5">{footer}</div>}
        </Popover>
      </div>
    );
  },
);

NotificationCenter.displayName = "NotificationCenter";
