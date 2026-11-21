"use client";

import React, {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, SearchX } from "lucide-react";
import { cn } from "../../lib/cn";
import { useScrollLock } from "../../lib/useScrollLock";
import { useFocusTrap } from "../../lib/useFocusTrap";
import { useControllableState } from "../../lib/useControllableState";
import { Kbd } from "./Kbd";
import { EmptyState } from "./EmptyState";

export interface CommandPaletteItem {
  /** Stable id used for keys and `aria-activedescendant`. */
  id: string;
  /** Visible command label (also matched by the search query). */
  label: string;
  /** Optional secondary line under the label (also matched by the search query). */
  description?: string;
  /** Extra search terms that match this command without being shown. */
  keywords?: string[];
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Optional keyboard hint rendered as a keycap. */
  shortcut?: string;
  /** Called when the command is chosen; the palette then closes. */
  onSelect?: () => void;
  /** Renders the command as non-interactive and skips it in arrow-key navigation. */
  disabled?: boolean;
}

export interface CommandPaletteGroup {
  /** Heading shown above the group. */
  heading: string;
  /** Commands in this group. */
  items: CommandPaletteItem[];
}

export interface CommandPaletteProps {
  /** Controlled open state; omit to let the palette manage it internally. */
  open?: boolean;
  /** Initial open state in uncontrolled mode. */
  defaultOpen?: boolean;
  /** Called whenever the open state changes, controlled or not. */
  onOpenChange?: (open: boolean) => void;
  /** Grouped commands shown in the list. */
  groups: CommandPaletteGroup[];
  /** Placeholder for the search input. */
  placeholder?: string;
  /** Enables the search input and label filtering. */
  searchable?: boolean;
  /** Message shown when no command matches. */
  emptyMessage?: string;
  /** Items shown in a "Recent" group when the search is empty. */
  recentItems?: CommandPaletteItem[];
  /** Heading of the recent-items group. */
  recentHeading?: string;
  /** Letter that toggles the palette together with Cmd (macOS) or Ctrl, e.g. `"k"`. Omit to disable the global shortcut. */
  hotkey?: string;
  /** Accessible name of the dialog. */
  ariaLabel?: string;
  /** Styles the fixed overlay. */
  className?: string;
  /** Inline styles for the fixed overlay. */
  style?: React.CSSProperties;
  /** Styles the floating panel. */
  panelClassName?: string;
  /** Styles the search input row. */
  inputWrapperClassName?: string;
  /** Styles the search input. */
  inputClassName?: string;
  /** Styles the scrollable results list. */
  listClassName?: string;
  /** Styles every group heading. */
  groupHeadingClassName?: string;
  /** Applied to every command row. */
  itemClassName?: string;
  /** Styles the empty-state message. */
  emptyClassName?: string;
}

interface IndexedItem {
  item: CommandPaletteItem;
  index: number;
  domId: string;
}

const matches = (item: CommandPaletteItem, query: string) =>
  item.label.toLowerCase().includes(query) ||
  item.description?.toLowerCase().includes(query) ||
  item.keywords?.some((keyword) => keyword.toLowerCase().includes(query));

/** Searchable, keyboard-driven command menu in a modal overlay. */
export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  function CommandPalette(
    {
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      groups,
      placeholder = "Type a command or search...",
      searchable = true,
      emptyMessage = "No results found.",
      recentItems,
      recentHeading = "Recent",
      hotkey,
      ariaLabel = "Command palette",
      className,
      style,
      panelClassName,
      inputWrapperClassName,
      inputClassName,
      listClassName,
      groupHeadingClassName,
      itemClassName,
      emptyClassName,
    },
    ref,
  ) {
    const [open, setOpen] = useControllableState<boolean>({
      value: controlledOpen,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    const baseId = useId();
    const listId = `${baseId}-list`;
    const panelRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const pressedOnOverlay = useRef(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => setMounted(true), []);
    useScrollLock(open);
    useFocusTrap(panelRef, open);

    const openRef = useRef(open);
    openRef.current = open;
    const setOpenRef = useRef(setOpen);
    setOpenRef.current = setOpen;

    useEffect(() => {
      if (!open) return;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          setOpenRef.current(false);
        }
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    // Optional global Cmd/Ctrl + hotkey toggle.
    useEffect(() => {
      if (!hotkey) return;
      const key = hotkey.toLowerCase();
      const onKeyDown = (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key) {
          event.preventDefault();
          setOpenRef.current(!openRef.current);
        }
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [hotkey]);

    useEffect(() => {
      if (open) {
        setQuery("");
        setActiveIndex(0);
      }
    }, [open]);

    const normalized = query.trim().toLowerCase();

    // Index every rendered row once. The same item object may appear in both
    // "Recent" and its own group, so identity lookups (indexOf) are not
    // enough: they returned the first occurrence and produced duplicate DOM
    // ids and two highlighted rows.
    const { renderedGroups, flatItems } = useMemo(() => {
      const filtered =
        !searchable || !normalized
          ? groups
          : groups
              .map((group) => ({
                ...group,
                items: group.items.filter((item) => matches(item, normalized)),
              }))
              .filter((group) => group.items.length > 0);

      const visible =
        recentItems?.length && !normalized
          ? [{ heading: recentHeading, items: recentItems }, ...filtered]
          : filtered;

      const flat: IndexedItem[] = [];
      const rendered = visible.map((group, groupIndex) => ({
        heading: group.heading,
        key: `${groupIndex}-${group.heading}`,
        items: group.items.map((item) => {
          const entry: IndexedItem = {
            item,
            index: flat.length,
            domId: `${baseId}-item-${groupIndex}-${item.id}`,
          };
          flat.push(entry);
          return entry;
        }),
      }));
      return { renderedGroups: rendered, flatItems: flat };
    }, [groups, normalized, searchable, recentItems, recentHeading, baseId]);

    const firstEnabled = useMemo(
      () => flatItems.findIndex((entry) => !entry.item.disabled),
      [flatItems],
    );

    // Reset the highlight to the first enabled row whenever the result set changes.
    useEffect(() => {
      setActiveIndex(Math.max(firstEnabled, 0));
    }, [firstEnabled, normalized]);

    useEffect(() => {
      if (open) itemRefs.current[activeIndex]?.scrollIntoView?.({ block: "nearest" });
    }, [activeIndex, open]);

    const selectItem = (item: CommandPaletteItem) => {
      if (item.disabled) return;
      item.onSelect?.();
      setOpen(false);
    };

    const step = (from: number, delta: number) => {
      const count = flatItems.length;
      if (!count) return from;
      let next = from;
      for (let i = 0; i < count; i += 1) {
        next = (next + delta + count) % count;
        if (!flatItems[next].item.disabled) return next;
      }
      return from;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const count = flatItems.length;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => step(index, 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => step(index, -1));
      } else if (event.key === "Home") {
        event.preventDefault();
        setActiveIndex(step(-1 + count, 1));
      } else if (event.key === "End") {
        event.preventDefault();
        setActiveIndex(step(0, -1));
      } else if (event.key === "Enter") {
        event.preventDefault();
        const entry = flatItems[activeIndex];
        if (entry) selectItem(entry.item);
      }
    };

    const activeDescendant = flatItems[activeIndex]?.domId;

    if (!mounted) return null;

    return createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            key="command-overlay"
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.12 }}
            onMouseDown={(event) => {
              pressedOnOverlay.current = event.target === event.currentTarget;
            }}
            onClick={() => {
              if (pressedOnOverlay.current) setOpen(false);
              pressedOnOverlay.current = false;
            }}
            className={cn(
              "fixed inset-0 z-50 flex items-start justify-center bg-background/80 p-4 pt-[10vh] backdrop-blur-sm",
              className,
            )}
            style={style}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              tabIndex={-1}
              onKeyDown={handleKeyDown}
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.16 }}
              className={cn(
                "flex w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border",
                "bg-popover text-popover-foreground shadow-2xl outline-none",
                panelClassName,
              )}
            >
              {searchable && (
                <div
                  className={cn(
                    "flex items-center gap-3 border-b border-border px-4",
                    inputWrapperClassName,
                  )}
                >
                  <Search
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-muted-foreground"
                  />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={placeholder}
                    role="combobox"
                    aria-label={placeholder}
                    aria-expanded="true"
                    aria-controls={listId}
                    aria-autocomplete="list"
                    aria-activedescendant={activeDescendant}
                    autoComplete="off"
                    spellCheck={false}
                    className={cn(
                      "h-12 w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground",
                      inputClassName,
                    )}
                  />
                  <Kbd size="sm" className="hidden sm:inline-flex">
                    Esc
                  </Kbd>
                </div>
              )}

              <div
                id={listId}
                role="listbox"
                aria-label="Commands"
                // Without a search input the list itself takes focus and
                // carries the active option for screen readers.
                tabIndex={searchable ? undefined : 0}
                aria-activedescendant={searchable ? undefined : activeDescendant}
                className={cn(
                  "max-h-[min(24rem,60vh)] overflow-y-auto overscroll-contain p-2",
                  !searchable &&
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  listClassName,
                )}
              >
                {flatItems.length === 0 ? (
                  <EmptyState
                    role="status"
                    size="sm"
                    icon={<SearchX />}
                    title={emptyMessage}
                    description={
                      normalized ? `Nothing matches "${query.trim()}".` : undefined
                    }
                    className={emptyClassName}
                  />
                ) : (
                  renderedGroups.map((group) => (
                    <div
                      key={group.key}
                      role="group"
                      aria-labelledby={`${baseId}-group-${group.key}`}
                      className="mb-2 last:mb-0"
                    >
                      <p
                        id={`${baseId}-group-${group.key}`}
                        className={cn(
                          "px-2 pb-1 pt-2 text-xs font-medium text-muted-foreground",
                          groupHeadingClassName,
                        )}
                      >
                        {group.heading}
                      </p>
                      {group.items.map(({ item, index, domId }) => {
                        const active = index === activeIndex;
                        return (
                          <button
                            key={domId}
                            ref={(element) => {
                              itemRefs.current[index] = element;
                            }}
                            id={domId}
                            type="button"
                            role="option"
                            // Focus stays on the input; the highlighted row is
                            // conveyed through aria-activedescendant.
                            tabIndex={-1}
                            aria-selected={active}
                            aria-disabled={item.disabled || undefined}
                            disabled={item.disabled}
                            onMouseMove={() => {
                              if (!item.disabled && !active) setActiveIndex(index);
                            }}
                            onClick={() => selectItem(item)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm text-foreground transition-colors",
                              active && "bg-accent text-accent-foreground",
                              item.disabled && "cursor-not-allowed opacity-50",
                              itemClassName,
                            )}
                          >
                            {item.icon && (
                              <span
                                aria-hidden="true"
                                className="inline-flex shrink-0 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4"
                              >
                                {item.icon}
                              </span>
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="block truncate">{item.label}</span>
                              {item.description && (
                                <span className="block truncate text-xs text-muted-foreground">
                                  {item.description}
                                </span>
                              )}
                            </span>
                            {item.shortcut && (
                              <Kbd size="sm" className="shrink-0">
                                {item.shortcut}
                              </Kbd>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );
  },
);

CommandPalette.displayName = "CommandPalette";
