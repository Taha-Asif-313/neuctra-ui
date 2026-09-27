"use client";

import React, { useState, useId, memo, ReactNode, CSSProperties } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/cn";

/* ---------------- Types ---------------- */
export interface AccordionItem {
  /** Header content for the item, shown next to the expand/collapse icon. */
  title: string | ReactNode;
  /** Body content revealed when the item is open. */
  content: ReactNode;
}

export interface AccordionProps {
  /** The accordion items to render, in order. */
  items: AccordionItem[];

  /** When true, multiple items can stay open at once; when false (default), opening an item closes any other open item. */
  allowMultiple?: boolean;
  /** Indexes of items that start open. */
  defaultOpen?: number[];

  /* Root */
  /** Classes for the root wrapper element. */
  className?: string;
  /** Inline styles for the root wrapper element. */
  style?: CSSProperties;

  /* Item */
  /** Classes for each item's outer container. */
  itemClassName?: string;
  /** Inline styles for each item's outer container. */
  itemStyle?: CSSProperties;

  /* Header */
  /** Classes for each item's clickable header button. */
  headerClassName?: string;
  /** Inline styles for each item's clickable header button — applied unconditionally, not only on hover. */
  headerStyle?: CSSProperties;

  /* Title */
  /** Classes for the title text span inside the header. */
  titleClassName?: string;
  /** Inline styles for the title text span inside the header. */
  titleStyle?: CSSProperties;

  /* Icon */
  /** Classes for the expand/collapse icon wrapper. */
  iconClassName?: string;
  /** Inline styles for the expand/collapse icon wrapper. */
  iconStyle?: CSSProperties;

  /* Content wrapper */
  /** Classes for the collapsible grid wrapper around the content. */
  contentWrapperClassName?: string;
  /** Inline styles for the collapsible grid wrapper around the content. */
  contentWrapperStyle?: CSSProperties;

  /* Content */
  /** Classes for the inner content container. */
  contentClassName?: string;
  /** Inline styles for the inner content container. */
  contentStyle?: CSSProperties;

  /* Hover (optional override) */
  /** Extra classes merged onto the header last, so they can override the built-in hover styling; note they apply at rest too, not only on hover. */
  hoverClassName?: string;
  /** Extra inline styles merged onto the header; since inline styles can't express :hover, these apply unconditionally. Prefer hoverClassName. */
  hoverStyle?: CSSProperties;

  /* Defaults (fallback design system) */
  /** Declared for future theming but not currently applied anywhere in the render. */
  borderColor?: string;
  /** Declared for future theming but not currently applied anywhere in the render. */
  radius?: string | number;
  /** Declared for future theming but not currently applied anywhere in the render. */
  shadow?: string;

  /* Motion */
  /** Duration in milliseconds of the expand/collapse grid-row transition. */
  duration?: number;

  /* Icon */
  /** Custom icon shown when an item is open; defaults to a ChevronUp. */
  iconOpen?: ReactNode;
  /** Custom icon shown when an item is closed; defaults to a ChevronDown. */
  iconClose?: ReactNode;

  /* Render override */
  /** Fully custom renderer for each item, replacing the default header/content markup. Receives the item, its index, open state, and a toggle callback. */
  renderItem?: (params: {
    item: AccordionItem;
    index: number;
    open: boolean;
    toggle: () => void;
  }) => ReactNode;
}

/* ---------------- Component ---------------- */
export const Accordion: React.FC<AccordionProps> = memo(
  ({
    items,
    allowMultiple = false,
    defaultOpen = [],

    className,
    style,

    itemClassName,
    itemStyle,

    headerClassName,
    headerStyle,

    titleClassName,
    titleStyle,

    iconClassName,
    iconStyle,

    contentWrapperClassName,
    contentWrapperStyle,

    contentClassName,
    contentStyle,

    hoverClassName,
    hoverStyle,

    borderColor = "var(--border)",
    radius = "0.5rem",
    shadow = "none",

    duration = 300,

    iconOpen,
    iconClose,

    renderItem,
  }) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpen);
    const accordionId = useId();

    const toggle = (i: number) => {
      setOpenIndexes((prev) =>
        allowMultiple
          ? prev.includes(i)
            ? prev.filter((x) => x !== i)
            : [...prev, i]
          : prev.includes(i)
            ? []
            : [i],
      );
    };

    return (
      <div
        className={clsx(className, "w-full space-y-2 text-foreground")}
        style={style}
      >
        {items.map((item, index) => {
          const open = openIndexes.includes(index);

          if (renderItem) {
            return (
              <React.Fragment key={index}>
                {renderItem({
                  item,
                  index,
                  open,
                  toggle: () => toggle(index),
                })}
              </React.Fragment>
            );
          }

          return (
            <div
              key={index}
              className={clsx(
                itemClassName,
                "overflow-hidden transition-all bg-accent text-foreground",
                "rounded-md",
              )}
              style={{
                ...itemStyle,
              }}
            >
              {/* Header */}
              <button
                type="button"
                id={`${accordionId}-trigger-${index}`}
                aria-expanded={open}
                aria-controls={`${accordionId}-panel-${index}`}
                onClick={() => toggle(index)}
                className={cn(
                  "w-full flex items-center justify-between",
                  "px-4 py-3.5 text-left transition-colors",
                  // The item wrapper is already bg-accent, so hover:bg-accent
                  // was a guaranteed no-op — there was no hover feedback at all.
                  "hover:bg-accent-foreground/5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  headerClassName,
                  // hoverClassName is merged last so it can actually win, but
                  // note it applies at rest too — see the note on hoverStyle.
                  hoverClassName,
                )}
                style={{
                  // hoverStyle is an inline style and so cannot express :hover;
                  // it has always applied unconditionally. Kept for
                  // compatibility, but prefer hoverClassName.
                  ...headerStyle,
                  ...hoverStyle,
                }}
              >
                <span
                  className={cn("text-sm text-foreground", titleClassName)}
                  style={titleStyle}
                >
                  {item.title}
                </span>

                <span
                  aria-hidden="true"
                  className={cn("text-muted-foreground", iconClassName)}
                  style={iconStyle}
                >
                  {open
                    ? iconOpen || <ChevronUp size={18} />
                    : iconClose || <ChevronDown size={18} />}
                </span>
              </button>

              {/* Content Wrapper.
                  Uses a grid-rows 0fr→1fr transition instead of measuring
                  scrollHeight. The old approach had two sources of truth (an
                  effect writing el.style.maxHeight and a render reading the ref)
                  which fought each other: defaultOpen items rendered collapsed,
                  and any unrelated re-render snapped open panels shut. */}
              <div
                id={`${accordionId}-panel-${index}`}
                role="region"
                aria-labelledby={`${accordionId}-trigger-${index}`}
                className={cn(
                  "grid overflow-hidden",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  contentWrapperClassName,
                )}
                style={{
                  transition: `grid-template-rows ${duration}ms ease`,
                  ...contentWrapperStyle,
                }}
              >
                {/* min-h-0 lets the grid row actually collapse to 0fr. */}
                <div className="min-h-0 overflow-hidden">
                  {/* Content — `inert` while collapsed so its links and buttons
                      don't stay in the tab order behind a 0-height box. */}
                  <div
                    inert={!open ? true : undefined}
                    className={cn(
                      "px-4 py-3.5 text-sm border-t border-border text-accent-foreground bg-background",
                      contentClassName,
                    )}
                    style={contentStyle}
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

Accordion.displayName = "Accordion";
