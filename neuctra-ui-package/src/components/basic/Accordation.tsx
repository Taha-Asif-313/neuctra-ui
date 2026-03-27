import React, { useState, useRef, useEffect, memo } from "react";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];

  /** Allow multiple open items */
  allowMultiple?: boolean;

  /** Default open indexes */
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

  /** Icon customization */
  iconOpen?: React.ReactNode;
  iconClose?: React.ReactNode;
  iconSize?: string | number;

  /** Motion & style */
  transitionDuration?: string;
  shadow?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 🧠 Industry-standard, minimal, and fully customizable Accordion
 */
export const Accordion: React.FC<AccordionProps> = memo(
  ({
    items,
    allowMultiple = false,
    defaultOpen = [],
    borderColor = "#e5e7eb",
    backgroundColor = "#fff",
    textColor = "#111827",
    hoverBgColor = "#f9fafb",
    hoverTextColor = "#111827",
    contentBgColor = "#fff",
    contentTextColor = "#374151",
    paddingY = "1rem",
    paddingX = "1rem",
    marginY = "0.75rem",
    borderRadius = "0.5rem",
    contentPadding = "1rem",
    fontSize = "1rem",
    fontWeight = 600,
    contentFontSize = "0.95rem",
    contentFontWeight = 400,
    iconOpen = "−",
    iconClose = "+",
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
          : [index]
      );
    };

    return (
      <div className={className} style={{ width: "100%", ...style }}>
        {items.map((item, index) => {
          const isOpen = openIndexes.includes(index);

          return (
            <div
              key={index}
              style={{
                border: `1px solid ${borderColor}`,
                borderRadius,
                margin: `${marginY} 0`,
                boxShadow: shadow,
                overflow: "hidden",
                transition: `all ${transitionDuration} ease`,
              }}
            >
              {/* Header Button */}
              <button
                onClick={() => toggleItem(index)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor,
                  color: textColor,
                  padding: `${paddingY} ${paddingX}`,
                  fontWeight,
                  fontSize,
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  transition: `all ${transitionDuration}`,
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
                <span style={{ fontSize: iconSize }}>
                  {isOpen ? iconOpen : iconClose}
                </span>
              </button>

              {/* Content */}
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                style={{
                  overflow: "hidden",
                  maxHeight: isOpen
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : "0px",
                  transition: `max-height ${transitionDuration} ease-in-out`,
                }}
              >
                <div
                  style={{
                    borderTop: `1px solid ${borderColor}`,
                    backgroundColor: contentBgColor,
                    color: contentTextColor,
                    padding: contentPadding,
                    fontSize: contentFontSize,
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
  }
);

Accordion.displayName = "Accordion";