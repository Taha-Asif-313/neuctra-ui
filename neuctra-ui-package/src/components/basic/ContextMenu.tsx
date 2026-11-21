"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { Kbd } from "./Kbd";
import { Divider } from "./Divider";

export interface ContextMenuItem {
  /** Renders a divider line instead of an interactive row. */
  separator?: boolean;
  /** Visible row label. */
  label?: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Optional trailing shortcut hint. */
  shortcut?: string;
  /** Styles the row as a destructive action. */
  danger?: boolean;
  /** Renders the row as non-interactive and skips it in keyboard navigation. */
  disabled?: boolean;
  /** Called when the row is activated; the menu then closes. */
  onClick?: () => void;
  /** Nested rows shown in a flyout beside the row (one level deep). */
  submenu?: ContextMenuItem[];
}

export interface ContextMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Area that opens the menu on right-click (or the keyboard context-menu key). */
  children: React.ReactNode;
  /** Menu rows; use `{ separator: true }` for a divider. */
  items: ContextMenuItem[];
  /** Accessible name for the menu. */
  ariaLabel?: string;
  /** Row density. */
  size?: "sm" | "md";
  /** Lets the browser's native context menu show instead. */
  disabled?: boolean;
  /** Fired whenever the menu opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Styles the floating menu panel (and submenu panels). */
  menuClassName?: string;
  /** Inline styles for the floating menu panel, merged with its computed position. */
  menuStyle?: React.CSSProperties;
  /** Applied to every menu row. */
  itemClassName?: string;
  /** Applied to every separator line. */
  separatorClassName?: string;
  /** Styles submenu flyout panels only. */
  submenuClassName?: string;
}

const sizeConfig = {
  sm: { panel: "min-w-40", item: "gap-2 px-2 py-1 text-xs", icon: "[&_svg]:h-3.5 [&_svg]:w-3.5" },
  md: { panel: "min-w-48", item: "gap-2 px-2 py-1.5 text-sm", icon: "[&_svg]:h-4 [&_svg]:w-4" },
} as const;

const VIEWPORT_MARGIN = 8;

const actionable = (list: ContextMenuItem[]) =>
  list
    .map((item, index) => (!item.separator && !item.disabled ? index : -1))
    .filter((index) => index >= 0);

const stepIn = (list: ContextMenuItem[], from: number, delta: number) => {
  const indexes = actionable(list);
  if (!indexes.length) return -1;
  const position = indexes.indexOf(from);
  if (position === -1) return indexes[delta > 0 ? 0 : indexes.length - 1];
  return indexes[(position + delta + indexes.length) % indexes.length];
};

/** Pointer-positioned menu opened with the browser's context-menu gesture. */
export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  function ContextMenu(
    {
      children,
      items,
      ariaLabel = "Context menu",
      size = "md",
      disabled = false,
      onOpenChange,
      menuClassName,
      menuStyle,
      itemClassName,
      separatorClassName,
      submenuClassName,
      className,
      style,
      onContextMenu,
      ...rest
    },
    ref,
  ) {
    const [open, setOpenState] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState<{ top: number; left: number } | null>(
      null,
    );
    const [activeIndex, setActiveIndex] = useState(-1);
    const [subOpen, setSubOpen] = useState<number | null>(null);
    const [subActive, setSubActive] = useState(-1);
    const [subPlacement, setSubPlacement] = useState<{
      side: "right" | "left";
      offsetY: number;
    }>({ side: "right", offsetY: 0 });

    const menuRef = useRef<HTMLDivElement | null>(null);
    const submenuRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const subItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const returnFocusRef = useRef<HTMLElement | null>(null);
    const reduceMotion = useReducedMotion();
    const config = sizeConfig[size] ?? sizeConfig.md;

    const onOpenChangeRef = useRef(onOpenChange);
    onOpenChangeRef.current = onOpenChange;

    const close = useCallback((restoreFocus = true) => {
      setOpenState(false);
      setSubOpen(null);
      setSubActive(-1);
      onOpenChangeRef.current?.(false);
      if (restoreFocus) {
        const target = returnFocusRef.current;
        // Only pull focus back if it is still inside the closing menu (or lost
        // to <body>); never steal it from wherever the user clicked.
        const activeEl = document.activeElement;
        if (
          target &&
          (!activeEl || activeEl === document.body || menuRef.current?.contains(activeEl))
        ) {
          target.focus?.();
        }
      }
    }, []);

    useEffect(() => {
      if (!open) return;
      const onMouseDown = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          close(false);
        }
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") close();
      };
      const onDismiss = () => close(false);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("resize", onDismiss);
      window.addEventListener("scroll", onDismiss, true);
      window.addEventListener("blur", onDismiss);
      return () => {
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("resize", onDismiss);
        window.removeEventListener("scroll", onDismiss, true);
        window.removeEventListener("blur", onDismiss);
      };
    }, [open, close]);

    // Clamp the panel inside the viewport once it has been measured.
    useLayoutEffect(() => {
      if (!open || !menuRef.current) {
        setPosition(null);
        return;
      }
      const rect = menuRef.current.getBoundingClientRect();
      setPosition({
        top: Math.max(
          VIEWPORT_MARGIN,
          Math.min(coords.y, window.innerHeight - rect.height - VIEWPORT_MARGIN),
        ),
        left: Math.max(
          VIEWPORT_MARGIN,
          Math.min(coords.x, window.innerWidth - rect.width - VIEWPORT_MARGIN),
        ),
      });
    }, [open, coords]);

    // Flip the submenu to the left / shift it up when it would overflow.
    useLayoutEffect(() => {
      if (subOpen === null) return;
      const sub = submenuRef.current;
      const row = itemRefs.current[subOpen];
      if (!sub || !row) return;
      const rowRect = row.getBoundingClientRect();
      const subRect = sub.getBoundingClientRect();
      const side =
        rowRect.right + subRect.width + VIEWPORT_MARGIN > window.innerWidth &&
        rowRect.left - subRect.width - VIEWPORT_MARGIN > 0
          ? "left"
          : "right";
      const overflowY =
        rowRect.top + subRect.height + VIEWPORT_MARGIN - window.innerHeight;
      setSubPlacement({ side, offsetY: overflowY > 0 ? -overflowY : 0 });
    }, [subOpen]);

    // Move DOM focus with the active row (roving focus).
    useEffect(() => {
      if (!open || !position) return;
      if (subOpen !== null && subActive >= 0) {
        subItemRefs.current[subActive]?.focus();
      } else if (activeIndex >= 0) {
        itemRefs.current[activeIndex]?.focus();
      } else {
        menuRef.current?.focus();
      }
    }, [open, position, activeIndex, subOpen, subActive]);

    const activate = (item: ContextMenuItem) => {
      if (item.separator || item.disabled) return;
      item.onClick?.();
      close();
    };

    const subItems = subOpen !== null ? items[subOpen]?.submenu ?? [] : [];
    const inSubmenu = subOpen !== null && subActive >= 0;

    const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const list = inSubmenu ? subItems : items;
      const current = inSubmenu ? subActive : activeIndex;
      const setCurrent = inSubmenu ? setSubActive : setActiveIndex;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setCurrent(stepIn(list, current, 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setCurrent(stepIn(list, current, -1));
          break;
        case "Home":
          event.preventDefault();
          setCurrent(actionable(list)[0] ?? -1);
          break;
        case "End": {
          event.preventDefault();
          const indexes = actionable(list);
          setCurrent(indexes[indexes.length - 1] ?? -1);
          break;
        }
        case "ArrowRight":
          if (!inSubmenu && items[activeIndex]?.submenu?.length) {
            event.preventDefault();
            setSubOpen(activeIndex);
            setSubActive(actionable(items[activeIndex].submenu ?? [])[0] ?? -1);
          }
          break;
        case "ArrowLeft":
          if (subOpen !== null) {
            event.preventDefault();
            setSubOpen(null);
            setSubActive(-1);
          }
          break;
        case "Escape":
          if (subOpen !== null) {
            // Close just the flyout; stop the document listener closing the menu.
            event.preventDefault();
            event.stopPropagation();
            setSubOpen(null);
            setSubActive(-1);
          }
          break;
        case "Tab":
          event.preventDefault();
          close();
          break;
        case "Enter":
        case " ": {
          event.preventDefault();
          const item = list[current];
          if (!item) return;
          if (!inSubmenu && item.submenu?.length) {
            setSubOpen(current);
            setSubActive(actionable(item.submenu)[0] ?? -1);
          } else {
            activate(item);
          }
          break;
        }
        default:
          break;
      }
    };

    const renderButton = (
      item: ContextMenuItem,
      index: number,
      isSub: boolean,
    ) => {
      const hasSubmenu = !isSub && Boolean(item.submenu?.length);
      const highlighted = isSub
        ? subActive === index
        : activeIndex === index || subOpen === index;

      return (
        <button
          ref={(element) => {
            if (isSub) subItemRefs.current[index] = element;
            else itemRefs.current[index] = element;
          }}
          type="button"
          role="menuitem"
          tabIndex={-1}
          disabled={item.disabled}
          aria-disabled={item.disabled || undefined}
          aria-haspopup={hasSubmenu ? "menu" : undefined}
          aria-expanded={hasSubmenu ? subOpen === index : undefined}
          onMouseEnter={() => {
            if (item.disabled) return;
            if (isSub) {
              setSubActive(index);
            } else {
              setActiveIndex(index);
              setSubActive(-1);
              setSubOpen(hasSubmenu ? index : null);
            }
          }}
          onClick={() => {
            if (hasSubmenu) {
              setSubOpen(index);
              setSubActive(actionable(item.submenu ?? [])[0] ?? -1);
            } else {
              activate(item);
            }
          }}
          className={cn(
            "flex w-full items-center rounded-md text-left text-popover-foreground outline-none transition-colors",
            config.item,
            "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
            highlighted && (item.danger ? "bg-destructive/10" : "bg-accent text-accent-foreground"),
            item.danger && "text-destructive",
            item.disabled && "cursor-not-allowed opacity-50",
            itemClassName,
          )}
        >
          {item.icon && (
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex shrink-0",
                !item.danger && "text-muted-foreground",
                config.icon,
              )}
            >
              {item.icon}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
          {item.shortcut && (
            <Kbd size="sm" className="ml-4 shrink-0">
              {item.shortcut}
            </Kbd>
          )}
          {hasSubmenu && (
            <ChevronRight
              aria-hidden="true"
              className="ml-2 h-4 w-4 shrink-0 text-muted-foreground"
            />
          )}
        </button>
      );
    };

    const renderSeparator = (index: number) => (
      <Divider
        key={`separator-${index}`}
        spacing="none"
        className={cn("-mx-1 my-1 w-auto", separatorClassName)}
      />
    );

    const panelBase = cn(
      "rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-xl outline-none",
      config.panel,
    );

    return (
      <div
        ref={ref}
        className={cn("inline-block", className)}
        style={style}
        onContextMenu={(event) => {
          onContextMenu?.(event);
          if (event.defaultPrevented || disabled) return;
          event.preventDefault();

          // The keyboard context-menu key / Shift+F10 fire this event with
          // (0, 0) coordinates: anchor to the focused element instead and
          // focus the first row so the menu is usable without a pointer.
          const fromKeyboard = event.clientX === 0 && event.clientY === 0;
          let x = event.clientX;
          let y = event.clientY;
          if (fromKeyboard) {
            const rect = (event.target as HTMLElement).getBoundingClientRect();
            x = rect.left;
            y = rect.bottom;
          }

          returnFocusRef.current = document.activeElement as HTMLElement | null;
          setCoords({ x, y });
          setPosition(null);
          setActiveIndex(fromKeyboard ? actionable(items)[0] ?? -1 : -1);
          setSubOpen(null);
          setSubActive(-1);
          if (!open) onOpenChangeRef.current?.(true);
          setOpenState(true);
        }}
        {...rest}
      >
        {children}
        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {open && (
                <motion.div
                  key="context-menu"
                  ref={menuRef}
                  role="menu"
                  aria-label={ariaLabel}
                  aria-orientation="vertical"
                  tabIndex={-1}
                  onKeyDown={handleMenuKeyDown}
                  onContextMenu={(event) => event.preventDefault()}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: reduceMotion ? 0 : 0.12, ease: "easeOut" }}
                  style={{
                    top: position?.top ?? coords.y,
                    left: position?.left ?? coords.x,
                    visibility: position ? "visible" : "hidden",
                    transformOrigin: "top left",
                    ...menuStyle,
                  }}
                  className={cn(
                    "fixed z-50 max-w-[calc(100vw-1rem)]",
                    panelBase,
                    menuClassName,
                  )}
                >
                  {items.map((item, index) => {
                    if (item.separator) return renderSeparator(index);
                    const hasSubmenu = Boolean(item.submenu?.length);
                    return (
                      <div key={`item-${index}`} className="relative">
                        {renderButton(item, index, false)}
                        {hasSubmenu && subOpen === index && (
                          <div
                            ref={submenuRef}
                            role="menu"
                            aria-label={
                              typeof item.label === "string" ? item.label : undefined
                            }
                            className={cn(
                              "absolute z-10",
                              subPlacement.side === "right"
                                ? "left-full ml-2"
                                : "right-full mr-2",
                              panelBase,
                              menuClassName,
                              submenuClassName,
                            )}
                            style={{ top: subPlacement.offsetY - 4 }}
                          >
                            {item.submenu?.map((child, childIndex) =>
                              child.separator ? (
                                renderSeparator(childIndex)
                              ) : (
                                <React.Fragment key={`sub-${childIndex}`}>
                                  {renderButton(child, childIndex, true)}
                                </React.Fragment>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    );
  },
);

ContextMenu.displayName = "ContextMenu";
