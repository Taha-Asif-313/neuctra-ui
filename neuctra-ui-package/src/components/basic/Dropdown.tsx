"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
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
    const isControlled = controlledOpen !== undefined;

    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = (val: boolean) => {
      if (!isControlled) setInternalOpen(val);
      onOpenChange?.(val);
    };

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    /* 🔒 Close on outside click */
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* 🔗 Merge refs safely (fix TS issue) */
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
        className={clsx("relative inline-block", className)}
        style={style}
      >
        {/* 🔘 Trigger */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          {trigger}
        </div>

        {/* 📦 Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className={clsx(
                "absolute z-50 mt-2 rounded-2xl shadow-2xl border",
                "bg-background border-border",
                align === "right" ? "right-0" : "left-0",
                menuClassName,
              )}
              style={{
                width,
                ...menuStyle,
              }}
            >
              <div className="py-1 text-sm text-foreground">
                {items.map((item, i) => {
                  if (item.separator) {
                    return (
                      <div key={`sep-${i}`} className="h-px bg-border my-1" />
                    );
                  }

                  return (
                    <button
                      key={i}
                      disabled={item.disabled}
                      onClick={() => {
                        if (item.disabled) return;

                        item.onClick?.();
                        if (closeOnClick) setOpen(false);
                      }}
                      className={clsx(
                        "flex items-center gap-3 w-full text-left px-4 py-2 transition",
                        "hover:bg-accent",
                        item.danger &&
                          "text-destructive hover:bg-destructive/10",
                        item.disabled &&
                          "opacity-50 cursor-not-allowed pointer-events-none",
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
                      <span>{item.label}</span>
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
