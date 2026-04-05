"use client";

import React, {
  useState,
  useRef,
  useEffect,
  memo,
  ReactNode,
  CSSProperties,
} from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";

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

    borderColor = "#e5e7eb",
    radius = "0.5rem",
    shadow = "0 1px 4px rgba(0,0,0,0.08)",

    duration = 300,

    iconOpen,
    iconClose,

    renderItem,
  }) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpen);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toCss = (v?: string | number) =>
      typeof v === "number" ? `${v}px` : v;

    useEffect(() => {
      contentRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.maxHeight = openIndexes.includes(i)
          ? `${el.scrollHeight}px`
          : "0px";
      });
    }, [openIndexes]);

    const toggle = (i: number) => {
      setOpenIndexes((prev) =>
        allowMultiple
          ? prev.includes(i)
            ? prev.filter((x) => x !== i)
            : [...prev, i]
          : prev.includes(i)
          ? []
          : [i]
      );
    };

    return (
      <div
        className={clsx("w-full space-y-2", className)}
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
                "border overflow-hidden transition-all",
                "bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100",
                itemClassName
              )}
              style={{
                borderColor,
                borderRadius: toCss(radius),
                boxShadow: shadow,
                ...itemStyle,
              }}
            >
              {/* Header */}
              <button
                onClick={() => toggle(index)}
                className={clsx(
                  "w-full flex items-center justify-between",
                  "px-4 py-3 text-left transition-colors",
                  "hover:bg-gray-100 dark:hover:bg-zinc-800",
                  headerClassName,
                  hoverClassName
                )}
                style={{
                  ...headerStyle,
                  ...hoverStyle,
                }}
              >
                <span
                  className={clsx("font-medium", titleClassName)}
                  style={titleStyle}
                >
                  {item.title}
                </span>

                <span
                  className={iconClassName}
                  style={iconStyle}
                >
                  {open
                    ? iconOpen || <ChevronUp size={18} />
                    : iconClose || <ChevronDown size={18} />}
                </span>
              </button>

              {/* Content Wrapper */}
              <div
                ref={(el) => { contentRefs.current[index] = el; }}
                className={clsx(
                  "overflow-hidden transition-all",
                  contentWrapperClassName
                )}
                style={{
                  maxHeight: open
                    ? `${contentRefs.current[index]?.scrollHeight || 0}px`
                    : "0px",
                  transition: `max-height ${duration}ms ease`,
                  ...contentWrapperStyle,
                }}
              >
                {/* Content */}
                <div
                  className={clsx(
                    "px-4 py-3 border-t",
                    "border-gray-200 dark:border-zinc-800",
                    contentClassName
                  )}
                  style={contentStyle}
                >
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";