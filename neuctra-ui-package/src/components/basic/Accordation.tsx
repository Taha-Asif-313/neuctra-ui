"use client";
import React, {
  useState,
  useRef,
  useEffect,
  memo,
  ReactNode,
  CSSProperties,
} from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface AccordionItem {
  title: string | ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: number[];

  /** Appearance */
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  contentBgColor?: string;
  contentTextColor?: string;

  /** Layout & spacing */
  paddingY?: string | number;
  paddingX?: string | number;
  marginY?: string | number;
  borderRadius?: string | number;
  contentPadding?: string | number;

  /** Typography */
  fontSize?: string | number;
  fontWeight?: string | number;
  contentFontSize?: string | number;
  contentFontWeight?: string | number;

  /** Icon */
  iconOpen?: ReactNode;
  iconClose?: ReactNode;
  iconSize?: string | number;

  /** Motion */
  transitionDuration?: string;
  shadow?: string;

  /** Class overrides */
  className?: string;
  style?: CSSProperties;
}

export const Accordion: React.FC<AccordionProps> = memo(
  ({
    items,
    allowMultiple = false,
    defaultOpen = [],
    borderColor = "#e5e7eb",
    backgroundColor = "#fff",
    textColor = "#111827",
    hoverBgColor = "#f3f4f6",
    hoverTextColor = "#111827",
    contentBgColor = "#fff",
    contentTextColor = "#374151",
    paddingY = "1rem",
    paddingX = "1rem",
    marginY = "0.5rem",
    borderRadius = "0.5rem",
    contentPadding = "1rem",
    fontSize = "1rem",
    fontWeight = 600,
    contentFontSize = "0.95rem",
    contentFontWeight = 400,
    iconOpen,
    iconClose,
    iconSize = "1.25rem",
    transitionDuration = "300ms",
    shadow = "0 1px 4px rgba(0,0,0,0.08)",
    className = "",
    style,
  }) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpen);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
      contentRefs.current.forEach((el, index) => {
        if (el) {
          el.style.maxHeight = openIndexes.includes(index)
            ? `${el.scrollHeight}px`
            : "0px";
        }
      });
    }, [openIndexes]);

    const toggleItem = (index: number) => {
      setOpenIndexes((prev) =>
        allowMultiple
          ? prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
          : prev.includes(index)
            ? []
            : [index],
      );
    };

    // Helper to normalize CSS values (number -> px)
    const toCssValue = (value: string | number | undefined) =>
      value !== undefined
        ? typeof value === "number"
          ? `${value}px`
          : value
        : undefined;

    return (
      <div
        className={`space-y-2 ${className}`}
        style={{ width: "100%", ...style }}
      >
        {items.map((item, index) => {
          const isOpen = openIndexes.includes(index);

          return (
            <div
              key={index}
              className="border shadow-sm overflow-hidden transition-all duration-300"
              style={{
                borderColor,
                borderRadius: toCssValue(borderRadius),
                margin: `${toCssValue(marginY)} 0`,
                boxShadow: shadow,
              }}
            >
              {/* Header */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center transition-colors duration-300"
                style={{
                  backgroundColor,
                  color: textColor,
                  padding: `${toCssValue(paddingY)} ${toCssValue(paddingX)}`,
                  fontWeight,
                  fontSize: toCssValue(fontSize),
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hoverBgColor;
                  e.currentTarget.style.color = hoverTextColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = backgroundColor;
                  e.currentTarget.style.color = textColor;
                }}
              >
                <span>{item.title}</span>
                <span style={{ fontSize: toCssValue(iconSize) }}>
                  {isOpen
                    ? iconOpen || <ChevronUp size={16} />
                    : iconClose || <ChevronDown size={16} />}
                </span>
              </button>

              {/* Content */}
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isOpen
                    ? `${contentRefs.current[index]?.scrollHeight ?? 0}px`
                    : "0px",
                  transition: `max-height ${transitionDuration} ease-in-out`,
                }}
              >
                <div
                  style={{
                    borderTop: `1px solid ${borderColor}`,
                    backgroundColor: contentBgColor,
                    color: contentTextColor,
                    padding: toCssValue(contentPadding),
                    fontSize: toCssValue(contentFontSize),
                    fontWeight: contentFontWeight,
                  }}
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
