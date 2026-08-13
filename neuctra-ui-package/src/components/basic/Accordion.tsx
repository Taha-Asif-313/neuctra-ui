"use client";

import React, { useState, useId, memo, ReactNode, CSSProperties } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/cn";

/* ---------------- Types ---------------- */
export interface AccordionItem {
  title: string | ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];

  allowMultiple?: boolean;
  defaultOpen?: number[];

  /* Root */
  className?: string;
  style?: CSSProperties;

  /* Item */
  itemClassName?: string;
  itemStyle?: CSSProperties;

  /* Header */
  headerClassName?: string;
  headerStyle?: CSSProperties;

  /* Title */
  titleClassName?: string;
  titleStyle?: CSSProperties;

  /* Icon */
  iconClassName?: string;
  iconStyle?: CSSProperties;

  /* Content wrapper */
  contentWrapperClassName?: string;
  contentWrapperStyle?: CSSProperties;

  /* Content */
  contentClassName?: string;
  contentStyle?: CSSProperties;

  /* Hover (optional override) */
  hoverClassName?: string;
  hoverStyle?: CSSProperties;

  /* Defaults (fallback design system) */
  borderColor?: string;
  radius?: string | number;
  shadow?: string;

  /* Motion */
  duration?: number;

  /* Icon */
  iconOpen?: ReactNode;
  iconClose?: ReactNode;

  /* Render override */
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
