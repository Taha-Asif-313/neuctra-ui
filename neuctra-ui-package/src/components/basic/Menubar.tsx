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
import { ChevronRight } from "lucide-react";

import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { Kbd } from "./Kbd";
import { Divider } from "./Divider";

export interface MenubarItem {
  /** Stable identifier for the item. */
  id?: string;
  /** Visible item label. */
  label: string;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Optional keyboard shortcut shown on the right. */
  shortcut?: string;
  /** Disables the item and skips it in keyboard navigation. */
  disabled?: boolean;
  /** Styles the item as a destructive action. */
  danger?: boolean;
  /** Draws a divider above this item. */
  separatorBefore?: boolean;
  /** Called when the item is chosen; the menu then closes. */
  onSelect?: () => void;
  /** Nested items rendered as a flyout submenu (one level deep). */
  submenu?: MenubarItem[];
}

export interface MenubarMenuData {
  /** Stable id used for active-menu state. */
  id: string;
  /** Top-level label shown in the menubar. */
  label: string;
  /** Items shown when the menu is open. */
  items: MenubarItem[];
}

type MenubarSize = "sm" | "md";

const sizeConfig = {
  sm: {
    trigger: "px-2 py-1 text-xs",
    item: "gap-2 px-2 py-1 text-xs",
    panel: "min-w-40",
  },
  md: {
    trigger: "px-3 py-1.5 text-sm",
    item: "gap-2 px-2 py-1.5 text-sm",
    panel: "min-w-48",
  },
} as const;

const VIEWPORT_MARGIN = 8;

const actionable = (list: MenubarItem[]) =>
  list.map((item, index) => (item.disabled ? -1 : index)).filter((index) => index >= 0);

const stepIn = (list: MenubarItem[], from: number, delta: number) => {
  const indexes = actionable(list);
  if (!indexes.length) return -1;
  const position = indexes.indexOf(from);
  if (position === -1) return indexes[delta > 0 ? 0 : indexes.length - 1];
  return indexes[(position + delta + indexes.length) % indexes.length];
};

export interface MenubarMenuProps {
  /** Menu data: id, label and items. */
  menu: MenubarMenuData;
  /** Whether this menu's panel is visible. */
  active?: boolean;
  /** Called when the trigger is pressed. */
  onActivate?: () => void;
  /** Called when the trigger is hovered (Menubar uses it to switch between open menus). */
  onHover?: () => void;
  /** Called after a selection to close the panel. */
  onClose?: () => void;
  /** Layout direction used for panel placement. */
  orientation?: "horizontal" | "vertical";
  /** Trigger and row density. */
  size?: MenubarSize;
  /** Moves focus to the first item when the panel opens (keyboard opening). */
  autoFocusFirstItem?: boolean;
  /** Tab index of the trigger; Menubar uses it for roving focus. */
  triggerTabIndex?: number;
  /** Additional classes for the menu wrapper. */
  className?: string;
  /** Inline styles for the menu wrapper. */
  style?: React.CSSProperties;
  /** Styles the top-level trigger button. */
  triggerClassName?: string;
  /** Styles the dropdown panel (and submenu panels). */
  menuClassName?: string;
  /** Applied to every item row. */
  itemClassName?: string;
}

export const MenubarMenu = forwardRef<HTMLDivElement, MenubarMenuProps>(
  function MenubarMenu(
    {
      menu,
      active = false,
      onActivate,
      onHover,
      onClose,
      orientation = "horizontal",
      size = "md",
      autoFocusFirstItem = false,
      triggerTabIndex,
      className,
      style,
      triggerClassName,
      menuClassName,
      itemClassName,
    },
    ref,
  ) {
    const config = sizeConfig[size] ?? sizeConfig.md;
    const [activeItem, setActiveItem] = useState(-1);
    const [subOpen, setSubOpen] = useState<number | null>(null);
    const [subActive, setSubActive] = useState(-1);
    const [alignEnd, setAlignEnd] = useState(false);
    const [subLeft, setSubLeft] = useState(false);

    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const submenuRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const subItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const panelId = useId();
    // Read through a ref: consumers usually pass `items` inline, and a new
    // array every render must not reset the highlighted row.
    const itemsRef = useRef(menu.items);
    itemsRef.current = menu.items;

    // Reset (or seed) the highlighted row whenever the panel opens or closes.
    useEffect(() => {
      if (!active) {
        setActiveItem(-1);
        setSubOpen(null);
        setSubActive(-1);
        return;
      }
      if (autoFocusFirstItem) setActiveItem(actionable(itemsRef.current)[0] ?? -1);
    }, [active, autoFocusFirstItem]);

    // Keep the panel inside the viewport horizontally.
    useLayoutEffect(() => {
      if (!active) {
        setAlignEnd(false);
        return;
      }
      const rect = panelRef.current?.getBoundingClientRect();
      if (rect && rect.right > window.innerWidth - VIEWPORT_MARGIN) setAlignEnd(true);
    }, [active]);

    useLayoutEffect(() => {
      if (subOpen === null) return;
      const row = itemRefs.current[subOpen];
      const sub = submenuRef.current;
      if (!row || !sub) return;
      const rowRect = row.getBoundingClientRect();
      const subRect = sub.getBoundingClientRect();
      setSubLeft(
        rowRect.right + subRect.width + VIEWPORT_MARGIN > window.innerWidth &&
          rowRect.left - subRect.width - VIEWPORT_MARGIN > 0,
      );
    }, [subOpen]);

    // Roving DOM focus inside the open panel.
    useEffect(() => {
      if (!active) return;
      if (subOpen !== null && subActive >= 0) subItemRefs.current[subActive]?.focus();
      else if (activeItem >= 0) itemRefs.current[activeItem]?.focus();
    }, [active, activeItem, subOpen, subActive]);

    const select = (item: MenubarItem) => {
      if (item.disabled) return;
      item.onSelect?.();
      onClose?.();
      triggerRef.current?.focus();
    };

    const subItems = subOpen !== null ? menu.items[subOpen]?.submenu ?? [] : [];
    const inSub = subOpen !== null && subActive >= 0;

    const openSub = (index: number) => {
      setSubOpen(index);
      setSubActive(actionable(menu.items[index]?.submenu ?? [])[0] ?? -1);
    };

    const onPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const list = inSub ? subItems : menu.items;
      const current = inSub ? subActive : activeItem;
      const setCurrent = inSub ? setSubActive : setActiveItem;
      const consume = () => {
        event.preventDefault();
        event.stopPropagation();
      };

      switch (event.key) {
        case "ArrowDown":
          consume();
          setCurrent(stepIn(list, current, 1));
          break;
        case "ArrowUp":
          consume();
          setCurrent(stepIn(list, current, -1));
          break;
        case "Home":
          consume();
          setCurrent(actionable(list)[0] ?? -1);
          break;
        case "End": {
          consume();
          const indexes = actionable(list);
          setCurrent(indexes[indexes.length - 1] ?? -1);
          break;
        }
        case "ArrowRight":
          if (!inSub && menu.items[activeItem]?.submenu?.length) {
            consume();
            openSub(activeItem);
          }
          // Otherwise bubble up so Menubar moves to the next menu.
          break;
        case "ArrowLeft":
          if (subOpen !== null) {
            consume();
            setSubOpen(null);
            setSubActive(-1);
          }
          break;
        case "Escape":
          if (subOpen !== null) {
            consume();
            setSubOpen(null);
            setSubActive(-1);
          }
          break;
        case "Tab":
          consume();
          onClose?.();
          triggerRef.current?.focus();
          break;
        case "Enter":
        case " ": {
          consume();
          const item = list[current];
          if (!item) return;
          if (!inSub && item.submenu?.length) openSub(current);
          else select(item);
          break;
        }
        default:
          break;
      }
    };

    const renderItem = (item: MenubarItem, index: number, isSub: boolean) => {
      const hasSubmenu = !isSub && Boolean(item.submenu?.length);
      const highlighted = isSub
        ? subActive === index
        : activeItem === index || subOpen === index;

      return (
        <React.Fragment key={item.id ?? `${item.label}-${index}`}>
          {item.separatorBefore && index > 0 && (
            <Divider spacing="none" className="-mx-1 my-1 w-auto" />
          )}
          <div className="relative">
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
                  setActiveItem(index);
                  setSubActive(-1);
                  setSubOpen(hasSubmenu ? index : null);
                }
              }}
              onClick={() => {
                if (hasSubmenu) openSub(index);
                else select(item);
              }}
              className={cn(
                "flex w-full items-center rounded-md text-left text-popover-foreground outline-none transition-colors",
                config.item,
                "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                highlighted &&
                  (item.danger ? "bg-destructive/10" : "bg-accent text-accent-foreground"),
                item.danger && "text-destructive",
                item.disabled && "cursor-not-allowed opacity-50",
                itemClassName,
              )}
            >
              {item.icon && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex shrink-0 [&_svg]:h-4 [&_svg]:w-4",
                    !item.danger && "text-muted-foreground",
                  )}
                >
                  {item.icon}
                </span>
              )}
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.shortcut && (
                <Kbd size="sm" className="ml-6 shrink-0">
                  {item.shortcut}
                </Kbd>
              )}
              {hasSubmenu && (
                <ChevronRight
                  size={14}
                  aria-hidden="true"
                  className="ml-2 shrink-0 text-muted-foreground"
                />
              )}
            </button>

            {hasSubmenu && subOpen === index && (
              <div
                ref={submenuRef}
                role="menu"
                aria-label={item.label}
                className={cn(
                  "absolute -top-1 z-10 w-max max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-xl",
                  config.panel,
                  subLeft ? "right-full mr-2" : "left-full ml-2",
                  menuClassName,
                )}
              >
                {item.submenu?.map((child, childIndex) =>
                  renderItem(child, childIndex, true),
                )}
              </div>
            )}
          </div>
        </React.Fragment>
      );
    };

    return (
      <div
        ref={ref}
        data-menubar-menu=""
        className={cn("relative", className)}
        style={style}
      >
        <button
          ref={triggerRef}
          type="button"
          role="menuitem"
          aria-haspopup="menu"
          aria-expanded={active}
          aria-controls={active ? panelId : undefined}
          tabIndex={triggerTabIndex}
          data-menubar-trigger=""
          onClick={onActivate}
          onMouseEnter={onHover}
          className={cn(
            "w-full rounded-md text-left font-medium text-foreground transition-colors hover:bg-accent",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            config.trigger,
            active && "bg-accent text-accent-foreground",
            triggerClassName,
          )}
        >
          {menu.label}
        </button>

        {active && (
          <div
            ref={panelRef}
            id={panelId}
            role="menu"
            aria-label={menu.label}
            aria-orientation="vertical"
            onKeyDown={onPanelKeyDown}
            className={cn(
              "absolute z-50 w-max max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-xl",
              "animate-in fade-in motion-reduce:animate-none",
              config.panel,
              orientation === "horizontal"
                ? cn("top-full mt-2", alignEnd ? "right-0" : "left-0")
                : "left-full top-0 ml-2",
              menuClassName,
            )}
          >
            {menu.items.map((item, index) => renderItem(item, index, false))}
          </div>
        )}
      </div>
    );
  },
);
MenubarMenu.displayName = "MenubarMenu";

export interface MenubarProps {
  /** Menus rendered in order along the bar. */
  menus: MenubarMenuData[];
  /** Controlled id of the open menu; pass `null` for none. */
  activeMenuId?: string | null;
  /** Initially open menu id in uncontrolled mode. */
  defaultActiveMenuId?: string | null;
  /** Fired whenever a menu opens, switches or closes. */
  onActiveMenuChange?: (id: string | null) => void;
  /** Layout direction and arrow-key axis. */
  orientation?: "horizontal" | "vertical";
  /** Trigger and row density. */
  size?: MenubarSize;
  /** Accessible name for the menubar. */
  ariaLabel?: string;
  /** Additional classes for the menubar root. */
  className?: string;
  /** Inline styles for the menubar root. */
  style?: React.CSSProperties;
  /** Applied to every top-level trigger. */
  triggerClassName?: string;
  /** Applied to every dropdown panel. */
  menuClassName?: string;
  /** Applied to every item row. */
  itemClassName?: string;
}

export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(function Menubar(
  {
    menus,
    activeMenuId,
    defaultActiveMenuId = null,
    onActiveMenuChange,
    orientation = "horizontal",
    size = "md",
    ariaLabel,
    className,
    style,
    triggerClassName,
    menuClassName,
    itemClassName,
  },
  ref,
) {
  const [active, setActive] = useControllableState<string | null>({
    value: activeMenuId,
    defaultValue: defaultActiveMenuId,
    onChange: onActiveMenuChange,
  });
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [autoFocusItems, setAutoFocusItems] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const assignRoot = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  const getTriggers = () =>
    Array.from(
      rootRef.current?.querySelectorAll<HTMLButtonElement>("[data-menubar-trigger]") ?? [],
    );

  const focusTrigger = (index: number) => {
    const triggers = getTriggers();
    if (!triggers.length) return;
    const clamped = ((index % triggers.length) + triggers.length) % triggers.length;
    setFocusedIndex(clamped);
    triggers[clamped]?.focus();
  };

  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (!active) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setActive(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        const index = menus.findIndex((menu) => menu.id === activeRef.current);
        const hadFocus = rootRef.current?.contains(document.activeElement);
        setActive(null);
        if (hadFocus && index >= 0) focusTrigger(index);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
    // focusTrigger only reads refs, so it's safe to leave out.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, setActive, menus]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const horizontal = orientation === "horizontal";
    const nextKey = horizontal ? "ArrowRight" : "ArrowDown";
    const prevKey = horizontal ? "ArrowLeft" : "ArrowUp";
    const openKey = horizontal ? "ArrowDown" : "ArrowRight";
    const target = event.target as HTMLElement;
    const onTrigger = target.hasAttribute("data-menubar-trigger");

    const wrappers = Array.from(
      rootRef.current?.querySelectorAll("[data-menubar-menu]") ?? [],
    );
    const currentIndex = wrappers.findIndex((wrapper) => wrapper.contains(target));
    if (currentIndex === -1) return;

    const moveTo = (index: number) => {
      const count = menus.length;
      const next = ((index % count) + count) % count;
      if (active !== null) {
        // A menu is open: keep it open while moving, like a desktop menubar.
        setAutoFocusItems(true);
        setActive(menus[next].id);
        setFocusedIndex(next);
        if (!onTrigger) focusTrigger(next);
      } else {
        focusTrigger(next);
      }
    };

    if (event.key === nextKey && (onTrigger || horizontal)) {
      event.preventDefault();
      moveTo(currentIndex + 1);
    } else if (event.key === prevKey && (onTrigger || horizontal)) {
      event.preventDefault();
      moveTo(currentIndex - 1);
    } else if (!horizontal && !onTrigger && event.key === "ArrowLeft") {
      event.preventDefault();
      setActive(null);
      focusTrigger(currentIndex);
    } else if (onTrigger && event.key === "Home") {
      event.preventDefault();
      moveTo(0);
    } else if (onTrigger && event.key === "End") {
      event.preventDefault();
      moveTo(menus.length - 1);
    } else if (
      onTrigger &&
      (event.key === openKey || event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      setAutoFocusItems(true);
      setFocusedIndex(currentIndex);
      setActive(menus[currentIndex].id);
    }
  };

  // Keep exactly one trigger in the tab order.
  const tabStop = Math.min(focusedIndex, Math.max(menus.length - 1, 0));

  return (
    <div
      ref={assignRoot}
      role="menubar"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex gap-1 rounded-lg border border-border bg-card p-1 text-card-foreground",
        orientation === "vertical" && "flex-col",
        className,
      )}
      style={style}
    >
      {menus.map((menu, index) => (
        <MenubarMenu
          key={menu.id}
          menu={menu}
          active={active === menu.id}
          orientation={orientation}
          size={size}
          autoFocusFirstItem={autoFocusItems}
          triggerTabIndex={index === tabStop ? 0 : -1}
          triggerClassName={triggerClassName}
          menuClassName={menuClassName}
          itemClassName={itemClassName}
          onActivate={() => {
            setAutoFocusItems(false);
            setFocusedIndex(index);
            setActive(active === menu.id ? null : menu.id);
          }}
          onHover={() => {
            if (active !== null && active !== menu.id) {
              setAutoFocusItems(false);
              setActive(menu.id);
            }
          }}
          onClose={() => setActive(null)}
        />
      ))}
    </div>
  );
});
Menubar.displayName = "Menubar";
