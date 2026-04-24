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

    borderColor = "var(--border)",
    radius = "0.5rem",
    shadow = "none",

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
                onClick={() => toggle(index)}
                className={clsx(
                  headerClassName,
                  hoverClassName,
                  "w-full flex items-center justify-between",
                  "px-4 py-3.5 text-left transition-colors",
                  "hover:bg-accent",
                )}
                style={{
                  ...headerStyle,
                  ...hoverStyle,
                }}
              >
                <span
                  className={clsx(
                    titleClassName,
                    "text-foreground",
                  )}
                  style={titleStyle}
                >
                  {item.title}
                </span>

                <span
                  className={clsx(iconClassName, "text-muted-foreground")}
                  style={iconStyle}
                >
                  {open
                    ? iconOpen || <ChevronUp size={18} />
                    : iconClose || <ChevronDown size={18} />}
                </span>
              </button>

              {/* Content Wrapper */}
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className={clsx(
                  contentWrapperClassName,
                  "overflow-hidden transition-all",
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
                    contentClassName,
                    "px-4 py-3.5 text-sm border-t border-border text-accent-foreground bg-background",
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
  },
);

Accordion.displayName = "Accordion";
