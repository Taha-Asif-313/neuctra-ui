"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useId,
  forwardRef,
  useLayoutEffect,
} from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* 🧩 Types                                                                  */
/* -------------------------------------------------------------------------- */

export interface DropdownItem {
  label?: React.ReactNode;
  icon?: React.ReactNode;

  onClick?: () => void;
  href?: string;

  danger?: boolean;
  disabled?: boolean;

  separator?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];

  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  align?: "left" | "right";
  width?: number;

  closeOnClick?: boolean;

  className?: string;
  menuClassName?: string;
  itemClassName?: string;

  style?: React.CSSProperties;
  menuStyle?: React.CSSProperties;
}

/* -------------------------------------------------------------------------- */
/* 🔽 Dropdown                                                               */
/* -------------------------------------------------------------------------- */

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  function Dropdown(
    {
      trigger,
      items,

      open: controlledOpen,
      onOpenChange,

      align = "right",
      width = 220,
      closeOnClick = true,

      className,
      menuClassName,
      itemClassName,

      style,
      menuStyle,
    },
    ref,
  ) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const [position, setPosition] = useState<"top" | "bottom">("bottom");

    const isControlled = controlledOpen !== undefined;

    const open = isControlled ? controlledOpen : internalOpen;

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuId = useId();

    // Kept in a ref so the listener below can stay subscribed without going
    // stale on onOpenChange, which consumers usually pass as an inline arrow.
    const setOpenRef = useRef((val: boolean) => {
      if (!isControlled) setInternalOpen(val);
      onOpenChange?.(val);
    });
    setOpenRef.current = (val: boolean) => {
      if (!isControlled) setInternalOpen(val);
      onOpenChange?.(val);
    };

    const setOpen = (val: boolean) => setOpenRef.current(val);

    /* ---------------------------------------------------------------------- */
    /* 🔒 Outside Click                                                       */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
      // Gate on `open`. Previously this was mounted for the component's whole
      // life with `[]` deps, so in controlled mode every mousedown anywhere on
      // the page called onOpenChange(false) — and the empty deps froze the
      // first render's handler.
      if (!open) return;

      const handleOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(target) &&
          !menuRef.current?.contains(target)
        ) {
          setOpenRef.current(false);
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpenRef.current(false);
      };

      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open]);

    /* ---------------------------------------------------------------------- */
    /* 📍 Smart Positioning                                                   */
    /* ---------------------------------------------------------------------- */

    useLayoutEffect(() => {
      if (!open || !dropdownRef.current || !menuRef.current) return;

      const updatePosition = () => {
        const triggerRect = dropdownRef.current!.getBoundingClientRect();
        const menuHeight = menuRef.current!.offsetHeight;

        const spaceBottom = window.innerHeight - triggerRect.bottom;
        const spaceTop = triggerRect.top;

        const shouldOpenTop =
          spaceBottom < menuHeight + 10 && spaceTop > menuHeight;

        const top = shouldOpenTop
          ? triggerRect.top - menuHeight - 8
          : triggerRect.bottom + 8;

        let left =
          align === "right" ? triggerRect.right - width : triggerRect.left;

        // prevent overflow horizontally
        const maxLeft = window.innerWidth - width - 8;
        left = Math.max(8, Math.min(left, maxLeft));

        setPosition(shouldOpenTop ? "top" : "bottom");
        setCoords({ top, left });
      };

      updatePosition();

      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [open, align, width]);

    /* ---------------------------------------------------------------------- */
    /* 🔗 Merge Refs                                                          */
    /* ---------------------------------------------------------------------- */

    const setRefs = (node: HTMLDivElement | null) => {
      dropdownRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    return (
      <div
        ref={setRefs}
        className={clsx("inline-flex", className)}
        style={style}
      >
        {/* ------------------------------------------------------------------ */}
        {/* 🔘 Trigger                                                         */}
        {/* ------------------------------------------------------------------ */}

        <div
          className="flex"
          // A plain <div> is not focusable and has no Enter/Space activation,
          // so give it button semantics and the popup wiring screen readers
          // need. (A real <button> would nest illegally if `trigger` is one.)
          role="button"
          tabIndex={0}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              setOpen(!open);
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          {trigger}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 📦 Menu                                                            */}
        {/* ------------------------------------------------------------------ */}

        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              initial={{
                opacity: 0,
                y: position === "bottom" ? 8 : -8,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: position === "bottom" ? 8 : -8,
                scale: 0.96,
              }}
              transition={{
                duration: 0.16,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
              className={clsx(
                "fixed z-[9999] overflow-hidden rounded-2xl border border-border",
                "bg-background shadow-2xl backdrop-blur-xl",
                "min-w-[180px]",
                menuClassName,
              )}
              style={{
                width,
                top: coords.top,
                left: coords.left,
                ...menuStyle,
              }}
            >
              <div id={menuId} role="menu" className="text-sm text-foreground">
                {items.map((item, i) => {
                  if (item.separator) {
                    return (
                      <div
                        key={`separator-${i}`}
                        role="separator"
                        className="my-1 h-px bg-border"
                      />
                    );
                  }

                  return (
                    <button
                      // Prefer a stable identity over the array index so
                      // reordering or filtering `items` doesn't reuse the wrong
                      // DOM node (and its hover/disabled state).
                      key={typeof item.label === "string" ? item.label : i}
                      type="button"
                      role="menuitem"
                      disabled={item.disabled}
                      onClick={() => {
                        if (item.disabled) return;

                        item.onClick?.();

                        if (closeOnClick) {
                          setOpen(false);
                        }
                      }}
                      className={clsx(
                        "flex w-full items-center gap-3 px-4 py-2.5 text-left",
                        "transition-all duration-150",
                        "hover:bg-accent",
                        // focus:outline-none with no replacement left keyboard
                        // users with no visible focus at all.
                        "focus:outline-none focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                        item.danger &&
                          "text-destructive hover:bg-destructive/10",
                        item.disabled && "opacity-50",
                        itemClassName,
                        item.className,
                      )}
                      style={item.style}
                    >
                      {item.icon && (
                        <span className="shrink-0 text-current">
                          {item.icon}
                        </span>
                      )}

                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";
